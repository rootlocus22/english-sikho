"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store";
import { getWorkplaceScenarioById, workplaceScenarios } from "@/data/workplace-scenarios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrackedButton, TrackedLink } from "@/components/ui/tracked-elements";
import { ArrowLeft, ArrowRight, Lightbulb, AlertCircle, CheckCircle, Users, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { AudioButton } from "@/components/audio/AudioButton";
import { AudioRecorder } from "@/components/audio/AudioRecorder";

export default function WorkplaceScenarioPage({ params }: { params: Promise<{ scenarioId: string }> }) {
    const { scenarioId } = use(params);
    const router = useRouter();
    const { userId } = useUserStore();

    const [currentStep, setCurrentStep] = useState(0);
    const [showTips, setShowTips] = useState(true);
    const [userResponse, setUserResponse] = useState("");

    const scenario = getWorkplaceScenarioById(scenarioId);

    if (!scenario) {
        notFound();
    }

    const currentConversation = scenario.conversation[currentStep];
    const hasNext = currentStep < scenario.conversation.length - 1;
    const hasPrevious = currentStep > 0;
    const isComplete = currentStep === scenario.conversation.length - 1;

    const handleNext = () => {
        if (hasNext) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (hasPrevious) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleComplete = () => {
        // Save to localStorage
        const saved = localStorage.getItem(`first-day-progress-${userId}`);
        const completed = saved ? JSON.parse(saved) : [];

        if (!completed.includes(scenarioId)) {
            completed.push(scenarioId);
            localStorage.setItem(`first-day-progress-${userId}`, JSON.stringify(completed));
        }

        toast.success("🎉 Scenario completed!");
        router.push('/dashboard/first-day');
    };

    return (
        <div className="container max-w-4xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <TrackedLink
                    href="/dashboard/first-day"
                    eventData={{ action: 'back_to_first_day_list', category: 'learning', label: scenarioId }}
                >
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        All Scenarios
                    </Button>
                </TrackedLink>

                <Badge variant="outline" className="capitalize">{scenario.difficulty}</Badge>
            </div>

            {/* Scenario Header */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">{scenario.title}</h1>
                <p className="text-muted-foreground">{scenario.description}</p>
            </div>

            {/* Situation Context */}
            <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <div className="space-y-3">
                    <div>
                        <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 mb-1">📍 Situation:</h3>
                        <p>{scenario.situation}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                        <div>
                            <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 mb-1">👤 Your Role:</h3>
                            <p className="text-sm">{scenario.yourRole}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 mb-1">🎯 Objective:</h3>
                            <p className="text-sm">{scenario.objective}</p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Conversation */}
            <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Conversation
                    </h2>
                    <span className="text-sm text-muted-foreground">
                        Step {currentStep + 1} of {scenario.conversation.length}
                    </span>
                </div>

                {/* Current Message */}
                <div className={`p-6 rounded-lg mb-6 ${currentConversation.isUser
                    ? 'bg-purple-50 dark:bg-purple-950 border-2 border-purple-200 dark:border-purple-800'
                    : 'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700'
                    }`}>
                    <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentConversation.isUser
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}>
                            {currentConversation.speaker[0]}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <div className="font-bold">{currentConversation.speaker}</div>
                                <AudioButton
                                    text={currentConversation.text}
                                    variant="ghost"
                                    size="sm"
                                    label={currentConversation.isUser ? "Hear Example" : "Listen"}
                                />
                            </div>
                            <div className="text-lg leading-relaxed mb-4">{currentConversation.text}</div>

                            {/* Voice Practice for User Responses */}
                            {currentConversation.isUser && (
                                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-700">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Volume2 className="w-4 h-4 text-purple-600" />
                                        <span className="text-sm font-medium">Practice Speaking</span>
                                    </div>
                                    <AudioRecorder
                                        variant="compact"
                                        onFinalTranscript={(text) => {
                                            setUserResponse(text);
                                            toast.success("Great job! Keep practicing to improve fluency.");
                                        }}
                                        placeholder="Click microphone to practice this response..."
                                        className="mb-2"
                                    />
                                    {userResponse && (
                                        <div className="mt-3 p-3 bg-green-50 dark:bg-green-950 rounded border border-green-200 dark:border-green-800">
                                            <div className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">
                                                Your response:
                                            </div>
                                            <div className="text-sm">{userResponse}</div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tips for user's responses */}
                {currentConversation.isUser && currentConversation.tips && showTips && (
                    <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
                        <div className="flex items-start gap-2">
                            <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-sm text-yellow-700 dark:text-yellow-300 mb-1">💡 Pro Tip:</h4>
                                <p className="text-sm">{currentConversation.tips}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={!hasPrevious}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                    </Button>
                    {!isComplete ? (
                        <Button onClick={handleNext} className="flex-1">
                            Next
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <TrackedButton
                            onClick={handleComplete}
                            eventData={{ action: 'complete_workplace_scenario', category: 'learning', label: scenarioId }}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Complete Scenario
                        </TrackedButton>
                    )}
                </div>
            </Card>

            {/* Key Phrases */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Key Phrases to Remember
                    </h3>
                    <AudioButton
                        text={scenario.keyPhrases}
                        variant="outline"
                        size="sm"
                        label="Play All"
                    />
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                    {scenario.keyPhrases.map((phrase, i) => (
                        <div key={i} className="flex items-center justify-between gap-2 text-sm p-3 bg-green-50 dark:bg-green-950 rounded hover:bg-green-100 dark:hover:bg-green-900 transition-colors">
                            <div className="flex items-center gap-2 flex-1">
                                <span className="text-green-600">✓</span>
                                <span>{phrase}</span>
                            </div>
                            <AudioButton
                                text={phrase}
                                variant="ghost"
                                size="sm"
                                showLabel={false}
                                className="w-8 h-8 p-0"
                            />
                        </div>
                    ))}
                </div>
            </Card>

            {/* Common Mistakes */}
            <Card className="p-6 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                <h3 className="font-bold mb-4 flex items-center gap-2 text-red-700 dark:text-red-300">
                    <AlertCircle className="w-5 h-5" />
                    Common Mistakes to Avoid
                </h3>
                <div className="space-y-2">
                    {scenario.commonMistakes.map((mistake, i) => (
                        <div key={i} className="text-sm">
                            {mistake}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Practice Tip */}
            <Card className="p-6 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                <h3 className="font-bold mb-2 flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                    <Lightbulb className="w-5 h-5" />
                    Practice Makes Perfect
                </h3>
                <p className="text-sm">
                    Try practicing this conversation out loud before your first day. It will help you feel more confident and natural!
                </p>
            </Card>
        </div>
    );
}
