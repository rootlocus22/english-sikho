// Type definitions for payment logs and subscriptions

import { Timestamp } from 'firebase/firestore';

export interface PaymentLog {
    userId: string;
    orderId: string;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature?: string;
    amount: number;
    currency: 'INR';
    status: 'pending' | 'success' | 'failed';
    tier: 'starter' | 'pro';
    duration: 'monthly' | 'quarterly' | 'yearly';
    timestamp: Timestamp;
    metadata: {
        userEmail: string;
        userName: string;
        ip?: string;
        userAgent?: string;
    };
}

export interface Subscription {
    tier: 'free' | 'starter' | 'pro';
    plan: 'monthly' | 'quarterly' | 'yearly' | null;
    status: 'active' | 'cancelled' | 'expired';
    startDate: Timestamp;
    endDate: Timestamp;
    renewalDate: Timestamp;
    amount: number;
    currency: 'INR';
    autoRenew: boolean;
}

export interface AcquisitionSource {
    utm_source?: string;      // google, facebook, organic
    utm_medium?: string;       // cpc, social, referral
    utm_campaign?: string;     // campaign name
    utm_term?: string;         // keywords
    utm_content?: string;      // ad variation
    referrer?: string;         // document.referrer
    landingPage?: string;      // first page visited
    signupDate: Timestamp;
}

export interface UserDataExtended {
    email: string;
    displayName: string | null;
    photoURL: string | null;
    createdAt: Timestamp;
    updatedAt?: Timestamp;
    isPremium: boolean;
    credits: number;
    totalSessionsUsed: number;
    lastSessionAt: Timestamp;
    subscription?: Subscription;
    acquisitionSource?: AcquisitionSource;
}
