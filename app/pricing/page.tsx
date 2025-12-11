
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, X } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-1 py-20 px-4">
                <div className="container max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            English Seekho, <span className="text-blue-600">Chai ke daam mein!</span> ☕
                        </h1>
                        <p className="text-xl text-slate-600">
                            Upgrade to Pro aur bano confident English speaker.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative">

                        {/* Free Plan */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Free Starter</h3>
                            <div className="text-4xl font-bold text-slate-900 mb-6">₹0 <span className="text-lg font-normal text-slate-500">/ forever</span></div>
                            <p className="text-slate-600 mb-8">Basics try karne ke liye best.</p>

                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-3 text-slate-700">
                                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                                    <span>Daily 10 Free AI Credits</span>
                                </li>
                                <li className="flex gap-3 text-slate-700">
                                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                                    <span>Basic Grammar Checks</span>
                                </li>
                                <li className="flex gap-3 text-slate-700">
                                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                                    <span>Email Templates Access</span>
                                </li>
                                <li className="flex gap-3 text-slate-400">
                                    <X className="w-5 h-5 shrink-0" />
                                    <span>Speaking Coach (Limited)</span>
                                </li>
                            </ul>

                            <a href="/dashboard" className="block w-full py-3 px-6 text-center rounded-lg border-2 border-slate-200 font-bold hover:bg-slate-50 transition-colors">
                                Start Free
                            </a>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-white rounded-2xl p-8 border-2 border-blue-600 shadow-xl relative overflow-hidden ring-4 ring-blue-50/50">
                            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                MOST POPULAR
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro Monthly</h3>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-4xl font-bold text-blue-600">₹199</span>
                                <span className="text-lg text-slate-400 line-through">₹499</span>
                                <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">60% OFF</span>
                            </div>
                            <p className="text-slate-600 mb-8">Serious learners ke liye - Unlimited Access!</p>

                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-3 text-slate-900 font-medium">
                                    <Check className="w-5 h-5 text-blue-600 shrink-0" />
                                    <span>Unlimited AI Practice Sessions</span>
                                </li>
                                <li className="flex gap-3 text-slate-900 font-medium">
                                    <Check className="w-5 h-5 text-blue-600 shrink-0" />
                                    <span>Priority Speaking Coach</span>
                                </li>
                                <li className="flex gap-3 text-slate-900 font-medium">
                                    <Check className="w-5 h-5 text-blue-600 shrink-0" />
                                    <span>Advanced Tone Analysis</span>
                                </li>
                                <li className="flex gap-3 text-slate-900 font-medium">
                                    <Check className="w-5 h-5 text-blue-600 shrink-0" />
                                    <span>Personalized Feedback Report</span>
                                </li>
                            </ul>

                            <a href="/dashboard/upgrade" className="block w-full py-6 text-center text-lg font-bold rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors">
                                Upgrade Now - just ₹199
                            </a>

                            <p className="text-xs text-center text-slate-500 mt-4">
                                Secure payment via Razorpay • Cancel anytime
                            </p>
                        </div>
                    </div>


                    {/* FAQ */}
                    <div className="max-w-3xl mx-auto mt-24">
                        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <FaqItem q="Kya refund mil sakta hai?" a="Haan, agar aap khush nahi hain toh 7 days ke andar full refund maang sake hain. No questions asked." />
                            <FaqItem q="Kya main kabhi bhi cancel kar sakta hoon?" a="Bilkul! Dashboard mein 'Billing' section se kabhi bhi cancel karein." />
                            <FaqItem q="Payment methods kya hain?" a="UPI (GPay, PhonePe), Credit/Debit Card, Net Banking - sab chalta hai." />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function FaqItem({ q, a }: { q: string, a: string }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-2">{q}</h3>
            <p className="text-slate-600">{a}</p>
        </div>
    )
}
