// User profile types and utilities

export type PrimaryGoal = 'interview' | 'business' | 'writing' | 'speaking' | 'basics' | 'exam';
export type UserLevel = 'beginner' | 'elementary' | 'intermediate' | 'advanced';
export type TimeCommitment = '5-10' | '15-20' | '30+';
export type TargetTimeline = '1month' | '3months' | '6months';

export interface UserProfile {
    onboardingCompleted: boolean;
    primaryGoal: PrimaryGoal;
    currentLevel: UserLevel;
    challenges: string[];
    dailyTimeCommitment: TimeCommitment;
    targetTimeline: TargetTimeline;
    recommendedFeatures: string[];
    onboardingDate: Date;
    lastActive: Date;
}

export interface OnboardingData {
    step: number;
    goal?: PrimaryGoal;
    level?: UserLevel;
    challenges?: string[];
    timeCommitment?: TimeCommitment;
    timeline?: TargetTimeline;
}

// Challenge options for onboarding
export const challengeOptions = [
    { id: 'confidence', label: 'Confidence in meetings', icon: '💬' },
    { id: 'email', label: 'Email writing', icon: '📧' },
    { id: 'pronunciation', label: 'Pronunciation & accent', icon: '🗣️' },
    { id: 'grammar', label: 'Grammar mistakes', icon: '✍️' },
    { id: 'vocabulary', label: 'Limited vocabulary', icon: '📚' },
    { id: 'smalltalk', label: 'Small talk & casual conversations', icon: '☕' },
    { id: 'presentations', label: 'Presentations & public speaking', icon: '🎤' },
    { id: 'listening', label: 'Understanding native speakers', icon: '👂' },
    { id: 'thinking', label: 'Thinking in English (not translating)', icon: '💭' },
];

// Feature recommendations based on user profile
export function getRecommendedFeatures(profile: Partial<UserProfile>): string[] {
    const { primaryGoal, currentLevel } = profile;

    const featureMap: Record<PrimaryGoal, string[]> = {
        interview: [
            'interview-prep',
            'speaking',
            'templates',
            'resume-review', // Cross-sell to ResumeGyani
        ],
        business: [
            'tone',
            'gym',
            'vocabulary',
            'templates',
        ],
        writing: [
            'tone',
            'templates',
            'email-course',
            'grammar-basics',
        ],
        speaking: [
            'speaking',
            'gym',
            'pronunciation',
            'coach',
        ],
        basics: [
            'grammar-basics',
            'vocabulary',
            'pronunciation',
            'simple-practice',
        ],
        exam: [
            'speaking',
            'vocabulary',
            'grammar-basics',
            'advanced-practice',
        ],
    };

    let features = primaryGoal ? featureMap[primaryGoal] : [];

    // Adjust based on level
    if (currentLevel === 'beginner') {
        features = features.filter(f =>
            !['analytics', 'advanced-practice'].includes(f)
        );
    } else if (currentLevel === 'advanced') {
        features = features.filter(f =>
            !['grammar', 'pronunciation'].includes(f)
        );
    }

    return features.slice(0, 4); // Return top 4 recommendations
}

// Get dashboard personalization message
export function getDashboardMessage(profile: UserProfile): {
    greeting: string;
    motivation: string;
    cta: string;
} {
    const goalMessages: Record<PrimaryGoal, { greeting: string; motivation: string; cta: string }> = {
        interview: {
            greeting: 'Your next interview will be amazing!',
            motivation: 'Practice daily to boost your confidence',
            cta: 'Practice Common Questions',
        },
        business: {
            greeting: 'Sound professional in every meeting!',
            motivation: 'Master workplace English step by step',
            cta: 'Improve Your Emails',
        },
        writing: {
            greeting: 'Write emails that impress!',
            motivation: 'Learn professional writing techniques',
            cta: 'Start Email Course',
        },
        speaking: {
            greeting: 'Speak English with confidence!',
            motivation: 'Practice makes perfect - let\'s start',
            cta: 'Practice Speaking Now',
        },
        basics: {
            greeting: 'Welcome! Let\'s start your journey 🌱',
            motivation: 'Every expert was once a beginner',
            cta: 'Start Grammar Basics',
        },
        exam: {
            greeting: 'Ace that exam with practice!',
            motivation: 'Consistent practice leads to success',
            cta: 'Take Practice Test',
        },
    };

    return goalMessages[profile.primaryGoal];
}

// Save user profile to Firestore
export async function saveUserProfile(userId: string, profile: UserProfile) {
    const { db } = await import('./firebase');
    const { doc, setDoc } = await import('firebase/firestore');

    await setDoc(doc(db, 'users', userId), {
        profile,
        updatedAt: new Date(),
    }, { merge: true });
}

// Load user profile from Firestore
export async function loadUserProfile(userId: string): Promise<UserProfile | null> {
    const { db } = await import('./firebase');
    const { doc, getDoc } = await import('firebase/firestore');

    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
        const data = userDoc.data();
        return data.profile || null;
    }
    return null;
}

// Check if user has completed onboarding
export async function hasCompletedOnboarding(userId: string): Promise<boolean> {
    const profile = await loadUserProfile(userId);
    return profile?.onboardingCompleted || false;
}
