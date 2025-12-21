"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToneSwitcherProps {
    original: string;
    polite: string;
    professional: string;
}

type Tone = "original" | "polite" | "professional";

export default function ToneSwitcher({
    original,
    polite,
    professional,
}: ToneSwitcherProps) {
    const [activeTone, setActiveTone] = useState<Tone>("professional");
    const [copied, setCopied] = useState(false);

    const getActiveText = () => {
        switch (activeTone) {
            case "original":
                return original;
            case "polite":
                return polite;
            case "professional":
                return professional;
            default:
                return professional;
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(getActiveText());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto my-8 border rounded-xl overflow-hidden shadow-sm bg-card">
            <div className="bg-muted/50 p-4 border-b">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Choose Your Tone
                </h3>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={activeTone === "original" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTone("original")}
                        className={cn(
                            "transition-all",
                            activeTone === "original"
                                ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
                                : "hover:bg-red-50 text-red-600 border-red-200"
                        )}
                    >
                        Rude / Basic
                    </Button>
                    <Button
                        variant={activeTone === "polite" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTone("polite")}
                        className={cn(
                            "transition-all",
                            activeTone === "polite"
                                ? "bg-blue-500 hover:bg-blue-600 text-white border-blue-500"
                                : "hover:bg-blue-50 text-blue-600 border-blue-200"
                        )}
                    >
                        Polite (Coworker)
                    </Button>
                    <Button
                        variant={activeTone === "professional" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTone("professional")}
                        className={cn(
                            "transition-all",
                            activeTone === "professional"
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-lg shadow-emerald-100"
                                : "hover:bg-emerald-50 text-emerald-600 border-emerald-200"
                        )}
                    >
                        CEO-Level (Boss)
                    </Button>
                </div>
            </div>

            <div className="p-6 md:p-8 bg-card relative group">
                <div className="min-h-[100px] flex items-center justify-center">
                    <p
                        className={cn(
                            "text-xl md:text-2xl font-serif text-center leading-relaxed transition-all duration-300",
                            activeTone === "original" && "text-red-700 italic",
                            activeTone === "polite" && "text-blue-800",
                            activeTone === "professional" && "text-emerald-900 font-medium"
                        )}
                    >
                        &quot;{getActiveText()}&quot;
                    </p>
                </div>

                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleCopy}
                    aria-label="Copy to clipboard"
                >
                    {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                    ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                </Button>
            </div>

            <div className="px-6 py-3 bg-muted/20 border-t text-xs text-muted-foreground flex justify-between items-center">
                <span>Use this for: {activeTone === 'original' ? 'Never (Avoid this)' : activeTone === 'polite' ? 'WhatsApp / Slack / Peers' : 'Formal Emails / Seniors'}</span>
            </div>
        </div>
    );
}
