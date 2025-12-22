"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
    PrimaryGoal,
    UserLevel,
    TimeCommitment,
    TargetTimeline,
    challengeOptions,
    getRecommendedFeatures,
    saveUserProfile
} from "@/lib/userProfile";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";

const goalOptions: { value: PrimaryGoal; label: string; icon: string; description: string }[] = [
    { value: 'interview', label: 'Job Interview Prep', icon: '🎯', description: 'Ace your next interview' },
    { value: 'business', label: 'Workplace English', icon: '💼', description: 'Communicate professionally' },
    { value: 'writing', label: 'Email & Writing', icon: '📧', description: 'Write impressive emails' },
    { value: 'speaking', label: 'Speaking Confidence', icon: '🗣️', description: 'Speak without hesitation' },
    { value: 'basics', label: 'Start from Basics', icon: '📚', description: 'Build strong foundation' },
    { value: 'exam', label: 'Exam Preparation', icon: '🎓', description: 'IELTS, TOEFL prep' },
];

const levelOptions: { value: UserLevel; label: string; hindiExample: string }[] = [
    { value: 'beginner', label: 'Beginner', hindiExample: 'मुझे scratch से सीखनी है' },
    { value: 'elementary', label: 'Elementary', hindiExample: 'Main basic bol leta hoon' },
    { value: 'intermediate', label: 'Intermediate', hindiExample: 'Good but want professional' },
    { value: 'advanced', label: 'Advanced', hindiExample: 'Want native-level fluency' },
];

export default function OnboardingPage() {
    const router = useRouter();
    const { userId } = useUserStore();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form data
    const [goal, setGoal] = useState<PrimaryGoal | null>(null);
    const [level, setLevel] = useState<UserLevel | null>(null);
    const [challenges, setChallenges] = useState<string[]>([]);
    const [timeCommitment, setTimeCommitment] = useState<TimeCommitment>('15-20');
    const [timeline, setTimeline] = useState<TargetTimeline>('3months');

    const totalSteps = 4;
    const progress = (step / totalSteps) * 100;

    const handleChallengeToggle = (challengeId: string) => {
        setChallenges(prev =>
            prev.includes(challengeId)
                ? prev.filter(c => c !== challengeId)
                : [...prev, challengeId]
        );
    };

    const handleComplete = async () => {
        if (!userId || !goal || !level) {
            toast.error("Please complete all steps");
            return;
        }

        setLoading(true);
        try {
            const profile = {
                onboardingCompleted: true,
                primaryGoal: goal,
                currentLevel: level,
                challenges,
                dailyTimeCommitment: timeCommitment,
                targetTimeline: timeline,
                recommendedFeatures: getRecommendedFeatures({ primaryGoal: goal, currentLevel: level }),
                onboardingDate: new Date(),
                lastActive: new Date(),
            };

            await saveUserProfile(userId, profile);
            toast.success("🎉 Profile created! Let's start learning!");
            router.push('/dashboard');
        } catch (error) {
            console.error("Onboarding error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const canProceed = () => {
        switch (step) {
            case 1: return goal !== null;
            case 2: return level !== null;
            case 3: return challenges.length > 0;
            case 4: return true;
            default: return false;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
            <div className="container max-w-2xl mx-auto p-6 py-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-200">Personalized Setup</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Welcome to EnglishGyani! 👋</h1>
                    <p className="text-muted-foreground">
                        Answer 4 quick questions to personalize your learning experience
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Step {step} of {totalSteps}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Step Content */}
                <Card className="p-8">
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-center mb-6">
                                What brings you here today?
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {goalOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setGoal(option.value)}
                                        className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg ${goal === option.value
                                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                                            }`}
                                    >
                                        <div className="text-4xl mb-3">{option.icon}</div>
                                        <div className="font-bold text-lg mb-1">{option.label}</div>
                                        <div className="text-sm text-muted-foreground">{option.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-center mb-6">
                                How's your English right now?
                            </h2>
                            <div className="space-y-4">
                                {levelOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setLevel(option.value)}
                                        className={`w-full p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg ${level === option.value
                                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-bold text-lg mb-1">{option.label}</div>
                                                <div className="text-sm text-muted-foreground italic">
                                                    "{option.hindiExample}"
                                                </div>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${level === option.value ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                                                }`}>
                                                {level === option.value && (
                                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-center mb-2">
                                What do you struggle with?
                            </h2>
                            <p className="text-center text-muted-foreground mb-6">
                                Select all that apply
                            </p>
                            <div className="space-y-3">
                                {challengeOptions.map((option) => (
                                    <label
                                        key={option.id}
                                        className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${challenges.includes(option.id)
                                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                                                : 'border-gray-200 dark:border-gray-700'
                                            }`}
                                    >
                                        <Checkbox
                                            checked={challenges.includes(option.id)}
                                            onCheckedChange={() => handleChallengeToggle(option.id)}
                                        />
                                        <span className="text-2xl">{option.icon}</span>
                                        <span className="text-base font-medium">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-center mb-6">
                                    How much time can you dedicate daily?
                                </h2>
                                <div className="space-y-3">
                                    {[
                                        { value: '5-10' as TimeCommitment, label: '5-10 minutes', subtitle: 'Quick daily practice' },
                                        { value: '15-20' as TimeCommitment, label: '15-20 minutes', subtitle: 'Balanced learning (Recommended)' },
                                        { value: '30+' as TimeCommitment, label: '30+ minutes', subtitle: 'Intensive improvement' },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setTimeCommitment(option.value)}
                                            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${timeCommitment === option.value
                                                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                                                }`}
                                        >
                                            <div className="font-bold">{option.label}</div>
                                            <div className="text-sm text-muted-foreground">{option.subtitle}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-center mb-4">
                                    When do you want to see improvement?
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { value: '1month' as TargetTimeline, label: 'In 1 month' },
                                        { value: '3months' as TargetTimeline, label: 'In 3 months' },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setTimeline(option.value)}
                                            className={`p-4 rounded-lg border-2 font-medium transition-all ${timeline === option.value
                                                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </Card>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                    <Button
                        variant="outline"
                        onClick={() => setStep(s => s - 1)}
                        disabled={step === 1 || loading}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>

                    {step < totalSteps ? (
                        <Button
                            onClick={() => setStep(s => s + 1)}
                            disabled={!canProceed() || loading}
                        >
                            Continue
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleComplete}
                            disabled={!canProceed() || loading}
                            className="bg-gradient-to-r from-blue-600 to-purple-600"
                        >
                            {loading ? 'Setting up...' : 'Start Learning'}
                            <Sparkles className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                </div>

                {/* Skip Option */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        disabled={loading}
                    >
                        Skip for now →
                    </button>
                </div>
            </div>
        </div>
    );
}
