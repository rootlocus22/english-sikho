// Analytics data fetching and aggregation helpers

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';

export interface SessionData {
    feature: string;
    timestamp: Date;
    creditsUsed: number;
    score?: number;
}

export interface AnalyticsData {
    totalSessions: number;
    currentStreak: number;
    averageScore: number;
    mostUsedFeature: string;
    sessionsByFeature: { name: string; count: number }[];
    sessionsOverTime: { date: string; sessions: number }[];
    recentActivity: SessionData[];
}

const FEATURE_LABELS: Record<string, string> = {
    'translator': 'Translator',
    'tone-rewrite': 'Tone Rewriter',
    'roleplay-chat': 'Roleplay',
    'image-analysis': 'Reply Helper',
    'speaking-coach': 'Speaking Coach', // Normalized key
    'speech-coach': 'Speaking Coach',   // Legacy key
    'interview-coach': 'Interview Prep',
    'coach': 'Speech Practice'
};

export async function getUserAnalytics(userId: string): Promise<AnalyticsData> {
    try {
        const activityRef = collection(db, 'users', userId, 'activity');
        // Simple query first to avoid index issues
        const q = query(activityRef, orderBy('timestamp', 'desc'), limit(100));

        const snapshot = await getDocs(q);
        const activities: SessionData[] = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            activities.push({
                feature: data.feature || 'unknown',
                timestamp: data.timestamp?.toDate() || new Date(),
                creditsUsed: data.creditsUsed || 1,
                score: data.metadata?.score
            });
        });

        const totalSessions = activities.length;

        // Calculate sessions by feature
        const featureCounts: Record<string, number> = {};
        let totalScore = 0;
        let scoreCount = 0;

        activities.forEach(activity => {
            const feature = activity.feature;
            featureCounts[feature] = (featureCounts[feature] || 0) + 1;

            if (activity.score) {
                totalScore += activity.score;
                scoreCount++;
            }
        });

        const averageScore = scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0;

        const sessionsByFeature = Object.entries(featureCounts).map(([feature, count]) => ({
            name: FEATURE_LABELS[feature] || feature,
            count
        })).sort((a, b) => b.count - a.count);

        const mostUsedFeature = sessionsByFeature[0]?.name || 'None yet';
        const sessionsOverTime = getLast7DaysSessions(activities);
        const currentStreak = calculateStreak(activities);

        return {
            totalSessions,
            currentStreak,
            averageScore,
            mostUsedFeature,
            sessionsByFeature,
            sessionsOverTime,
            recentActivity: activities.slice(0, 10)
        };
    } catch (error) {
        console.error('Error fetching analytics:', error);
        // Return empty data on error
        return {
            totalSessions: 0,
            currentStreak: 0,
            averageScore: 0,
            mostUsedFeature: 'None',
            sessionsByFeature: [],
            sessionsOverTime: [],
            recentActivity: []
        };
    }
}

function getLast7DaysSessions(activities: SessionData[]): { date: string; sessions: number }[] {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const dateStr = format(date, 'MMM dd');

        const sessionsOnDate = activities.filter(activity => {
            const activityDate = startOfDay(activity.timestamp);
            const targetDate = startOfDay(date);
            return activityDate.getTime() === targetDate.getTime();
        }).length;

        last7Days.push({ date: dateStr, sessions: sessionsOnDate });
    }
    return last7Days;
}

function calculateStreak(activities: SessionData[]): number {
    if (activities.length === 0) return 0;

    const sortedActivities = [...activities].sort((a, b) =>
        b.timestamp.getTime() - a.timestamp.getTime()
    );

    let streak = 0;
    let currentDate = new Date();
    currentDate = startOfDay(currentDate);

    for (let i = 0; i < 30; i++) {
        const hasActivityOnDate = sortedActivities.some(activity => {
            const activityDate = startOfDay(activity.timestamp);
            return activityDate.getTime() === currentDate.getTime();
        });

        if (hasActivityOnDate) {
            streak++;
            currentDate = subDays(currentDate, 1);
        } else if (i === 0) {
            // If no activity today, check yesterday
            currentDate = subDays(currentDate, 1);
            const hasActivityYesterday = sortedActivities.some(activity => {
                const activityDate = startOfDay(activity.timestamp);
                return activityDate.getTime() === currentDate.getTime();
            });

            if (hasActivityYesterday) {
                streak++;
                currentDate = subDays(currentDate, 1);
            } else {
                break; // Streak broken
            }
        } else {
            break; // Streak broken
        }
    }

    return streak;
}

// Helper to get simple stats from user document (fallback if no activity subcollection)
export function getBasicStats(userData: any) {
    return {
        totalSessions: userData?.totalSessionsUsed || 0,
        credits: userData?.credits || 0,
        isPremium: userData?.isPremium || false,
        subscriptionTier: userData?.subscription?.tier || 'free'
    };
}
