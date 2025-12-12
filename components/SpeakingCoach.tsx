"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Mic, StopCircle, RefreshCw, Loader2, Award, Zap, BookOpen } from 'lucide-react';
import { startListening, stopSpeaking, isSpeechRecognitionSupported } from '@/lib/audioUtils';
import { toast } from 'sonner';
import { event } from '@/lib/analytics';
import { useUserStore } from '@/lib/store';

interface FeedbackData {
    score: number;
    feedback: string;
    grammarCorrections: Array<{
        original: string;
        corrected: string;
        explanation: string;
    }>;
    vocabularySuggestions: Array<{
        original: string;
        suggestion: string;
        context: string;
    }>;
    confidenceAnalysis: string;
}

export default function SpeakingCoach() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackData | null>(null);
    const recognitionRef = useRef<any>(null);
    const { credits, decrementCredits, openPaywall } = useUserStore();

    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const toggleRecording = () => {
        if (isRecording) {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            setIsRecording(false);
            // Auto analyze if text is long enough
            if (transcript.length > 20) {
                analyzeSpeech();
            }
        } else {
            setTranscript("");
            setFeedback(null);
            const recognition = startListening({
                continuous: true,
                onResult: (text, isFinal) => {
                    setTranscript(prev => isFinal ? prev + text + " " : prev);
                },
                onError: (err) => {
                    console.error("Speech error:", err);
                    toast.error("Microphone error. Please try again.");
                    setIsRecording(false);
                },
                onEnd: () => {
                    // Only set recording to false if it stopped naturally, 
                    // usually handles itself but good safety
                    if (isRecording) setIsRecording(false);
                }
            });
            if (recognition) {
                recognitionRef.current = recognition;
                setIsRecording(true);
            }
        }
    };

    const analyzeSpeech = async () => {
        if (!transcript || transcript.trim().length < 5) {
            toast.error("Please speak a bit more first!");
            return;
        }

        if (credits <= 0) {
            openPaywall();
            return;
        }

        setIsAnalyzing(true);
        try {
            const response = await fetch('/api/ai/speaking-coach', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transcript: transcript.trim() })
            });

            if (!response.ok) throw new Error("Analysis failed");

            const data = await response.json();
            setFeedback(data);
            decrementCredits();

            event({
                action: "generate_content",
                category: "ai_tool",
                label: "speaking_coach"
            });

            toast.success("Analysis complete!");
        } catch (error) {
            console.error(error);
            toast.error("Could not analyze speech. Try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-slate-900">Speaking Coach 🎤</h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Practice speaking freely. AI will analyze your grammar, vocabulary, and confidence in real-time.
                </p>
            </div>

            {/* Recording Area */}
            <Card className="border-2 border-slate-200 overflow-hidden">
                <CardContent className="p-8 flex flex-col items-center justify-center min-h-[300px] bg-slate-50/50">

                    {/* Mic Button */}
                    <div className="relative mb-8">
                        {isRecording && (
                            <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-25"></div>
                        )}
                        <Button
                            size="lg"
                            className={`rounded-full w-24 h-24 flex items-center justify-center transition-all duration-300 ${isRecording ? 'bg-red-500 hover:bg-red-600 scale-110 shadow-red-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                                } shadow-xl`}
                            onClick={toggleRecording}
                        >
                            {isRecording ? (
                                <StopCircle className="w-10 h-10 text-white" />
                            ) : (
                                <Mic className="w-10 h-10 text-white" />
                            )}
                        </Button>
                    </div>

                    <p className={`text-lg font-medium mb-6 ${isRecording ? 'text-red-500 animate-pulse' : 'text-slate-500'}`}>
                        {isRecording ? "Listening... (Tap Stop to Analyze)" : "Tap mic to start speaking"}
                    </p>

                    {/* Transcript Display */}
                    <div className="w-full max-w-2xl bg-white p-6 rounded-xl border border-slate-200 min-h-[100px] shadow-sm">
                        {transcript ? (
                            <p className="text-lg text-slate-800 leading-relaxed">{transcript}</p>
                        ) : (
                            <p className="text-slate-400 italic text-center">Your speech will appear here...</p>
                        )}
                    </div>

                    {/* Manual Analyze Button (if stopped manually) */}
                    {!isRecording && transcript.length > 5 && !feedback && (
                        <Button
                            onClick={analyzeSpeech}
                            disabled={isAnalyzing}
                            className="mt-6 bg-slate-900 text-white hover:bg-slate-800"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...
                                </>
                            ) : (
                                "Analyze My Speech"
                            )}
                        </Button>
                    )}
                </CardContent>
            </Card>

            {/* Analysis Results */}
            {feedback && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Score Card */}
                    <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-none shadow-xl">
                        <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Analysis Report</h2>
                                <p className="text-slate-300">{feedback.feedback}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-5xl font-bold text-green-400 mb-1">{feedback.score}</div>
                                <span className="text-sm text-slate-400 uppercase tracking-widest">Score</span>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Grammar Card */}
                        <Card className="border-red-100 bg-red-50/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-red-700">
                                    <Zap className="w-5 h-5" /> Grammar Fixes
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {feedback.grammarCorrections.length > 0 ? (
                                    feedback.grammarCorrections.map((item, i) => (
                                        <div key={i} className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                                            <p className="text-red-500 line-through text-sm mb-1">{item.original}</p>
                                            <p className="text-green-600 font-bold mb-2">→ {item.corrected}</p>
                                            <p className="text-xs text-slate-500">{item.explanation}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-500 italic">No grammar mistakes found! 🎉</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Vocabulary Card */}
                        <Card className="border-blue-100 bg-blue-50/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-700">
                                    <BookOpen className="w-5 h-5" /> Better Vocabulary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {feedback.vocabularySuggestions.length > 0 ? (
                                    feedback.vocabularySuggestions.map((item, i) => (
                                        <div key={i} className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-slate-600">{item.original}</span>
                                                <span className="text-blue-600 font-bold">{item.suggestion}</span>
                                            </div>
                                            <p className="text-xs text-slate-500">{item.context}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-500 italic">Vocabulary usage looked good!</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Confidence */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-indigo-700">
                                <Award className="w-5 h-5" /> Confidence Analysis
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-700">{feedback.confidenceAnalysis}</p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
