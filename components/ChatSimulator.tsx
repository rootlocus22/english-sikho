"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, Loader2, MessageCircle } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { toast } from "sonner";
import { speakText } from "@/lib/audioUtils";

interface Message {
    role: "user" | "model";
    content: string;
}

const SCENARIOS = [
    { id: "salary", title: "Salary Negotiation", description: "Practice asking for a raise", icon: "💰" },
    { id: "leave", title: "Asking for Leave", description: "Convince your manager", icon: "🏖️" },
    { id: "mistake", title: "Explaining a Mistake", description: "Handle an angry client", icon: "⚠️" },
];

export default function ChatSimulator() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [scenario, setScenario] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { credits, userId, decrementCredits, openPaywall, voicePreferences } = useUserStore();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const startScenario = (id: string) => {
        const selected = SCENARIOS.find(s => s.id === id);
        if (!selected) return;

        setScenario(id);
        setMessages([
            { role: "model", content: `(Roleplay Started: ${selected.title}) Hello. What do you want to talk about?` }
        ]);
    };

    const handleSend = async () => {
        if (!input.trim() || !scenario) return;

        if (!userId) {
            toast.error("Please login first!");
            return;
        }

        if (credits <= 0) {
            openPaywall();
            return;
        }

        const newMessages = [...messages, { role: "user", content: input } as Message];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("/api/ai/coach", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "roleplay-chat",
                    history: newMessages,
                    scenarioId: scenario
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            const aiMessage = { role: "model" as const, content: data.reply };
            setMessages(prev => [...prev, aiMessage]);
            decrementCredits();

            // Auto-play AI response with voice
            setTimeout(() => {
                speakText(data.reply, {
                    lang: 'en-US',
                    gender: voicePreferences.gender,
                    accent: voicePreferences.accent,
                });
            }, 300);
        } catch (error) {
            toast.error("Failed to get response");
        } finally {
            setLoading(false);
        }
    };

    if (!scenario) {
        return (
            <Card className="shadow-sm border-slate-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-900">
                        <MessageCircle className="w-6 h-6 text-blue-600" />
                        Roleplay Gym
                    </CardTitle>
                    <CardDescription>Choose a tough scenario to practice your communication skills.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                    {SCENARIOS.map(s => (
                        <Button
                            key={s.id}
                            variant="outline"
                            className="h-32 text-left flex flex-col items-start justify-center gap-2 hover:border-blue-300 hover:bg-blue-50 transition-all"
                            onClick={() => startScenario(s.id)}
                        >
                            <span className="text-3xl mb-2">{s.icon}</span>
                            <span className="font-semibold text-base">{s.title}</span>
                            <span className="text-xs text-slate-600">{s.description}</span>
                        </Button>
                    ))}
                </CardContent>
            </Card>
        );
    }

    const selectedScenario = SCENARIOS.find(s => s.id === scenario);

    return (
        <Card className="shadow-sm border-slate-200 flex flex-col h-[600px] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b bg-slate-50 shrink-0">
                <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <span>{selectedScenario?.icon}</span>
                        {selectedScenario?.title}
                    </CardTitle>
                    <CardDescription className="text-sm">Convince the AI manager.</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => { setScenario(null); setMessages([]); }}>
                    Exit
                </Button>
            </CardHeader>

            <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-4 w-full">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex gap-2 items-start ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                            {m.role === "model" && (
                                <Avatar className="h-8 w-8 shrink-0">
                                    <AvatarFallback className="bg-slate-200 text-slate-700 text-xs">AI</AvatarFallback>
                                </Avatar>
                            )}
                            <div
                                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed break-words ${m.role === "user"
                                    ? "bg-blue-600 text-white max-w-[70%]"
                                    : "bg-slate-100 text-slate-900 border border-slate-200 max-w-[75%]"
                                    }`}
                            >
                                {m.content}
                            </div>
                            {m.role === "user" && (
                                <Avatar className="h-8 w-8 shrink-0">
                                    <AvatarFallback className="bg-blue-600 text-white text-xs">ME</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    <div ref={scrollRef} />
                </div>
            </div>

            <div className="p-4 border-t bg-white shrink-0 flex gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your response..."
                    onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
                    className="flex-1"
                    disabled={loading}
                />
                <Button onClick={handleSend} disabled={loading || !input.trim()} className="bg-blue-600 hover:bg-blue-700 shrink-0">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
            </div>
        </Card>
    );
}
