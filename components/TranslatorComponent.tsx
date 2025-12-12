"use client";

import { useState } from 'react';
import { useUserStore } from '@/lib/store';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Copy, Languages, ArrowRight, Volume2, Mic, Square } from 'lucide-react';
import { toast } from 'sonner';
import { speakText, stopSpeaking, isSpeaking, startListening, isSpeechRecognitionSupported } from '@/lib/audioUtils';

interface TranslatorOutput {
    formal: string;
    persuasive: string;
    casualProfessional: string;
}

export default function TranslatorComponent() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<TranslatorOutput | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);

    const {
        credits,
        guestUsageCount,
        incrementGuestUsage,
        userId,
        setPaywallOpen,
        setCredits,
        voicePreferences
    } = useUserStore();

    const handleGenerate = async () => {
        if (!input.trim()) return;

        // Check Limits
        if (!userId && guestUsageCount >= 3) {
            setPaywallOpen(true);
            return;
        }
        if (userId && credits <= 0) {
            setPaywallOpen(true);
            return;
        }

        setLoading(true);
        try {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json'
            };

            // Add userId for authenticated users
            if (userId) {
                headers['x-user-id'] = userId;
            }

            const response = await fetch('/api/ai/coach', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    type: 'translator',
                    input: input
                })
            });

            const data = await response.json();

            if (response.ok) {
                setResult(data);
                // Credits are decremented on backend now, but keep client state in sync
                toast.success("Translation ready!");
            } else if (response.status === 403 && data.needsUpgrade) {
                setPaywallOpen(true);
                toast.error(data.error || "No credits remaining");
            } else if (response.status === 401) {
                toast.error("Please login to continue");
            } else {
                toast.error("Something went wrong. Try again!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied!");
    };

    const handleVoiceInput = () => {
        if (!isSpeechRecognitionSupported()) {
            toast.error("Voice input not supported in this browser");
            return;
        }

        if (isListening) {
            // Stop listening
            recognition?.stop();
            setIsListening(false);
            return;
        }

        // Start listening
        setIsListening(true);
        const rec = startListening({
            lang: 'en-IN', // Indian English
            continuous: false,
            interimResults: true,
            onResult: (transcript, isFinal) => {
                setInput(transcript);
                if (isFinal) {
                    setIsListening(false);
                    // Auto-trigger translation after 1 second
                    setTimeout(() => {
                        if (transcript.trim()) {
                            handleGenerate();
                        }
                    }, 1000);
                }
            },
            onError: (error) => {
                console.error('Speech recognition error:', error);
                toast.error("Voice input failed. Try again!");
                setIsListening(false);
            },
            onEnd: () => {
                setIsListening(false);
            }
        });
        setRecognition(rec);
    };

    const handleSpeak = (text: string, index: number) => {
        if (isSpeaking()) {
            stopSpeaking();
            setPlayingIndex(null);
            return;
        }

        setPlayingIndex(index);
        speakText(text, {
            lang: 'en-US',
            gender: voicePreferences.gender,
            accent: voicePreferences.accent,
            onEnd: () => setPlayingIndex(null),
            onError: () => {
                toast.error("Audio playback failed");
                setPlayingIndex(null);
            }
        });
    };

    return (
        <div className="space-y-4 md:space-y-6">
            <Card className="shadow-sm border-slate-200">
                <CardHeader className="space-y-1 pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-slate-900">
                        <Languages className="w-5 h-5 text-blue-600" />
                        Desi-to-Corporate Translator
                    </CardTitle>
                    <CardDescription className="text-sm">
                        Convert Hinglish to professional English
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative">
                        <Textarea
                            placeholder="Type your Hinglish here... e.g. 'Sir salary badhana hai'"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="min-h-[100px] md:min-h-[120px] text-sm md:text-base resize-none focus:border-blue-500 pr-12"
                        />
                        <Button
                            size="sm"
                            variant="ghost"
                            className="absolute bottom-2 right-2"
                            onClick={handleVoiceInput}
                            disabled={loading}
                            title={isListening ? "Stop recording" : "Speak your text"}
                        >
                            {isListening ? (
                                <Square className="w-5 h-5 text-red-500 fill-red-500" />
                            ) : (
                                <Mic className="w-5 h-5 text-blue-600" />
                            )}
                        </Button>
                    </div>
                    {isListening && (
                        <p className="text-xs text-blue-600 animate-pulse">🎤 Listening... Speak now!</p>
                    )}
                    <Button
                        onClick={handleGenerate}
                        disabled={loading || !input.trim()}
                        className="w-full h-11 md:h-12 text-sm md:text-base bg-blue-600 hover:bg-blue-700"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin mr-2" />
                                Translating...
                            </>
                        ) : (
                            <>
                                Generate Versions
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <div className="space-y-3 md:space-y-4">
                    <h3 className="text-sm md:text-base font-semibold text-slate-700">3 Professional Versions:</h3>
                    <div className="space-y-3">
                        {Object.entries(result).map(([key, value], index) => (
                            <Card key={key} className="border-slate-200 hover:border-blue-300 transition-colors shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-xs md:text-sm font-semibold uppercase tracking-wide text-slate-600">
                                        {key === 'formal' && '📋 Formal'}
                                        {key === 'persuasive' && '💪 Persuasive'}
                                        {key === 'casualProfessional' && '😊 Casual Professional'}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <p className="text-sm md:text-base text-slate-800 leading-relaxed">{value}</p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-2 text-blue-600 border-blue-200 hover:bg-blue-50 text-xs md:text-sm"
                                            onClick={() => handleSpeak(value, index)}
                                        >
                                            {playingIndex === index ? (
                                                <>
                                                    <Square className="w-3 h-3 md:w-4 md:h-4 fill-blue-600" /> Stop
                                                </>
                                            ) : (
                                                <>
                                                    <Volume2 className="w-3 h-3 md:w-4 md:h-4" /> Listen
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-2 text-slate-600 border-slate-200 hover:bg-slate-50 text-xs md:text-sm"
                                            onClick={() => copyToClipboard(value)}
                                        >
                                            <Copy className="w-3 h-3 md:w-4 md:h-4" /> Copy
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
