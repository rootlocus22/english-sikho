'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from '@/lib/store';
import { getUserData } from '@/lib/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CreditCard, BarChart, MapPin, Loader2, Crown } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const { userId, userData } = useUserStore();
    const [fullUserData, setFullUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFullProfile() {
            if (!userId) return;
            try {
                const data = await getUserData(userId);
                setFullUserData(data);
            } catch (error) {
                console.error("Error loading profile:", error);
            } finally {
                setLoading(false);
            }
        }
        loadFullProfile();
    }, [userId]);

    const getRenewalDate = () => {
        if (!fullUserData?.subscription?.renewalDate) return null;
        try {
            // Handle string or Firestore Timestamp
            const renewalDate = fullUserData.subscription.renewalDate;
            if (typeof renewalDate === 'string') {
                return new Date(renewalDate);
            }
            if (renewalDate.toDate) {
                return renewalDate.toDate();
            }
            return null;
        } catch {
            return null;
        }
    };

    const formatDate = (date: Date | null) => {
        if (!date) return 'N/A';
        return new Intl.DateTimeFormat('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    const getCreatedDate = () => {
        if (!fullUserData?.createdAt) return null;
        try {
            const created = fullUserData.createdAt;
            if (typeof created === 'string') return new Date(created);
            if (created.toDate) return created.toDate();
            return null;
        } catch {
            return null;
        }
    };

    const creditsUsed = fullUserData?.totalSessionsUsed || 0;
    const creditsRemaining = userData?.credits || 0;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="-mx-4 -mt-4 border-b border-slate-200 bg-white px-4 py-6 md:px-6 md:py-8">
                <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">My Profile</h1>
                <p className="text-sm text-slate-600 md:text-base">Manage your account and subscription</p>
            </div>

            {/* User Info Card */}
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={userData?.photoURL || ''} />
                        <AvatarFallback className="bg-blue-600 text-white text-2xl">
                            {userData?.displayName?.[0] || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-slate-900">{userData?.displayName || 'User'}</h2>
                        <p className="text-slate-600">{userData?.email}</p>
                        <p className="text-sm text-slate-500 mt-2">
                            Member since {getCreatedDate() ? formatDate(getCreatedDate()) : 'Recently'}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Plan Details Card */}
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            <Crown className="w-5 h-5 text-amber-500" />
                            Subscription Plan
                        </span>
                        {userData?.isPremium ? (
                            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                {fullUserData?.subscription?.tier === 'starter' ? 'Starter' : 'Pro'}
                            </Badge>
                        ) : (
                            <Badge variant="outline">Free</Badge>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Credits Display */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                            <CreditCard className="w-8 h-8 text-blue-600" />
                            <div>
                                <p className="text-sm text-slate-600">Credits Remaining</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {userData?.isPremium ? '∞' : creditsRemaining}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                            <BarChart className="w-8 h-8 text-green-600" />
                            <div>
                                <p className="text-sm text-slate-600">Total Used</p>
                                <p className="text-2xl font-bold text-green-600">{creditsUsed}</p>
                            </div>
                        </div>
                    </div>

                    {/* Renewal Info for Premium */}
                    {userData?.isPremium && getRenewalDate() && (
                        <div className="flex items-start gap-3 p-4 border border-orange-200 bg-orange-50 rounded-lg">
                            <Calendar className="w-5 h-5 text-orange-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-orange-900">Next Renewal</p>
                                <p className="text-orange-700">{formatDate(getRenewalDate())}</p>
                                {fullUserData?.subscription?.amount && (
                                    <p className="text-sm text-orange-600 mt-1">
                                        Amount: ₹{fullUserData.subscription.amount} ({fullUserData.subscription.plan || 'monthly'})
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Upgrade CTA for Free Users */}
                    {!userData?.isPremium && (
                        <div className="pt-4 border-t">
                            <p className="text-sm text-slate-600 mb-3">
                                Unlock unlimited sessions and premium features
                            </p>
                            <Link href="/dashboard/upgrade">
                                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                                    Upgrade to Pro 🚀
                                </Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Acquisition Source Card (if available) */}
            {fullUserData?.acquisitionSource && (
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            How You Found Us
                        </CardTitle>
                        <CardDescription>Your journey to EnglishGyani</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            {fullUserData.acquisitionSource.utm_source && (
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">Source</p>
                                    <p className="font-semibold text-slate-900 capitalize mt-1">
                                        {fullUserData.acquisitionSource.utm_source}
                                    </p>
                                </div>
                            )}
                            {fullUserData.acquisitionSource.utm_medium && (
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">Medium</p>
                                    <p className="font-semibold text-slate-900 capitalize mt-1">
                                        {fullUserData.acquisitionSource.utm_medium}
                                    </p>
                                </div>
                            )}
                            {fullUserData.acquisitionSource.utm_campaign && (
                                <div className="p-3 bg-slate-50 rounded-lg col-span-2">
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">Campaign</p>
                                    <p className="font-semibold text-slate-900 mt-1">
                                        {fullUserData.acquisitionSource.utm_campaign}
                                    </p>
                                </div>
                            )}
                            {fullUserData.acquisitionSource.referrer && (
                                <div className="p-3 bg-slate-50 rounded-lg col-span-2">
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">Referrer</p>
                                    <p className="text-sm text-slate-700 mt-1 truncate">
                                        {fullUserData.acquisitionSource.referrer}
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
