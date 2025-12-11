
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = await req.json();

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
                    console.log("Attempting to update Firestore for user:", userId);
                    const { adminDb } = await import("@/lib/firebase-admin");

                    if (!adminDb) {
                        throw new Error("Firebase Admin not initialized");
                    }

                    await adminDb.collection("users").doc(userId).set({
                        isPremium: true,
                        credits: 9999,
                        updatedAt: new Date().toISOString()
                    }, { merge: true });
                    console.log("Firestore updated successfully for user:", userId);
                } catch (dbError) {
                    console.error("Firestore Update Critical Error:", dbError);
                }
            }

            return NextResponse.json({ status: "success", message: "Payment verified" });
        } else {
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
