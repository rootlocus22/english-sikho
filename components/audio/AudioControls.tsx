"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Settings, Volume2, Gauge, Mic, X } from 'lucide-react';
import { useUserStore } from '@/lib/store';
import { getAvailableVoices } from '@/lib/audioUtils';
import { cn } from '@/lib/utils';

interface AudioControlsProps {
    className?: string;
    onClose?: () => void;
}

/**
 * Global audio control panel for TTS settings
 */
export function AudioControls({ className, onClose }: AudioControlsProps) {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const { voicePreferences, setVoicePreferences } = useUserStore();
    const [speed, setSpeed] = useState(voicePreferences.rate || 1.0);
    const [volume, setVolume] = useState(voicePreferences.volume || 1.0);

    useEffect(() => {
        const loadVoices = () => {
            const allVoices = getAvailableVoices();
            // Prioritize English voices, especially Indian
            const englishVoices = allVoices.filter(v =>
                v.lang.startsWith('en') || v.lang.includes('IN')
            );
            setVoices(englishVoices);
        };

        loadVoices();

        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.onvoiceschanged = null;
            }
        };
    }, []);

    const handleSpeedChange = (values: number[]) => {
        const newSpeed = values[0];
        setSpeed(newSpeed);
        setVoicePreferences({ rate: newSpeed });
    };

    const handleVolumeChange = (values: number[]) => {
        const newVolume = values[0];
        setVolume(newVolume);
        setVoicePreferences({ volume: newVolume });
    };

    const handleVoiceChange = (voiceName: string) => {
        setVoicePreferences({ voiceName });
    };

    const resetToDefaults = () => {
        setSpeed(1.0);
        setVolume(1.0);
        setVoicePreferences({ rate: 1.0, volume: 1.0 });
    };

    return (
        <Card className={cn('p-6 space-y-6', className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-muted-foreground" />
                    <h3 className="font-semibold">Audio Settings</h3>
                </div>
                {onClose && (
                    <Button variant="ghost" size="sm" onClick={onClose} className="w-8 h-8 p-0">
                        <X className="w-4 h-4" />
                    </Button>
                )}
            </div>

            {/* Voice Selection */}
            <div className="space-y-2">
                <Label className="flex items-center gap-2">
                    <Mic className="w-4 h-4" />
                    Voice
                </Label>
                <Select
                    value={voicePreferences.voiceName || ''}
                    onValueChange={handleVoiceChange}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                        {voices.map((voice) => (
                            <SelectItem key={voice.name} value={voice.name}>
                                {voice.name.replace(/Microsoft |Google /g, '')}
                                {voice.lang.includes('IN') && ' 🇮🇳'}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                    Choose your preferred voice for audio playback
                </p>
            </div>

            {/* Speed Control */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                        <Gauge className="w-4 h-4" />
                        Speed
                    </Label>
                    <span className="text-sm font-medium">{speed.toFixed(2)}x</span>
                </div>
                <Slider
                    value={[speed]}
                    onValueChange={handleSpeedChange}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Slow (0.5x)</span>
                    <span>Normal (1.0x)</span>
                    <span>Fast (2.0x)</span>
                </div>
            </div>

            {/* Volume Control */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4" />
                        Volume
                    </Label>
                    <span className="text-sm font-medium">{Math.round(volume * 100)}%</span>
                </div>
                <Slider
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                    min={0}
                    max={1}
                    step={0.1}
                    className="w-full"
                />
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Quick Presets</Label>
                <div className="grid grid-cols-3 gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setSpeed(0.75);
                            setVoicePreferences({ rate: 0.75 });
                        }}
                    >
                        Slow
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setSpeed(1.0);
                            setVoicePreferences({ rate: 1.0 });
                        }}
                    >
                        Normal
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setSpeed(1.25);
                            setVoicePreferences({ rate: 1.25 });
                        }}
                    >
                        Fast
                    </Button>
                </div>
            </div>

            {/* Reset Button */}
            <Button
                variant="ghost"
                onClick={resetToDefaults}
                className="w-full"
            >
                Reset to Defaults
            </Button>

            {/* Info */}
            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-md">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                    💡 Tip: Use keyboard shortcuts - Space to play/pause, Arrow keys to adjust speed
                </p>
            </div>
        </Card>
    );
}

/**
 * Compact floating audio controls
 */
export function FloatingAudioControls() {
    const [isOpen, setIsOpen] = useState(false);
    const { voicePreferences } = useUserStore();

    if (!isOpen) {
        return (
            <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 rounded-full shadow-lg z-50 w-12 h-12 p-0"
            >
                <Settings className="w-5 h-5" />
            </Button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 w-80">
            <AudioControls onClose={() => setIsOpen(false)} />
        </div>
    );
}
