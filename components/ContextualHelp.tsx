'use client';

import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface HelpItem {
    id: string;
    title: string;
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export function HelpTooltip({ 
    content, 
    title,
    position = 'top'
}: { 
    content: string; 
    title?: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side={position} className="max-w-xs">
                    {title && <p className="font-semibold mb-1">{title}</p>}
                    <p className="text-sm">{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

// Common help content for Indian learners
export const HELP_CONTENT = {
    translator: {
        title: 'How to Use Translator',
        content: 'Type your thought in Hindi, Hinglish, or broken English. AI will convert it to professional English. Try: "Boss ko email bhejni hai"'
    },
    speaking: {
        title: 'Speaking Practice Tips',
        content: 'Speak naturally, don\'t worry about mistakes. AI will correct you. Practice daily for 15 minutes for best results. Focus on fluency, not perfection.'
    },
    mti: {
        title: 'What is MTI?',
        content: 'Mother Tongue Influence (MTI) is how your native language affects English pronunciation. These drills help fix common issues like V vs W, P vs F sounds.'
    },
    dailyGoals: {
        title: 'Daily Goals',
        content: 'Set small daily goals to build a habit. Complete at least 2-3 goals daily. Consistency matters more than perfection!'
    },
    thinking: {
        title: 'Thinking in English',
        content: 'Stop translating from Hindi. Think directly in English. Start with simple thoughts: "I am making tea" instead of "Main chai bana raha hoon" → "I am making tea"'
    }
};

