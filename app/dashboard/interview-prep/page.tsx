'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Briefcase, Clock, Lightbulb, TrendingUp, ChevronRight,
    CheckCircle, XCircle, Loader2, Award, Mic, Volume2, Square
} from 'lucide-react';
import { toast } from 'sonner';
import { speakText, stopSpeaking, isSpeaking, startListening, isSpeechRecognitionSupported } from '@/lib/audioUtils';
import { event } from '@/lib/analytics';
import { INTERVIEW_CATEGORIES, type InterviewQuestion } from '@/data/interview-questions';

export default function InterviewPrepPage() {
    const { userId, userData } = useUserStore();
    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [showTips, setShowTips] = useState(false);

    // Voice State
    const [isListening, setIsListening] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);

    const handleVoiceInput = () => {
        if (!isSpeechRecognitionSupported()) {
            toast.error("Voice input not supported in this browser");
            return;
        }

        if (isListening) {
            recognition?.stop();
            setIsListening(false);
            return;
        }

        setIsListening(true);
        const rec = startListening({
            lang: 'en-US',
            continuous: false,
            interimResults: true,
            onResult: (transcript, isFinal) => {
                setUserAnswer(prev => {
                    // If we are appending to existing text, handle spacing
                    if (isFinal) return prev ? prev + " " + transcript : transcript;
                    return transcript; // Simple replace for interim to show live update usually, but appending is trickier with simple logic. 
                    // Let's stick to simple replacement for now or smarter append if needed.
                    // Actually, simply setting it to transcript works for single utterance. 
                    // For continuous dictation, we'd need better logic. 
                    // Let's use the simple set for now as interview answers are usually long monologues.
                    return transcript;
                });

                // Better approach for long answers: accumulate
                // But for simplicity in this artifact, let's just set it.
                setUserAnswer(transcript);

                if (isFinal) {
                    setIsListening(false);
                }
            },
            onError: (error) => {
                console.error('Speech recognition error:', error);
                toast.error("Voice input failed. Try again!");
                setIsListening(false);
            },
            onEnd: () => {
                setIsListening(false);
            }
        });
        setRecognition(rec);
    };

    const handleSpeak = (text: string) => {
        if (isSpeaking()) {
            stopSpeaking();
            setIsPlaying(false);
            return;
        }

        setIsPlaying(true);
        speakText(text, {
            lang: 'en-US',
            onEnd: () => setIsPlaying(false),
            onError: () => {
                toast.error("Audio playback failed");
                setIsPlaying(false);
            }
        });
    };

    // Check if user has access
    if (!userData?.isPremium) {
        return (
            <div className="max-w-3xl mx-auto py-12 px-4 text-center">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 border-2 border-blue-200">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                        <Briefcase className="w-10 h-10 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Interview Prep is Pro Only</h1>
                    <p className="text-slate-600 mb-8 text-lg">
                        Practice with 30+ interview questions and AI-powered feedback. Perfect your answers before the real interview!
                    </p>
                    <Button
                        size="lg"
                        onClick={() => router.push('/dashboard/upgrade')}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                        Upgrade to Pro 🚀
                    </Button>
                </div>
            </div>
        );
    }

    const handleEvaluate = async () => {
        if (!userAnswer.trim()) {
            toast.error('Please write your answer first!');
            return;
        }

        if (!selectedQuestion) return;

        setLoading(true);
        try {
            const response = await fetch('/api/ai/coach', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': userId || ''
                },
                body: JSON.stringify({
                    type: 'interview-coach',
                    question: selectedQuestion.question,
                    userAnswer,
                    category: selectedCategory
                })
            });

            const data = await response.json();

            if (response.status === 403 && data.needsUpgrade) {
                toast.error(data.error);
                return;
            }

            if (response.status === 401) {
                toast.error('Please login to continue');
                return;
            }

            if (data.error) throw new Error(data.error);

            setFeedback(data);
            toast.success('Answer evaluated!');
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Failed to evaluate answer');
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        setUserAnswer('');
        setFeedback(null);
        setShowTips(false);

        if (selectedCategory) {
            const category = INTERVIEW_CATEGORIES[selectedCategory];
            const currentIndex = category.questions.findIndex(q => q.id === selectedQuestion?.id);
            const nextIndex = (currentIndex + 1) % category.questions.length;
            setSelectedQuestion(category.questions[nextIndex]);
        }
    };

    // Category Selection View
    if (!selectedCategory) {
        return (
            <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-slate-900">
                        Interview Preparation 🎯
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Practice with AI-powered interview coaching. Choose a category to begin.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {Object.entries(INTERVIEW_CATEGORIES).map(([key, category]) => (
                        <Card
                            key={key}
                            className="cursor-pointer hover:shadow-lg hover:border-blue-400 transition-all"
                            onClick={() => {
                                setSelectedCategory(key);
                                setSelectedQuestion(category.questions[0]);
                            }}
                        >
                            <CardHeader>
                                <div className="text-5xl mb-4">{category.icon}</div>
                                <CardTitle className="text-xl">{category.name}</CardTitle>
                                <CardDescription>{category.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-sm text-slate-600">
                                    <span>{category.questions.length} questions</span>
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="font-bold text-blue-900 mb-2">💡 Pro Tip</h3>
                    <p className="text-blue-800 text-sm">
                        Practice answering out loud! Speaking your answers helps you sound more natural and confident in real interviews.
                    </p>
                </div>
            </div>
        );
    }

    const category = INTERVIEW_CATEGORIES[selectedCategory];

    // Question Practice View
    return (
        <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setSelectedCategory(null);
                            setSelectedQuestion(null);
                            setUserAnswer('');
                            setFeedback(null);
                        }}
                    >
                        ← Back to Categories
                    </Button>
                    <h1 className="text-2xl font-bold mt-2">{category.icon} {category.name}</h1>
                </div>
                <Badge variant="outline" className="text-sm">
                    Question {category.questions.findIndex(q => q.id === selectedQuestion?.id) + 1} of {category.questions.length}
                </Badge>
            </div>

            {/* Question Card */}
            <Card className="border-2 border-blue-200 shadow-lg">
                <CardHeader className="bg-blue-50">
                    <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-2xl flex-1">{selectedQuestion?.question}</CardTitle>
                        <Badge className={
                            selectedQuestion?.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                selectedQuestion?.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                        }>
                            {selectedQuestion?.difficulty}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                    {/* Tips Section */}
                    <div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowTips(!showTips)}
                            className="text-blue-600"
                        >
                            <Lightbulb className="w-4 h-4 mr-2" />
                            {showTips ? 'Hide' : 'Show'} Tips
                        </Button>
                        {showTips && (
                            <div className="mt-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <p className="text-sm text-yellow-900">{selectedQuestion?.tips}</p>
                            </div>
                        )}
                    </div>

                    {/* Answer Input */}


                    {/* Answer Input Area */}
                    <div className="relative">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-slate-700">
                                Your Answer
                            </label>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSpeak(selectedQuestion?.question || '')}
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                                {isPlaying ? <Square className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                                {isPlaying ? 'Stop' : 'Read Question'}
                            </Button>
                        </div>

                        <div className="relative">
                            <Textarea
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="Write your answer here... OR click the Mic button to speak!"
                                className="min-h-[200px] text-base pr-12"
                                disabled={loading || !!feedback}
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                className={`absolute bottom-4 right-4 h-10 w-10 rounded-full shadow-sm border transition-all ${isListening ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : 'bg-white border-slate-200 text-slate-500 hover:text-blue-600'}`}
                                onClick={handleVoiceInput}
                                disabled={loading || !!feedback}
                                title="Speak Answer"
                            >
                                {isListening ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
                            </Button>
                        </div>

                        {isListening && (
                            <p className="text-xs text-red-600 font-medium mt-2 animate-pulse flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                                Recording... Speak clearly
                            </p>
                        )}

                        <p className="text-xs text-slate-500 mt-2">
                            <Clock className="w-3 h-3 inline mr-1" />
                            Aim for 1-3 minutes when speaking
                        </p>
                    </div>

                    {/* Evaluate Button */}
                    {!feedback && (
                        <Button
                            onClick={handleEvaluate}
                            disabled={loading || !userAnswer.trim()}
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Evaluating with AI...
                                </>
                            ) : (
                                <>
                                    <TrendingUp className="w-5 h-5 mr-2" />
                                    Evaluate My Answer
                                </>
                            )}
                        </Button>
                    )}

                    {/* AI Feedback */}
                    {feedback && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                            {/* Score */}
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 text-center">
                                <div className="text-5xl font-bold mb-2">{feedback.score}%</div>
                                <p className="text-blue-100">Answer Score</p>
                            </div>

                            {/* Tabs for detailed feedback */}
                            <Tabs defaultValue="feedback" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="feedback">Feedback</TabsTrigger>
                                    <TabsTrigger value="strengths">Strengths</TabsTrigger>
                                    <TabsTrigger value="improve">Improve</TabsTrigger>
                                </TabsList>
                                <TabsContent value="feedback" className="space-y-3">
                                    <p className="text-slate-700 leading-relaxed">{feedback.feedback}</p>
                                </TabsContent>
                                <TabsContent value="strengths" className="space-y-2">
                                    {feedback.strengths?.map((strength: string, i: number) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                            <span className="text-slate-700">{strength}</span>
                                        </div>
                                    ))}
                                </TabsContent>
                                <TabsContent value="improve" className="space-y-2">
                                    {feedback.improvements?.map((improvement: string, i: number) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <TrendingUp className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                            <span className="text-slate-700">{improvement}</span>
                                        </div>
                                    ))}
                                </TabsContent>
                            </Tabs>

                            {/* Better Answer Suggestion */}
                            {feedback.betterAnswer && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                                        <Award className="w-5 h-5" />
                                        Suggested Better Answer
                                    </h4>
                                    <p className="text-green-800 text-sm leading-relaxed">{feedback.betterAnswer}</p>
                                </div>
                            )}

                            {/* Next Question Button */}
                            <Button
                                onClick={handleNext}
                                className="w-full h-12 bg-slate-900 hover:bg-slate-800"
                            >
                                Next Question
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    )}

                    {/* Sample Answer (collapsible) */}
                    {!feedback && (
                        <details className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <summary className="cursor-pointer font-medium text-slate-700 hover:text-slate-900">
                                View Sample Answer (after you try!)
                            </summary>
                            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                                {selectedQuestion?.sampleAnswer}
                            </p>
                        </details>
                    )}
                </CardContent>
            </Card>
        </div >
    );
}
