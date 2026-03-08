import { adminDb } from './firebase-admin';

export interface LearnerProfile {
    level: string;
    weakAreas: string[];
    commonMistakes: string[];
    averageScore: number;
    totalSessions: number;
    mostPracticedFeatures: string[];
    recentTopics: string[];
    pronunciationWeaknesses: string[];
}

export async function getLearnerProfile(userId: string): Promise<LearnerProfile | null> {
    try {
        const userDoc = await adminDb.collection('users').doc(userId).get();
        const userData = userDoc.data();

        const activitySnap = await adminDb
            .collection('users').doc(userId).collection('activity')
            .orderBy('timestamp', 'desc')
            .limit(50)
            .get();

        const activities: any[] = [];
        activitySnap.forEach(doc => activities.push(doc.data()));

        const scores = activities
            .filter(a => a.metadata?.score != null)
            .map(a => a.metadata.score);

        const avgScore = scores.length > 0
            ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length)
            : 0;

        const featureCounts: Record<string, number> = {};
        const recentTopics: string[] = [];
        activities.filter(a => a.feature).forEach(a => {
            featureCounts[a.feature] = (featureCounts[a.feature] || 0) + 1;
            if (a.metadata?.scenarioId && !recentTopics.includes(a.metadata.scenarioId)) {
                recentTopics.push(a.metadata.scenarioId);
            }
        });

        const mostPracticedFeatures = Object.entries(featureCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([f]) => f);

        const weakAreas: string[] = [];
        const lowScores = activities.filter(a => a.metadata?.score != null && a.metadata.score < 60);
        if (lowScores.length > 0) {
            const weakFeatures = new Set(lowScores.map(a => a.feature));
            weakAreas.push(...weakFeatures);
        }

        const progressDoc = await adminDb
            .collection('users').doc(userId).collection('progress').doc('learning')
            .get();

        const progressData = progressDoc.exists ? progressDoc.data() : null;

        const commonMistakes: string[] = [];
        if (progressData?.mistakesLearned && progressData.mistakesLearned.length < 5) {
            commonMistakes.push('Common Indian English mistakes (e.g., "do the needful", "revert back")');
        }

        const pronunciationWeaknesses: string[] = [];
        if (avgScore > 0 && avgScore < 70) {
            pronunciationWeaknesses.push('MTI patterns', 'clarity');
        }

        let level = 'intermediate';
        if (avgScore >= 80) level = 'advanced';
        else if (avgScore >= 60) level = 'intermediate';
        else if (avgScore > 0) level = 'beginner';
        else if (userData?.profile?.currentLevel) level = userData.profile.currentLevel;

        return {
            level,
            weakAreas,
            commonMistakes,
            averageScore: avgScore,
            totalSessions: activities.length,
            mostPracticedFeatures,
            recentTopics: recentTopics.slice(0, 5),
            pronunciationWeaknesses,
        };
    } catch (error) {
        console.error('Failed to build learner profile:', error);
        return null;
    }
}

export function buildContextBlock(profile: LearnerProfile): string {
    const parts: string[] = [`Learner Context: ${profile.level} level.`];

    if (profile.averageScore > 0) {
        parts.push(`Average speaking score: ${profile.averageScore}/100.`);
    }

    parts.push(`Total sessions practiced: ${profile.totalSessions}.`);

    if (profile.weakAreas.length > 0) {
        parts.push(`Weak areas: ${profile.weakAreas.join(', ')}.`);
    }

    if (profile.commonMistakes.length > 0) {
        parts.push(`Still working on: ${profile.commonMistakes.join(', ')}.`);
    }

    if (profile.pronunciationWeaknesses.length > 0) {
        parts.push(`Pronunciation focus: ${profile.pronunciationWeaknesses.join(', ')}.`);
    }

    if (profile.recentTopics.length > 0) {
        parts.push(`Recently practiced topics: ${profile.recentTopics.join(', ')}.`);
    }

    if (profile.mostPracticedFeatures.length > 0) {
        parts.push(`Most used features: ${profile.mostPracticedFeatures.join(', ')}.`);
    }

    return parts.join(' ');
}
