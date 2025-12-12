'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Download, Share2, Lock, Trophy, Crown } from 'lucide-react';
import { MILESTONES, checkMilestones, getTierColor, getTierBadgeColor } from '@/lib/milestones';
import { getBasicStats } from '@/lib/analytics-data';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

export default function CertificatesPage() {
    const { userId, userData } = useUserStore();
    const router = useRouter();
    const [achievements, setAchievements] = useState<{ achieved: string[]; progress: Record<string, number> }>({ achieved: [], progress: {} });

    useEffect(() => {
        if (!userData) return;

        // Get basic stats and check milestones
        const stats = getBasicStats(userData);
        const milestoneData = checkMilestones({
            totalSessionsUsed: stats.totalSessions,
            currentStreak: 0, // TODO: Calculate from activity
            averageScore: 85 // TODO: Calculate from scores
        });

        setAchievements(milestoneData);
    }, [userData]);

    // Check Pro access
    if (!userData?.isPremium) {
        return (
            <div className="max-w-3xl mx-auto py-12 px-4 text-center">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-12 border-2 border-amber-200">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6">
                        <Award className="w-10 h-10 text-amber-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Certificates are Pro Only</h1>
                    <p className="text-slate-600 mb-8 text-lg">
                        Earn beautiful certificates for your achievements. Showcase your progress on LinkedIn and impress employers!
                    </p>
                    <Button
                        size="lg"
                        onClick={() => router.push('/dashboard/upgrade')}
                        className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                    >
                        Upgrade to Pro 🚀
                    </Button>
                </div>
            </div>
        );
    }

    const handleDownloadCertificate = (milestoneId: string) => {
        const milestone = MILESTONES[milestoneId];
        if (!milestone) return;

        try {
            // Create PDF
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            // Set background
            pdf.setFillColor(255, 255, 255);
            pdf.rect(0, 0, 297, 210, 'F');

            // Add border
            pdf.setDrawColor(59, 130, 246); // Blue
            pdf.setLineWidth(2);
            pdf.rect(10, 10, 277, 190);

            // Title
            pdf.setFontSize(32);
            pdf.setTextColor(30, 41, 59); //  Slate-800
            pdf.text('CERTIFICATE OF ACHIEVEMENT', 148.5, 40, { align: 'center' });

            // Subtitle
            pdf.setFontSize(16);
            pdf.setTextColor(100, 116, 139); // Slate-500
            pdf.text('EnglishGyani', 148.5, 55, { align: 'center' });

            // User name
            pdf.setFontSize(12);
            pdf.text('This is to certify that', 148.5, 75, { align: 'center' });

            pdf.setFontSize(28);
            pdf.setTextColor(59, 130, 246); // Blue-600
            pdf.text(userData?.displayName || 'English Learner', 148.5, 95, { align: 'center' });

            // Achievement
            pdf.setFontSize(12);
            pdf.setTextColor(100, 116, 139);
            pdf.text('has successfully achieved', 148.5, 110, { align: 'center' });

            pdf.setFontSize(24);
            pdf.setTextColor(30, 41, 59);
            pdf.text(`${milestone.icon} ${milestone.name}`, 148.5, 130, { align: 'center' });

            pdf.setFontSize(12);
            pdf.setTextColor(100, 116, 139);
            pdf.text(milestone.description, 148.5, 142, { align: 'center' });

            // Date and ID
            const date = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            pdf.setFontSize(10);
            pdf.text(`Date: ${date}`, 148.5, 165, { align: 'center' });
            pdf.text(`Certificate ID: EG-${milestoneId.toUpperCase()}-${userId?.slice(0, 8)}`, 148.5, 173, { align: 'center' });

            // Signature line
            pdf.setLineWidth(0.5);
            pdf.line(120, 185, 177, 185);
            pdf.setFontSize(9);
            pdf.text('EnglishGyani Team', 148.5, 192, { align: 'center' });

            // Save PDF
            pdf.save(`EnglishGyani_${milestone.name.replace(/\s+/g, '_')}_Certificate.pdf`);
            toast.success('Certificate downloaded!');
        } catch (error) {
            console.error('Error generating certificate:', error);
            toast.error('Failed to generate certificate');
        }
    };

    const handleShare = async (milestoneId: string) => {
        const milestone = MILESTONES[milestoneId];
        const text = `🎉 I just earned the "${milestone.name}" certificate on EnglishGyani! ${milestone.description} 🏆`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'EnglishGyani Achievement',
                    text: text,
                    url: 'https://englishgyani.com'
                });
            } catch (error) {
                // User cancelled or error
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(text);
            toast.success('Achievement text copied to clipboard!');
        }
    };

    const achievedCount = achievements.achieved.length;
    const totalCount = Object.keys(MILESTONES).length;

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
                        <Trophy className="w-10 h-10 text-amber-600" />
                        Certificates & Achievements
                    </h1>
                    <p className="text-slate-600 mt-2">Your learning milestones and accomplishments</p>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-bold text-amber-600">{achievedCount}/{totalCount}</p>
                    <p className="text-sm text-slate-600">Achievements Unlocked</p>
                </div>
            </div>

            {/* Progress Bar */}
            <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-amber-900">Overall Progress</span>
                        <span className="text-sm font-bold text-amber-700">
                            {Math.round((achievedCount / totalCount) * 100)}%
                        </span>
                    </div>
                    <Progress value={(achievedCount / totalCount) * 100} className="h-3" />
                </CardContent>
            </Card>

            {/* Achievements Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {Object.values(MILESTONES).map((milestone) => {
                    const isAchieved = achievements.achieved.includes(milestone.id);
                    const progress = achievements.progress[milestone.id] || 0;

                    return (
                        <Card
                            key={milestone.id}
                            className={`relative overflow-hidden transition-all ${isAchieved
                                    ? 'border-2 shadow-lg'
                                    : 'border border-slate-200 opacity-75'
                                }`}
                            style={isAchieved ? {
                                borderImage: `linear-gradient(135deg, var(--tw-gradient-stops)) 1`,
                                borderImageSlice: 1
                            } : {}}
                        >
                            {isAchieved && (
                                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${getTierColor(milestone.tier)} opacity-10 rounded-bl-full`}></div>
                            )}

                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`text-5xl ${isAchieved ? 'grayscale-0' : 'grayscale'}`}>
                                            {milestone.icon}
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl flex items-center gap-2">
                                                {milestone.name}
                                                {!isAchieved && <Lock className="w-4 h-4 text-slate-400" />}
                                            </CardTitle>
                                            <Badge className={`mt-1 ${getTierBadgeColor(milestone.tier)} border`}>
                                                {milestone.tier.toUpperCase()}
                                            </Badge>
                                        </div>
                                    </div>
                                    {isAchieved && (
                                        <Crown className="w-6 h-6 text-amber-500" />
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <CardDescription className="text-sm">
                                    {milestone.description}
                                </CardDescription>

                                {!isAchieved && (
                                    <div>
                                        <div className="flex justify-between text-xs text-slate-600 mb-1">
                                            <span>Progress</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <Progress value={progress} className="h-2" />
                                    </div>
                                )}

                                {isAchieved && (
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => handleDownloadCertificate(milestone.id)}
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download PDF
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleShare(milestone.id)}
                                        >
                                            <Share2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Motivational Message */}
            {achievedCount < totalCount && (
                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="py-6 text-center">
                        <p className="text-blue-900 font-medium">
                            🎯 Keep practicing to unlock more achievements! You're {totalCount - achievedCount} milestone{totalCount - achievedCount !== 1 ? 's' : ''} away from completing your collection.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
