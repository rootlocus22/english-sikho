"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAudioRecording } from '@/hooks/useAudioRecording';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface AudioRecorderProps {
    onTranscript?: (text: string, isFinal: boolean) => void;
    onFinalTranscript?: (text: string) => void;
    lang?: string;
    showTranscript?: boolean;
    placeholder?: string;
    className?: string;
    continuous?: boolean;
    variant?: 'default' | 'compact';
}

/**
 * Reusable component for voice input with speech-to-text
 */
export function AudioRecorder({
    onTranscript,
    onFinalTranscript,
    lang = 'en-IN',
    showTranscript = true,
    placeholder = 'Click the microphone to start speaking...',
    className,
    continuous = false,
    variant = 'default'
}: AudioRecorderProps) {
    const {
        isRecording,
        transcript,
        finalTranscript,
        interimTranscript,
        error,
        isSupported,
        startRecording,
        stopRecording,
        resetTranscript,
        confidence
    } = useAudioRecording({
        lang,
        continuous,
        onTranscript: (text, isFinal) => {
            onTranscript?.(text, isFinal);
            if (isFinal) {
                onFinalTranscript?.(text);
            }
        }
    });

    const handleToggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    if (!isSupported) {
        return (
            <Card className={cn('p-4 border-orange-200 bg-orange-50 dark:bg-orange-950', className)}>
                <div className="flex items-center gap-3 text-orange-700 dark:text-orange-300">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <div className="text-sm">
                        <p className="font-medium">Voice input not supported</p>
                        <p className="text-xs text-orange-600 dark:text-orange-400">
                            Please use a modern browser like Chrome or Edge
                        </p>
                    </div>
                </div>
            </Card>
        );
    }

    if (variant === 'compact') {
        return (
            <div className={cn('flex items-center gap-2', className)}>
                <Button
                    variant={isRecording ? 'default' : 'outline'}
                    size="sm"
                    onClick={handleToggleRecording}
                    className={cn(
                        'rounded-full w-8 h-8 p-0 transition-all',
                        isRecording && 'bg-red-500 hover:bg-red-600 animate-pulse'
                    )}
                >
                    {isRecording ? (
                        <MicOff className="w-4 h-4 text-white" />
                    ) : (
                        <Mic className="w-4 h-4" />
                    )}
                </Button>
                {showTranscript && transcript && (
                    <span className="text-sm text-muted-foreground truncate">
                        {transcript}
                    </span>
                )}
            </div>
        );
    }

    return (
        <Card className={cn('p-6', className)}>
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Mic className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">Voice Input</span>
                    </div>
                    {confidence > 0 && (
                        <Badge variant="outline" className="gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            {Math.round(confidence * 100)}% confident
                        </Badge>
                    )}
                </div>

                {/* Recording Button */}
                <div className="flex gap-2">
                    <Button
                        variant={isRecording ? 'default' : 'outline'}
                        onClick={handleToggleRecording}
                        className={cn(
                            'flex-1 gap-2 transition-all',
                            isRecording && 'bg-red-500 hover:bg-red-600 animate-pulse'
                        )}
                    >
                        {isRecording ? (
                            <>
                                <MicOff className="w-4 h-4" />
                                Stop Recording
                            </>
                        ) : (
                            <>
                                <Mic className="w-4 h-4" />
                                Start Recording
                            </>
                        )}
                    </Button>
                    {transcript && (
                        <Button
                            variant="ghost"
                            onClick={resetTranscript}
                            size="sm"
                            className="w-8 h-8 p-0"
                        >
                            ×
                        </Button>
                    )}
                </div>

                {/* Transcript Display */}
                {showTranscript && (
                    <div className="min-h-[80px] p-4 rounded-md bg-muted">
                        {transcript ? (
                            <div className="text-sm">
                                <span className="text-foreground">{finalTranscript}</span>
                                {interimTranscript && (
                                    <span className="text-muted-foreground italic">
                                        {interimTranscript}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                {placeholder}
                            </p>
                        )}
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                        <AlertCircle className="w-4 h-4" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Recording Indicator */}
                {isRecording && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                        <span>Recording... Speak clearly</span>
                    </div>
                )}
            </div>
        </Card>
    );
}

/**
 * Simple microphone button for inline voice input
 */
export function MicButton({
    onTranscript,
    lang = 'en-IN',
    className
}: Pick<AudioRecorderProps, 'onTranscript' | 'lang' | 'className'>) {
    const { isRecording, isSupported, startRecording, stopRecording } = useAudioRecording({
        lang,
        onTranscript
    });

    if (!isSupported) return null;

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={isRecording ? stopRecording : startRecording}
            className={cn(
                'rounded-full w-8 h-8 p-0',
                isRecording && 'bg-red-100 dark:bg-red-900 text-red-600 animate-pulse',
                className
            )}
        >
            <Mic className="w-4 h-4" />
        </Button>
    );
}
