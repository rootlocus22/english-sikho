'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
    TrendingUp, BarChart3, Award, Zap, Target, Calendar,
    Activity, Crown, Sparkles
} from 'lucide-react';
import { fetchAnalyticsAction } from '@/app/actions/analytics';
import { getBasicStats, type AnalyticsData } from '@/lib/analytics-data';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

export default function AnalyticsPage() {
    const { userId, userData, hasFeature } = useUserStore();
    const router = useRouter();
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                // Use Server Action to bypass client-side permission issues
                const data = await fetchAnalyticsAction(userId);
                setAnalytics(data);
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [userId]);

    // Check Pro access
    if (!hasFeature('analytics')) {
        return (
            <div className="max-w-3xl mx-auto py-12 px-4 text-center">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-12 border-2 border-indigo-200">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
                        <BarChart3 className="w-10 h-10 text-indigo-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Progress Analytics is Pro Only</h1>
                    <p className="text-slate-600 mb-8 text-lg">
                        Track your improvement over time with detailed charts, trends, and insights. See how far you've come!
                    </p>
                    <Button
                        size="lg"
                        onClick={() => router.push('/dashboard/upgrade')}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                        Upgrade to Pro 🚀
                    </Button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto py-8 px-4 space-y-6">
                <Skeleton className="h-12 w-64" />
                <div className="grid md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="h-32" />
                    ))}
                </div>
                <Skeleton className="h-96" />
            </div>
        );
    }

    const basicStats = getBasicStats(userData);

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
                        <BarChart3 className="w-10 h-10 text-indigo-600" />
                        Progress Analytics
                    </h1>
                    <p className="text-slate-600 mt-2">Track your English learning journey</p>
                </div>
                <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 text-sm">
                    <Crown className="w-4 h-4 mr-2" />
                    Pro Member
                </Badge>
            </div>

            {/* Stats Overview Cards */}
            <div className="grid md:grid-cols-4 gap-6">
                <Card className="border-2 border-blue-200 bg-blue-50/50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-blue-900">Total Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-3xl font-bold text-blue-600">
                                {analytics?.totalSessions || basicStats.totalSessions}
                            </div>
                            <Activity className="w-8 h-8 text-blue-400" />
                        </div>
                        <p className="text-xs text-blue-700 mt-2">All-time practice count</p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-orange-200 bg-orange-50/50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-orange-900">Current Streak</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-3xl font-bold text-orange-600">
                                {analytics?.currentStreak || 0}
                            </div>
                            <Zap className="w-8 h-8 text-orange-400" />
                        </div>
                        <p className="text-xs text-orange-700 mt-2">Consecutive days</p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-green-200 bg-green-50/50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-green-900">Avg Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-3xl font-bold text-green-600">
                                {analytics?.averageScore || '--'}%
                            </div>
                            <Target className="w-8 h-8 text-green-400" />
                        </div>
                        <p className="text-xs text-green-700 mt-2">Speaking coach average</p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 bg-purple-50/50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-purple-900">Most Used</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-purple-600 truncate">
                                {analytics?.mostUsedFeature || 'None'}
                            </div>
                            <Award className="w-8 h-8 text-purple-400" />
                        </div>
                        <p className="text-xs text-purple-700 mt-2">Your favorite tool</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            {analytics && analytics.totalSessions > 0 ? (
                <>
                    {/* Sessions Over Time */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                Activity Trend (Last 7 Days)
                            </CardTitle>
                            <CardDescription>Your daily practice sessions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={analytics.sessionsOverTime}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="sessions"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        dot={{ fill: '#3b82f6', r: 5 }}
                                        name="Sessions"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Feature Distribution */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Feature Usage</CardTitle>
                                <CardDescription>Sessions by feature type</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={analytics.sessionsByFeature}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#8b5cf6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Feature Distribution</CardTitle>
                                <CardDescription>Breakdown by percentage</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={analytics.sessionsByFeature}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="count"
                                        >
                                            {analytics.sessionsByFeature.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Insights */}
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-blue-900 flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                AI Insights
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {analytics.currentStreak >= 7 && (
                                <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                                    <span className="text-2xl">🔥</span>
                                    <div>
                                        <p className="font-semibold text-blue-900">Amazing Consistency!</p>
                                        <p className="text-sm text-blue-700">
                                            You've practiced for {analytics.currentStreak} days straight. Keep the momentum going!
                                        </p>
                                    </div>
                                </div>
                            )}
                            {analytics.totalSessions >= 50 && (
                                <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                                    <span className="text-2xl">🎯</span>
                                    <div>
                                        <p className="font-semibold text-blue-900">Practice Champion</p>
                                        <p className="text-sm text-blue-700">
                                            You've completed {analytics.totalSessions} sessions. You're on your way to fluency!
                                        </p>
                                    </div>
                                </div>
                            )}
                            {analytics.mostUsedFeature && (
                                <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                                    <span className="text-2xl">⭐</span>
                                    <div>
                                        <p className="font-semibold text-blue-900">Favorite Feature</p>
                                        <p className="text-sm text-blue-700">
                                            You love using {analytics.mostUsedFeature}! Consider exploring other features to practice different skills.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </>
            ) : (
                <Card className="bg-slate-50">
                    <CardContent className="py-16 text-center">
                        <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-700 mb-2">No Activity Yet</h3>
                        <p className="text-slate-500 mb-6">
                            Start practicing to see your analytics!
                        </p>
                        <Button onClick={() => router.push('/dashboard')}>
                            Start Practicing
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
