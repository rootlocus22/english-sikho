'use client';

import { Mic, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Props {
    topic: string; // e.g., 'intro', 'hiring', 'strengths'
    label?: string;
    className?: string;
}

export default function PracticeAudioCTA({ topic, label = "Practice Speaking Your Answer", className }: Props) {
    return (
        <div className={cn("bg-white rounded-xl p-1 border border-blue-100 shadow-sm inline-block scale-100 hover:scale-105 transition-transform duration-200", className)}>
            <div className="flex items-center gap-2">
                <Link
                    href={`/dashboard/gym?topic=${topic}`}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold shadow-md shadow-blue-200"
                >
                    <div className="relative flex items-center justify-center">
                        <Mic className="w-5 h-5 z-10 relative" />
                        <span className="absolute w-full h-full bg-white rounded-full opacity-30 animate-ping"></span>
                    </div>
                    <span>{label}</span>
                    <ArrowRight className="w-4 h-4 ml-1 opacity-80" />
                </Link>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-1 font-medium tracking-wide">FREE AI FEEDBACK</p>
        </div>
    );
}
