// Feature-based access control configuration
// Controls which features are available for each subscription tier

export const FEATURES = {
    // Core features
    BASIC_TRANSLATOR: 'basic_translator',
    TONE_REWRITER: 'tone_rewriter',
    EMAIL_DECODER: 'email_decoder',

    // Speaking & Practice
    SPEAKING_COACH_BASIC: 'speaking_coach_basic',
    SPEAKING_COACH_ADVANCED: 'speaking_coach_advanced',
    PRACTICE_GYM: 'practice_gym',
    PRONUNCIATION_ANALYSIS: 'pronunciation_analysis',

    // Templates
    EMAIL_TEMPLATES: 'email_templates',
    BUSINESS_TEMPLATES: 'business_templates',

    // Advanced Features
    INTERVIEW_PREP: 'interview_prep',
    ROLEPLAY_SCENARIOS: 'roleplay_scenarios',
    PROGRESS_ANALYTICS: 'progress_analytics',

    // Support
    EMAIL_SUPPORT: 'email_support',
    PRIORITY_SUPPORT: 'priority_support',

    // Limits
    UNLIMITED_SESSIONS: 'unlimited_sessions',
} as const;

export type Feature = typeof FEATURES[keyof typeof FEATURES];

// Feature access by tier
export const TIER_FEATURES = {
    free: [
        FEATURES.BASIC_TRANSLATOR,
        FEATURES.TONE_REWRITER,
        FEATURES.EMAIL_DECODER,
        // Limited to 3 sessions per day
    ],
    starter: [
        FEATURES.BASIC_TRANSLATOR,
        FEATURES.TONE_REWRITER,
        FEATURES.EMAIL_DECODER,
        FEATURES.SPEAKING_COACH_BASIC,
        FEATURES.PRACTICE_GYM,
        FEATURES.EMAIL_TEMPLATES,
        FEATURES.EMAIL_SUPPORT,
        FEATURES.UNLIMITED_SESSIONS,
    ],
    pro: [
        // All features
        FEATURES.BASIC_TRANSLATOR,
        FEATURES.TONE_REWRITER,
        FEATURES.EMAIL_DECODER,
        FEATURES.SPEAKING_COACH_BASIC,
        FEATURES.SPEAKING_COACH_ADVANCED,
        FEATURES.PRACTICE_GYM,
        FEATURES.PRONUNCIATION_ANALYSIS,
        FEATURES.EMAIL_TEMPLATES,
        FEATURES.BUSINESS_TEMPLATES,
        FEATURES.INTERVIEW_PREP,
        FEATURES.ROLEPLAY_SCENARIOS,
        FEATURES.PROGRESS_ANALYTICS,
        FEATURES.PRIORITY_SUPPORT,
        FEATURES.UNLIMITED_SESSIONS,
    ],
} as const;

// Feature metadata for display
export const FEATURE_META = {
    [FEATURES.BASIC_TRANSLATOR]: {
        name: 'Basic Translator',
        description: 'Convert Hinglish to professional English',
        requiredTier: 'free',
    },
    [FEATURES.TONE_REWRITER]: {
        name: 'Tone Rewriter',
        description: 'Adjust text formality (casual to formal)',
        requiredTier: 'free',
    },
    [FEATURES.EMAIL_DECODER]: {
        name: 'Email Decoder',
        description: 'Decode professional emails and draft replies',
        requiredTier: 'free',
    },
    [FEATURES.SPEAKING_COACH_BASIC]: {
        name: 'Speaking Coach',
        description: 'Practice pronunciation with AI feedback',
        requiredTier: 'starter',
    },
    [FEATURES.SPEAKING_COACH_ADVANCED]: {
        name: 'Advanced Speaking Coach',
        description: 'Detailed pronunciation analysis with scores',
        requiredTier: 'pro',
    },
    [FEATURES.PRACTICE_GYM]: {
        name: 'Practice Gym',
        description: 'Structured practice sessions',
        requiredTier: 'starter',
    },
    [FEATURES.PRONUNCIATION_ANALYSIS]: {
        name: 'Pronunciation Analysis',
        description: 'Word-by-word pronunciation breakdown',
        requiredTier: 'pro',
    },
    [FEATURES.EMAIL_TEMPLATES]: {
        name: 'Email Templates',
        description: 'Ready-to-use professional templates',
        requiredTier: 'starter',
    },
    [FEATURES.BUSINESS_TEMPLATES]: {
        name: 'Business Templates',
        description: 'Advanced business communication templates',
        requiredTier: 'pro',
    },
    [FEATURES.INTERVIEW_PREP]: {
        name: 'Interview Preparation',
        description: 'Mock interviews with AI feedback',
        requiredTier: 'pro',
    },
    [FEATURES.ROLEPLAY_SCENARIOS]: {
        name: 'Roleplay Scenarios',
        description: 'Practice real-life conversations',
        requiredTier: 'pro',
    },
    [FEATURES.PROGRESS_ANALYTICS]: {
        name: 'Progress Analytics',
        description: 'Track your improvement over time',
        requiredTier: 'pro',
    },
    [FEATURES.EMAIL_SUPPORT]: {
        name: 'Email Support',
        description: 'Get help via email',
        requiredTier: 'starter',
    },
    [FEATURES.PRIORITY_SUPPORT]: {
        name: 'Priority Support',
        description: '24-hour response time guarantee',
        requiredTier: 'pro',
    },
    [FEATURES.UNLIMITED_SESSIONS]: {
        name: 'Unlimited Sessions',
        description: 'No daily limits on practice',
        requiredTier: 'starter',
    },
} as const;

// Helper to check if tier has access to feature
export function hasFeatureAccess(
    userTier: 'free' | 'starter' | 'pro',
    feature: Feature
): boolean {
    return (TIER_FEATURES[userTier] as ReadonlyArray<string>).includes(feature);
}

// Get minimum tier required for a feature
export function getRequiredTier(feature: Feature): 'free' | 'starter' | 'pro' {
    return FEATURE_META[feature].requiredTier as 'free' | 'starter' | 'pro';
}

// Get all features for a tier
export function getTierFeatures(tier: 'free' | 'starter' | 'pro'): Feature[] {
    return [...TIER_FEATURES[tier]];
}

// Check if user needs upgrade for a feature
export function needsUpgrade(
    currentTier: 'free' | 'starter' | 'pro',
    feature: Feature
): { needsUpgrade: boolean; requiredTier?: 'starter' | 'pro' } {
    if (hasFeatureAccess(currentTier, feature)) {
        return { needsUpgrade: false };
    }

    const required = getRequiredTier(feature);
    return {
        needsUpgrade: true,
        requiredTier: required === 'free' ? undefined : required,
    };
}
