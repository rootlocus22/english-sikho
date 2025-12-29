"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store";
import { UserProfile, loadUserProfile, getDashboardMessage } from "@/lib/userProfile";
import TranslatorComponent from "@/components/TranslatorComponent";
import VoiceSettings from "@/components/VoiceSettings";
import OnboardingBanner from "@/components/onboarding/OnboardingBanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-elements";
import { ArrowRight, BookOpen, Trophy, Zap, ExternalLink, Mail, Flame } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DailyGoals from "@/components/DailyGoals";
import QuickActions from "@/components/QuickActions";

// Feature mapping for personalized recommendations
const featureMap: Record<string, { title: string; href: string; description: string; icon: any }> = {
    'interview-prep': {
        title: 'Interview Simulator',
        href: '/dashboard/interview-prep',
        description: 'Practice mock interviews',
        icon: Trophy,
    },
    'speaking': {
        title: 'Speaking Coach',
        href: '/dashboard/coach',
        description: 'Improve pronunciation',
        icon: Zap,
    },
    'templates': {
        title: 'Email Templates',
        href: '/dashboard/templates',
        description: 'Professional email samples',
        icon: BookOpen,
    },
    'tone': {
        title: 'Email Tone Rewriter',
        href: '/dashboard/tone',
        description: 'Sound more professional',
        icon: Zap,
    },
    'gym': {
        title: 'Real-Life Practice',
        href: '/dashboard/gym',
        description: 'Workplace scenarios',
        icon: Trophy,
    },
    'resume-review': {
        title: 'Resume Builder (ResumeGyani)',
        href: 'https://resumegyani.in',
        description: 'Build ATS-friendly resume',
        icon: ExternalLink,
    },
    'grammar-basics': {
        title: 'Grammar Foundation',
        href: '/dashboard/grammar-basics',
        description: 'Master English basics',
        icon: BookOpen,
    },
    'vocabulary': {
        title: 'Vocabulary Builder',
        href: '/dashboard/vocabulary',
        description: 'Learn business terms',
        icon: BookOpen,
    },
    'email-course': {
        title: 'Email Writing Course',
        href: '/dashboard/email-course',
        description: 'Write professional emails',
        icon: Mail,
    },
};

export default function DashboardPage() {
    const router = useRouter();
    const { userId, userData } = useUserStore();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                const userProfile = await loadUserProfile(userId);
                setProfile(userProfile);
            } catch (error) {
                console.error("Error loading profile:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [userId]);

    // Show banner for users who haven't completed onboarding
    const showOnboardingBanner = !loading && (!profile || !profile.onboardingCompleted);

    // Get personalized message
    const dashboardMsg = profile ? getDashboardMessage(profile) : null;

    // Get recommended features
    const recommendedFeatures = profile?.recommendedFeatures
        ?.map(id => featureMap[id])
        ?.filter(Boolean) || [];

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Onboarding Banner for Existing Users */}
            {showOnboardingBanner && <OnboardingBanner />}

            {/* Page Header - Personalized or Default */}
            <div className="-mx-4 -mt-4 border-b border-slate-200 bg-white px-4 py-6 md:px-6 md:py-8">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        {loading ? (
                            <>
                                <Skeleton className="h-8 w-64 mb-2" />
                                <Skeleton className="h-4 w-96" />
                            </>
                        ) : profile ? (
                            <>
                                <h1 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
                                    {dashboardMsg?.greeting || "Welcome to EnglishGyani!"}
                                </h1>
                                <p className="text-sm text-slate-600 md:text-base">
                                    {dashboardMsg?.motivation || "Start improving your English today"}
                                </p>
                            </>
                        ) : (
                            <>
                                <h1 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
                                    Apni English Sudharo
                                </h1>
                                <p className="text-sm text-slate-600 md:text-base">
                                    Instantly translate 'Hinglish' to Corporate English using our AI tools.
                                </p>
                            </>
                        )}
                    </div>
                    <VoiceSettings />
                </div>
            </div>

            {/* Daily Goals & Streak */}
            {userId && (
                <div className="grid md:grid-cols-2 gap-4">
                    <DailyGoals />
                    <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-orange-200">
                        <div className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="p-2 sm:p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                                        <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base sm:text-lg">Current Streak</h3>
                                        <p className="text-xs sm:text-sm text-muted-foreground">Keep practicing daily!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center py-3 sm:py-4">
                                <div className="text-4xl sm:text-5xl font-bold text-orange-600 mb-2">
                                    {userData?.currentStreak || 0}
                                </div>
                                <p className="text-xs sm:text-sm text-muted-foreground">Days in a row</p>
                            </div>
                            {userData && userData.currentStreak && userData.currentStreak > 0 && (
                                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
                                    <p className="text-xs text-muted-foreground text-center">
                                        🔥 {userData.currentStreak === 1 ? 'Great start!' : 
                                            userData.currentStreak < 7 ? 'Keep it going!' :
                                            userData.currentStreak < 30 ? 'You\'re on fire!' :
                                            'Incredible dedication!'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            )}

            {/* Quick Actions */}
            <QuickActions />

            {/* Personalized Recommendations */}
            {profile && recommendedFeatures.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Recommended for You</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {recommendedFeatures.slice(0, 3).map((feature, index) => {
                            const Icon = feature.icon;
                            const isExternal = feature.href.startsWith('http');

                            return (
                                <TrackedLink
                                    key={index}
                                    href={feature.href}
                                    target={isExternal ? "_blank" : undefined}
                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                    eventData={{
                                        action: 'click_recommended_feature',
                                        category: 'personalization',
                                        label: feature.title
                                    }}
                                >
                                    <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold mb-1 flex items-center gap-2">
                                                    {feature.title}
                                                    {isExternal && <ExternalLink className="w-4 h-4" />}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </TrackedLink>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Main Tool - Translator */}
            <div className="w-full">
                <TranslatorComponent />
            </div>

            {/* Quick Action CTA */}
            {profile && dashboardMsg && (
                <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold mb-1">Ready to practice?</h3>
                            <p className="text-sm text-white/80">{dashboardMsg.motivation}</p>
                        </div>
                        <Button
                            variant="secondary"
                            onClick={() => router.push(
                                profile.primaryGoal === 'interview' ? '/dashboard/interview-prep' :
                                    profile.primaryGoal === 'speaking' ? '/dashboard/coach' :
                                        profile.primaryGoal === 'writing' ? '/dashboard/tone' :
                                            '/dashboard/gym'
                            )}
                        >
                            {dashboardMsg.cta}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
