"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store";
import { vocabularyCategories, getTotalVocabularyCount } from "@/data/vocabulary";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrackedLink } from "@/components/ui/tracked-elements";
import { ArrowRight, BookOpen, Trophy, Zap, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DailyWordChallenge from "@/components/DailyWordChallenge";

export default function VocabularyPage() {
    const { userId } = useUserStore();
    const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set());
    const [reviewWords, setReviewWords] = useState<Set<string>>(new Set());

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

    const totalWords = getTotalVocabularyCount();
    const progress = (learnedWords.size / totalWords) * 100;

    return (
        <div className="container max-w-6xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-200">Professional Vocabulary</span>
                </div>
                <h1 className="text-4xl font-bold">Business Vocabulary Builder</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Master industry-specific English terms to sound professional in any workplace conversation
                </p>
            </div>

            {/* Overall Progress */}
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-bold">Your Progress</h3>
                        <p className="text-sm text-muted-foreground">
                            {learnedWords.size} of {totalWords} words learned
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        {reviewWords.size > 0 && (
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">{reviewWords.size}</div>
                                <div className="text-xs text-muted-foreground">To Review</div>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Star className="w-6 h-6 text-yellow-600" />
                            <span className="text-2xl font-bold">{Math.round(progress)}%</span>
                        </div>
                    </div>
                </div>
                <Progress value={progress} className="h-3" />
            </Card>

            {/* Daily Word - Interactive */}
            <DailyWordChallenge />

            {/* Categories */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Categories</h2>
                    <Badge variant="secondary">{vocabularyCategories.length} Categories</Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vocabularyCategories.map((category) => {
                        const categoryLearnedWords = category.words.filter(w =>
                            learnedWords.has(`${category.id}-${w.word}`)
                        ).length;
                        const categoryProgress = (categoryLearnedWords / category.words.length) * 100;

                        return (
                            <TrackedLink
                                key={category.id}
                                href={`/dashboard/vocabulary/${category.id}`}
                                eventData={{
                                    action: 'click_vocab_category',
                                    category: 'learning',
                                    label: category.id
                                }}
                            >
                                <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full">
                                    <div className="space-y-4">
                                        {/* Icon & Title */}
                                        <div className="flex items-start justify-between">
                                            <div className="text-5xl">{category.icon}</div>
                                            {categoryLearnedWords === category.words.length && (
                                                <Badge className="bg-green-100 text-green-700 border-green-200">
                                                    <Trophy className="w-3 h-3 mr-1" />
                                                    Complete
                                                </Badge>
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                {category.description}
                                            </p>
                                        </div>

                                        {/* Progress */}
                                        <div>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-muted-foreground">
                                                    {categoryLearnedWords}/{category.words.length} words
                                                </span>
                                                <span className="font-medium">{Math.round(categoryProgress)}%</span>
                                            </div>
                                            <Progress value={categoryProgress} className="h-2" />
                                        </div>

                                        <Button className="w-full" variant="outline">
                                            {categoryLearnedWords > 0 ? 'Continue Learning' : 'Start Learning'}
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </Card>
                            </TrackedLink>
                        );
                    })}
                </div>
            </div>

            {/* Tips */}
            <Card className="p-6 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    Learning Tips
                </h3>
                <ul className="space-y-2 text-sm">
                    <li>• Practice 10 new words daily for best retention</li>
                    <li>• Use flashcards to test yourself</li>
                    <li>• Try using new words in your emails and meetings</li>
                    <li>• Review words marked for practice regularly</li>
                </ul>
            </Card>
        </div>
    );
}
