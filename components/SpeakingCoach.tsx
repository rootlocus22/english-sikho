"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Mic, StopCircle, Loader2, Award, Zap, BookOpen, Globe, Volume2, VolumeX, Languages } from 'lucide-react';
import { startListening, stopSpeaking, isSpeechRecognitionSupported, speakText, isSpeaking } from '@/lib/audioUtils';
import { toast } from 'sonner';
import { event } from '@/lib/analytics';
import { useUserStore } from '@/lib/store';

interface AccentPattern {
    pattern: string;
    example: string;
    tip: string;
}

interface AccentAnalysis {
    detectedInfluence: string;
    accentScore: number;
    mtiPatterns: AccentPattern[];
    overallAccentNote: string;
}

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
    accentAnalysis?: AccentAnalysis;
}

export default function SpeakingCoach() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackData | null>(null);
    const recognitionRef = useRef<any>(null);
    const { credits, userId, decrementCredits, openPaywall } = useUserStore();
    const [playingAccent, setPlayingAccent] = useState<string | null>(null);

    const ACCENT_OPTIONS = [
        { id: 'us', label: 'American', lang: 'en-US', flag: '🇺🇸' },
        { id: 'uk', label: 'British', lang: 'en-GB', flag: '🇬🇧' },
        { id: 'in', label: 'Indian', lang: 'en-IN', flag: '🇮🇳' },
        { id: 'au', label: 'Australian', lang: 'en-AU', flag: '🇦🇺' },
    ];

    useEffect(() => {
        if (!isSpeechRecognitionSupported()) {
            toast.error("Your browser doesn't support speech recognition. Try Chrome or Edge!");
        }
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
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': userId || ''
                },
                body: JSON.stringify({ transcript: transcript.trim() })
            });

            const data = await response.json();

            if (response.status === 403 && data.needsUpgrade) {
                toast.error(data.error);
                openPaywall();
                return;
            }

            if (response.status === 401) {
                toast.error("Please login to continue");
                return;
            }

            if (!response.ok) throw new Error("Analysis failed");

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

    const playInAccent = (accentId: string, lang: string) => {
        if (!transcript || transcript.trim().length < 3) {
            toast.error("Speak something first to hear it in different accents!");
            return;
        }

        if (playingAccent === accentId && isSpeaking()) {
            stopSpeaking();
            setPlayingAccent(null);
            return;
        }

        stopSpeaking();
        setPlayingAccent(accentId);

        const accentMapping: Record<string, 'us' | 'uk' | 'in' | 'any'> = {
            us: 'us', uk: 'uk', in: 'in', au: 'any'
        };

        // Slight rate per accent so each sounds distinct even when device has few voices
        const rateByAccent: Record<string, number> = { us: 0.95, uk: 0.88, in: 0.92, au: 0.9 };
        speakText(transcript.trim(), {
            lang,
            accent: accentMapping[accentId] || 'any',
            rate: rateByAccent[accentId] ?? 0.9,
            onEnd: () => setPlayingAccent(null),
            onError: () => setPlayingAccent(null),
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-slate-900">Speaking Coach 🎤</h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Practice speaking freely. AI will analyze your grammar, vocabulary, accent, and confidence. You can also hear your text in different accents!
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

            {/* Accent Preview — Hear your text in different accents */}
            {transcript.trim().length > 5 && (
                <Card className="border-2 border-purple-100 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-800">
                            <Languages className="w-5 h-5" /> Hear Your Text in Different Accents
                        </CardTitle>
                        <p className="text-sm text-purple-600">
                            Tap an accent below to hear your sentence in that accent. Each uses a different default voice (US, British, Indian, Australian). Compare and learn!
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                            Voices depend on your device; Chrome/Edge usually have the best variety.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {ACCENT_OPTIONS.map((accent) => {
                                const isPlaying = playingAccent === accent.id;
                                return (
                                    <button
                                        key={accent.id}
                                        onClick={() => playInAccent(accent.id, accent.lang)}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                                            isPlaying
                                                ? 'border-purple-500 bg-purple-100 shadow-lg scale-105'
                                                : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50 hover:shadow-md'
                                        }`}
                                    >
                                        <span className="text-2xl">{accent.flag}</span>
                                        <span className="text-sm font-semibold text-slate-700">{accent.label}</span>
                                        {isPlaying ? (
                                            <VolumeX className="w-4 h-4 text-purple-600 animate-pulse" />
                                        ) : (
                                            <Volume2 className="w-4 h-4 text-slate-400" />
                                        )}
                                        <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                                            {isPlaying ? 'Stop' : 'Play'}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}

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
                            <div className="flex gap-6 items-center">
                                <div className="flex flex-col items-center">
                                    <div className="text-5xl font-bold text-green-400 mb-1">{feedback.score}</div>
                                    <span className="text-sm text-slate-400 uppercase tracking-widest">Overall</span>
                                </div>
                                {feedback.accentAnalysis && (
                                    <div className="flex flex-col items-center border-l border-slate-600 pl-6">
                                        <div className={`text-4xl font-bold mb-1 ${
                                            feedback.accentAnalysis.accentScore >= 80 ? 'text-purple-300' :
                                            feedback.accentAnalysis.accentScore >= 60 ? 'text-yellow-300' :
                                            'text-orange-300'
                                        }`}>{feedback.accentAnalysis.accentScore}</div>
                                        <span className="text-sm text-slate-400 uppercase tracking-widest">Accent</span>
                                    </div>
                                )}
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

                    {/* Accent Analysis */}
                    {feedback.accentAnalysis && (
                        <Card className="border-purple-100 bg-gradient-to-br from-purple-50/30 to-indigo-50/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-purple-700">
                                    <Globe className="w-5 h-5" /> Accent Analysis
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Detected Influence</p>
                                        <p className="text-lg font-semibold text-purple-800">
                                            {feedback.accentAnalysis.detectedInfluence}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className={`text-3xl font-bold ${
                                            feedback.accentAnalysis.accentScore >= 80 ? 'text-green-500' :
                                            feedback.accentAnalysis.accentScore >= 60 ? 'text-yellow-500' :
                                            'text-orange-500'
                                        }`}>
                                            {feedback.accentAnalysis.accentScore}
                                        </div>
                                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">Clarity</span>
                                    </div>
                                </div>

                                {feedback.accentAnalysis.mtiPatterns.length > 0 && (
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-purple-700">MTI Patterns Detected</h4>
                                        {feedback.accentAnalysis.mtiPatterns.map((mti, i) => (
                                            <div key={i} className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                                                <div className="flex items-start gap-3">
                                                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full mt-0.5 shrink-0">
                                                        #{i + 1}
                                                    </span>
                                                    <div className="space-y-1">
                                                        <p className="font-medium text-slate-800">{mti.pattern}</p>
                                                        <p className="text-sm text-slate-500">
                                                            <span className="font-medium">Example:</span> &ldquo;{mti.example}&rdquo;
                                                        </p>
                                                        <p className="text-sm text-purple-600 bg-purple-50 px-3 py-1.5 rounded-lg mt-1">
                                                            💡 {mti.tip}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-100">
                                    <p className="text-sm text-slate-700 leading-relaxed">{feedback.accentAnalysis.overallAccentNote}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

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
