import "@/lib/suppress-warnings";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, tier, duration, amount } = await req.json();

        const key_secret = process.env.RAZORPAY_KEY_SECRET || "";

        // Verify signature
        const generated_signature = crypto
            .createHmac("sha256", key_secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature === razorpay_signature) {
            // Payment is successful

            if (userId) {
                try {
                    console.log("Payment verified for user:", userId);
                    const { adminDb } = await import("@/lib/firebase-admin");

                    if (!adminDb) {
                        throw new Error("Firebase Admin not initialized");
                    }

                    // Calculate renewal date based on duration
                    const now = new Date();
                    const startDate = now;
                    let endDate = new Date(now);

                    if (duration === 'monthly') {
                        endDate.setMonth(endDate.getMonth() + 1);
                    } else if (duration === 'quarterly') {
                        endDate.setMonth(endDate.getMonth() + 3);
                    } else if (duration === 'yearly') {
                        endDate.setFullYear(endDate.getFullYear() + 1);
                    }

                    // Get user data for payment log metadata
                    const userDoc = await adminDb.collection("users").doc(userId).get();
                    const userData = userDoc.data();

                    // Update user subscription
                    await adminDb.collection("users").doc(userId).set({
                        isPremium: true,
                        credits: 999999,
                        updatedAt: now.toISOString(),
                        subscription: {
                            tier: tier || 'pro',
                            plan: duration || 'monthly',
                            status: 'active',
                            startDate: startDate.toISOString(),
                            endDate: endDate.toISOString(),
                            renewalDate: endDate.toISOString(),
                            amount: amount || 299,
                            currency: 'INR',
                            autoRenew: false
                        },
                        premiumActivatedAt: startDate.toISOString()
                    }, { merge: true });

                    // Log payment in payment_logs collection
                    await adminDb.collection("payment_logs").doc(razorpay_payment_id).set({
                        userId,
                        orderId: razorpay_order_id,
                        razorpayPaymentId: razorpay_payment_id,
                        razorpayOrderId: razorpay_order_id,
                        razorpaySignature: razorpay_signature,
                        amount: amount || 299,
                        currency: 'INR',
                        status: 'success',
                        tier: tier || 'pro',
                        duration: duration || 'monthly',
                        timestamp: now.toISOString(),
                        metadata: {
                            userEmail: userData?.email || '',
                            userName: userData?.displayName || '',
                            ip: req.headers.get('x-forwarded-for') || undefined,
                            userAgent: req.headers.get('user-agent') || undefined
                        }
                    });

                    console.log("Payment logged and user updated successfully");
                } catch (dbError: any) {
                    console.error("Firestore Update Error:", dbError);
                    // Log to payment_logs even if user update fails
                    try {
                        const { adminDb } = await import("@/lib/firebase-admin");
                        if (adminDb) {
                            await adminDb.collection("payment_logs").doc(razorpay_payment_id).set({
                                userId,
                                orderId: razorpay_order_id,
                                razorpayPaymentId: razorpay_payment_id,
                                razorpayOrderId: razorpay_order_id,
                                razorpaySignature: razorpay_signature,
                                amount: amount || 299,
                                currency: 'INR',
                                status: 'success',
                                tier: tier || 'pro',
                                duration: duration || 'monthly',
                                timestamp: new Date().toISOString(),
                                error: dbError.message,
                                metadata: {
                                    error: 'User update failed but payment verified'
                                }
                            }, { merge: true });
                        }
                    } catch (logError) {
                        console.error("Failed to log payment error:", logError);
                    }
                    // Still return success since payment was verified
                }
            }

            return NextResponse.json({ 
                status: "success", 
                message: "Payment verified",
                payment_id: razorpay_payment_id
            });
        } else {
            console.error("Payment signature verification failed", {
                order_id: razorpay_order_id,
                payment_id: razorpay_payment_id,
                userId
            });
            return NextResponse.json(
                { status: "failure", message: "Invalid signature" },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Payment Verification Error:", error);
        return NextResponse.json(
            { error: "Error verifying payment", details: error.message },
            { status: 500 }
        );
    }
}
