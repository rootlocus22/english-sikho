// Pricing configuration for EnglishGyani
// Based on Indian market research and competitor analysis

export const PRICING_PLANS = {
    starter: {
        name: 'Starter',
        tagline: 'Perfect for daily practice',
        monthly: 149,
        quarterly: 399,
        yearly: 1499,
        features: [
            'Unlimited AI sessions',
            'All translator features',
            'Speaking coach (basic)',
            'Practice gym',
            'Email support',
            'No daily limits'
        ],
        creditsPerMonth: 999999,
        popular: false,
        allowedFeatures: [
            'unlimited_ai_sessions',
            'translator_basic',
            'speaking_coach_basic',
            'practice_gym',
            'email_support'
        ]
    },
    pro: {
        name: 'Pro',
        tagline: 'For serious learners',
        monthly: 299,
        quarterly: 799,
        yearly: 2999,
        features: [
            'Everything in Starter',
            'Advanced speaking coach',
            'Interview preparation',
            'Business English templates',
            'Roleplay scenarios',
            'Priority support',
            'Pronunciation analysis',
            'Progress analytics',
            'Certificate of completion'
        ],
        creditsPerMonth: 999999,
        popular: true,
        allowedFeatures: [
            'unlimited_ai_sessions',
            'translator_basic',
            'translator_advanced',
            'speaking_coach_basic',
            'speaking_coach_advanced',
            'practice_gym',
            'email_support',
            'priority_support',
            'interview_prep',
            'business_templates',
            'roleplay_scenarios',
            'pronunciation_analysis',
            'analytics',
            'certificates'
        ]
    }
} as const;

export type PricingTier = keyof typeof PRICING_PLANS;
export type PricingDuration = 'monthly' | 'quarterly' | 'yearly';

export function getPrice(tier: PricingTier, duration: PricingDuration): number {
    return PRICING_PLANS[tier][duration];
}

export function calculateSavings(tier: PricingTier, duration: 'quarterly' | 'yearly'): number {
    const plans = PRICING_PLANS[tier];
    if (duration === 'quarterly') {
        return (plans.monthly * 3) - plans.quarterly;
    }
    return (plans.monthly * 12) - plans.yearly;
}

export function getMonthlyEquivalent(tier: PricingTier, duration: PricingDuration): number {
    const price = getPrice(tier, duration);
    if (duration === 'monthly') return price;
    if (duration === 'quarterly') return Math.round(price / 3);
    return Math.round(price / 12);
}

export function getDiscountPercentage(tier: PricingTier, duration: 'quarterly' | 'yearly'): number {
    const savings = calculateSavings(tier, duration);
    const fullPrice = duration === 'quarterly'
        ? PRICING_PLANS[tier].monthly * 3
        : PRICING_PLANS[tier].monthly * 12;
    return Math.round((savings / fullPrice) * 100);
}

export function getPlanDisplayName(tier: PricingTier, duration: PricingDuration): string {
    const tierName = PRICING_PLANS[tier].name;
    const durationName = duration.charAt(0).toUpperCase() + duration.slice(1);
    return `${tierName} ${durationName}`;
}
