'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Target, Zap, Trophy, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useUserStore } from '@/lib/store';
import { HelpTooltip, HELP_CONTENT } from '@/components/ContextualHelp';

const dailyGoals = [
    { id: 'speaking', label: 'Speaking Practice', target: 15, unit: 'minutes', icon: '🎤' },
    { id: 'vocabulary', label: 'Learn New Words', target: 5, unit: 'words', icon: '📚' },
    { id: 'grammar', label: 'Grammar Lesson', target: 1, unit: 'lesson', icon: '📝' },
    { id: 'email', label: 'Email Practice', target: 2, unit: 'emails', icon: '✉️' },
];

export default function DailyGoals() {
    const { userId, userData } = useUserStore();
    const [goals, setGoals] = useState(dailyGoals.map(g => ({ ...g, completed: 0 })));
    const [streak, setStreak] = useState(userData?.currentStreak || 0);

    useEffect(() => {
        // Load today's progress from localStorage
        const today = new Date().toISOString().split('T')[0];
        const saved = localStorage.getItem(`daily-goals-${userId}-${today}`);
        if (saved) {
            const progress = JSON.parse(saved);
            setGoals(prev => prev.map(g => ({
                ...g,
                completed: progress[g.id] || 0
            })));
        }
    }, [userId]);

    const handleComplete = (goalId: string) => {
        setGoals(prev => prev.map(g => {
            if (g.id === goalId) {
                const newCompleted = Math.min(g.completed + 1, g.target);
                // Save to localStorage
                const today = new Date().toISOString().split('T')[0];
                const saved = localStorage.getItem(`daily-goals-${userId}-${today}`);
                const progress = saved ? JSON.parse(saved) : {};
                progress[goalId] = newCompleted;
                localStorage.setItem(`daily-goals-${userId}-${today}`, JSON.stringify(progress));
                return { ...g, completed: newCompleted };
            }
            return g;
        }));
    };

    const totalProgress = goals.reduce((sum, g) => sum + (g.completed / g.target), 0) / goals.length * 100;
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
                            <p className="text-sm text-muted-foreground">Complete your daily practice targets</p>
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
                {/* Overall Progress */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Today's Progress</span>
                        <span className="text-sm font-bold">{Math.round(totalProgress)}%</span>
                    </div>
                    <Progress value={totalProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                        {completedGoals} of {goals.length} goals completed
                    </p>
                </div>

                {/* Individual Goals */}
                <div className="space-y-3">
                    {goals.map(goal => {
                        const progress = (goal.completed / goal.target) * 100;
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
                                <Progress value={progress} className="h-1.5 mb-2" />
                                {!isComplete && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleComplete(goal.id)}
                                        className="w-full text-xs"
                                    >
                                        Mark as Complete
                                    </Button>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Motivation */}
                {completedGoals === goals.length && (
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg text-center">
                        <Trophy className="w-8 h-8 mx-auto mb-2" />
                        <p className="font-bold">🎉 All Goals Completed!</p>
                        <p className="text-sm text-white/90">Great job! Keep the streak going!</p>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Quick Actions:</p>
                    <div className="grid grid-cols-2 gap-2">
                        <Button size="sm" variant="outline" className="text-xs">
                            Practice Speaking
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                            Learn Words
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

