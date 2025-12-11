"use client";

import { Check, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import RazorpayCheckout from "@/components/RazorpayCheckout";

export default function UpgradePage() {
    const router = useRouter();
    return (
        <div className="max-w-4xl mx-auto py-10">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Upgrade to Pro 🚀</h1>
                <p className="text-slate-600">Unlock unlimited access and become fluent faster.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">

                {/* Benefits List */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800">Why Go Pro?</h3>
                    <ul className="space-y-4">
                        <BenefitItem text="Unlimited Speaking Coach Sessions" />
                        <BenefitItem text="Advanced Tone Analysis" />
                        <BenefitItem text="Priority AI Processing" />
                        <BenefitItem text="Personalized Progress Reports" />
                        <BenefitItem text="Support EnglishGyani Mission" />
                    </ul>
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mt-6">
                        <div className="flex items-start gap-3">
                            <Zap className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-blue-900">Money Back Guarantee</h4>
                                <p className="text-sm text-blue-700 mt-1">
                                    If you're not satisfied within 7 days, email us for a full refund. No questions asked.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Checkout Card */}
                <div className="bg-white rounded-2xl p-8 border-2 border-blue-600 shadow-xl relative overflow-hidden ring-4 ring-blue-50/50">
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        SPECIAL OFFER
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro Monthly</h3>
                    <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-4xl font-bold text-blue-600">₹199</span>
                        <span className="text-lg text-slate-400 line-through">₹499</span>
                    </div>

                    <div className="space-y-4 mb-8 border-t border-b py-6 border-slate-100">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Pro Plan (1 Month)</span>
                            <span className="font-medium">₹199.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">GST (18%)</span>
                            <span className="font-medium text-green-600">Included</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>₹199.00</span>
                        </div>
                    </div>

                    <RazorpayCheckout
                        amount={199}
                        planName="Pro Monthly"
                        buttonText="Pay ₹199 & Upgrade"
                        className="w-full py-6 text-lg font-bold shadow-lg shadow-blue-200"
                        onSuccess={() => router.push("/dashboard/premium-welcome")}
                    />

                    <p className="text-xs text-center text-slate-500 mt-4 flex justify-center items-center gap-2">
                        <span>🔒 Secure Payment via Razorpay</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

function BenefitItem({ text }: { text: string }) {
    return (
        <li className="flex gap-3 text-slate-700 font-medium items-center">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-green-600" />
            </div>
            <span>{text}</span>
        </li>
    )
}
