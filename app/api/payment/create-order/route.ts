import "@/lib/suppress-warnings";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
    try {
        const { amount, currency = "INR", userId, tier, duration } = await req.json();

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
            key_secret: process.env.RAZORPAY_KEY_SECRET || "",
        });

        const options = {
            amount: amount * 100, // amount in smallest currency unit (paise)
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Log pending payment
        if (userId) {
            try {
                const { adminDb } = await import("@/lib/firebase-admin");
                if (adminDb) {
                    await adminDb.collection("payment_logs").doc(order.id).set({
                        userId,
                        orderId: order.id,
                        razorpayOrderId: order.id,
                        amount,
                        currency,
                        status: 'pending',
                        tier: tier || 'pro',
                        duration: duration || 'monthly',
                        timestamp: new Date().toISOString(),
                        metadata: {
                            createdAt: new Date().toISOString()
                        }
                    });
                }
            } catch (logError) {
                console.error("Payment log error:", logError);
                // Don't fail the order creation if logging fails
            }
        }

        console.log("Order created successfully:", {
            orderId: order.id,
            amount,
            userId,
            tier,
            duration
        });

        return NextResponse.json(order);
    } catch (error: any) {
        console.error("Razorpay Order Error:", error);
        return NextResponse.json(
            { error: "Error creating order", details: error.message },
            { status: 500 }
        );
    }
}
