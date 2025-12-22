import { useState, useEffect, useRef, useCallback } from 'react';
import { speakText, stopSpeaking, isSpeaking, getVoiceByName } from '@/lib/audioUtils';
import { useUserStore } from '@/lib/store';

interface AudioPlaybackOptions {
    rate?: number;
    pitch?: number;
    volume?: number;
    onEnd?: () => void;
    onError?: (error: any) => void;
}

interface UseAudioPlaybackReturn {
    isPlaying: boolean;
    isPaused: boolean;
    currentIndex: number;
    play: (text: string | string[], options?: AudioPlaybackOptions) => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
    next: () => void;
    previous: () => void;
    setSpeed: (speed: number) => void;
    speed: number;
    queue: string[];
    progress: number;
}

/**
 * Custom hook for managing text-to-speech playback with queue support
 */
export function useAudioPlayback(): UseAudioPlaybackReturn {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [queue, setQueue] = useState<string[]>([]);
    const [speed, setSpeed] = useState(1.0);
    const [progress, setProgress] = useState(0);

    const { voicePreferences } = useUserStore();
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const optionsRef = useRef<AudioPlaybackOptions>({});

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopSpeaking();
        };
    }, []);

    // Play next item in queue
    const playNext = useCallback(() => {
        if (currentIndex >= queue.length - 1) {
            setIsPlaying(false);
            setCurrentIndex(0);
            setProgress(100);
            optionsRef.current.onEnd?.();
            return;
        }

        setCurrentIndex(prev => prev + 1);
    }, [currentIndex, queue.length]);

    // Play current item
    const playCurrent = useCallback(() => {
        if (queue.length === 0 || currentIndex >= queue.length) return;

        const text = queue[currentIndex];

        // Get voice with proper preferences
        let voice: SpeechSynthesisVoice | undefined;
        if (voicePreferences.voiceName) {
            voice = getVoiceByName(voicePreferences.voiceName);
        }

        setIsPlaying(true);
        setIsPaused(false);
        setProgress((currentIndex / queue.length) * 100);

        speakText(text, {
            rate: speed,
            voice,
            // Pass accent and gender preferences to help select best voice
            accent: voicePreferences.accent || 'in',
            gender: voicePreferences.gender || 'female',
            ...optionsRef.current,
            onEnd: () => {
                if (currentIndex < queue.length - 1) {
                    playNext();
                } else {
                    setIsPlaying(false);
                    setProgress(100);
                    optionsRef.current.onEnd?.();
                }
            },
            onError: (error) => {
                setIsPlaying(false);
                optionsRef.current.onError?.(error);
            }
        });
    }, [queue, currentIndex, speed, voicePreferences, playNext]);

    // Play function
    const play = useCallback((text: string | string[], options: AudioPlaybackOptions = {}) => {
        const textArray = Array.isArray(text) ? text : [text];
        setQueue(textArray);
        setCurrentIndex(0);
        optionsRef.current = options;

        // Play will be triggered by useEffect when queue updates
    }, []);

    // Auto-play when queue updates
    useEffect(() => {
        // Only play if we have a queue, not currently playing, and not paused
        if (queue.length > 0 && !isPlaying && !isPaused && currentIndex === 0) {
            playCurrent();
        }
    }, [queue.length]); // Only depend on queue length, not the entire queue array


    // Pause function
    const pause = useCallback(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.pause();
            setIsPaused(true);
            setIsPlaying(false);
        }
    }, []);

    // Resume function
    const resume = useCallback(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.resume();
            setIsPaused(false);
            setIsPlaying(true);
        }
    }, []);

    // Stop function
    const stop = useCallback(() => {
        stopSpeaking();
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentIndex(0);
        setQueue([]);
        setProgress(0);
    }, []);

    // Next function
    const next = useCallback(() => {
        stopSpeaking();
        if (currentIndex < queue.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setIsPlaying(false);
            setIsPaused(false);
        }
    }, [currentIndex, queue.length]);

    // Previous function
    const previous = useCallback(() => {
        stopSpeaking();
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setIsPlaying(false);
            setIsPaused(false);
        }
    }, [currentIndex]);

    // Update speed and replay current if playing
    const updateSpeed = useCallback((newSpeed: number) => {
        setSpeed(newSpeed);
        if (isPlaying) {
            stopSpeaking();
            setIsPlaying(false);
            // Will auto-replay with new speed
        }
    }, [isPlaying]);

    return {
        isPlaying,
        isPaused,
        currentIndex,
        play,
        pause,
        resume,
        stop,
        next,
        previous,
        setSpeed: updateSpeed,
        speed,
        queue,
        progress
    };
}
