"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, ArrowRight, Copy, SlidersHorizontal, Volume2, Mic, Square } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { toast } from "sonner";
import { speakText, stopSpeaking, isSpeaking, startListening, isSpeechRecognitionSupported } from "@/lib/audioUtils";
import { event } from "@/lib/analytics";

const TONE_LABELS = {
    1: { label: "Rude", color: "text-red-600" },
    2: { label: "Casual", color: "text-amber-600" },
    3: { label: "Professional", color: "text-blue-600" },
    4: { label: "Polite", color: "text-purple-600" },
};

interface ToneRewriterProps {
    initialValue?: string;
}

export default function ToneRewriter({ initialValue = "" }: ToneRewriterProps) {
    const [input, setInput] = useState(initialValue);
    const [toneLevel, setToneLevel] = useState([3]);
    const [output, setOutput] = useState<{ rewritten: string; explanation: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const { credits, userId, openPaywall, decrementCredits, voicePreferences } = useUserStore();

    const handleRewrite = async () => {
        if (!input.trim()) return;

        if (!userId) {
            toast.error("Please login first!");
            return;
        }

        if (credits <= 0) {
            openPaywall();
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/ai/coach", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "tone-rewrite",
                    input,
                    toneLevel: toneLevel[0],
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setOutput(data);
            decrementCredits();

            event({
                action: "generate_content",
                category: "ai_tool",
                label: "tone_rewriter"
            });

            toast.success("Rewrite complete!");
        } catch (error) {
            toast.error("Something went wrong. Try again!");
        } finally {
            setLoading(false);
        }
    };

    const handleVoiceInput = () => {
        if (!isSpeechRecognitionSupported()) {
            toast.error("Voice input not supported in this browser");
            return;
        }

        if (isListening) {
            recognition?.stop();
            setIsListening(false);
            return;
        }

        setIsListening(true);
        const rec = startListening({
            lang: 'en-IN',
            continuous: false,
            interimResults: true,
            onResult: (transcript, isFinal) => {
                setInput(transcript);
                if (isFinal) {
                    setIsListening(false);
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

    const handleSpeak = (text: string) => {
        if (isSpeaking()) {
            stopSpeaking();
            setIsPlaying(false);
            return;
        }

        setIsPlaying(true);
        speakText(text, {
            lang: 'en-US',
            gender: voicePreferences.gender,
            accent: voicePreferences.accent,
            onEnd: () => setIsPlaying(false),
            onError: () => {
                toast.error("Audio playback failed");
                setIsPlaying(false);
            }
        });
    };

    const currentTone = TONE_LABELS[toneLevel[0] as keyof typeof TONE_LABELS];

    return (
        <div className="space-y-4 md:space-y-6">
            <Card className="shadow-sm border-slate-200">
                <CardHeader className="space-y-1 pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-slate-900">
                        <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                        Tone Slider
                    </CardTitle>
                    <CardDescription className="text-sm">
                        Adjust the politeness level of your text
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 md:space-y-6">
                    <div className="relative">
                        <Textarea
                            placeholder="e.g., I want the file now."
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

                    <div className="space-y-4 bg-slate-50 p-4 md:p-5 rounded-lg border border-slate-200">
                        <div className="flex justify-between items-center">
                            <span className="text-xs md:text-sm font-medium text-slate-600">Selected Tone:</span>
                            <span className={`text-sm md:text-base font-semibold ${currentTone.color}`}>
                                {currentTone.label}
                            </span>
                        </div>
                        <Slider
                            value={toneLevel}
                            onValueChange={setToneLevel}
                            max={4}
                            min={1}
                            step={1}
                            className="w-full"
                        />
                        <div className="grid grid-cols-4 text-[10px] md:text-xs text-slate-500 font-medium">
                            <span className="text-center">Rude</span>
                            <span className="text-center">Casual</span>
                            <span className="text-center">Professional</span>
                            <span className="text-center">Polite</span>
                        </div>
                    </div>

                    <Button
                        onClick={handleRewrite}
                        disabled={loading || !input.trim()}
                        className="w-full h-11 md:h-12 text-sm md:text-base bg-blue-600 hover:bg-blue-700"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                                Rewriting...
                            </>
                        ) : (
                            <>
                                Rewrite Text
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {output && (
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="bg-slate-50 border-b border-slate-200">
                        <CardTitle className="text-base md:text-lg text-slate-900">
                            Rewritten Version
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 md:pt-6 space-y-4">
                        <p className="text-sm md:text-base text-slate-900 leading-relaxed p-4 bg-white rounded-lg border border-slate-200">
                            {output.rewritten}
                        </p>
                        <div className="p-3 md:p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                            <p className="text-xs md:text-sm text-slate-700">{output.explanation}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 text-blue-600 border-blue-200 hover:bg-blue-50 text-xs md:text-sm"
                                onClick={() => handleSpeak(output.rewritten)}
                            >
                                {isPlaying ? (
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
                                onClick={() => {
                                    navigator.clipboard.writeText(output.rewritten);
                                    toast.success("Copied!");
                                }}
                            >
                                <Copy className="w-3 h-3 md:w-4 md:h-4" />
                                Copy
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
