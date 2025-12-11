import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";

export interface UserData {
    email: string;
    displayName: string | null;
    photoURL: string | null;
    createdAt: any;
    isPremium: boolean;
    credits: number;
    totalSessionsUsed: number;
    lastSessionAt: any;
}

/**
 * Creates a new user document in Firestore with default values
 */
export async function createUser(
    userId: string,
    email: string,
    displayName: string | null,
    photoURL: string | null
): Promise<UserData> {
    const userData: UserData = {
        email,
        displayName,
        photoURL,
        createdAt: serverTimestamp(),
        isPremium: false,
        credits: 10, // Free credits for new users
        totalSessionsUsed: 0,
        lastSessionAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", userId), userData);
    return userData;
}

/**
 * Fetches user data from Firestore
 */
export async function getUserData(userId: string): Promise<UserData | null> {
    try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
            return userDoc.data() as UserData;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

/**
 * Decrements user credits by 1 (atomic operation)
 */
export async function decrementCredits(userId: string): Promise<boolean> {
    try {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            console.error("User not found");
            return false;
        }

        const userData = userDoc.data() as UserData;

        // Check if user has credits
        if (userData.credits <= 0 && !userData.isPremium) {
            console.error("No credits remaining");
            return false;
        }

        // Update credits and session stats
        await updateDoc(userRef, {
            credits: userData.isPremium ? userData.credits : increment(-1),
            totalSessionsUsed: increment(1),
            lastSessionAt: serverTimestamp(),
        });

        return true;
    } catch (error) {
        console.error("Error decrementing credits:", error);
        return false;
    }
}

/**
 * Adds credits to user account (for purchases or rewards)
 */
export async function addCredits(userId: string, amount: number): Promise<boolean> {
    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            credits: increment(amount),
        });
        return true;
    } catch (error) {
        console.error("Error adding credits:", error);
        return false;
    }
}

/**
 * Upgrades user to premium
 */
export async function upgradeToPremium(userId: string): Promise<boolean> {
    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            isPremium: true,
            credits: 999999, // Unlimited for display purposes
        });
        return true;
    } catch (error) {
        console.error("Error upgrading to premium:", error);
        return false;
    }
}
