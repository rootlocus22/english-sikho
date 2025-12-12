// Feature gate component to wrap restricted features
'use client';

import { ReactNode } from 'react';
import { useFeatureGate } from '@/hooks/useFeatureAccess';
import { Feature } from '@/lib/features';
import { Button } from './ui/button';
import { Lock, Crown } from 'lucide-react';
import Link from 'next/link';

interface FeatureGateProps {
    feature: Feature;
    children: ReactNode;
    fallback?: ReactNode;
    showUpgradePrompt?: boolean;
}

export function FeatureGate({
    feature,
    children,
    fallback,
    showUpgradePrompt = true
}: FeatureGateProps) {
    const { hasAccess, needsUpgrade, requiredTier, featureName, featureDescription } = useFeatureGate(feature);

    // User has access - render children
    if (hasAccess) {
        return <>{children}</>;
    }

    // Custom fallback provided
    if (fallback) {
        return <>{fallback}</>;
    }

    // Default upgrade prompt
    if (showUpgradePrompt) {
        return (
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    {requiredTier === 'pro' ? (
                        <Crown className="w-8 h-8 text-blue-600" />
                    ) : (
                        <Lock className="w-8 h-8 text-blue-600" />
                    )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {featureName} is {requiredTier === 'pro' ? 'Pro' : 'Premium'} Only
                </h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                    {featureDescription}. Upgrade to {requiredTier === 'pro' ? 'Pro' : 'Starter'} for unlimited access!
                </p>
                <Link href="/dashboard/upgrade">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                        Upgrade to {requiredTier === 'pro' ? 'Pro' : 'Starter'} 🚀
                    </Button>
                </Link>
            </div>
        );
    }

    // No fallback and no prompt - render nothing
    return null;
}

// Inline badge for pro features
export function ProBadge() {
    return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 py-0.5 rounded">
            <Crown className="w-3 h-3" />
            PRO
        </span>
    );
}

// Inline badge for starter features
export function StarterBadge() {
    return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold bg-slate-900 text-white px-2 py-0.5 rounded">
            <Lock className="w-3 h-3" />
            STARTER+
        </span>
    );
}
