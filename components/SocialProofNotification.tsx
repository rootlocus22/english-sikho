'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle2, X } from 'lucide-react';

const notifications = [
    { name: 'Priya from Mumbai', action: 'just upgraded to Pro', time: '2 minutes ago' },
    { name: 'Amit from Bangalore', action: 'just started their journey', time: '5 minutes ago' },
    { name: 'Neha from Delhi', action: 'just completed their first session', time: '8 minutes ago' },
    { name: 'Rahul from Pune', action: 'just upgraded to Pro', time: '12 minutes ago' },
    { name: 'Sneha from Hyderabad', action: 'just started their journey', time: '15 minutes ago' },
    { name: 'Vikram from Chennai', action: 'just upgraded to Pro', time: '18 minutes ago' },
];

export default function SocialProofNotification() {
    const [currentNotification, setCurrentNotification] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            setCurrentNotification((prev) => (prev + 1) % notifications.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isVisible, notifications.length]);

    if (!isVisible) return null;

    const notification = notifications[currentNotification];

    return (
        <Card className="fixed bottom-4 right-4 z-50 w-80 md:w-96 bg-white border-2 border-green-200 shadow-2xl animate-in slide-in-from-bottom-5">
            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-xs font-semibold text-green-600 uppercase">Live Activity</span>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">{notification.name}</span>{' '}
                    {notification.action}
                </p>
                <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
            </div>
        </Card>
    );
}

