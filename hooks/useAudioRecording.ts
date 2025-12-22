import { useState, useRef, useCallback, useEffect } from 'react';
import { startListening, isSpeechRecognitionSupported } from '@/lib/audioUtils';

interface UseAudioRecordingOptions {
    lang?: string;
    continuous?: boolean;
    onTranscript?: (text: string, isFinal: boolean) => void;
    onError?: (error: any) => void;
}

interface UseAudioRecordingReturn {
    isRecording: boolean;
    transcript: string;
    finalTranscript: string;
    interimTranscript: string;
    error: string | null;
    isSupported: boolean;
    startRecording: () => void;
    stopRecording: () => void;
    resetTranscript: () => void;
    confidence: number;
}

/**
 * Custom hook for managing speech-to-text recording
 */
export function useAudioRecording(options: UseAudioRecordingOptions = {}): UseAudioRecordingReturn {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [finalTranscript, setFinalTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [confidence, setConfidence] = useState(0);
    const [isSupported] = useState(isSpeechRecognitionSupported());

    const recognitionRef = useRef<any>(null);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                } catch (e) {
                    // Ignore errors during cleanup
                }
            }
        };
    }, []);

    const startRecording = useCallback(() => {
        if (!isSupported) {
            setError('Speech recognition is not supported in your browser');
            return;
        }

        if (isRecording) {
            return;
        }

        setError(null);
        setTranscript('');
        setFinalTranscript('');
        setInterimTranscript('');
        setConfidence(0);

        try {
            recognitionRef.current = startListening({
                lang: options.lang || 'en-IN',
                continuous: options.continuous ?? false,
                interimResults: true,
                onResult: (text: string, isFinal: boolean) => {
                    if (isFinal) {
                        setFinalTranscript(prev => prev + text + ' ');
                        setTranscript(prev => prev + text + ' ');
                        setInterimTranscript('');
                        // Estimate confidence (speechRecognition API doesn't always provide it)
                        setConfidence(0.85);
                    } else {
                        setInterimTranscript(text);
                        setTranscript(finalTranscript + text);
                    }
                    options.onTranscript?.(text, isFinal);
                },
                onError: (err: any) => {
                    console.error('Speech recognition error:', err);
                    setError(err.toString());
                    setIsRecording(false);
                    options.onError?.(err);
                },
                onEnd: () => {
                    setIsRecording(false);
                }
            });

            setIsRecording(true);
        } catch (err: any) {
            console.error('Failed to start recording:', err);
            setError(err.message || 'Failed to start recording');
            setIsRecording(false);
            options.onError?.(err);
        }
    }, [isSupported, isRecording, options, finalTranscript]);

    const stopRecording = useCallback(() => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
                setIsRecording(false);
            } catch (err: any) {
                console.error('Error stopping recording:', err);
                setError(err.message || 'Error stopping recording');
            }
        }
    }, []);

    const resetTranscript = useCallback(() => {
        setTranscript('');
        setFinalTranscript('');
        setInterimTranscript('');
        setConfidence(0);
        setError(null);
    }, []);

    return {
        isRecording,
        transcript: transcript.trim(),
        finalTranscript: finalTranscript.trim(),
        interimTranscript: interimTranscript.trim(),
        error,
        isSupported,
        startRecording,
        stopRecording,
        resetTranscript,
        confidence
    };
}
