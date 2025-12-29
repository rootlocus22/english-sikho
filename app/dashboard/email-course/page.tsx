"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store";
import { emailLessons } from "@/data/email-lessons";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrackedLink } from "@/components/ui/tracked-elements";
import { ArrowRight, Mail, CheckCircle2, Lock, Trophy, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EmailCoursePage() {
    const { userId } = useUserStore();
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);

    useEffect(() => {
        // Load completed lessons from localStorage
        const saved = localStorage.getItem(`email-course-progress-${userId}`);
        if (saved) {
            setCompletedLessons(JSON.parse(saved));
        }
    }, [userId]);

    const completionPercentage = (completedLessons.length / emailLessons.length) * 100;

    return (
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="text-center space-y-3 sm:space-y-4">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-300" />
                    <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-200">Professional Writing</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Email Writing Course</h1>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
                    Master professional email communication with practical lessons and real-world examples
                </p>
            </div>

            {/* Progress Card */}
            <Card className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
                    <div>
                        <h3 className="text-base sm:text-lg font-bold">Your Progress</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            {completedLessons.length} of {emailLessons.length} lessons completed
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                        <span className="text-xl sm:text-2xl font-bold">{Math.round(completionPercentage)}%</span>
                    </div>
                </div>
                <Progress value={completionPercentage} className="h-2 sm:h-3" />
            </Card>

            {/* Why This Course */}
            <Card className="p-4 sm:p-6 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">📧 Why Email Writing Matters</h3>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <li>• Emails are your first impression with clients and colleagues</li>
                    <li>• Poor emails can damage professional relationships</li>
                    <li>• Clear emails save time and prevent misunderstandings</li>
                    <li>• Professional writing shows competence and attention to detail</li>
                </ul>
            </Card>

            {/* Lessons Grid */}
            <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold">Lessons</h2>
                    <Badge variant="secondary" className="w-fit">{emailLessons.length} Lessons</Badge>
                </div>

                <div className="grid gap-3 sm:gap-4">
                    {emailLessons.map((lesson, index) => {
                        const isCompleted = completedLessons.includes(lesson.id);
                        const isLocked = index > 0 && !completedLessons.includes(emailLessons[index - 1].id);

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
                                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                                    <h3 className="text-lg sm:text-xl font-bold break-words">{lesson.title}</h3>
                                                    <Badge variant="outline" className="text-[10px] sm:text-xs shrink-0">
                                                        {lesson.difficulty}
                                                    </Badge>
                                                </div>
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

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                                <span>{lesson.duration} min</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                                                <span>1 practice email</span>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        {!isLocked ? (
                                            <TrackedLink
                                                href={`/dashboard/email-course/${lesson.id}`}
                                                eventData={{
                                                    action: 'click_email_lesson',
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
                <Card className="p-6 sm:p-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <Trophy className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">🎉 Course Completed!</h2>
                    <p className="mb-4 sm:mb-6 text-sm sm:text-base text-white/90 px-2">
                        You've mastered professional email writing! Start applying these skills in your daily work.
                    </p>
                    <div className="flex gap-3 sm:gap-4 justify-center">
                        <Button variant="secondary" className="text-sm sm:text-base">
                            <span className="hidden sm:inline">Practice with Email Tone Rewriter</span>
                            <span className="sm:hidden">Practice Now</span>
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
