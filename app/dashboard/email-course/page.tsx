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
        <div className="container max-w-5xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Mail className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-200">Professional Writing</span>
                </div>
                <h1 className="text-4xl font-bold">Email Writing Course</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Master professional email communication with practical lessons and real-world examples
                </p>
            </div>

            {/* Progress Card */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-bold">Your Progress</h3>
                        <p className="text-sm text-muted-foreground">
                            {completedLessons.length} of {emailLessons.length} lessons completed
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                        <span className="text-2xl font-bold">{Math.round(completionPercentage)}%</span>
                    </div>
                </div>
                <Progress value={completionPercentage} className="h-3" />
            </Card>

            {/* Why This Course */}
            <Card className="p-6 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                <h3 className="font-bold mb-3">📧 Why Email Writing Matters</h3>
                <ul className="space-y-2 text-sm">
                    <li>• Emails are your first impression with clients and colleagues</li>
                    <li>• Poor emails can damage professional relationships</li>
                    <li>• Clear emails save time and prevent misunderstandings</li>
                    <li>• Professional writing shows competence and attention to detail</li>
                </ul>
            </Card>

            {/* Lessons Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Lessons</h2>
                    <Badge variant="secondary">{emailLessons.length} Lessons</Badge>
                </div>

                <div className="grid gap-4">
                    {emailLessons.map((lesson, index) => {
                        const isCompleted = completedLessons.includes(lesson.id);
                        const isLocked = index > 0 && !completedLessons.includes(emailLessons[index - 1].id);

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
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-xl font-bold">{lesson.title}</h3>
                                                    <Badge variant="outline" className="text-xs">
                                                        {lesson.difficulty}
                                                    </Badge>
                                                </div>
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

                                        {/* Meta Info */}
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{lesson.duration} min</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Mail className="w-4 h-4" />
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
                <Card className="p-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <Trophy className="w-16 h-16 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">🎉 Course Completed!</h2>
                    <p className="mb-6 text-white/90">
                        You've mastered professional email writing! Start applying these skills in your daily work.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button variant="secondary">
                            Practice with Email Tone Rewriter
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
