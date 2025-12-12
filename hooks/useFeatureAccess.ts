// React hook for feature access control
'use client';

import { useUserStore } from '@/lib/store';
import {
    hasFeatureAccess,
    needsUpgrade,
    getRequiredTier,
    FEATURE_META,
    type Feature
} from '@/lib/features';

export function useFeatureAccess(feature: Feature) {
    const { userData } = useUserStore();

    // Determine user tier
    const userTier: 'free' | 'starter' | 'pro' = userData?.isPremium
        ? ((userData as any).subscription?.tier as 'starter' | 'pro') || 'pro'
        : 'free';

    const hasAccess = hasFeatureAccess(userTier, feature);
    const upgradeInfo = needsUpgrade(userTier, feature);
    const featureMeta = FEATURE_META[feature];

    return {
        hasAccess,
        needsUpgrade: upgradeInfo.needsUpgrade,
        requiredTier: upgradeInfo.requiredTier,
        currentTier: userTier,
        featureName: featureMeta.name,
        featureDescription: featureMeta.description,
    };
}

// Hook to gate component rendering
export function useFeatureGate(feature: Feature) {
    const access = useFeatureAccess(feature);
    const { setPaywallOpen } = useUserStore();

    const requestAccess = () => {
        if (!access.hasAccess) {
            setPaywallOpen(true);
        }
    };

    return {
        ...access,
        requestAccess,
    };
}
