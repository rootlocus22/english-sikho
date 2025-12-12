'use server';

import { adminDb } from '@/lib/firebase-admin';
import { AnalyticsData, SessionData } from '@/lib/analytics-data';
import { format, subDays, startOfDay } from 'date-fns';

const FEATURE_LABELS: Record<string, string> = {
    'translator': 'Translator',
    'tone-rewrite': 'Tone Rewriter',
    'roleplay-chat': 'Roleplay',
    'image-analysis': 'Reply Helper',
    'speaking-coach': 'Speaking Coach',
    'speech-coach': 'Speaking Coach',
    'interview-coach': 'Interview Prep',
    'coach': 'Speech Practice'
};

export async function fetchAnalyticsAction(userId: string): Promise<AnalyticsData | null> {
    if (!userId) return null;

    try {
        // Use Admin SDK (bypasses rules)
        const snapshot = await adminDb
            .collection('users')
            .doc(userId)
            .collection('activity')
            .orderBy('timestamp', 'desc')
            .limit(100)
            .get();

        const activities: SessionData[] = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            // Handle timestamp conversion from Firestore Admin Timestamp
            const timestamp = data.timestamp?.toDate ? data.timestamp.toDate() : new Date();

            activities.push({
                feature: data.feature || 'unknown',
                timestamp,
                creditsUsed: data.creditsUsed || 0, // Default to 0 for safety
                score: data.metadata?.score
            });
        });

        // --- Aggregation Logic (Copied from lib/analytics-data.ts) ---

        const totalSessions = activities.length;

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

        // Helper inline for Server Action context
        const getLast7DaysSessions = (acts: SessionData[]) => {
            const last7Days = [];
            for (let i = 6; i >= 0; i--) {
                const date = subDays(new Date(), i);
                const dateStr = format(date, 'MMM dd');
                const sessionsOnDate = acts.filter(activity => {
                    const activityDate = startOfDay(activity.timestamp);
                    const targetDate = startOfDay(date);
                    return activityDate.getTime() === targetDate.getTime();
                }).length;
                last7Days.push({ date: dateStr, sessions: sessionsOnDate });
            }
            return last7Days;
        };

        const calculateStreak = (acts: SessionData[]) => {
            if (acts.length === 0) return 0;
            const sorted = [...acts].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
            let streak = 0;
            let currentDate = startOfDay(new Date());

            for (let i = 0; i < 30; i++) {
                const hasActivity = sorted.some(a => startOfDay(a.timestamp).getTime() === currentDate.getTime());
                if (hasActivity) {
                    streak++;
                    currentDate = subDays(currentDate, 1);
                } else if (i === 0) {
                    // Check yesterday if nothing today
                    currentDate = subDays(currentDate, 1);
                    const hasYesterday = sorted.some(a => startOfDay(a.timestamp).getTime() === currentDate.getTime());
                    if (hasYesterday) {
                        streak++;
                        currentDate = subDays(currentDate, 1);
                    } else { break; }
                } else {
                    break;
                }
            }
            return streak;
        };

        const sessionsOverTime = getLast7DaysSessions(activities);
        const currentStreak = calculateStreak(activities);

        return {
            totalSessions,
            currentStreak,
            averageScore,
            mostUsedFeature,
            sessionsByFeature,
            sessionsOverTime,
            recentActivity: activities.slice(0, 10).map(a => ({ ...a, timestamp: a.timestamp })) // Ensure serializable? Date is fine in Next.js actions usually, but warning.
        };

    } catch (error) {
        console.error("Server Action Analytics Error:", error);
        return null;
    }
}
