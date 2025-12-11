export interface UserProfile {
    uid: string;
    email: string | null;
    credits: number;
    isPremium: boolean;
    joinedAt: Date;
}

export interface UsageLog {
    id: string;
    userId: string;
    inputText: string;
    aiResponse: string;
    toolType: 'translator' | 'coach';
    timestamp: Date;
}

export type TranslatorOutput = {
    formal: string;
    persuasive: string;
    casualProfessional: string;
};
