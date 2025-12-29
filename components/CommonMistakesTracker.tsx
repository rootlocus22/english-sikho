'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { XCircle, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';
import { useUserStore } from '@/lib/store';

const commonMistakes = [
    {
        id: 'do-the-needful',
        mistake: 'Do the needful',
        correct: 'Please take the necessary action',
        explanation: 'This phrase is outdated and not used in modern business English.',
        category: 'Outdated Phrases',
        frequency: 'Very Common'
    },
    {
        id: 'revert-back',
        mistake: 'Revert back',
        correct: 'Please reply / Please respond',
        explanation: '"Revert" already means "to go back", so "back" is redundant.',
        category: 'Redundancy',
        frequency: 'Very Common'
    },
    {
        id: 'prepone',
        mistake: 'Prepone the meeting',
        correct: 'Move the meeting forward / Reschedule to an earlier date',
        explanation: '"Prepone" is not a standard English word. Use "move forward" or "reschedule".',
        category: 'Indianism',
        frequency: 'Common'
    },
    {
        id: 'out-of-station',
        mistake: 'I am out of station',
        correct: 'I am out of town / I am away',
        explanation: '"Out of station" is an Indianism. Use "out of town" or "away".',
        category: 'Indianism',
        frequency: 'Common'
    },
    {
        id: 'same-same',
        mistake: 'Both are same same',
        correct: 'Both are similar / Both are the same',
        explanation: 'Avoid repeating words. Use "similar" or "the same".',
        category: 'Redundancy',
        frequency: 'Common'
    },
    {
        id: 'kindly-do',
        mistake: 'Kindly do this',
        correct: 'Could you please do this? / I would appreciate if you could...',
        explanation: '"Kindly" is too formal and can sound demanding. Use more polite alternatives.',
        category: 'Tone',
        frequency: 'Common'
    },
    {
        id: 'discuss-about',
        mistake: 'Let\'s discuss about this',
        correct: 'Let\'s discuss this',
        explanation: '"Discuss" is a transitive verb - it doesn\'t need "about".',
        category: 'Grammar',
        frequency: 'Very Common'
    },
    {
        id: 'explain-me',
        mistake: 'Explain me this',
        correct: 'Explain this to me',
        explanation: 'The correct structure is "explain [something] to [someone]".',
        category: 'Grammar',
        frequency: 'Very Common'
    },
    {
        id: 'i-am-agree',
        mistake: 'I am agree',
        correct: 'I agree',
        explanation: '"Agree" is a verb, not an adjective. Use "I agree" not "I am agree".',
        category: 'Grammar',
        frequency: 'Common'
    },
    {
        id: 'concerned-person',
        mistake: 'Contact the concerned person',
        correct: 'Contact the person concerned / Contact the relevant person',
        explanation: 'In English, "concerned" comes after the noun when it means "relevant".',
        category: 'Word Order',
        frequency: 'Common'
    }
];

export default function CommonMistakesTracker() {
    const { userId } = useUserStore();
    const [learnedMistakes, setLearnedMistakes] = useState<Set<string>>(new Set());
    const [currentMistakeIndex, setCurrentMistakeIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(`mistakes-learned-${userId}`);
        if (saved) {
            setLearnedMistakes(new Set(JSON.parse(saved)));
        }
    }, [userId]);

    const currentMistake = commonMistakes[currentMistakeIndex];
    const progress = (learnedMistakes.size / commonMistakes.length) * 100;
    const unlearnedMistakes = commonMistakes.filter(m => !learnedMistakes.has(m.id));

    const handleMarkLearned = () => {
        const newLearned = new Set(learnedMistakes);
        newLearned.add(currentMistake.id);
        setLearnedMistakes(newLearned);
        localStorage.setItem(`mistakes-learned-${userId}`, JSON.stringify([...newLearned]));
        
        // Move to next unlearned mistake
        const nextUnlearned = commonMistakes.findIndex(m => !newLearned.has(m.id));
        if (nextUnlearned !== -1) {
            setCurrentMistakeIndex(nextUnlearned);
            setShowAnswer(false);
        }
    };

    const handleNext = () => {
        const nextIndex = (currentMistakeIndex + 1) % commonMistakes.length;
        setCurrentMistakeIndex(nextIndex);
        setShowAnswer(false);
    };

    const handlePrevious = () => {
        const prevIndex = currentMistakeIndex === 0 ? commonMistakes.length - 1 : currentMistakeIndex - 1;
        setCurrentMistakeIndex(prevIndex);
        setShowAnswer(false);
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-2 px-2">
                <h2 className="text-2xl sm:text-3xl font-bold">Common Mistakes Tracker</h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                    Learn and avoid the most common English mistakes made by Indian professionals
                </p>
            </div>

            {/* Progress */}
            <Card>
                <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div>
                            <h3 className="font-bold text-base sm:text-lg">Your Progress</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                {learnedMistakes.size} of {commonMistakes.length} mistakes learned
                            </p>
                        </div>
                        <div className="text-left sm:text-right">
                            <div className="text-xl sm:text-2xl font-bold">{Math.round(progress)}%</div>
                            <div className="text-xs text-muted-foreground">Complete</div>
                        </div>
                    </div>
                    <Progress value={progress} className="h-2" />
                </CardContent>
            </Card>

            {/* Current Mistake */}
            <Card>
                <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                        <CardTitle className="text-lg sm:text-xl">Mistake #{currentMistakeIndex + 1}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">{currentMistake.category}</Badge>
                            <Badge variant={currentMistake.frequency === 'Very Common' ? 'destructive' : 'secondary'} className="text-xs">
                                {currentMistake.frequency}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                    {/* Mistake */}
                    <div className="bg-red-50 dark:bg-red-950 border-2 border-red-200 dark:border-red-800 rounded-lg p-3 sm:p-4">
                        <div className="flex items-start gap-2 mb-2">
                            <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0 mt-0.5" />
                            <div className="min-w-0 flex-1">
                                <p className="text-xs sm:text-sm font-medium text-red-900 dark:text-red-200 mb-1">❌ Common Mistake:</p>
                                <p className="text-base sm:text-lg font-bold text-red-700 dark:text-red-300 break-words">"{currentMistake.mistake}"</p>
                            </div>
                        </div>
                    </div>

                    {showAnswer ? (
                        <>
                            {/* Correct Version */}
                            <div className="bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-800 rounded-lg p-3 sm:p-4">
                                <div className="flex items-start gap-2 mb-2">
                                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0 mt-0.5" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm font-medium text-green-900 dark:text-green-200 mb-1">✅ Correct:</p>
                                        <p className="text-base sm:text-lg font-bold text-green-700 dark:text-green-300 break-words">"{currentMistake.correct}"</p>
                                    </div>
                                </div>
                            </div>

                            {/* Explanation */}
                            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">💡 Why it's wrong:</p>
                                        <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 break-words">{currentMistake.explanation}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Button
                                    variant="outline"
                                    onClick={handlePrevious}
                                    className="flex-1 text-sm"
                                    size="sm"
                                >
                                    Previous
                                </Button>
                                {!learnedMistakes.has(currentMistake.id) ? (
                                    <Button
                                        onClick={handleMarkLearned}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-sm"
                                        size="sm"
                                    >
                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                        Mark as Learned
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline"
                                        className="flex-1 text-sm"
                                        size="sm"
                                        disabled
                                    >
                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                        Already Learned
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    onClick={handleNext}
                                    className="flex-1 text-sm"
                                    size="sm"
                                >
                                    Next
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Button
                            onClick={() => setShowAnswer(true)}
                            className="w-full"
                            size="lg"
                        >
                            Show Correct Answer
                        </Button>
                    )}
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <Card>
                    <CardContent className="p-3 sm:p-4 text-center">
                        <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2" />
                        <div className="text-xl sm:text-2xl font-bold">{learnedMistakes.size}</div>
                        <div className="text-xs text-muted-foreground">Mistakes Learned</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-3 sm:p-4 text-center">
                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 mx-auto mb-2" />
                        <div className="text-xl sm:text-2xl font-bold">{unlearnedMistakes.length}</div>
                        <div className="text-xs text-muted-foreground">Remaining</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-3 sm:p-4 text-center">
                        <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-xl sm:text-2xl font-bold">{Math.round(progress)}%</div>
                        <div className="text-xs text-muted-foreground">Progress</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

