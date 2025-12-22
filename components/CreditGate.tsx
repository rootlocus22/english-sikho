'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Lock, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export interface CreditGateProps {
    /** Number of credits required to access this feature */
    requiredCredits: number;
    /** Feature name for analytics */
    feature: string;
    /** Content to display when user has credits */
    children: React.ReactNode;
    /** Callback when access is granted (credits consumed) */
    onAccess?: () => void;
    /** Optional custom paywall message */
    paywallMessage?: string;
}

/**
 * CreditGate - Universal component for credit-based access control
 * 
 * Wraps features and checks if user has enough credits before granting access.
 * Shows paywall modal if insufficient credits.
 * 
 * @example
 * <CreditGate requiredCredits={2} feature="Grammar Lesson">
 *   <LessonContent />
 * </CreditGate>
 */
export function CreditGate({
    requiredCredits,
    feature,
    children,
    onAccess,
    paywallMessage
}: CreditGateProps) {
    const { userData, decrementCredits } = useUserStore();
    const { credits = 0, isPremium = false } = userData || {};
    const [hasAccess, setHasAccess] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check access on mount
        const checkAccess = async () => {
            // Create unique key for this feature access
            const accessKey = `credit-gate-${feature}-${Date.now()}`;
            const hasAlreadyPaid = sessionStorage.getItem(accessKey);

            if (isPremium) {
                // Pro users have unlimited access
                setHasAccess(true);
                setIsChecking(false);
                onAccess?.();
                return;
            }

            if (credits >= requiredCredits) {
                // Has enough credits
                setHasAccess(true);
                setIsChecking(false);

                // Only deduct credits if not already done for this session
                if (!hasAlreadyPaid) {
                    // Mark as paid for this session
                    sessionStorage.setItem(accessKey, 'true');

                    // Consume credits
                    for (let i = 0; i < requiredCredits; i++) {
                        await decrementCredits();
                    }

                    toast.success(`${requiredCredits} credits used for ${feature}. ${credits - requiredCredits} remaining.`);
                }

                onAccess?.();
            } else {
                // Insufficient credits - show paywall
                setHasAccess(false);
                setIsChecking(false);
            }
        };

        checkAccess();
    }, []); // Only run on mount

    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Checking access...</p>
                </div>
            </div>
        );
    }

    if (!hasAccess) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-white to-blue-50">
                <Card className="max-w-lg w-full p-8 shadow-2xl border-2 border-purple-200">
                    <div className="text-center space-y-6">
                        {/* Icon */}
                        <div className="flex justify-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                <Lock className="w-10 h-10 text-white" />
                            </div>
                        </div>

                        {/* Heading */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                ⚠️ Credits Required!
                            </h2>
                            <p className="text-gray-600">
                                {paywallMessage || `You need ${requiredCredits} credits to access ${feature}`}
                            </p>
                        </div>

                        {/* Current Credits */}
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm text-red-600 mb-1">Your current credits</p>
                            <p className="text-3xl font-bold text-red-700">{credits} 💎</p>
                            <p className="text-xs text-red-600 mt-1">
                                Need {requiredCredits - credits} more credit{requiredCredits - credits > 1 ? 's' : ''}
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="space-y-3">
                            <Link href="/dashboard/upgrade">
                                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg text-lg py-6">
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Upgrade to Pro - Unlimited Access
                                </Button>
                            </Link>

                            <Button
                                variant="outline"
                                className="w-full border-2 border-purple-300 hover:bg-purple-50"
                                onClick={() => router.push('/dashboard')}
                            >
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </div>

                        {/* Info */}
                        <p className="text-xs text-gray-500">
                            💡 Pro members get unlimited access to all features!
                        </p>
                    </div>
                </Card>
            </div>
        );
    }

    // Has access - render children
    return <>{children}</>;
}
