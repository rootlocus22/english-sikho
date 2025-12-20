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
    };
    setVoicePreferences: (prefs: Partial<UserState['voicePreferences']>) => void;
    fetchUserProfile: (uid: string) => Promise<void>;
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
                accent: 'us',
                voiceName: null,
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
                                credits: data.credits || 0
                            },
                            credits: data.credits || 0
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
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
