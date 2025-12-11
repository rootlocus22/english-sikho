import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase (Client Side)
import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { Analytics, getAnalytics, isSupported } from "firebase/analytics";

let app: FirebaseApp = null as unknown as FirebaseApp;
let auth: Auth = null as unknown as Auth;
let db: Firestore = null as unknown as Firestore;
let analytics: Analytics | null = null;

try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    if (typeof window !== 'undefined') {
        isSupported().then((supported) => {
            if (supported) {
                analytics = getAnalytics(app);
            }
        });
    }
} catch (error) {
    console.warn("Firebase initialization failed", error);
}

export { app, auth, db, analytics };
