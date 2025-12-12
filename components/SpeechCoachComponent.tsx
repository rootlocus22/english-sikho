"use client";

import { useState, useEffect, useRef } from 'react';
import { useUserStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, StopCircle, Volume2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SpeechCoachProps {
    targetText: string;
}

interface CoachResult {
    score: number;
    feedback: string;
    analysis: string;
}

export default function SpeechCoachComponent({ targetText }: SpeechCoachProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<CoachResult | null>(null);
    const recognitionRef = useRef<any>(null); // Type 'any' for window.webkitSpeechRecognition

    const {
        credits,
        guestUsageCount,
        incrementGuestUsage,
        userId,
        setPaywallOpen,
        setCredits
    } = useUserStore();

    useEffect(() => {
        if ((window as any).webkitSpeechRecognition || (window as any).SpeechRecognition) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event: any) => {
                let currentTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    currentTranscript += event.results[i][0].transcript;
                }
                setTranscript(currentTranscript);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsRecording(false);
                toast.error("Error capturing speech. Please try again.");
            };

            recognitionRef.current.onend = () => {
                setIsRecording(false);
                // Auto-analyze when recording stops? Or wait for user? Let's auto-analyze if we have text.
                if (transcript.length > 5) { // Simple debounce
                    // handled via button or effect? Let's use manual stop -> analyze.
                }
            };
        } else {
            toast.error("Your browser does not support speech recognition.");
        }
    }, [transcript]);

    const toggleRecording = () => {
        if (isRecording) {
            recognitionRef.current?.stop();
            setIsRecording(false);
            handleAnalyze(transcript);
        } else {
            setTranscript('');
            setResult(null);
            recognitionRef.current?.start();
            setIsRecording(true);
        }
    };

    const handleAnalyze = async (textToAnalyze: string) => {
        if (!textToAnalyze.trim()) {
            toast.error("No speech detected.");
            return;
        }

        // Check Limits
        if (!userId && guestUsageCount >= 3) {
            setPaywallOpen(true);
            return;
        }
        if (userId && credits <= 0) {
            setPaywallOpen(true);
            return;
        }

        setIsAnalyzing(true);
        try {
            const response = await fetch('/api/ai/coach', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': userId || ''
                },
                body: JSON.stringify({
                    type: "speech-coach",
                    text: textToAnalyze
                }),
            });

            const data = await response.json();

            if (response.status === 403 && data.needsUpgrade) {
                toast.error(data.error);
                setPaywallOpen(true); // Changed from openPaywall() to setPaywallOpen(true)
                return;
            }

            if (response.status === 401) {
                toast.error("Please login to continue");
                return;
            }

            if (!response.ok) { // Check for non-OK responses after specific error handling
                if (data.error) {
                    throw new Error(data.error);
                } else {
                    throw new Error("Failed to analyze speech.");
                }
            }

            // If response is OK and no specific errors, proceed
            setResult(data);
            if (!userId) {
                incrementGuestUsage();
            } else {
                toast.error("Failed to analyze speech.");
            }
        } catch (e) {
            console.error(e);
            toast.error("Error connecting to coach.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const speakTarget = () => {
        const utterance = new SpeechSynthesisUtterance(targetText);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <Card className="border-l-4 border-l-green-500 shadow-md">
            <CardHeader>
                <CardTitle className="text-xl flex justify-between items-center">
                    <span>Speak this Sentence:</span>
                    <Button variant="ghost" size="icon" onClick={speakTarget} title="Listen to pronunciation">
                        <Volume2 className="w-5 h-5 text-blue-600" />
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg text-lg font-medium text-gray-800 border border-gray-200">
                    {targetText}
                </div>

                <div className="text-center">
                    <Button
                        onClick={toggleRecording}
                        size="lg"
                        variant={isRecording ? "destructive" : "default"}
                        className={`rounded-full w-16 h-16 ${isRecording ? "animate-pulse" : ""}`}
                    >
                        {isRecording ? <StopCircle className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                    </Button>
                    <p className="mt-2 text-sm text-gray-500">
                        {isRecording ? "Listening..." : "Tap to Record"}
                    </p>
                </div>

                {transcript && (
                    <div className="text-center text-gray-600 italic">
                        You said: "{transcript}"
                    </div>
                )}

                {isAnalyzing && (
                    <div className="text-center text-orange-500 font-medium animate-pulse">
                        Analyzing pronunciation...
                    </div>
                )}

                {result && (
                    <div className="mt-6 p-4 border rounded-lg bg-white space-y-3">
                        <div className="flex items-center gap-3">
                            <div className={`text-4xl font-bold ${result.score > 80 ? 'text-green-600' : 'text-orange-500'}`}>
                                {result.score}%
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">Feedback</h4>
                                <p className="text-sm text-gray-600">{result.feedback}</p>
                            </div>
                        </div>
                        {result.analysis && (
                            <div className="text-sm bg-blue-50 p-3 rounded text-blue-800">
                                {result.analysis}
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
