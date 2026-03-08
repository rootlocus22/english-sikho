import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export interface UserProgress {
    grammarCompleted: string[];
    emailCourseCompleted: string[];
    vocabLearned: string[];
    vocabReview: string[];
    vocabReviewSchedule: Record<string, { nextReview: string; interval: number }>;
    mistakesLearned: string[];
    dailyGoals: Record<string, Record<string, number>>;
    dailyWord: Record<string, { word: string; completed: boolean; attempts: number }>;
    lastSynced: string;
}

const DEFAULT_PROGRESS: UserProgress = {
    grammarCompleted: [],
    emailCourseCompleted: [],
    vocabLearned: [],
    vocabReview: [],
    vocabReviewSchedule: {},
    mistakesLearned: [],
    dailyGoals: {},
    dailyWord: {},
    lastSynced: new Date().toISOString(),
};

function getProgressRef(userId: string) {
    return doc(db, 'users', userId, 'progress', 'learning');
}

export async function loadProgress(userId: string): Promise<UserProgress> {
    try {
        const progressDoc = await getDoc(getProgressRef(userId));
        if (progressDoc.exists()) {
            const remote = progressDoc.data() as UserProgress;
            const local = loadLocalProgress(userId);
            const merged = mergeProgress(remote, local);
            saveLocalProgress(userId, merged);
            return merged;
        }

        const local = loadLocalProgress(userId);
        if (hasLocalData(local)) {
            await setDoc(getProgressRef(userId), { ...local, lastSynced: new Date().toISOString() });
            return local;
        }

        return { ...DEFAULT_PROGRESS };
    } catch (error) {
        console.error('Failed to load progress from Firestore, using local:', error);
        return loadLocalProgress(userId);
    }
}

function stripUndefined(obj: Record<string, unknown>): Record<string, unknown> {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

export async function saveProgress(userId: string, progress: Partial<UserProgress>): Promise<void> {
    const full = stripUndefined({ ...progress, lastSynced: new Date().toISOString() });
    saveLocalProgressPartial(userId, full as Partial<UserProgress>);

    try {
        const progressRef = getProgressRef(userId);
        const existing = await getDoc(progressRef);
        if (existing.exists()) {
            await updateDoc(progressRef, full);
        } else {
            await setDoc(progressRef, { ...DEFAULT_PROGRESS, ...full });
        }
    } catch (error) {
        console.error('Failed to save progress to Firestore, saved locally:', error);
    }
}

function mergeProgress(remote: UserProgress, local: UserProgress): UserProgress {
    return {
        grammarCompleted: mergeArrays(remote.grammarCompleted, local.grammarCompleted),
        emailCourseCompleted: mergeArrays(remote.emailCourseCompleted, local.emailCourseCompleted),
        vocabLearned: mergeArrays(remote.vocabLearned, local.vocabLearned),
        vocabReview: mergeArrays(remote.vocabReview, local.vocabReview),
        vocabReviewSchedule: { ...local.vocabReviewSchedule, ...remote.vocabReviewSchedule },
        mistakesLearned: mergeArrays(remote.mistakesLearned, local.mistakesLearned),
        dailyGoals: { ...local.dailyGoals, ...remote.dailyGoals },
        dailyWord: { ...local.dailyWord, ...remote.dailyWord },
        lastSynced: new Date().toISOString(),
    };
}

function mergeArrays(a: string[] = [], b: string[] = []): string[] {
    return [...new Set([...a, ...b])];
}

function hasLocalData(progress: UserProgress): boolean {
    return (
        progress.grammarCompleted.length > 0 ||
        progress.emailCourseCompleted.length > 0 ||
        progress.vocabLearned.length > 0 ||
        progress.mistakesLearned.length > 0
    );
}

function loadLocalProgress(userId: string): UserProgress {
    if (typeof window === 'undefined') return { ...DEFAULT_PROGRESS };

    try {
        const grammar = JSON.parse(localStorage.getItem(`grammar-progress-${userId}`) || '[]');
        const email = JSON.parse(localStorage.getItem(`email-course-progress-${userId}`) || '[]');
        const vocabLearned = JSON.parse(localStorage.getItem(`vocab-learned-${userId}`) || '[]');
        const vocabReview = JSON.parse(localStorage.getItem(`vocab-review-${userId}`) || '[]');
        const mistakes = JSON.parse(localStorage.getItem(`mistakes-learned-${userId}`) || '[]');
        const vocabScheduleRaw = localStorage.getItem(`vocab-review-schedule-${userId}`);
        const vocabReviewSchedule = vocabScheduleRaw ? JSON.parse(vocabScheduleRaw) : {};

        const today = new Date().toISOString().split('T')[0];
        const dailyGoalsRaw = localStorage.getItem(`daily-goals-${userId}-${today}`);
        const dailyGoals: Record<string, Record<string, number>> = {};
        if (dailyGoalsRaw) {
            dailyGoals[today] = JSON.parse(dailyGoalsRaw);
        }

        const dailyWordRaw = localStorage.getItem(`daily-word-${userId}-${new Date().toDateString()}`);
        const dailyWord: Record<string, { word: string; completed: boolean; attempts: number }> = {};
        if (dailyWordRaw) {
            dailyWord[today] = JSON.parse(dailyWordRaw);
        }

        return {
            grammarCompleted: Array.isArray(grammar) ? grammar : [],
            emailCourseCompleted: Array.isArray(email) ? email : [],
            vocabLearned: Array.isArray(vocabLearned) ? vocabLearned : [],
            vocabReview: Array.isArray(vocabReview) ? vocabReview : [],
            vocabReviewSchedule: vocabReviewSchedule && typeof vocabReviewSchedule === 'object' ? vocabReviewSchedule : {},
            mistakesLearned: Array.isArray(mistakes) ? mistakes : [],
            dailyGoals,
            dailyWord,
            lastSynced: '',
        };
    } catch {
        return { ...DEFAULT_PROGRESS };
    }
}

function saveLocalProgress(userId: string, progress: UserProgress): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(`grammar-progress-${userId}`, JSON.stringify(progress.grammarCompleted));
        localStorage.setItem(`email-course-progress-${userId}`, JSON.stringify(progress.emailCourseCompleted));
        localStorage.setItem(`vocab-learned-${userId}`, JSON.stringify(progress.vocabLearned));
        localStorage.setItem(`vocab-review-${userId}`, JSON.stringify(progress.vocabReview));
        localStorage.setItem(`mistakes-learned-${userId}`, JSON.stringify(progress.mistakesLearned));
        if (progress.vocabReviewSchedule && Object.keys(progress.vocabReviewSchedule).length > 0) {
            localStorage.setItem(`vocab-review-schedule-${userId}`, JSON.stringify(progress.vocabReviewSchedule));
        }
    } catch {
        // localStorage might be full
    }
}

function saveLocalProgressPartial(userId: string, progress: Partial<UserProgress>): void {
    if (typeof window === 'undefined') return;
    try {
        if (progress.grammarCompleted) localStorage.setItem(`grammar-progress-${userId}`, JSON.stringify(progress.grammarCompleted));
        if (progress.emailCourseCompleted) localStorage.setItem(`email-course-progress-${userId}`, JSON.stringify(progress.emailCourseCompleted));
        if (progress.vocabLearned) localStorage.setItem(`vocab-learned-${userId}`, JSON.stringify(progress.vocabLearned));
        if (progress.vocabReview) localStorage.setItem(`vocab-review-${userId}`, JSON.stringify(progress.vocabReview));
        if (progress.mistakesLearned) localStorage.setItem(`mistakes-learned-${userId}`, JSON.stringify(progress.mistakesLearned));
        if (progress.vocabReviewSchedule) localStorage.setItem(`vocab-review-schedule-${userId}`, JSON.stringify(progress.vocabReviewSchedule));
    } catch {
        // localStorage might be full
    }
}
