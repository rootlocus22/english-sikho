'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Crown, Zap, Sparkles, Shield, Lock, CreditCard, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import Script from 'next/script';
import { PRICING_PLANS, getMonthlyEquivalent, calculateSavings, getDiscountPercentage } from '@/lib/pricing';
import { event, getClickId } from '@/lib/analytics';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function UpgradePage() {
    const router = useRouter();
    const { userId, userData, fetchUserProfile } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [duration, setDuration] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
    const [selectedTier, setSelectedTier] = useState<'starter' | 'pro' | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [pendingPayment, setPendingPayment] = useState<{tier: 'starter' | 'pro', duration: 'monthly' | 'quarterly' | 'yearly'} | null>(null);

    // Check if Razorpay is loaded
    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).Razorpay) {
            setRazorpayLoaded(true);
        }
    }, []);

    // Exit intent detection
    useEffect(() => {
        const isPro = userData?.isPremium && userData?.subscription?.tier === 'pro';
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !isPro && !showConfirmDialog) {
                // User is trying to leave - show urgency
                event({
                    action: 'exit_intent_detected',
                    category: 'ecommerce',
                    label: 'upgrade_page'
                });
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [userData, showConfirmDialog]);

    const initiatePayment = async (tier: 'starter' | 'pro', selectedDuration: 'monthly' | 'quarterly' | 'yearly') => {
        if (!userId) {
            toast.error('Please login first!');
            router.push('/login?redirect=/dashboard/upgrade');
            return;
        }

        if (!razorpayLoaded) {
            toast.error('Payment system is loading. Please wait a moment and try again.');
            return;
        }

        if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
            toast.error('Payment configuration error. Please contact support.');
            console.error('Missing NEXT_PUBLIC_RAZORPAY_KEY_ID');
            return;
        }

        // Track checkout initiation
        event({
            action: 'begin_checkout',
            category: 'ecommerce',
            label: `${tier}_${selectedDuration}`,
            value: PRICING_PLANS[tier][selectedDuration]
        });

        setLoading(true);
        setSelectedTier(tier);
        setShowConfirmDialog(false);
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

            if (!orderResponse.ok) {
                const errorData = await orderResponse.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to create order');
            }

            const orderData = await orderResponse.json();

            if (!orderData.id) {
                throw new Error('Invalid order response');
            }

            // Razorpay options with enhanced configuration
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: 'INR',
                name: 'EnglishGyani',
                description: `${tier === 'starter' ? 'Starter' : 'Pro'} ${selectedDuration.charAt(0).toUpperCase() + selectedDuration.slice(1)} Plan - Unlimited AI English Practice`,
                order_id: orderData.id,
                handler: async function (response: any) {
                    setVerifying(true);
                    setLoading(false);
                    
                    try {
                        // Track payment attempt
                        event({
                            action: 'payment_attempt',
                            category: 'ecommerce',
                            label: `${tier}_${selectedDuration}`,
                            value: amount
                        });

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
                            // Track successful purchase
                            const clickId = getClickId();
                            event({
                                action: 'purchase',
                                category: 'ecommerce',
                                label: `${tier}_${selectedDuration}`,
                                value: amount,
                                currency: 'INR',
                                click_id: clickId
                            });

                            toast.success('🎉 Payment successful! Welcome to Premium!');
                            
                            // Refresh user data
                            if (userId) {
                                await fetchUserProfile(userId);
                            }
                            
                            // Small delay to ensure data is updated
                            setTimeout(() => {
                                router.push('/dashboard/premium-welcome');
                            }, 500);
                        } else {
                            // Track verification failure
                            event({
                                action: 'payment_verification_failed',
                                category: 'ecommerce',
                                label: `${tier}_${selectedDuration}`,
                                value: amount
                            });
                            toast.error('Payment verification failed. Please contact support if amount was deducted.');
                        }
                    } catch (verifyError: any) {
                        console.error('Verification error:', verifyError);
                        event({
                            action: 'payment_verification_error',
                            category: 'ecommerce',
                            label: `${tier}_${selectedDuration}`,
                            value: amount
                        });
                        toast.error('Payment verification error. Please contact support if amount was deducted.');
                    } finally {
                        setVerifying(false);
                        setSelectedTier(null);
                    }
                },
                prefill: {
                    email: userData?.email || '',
                    name: userData?.displayName || '',
                    contact: userData?.phoneNumber || '', // Add phone if available
                },
                theme: {
                    color: '#2563eb',
                },
                modal: {
                    ondismiss: function() {
                        // Track payment modal dismissal
                        event({
                            action: 'payment_modal_closed',
                            category: 'ecommerce',
                            label: `${tier}_${selectedDuration}`,
                            value: amount
                        });
                        setLoading(false);
                        setSelectedTier(null);
                    },
                    escape: true,
                    animation: true
                },
                retry: {
                    enabled: true,
                    max_count: 3
                },
                notes: {
                    plan: `${tier}_${selectedDuration}`,
                    userId: userId || ''
                }
            };

            const razorpay = new (window as any).Razorpay(options);
            
            // Enhanced error handling
            razorpay.on('payment.failed', function (response: any) {
                setLoading(false);
                setSelectedTier(null);
                
                // Track payment failure
                event({
                    action: 'payment_failed',
                    category: 'ecommerce',
                    label: `${tier}_${selectedDuration}`,
                    value: amount,
                    error_code: response.error?.code,
                    error_description: response.error?.description
                });

                const errorMsg = response.error?.description || 'Payment failed';
                toast.error(`Payment Failed: ${errorMsg}. Please try again or use a different payment method.`);
            });

            razorpay.on('payment.authorized', function (response: any) {
                // Payment authorized, handler will be called
                console.log('Payment authorized:', response);
            });

            razorpay.open();
        } catch (error: any) {
            console.error('Payment error:', error);
            
            // Track payment initiation error
            event({
                action: 'payment_initiation_error',
                category: 'ecommerce',
                label: `${tier}_${selectedDuration}`,
                value: amount,
                error: error.message
            });

            toast.error(error.message || 'Payment initiation failed. Please try again.');
            setLoading(false);
            setSelectedTier(null);
        }
    };

    const handlePayment = (tier: 'starter' | 'pro', selectedDuration: 'monthly' | 'quarterly' | 'yearly') => {
        setPendingPayment({ tier, duration: selectedDuration });
        setShowConfirmDialog(true);
    };

    const confirmPayment = () => {
        if (pendingPayment) {
            initiatePayment(pendingPayment.tier, pendingPayment.duration);
        }
    };

    // If already Pro, show message
    const isPro = userData?.isPremium && userData?.subscription?.tier === 'pro';

    if (isPro) {
        return (
            <div className="max-w-2xl mx-auto py-12 text-center">
                <Crown className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-4">You're Already a Pro Member! 🎉</h1>
                <p className="text-slate-600 mb-6">
                    You have unlimited access to all features.
                </p>
                <Button onClick={() => router.push('/dashboard')}>
                    Go to Dashboard
                </Button>
            </div>
        );
    }

    // Check if user is on Starter plan
    const isStarter = userData?.isPremium && userData?.subscription?.tier === 'starter';

    return (
        <div className="max-w-6xl mx-auto py-6 md:py-8 px-4 space-y-6 md:space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Upgrade Your English Journey 🚀
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                    Unlock unlimited AI practice and become a confident English speaker. Choose the plan that works for you.
                </p>

                {/* Duration Toggle */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                {/* Starter Plan */}
                <Card className="border-2 border-slate-300 shadow-lg hover:shadow-xl transition-shadow order-2 md:order-1">
                    <CardHeader className="text-center pb-6 md:pb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-4 mx-auto">
                            <Zap className="w-6 h-6 text-slate-700" />
                        </div>
                        <CardTitle className="text-2xl font-bold mb-2">Starter</CardTitle>
                        <CardDescription>Perfect for daily practice</CardDescription>
                        <div className="mt-6">
                            <div className="text-4xl md:text-5xl font-bold text-slate-900">
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
                                    <span className="text-slate-700 text-sm md:text-base">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button
                            onClick={() => handlePayment('starter', duration)}
                            disabled={loading || verifying || isStarter}
                            className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                        >
                            {loading && selectedTier === 'starter' ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Opening Payment...
                                </>
                            ) : verifying && selectedTier === 'starter' ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Verifying...
                                </>
                            ) : isStarter ? (
                                'Current Plan'
                            ) : (
                                'Get Starter'
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card className="border-2 border-blue-600 shadow-xl hover:shadow-2xl transition-shadow relative order-1 md:order-2">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-max">
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                            MOST POPULAR
                        </span>
                    </div>
                    <CardHeader className="text-center pb-6 md:pb-8 pt-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-4 mx-auto">
                            <Crown className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold mb-2">Pro</CardTitle>
                        <CardDescription>For serious learners</CardDescription>
                        <div className="mt-6">
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
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
                                    <span className="text-slate-700 font-medium text-sm md:text-base">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button
                            onClick={() => handlePayment('pro', duration)}
                            disabled={loading || verifying}
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg"
                        >
                            {loading && selectedTier === 'pro' ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Opening Payment...
                                </>
                            ) : verifying && selectedTier === 'pro' ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Verifying Payment...
                                </>
                            ) : isStarter ? (
                                'Upgrade to Pro 🚀'
                            ) : (
                                'Get Pro 🚀'
                            )}
                        </Button>
                        <div className="space-y-2">
                            <p className="text-xs text-center text-slate-500">
                                ✓ Secure payment via Razorpay • No auto-renewal
                            </p>
                            <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                                <span className="flex items-center gap-1">
                                    <Shield className="w-3 h-3" />
                                    SSL Secured
                                </span>
                                <span className="flex items-center gap-1">
                                    <Lock className="w-3 h-3" />
                                    PCI Compliant
                                </span>
                                <span className="flex items-center gap-1">
                                    <CreditCard className="w-3 h-3" />
                                    All Cards Accepted
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Comparison Table */}
            <div className="bg-blue-50 rounded-2xl p-6 md:p-8 mt-8 md:mt-12">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-6">Why EnglishGyani?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
                    <div className="p-4 rounded-lg bg-white/50 md:bg-transparent">
                        <p className="text-slate-600 text-sm mb-2">Traditional Coaching</p>
                        <p className="text-3xl font-bold text-slate-400 line-through">₹5,000+</p>
                        <p className="text-xs text-slate-500 mt-1">per month</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/50 md:bg-transparent">
                        <p className="text-slate-600 text-sm mb-2">Other Apps</p>
                        <p className="text-3xl font-bold text-slate-400">₹299-599</p>
                        <p className="text-xs text-slate-500 mt-1">limited features</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-2 border-blue-600 shadow-sm">
                        <p className="text-blue-900 text-sm mb-2 font-semibold">EnglishGyani Pro</p>
                        <p className="text-3xl font-bold text-blue-600">₹{getMonthlyEquivalent('pro', duration)}</p>
                        <p className="text-xs text-blue-700 mt-1 font-medium">unlimited everything!</p>
                    </div>
                </div>
            </div>

            {/* Trust Signals */}
            <div className="text-center space-y-4 pt-4 md:pt-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-slate-600">
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
                <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Bank-level security
                    </span>
                    <span className="flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Your data is safe
                    </span>
                    <span className="flex items-center gap-1">
                        <CreditCard className="w-3 h-3" />
                        UPI, Cards, Wallets
                    </span>
                </div>
            </div>

            {/* Urgency Element */}
            {!isPro && (
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4 text-center max-w-2xl mx-auto">
                    <p className="text-sm text-orange-900 font-medium">
                        ⚡ Limited Time: Get started today and unlock unlimited AI practice!
                    </p>
                </div>
            )}

            {/* Load Razorpay Script */}
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
                onLoad={() => {
                    setRazorpayLoaded(true);
                }}
                onError={() => {
                    console.error('Failed to load Razorpay script');
                    toast.error('Payment system failed to load. Please refresh the page.');
                }}
            />

            {/* Payment Confirmation Dialog */}
            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Confirm Your Purchase</DialogTitle>
                        <DialogDescription className="text-base pt-2">
                            {pendingPayment && (
                                <>
                                    You're about to purchase the <strong>{pendingPayment.tier === 'pro' ? 'Pro' : 'Starter'}</strong> plan 
                                    ({pendingPayment.duration.charAt(0).toUpperCase() + pendingPayment.duration.slice(1)}) for{' '}
                                    <strong>₹{PRICING_PLANS[pendingPayment.tier][pendingPayment.duration]}</strong>
                                </>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-3">
                        <div className="flex items-start gap-3 text-sm">
                            <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <span>Secure payment via Razorpay (PCI DSS compliant)</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm">
                            <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <span>7-day money-back guarantee</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm">
                            <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <span>No auto-renewal - cancel anytime</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm">
                            <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <span>Instant access to all premium features</span>
                        </div>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowConfirmDialog(false);
                                setPendingPayment(null);
                            }}
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmPayment}
                            disabled={loading}
                            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Processing...
                                </>
                            ) : (
                                'Continue to Payment'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
