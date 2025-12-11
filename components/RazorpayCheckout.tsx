
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { toast } from "sonner";
import Script from "next/script";
import { useRouter } from "next/navigation";

interface RazorpayCheckoutProps {
    amount: number; // Amount in INR
    planName: string;
    buttonText?: string;
    onSuccess?: () => void;
    className?: string;
    variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

export default function RazorpayCheckout({
    amount,
    planName,
    buttonText = "Buy Now",
    onSuccess,
    className,
    variant = "default"
}: RazorpayCheckoutProps) {
    const [loading, setLoading] = useState(false);
    const { userData, setUserData, userId, fetchUserProfile } = useUserStore();
    const router = useRouter();

    const handlePayment = async () => {
        if (!userId) {
            router.push(`/login?message=Login to continue your purchase&redirect=/dashboard/upgrade`);
            return;
        }

        if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
            toast.error("Configuration Error: Razorpay Key ID is missing. Please check .env.local and restart server.");
            console.error("Missing NEXT_PUBLIC_RAZORPAY_KEY_ID");
            return;
        }

        setLoading(true);

        try {
            // 1. Create Order
            const res = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            });

            if (!res.ok) throw new Error("Failed to create order");
            const order = await res.json();

            // 2. Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use NEXT_PUBLIC for frontend
                amount: order.amount,
                currency: order.currency,
                name: "EnglishGyani",
                description: `Upgrade to ${planName}`,
                order_id: order.id,
                handler: async function (response: any) {
                    // 3. Verify Payment
                    try {
                        const verifyRes = await fetch("/api/payment/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                userId: userId, // Pass userId for backend update
                            }),
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyData.status === "success") {
                            toast.success("Payment Successful! Welcome to Pro.");

                            // Source of Truth: Fetch latest data from Firestore
                            if (userId) {
                                // Small delay to allow Firestore propagation if needed (though typically fast)
                                await fetchUserProfile(userId);
                            }

                            if (onSuccess) onSuccess();
                        } else {
                            toast.error("Payment Verification Failed");
                        }

                    } catch (err) {
                        console.error(err);
                        toast.error("Payment verification failed");
                    }
                },
                prefill: {
                    name: userData?.displayName || "",
                    email: userData?.email || "",
                    contact: "", // Can collect phone number if needed
                },
                theme: {
                    color: "#2563eb", // Blue-600
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on("payment.failed", function (response: any) {
                toast.error("Payment Failed: " + response.error.description);
            });
            rzp.open();

        } catch (error) {
            console.error("Checkout Error:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <Button
                onClick={handlePayment}
                disabled={loading}
                className={className}
                variant={variant}
            >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {buttonText}
            </Button>
        </>
    );
}
