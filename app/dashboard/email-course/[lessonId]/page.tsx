"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store";
import { getEmailLessonById, emailLessons } from "@/data/email-lessons";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TrackedButton, TrackedLink } from "@/components/ui/tracked-elements";
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, Mail, Trophy, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { notFound } from "next/navigation";

export default function EmailLessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
    const { lessonId } = use(params);
    const router = useRouter();
    const { userId } = useUserStore();

    const [userEmail, setUserEmail] = useState('');
    const [showSample, setShowSample] = useState(false);
    const [showHints, setShowHints] = useState(false);

    const lesson = getEmailLessonById(lessonId);

    if (!lesson) {
        notFound();
    }

    const handleComplete = () => {
        // Save to localStorage
        const saved = localStorage.getItem(`email-course-progress-${userId}`);
        const completed = saved ? JSON.parse(saved) : [];

        if (!completed.includes(lessonId)) {
            completed.push(lessonId);
            localStorage.setItem(`email-course-progress-${userId}`, JSON.stringify(completed));
        }

        toast.success("🎉 Lesson completed!");

        // Find next lesson
        const currentIndex = emailLessons.findIndex(l => l.id === lessonId);
        if (currentIndex < emailLessons.length - 1) {
            const nextLesson = emailLessons[currentIndex + 1];
            router.push(`/dashboard/email-course/${nextLesson.id}`);
        } else {
            router.push('/dashboard/email-course');
        }
    };

    return (
        <div className="container max-w-4xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <TrackedLink
                    href="/dashboard/email-course"
                    eventData={{ action: 'back_to_email_list', category: 'learning', label: lessonId }}
                >
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        All Lessons
                    </Button>
                </TrackedLink>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="capitalize">{lesson.difficulty}</span>
                    <span>•</span>
                    <span>{lesson.duration} min</span>
                </div>
            </div>

            {/* Lesson Header */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">{lesson.title}</h1>
                <p className="text-muted-foreground">{lesson.description}</p>
            </div>

            {/* Lesson Content */}
            <Card className="p-8 space-y-6">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-5 h-5" />
                    <h2 className="text-xl font-bold">Learn</h2>
                </div>

                {lesson.content.map((content, index) => (
                    <div key={index} className={`p-6 rounded-lg ${content.type === 'tip'
                            ? 'bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800'
                            : content.type === 'template'
                                ? 'bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800'
                                : content.type === 'example'
                                    ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                                    : 'bg-gray-50 dark:bg-gray-900'
                        }`}>
                        {content.type === 'tip' && (
                            <div className="flex items-center gap-2 mb-2 text-yellow-700 dark:text-yellow-300">
                                <Lightbulb className="w-5 h-5" />
                                <span className="font-bold">Pro Tip</span>
                            </div>
                        )}
                        {content.type === 'template' && (
                            <div className="flex items-center gap-2 mb-2 text-purple-700 dark:text-purple-300">
                                <Mail className="w-5 h-5" />
                                <span className="font-bold">Templates</span>
                            </div>
                        )}
                        <div className="whitespace-pre-line">{content.text}</div>
                    </div>
                ))}
            </Card>

            {/* Practice Section */}
            <Card className="p-8 space-y-6">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                    <Trophy className="w-5 h-5" />
                    <h2 className="text-xl font-bold">Practice</h2>
                </div>

                {/* Scenario */}
                <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="font-bold mb-2">📝 Scenario:</h3>
                    <p className="text-lg">{lesson.practice.scenario}</p>
                </div>

                {/* Hints */}
                <div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowHints(!showHints)}
                        className="mb-3"
                    >
                        {showHints ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                        {showHints ? 'Hide' : 'Show'} Hints
                    </Button>

                    {showHints && (
                        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                            <h4 className="font-bold mb-2 text-sm text-blue-700 dark:text-blue-300">💡 Hints:</h4>
                            <ul className="space-y-1 text-sm">
                                {lesson.practice.hints.map((hint, i) => (
                                    <li key={i}>• {hint}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Text Area */}
                <div className="space-y-3">
                    <label className="font-medium block">Your Email:</label>
                    <Textarea
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Write your email here..."
                        className="min-h-[200px] font-mono text-sm"
                    />
                    <p className="text-sm text-muted-foreground">
                        Try writing the email yourself before viewing the sample.
                    </p>
                </div>

                {/* Sample Email */}
                <div>
                    <Button
                        variant="outline"
                        onClick={() => setShowSample(!showSample)}
                        className="mb-3"
                    >
                        {showSample ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                        {showSample ? 'Hide' : 'View'} Sample Answer
                    </Button>

                    {showSample && (
                        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
                            <h4 className="font-bold mb-3 text-green-700 dark:text-green-300">✅ Sample Email:</h4>
                            <div className="font-mono text-sm whitespace-pre-line bg-white dark:bg-gray-900 p-4 rounded border">
                                {lesson.practice.sampleEmail}
                            </div>
                            <p className="text-sm text-muted-foreground mt-3">
                                Note: This is just one way to write it. Your version might be different but still correct!
                            </p>
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <TrackedButton
                    onClick={handleComplete}
                    eventData={{ action: 'complete_email_lesson', category: 'learning', label: lessonId }}
                    className="w-full"
                    size="lg"
                >
                    Complete Lesson & Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                </TrackedButton>
            </Card>

            {/* Pro Tip */}
            <Card className="p-6 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                <h3 className="font-bold mb-2 flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                    <Lightbulb className="w-5 h-5" />
                    Practice Makes Perfect
                </h3>
                <p className="text-sm">
                    The best way to improve is to practice! Try using what you learned in your actual work emails today.
                </p>
            </Card>
        </div>
    );
}
