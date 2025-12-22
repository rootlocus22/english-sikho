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
import { ArrowLeft, Trophy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { notFound } from "next/navigation";
import { CreditGate } from "@/components/CreditGate";

export default function VocabularyCategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
    const { categoryId } = use(params);
    const router = useRouter();
    const { userId } = useUserStore();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set());
    const [reviewWords, setReviewWords] = useState<Set<string>>(new Set());

    const category = getVocabularyCategoryById(categoryId);

    useEffect(() => {
        // Load progress from localStorage
        const savedLearned = localStorage.getItem(`vocab-learned-${userId}`);
        const savedReview = localStorage.getItem(`vocab-review-${userId}`);

        if (savedLearned) {
            setLearnedWords(new Set(JSON.parse(savedLearned)));
        }
        if (savedReview) {
            setReviewWords(new Set(JSON.parse(savedReview)));
        }
    }, [userId]);

    if (!category) {
        notFound();
    }

    const currentWord = category.words[currentIndex];
    const wordKey = `${categoryId}-${currentWord.word}`;
    const categoryLearnedCount = category.words.filter(w =>
        learnedWords.has(`${categoryId}-${w.word}`)
    ).length;
    const progress = (categoryLearnedCount / category.words.length) * 100;

    const handleNext = () => {
        if (currentIndex < category.words.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleKnow = () => {
        const newLearned = new Set(learnedWords);
        newLearned.add(wordKey);
        setLearnedWords(newLearned);

        // Remove from review if it was there
        const newReview = new Set(reviewWords);
        newReview.delete(wordKey);
        setReviewWords(newReview);

        // Save to localStorage
        localStorage.setItem(`vocab-learned-${userId}`, JSON.stringify([...newLearned]));
        localStorage.setItem(`vocab-review-${userId}`, JSON.stringify([...newReview]));
    };

    const handleDontKnow = () => {
        const newReview = new Set(reviewWords);
        newReview.add(wordKey);
        setReviewWords(newReview);

        // Save to localStorage
        localStorage.setItem(`vocab-review-${userId}`, JSON.stringify([...newReview]));
    };

    const handleReset = () => {
        setCurrentIndex(0);
        toast.success("Restarted from the beginning");
    };

    const allCompleted = categoryLearnedCount === category.words.length;

    return (
        <CreditGate
            requiredCredits={2}
            feature={`Vocabulary: ${category.name}`}
            paywallMessage={`Learn ${category.words.length} ${category.name} words and expand your vocabulary!`}
        >
            <div className="container max-w-3xl mx-auto p-6 space-y-6">
                {/* Header */}
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

                    <Button variant="outline" size="sm" onClick={handleReset}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Restart
                    </Button>
                </div>

                {/* Category Header */}
                <div className="text-center space-y-2">
                    <div className="text-6xl mb-4">{category.icon}</div>
                    <h1 className="text-3xl font-bold">{category.name}</h1>
                    <p className="text-muted-foreground">{category.description}</p>
                </div>

                {/* Progress */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">Category Progress</span>
                        <span className="text-sm text-muted-foreground">
                            {categoryLearnedCount}/{category.words.length} words learned
                        </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </Card>

                {/* Flashcard */}
                {!allCompleted ? (
                    <Flashcard
                        word={currentWord}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        onKnow={handleKnow}
                        onDontKnow={handleDontKnow}
                        hasNext={currentIndex < category.words.length - 1}
                        hasPrevious={currentIndex > 0}
                        currentIndex={currentIndex}
                        totalCards={category.words.length}
                    />
                ) : (
                    <Card className="p-12 text-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200">
                        <Trophy className="w-20 h-20 text-yellow-600 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-3">🎉 Category Completed!</h2>
                        <p className="text-lg text-muted-foreground mb-6">
                            You've learned all {category.words.length} words in this category
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button onClick={handleReset} variant="outline">
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Review Again
                            </Button>
                            <Button onClick={() => router.push('/dashboard/vocabulary')}>
                                Explore More Categories
                                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Words List */}
                <Card className="p-6">
                    <h3 className="font-bold mb-4">All Words in This Category</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {category.words.map((word, index) => {
                            const key = `${categoryId}-${word.word}`;
                            const isLearned = learnedWords.has(key);
                            const needsReview = reviewWords.has(key);

                            return (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`p-3 rounded-lg border-2 text-left transition-all ${index === currentIndex
                                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                                        : isLearned
                                            ? 'border-green-200 bg-green-50 dark:bg-green-950'
                                            : needsReview
                                                ? 'border-orange-200 bg-orange-50 dark:bg-orange-950'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-sm">{word.word}</span>
                                        {isLearned && <span className="text-green-600">✓</span>}
                                        {needsReview && <span className="text-orange-600">↻</span>}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </Card>
            </div>
        </CreditGate >
    );
}
