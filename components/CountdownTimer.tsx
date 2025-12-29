'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 59,
        seconds: 59
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else {
                    // Reset to 24 hours when timer reaches 0
                    return { hours: 23, minutes: 59, seconds: 59 };
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Card className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-none p-3 md:p-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <span className="text-xs sm:text-sm font-semibold text-center sm:text-left">⚡ Limited Time Offer Ends In:</span>
                <div className="flex items-center gap-1 sm:gap-2">
                    <div className="bg-white/20 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 min-w-[45px] sm:min-w-[50px] text-center">
                        <div className="text-lg sm:text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                        <div className="text-[10px] sm:text-xs opacity-90">Hrs</div>
                    </div>
                    <span className="text-lg sm:text-xl font-bold">:</span>
                    <div className="bg-white/20 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 min-w-[45px] sm:min-w-[50px] text-center">
                        <div className="text-lg sm:text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                        <div className="text-[10px] sm:text-xs opacity-90">Min</div>
                    </div>
                    <span className="text-lg sm:text-xl font-bold">:</span>
                    <div className="bg-white/20 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 min-w-[45px] sm:min-w-[50px] text-center">
                        <div className="text-lg sm:text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                        <div className="text-[10px] sm:text-xs opacity-90">Sec</div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

