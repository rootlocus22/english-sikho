import { create } from 'zustand';

interface UserState {
    userId: string | null;
    setUserId: (id: string | null) => void;
    userData: {
        email: string;
        displayName: string | null;
        photoURL: string | null;
        isPremium: boolean;
        credits: number;
        // Gamification
        lessonsCompleted?: number;
        currentStreak?: number;
        lastLessonDate?: string;
        completedLessons?: string[];
    } | null;
    setUserData: (data: UserState['userData']) => void;
    credits: number;
    setCredits: (credits: number) => void;
    guestUsageCount: number;
    incrementGuestUsage: () => void;
    decrementCredits: () => void;
    isPaywallOpen: boolean;
    setPaywallOpen: (open: boolean) => void;
    openPaywall: () => void;
    voicePreferences: {
        gender: 'male' | 'female' | 'any';
        accent: 'us' | 'uk' | 'in' | 'any';
        voiceName: string | null; // Specific voice name/URI
        rate?: number; // Speech rate (0.5 - 2.0)
        volume?: number; // Volume (0.0 - 1.0)
    };
    setVoicePreferences: (prefs: Partial<UserState['voicePreferences']>) => void;
    fetchUserProfile: (uid: string) => Promise<void>;
    // Gamification methods
    completeLesson: (lessonId: string) => Promise<void>;
    calculateStreak: () => number;
}

import { persist } from 'zustand/middleware';

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            userId: null,
            setUserId: (id) => set({ userId: id }),
            userData: null,
            setUserData: (data) => set({ userData: data }),
            credits: 10,
            setCredits: (credits) => set({ credits }),
            guestUsageCount: 0,
            incrementGuestUsage: () => set((state) => ({ guestUsageCount: state.guestUsageCount + 1 })),
            decrementCredits: async () => {
                const userId = get().userId;
                const credits = get().credits;
                if (credits <= 0) return;

                // Optimistic update
                set({ credits: credits - 1 });

                if (userId) {
                    try {
                        const { db } = await import("./firebase");
                        const { doc, updateDoc, increment } = await import("firebase/firestore");
                        await updateDoc(doc(db, "users", userId), {
                            credits: increment(-1)
                        });
                    } catch (error) {
                        console.error("Failed to decrement credits in DB", error);
                        // Rollback if needed, but for now simple logging is okay
                    }
                }
            },
            isPaywallOpen: false,
            setPaywallOpen: (open) => set({ isPaywallOpen: open }),
            openPaywall: () => set({ isPaywallOpen: true }),
            voicePreferences: {
                gender: 'female',
                accent: 'in', // Indian English by default
                voiceName: null,
                rate: 1.0,
                volume: 1.0,
            },
            setVoicePreferences: (prefs) => set((state) => ({
                voicePreferences: { ...state.voicePreferences, ...prefs }
            })),
            fetchUserProfile: async (uid: string) => {
                try {
                    const { db } = await import("./firebase");
                    const { doc, getDoc } = await import("firebase/firestore");
                    const userDoc = await getDoc(doc(db, "users", uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        set({
                            userData: {
                                email: data.email,
                                displayName: data.displayName,
                                photoURL: data.photoURL,
                                isPremium: data.isPremium || false,
                                credits: data.credits || 0,
                                lessonsCompleted: data.lessonsCompleted || 0,
                                currentStreak: data.currentStreak || 0,
                                lastLessonDate: data.lastLessonDate,
                                completedLessons: data.completedLessons || []
                            },
                            credits: data.credits || 0
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            },
            // Complete a lesson and update progress
            completeLesson: async (lessonId: string) => {
                const userId = get().userId;
                const userData = get().userData;
                if (!userData) return;

                const completedLessons = userData.completedLessons || [];
                if (completedLessons.includes(lessonId)) return;

                const newCompletedLessons = [...completedLessons, lessonId];
                const today = new Date().toISOString().split('T')[0];
                const lessonsCompleted = (userData.lessonsCompleted || 0) + 1;

                // Calculate streak
                const lastDate = userData.lastLessonDate;
                let currentStreak = userData.currentStreak || 0;

                if (lastDate) {
                    const lastDateObj = new Date(lastDate);
                    const todayObj = new Date(today);
                    const diffDays = Math.floor((todayObj.getTime() - lastDateObj.getTime()) / (1000 * 60 * 60 * 24));

                    if (diffDays === 1) currentStreak += 1;
                    else if (diffDays === 0) currentStreak = currentStreak;
                    else currentStreak = 1;
                } else {
                    currentStreak = 1;
                }

                const updatedData = {
                    ...userData,
                    lessonsCompleted,
                    currentStreak,
                    lastLessonDate: today,
                    completedLessons: newCompletedLessons
                };

                set({ userData: updatedData });

                if (userId) {
                    try {
                        const { db } = await import("./firebase");
                        const { doc, updateDoc } = await import("firebase/firestore");
                        await updateDoc(doc(db, "users", userId), {
                            lessonsCompleted,
                            currentStreak,
                            lastLessonDate: today,
                            completedLessons: newCompletedLessons
                        });
                    } catch (error) {
                        console.error("Error updating lesson progress:", error);
                    }
                }
            },
            calculateStreak: () => {
                const userData = get().userData;
                if (!userData?.lastLessonDate) return 0;

                const today = new Date().toISOString().split('T')[0];
                const lastDate = userData.lastLessonDate;
                const diffDays = Math.floor((new Date(today).getTime() - new Date(lastDate).getTime()) / (1000 * 60 * 60 * 24));

                if (diffDays > 1) return 0;
                return userData.currentStreak || 0;
            }
        }),
        {
            name: 'english-sikho-storage',
            partialize: (state) => ({
                guestUsageCount: state.guestUsageCount,
                voicePreferences: state.voicePreferences
            }),
        }
    )
);
