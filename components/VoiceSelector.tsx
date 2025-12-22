"use client";

import { useEffect, useState } from "react";
import { getAvailableVoices } from "@/lib/audioUtils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2 } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { toast } from "sonner";

export function VoiceSelector() {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [loading, setLoading] = useState(true);
    const { voicePreferences, setVoicePreferences } = useUserStore();

    useEffect(() => {
        const loadVoices = () => {
            const allVoices = getAvailableVoices();

            // Lists of voice names to categorize
            const maleNames = ['rishi', 'male', 'arjun', 'aadish', 'om', 'deepak'];
            const femaleNames = ['neerja', 'female', 'kavya', 'aditi', 'shreya', 'heera', 'lekha'];

            // Helper to check if voice is female
            const isFemaleVoice = (voice: SpeechSynthesisVoice) => {
                const name = voice.name.toLowerCase();
                // Explicitly female
                if (femaleNames.some(n => name.includes(n))) return true;
                // Explicitly male - reject
                if (maleNames.some(n => name.includes(n))) return false;
                // Default to assuming female if no clear gender marker
                return !name.includes('male');
            };

            // Filter for Indian English voices FIRST
            const indianVoices = allVoices.filter(v =>
                (v.lang.includes('IN') ||
                    v.name.toLowerCase().includes('india') ||
                    v.name.toLowerCase().includes('hindi')) &&
                isFemaleVoice(v) // ONLY female voices
            );

            // Then other English female voices as fallback
            const otherFemaleVoices = allVoices.filter(v =>
                !indianVoices.includes(v) &&
                v.lang.startsWith('en') &&
                isFemaleVoice(v)
            );

            // Sort by quality: Google > System > Others
            const sortedVoices = [
                ...indianVoices.sort((a, b) => {
                    if (a.name.includes('Google') && !b.name.includes('Google')) return -1;
                    if (!a.name.includes('Google') && b.name.includes('Google')) return 1;
                    return 0;
                }),
                ...otherFemaleVoices.sort((a, b) => {
                    if (a.name.includes('Google') && !b.name.includes('Google')) return -1;
                    if (!a.name.includes('Google') && b.name.includes('Google')) return 1;
                    return 0;
                })
            ];

            setVoices(sortedVoices);
            setLoading(false);

            // Auto-select BEST female Indian voice if none selected
            if (!voicePreferences.voiceName && sortedVoices.length > 0) {
                const bestVoice = sortedVoices[0]; // Already sorted, first is best

                if (bestVoice) {
                    setVoicePreferences({
                        voiceName: bestVoice.name,
                        accent: 'in',
                        gender: 'female'
                    });
                    console.log('🎤 Auto-selected natural female voice:', bestVoice.name, '|', bestVoice.lang);
                    toast.success(`Voice set to: ${bestVoice.name.replace(/Google |Microsoft /g, '')}`);
                }
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

    if (loading || voices.length === 0) {
        return (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span className="hidden sm:inline">Loading voices...</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-purple-600" />
            <Select
                value={voicePreferences.voiceName || undefined}
                onValueChange={(name) => {
                    setVoicePreferences({ voiceName: name });
                    const selectedVoice = voices.find(v => v.name === name);
                    if (selectedVoice) {
                        toast.success(`Voice changed to: ${selectedVoice.name.replace(/Google |Microsoft /g, '')}`);
                    }
                }}
            >
                <SelectTrigger className="h-9 text-xs w-[180px] sm:w-[220px] bg-white border-purple-200 hover:border-purple-300">
                    <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                    <div className="p-2 text-xs font-medium text-muted-foreground border-b mb-1">
                        🇮🇳 Indian English (Female)
                    </div>
                    {voices.map((voice) => (
                        <SelectItem key={voice.name} value={voice.name} className="text-xs">
                            {voice.name.replace(/Microsoft |Google /g, "")}
                            {voice.lang.includes("IN") ? " 🇮🇳" : ""}
                            {voice.name.includes("Google") && " ⭐"}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
