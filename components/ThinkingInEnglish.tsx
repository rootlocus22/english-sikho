'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Brain, CheckCircle2, Lightbulb, ArrowRight } from 'lucide-react';

const exercises = [
    {
        id: 'daily-routine',
        title: 'Describe Your Day',
        description: 'Narrate your daily routine in English without translating from Hindi',
        prompt: 'Describe what you did today from morning to evening. Think directly in English!',
        tips: [
            'Don\'t think in Hindi first, then translate',
            'Use simple sentences: "I woke up. I brushed my teeth. I had breakfast."',
            'Focus on actions, not perfect grammar',
            'If you don\'t know a word, describe it in English'
        ],
        example: 'I woke up at 7 AM. I brushed my teeth and took a shower. Then I had breakfast with my family. After that, I went to work...'
    },
    {
        id: 'describe-object',
        title: 'Describe an Object',
        description: 'Pick any object around you and describe it in English',
        prompt: 'Look around you. Pick any object (phone, pen, book, etc.) and describe it in English. What does it look like? What is it used for?',
        tips: [
            'Start with: "This is a..." or "I can see a..."',
            'Describe: color, size, shape, material, purpose',
            'Use adjectives: big, small, round, square, blue, etc.',
            'Don\'t worry about being perfect - just think in English!'
        ],
        example: 'This is a blue pen. It is small and cylindrical. It is made of plastic. I use it to write notes. It has a cap on top...'
    },
    {
        id: 'explain-process',
        title: 'Explain a Process',
        description: 'Explain how to do something you know well',
        prompt: 'Think of something you do regularly (making tea, sending an email, etc.). Explain the steps in English.',
        tips: [
            'Use sequence words: First, Then, Next, Finally',
            'Use simple present tense: "First, I boil water..."',
            'Focus on actions, not perfection',
            'Think step-by-step in English'
        ],
        example: 'First, I take a cup. Then I add tea leaves. Next, I pour hot water. After that, I add sugar and milk. Finally, I stir and drink it.'
    },
    {
        id: 'express-feelings',
        title: 'Express Your Feelings',
        description: 'Describe how you feel right now in English',
        prompt: 'How are you feeling right now? Happy? Tired? Excited? Describe your feelings in English.',
        tips: [
            'Use feeling words: happy, sad, tired, excited, nervous, calm',
            'Explain why: "I feel happy because..."',
            'Use simple sentences',
            'Think about emotions directly in English'
        ],
        example: 'I feel a bit tired today because I woke up early. But I am also excited because I am learning English. I feel motivated to practice more.'
    },
    {
        id: 'plan-future',
        title: 'Plan Your Future',
        description: 'Talk about your plans for tomorrow or next week',
        prompt: 'What are you planning to do tomorrow or this week? Describe your plans in English.',
        tips: [
            'Use future tense: "I will...", "I am going to..."',
            'Think about: work, personal tasks, goals',
            'Use simple plans, not complex ones',
            'Think directly in English about the future'
        ],
        example: 'Tomorrow I will go to the office. I am going to finish my project. Then I will have lunch with my colleague. In the evening, I will practice English.'
    }
];

export default function ThinkingInEnglish() {
    const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
    const [userResponse, setUserResponse] = useState('');
    const [showExample, setShowExample] = useState(false);

    const exercise = selectedExercise ? exercises.find(e => e.id === selectedExercise) : null;

    const handleStart = (exerciseId: string) => {
        setSelectedExercise(exerciseId);
        setUserResponse('');
        setShowExample(false);
    };

    const handleSubmit = () => {
        if (!userResponse.trim()) return;
        // In real app, this would analyze the response
        // For now, just show feedback
        alert('Great job! You\'re thinking in English. Keep practicing daily!');
    };

    if (exercise) {
        return (
            <div className="space-y-6">
                <Button variant="ghost" onClick={() => setSelectedExercise(null)}>
                    ← Back to Exercises
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">{exercise.title}</CardTitle>
                        <p className="text-muted-foreground">{exercise.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Prompt */}
                        <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 border border-blue-200">
                            <div className="flex items-start gap-2 mb-2">
                                <Brain className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-blue-900 dark:text-blue-200 mb-1">Your Task:</p>
                                    <p className="text-blue-800 dark:text-blue-300">{exercise.prompt}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="bg-yellow-50 dark:bg-yellow-950 rounded-lg p-4 border border-yellow-200">
                            <div className="flex items-start gap-2 mb-3">
                                <Lightbulb className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">💡 Tips:</p>
                                    <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-300">
                                        {exercise.tips.map((tip, i) => (
                                            <li key={i}>• {tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Text Area */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Write your response (think directly in English):
                            </label>
                            <Textarea
                                value={userResponse}
                                onChange={(e) => setUserResponse(e.target.value)}
                                placeholder="Start typing in English... Don't translate from Hindi!"
                                className="min-h-[200px]"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                                💡 Tip: Don't think in Hindi first. Think directly in English!
                            </p>
                        </div>

                        {/* Example */}
                        <div>
                            <Button
                                variant="outline"
                                onClick={() => setShowExample(!showExample)}
                                className="w-full"
                            >
                                {showExample ? 'Hide' : 'Show'} Example
                            </Button>
                            {showExample && (
                                <div className="mt-3 bg-green-50 dark:bg-green-950 rounded-lg p-4 border border-green-200">
                                    <p className="text-sm font-semibold text-green-900 dark:text-green-200 mb-2">Example Response:</p>
                                    <p className="text-sm text-green-800 dark:text-green-300 italic">"{exercise.example}"</p>
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <Button
                            onClick={handleSubmit}
                            className="w-full"
                            size="lg"
                            disabled={!userResponse.trim()}
                        >
                            Submit Response
                            <CheckCircle2 className="w-4 h-4 ml-2" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-2 px-2">
                <h2 className="text-2xl sm:text-3xl font-bold">Thinking in English Exercises</h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                    Stop translating from Hindi. Start thinking directly in English!
                </p>
            </div>

            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
                <CardContent className="p-4 sm:p-6">
                    <h3 className="font-bold mb-2 flex items-center gap-2 text-base sm:text-lg">
                        <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        Why This Matters
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        Most Indian learners think in Hindi/Tamil first, then translate to English. This slows you down and causes mistakes. 
                        These exercises train your brain to think directly in English, making you speak faster and more naturally.
                    </p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {exercises.map((exercise) => (
                    <Card
                        key={exercise.id}
                        className="hover:shadow-lg transition-all cursor-pointer"
                        onClick={() => handleStart(exercise.id)}
                    >
                        <CardHeader className="p-4 sm:p-6">
                            <CardTitle className="text-base sm:text-lg">{exercise.title}</CardTitle>
                            <p className="text-xs sm:text-sm text-muted-foreground">{exercise.description}</p>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                            <Button variant="outline" className="w-full text-sm sm:text-base" size="sm">
                                Start Exercise
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

