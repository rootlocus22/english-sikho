"use client";

import { useState } from "react";
import { VocabularyWord } from "@/data/vocabulary";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Volume2, CheckCircle, XCircle } from "lucide-react";
import { AudioButton, AudioIconButton } from "@/components/audio/AudioButton";

interface FlashcardProps {
    word: VocabularyWord;
    onNext: () => void;
    onPrevious: () => void;
    onKnow: () => void;
    onDontKnow: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
    currentIndex: number;
    totalCards: number;
}

export default function Flashcard({
    word,
    onNext,
    onPrevious,
    onKnow,
    onDontKnow,
    hasNext,
    hasPrevious,
    currentIndex,
    totalCards
}: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleKnow = () => {
        onKnow();
        setIsFlipped(false);
        if (hasNext) {
            setTimeout(onNext, 300);
        }
    };

    const handleDontKnow = () => {
        onDontKnow();
        setIsFlipped(false);
        if (hasNext) {
            setTimeout(onNext, 300);
        }
    };

    return (
        <div className="space-y-6">
            {/* Progress */}
            <div className="text-center text-sm text-muted-foreground">
                Card {currentIndex + 1} of {totalCards}
            </div>

            {/* Flashcard */}
            <div
                className="relative h-80 cursor-pointer perspective-1000"
                onClick={handleFlip}
            >
                <div
                    className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''
                        }`}
                >
                    {/* Front Side */}
                    <Card
                        className={`absolute inset-0 p-8 flex flex-col items-center justify-center backface-hidden ${isFlipped ? 'invisible' : 'visible'
                            }`}
                    >
                        <div className="text-center space-y-6">
                            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                                Tap to reveal
                            </div>
                            <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                                {word.word}
                            </h2>
                            <div onClick={(e) => e.stopPropagation()}>
                                <AudioButton
                                    text={word.word}
                                    variant="outline"
                                    size="sm"
                                    label="Pronounce"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Back Side */}
                    <Card
                        className={`absolute inset-0 p-8 flex flex-col justify-center rotate-y-180 backface-hidden ${isFlipped ? 'visible' : 'invisible'
                            }`}
                    >
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-sm font-medium text-muted-foreground">Meaning</h3>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <AudioIconButton text={word.meaning} />
                                    </div>
                                </div>
                                <p className="text-lg">{word.meaning}</p>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-sm font-medium text-muted-foreground">हिंदी में</h3>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <AudioIconButton text={word.hindiMeaning} />
                                    </div>
                                </div>
                                <p className="text-lg">{word.hindiMeaning}</p>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300">Example</h3>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <AudioIconButton text={word.example} />
                                    </div>
                                </div>
                                <p className="italic">"{word.example}"</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Actions */}
            {isFlipped && (
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        className="flex-1 border-red-200 hover:bg-red-50 dark:hover:bg-red-950"
                        onClick={handleDontKnow}
                    >
                        <XCircle className="w-4 h-4 mr-2 text-red-600" />
                        Need to Review
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1 border-green-200 hover:bg-green-50 dark:hover:bg-green-950"
                        onClick={handleKnow}
                    >
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        I Know This
                    </Button>
                </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
                <Button
                    variant="ghost"
                    onClick={() => {
                        setIsFlipped(false);
                        onPrevious();
                    }}
                    disabled={!hasPrevious}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => {
                        setIsFlipped(false);
                        onNext();
                    }}
                    disabled={!hasNext}
                >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>

            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .transform-style-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
            `}</style>
        </div>
    );
}
