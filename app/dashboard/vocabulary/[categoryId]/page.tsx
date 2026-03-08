"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store";
import { getVocabularyCategoryById } from "@/data/vocabulary";
import Flashcard from "@/components/vocabulary/Flashcard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrackedLink } from "@/components/ui/tracked-elements";
import { ArrowLeft, Trophy, RotateCcw, Clock, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { notFound } from "next/navigation";
import { CreditGate } from "@/components/CreditGate";
import { loadProgress, saveProgress } from "@/lib/progress-sync";
import { createReviewCard, reviewWord, getDueWords, getReviewStats, type ReviewCard } from "@/lib/spaced-repetition";

export default function VocabularyCategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
    const { categoryId } = use(params);
    const router = useRouter();
    const { userId } = useUserStore();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set());
    const [reviewWords, setReviewWords] = useState<Set<string>>(new Set());
    const [reviewSchedule, setReviewSchedule] = useState<Record<string, ReviewCard>>({});
    const [showReviewMode, setShowReviewMode] = useState(false);
    const [dueWords, setDueWords] = useState<string[]>([]);
    const [reviewIndex, setReviewIndex] = useState(0);

    const category = getVocabularyCategoryById(categoryId);

    useEffect(() => {
        if (!userId) return;

        loadProgress(userId).then((progress) => {
            if (progress.vocabLearned.length > 0) setLearnedWords(new Set(progress.vocabLearned));
            if (progress.vocabReview.length > 0) setReviewWords(new Set(progress.vocabReview));
            if (progress.vocabReviewSchedule && Object.keys(progress.vocabReviewSchedule).length > 0) {
                const schedule = progress.vocabReviewSchedule as unknown as Record<string, ReviewCard>;
                setReviewSchedule(schedule);

                if (category) {
                    const allKeys = category.words.map(w => `${categoryId}-${w.word}`);
                    const due = getDueWords(schedule, allKeys);
                    setDueWords(due);
                }
            }
        });
    }, [userId, categoryId, category]);

    if (!category) {
        notFound();
    }

    const currentWord = showReviewMode && dueWords.length > 0
        ? category.words.find(w => `${categoryId}-${w.word}` === dueWords[reviewIndex])
        : category.words[currentIndex];

    const wordKey = currentWord ? `${categoryId}-${currentWord.word}` : '';
    const categoryLearnedCount = category.words.filter(w =>
        learnedWords.has(`${categoryId}-${w.word}`)
    ).length;
    const progress = (categoryLearnedCount / category.words.length) * 100;

    const handleNext = () => {
        if (showReviewMode) {
            if (reviewIndex < dueWords.length - 1) {
                setReviewIndex(prev => prev + 1);
            } else {
                setShowReviewMode(false);
                toast.success('Review session complete!');
            }
            return;
        }
        if (currentIndex < category.words.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (showReviewMode) return;
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const persistVocabState = (
        newLearned: Set<string>,
        newReview: Set<string>,
        newSchedule: Record<string, ReviewCard>
    ) => {
        if (userId) {
            saveProgress(userId, {
                vocabLearned: [...newLearned],
                vocabReview: [...newReview],
                vocabReviewSchedule: newSchedule as any,
            });
        }
        localStorage.setItem(`vocab-learned-${userId}`, JSON.stringify([...newLearned]));
        localStorage.setItem(`vocab-review-${userId}`, JSON.stringify([...newReview]));
    };

    const handleKnow = () => {
        const newLearned = new Set(learnedWords);
        newLearned.add(wordKey);
        setLearnedWords(newLearned);

        const newReview = new Set(reviewWords);
        newReview.delete(wordKey);
        setReviewWords(newReview);

        let card = reviewSchedule[wordKey] || createReviewCard(wordKey);
        card = reviewWord(card, 'know');
        const newSchedule = { ...reviewSchedule, [wordKey]: card };
        setReviewSchedule(newSchedule);

        persistVocabState(newLearned, newReview, newSchedule);
        handleNext();
    };

    const handleDontKnow = () => {
        const newReview = new Set(reviewWords);
        newReview.add(wordKey);
        setReviewWords(newReview);

        let card = reviewSchedule[wordKey] || createReviewCard(wordKey);
        card = reviewWord(card, 'dont_know');
        const newSchedule = { ...reviewSchedule, [wordKey]: card };
        setReviewSchedule(newSchedule);

        persistVocabState(learnedWords, newReview, newSchedule);
        handleNext();
    };

    const handleReset = () => {
        setCurrentIndex(0);
        setShowReviewMode(false);
        toast.success("Restarted from the beginning");
    };

    const handleStartReview = () => {
        if (dueWords.length === 0) {
            toast("No words due for review today!");
            return;
        }
        setShowReviewMode(true);
        setReviewIndex(0);
    };

    const allCompleted = categoryLearnedCount === category.words.length;
    const stats = getReviewStats(reviewSchedule);

    if (!currentWord) {
        return null;
    }

    return (
        <CreditGate
            requiredCredits={2}
            feature={`Vocabulary: ${category.name}`}
            paywallMessage={`Learn ${category.words.length} ${category.name} words and expand your vocabulary!`}
        >
            <div className="container max-w-3xl mx-auto p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <TrackedLink
                        href="/dashboard/vocabulary"
                        eventData={{ action: 'back_to_vocab_list', category: 'learning', label: categoryId }}
                    >
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            All Categories
                        </Button>
                    </TrackedLink>

                    <div className="flex gap-2">
                        {dueWords.length > 0 && !showReviewMode && (
                            <Button variant="outline" size="sm" onClick={handleStartReview}>
                                <Clock className="w-4 h-4 mr-2" />
                                Review ({dueWords.length} due)
                            </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={handleReset}>
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Restart
                        </Button>
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <div className="text-6xl mb-4">{category.icon}</div>
                    <h1 className="text-3xl font-bold">{category.name}</h1>
                    <p className="text-muted-foreground">{category.description}</p>
                </div>

                {showReviewMode && (
                    <Card className="p-4 bg-amber-50 dark:bg-amber-950 border-amber-200">
                        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                            <Brain className="w-5 h-5" />
                            <span className="font-bold">Spaced Review Mode</span>
                            <Badge variant="secondary">{reviewIndex + 1}/{dueWords.length}</Badge>
                        </div>
                        <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                            These words are due for review based on your learning pattern
                        </p>
                    </Card>
                )}

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">Category Progress</span>
                        <span className="text-sm text-muted-foreground">
                            {categoryLearnedCount}/{category.words.length} words learned
                        </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    {stats.total > 0 && (
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Mastered: {stats.mastered}</span>
                            <span>Learning: {stats.learning}</span>
                            <span>Due today: {stats.dueToday}</span>
                        </div>
                    )}
                </Card>

                {!allCompleted ? (
                    <Flashcard
                        word={currentWord}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        onKnow={handleKnow}
                        onDontKnow={handleDontKnow}
                        hasNext={showReviewMode ? reviewIndex < dueWords.length - 1 : currentIndex < category.words.length - 1}
                        hasPrevious={!showReviewMode && currentIndex > 0}
                        currentIndex={showReviewMode ? reviewIndex : currentIndex}
                        totalCards={showReviewMode ? dueWords.length : category.words.length}
                    />
                ) : (
                    <Card className="p-12 text-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200">
                        <Trophy className="w-20 h-20 text-yellow-600 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-3">Category Completed!</h2>
                        <p className="text-lg text-muted-foreground mb-6">
                            You&apos;ve learned all {category.words.length} words in this category
                        </p>
                        {dueWords.length > 0 && (
                            <p className="text-sm text-amber-600 mb-4">
                                {dueWords.length} words are due for spaced review
                            </p>
                        )}
                        <div className="flex gap-4 justify-center">
                            {dueWords.length > 0 && (
                                <Button onClick={handleStartReview}>
                                    <Clock className="w-4 h-4 mr-2" />
                                    Review Due Words
                                </Button>
                            )}
                            <Button onClick={handleReset} variant="outline">
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Review Again
                            </Button>
                            <Button onClick={() => router.push('/dashboard/vocabulary')} variant="outline">
                                Explore More Categories
                                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                            </Button>
                        </div>
                    </Card>
                )}

                <Card className="p-6">
                    <h3 className="font-bold mb-4">All Words in This Category</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {category.words.map((word, index) => {
                            const key = `${categoryId}-${word.word}`;
                            const isLearned = learnedWords.has(key);
                            const needsReview = reviewWords.has(key);
                            const card = reviewSchedule[key];
                            const isDue = dueWords.includes(key);

                            return (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (!showReviewMode) setCurrentIndex(index);
                                    }}
                                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                                        !showReviewMode && index === currentIndex
                                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                                            : isLearned
                                                ? 'border-green-200 bg-green-50 dark:bg-green-950'
                                                : needsReview || isDue
                                                    ? 'border-orange-200 bg-orange-50 dark:bg-orange-950'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-sm">{word.word}</span>
                                        {isLearned && !isDue && <span className="text-green-600">✓</span>}
                                        {isDue && <span className="text-orange-600 text-xs">Due</span>}
                                        {needsReview && !isDue && <span className="text-orange-600">↻</span>}
                                    </div>
                                    {card && card.interval > 0 && (
                                        <div className="text-[10px] text-muted-foreground mt-1">
                                            Next: {card.nextReview}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </Card>
            </div>
        </CreditGate>
    );
}
