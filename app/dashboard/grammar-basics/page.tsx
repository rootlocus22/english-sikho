"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store";
import { grammarLessons } from "@/data/grammar-lessons";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrackedLink } from "@/components/ui/tracked-elements";
import { ArrowRight, BookOpen, CheckCircle2, Lock, Trophy, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GrammarBasicsPage() {
    const { userId } = useUserStore();
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);

    useEffect(() => {
        // Load completed lessons from localStorage
        const saved = localStorage.getItem(`grammar-progress-${userId}`);
        if (saved) {
            setCompletedLessons(JSON.parse(saved));
        }
    }, [userId]);

    const completionPercentage = (completedLessons.length / grammarLessons.length) * 100;

    return (
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="text-center space-y-3 sm:space-y-4">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 dark:bg-green-900 rounded-full">
                    <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-300" />
                    <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-200">Foundation Course</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Grammar Basics</h1>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
                    Master fundamental English grammar with simple, practical lessons designed for Indian learners
                </p>
            </div>

            {/* Progress Card */}
            <Card className="p-4 sm:p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
                    <div>
                        <h3 className="text-base sm:text-lg font-bold">Your Progress</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            {completedLessons.length} of {grammarLessons.length} lessons completed
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                        <span className="text-xl sm:text-2xl font-bold">{Math.round(completionPercentage)}%</span>
                    </div>
                </div>
                <Progress value={completionPercentage} className="h-2 sm:h-3" />
            </Card>

            {/* Lessons Grid */}
            <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold">Lessons</h2>
                    <Badge variant="secondary" className="w-fit">{grammarLessons.length} Lessons</Badge>
                </div>

                <div className="grid gap-3 sm:gap-4">
                    {grammarLessons.map((lesson, index) => {
                        const isCompleted = completedLessons.includes(lesson.id);
                        const isLocked = index > 0 && !completedLessons.includes(grammarLessons[index - 1].id);

                        return (
                            <Card
                                key={lesson.id}
                                className={`p-4 sm:p-6 transition-all ${isLocked
                                        ? 'opacity-50'
                                        : 'hover:shadow-lg hover:-translate-y-1'
                                    }`}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                                    {/* Lesson Number & Status */}
                                    <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg ${isCompleted
                                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                                            : isLocked
                                                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                                                : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                        }`}>
                                        {isCompleted ? (
                                            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                                        ) : isLocked ? (
                                            <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                                        ) : (
                                            index + 1
                                        )}
                                    </div>

                                    {/* Lesson Content */}
                                    <div className="flex-1 min-w-0 w-full">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg sm:text-xl font-bold mb-1 break-words">{lesson.title}</h3>
                                                <p className="text-xs sm:text-sm text-muted-foreground mb-3 break-words">
                                                    {lesson.description}
                                                </p>
                                            </div>
                                            {isCompleted && (
                                                <Badge className="bg-green-100 text-green-700 border-green-200 w-fit shrink-0">
                                                    Completed
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Topics */}
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                                            {lesson.topics.map((topic, i) => (
                                                <Badge key={i} variant="outline" className="text-[10px] sm:text-xs">
                                                    {topic}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                                            <div className="flex items-center gap-1">
                                                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                                                <span>{lesson.duration} min</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                                                <span>{lesson.exercises.length} exercises</span>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        {!isLocked ? (
                                            <TrackedLink
                                                href={`/dashboard/grammar-basics/${lesson.id}`}
                                                eventData={{
                                                    action: 'click_grammar_lesson',
                                                    category: 'learning',
                                                    label: lesson.id
                                                }}
                                                className="block"
                                            >
                                                <Button className="w-full sm:w-auto text-sm sm:text-base">
                                                    {isCompleted ? 'Review Lesson' : 'Start Lesson'}
                                                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                                                </Button>
                                            </TrackedLink>
                                        ) : (
                                            <Button disabled className="w-full sm:w-auto text-sm sm:text-base">
                                                <Lock className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                                <span className="hidden sm:inline">Complete previous lesson first</span>
                                                <span className="sm:hidden">Locked</span>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Completion CTA */}
            {completionPercentage === 100 && (
                <Card className="p-6 sm:p-8 text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    <Trophy className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">🎉 Congratulations!</h2>
                    <p className="mb-4 sm:mb-6 text-sm sm:text-base text-white/90 px-2">
                        You've completed all grammar basics lessons! Ready for the next level?
                    </p>
                    <Button variant="secondary" className="text-sm sm:text-base">
                        Explore More Courses
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                    </Button>
                </Card>
            )}
        </div>
    );
}
