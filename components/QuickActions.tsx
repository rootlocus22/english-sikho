'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrackedLink } from '@/components/ui/tracked-elements';
import { 
    Mic, Mail, Briefcase, BookOpen, Zap, Brain, 
    ArrowRight, Target, TrendingUp 
} from 'lucide-react';

const quickActions = [
    {
        title: 'Practice Speaking',
        description: '15 min daily practice',
        href: '/dashboard/coach',
        icon: Mic,
        color: 'from-blue-500 to-cyan-500',
        time: '15 min'
    },
    {
        title: 'MTI Drills',
        description: 'Fix V vs W, P vs F',
        href: '/dashboard/mti-drills',
        icon: Zap,
        color: 'from-purple-500 to-pink-500',
        time: '10 min'
    },
    {
        title: 'Daily Word',
        description: 'Learn new vocabulary',
        href: '/dashboard/vocabulary',
        icon: BookOpen,
        color: 'from-green-500 to-emerald-500',
        time: '5 min'
    },
    {
        title: 'Email Practice',
        description: 'Write professional emails',
        href: '/dashboard/tone',
        icon: Mail,
        color: 'from-orange-500 to-red-500',
        time: '10 min'
    },
    {
        title: 'Interview Prep',
        description: 'Mock interviews',
        href: '/dashboard/interview-prep',
        icon: Briefcase,
        color: 'from-indigo-500 to-purple-500',
        time: '20 min'
    },
    {
        title: 'Think in English',
        description: 'Stop translating',
        href: '/dashboard/thinking-english',
        icon: Brain,
        color: 'from-teal-500 to-blue-500',
        time: '10 min'
    }
];

export default function QuickActions() {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-lg">Quick Actions</h3>
                </div>
                <span className="text-xs text-muted-foreground">Start practicing now</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                        <TrackedLink
                            key={index}
                            href={action.href}
                            eventData={{
                                action: 'click_quick_action',
                                category: 'navigation',
                                label: action.title
                            }}
                        >
                            <div className={`bg-gradient-to-br ${action.color} text-white rounded-lg p-3 sm:p-4 hover:shadow-lg transition-all cursor-pointer group`}>
                                <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-[10px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded">
                                        {action.time}
                                    </span>
                                </div>
                                <h4 className="font-bold text-xs sm:text-sm mb-0.5 sm:mb-1">{action.title}</h4>
                                <p className="text-[10px] sm:text-xs text-white/80 line-clamp-2">{action.description}</p>
                                <ArrowRight className="w-3 h-3 mt-1 sm:mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </TrackedLink>
                    );
                })}
            </div>
        </Card>
    );
}

