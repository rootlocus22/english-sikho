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
        <div className="container max-w-5xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 rounded-full">
                    <BookOpen className="w-4 h-4 text-green-600 dark:text-green-300" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-200">Foundation Course</span>
                </div>
                <h1 className="text-4xl font-bold">Grammar Basics</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Master fundamental English grammar with simple, practical lessons designed for Indian learners
                </p>
            </div>

            {/* Progress Card */}
            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-bold">Your Progress</h3>
                        <p className="text-sm text-muted-foreground">
                            {completedLessons.length} of {grammarLessons.length} lessons completed
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                        <span className="text-2xl font-bold">{Math.round(completionPercentage)}%</span>
                    </div>
                </div>
                <Progress value={completionPercentage} className="h-3" />
            </Card>

            {/* Lessons Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Lessons</h2>
                    <Badge variant="secondary">{grammarLessons.length} Lessons</Badge>
                </div>

                <div className="grid gap-4">
                    {grammarLessons.map((lesson, index) => {
                        const isCompleted = completedLessons.includes(lesson.id);
                        const isLocked = index > 0 && !completedLessons.includes(grammarLessons[index - 1].id);

                        return (
                            <Card
                                key={lesson.id}
                                className={`p-6 transition-all ${isLocked
                                        ? 'opacity-50'
                                        : 'hover:shadow-lg hover:-translate-y-1'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Lesson Number & Status */}
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${isCompleted
                                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                                            : isLocked
                                                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                                                : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                        }`}>
                                        {isCompleted ? (
                                            <CheckCircle2 className="w-6 h-6" />
                                        ) : isLocked ? (
                                            <Lock className="w-5 h-5" />
                                        ) : (
                                            index + 1
                                        )}
                                    </div>

                                    {/* Lesson Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div>
                                                <h3 className="text-xl font-bold mb-1">{lesson.title}</h3>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    {lesson.description}
                                                </p>
                                            </div>
                                            {isCompleted && (
                                                <Badge className="bg-green-100 text-green-700 border-green-200">
                                                    Completed
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Topics */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {lesson.topics.map((topic, i) => (
                                                <Badge key={i} variant="outline" className="text-xs">
                                                    {topic}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Meta Info */}
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                            <div className="flex items-center gap-1">
                                                <Zap className="w-4 h-4" />
                                                <span>{lesson.duration} min</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <BookOpen className="w-4 h-4" />
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
                                            >
                                                <Button className="w-full sm:w-auto">
                                                    {isCompleted ? 'Review Lesson' : 'Start Lesson'}
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </TrackedLink>
                                        ) : (
                                            <Button disabled className="w-full sm:w-auto">
                                                <Lock className="w-4 h-4 mr-2" />
                                                Complete previous lesson first
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
                <Card className="p-8 text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    <Trophy className="w-16 h-16 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">🎉 Congratulations!</h2>
                    <p className="mb-6 text-white/90">
                        You've completed all grammar basics lessons! Ready for the next level?
                    </p>
                    <Button variant="secondary">
                        Explore More Courses
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Card>
            )}
        </div>
    );
}
