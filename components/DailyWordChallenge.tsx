'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, CheckCircle2, XCircle, Volume2, ArrowRight, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AudioButton } from '@/components/audio/AudioButton';
import { vocabularyCategories } from '@/data/vocabulary';
import { useUserStore } from '@/lib/store';

// Get a random word from all categories
function getDailyWord() {
    const allWords = vocabularyCategories.flatMap(cat => cat.words);
    const today = new Date().toDateString();
    // Use date as seed for consistent daily word
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = seed % allWords.length;
    return allWords[index];
}

export default function DailyWordChallenge() {
    const { userId } = useUserStore();
    const [dailyWord, setDailyWord] = useState(getDailyWord());
    const [userAnswer, setUserAnswer] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [attempts, setAttempts] = useState(0);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        // Check if today's word is already completed
        const today = new Date().toDateString();
        const saved = localStorage.getItem(`daily-word-${userId}-${today}`);
        if (saved) {
            const data = JSON.parse(saved);
            if (data.completed) {
                setCompleted(true);
                setIsCorrect(true);
            }
        }
    }, [userId]);

    const handleCheck = () => {
        if (!userAnswer.trim()) return;

        setAttempts(prev => prev + 1);
        const isAnswerCorrect = userAnswer.toLowerCase().trim() === dailyWord.word.toLowerCase();
        setIsCorrect(isAnswerCorrect);

        if (isAnswerCorrect) {
            setCompleted(true);
            const today = new Date().toDateString();
            localStorage.setItem(`daily-word-${userId}-${today}`, JSON.stringify({
                word: dailyWord.word,
                completed: true,
                attempts: attempts + 1
            }));
        } else if (attempts >= 2) {
            setShowHint(true);
        }
    };

    if (completed) {
        return (
            <Card className="p-4 sm:p-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base font-medium">Word of the Day - Completed! 🎉</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-2 break-words">{dailyWord.word}</h3>
                        <p className="text-white/90 mb-2 text-sm sm:text-base break-words">{dailyWord.meaning}</p>
                        <p className="text-white/80 text-xs sm:text-sm break-words">हिंदी: {dailyWord.hindiMeaning}</p>
                        <div className="mt-3 sm:mt-4">
                            <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                                ✓ Completed in {attempts} {attempts === 1 ? 'attempt' : 'attempts'}
                            </Badge>
                        </div>
                    </div>
                    <div className="ml-0 sm:ml-4 shrink-0">
                        <AudioButton
                            text={dailyWord.word}
                            variant="secondary"
                            size="default"
                            className="sm:size-lg"
                        />
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base font-medium">Word of the Day Challenge</span>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                        {attempts > 0 ? `${attempts} attempts` : 'New word!'}
                    </Badge>
                </div>

                {!showHint ? (
                    <>
                        <div>
                            <p className="text-white/90 mb-3 text-sm sm:text-base">
                                Can you guess the word from this meaning?
                            </p>
                            <div className="bg-white/10 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                                <p className="text-base sm:text-lg font-semibold mb-2 break-words">{dailyWord.meaning}</p>
                                <p className="text-xs sm:text-sm text-white/80 break-words">हिंदी: {dailyWord.hindiMeaning}</p>
                            </div>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                            <Input
                                placeholder="Type the word here..."
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-sm sm:text-base"
                            />
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Button
                                    variant="secondary"
                                    onClick={handleCheck}
                                    className="flex-1 text-sm sm:text-base"
                                    size="sm"
                                    disabled={!userAnswer.trim()}
                                >
                                    Check Answer
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowHint(true)}
                                    className="border-white/20 text-white hover:bg-white/10 text-sm sm:text-base"
                                    size="sm"
                                >
                                    Show Hint
                                </Button>
                            </div>
                        </div>

                        {isCorrect === false && (
                            <div className="bg-red-500/20 border border-red-300 rounded-lg p-3 flex items-center gap-2">
                                <XCircle className="w-5 h-5 text-red-200" />
                                <span>Not quite right. Try again!</span>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-white/10 rounded-lg p-4">
                            <p className="text-sm text-white/80 mb-2">Hint:</p>
                            <p className="text-lg font-semibold">"{dailyWord.example}"</p>
                        </div>
                        <div className="space-y-3">
                            <Input
                                placeholder="Type the word here..."
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                            />
                            <Button
                                variant="secondary"
                                onClick={handleCheck}
                                className="w-full"
                                disabled={!userAnswer.trim()}
                            >
                                Check Answer
                            </Button>
                        </div>
                    </div>
                )}

                {isCorrect && (
                    <div className="bg-green-500/20 border border-green-300 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-200" />
                            <span className="font-semibold">Correct! 🎉</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold mb-1">{dailyWord.word}</p>
                            <p className="text-sm text-white/90">Example: "{dailyWord.example}"</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <AudioButton
                                text={dailyWord.word}
                                variant="secondary"
                                size="sm"
                            />
                            <span className="text-xs text-white/80">Listen to pronunciation</span>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}

