"use client";

import { useEffect, useState } from "react";
import { getAvailableVoices } from "@/lib/audioUtils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic } from "lucide-react";
import { useUserStore } from "@/lib/store";

export function VoiceSelector() {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [loading, setLoading] = useState(true);
    const { voicePreferences, setVoicePreferences } = useUserStore();

    useEffect(() => {
        const loadVoices = () => {
            const allVoices = getAvailableVoices();
            // Filter for English (especially Indian) and Hindi
            const indianVoices = allVoices.filter(v =>
                v.lang.includes('IN') ||
                v.name.toLowerCase().includes('india') ||
                v.name.toLowerCase().includes('hindi')
            );

            // If we have indian voices, prioritize them, but keep others as fallback
            const sortedVoices = [
                ...indianVoices,
                ...allVoices.filter(v => !indianVoices.includes(v) && v.lang.startsWith('en'))
            ];

            setVoices(sortedVoices);
            setLoading(false);

            // Auto-select a good default if none selected in global store
            if (!voicePreferences.voiceName && indianVoices.length > 0) {
                // Try to find a good female/male Indian voice
                const defaultVoice = indianVoices.find(v => v.name.includes("Google")) || indianVoices[0];
                setVoicePreferences({ voiceName: defaultVoice.name });
            }
        };

        loadVoices();

        // Handle async voice loading
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.onvoiceschanged = null;
            }
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (loading || voices.length === 0) return null;

    return (
        <div className="flex items-center gap-2 w-full max-w-xs">
            <Mic className="w-4 h-4 text-muted-foreground" />
            <Select
                value={voicePreferences.voiceName || undefined}
                onValueChange={(name) => {
                    setVoicePreferences({ voiceName: name });
                }}
            >
                <SelectTrigger className="h-8 text-xs w-full bg-white/50 backdrop-blur-sm border-slate-200">
                    <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                    {voices.map((voice) => (
                        <SelectItem key={voice.name} value={voice.name} className="text-xs">
                            {voice.name.replace(/Microsoft |Google /g, "")}
                            {voice.lang.includes("IN") ? " 🇮🇳" : ""}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
