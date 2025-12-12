'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Crown, Zap, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { PRICING_PLANS, getMonthlyEquivalent, calculateSavings, getDiscountPercentage } from '@/lib/pricing';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function UpgradePage() {
    const router = useRouter();
    const { userId, userData } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [duration, setDuration] = useState<'monthly' | 'quarterly' | 'yearly'>('yearly');

    const handlePayment = async (tier: 'starter' | 'pro', selectedDuration: 'monthly' | 'quarterly' | 'yearly') => {
        if (!userId) {
            toast.error('Please login first!');
            router.push('/login?redirect=/dashboard/upgrade');
            return;
        }

        setLoading(true);
        const amount = PRICING_PLANS[tier][selectedDuration];

        try {
            // Create Razorpay order
            const orderResponse = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount,
                    userId,
                    tier,
                    duration: selectedDuration
                }),
            });

            const orderData = await orderResponse.json();

            // Razorpay options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: 'INR',
                name: 'EnglishGyani',
                description: `${tier === 'starter' ? 'Starter' : 'Pro'} ${selectedDuration.charAt(0).toUpperCase() + selectedDuration.slice(1)} Plan`,
                order_id: orderData.id,
                handler: async function (response: any) {
                    // Verify payment
                    const verifyResponse = await fetch('/api/payment/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            userId,
                            tier,
                            duration: selectedDuration,
                            amount
                        }),
                    });

                    const verifyData = await verifyResponse.json();

                    if (verifyData.status === 'success') {
                        toast.success('Payment successful! Welcome to Premium!');
                        router.push('/dashboard/premium-welcome');
                    } else {
                        toast.error('Payment verification failed');
                    }
                },
                prefill: {
                    email: userData?.email || '',
                    name: userData?.displayName || '',
                },
                theme: {
                    color: '#2563eb',
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Payment initiation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // If already premium, show message
    if (userData?.isPremium) {
        return (
            <div className="max-w-2xl mx-auto py-12 text-center">
                <Crown className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-4">You're Already Premium! 🎉</h1>
                <p className="text-slate-600 mb-6">
                    You have unlimited access to all features.
                </p>
                <Button onClick={() => router.push('/dashboard')}>
                    Go to Dashboard
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-slate-900">
                    Upgrade Your English Journey 🚀
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Unlock unlimited AI practice and become a confident English speaker. Choose the plan that works for you.
                </p>

                {/* Duration Toggle */}
                <div className="inline-flex bg-white border-2 border-slate-200 rounded-lg p-1 shadow-sm">
                    <button
                        onClick={() => setDuration('monthly')}
                        className={`px-6 py-2 rounded-md font-medium transition-all ${duration === 'monthly'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setDuration('quarterly')}
                        className={`px-6 py-2 rounded-md font-medium transition-all ${duration === 'quarterly'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        Quarterly
                        <span className="ml-1 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Save 11%</span>
                    </button>
                    <button
                        onClick={() => setDuration('yearly')}
                        className={`px-6 py-2 rounded-md font-medium transition-all ${duration === 'yearly'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        Yearly
                        <span className="ml-1 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Save 16%</span>
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Starter Plan */}
                <Card className="border-2 border-slate-300 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="text-center pb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-4 mx-auto">
                            <Zap className="w-6 h-6 text-slate-700" />
                        </div>
                        <CardTitle className="text-2xl font-bold mb-2">Starter</CardTitle>
                        <CardDescription>Perfect for daily practice</CardDescription>
                        <div className="mt-6">
                            <div className="text-5xl font-bold text-slate-900">
                                ₹{PRICING_PLANS.starter[duration]}
                            </div>
                            {duration !== 'monthly' && (
                                <p className="text-sm text-slate-600 mt-2">
                                    ₹{getMonthlyEquivalent('starter', duration)}/month • Save ₹{calculateSavings('starter', duration)}
                                </p>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <ul className="space-y-3">
                            {PRICING_PLANS.starter.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                    <span className="text-slate-700">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button
                            onClick={() => handlePayment('starter', duration)}
                            disabled={loading}
                            className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                        >
                            {loading ? 'Processing...' : 'Get Starter'}
                        </Button>
                    </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card className="border-2 border-blue-600 shadow-xl hover:shadow-2xl transition-shadow relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                            MOST POPULAR
                        </span>
                    </div>
                    <CardHeader className="text-center pb-8 pt-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-4 mx-auto">
                            <Crown className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold mb-2">Pro</CardTitle>
                        <CardDescription>For serious learners</CardDescription>
                        <div className="mt-6">
                            <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                ₹{PRICING_PLANS.pro[duration]}
                            </div>
                            {duration !== 'monthly' && (
                                <div className="mt-2 space-y-1">
                                    <p className="text-sm text-slate-600">
                                        ₹{getMonthlyEquivalent('pro', duration)}/month
                                    </p>
                                    <p className="text-xs text-green-600 font-semibold">
                                        Save ₹{calculateSavings('pro', duration)} ({getDiscountPercentage('pro', duration)}% off!)
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <ul className="space-y-3">
                            {PRICING_PLANS.pro.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                    <span className="text-slate-700 font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button
                            onClick={() => handlePayment('pro', duration)}
                            disabled={loading}
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg"
                        >
                            {loading ? 'Processing...' : 'Get Pro 🚀'}
                        </Button>
                        <p className="text-xs text-center text-slate-500">
                            ✓ Secure payment via Razorpay • No auto-renewal
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Comparison Table */}
            <div className="bg-blue-50 rounded-2xl p-8 mt-12">
                <h2 className="text-2xl font-bold text-center mb-6">Why EnglishGyani?</h2>
                <div className="grid md:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
                    <div>
                        <p className="text-slate-600 text-sm mb-2">Traditional Coaching</p>
                        <p className="text-3xl font-bold text-slate-400 line-through">₹5,000+</p>
                        <p className="text-xs text-slate-500 mt-1">per month</p>
                    </div>
                    <div>
                        <p className="text-slate-600 text-sm mb-2">Other Apps</p>
                        <p className="text-3xl font-bold text-slate-400">₹299-599</p>
                        <p className="text-xs text-slate-500 mt-1">limited features</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-2 border-blue-600">
                        <p className="text-blue-900 text-sm mb-2 font-semibold">EnglishGyani Pro</p>
                        <p className="text-3xl font-bold text-blue-600">₹{getMonthlyEquivalent('pro', duration)}</p>
                        <p className="text-xs text-blue-700 mt-1 font-medium">unlimited everything!</p>
                    </div>
                </div>
            </div>

            {/* Trust Signals */}
            <div className="text-center space-y-4 pt-8">
                <div className="flex items-center justify-center gap-6 text-sm text-slate-600">
                    <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        7-day money-back guarantee
                    </span>
                    <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        Trusted by 10,000+ learners
                    </span>
                    <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        100% secure payments
                    </span>
                </div>
            </div>

            {/* Load Razorpay Script */}
            <script src="https://checkout.razorpay.com/v1/checkout.js" async />
        </div>
    );
}
