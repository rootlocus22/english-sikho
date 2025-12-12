import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export interface ActivityLog {
    userId: string;
    feature: string; // e.g., 'speaking-coach', 'translator', 'roleplay'
    creditsUsed: number;
    metadata?: Record<string, any>;
    timestamp?: Date;
}

/**
 * Logs user activity to the 'activity' subcollection in Firestore.
 * This is used to populate the Analytics Dashboard.
 */
export async function trackActivity({ userId, feature, creditsUsed, metadata = {} }: ActivityLog) {
    if (!userId) {
        console.warn('trackActivity: No userId provided, skipping log');
        return;
    }

    try {
        const activityRef = adminDb.collection('users').doc(userId).collection('activity');

        await activityRef.add({
            feature,
            creditsUsed,
            metadata: JSON.parse(JSON.stringify(metadata)),
            timestamp: FieldValue.serverTimestamp(),
            // Store nice-to-have date fields for easier querying if needed
            date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            createdAt: new Date().toISOString()
        });

        console.log(`[Analytics] Logged activity for ${userId}: ${feature}`);
    } catch (error) {
        console.error('[Analytics] Failed to log activity:', error);
        // We don't throw here to avoid failing the main user request just because stats failed
    }
}
