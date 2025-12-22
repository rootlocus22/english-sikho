'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Trophy, TrendingUp, ArrowRight, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useUserStore } from '@/lib/store';
import Link from 'next/link';

export interface LessonCompletionModalProps {
    isOpen: boolean;
    onClose: () => void;
    lessonTitle: string;
    lessonId: string;
    nextLessonUrl?: string;
    score?: number;
}

/**
 * LessonCompletionModal - Celebratory modal shown after completing a lesson
 * 
 * Shows achievement, progress, streak, and encourages next lesson
 */
export function LessonCompletionModal({
    isOpen,
    onClose,
    lessonTitle,
    lessonId,
    nextLessonUrl,
    score
}: LessonCompletionModalProps) {
    const { userData, completeLesson, calculateStreak } = useUserStore();
    const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

    const lessonsCompleted = userData?.lessonsCompleted || 0;
    const currentStreak = calculateStreak();
    const creditsRemaining = userData?.credits || 0;
    const isPremium = userData?.isPremium || false;

    useEffect(() => {
        if (isOpen && !hasTriggeredConfetti) {
            // Trigger confetti animation
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            // Mark lesson as complete
            completeLesson(lessonId);

            setHasTriggeredConfetti(true);
        }

        if (!isOpen) {
            setHasTriggeredConfetti(false);
        }
    }, [isOpen, hasTriggeredConfetti, lessonId, completeLesson]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <div className="text-center space-y-6 py-4">
                    {/* Trophy Icon */}
                    <div className="flex justify-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                            <Trophy className="w-10 h-10 text-white" />
                        </div>
                    </div>

                    {/* Heading */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            🎉 Lesson Complete!
                        </h2>
                        <p className="text-gray-600">
                            Great job! You completed <span className="font-semibold">{lessonTitle}</span>
                        </p>
                    </div>

                    {/* Score (if provided) */}
                    {score !== undefined && (
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4">
                            <p className="text-sm text-purple-600 mb-1">Your Score</p>
                            <p className="text-4xl font-bold text-purple-700">{score}%</p>
                        </div>
                    )}

                    {/* Progress Stats */}
                    <div className="grid grid-cols-2 gap-3">
                        <Card className="p-4 bg-blue-50 border-blue-200">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <TrendingUp className="w-4 h-4 text-blue-600" />
                                <p className="text-xs text-blue-600 font-medium">Progress</p>
                            </div>
                            <p className="text-2xl font-bold text-blue-700">{lessonsCompleted}</p>
                            <p className="text-xs text-blue-600">lessons done</p>
                        </Card>

                        <Card className="p-4 bg-orange-50 border-orange-200">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <Flame className="w-4 h-4 text-orange-600" />
                                <p className="text-xs text-orange-600 font-medium">Streak</p>
                            </div>
                            <p className="text-2xl font-bold text-orange-700">{currentStreak}</p>
                            <p className="text-xs text-orange-600">day{currentStreak !== 1 ? 's' : ''}</p>
                        </Card>
                    </div>

                    {/* Credits Info */}
                    {!isPremium && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-sm text-green-700">
                                <Sparkles className="w-4 h-4 inline mr-1" />
                                <span className="font-semibold">{creditsRemaining} credits</span> remaining
                            </p>
                            {creditsRemaining < 2 && (
                                <p className="text-xs text-green-600 mt-1">
                                    Running low! Consider upgrading to Pro
                                </p>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-2">
                        {nextLessonUrl && creditsRemaining >= 2 ? (
                            <Link href={nextLessonUrl}>
                                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                                    Continue Learning
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        ) : !isPremium && creditsRemaining < 2 ? (
                            <Link href="/dashboard/upgrade">
                                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Upgrade to Continue
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/dashboard/grammar-basics">
                                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                                    Choose Next Lesson
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        )}

                        <Button variant="outline" className="w-full" onClick={onClose}>
                            Back to Dashboard
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
