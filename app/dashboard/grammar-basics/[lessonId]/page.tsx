"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store";
import { getGrammarLessonById, grammarLessons } from "@/data/grammar-lessons";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrackedButton, TrackedLink } from "@/components/ui/tracked-elements";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Trophy, Lightbulb, BookOpen, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { notFound } from "next/navigation";
import { AudioButton } from "@/components/audio/AudioButton";
import { AudioRecorder } from "@/components/audio/AudioRecorder";

export default function GrammarLessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
    const { lessonId } = use(params);
    const router = useRouter();
    const { userId } = useUserStore();

    const [currentExercise, setCurrentExercise] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());
    const [spokenAnswer, setSpokenAnswer] = useState("");

    const lesson = getGrammarLessonById(lessonId);

    if (!lesson) {
        notFound();
    }

    const totalExercises = lesson.exercises.length;
    const progress = (completedExercises.size / totalExercises) * 100;
    const allCompleted = completedExercises.size === totalExercises;

    const handleAnswerSelect = (index: number) => {
        if (showFeedback) return; // Prevent changing answer after submission
        setSelectedAnswer(index);
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) {
            toast.error("Please select an answer");
            return;
        }

        const exercise = lesson.exercises[currentExercise];
        const isCorrect = selectedAnswer === exercise.correctAnswer;

        setShowFeedback(true);

        if (isCorrect) {
            setCorrectAnswers(prev => prev + 1);
            setCompletedExercises(prev => new Set([...prev, currentExercise]));
            toast.success("🎉 Correct!");
        } else {
            toast.error("Not quite right. Read the explanation!");
        }
    };

    const handleNext = () => {
        if (currentExercise < totalExercises - 1) {
            setCurrentExercise(prev => prev + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
        }
    };

    const handlePrevious = () => {
        if (currentExercise > 0) {
            setCurrentExercise(prev => prev - 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
        }
    };

    const handleComplete = () => {
        // Save to localStorage
        const saved = localStorage.getItem(`grammar-progress-${userId}`);
        const completed = saved ? JSON.parse(saved) : [];

        if (!completed.includes(lessonId)) {
            completed.push(lessonId);
            localStorage.setItem(`grammar-progress-${userId}`, JSON.stringify(completed));
        }

        toast.success("🎉 Lesson completed!");

        // Find next lesson
        const currentIndex = grammarLessons.findIndex(l => l.id === lessonId);
        if (currentIndex < grammarLessons.length - 1) {
            const nextLesson = grammarLessons[currentIndex + 1];
            router.push(`/dashboard/grammar-basics/${nextLesson.id}`);
        } else {
            router.push('/dashboard/grammar-basics');
        }
    };

    const exercise = lesson.exercises[currentExercise];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="container max-w-5xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <TrackedLink
                        href="/dashboard/grammar-basics"
                        eventData={{ action: 'back_to_grammar_list', category: 'learning', label: lessonId }}
                    >
                        <Button variant="ghost" size="sm" className="w-fit">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            All Lessons
                        </Button>
                    </TrackedLink>

                    <div className="flex items-center gap-3">
                        <div className="text-sm text-muted-foreground bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full border">
                            ⏱️ {lesson.duration} min
                        </div>
                    </div>
                </div>

                {/* Lesson Header - Mobile Optimized */}
                <div className="text-center space-y-3 py-6 sm:py-8">
                    <div className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-full text-sm font-medium">
                        Grammar Lesson
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {lesson.title}
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                        {lesson.description}
                    </p>
                </div>

                {/* Lesson Content - Enhanced Design */}
                <Card className="p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-lg border-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold">Learn</h2>
                        </div>
                        <AudioButton
                            text={lesson.content.map(c => c.text)}
                            variant="outline"
                            size="sm"
                            label="Play All"
                            className="w-full sm:w-auto"
                        />
                    </div>

                    {lesson.content.map((content, index) => (
                        <div key={index} className={`p-4 sm:p-6 rounded-xl border-2 ${content.type === 'tip'
                            ? 'bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 border-yellow-200 dark:border-yellow-800'
                            : content.type === 'example'
                                ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800'
                                : 'bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 border-gray-200 dark:border-gray-700'
                            }`}>
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex-1">
                                    {content.type === 'tip' && (
                                        <div className="flex items-center gap-2 mb-3 text-yellow-700 dark:text-yellow-300">
                                            <Lightbulb className="w-5 h-5 flex-shrink-0" />
                                            <span className="font-bold">Pro Tip</span>
                                        </div>
                                    )}
                                    {content.type === 'example' && (
                                        <div className="flex items-center gap-2 mb-3 text-blue-700 dark:text-blue-300">
                                            <span className="font-bold">📝 Example</span>
                                        </div>
                                    )}
                                </div>
                                <AudioButton
                                    text={content.text}
                                    variant="ghost"
                                    size="sm"
                                    showLabel={false}
                                    className="w-8 h-8 p-0 flex-shrink-0"
                                />
                            </div>
                            <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed">{content.text}</div>
                        </div>
                    ))}
                </Card>

                {/* Practice Exercises - Enhanced */}
                <Card className="p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-lg border-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                <Trophy className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold">Practice</h2>
                        </div>
                        <div className="text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 px-4 py-2 rounded-full">
                            Exercise {currentExercise + 1} of {totalExercises}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground font-medium">Overall Progress</span>
                            <span className="font-bold text-purple-600 dark:text-purple-400">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-3" />
                    </div>

                    {/* Question Card */}
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 p-4 sm:p-6 rounded-xl border-2 border-purple-200 dark:border-purple-800 shadow-md">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                                <h3 className="text-base sm:text-lg font-semibold flex-1 leading-relaxed">{exercise.question}</h3>
                                <AudioButton
                                    text={exercise.question}
                                    variant="ghost"
                                    size="sm"
                                    label="Listen"
                                    className="w-full sm:w-auto flex-shrink-0"
                                />
                            </div>

                            {/* Voice Answer Option - Mobile Optimized */}
                            <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-200 dark:border-purple-700 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <Volume2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                    <span className="text-sm font-medium">Speak Your Answer (Optional)</span>
                                </div>
                                <AudioRecorder
                                    variant="compact"
                                    onFinalTranscript={(text) => {
                                        setSpokenAnswer(text);
                                        toast.info("Good! Now select your answer below.");
                                    }}
                                    placeholder="Tap microphone to practice..."
                                />
                                {spokenAnswer && (
                                    <div className="mt-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                                        <div className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">
                                            You said:
                                        </div>
                                        <div className="text-sm">"{spokenAnswer}"</div>
                                    </div>
                                )}
                            </div>

                            {/* Answer Options - Touch-Friendly */}
                            <div className="space-y-3">
                                {exercise.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(index)}
                                        disabled={showFeedback}
                                        className={`w-full p-4 text-left rounded-xl border-2 transition-all text-sm sm:text-base touch-manipulation ${selectedAnswer === index
                                            ? showFeedback
                                                ? index === exercise.correctAnswer
                                                    ? 'border-green-500 bg-green-50 dark:bg-green-950 shadow-lg scale-[1.02]'
                                                    : 'border-red-500 bg-red-50 dark:bg-red-950 shadow-lg'
                                                : 'border-purple-500 bg-purple-50 dark:bg-purple-950 shadow-md scale-[1.02]'
                                            : showFeedback && index === exercise.correctAnswer
                                                ? 'border-green-500 bg-green-50 dark:bg-green-950 shadow-lg'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:shadow-md active:scale-[0.98]'
                                            } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="flex-1">{option}</span>
                                            {showFeedback && (
                                                <>
                                                    {index === exercise.correctAnswer && (
                                                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                    )}
                                                    {selectedAnswer === index && index !== exercise.correctAnswer && (
                                                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Feedback - Enhanced */}
                        {showFeedback && (
                            <div className={`p-4 sm:p-5 rounded-xl border-2 shadow-md ${selectedAnswer === exercise.correctAnswer
                                ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-300 dark:border-green-700'
                                : 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-300 dark:border-blue-700'
                                }`}>
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-base mb-2 flex items-center gap-2">
                                            {selectedAnswer === exercise.correctAnswer ? '✅' : '💡'} Explanation:
                                        </h4>
                                        <p className="text-sm sm:text-base leading-relaxed">{exercise.explanation}</p>
                                    </div>
                                    <AudioButton
                                        text={exercise.explanation}
                                        variant="ghost"
                                        size="sm"
                                        showLabel={false}
                                        className="w-8 h-8 p-0 flex-shrink-0"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Action Buttons - Mobile Optimized */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {!showFeedback ? (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={selectedAnswer === null}
                                    className="w-full py-6 text-base font-semibold shadow-lg"
                                    size="lg"
                                >
                                    Check Answer ✓
                                </Button>
                            ) : (
                                <>
                                    {currentExercise > 0 && (
                                        <Button variant="outline" onClick={handlePrevious} className="w-full sm:w-auto py-6">
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Previous
                                        </Button>
                                    )}
                                    {currentExercise < totalExercises - 1 ? (
                                        <Button onClick={handleNext} className="flex-1 py-6 text-base font-semibold shadow-lg">
                                            Next Exercise
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    ) : allCompleted && (
                                        <TrackedButton
                                            onClick={handleComplete}
                                            eventData={{ action: 'complete_grammar_lesson', category: 'learning', label: lessonId }}
                                            className="flex-1 py-6 text-base font-semibold bg-green-600 hover:bg-green-700 shadow-lg"
                                        >
                                            Complete Lesson
                                            <Trophy className="w-5 h-5 ml-2" />
                                        </TrackedButton>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Score Summary - Enhanced */}
                    {allCompleted && (
                        <Card className="p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950 border-2 border-green-300 dark:border-green-700 shadow-xl">
                            <div className="text-center">
                                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
                                <h3 className="text-2xl font-bold mb-2">🎉 Great Job!</h3>
                                <p className="text-base text-muted-foreground">
                                    You got <span className="font-bold text-green-600 dark:text-green-400 text-xl">{correctAnswers}</span> out of <span className="font-bold text-xl">{totalExercises}</span> correct
                                </p>
                                <div className="mt-4 text-sm text-muted-foreground">
                                    Score: {Math.round((correctAnswers / totalExercises) * 100)}%
                                </div>
                            </div>
                        </Card>
                    )}
                </Card>
            </div>
        </div>
    );
}
