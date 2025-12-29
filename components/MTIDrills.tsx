'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Mic, Volume2, CheckCircle2, XCircle, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { HelpTooltip, HELP_CONTENT } from '@/components/ContextualHelp';

const mtiDrills = [
    {
        id: 'v-vs-w',
        title: 'V vs W',
        description: 'Many Indians pronounce "V" and "W" the same. Practice distinguishing them.',
        examples: [
            { word: 'Very', correct: 'V', common: 'W', audio: 'very' },
            { word: 'Worry', correct: 'W', common: 'V', audio: 'worry' },
            { word: 'Vine', correct: 'V', common: 'W', audio: 'vine' },
            { word: 'Wine', correct: 'W', common: 'V', audio: 'wine' },
            { word: 'Vest', correct: 'V', common: 'W', audio: 'vest' },
            { word: 'West', correct: 'W', common: 'V', audio: 'west' },
        ],
        tips: [
            'For "V": Touch your lower lip to your upper teeth',
            'For "W": Round your lips like saying "O"',
            'Practice: "Very worried" - feel the difference'
        ]
    },
    {
        id: 'p-vs-f',
        title: 'P vs F',
        description: 'Some regional accents confuse P and F sounds.',
        examples: [
            { word: 'Phone', correct: 'F', common: 'P', audio: 'phone' },
            { word: 'Photo', correct: 'F', common: 'P', audio: 'photo' },
            { word: 'Pill', correct: 'P', common: 'F', audio: 'pill' },
            { word: 'Fill', correct: 'F', common: 'P', audio: 'fill' },
        ],
        tips: [
            'For "F": Upper teeth touch lower lip, air flows',
            'For "P": Lips come together, then pop open',
            'Practice: "Phone call" vs "Pill call"'
        ]
    },
    {
        id: 'th-sound',
        title: 'TH Sound',
        description: 'The "TH" sound doesn\'t exist in many Indian languages.',
        examples: [
            { word: 'Think', correct: 'TH', common: 'T', audio: 'think' },
            { word: 'Thank', correct: 'TH', common: 'T', audio: 'thank' },
            { word: 'The', correct: 'TH', common: 'D', audio: 'the' },
            { word: 'That', correct: 'TH', common: 'D', audio: 'that' },
        ],
        tips: [
            'Tongue tip touches upper teeth',
            'Air flows between tongue and teeth',
            'Practice: "Think that" - feel tongue position'
        ]
    },
    {
        id: 'r-sound',
        title: 'R Sound',
        description: 'Indian "R" is rolled, English "R" is softer.',
        examples: [
            { word: 'Right', correct: 'Soft R', common: 'Rolled R', audio: 'right' },
            { word: 'Red', correct: 'Soft R', common: 'Rolled R', audio: 'red' },
            { word: 'Very', correct: 'Soft R', common: 'Rolled R', audio: 'very' },
        ],
        tips: [
            'English R: Tongue doesn\'t touch roof of mouth',
            'Lips slightly rounded',
            'Practice: "Very right" - keep R soft'
        ]
    },
    {
        id: 's-vs-sh',
        title: 'S vs SH',
        description: 'Distinguishing between S and SH sounds.',
        examples: [
            { word: 'Ship', correct: 'SH', common: 'S', audio: 'ship' },
            { word: 'Sip', correct: 'S', common: 'SH', audio: 'sip' },
            { word: 'Wish', correct: 'SH', common: 'S', audio: 'wish' },
            { word: 'Miss', correct: 'S', common: 'SH', audio: 'miss' },
        ],
        tips: [
            'For "SH": Lips rounded, tongue near roof',
            'For "S": Lips spread, tongue behind teeth',
            'Practice: "Ship" vs "Sip" - feel the difference'
        ]
    }
];

export default function MTIDrills() {
    const [selectedDrill, setSelectedDrill] = useState<string | null>(null);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);

    const drill = selectedDrill ? mtiDrills.find(d => d.id === selectedDrill) : null;
    const currentWord = drill?.examples[currentWordIndex];

    const handleStartPractice = (drillId: string) => {
        setSelectedDrill(drillId);
        setCurrentWordIndex(0);
        setScore(0);
        setAttempts(0);
    };

    const handleRecord = () => {
        setIsRecording(true);
        // In real implementation, this would use Web Speech API
        setTimeout(() => {
            setIsRecording(false);
            setAttempts(prev => prev + 1);
            // Simulate scoring - in real app, use AI to analyze pronunciation
            const isCorrect = Math.random() > 0.3; // 70% chance for demo
            if (isCorrect) {
                setScore(prev => prev + 1);
            }
        }, 2000);
    };

    const handleNext = () => {
        if (drill && currentWordIndex < drill.examples.length - 1) {
            setCurrentWordIndex(prev => prev + 1);
        } else {
            // Drill complete
            setSelectedDrill(null);
            setCurrentWordIndex(0);
        }
    };

    if (selectedDrill && drill) {
        const progress = ((currentWordIndex + 1) / drill.examples.length) * 100;
        const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

        return (
            <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <Button variant="ghost" onClick={() => setSelectedDrill(null)} className="text-sm sm:text-base">
                        ← Back to Drills
                    </Button>
                    <Badge variant="secondary" className="text-xs sm:text-sm">{currentWordIndex + 1} / {drill.examples.length}</Badge>
                </div>

                <Card>
                    <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-xl sm:text-2xl">{drill.title}</CardTitle>
                        <p className="text-sm sm:text-base text-muted-foreground">{drill.description}</p>
                        <Progress value={progress} className="mt-3 sm:mt-4" />
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                        {/* Current Word Practice */}
                        <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 sm:p-6 text-center">
                            <h3 className="text-2xl sm:text-3xl font-bold mb-2 break-words">{currentWord?.word}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                                Correct: <strong>{currentWord?.correct}</strong> | 
                                Common Mistake: <strong className="text-red-600">{currentWord?.common}</strong>
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                                <Button variant="outline" size="sm" className="w-full sm:w-auto sm:size-lg">
                                    <Play className="w-4 h-4 mr-2" />
                                    Listen
                                </Button>
                                <Button 
                                    size="sm" 
                                    onClick={handleRecord}
                                    disabled={isRecording}
                                    className={`w-full sm:w-auto sm:size-lg ${isRecording ? 'bg-red-500' : ''}`}
                                >
                                    <Mic className="w-4 h-4 mr-2" />
                                    {isRecording ? 'Recording...' : 'Record'}
                                </Button>
                            </div>

                            {attempts > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm text-muted-foreground">
                                        Accuracy: <strong className="text-green-600">{accuracy}%</strong>
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Tips */}
                        <div className="bg-yellow-50 dark:bg-yellow-950 rounded-lg p-4">
                            <h4 className="font-bold mb-2">💡 Tips:</h4>
                            <ul className="space-y-1 text-sm">
                                {drill.tips.map((tip, i) => (
                                    <li key={i}>• {tip}</li>
                                ))}
                            </ul>
                        </div>

                        <Button onClick={handleNext} className="w-full" size="lg">
                            {currentWordIndex < drill.examples.length - 1 ? 'Next Word' : 'Complete Drill'}
                            <CheckCircle2 className="w-4 h-4 ml-2" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                    <h2 className="text-3xl font-bold">MTI Pronunciation Drills</h2>
                    <HelpTooltip 
                        title={HELP_CONTENT.mti.title}
                        content={HELP_CONTENT.mti.content}
                    />
                </div>
                <p className="text-muted-foreground">
                    Fix common pronunciation mistakes specific to Indian English learners
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {mtiDrills.map((drill) => (
                    <Card key={drill.id} className="hover:shadow-lg transition-all cursor-pointer">
                        <CardHeader className="p-4 sm:p-6">
                            <CardTitle className="text-lg sm:text-xl">{drill.title}</CardTitle>
                            <p className="text-xs sm:text-sm text-muted-foreground">{drill.description}</p>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                            <div className="space-y-2 sm:space-y-3">
                                <div className="text-xs text-muted-foreground">
                                    {drill.examples.length} words to practice
                                </div>
                                <Button 
                                    onClick={() => handleStartPractice(drill.id)}
                                    className="w-full text-sm sm:text-base"
                                    size="sm"
                                >
                                    Start Practice
                                    <Mic className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-blue-50 dark:bg-blue-950">
                <CardContent className="p-6">
                    <h3 className="font-bold mb-2">What is MTI?</h3>
                    <p className="text-sm text-muted-foreground">
                        Mother Tongue Influence (MTI) refers to how your native language affects your English pronunciation. 
                        These drills help you identify and fix common MTI patterns specific to Indian speakers.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

