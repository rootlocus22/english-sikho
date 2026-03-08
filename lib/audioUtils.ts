/**
 * Audio utilities for speech synthesis and recognition
 * Uses native browser APIs (free, no API costs)
 */

// Check if browser supports speech synthesis
export const isSpeechSynthesisSupported = (): boolean => {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

// Check if browser supports speech recognition
export const isSpeechRecognitionSupported = (): boolean => {
    return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
};

interface SpeakOptions {
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
    gender?: 'male' | 'female' | 'any';
    accent?: 'us' | 'uk' | 'in' | 'any';
    voice?: SpeechSynthesisVoice; // Allow explicit voice object
    onEnd?: () => void;
    onError?: (error: any) => void;
}

/**
 * Map locale to language codes for strict matching (accent preview)
 */
const LOCALE_CODES: Record<string, string[]> = {
    'en-US': ['en-US', 'en_US'],
    'en-GB': ['en-GB', 'en_GB'],
    'en-IN': ['en-IN', 'en_IN', 'hi-IN'],
    'en-AU': ['en-AU', 'en_AU'],
};

/**
 * Select the best voice for a specific locale (for accent comparison).
 * Only considers voices that match the requested locale — no fallback to other accents.
 */
function selectVoiceForLocale(
    voices: SpeechSynthesisVoice[],
    locale: string,
    gender: 'male' | 'female' | 'any' = 'female'
): SpeechSynthesisVoice | null {
    const codes = LOCALE_CODES[locale] || [locale];
    const matched = voices.filter(v => codes.some(c => v.lang.includes(c)));
    if (matched.length === 0) return null;

    const femaleNames = ['female', 'woman', 'samantha', 'karen', 'victoria', 'salli', 'joanna', 'kendra', 'kimberly', 'ivy', 'heather', 'fiona', 'moira', 'zira', 'neerja', 'kavya', 'aditi'];
    const maleNames = ['male', 'man', 'daniel', 'david', 'mark', 'alex', 'justin', 'matthew', 'joey', 'russell', 'brian', 'fred', 'oliver', 'rishi', 'arjun'];

    if (gender !== 'any') {
        const byGender = matched.filter(v => {
            const n = v.name.toLowerCase();
            if (gender === 'female') return femaleNames.some(name => n.includes(name));
            return maleNames.some(name => n.includes(name));
        });
        if (byGender.length > 0) {
            const preferred = byGender.find(v => v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Samantha') || v.name.includes('Daniel'));
            return preferred || byGender[0];
        }
    }

    const preferred = matched.find(v => v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Karen'));
    return preferred || matched[0];
}

/**
 * Filter voices by gender and accent preferences (general use)
 */
const filterVoicesByPreferences = (
    voices: SpeechSynthesisVoice[],
    lang: string,
    gender: 'male' | 'female' | 'any' = 'any',
    accent: 'us' | 'uk' | 'in' | 'any' = 'any'
): SpeechSynthesisVoice | null => {
    const langPrefix = lang.split('-')[0];

    // Map accents to language codes
    const accentMap: Record<string, string[]> = {
        us: ['en-US', 'en_US'],
        uk: ['en-GB', 'en_GB'],
        in: ['en-IN', 'en_IN', 'hi-IN'],
    };

    let filteredVoices = voices.filter(voice => voice.lang.startsWith(langPrefix));

    // Filter by accent if specified
    if (accent !== 'any' && accentMap[accent]) {
        const accentVoices = filteredVoices.filter(voice =>
            accentMap[accent].some(code => voice.lang.includes(code))
        );
        if (accentVoices.length > 0) {
            filteredVoices = accentVoices;
        }
    }

    // Filter by gender if specified (heuristic based on voice names)
    if (gender !== 'any') {
        const femaleNames = [
            'female', 'woman', 'samantha', 'karen', 'victoria', 'zira', 'hazel',
            'fiona', 'moira', 'salli', 'joanna', 'kendra', 'kimberly', 'ivy', 'heather'
        ];
        const maleNames = [
            'male', 'man', 'daniel', 'david', 'mark', 'alex', 'fred', 'oliver',
            'justin', 'matthew', 'joey', 'russell', 'brian'
        ];

        const genderVoices = filteredVoices.filter(voice => {
            const voiceName = voice.name.toLowerCase();
            if (gender === 'female') {
                return femaleNames.some(name => voiceName.includes(name));
            } else {
                return maleNames.some(name => voiceName.includes(name));
            }
        });

        if (genderVoices.length > 0) {
            filteredVoices = genderVoices;
        }
    }

    // Prefer high-quality voices (Google, Microsoft, macOS premium)
    const qualityVoice = filteredVoices.find(voice =>
        voice.name.includes('Google') ||
        voice.name.includes('Microsoft') ||
        voice.name.includes('Samantha') ||
        voice.name.includes('Daniel') ||
        voice.name.includes('Karen')
    );

    return qualityVoice || filteredVoices[0] || null;
};

/**
 * Text-to-Speech: Speak text aloud with improved quality and natural punctuation handling
 */
export const speakText = (text: string, options: SpeakOptions = {}): void => {
    if (!isSpeechSynthesisSupported()) {
        console.warn('Speech synthesis not supported');
        options.onError?.('Speech synthesis not supported in this browser');
        return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Improve text for natural speech - add pauses for punctuation
    let processedText = text
        // Add brief pause after commas
        .replace(/,\s*/g, ', ')
        // Add longer pause after periods
        .replace(/\.\s*/g, '. ')
        // Add pause after line breaks
        .replace(/\n/g, '. ')
        // Handle question marks and exclamations
        .replace(/([!?])\s*/g, '$1 ');

    const utterance = new SpeechSynthesisUtterance(processedText);

    // Set language first (default to Indian English)
    utterance.lang = options.lang || 'en-IN';

    // Function to select and speak with best voice
    const speakWithVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            let selectedVoice: SpeechSynthesisVoice | null = null;
            const requestedLang = options.lang || 'en-IN';
            const gender = options.gender || 'female';

            // 1. Explicit voice selection (if passed)
            if (options.voice) {
                selectedVoice = options.voice;
            }
            // 2. Accent preview: when a specific locale is requested, use only voices for that locale so each accent sounds distinct
            else if (LOCALE_CODES[requestedLang]) {
                selectedVoice = selectVoiceForLocale(voices, requestedLang, gender);
                if (!selectedVoice) {
                    const accentMap: Record<string, 'us' | 'uk' | 'in'> = { 'en-US': 'us', 'en-GB': 'uk', 'en-IN': 'in', 'en-AU': 'us' };
                    selectedVoice = filterVoicesByPreferences(voices, requestedLang, gender, accentMap[requestedLang] || 'any');
                }
            }
            // 3. Default: prefer Indian English (rest of app)
            else {
                const accent = options.accent || 'in';
                const femaleNames = ['neerja', 'female', 'kavya', 'aditi', 'shreya', 'heera', 'lekha'];
                const maleNames = ['rishi', 'male', 'arjun', 'aadish', 'om', 'deepak'];
                const isFemaleVoice = (voice: SpeechSynthesisVoice) => {
                    const name = voice.name.toLowerCase();
                    if (femaleNames.some(n => name.includes(n))) return true;
                    if (maleNames.some(n => name.includes(n))) return false;
                    return !name.includes('male');
                };
                selectedVoice =
                    voices.find(v => v.name.includes('Google') && v.lang.includes('IN') && isFemaleVoice(v)) ||
                    voices.find(v => v.lang.includes('IN') && !v.name.includes('Microsoft') && isFemaleVoice(v)) ||
                    voices.find(v => v.name.includes('Google') && v.lang.includes('IN')) ||
                    filterVoicesByPreferences(voices, utterance.lang, gender, accent) ||
                    voices.find(v => v.lang.includes('IN')) ||
                    null;
            }

            if (selectedVoice) {
                utterance.voice = selectedVoice;
                console.log('🔊 Using voice:', selectedVoice.name, '|', selectedVoice.lang);
            } else {
                console.warn('❌ No suitable voice found for', requestedLang, ', using browser default');
            }
        }

        // Natural speech settings
        utterance.rate = options.rate !== undefined ? options.rate : 0.95; // Slightly slower for clarity
        utterance.pitch = options.pitch !== undefined ? options.pitch : 1.0;
        utterance.volume = options.volume || 1.0;

        // Event handlers
        if (options.onEnd) {
            utterance.onend = options.onEnd;
        }

        if (options.onError) {
            utterance.onerror = (event) => options.onError!(event);
        }

        window.speechSynthesis.speak(utterance);
    };

    // Ensure voices are loaded before selecting
    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', speakWithVoice, { once: true });
    } else {
        speakWithVoice();
    }
};

/**
 * Stop any ongoing speech
 */
export const stopSpeaking = (): void => {
    if (isSpeechSynthesisSupported()) {
        window.speechSynthesis.cancel();
    }
};

/**
 * Check if currently speaking
 */
export const isSpeaking = (): boolean => {
    if (!isSpeechSynthesisSupported()) return false;
    return window.speechSynthesis.speaking;
};

interface RecognitionOptions {
    lang?: string;
    continuous?: boolean;
    interimResults?: boolean;
    onResult?: (transcript: string, isFinal: boolean) => void;
    onError?: (error: any) => void;
    onEnd?: () => void;
}

/**
 * Speech-to-Text: Listen for voice input
 * Returns recognition instance that can be stopped with recognition.stop()
 */
export const startListening = (options: RecognitionOptions = {}): any => {
    if (!isSpeechRecognitionSupported()) {
        console.warn('Speech recognition not supported');
        options.onError?.('Speech recognition not supported in this browser');
        return null;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Set options
    recognition.lang = options.lang || 'en-IN'; // Indian English by default
    recognition.continuous = options.continuous ?? false;
    recognition.interimResults = options.interimResults ?? true;

    // Event handlers
    recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        const isFinal = finalTranscript.length > 0;
        const text = isFinal ? finalTranscript.trim() : interimTranscript;

        if (options.onResult) {
            options.onResult(text, isFinal);
        }
    };

    recognition.onerror = (event: any) => {
        console.error('Speech recognition error details:', event);
        if (options.onError) {
            options.onError(event.error);
        }
    };

    recognition.onend = () => {
        if (options.onEnd) {
            options.onEnd();
        }
    };

    recognition.start();
    return recognition;
};

/**
 * Get available voices (useful for accent selection)
 */
export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
    if (!isSpeechSynthesisSupported()) return [];
    return window.speechSynthesis.getVoices();
};

/**
 * Get voices by language
 */
export const getVoicesByLang = (lang: string): SpeechSynthesisVoice[] => {
    return getAvailableVoices().filter(voice => voice.lang.startsWith(lang));
};

/**
 * Get voice by name
 */
export const getVoiceByName = (name: string): SpeechSynthesisVoice | undefined => {
    return getAvailableVoices().find(voice => voice.name === name);
};
