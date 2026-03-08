'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Target, Zap, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useUserStore } from '@/lib/store';
import { HelpTooltip, HELP_CONTENT } from '@/components/ContextualHelp';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

interface GoalProgress {
    speaking: number;
    vocabulary: number;
    grammar: number;
    email: number;
}

const dailyGoals = [
    { id: 'speaking' as const, label: 'Speaking Practice', target: 3, unit: 'sessions', icon: '🎤', href: '/dashboard/coach' },
    { id: 'vocabulary' as const, label: 'Learn New Words', target: 5, unit: 'words', icon: '📚', href: '/dashboard/vocabulary' },
    { id: 'grammar' as const, label: 'Grammar Lesson', target: 1, unit: 'lesson', icon: '📝', href: '/dashboard/grammar-basics' },
    { id: 'email' as const, label: 'Email Practice', target: 2, unit: 'sessions', icon: '✉️', href: '/dashboard/tone' },
];

export default function DailyGoals() {
    const { userId, userData } = useUserStore();
    const [progress, setProgress] = useState<GoalProgress>({ speaking: 0, vocabulary: 0, grammar: 0, email: 0 });
    const [loading, setLoading] = useState(true);
    const streak = userData?.currentStreak || 0;

    useEffect(() => {
        if (!userId) return;

        async function fetchTodayActivity() {
            try {
                const today = new Date().toISOString().split('T')[0];
                const activityRef = collection(db, 'users', userId!, 'activity');
                const q = query(
                    activityRef,
                    where('date', '==', today),
                    orderBy('timestamp', 'desc'),
                    limit(50)
                );

                const snapshot = await getDocs(q);
                const counts: GoalProgress = { speaking: 0, vocabulary: 0, grammar: 0, email: 0 };

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const feature = data.feature;

                    if (feature === 'speaking-coach' || feature === 'coach') {
                        counts.speaking++;
                    } else if (feature === 'tone-rewrite' || feature === 'image-analysis') {
                        counts.email++;
                    }
                });

                // Vocab and grammar from progress (localStorage + Firestore)
                const vocabLearned = JSON.parse(localStorage.getItem(`vocab-learned-${userId}`) || '[]');
                counts.vocabulary = Math.min(vocabLearned.length, 5);

                const grammarCompleted = JSON.parse(localStorage.getItem(`grammar-progress-${userId}`) || '[]');
                counts.grammar = grammarCompleted.length > 0 ? 1 : 0;

                setProgress(counts);
            } catch (error) {
                console.error('Failed to fetch activity for daily goals:', error);
                const saved = localStorage.getItem(`daily-goals-${userId}-${new Date().toISOString().split('T')[0]}`);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    setProgress({
                        speaking: parsed.speaking || 0,
                        vocabulary: parsed.vocabulary || 0,
                        grammar: parsed.grammar || 0,
                        email: parsed.email || 0,
                    });
                }
            } finally {
                setLoading(false);
            }
        }

        fetchTodayActivity();
    }, [userId]);

    const goals = dailyGoals.map(g => ({
        ...g,
        completed: progress[g.id],
    }));

    const totalProgress = goals.reduce((sum, g) => sum + Math.min(g.completed / g.target, 1), 0) / goals.length * 100;
    const completedGoals = goals.filter(g => g.completed >= g.target).length;

    return (
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <Target className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <CardTitle>Daily Goals</CardTitle>
                                <HelpTooltip 
                                    title={HELP_CONTENT.dailyGoals.title}
                                    content={HELP_CONTENT.dailyGoals.content}
                                />
                            </div>
                            <p className="text-sm text-muted-foreground">Auto-tracked from your real practice</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-1 text-orange-600">
                            <Zap className="w-4 h-4" />
                            <span className="text-2xl font-bold">{streak}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Day Streak</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Today&apos;s Progress</span>
                        <span className="text-sm font-bold">{Math.round(totalProgress)}%</span>
                    </div>
                    <Progress value={totalProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                        {completedGoals} of {goals.length} goals completed
                    </p>
                </div>

                <div className="space-y-3">
                    {goals.map(goal => {
                        const goalProgress = Math.min((goal.completed / goal.target) * 100, 100);
                        const isComplete = goal.completed >= goal.target;

                        return (
                            <div
                                key={goal.id}
                                className={`p-3 rounded-lg border-2 transition-all ${
                                    isComplete
                                        ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">{goal.icon}</span>
                                        <span className="font-medium text-sm">{goal.label}</span>
                                        {isComplete && (
                                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                                        )}
                                    </div>
                                    <Badge variant={isComplete ? 'default' : 'outline'}>
                                        {goal.completed} / {goal.target} {goal.unit}
                                    </Badge>
                                </div>
                                <Progress value={goalProgress} className="h-1.5 mb-2" />
                                {!isComplete && (
                                    <Link href={goal.href}>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="w-full text-xs"
                                        >
                                            Start Practicing
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>

                {completedGoals === goals.length && (
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg text-center">
                        <Trophy className="w-8 h-8 mx-auto mb-2" />
                        <p className="font-bold">All Goals Completed!</p>
                        <p className="text-sm text-white/90">Great job! Keep the streak going!</p>
                    </div>
                )}

                <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Quick Actions:</p>
                    <div className="grid grid-cols-2 gap-2">
                        <Link href="/dashboard/coach">
                            <Button size="sm" variant="outline" className="text-xs w-full">
                                Practice Speaking
                            </Button>
                        </Link>
                        <Link href="/dashboard/vocabulary">
                            <Button size="sm" variant="outline" className="text-xs w-full">
                                Learn Words
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
