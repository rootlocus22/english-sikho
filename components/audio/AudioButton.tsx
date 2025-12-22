"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Loader2, Play, Pause } from 'lucide-react';
import { useAudioPlayback } from '@/hooks/useAudioPlayback';
import { cn } from '@/lib/utils';

interface AudioButtonProps {
    text: string | string[];
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg';
    showLabel?: boolean;
    label?: string;
    className?: string;
    onPlayStart?: () => void;
    onPlayEnd?: () => void;
    autoPlay?: boolean;
}

/**
 * Reusable button component for text-to-speech playback
 * Supports single text or queue of text items
 */
export function AudioButton({
    text,
    variant = 'outline',
    size = 'sm',
    showLabel = true,
    label,
    className,
    onPlayStart,
    onPlayEnd,
    autoPlay = false
}: AudioButtonProps) {
    const { play, stop, isPlaying: globalIsPlaying, queue } = useAudioPlayback();
    const [isLoading, setIsLoading] = useState(false);
    const [isThisPlaying, setIsThisPlaying] = useState(false);
    const previousQueueRef = useRef<string>('');

    // Track if THIS specific button's audio is playing
    // Use queue content as string to avoid infinite loops from array reference changes
    useEffect(() => {
        const textArray = Array.isArray(text) ? text : [text];
        const queueString = queue.join('||');

        // Only update if queue content actually changed
        if (previousQueueRef.current !== queueString) {
            previousQueueRef.current = queueString;
            const isThisButtonPlaying = globalIsPlaying && queue.some(q => textArray.includes(q));
            setIsThisPlaying(isThisButtonPlaying);
        }
    }, [globalIsPlaying, queue, text]);

    useEffect(() => {
        if (autoPlay && text) {
            handlePlay();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePlay = () => {
        if (isThisPlaying) {
            // Stop only if THIS button is playing
            stop();
            setIsThisPlaying(false);
            onPlayEnd?.();
        } else {
            // Stop any other audio first to prevent interference
            if (globalIsPlaying) {
                stop();
            }

            setIsLoading(true);
            setIsThisPlaying(true);
            onPlayStart?.();

            play(text, {
                onEnd: () => {
                    setIsLoading(false);
                    setIsThisPlaying(false);
                    onPlayEnd?.();
                },
                onError: (error) => {
                    console.error('Audio playback error:', error);
                    setIsLoading(false);
                    setIsThisPlaying(false);
                    onPlayEnd?.();
                }
            });

            // Remove loading state after a brief moment (speech starts quickly)
            setTimeout(() => setIsLoading(false), 300);
        }
    };

    const getIcon = () => {
        if (isLoading) {
            return <Loader2 className="w-4 h-4 animate-spin" />;
        }
        return isThisPlaying ? (
            <Pause className="w-4 h-4" />
        ) : (
            <Play className="w-4 h-4" />
        );
    };

    const getLabel = () => {
        if (label) return label;
        return isThisPlaying ? 'Pause' : 'Play';
    };

    return (
        <Button
            variant={variant}
            size={size}
            onClick={handlePlay}
            disabled={isLoading || !text}
            className={cn(
                'gap-2',
                isThisPlaying && 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700',
                className
            )}
        >
            {getIcon()}
            {showLabel && <span>{getLabel()}</span>}
        </Button>
    );
}

/**
 * Icon-only audio button for compact spaces
 */
export function AudioIconButton({
    text,
    className,
    onPlayStart,
    onPlayEnd
}: Pick<AudioButtonProps, 'text' | 'className' | 'onPlayStart' | 'onPlayEnd'>) {
    return (
        <AudioButton
            text={text}
            variant="ghost"
            size="sm"
            showLabel={false}
            className={cn('w-8 h-8 p-0', className)}
            onPlayStart={onPlayStart}
            onPlayEnd={onPlayEnd}
        />
    );
}

/**
 * Play/Pause toggle button
 */
export function AudioPlayPauseButton({
    text,
    className,
    onPlayStart,
    onPlayEnd
}: Pick<AudioButtonProps, 'text' | 'className' | 'onPlayStart' | 'onPlayEnd'>) {
    const { play, pause, resume, stop, isPlaying: globalIsPlaying, isPaused, queue } = useAudioPlayback();
    const [isLoading, setIsLoading] = useState(false);
    const [isThisPlaying, setIsThisPlaying] = useState(false);
    const previousQueueRef = useRef<string>('');

    // Track if THIS specific button's audio is playing
    // Use queue content as string to avoid infinite loops from array reference changes
    useEffect(() => {
        const textArray = Array.isArray(text) ? text : [text];
        const queueString = queue.join('||');

        // Only update if queue content actually changed
        if (previousQueueRef.current !== queueString) {
            previousQueueRef.current = queueString;
            const isThisButtonPlaying = globalIsPlaying && queue.some(q => textArray.includes(q));
            setIsThisPlaying(isThisButtonPlaying);
        }
    }, [globalIsPlaying, queue, text]);

    const handleClick = () => {
        if (isThisPlaying) {
            pause();
        } else if (isPaused) {
            resume();
            onPlayStart?.();
        } else {
            // Stop any other audio first to prevent interference
            if (globalIsPlaying) {
                stop();
            }

            setIsLoading(true);
            setIsThisPlaying(true); // Optimistically set to playing
            onPlayStart?.();

            play(text, {
                onEnd: () => {
                    setIsLoading(false);
                    setIsThisPlaying(false);
                    onPlayEnd?.();
                },
                onError: (error) => {
                    console.error('Audio playback error:', error);
                    setIsLoading(false);
                    setIsThisPlaying(false); // Reset playing state on error
                    stop(); // Ensure global state is also stopped
                }
            });

            setTimeout(() => setIsLoading(false), 300);
        }
    };

    const getIcon = () => {
        if (isLoading) return <Loader2 className="w-5 h-5 animate-spin" />;
        if (isThisPlaying) return <Pause className="w-5 h-5" />;
        return <Play className="w-5 h-5" />;
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                "inline-flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95",
                isThisPlaying
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-400",
                className
            )}
            aria-label={isThisPlaying ? "Pause" : "Play"}
        >
            {getIcon()}
        </button>
    );
}

