'use client';


import { Check, X } from "lucide-react";
import { useState } from "react";
import { PRICING_PLANS, getMonthlyEquivalent, calculateSavings, getDiscountPercentage } from "@/lib/pricing";
import { TrackedLink } from "@/components/ui/tracked-elements";

export default function PricingPage() {
    const [duration, setDuration] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');


    // FAQ Schema
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Can I get a refund?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, if you are not satisfied, you can request a full refund within 7 days. No questions asked." }
            },
            {
                "@type": "Question",
                "name": "Can I cancel anytime?",
                "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. You can cancel your subscription anytime from your dashboard." }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />



            <main className="flex-1 py-10 md:py-20 px-4">
                <div className="container max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 md:mb-12">
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                            English Seekho, <span className="text-blue-600">Chai ke daam mein!</span> ☕
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 mb-8">
                            97% cheaper than coaching. Unlimited practice. Real results.
                        </p>

                        {/* Duration Toggle - Updated for single row on mobile */}
                        <div className="grid grid-cols-3 gap-1 bg-white border-2 border-slate-200 rounded-lg p-1 shadow-sm w-full max-w-md mx-auto sm:inline-flex sm:w-auto sm:gap-0 sm:block">
                            <button
                                onClick={() => setDuration('monthly')}
                                className={`px-2 py-2 sm:px-6 rounded-md font-medium transition-all text-xs sm:text-base flex items-center justify-center ${duration === 'monthly'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setDuration('quarterly')}
                                className={`px-2 py-2 sm:px-6 rounded-md font-medium transition-all text-xs sm:text-base flex flex-col sm:flex-row items-center justify-center ${duration === 'quarterly'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                Quarterly
                                <span className={`sm:ml-1 text-[10px] sm:text-xs px-1.5 py-0.5 rounded leading-none mt-1 sm:mt-0 ${duration === 'quarterly' ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}>
                                    -11%
                                </span>
                            </button>
                            <button
                                onClick={() => setDuration('yearly')}
                                className={`px-2 py-2 sm:px-6 rounded-md font-medium transition-all text-xs sm:text-base flex flex-col sm:flex-row items-center justify-center ${duration === 'yearly'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                Yearly
                                <span className={`sm:ml-1 text-[10px] sm:text-xs px-1.5 py-0.5 rounded leading-none mt-1 sm:mt-0 ${duration === 'yearly' ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}>
                                    -16%
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">

                        {/* Free Plan */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm order-2 md:order-1">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Free</h3>
                            <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                ₹0
                            </div>
                            <p className="text-slate-600 mb-6 font-medium">Try karke dekho</p>

                            <ul className="space-y-3 mb-8">
                                <li className="flex gap-3 text-slate-700 text-sm">
                                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                                    <span>10 free credits for trial</span>
                                </li>
                                <li className="flex gap-3 text-slate-700 text-sm">
                                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                                    <span>Basic translator</span>
                                </li>
                                <li className="flex gap-3 text-slate-700 text-sm">
                                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                                    <span>Tone rewriter</span>
                                </li>
                                <li className="flex gap-3 text-slate-400 text-sm">
                                    <X className="w-5 h-5 shrink-0" />
                                    <span>Speaking coach</span>
                                </li>
                                <li className="flex gap-3 text-slate-400 text-sm">
                                    <X className="w-5 h-5 shrink-0" />
                                    <span>Templates</span>
                                </li>
                            </ul>

                            <TrackedLink
                                href="/signup"
                                className="block w-full py-3 px-6 text-center rounded-lg border-2 border-slate-200 font-bold hover:bg-slate-50 transition-colors"
                                eventData={{ action: 'click_pricing_cta', category: 'ecommerce', label: 'free_plan' }}
                            >
                                Start Free
                            </TrackedLink>
                        </div>

                        {/* Starter Plan */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-slate-300 shadow-lg order-3 md:order-2">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Starter</h3>
                            <div className="mb-4">
                                <div className="text-3xl md:text-4xl font-bold text-slate-900">
                                    ₹{PRICING_PLANS.starter[duration]}
                                </div>
                                {duration !== 'monthly' && (
                                    <p className="text-sm text-slate-600 mt-1">
                                        ₹{getMonthlyEquivalent('starter', duration)}/month effective
                                    </p>
                                )}
                            </div>
                            <p className="text-slate-600 mb-6 font-medium">Perfect for daily practice</p>

                            <ul className="space-y-3 mb-8 text-sm">
                                <li className="flex gap-3 text-slate-900 font-medium">
                                    <Check className="w-5 h-5 text-blue-600 shrink-0" />
                                    <span>Unlimited AI sessions</span>
                                </li>
                                <li className="flex gap-3 text-slate-900 font-medium">
                                    <Check className="w-5 h-5 text-blue-600 shrink-0" />
                                    <span>All translator features</span>
                                </li>
                                <li className="flex gap-3 text-slate-900 font-medium">
                                    <Check className="w-5 h-5 text-blue-600 shrink-0" />
                                    <span>Speaking coach (basic)</span>
                                </li>
                                <li className="flex gap-3 text-slate-900 font-medium">
                                    <Check className="w-5 h-5 text-blue-600 shrink-0" />
                                    <span>Practice gym</span>
                                </li>
                                <li className="flex gap-3 text-slate-700">
                                    <Check className="w-5 h-5 text-blue-600 shrink-0" />
                                    <span>Email support</span>
                                </li>
                            </ul>

                            <TrackedLink
                                href="/dashboard/upgrade"
                                className="block w-full py-3 text-center text-lg font-bold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                                eventData={{ action: 'click_pricing_cta', category: 'ecommerce', label: 'starter_plan' }}
                            >
                                Get Started
                            </TrackedLink>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden ring-4 ring-blue-100 order-1 md:order-3 transform md:-translate-y-4">
                            <div className="absolute top-0 right-0 bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                                MOST POPULAR
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Pro</h3>
                            <div className="mb-4">
                                <div className="text-3xl md:text-4xl font-bold text-white">
                                    ₹{PRICING_PLANS.pro[duration]}
                                </div>
                                {duration !== 'monthly' && (
                                    <>
                                        <p className="text-sm text-blue-100 mt-1">
                                            ₹{getMonthlyEquivalent('pro', duration)}/month effective
                                        </p>
                                        <p className="text-xs text-blue-200 mt-1">
                                            Save ₹{calculateSavings('pro', duration)} ({getDiscountPercentage('pro', duration)}% off!)
                                        </p>
                                    </>
                                )}
                            </div>
                            <p className="text-blue-100 mb-6 font-medium">For serious learners</p>

                            <ul className="space-y-3 mb-8 text-sm">
                                <li className="flex gap-3 text-white font-medium">
                                    <Check className="w-5 h-5 text-amber-400 shrink-0" />
                                    <span>Everything in Starter</span>
                                </li>
                                <li className="flex gap-3 text-white font-medium">
                                    <Check className="w-5 h-5 text-amber-400 shrink-0" />
                                    <span>Advanced speaking coach</span>
                                </li>
                                <li className="flex gap-3 text-white font-medium">
                                    <Check className="w-5 h-5 text-amber-400 shrink-0" />
                                    <span>Interview preparation</span>
                                </li>
                                <li className="flex gap-3 text-white font-medium">
                                    <Check className="w-5 h-5 text-amber-400 shrink-0" />
                                    <span>Business templates</span>
                                </li>
                                <li className="flex gap-3 text-white font-medium">
                                    <Check className="w-5 h-5 text-amber-400 shrink-0" />
                                    <span>Priority support</span>
                                </li>
                                <li className="flex gap-3 text-blue-100">
                                    <Check className="w-5 h-5 text-amber-400 shrink-0" />
                                    <span>Progress analytics</span>
                                </li>
                            </ul>

                            <TrackedLink
                                href="/dashboard/upgrade"
                                className="block w-full py-4 text-center text-lg font-bold rounded-lg bg-white text-blue-600 shadow-lg hover:bg-blue-50 transition-colors"
                                eventData={{ action: 'click_pricing_cta', category: 'ecommerce', label: 'pro_plan' }}
                            >
                                Upgrade to Pro 🚀
                            </TrackedLink>

                            <p className="text-xs text-center text-blue-100 mt-4">
                                Secure payment via Razorpay • Cancel anytime
                            </p>
                        </div>
                    </div>

                    {/* Comparison with Alternatives */}
                    <div className="mt-12 md:mt-20 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 max-w-4xl mx-auto">
                        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">Why EnglishGyani is Better</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="p-4 rounded-lg bg-slate-50 md:bg-transparent">
                                <p className="text-slate-600 text-sm mb-2">Traditional Coaching</p>
                                <p className="text-3xl font-bold text-slate-900">₹5,000+</p>
                                <p className="text-xs text-slate-500 mt-1">per month</p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 md:bg-transparent">
                                <p className="text-slate-600 text-sm mb-2">Other Apps</p>
                                <p className="text-3xl font-bold text-slate-900">₹299-599</p>
                                <p className="text-xs text-slate-500 mt-1">limited features</p>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-600">
                                <p className="text-blue-900 text-sm mb-2 font-semibold">EnglishGyani Pro</p>
                                <p className="text-3xl font-bold text-blue-600">₹{getMonthlyEquivalent('pro', duration)}</p>
                                <p className="text-xs text-blue-700 mt-1">unlimited everything!</p>
                            </div>
                        </div>
                    </div>


                    {/* Enterprise Section */}
                    <div className="mt-12 md:mt-20 bg-slate-900 rounded-2xl p-6 md:p-10 text-center text-white max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Looking for Team Access?</h2>
                        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-8">
                            We provide centralized billing, employee progress tracking, and custom scenario creation for companies.
                            Perfect for BPOs, Sales Teams, and Universities.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 md:gap-6 text-left max-w-3xl mx-auto mb-8">
                            <div className="flex gap-3 items-center justify-center md:justify-start">
                                <Check className="w-6 h-6 text-green-400 shrink-0" />
                                <span>Admin Dashboard</span>
                            </div>
                            <div className="flex gap-3 items-center justify-center md:justify-start">
                                <Check className="w-6 h-6 text-green-400 shrink-0" />
                                <span>Bulk Discounts</span>
                            </div>
                            <div className="flex gap-3 items-center justify-center md:justify-start">
                                <Check className="w-6 h-6 text-green-400 shrink-0" />
                                <span>Custom Branded Examples</span>
                            </div>
                        </div>
                        <a href="/contact" className="inline-block w-full md:w-auto bg-white text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                            Contact Sales
                        </a>
                    </div>

                    {/* FAQ */}

                    <div className="max-w-3xl mx-auto mt-12 md:mt-20">
                        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <FaqItem q="Kya refund mil sakta hai?" a="Haan, agar aap khush nahi hain toh 7 days ke andar full refund maang sake hain. No questions asked." />
                            <FaqItem q="Kya main kabhi bhi cancel kar sakta hoon?" a="Bilkul! Aap kabhi bhi cancel kar sakte hain. Quarterly aur yearly plans ka remaining amount refund nahi hoga, but monthly plan kabhi bhi cancel ho sakta hai." />
                            <FaqItem q="Payment methods kya hain?" a="UPI (GPay, PhonePe), Credit/Debit Card, Net Banking - sab chalta hai. Razorpay ke through 100% secure payment." />
                            <FaqItem q="Free vs Starter vs Pro - kya difference hai?" a="Free mein 10 credits milte hain trial ke liye. Starter mein unlimited sessions with basic features. Pro mein everything unlimited plus advanced AI features for interviews and business English." />
                        </div>
                    </div>
                </div>
            </main>


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
