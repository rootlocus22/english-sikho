'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const quickPhrases = {
    'Office Emails': [
        { hindi: 'Kaam ho gaya', english: 'The work is done', context: 'Task completion' },
        { hindi: 'Meeting cancel karni hai', english: 'I need to cancel the meeting', context: 'Meeting request' },
        { hindi: 'File bhej do', english: 'Could you please send the file?', context: 'File request' },
        { hindi: 'Kal tak chahiye', english: 'I need it by tomorrow', context: 'Deadline' },
        { hindi: 'Review kar do', english: 'Could you please review this?', context: 'Review request' },
        { hindi: 'Approval chahiye', english: 'I need your approval on this', context: 'Approval' },
        { hindi: 'Update de do', english: 'Could you please provide an update?', context: 'Status check' },
        { hindi: 'Issue hai', english: 'There\'s an issue that needs attention', context: 'Problem' },
    ],
    'Boss Communication': [
        { hindi: 'Sick leave chahiye', english: 'I need to take a sick leave', context: 'Leave request' },
        { hindi: 'Salary hike chahiye', english: 'I would like to discuss a salary increment', context: 'Salary' },
        { hindi: 'Work from home', english: 'Could I work from home today?', context: 'WFH' },
        { hindi: 'Late ho jayega', english: 'I might be running a bit late', context: 'Timing' },
        { hindi: 'Meeting mein nahi aa sakta', english: 'I won\'t be able to attend the meeting', context: 'Meeting' },
        { hindi: 'Project complete ho gaya', english: 'The project has been completed', context: 'Update' },
    ],
    'Client Communication': [
        { hindi: 'Delivery delay ho rahi hai', english: 'There will be a slight delay in delivery', context: 'Delay' },
        { hindi: 'Price zyada hai', english: 'The pricing seems higher than expected', context: 'Pricing' },
        { hindi: 'Demo chahiye', english: 'We would like to schedule a demo', context: 'Demo' },
        { hindi: 'Contract sign karna hai', english: 'We need to sign the contract', context: 'Contract' },
        { hindi: 'Payment pending hai', english: 'The payment is still pending', context: 'Payment' },
    ],
    'Common Mistakes': [
        { hindi: 'Do the needful', english: 'Please take the necessary action', context: 'Outdated phrase' },
        { hindi: 'Revert back', english: 'Please reply / Please respond', context: 'Redundant' },
        { hindi: 'Prepone', english: 'Move forward / Reschedule to an earlier date', context: 'Not standard' },
        { hindi: 'Out of station', english: 'Out of town / Away', context: 'Indianism' },
        { hindi: 'Same same', english: 'Similar / The same', context: 'Redundant' },
    ],
    'Interview Phrases': [
        { hindi: 'Tell me about yourself', english: 'I am [name], a [role] with [experience] years...', context: 'Introduction' },
        { hindi: 'Why should we hire you?', english: 'I bring [skills] and [experience] that align...', context: 'Value prop' },
        { hindi: 'Salary kitna chahiye?', english: 'Based on my experience, I\'m looking for...', context: 'Salary' },
        { hindi: 'Notice period kitna hai?', english: 'My notice period is [X] days/weeks', context: 'Notice' },
    ]
};

export default function QuickReference() {
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCopy = (text: string, index: string) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const filteredPhrases = Object.entries(quickPhrases)
        .filter(([category]) => !selectedCategory || category === selectedCategory)
        .map(([category, phrases]) => [
            category,
            phrases.filter(p => 
                p.hindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.context.toLowerCase().includes(searchQuery.toLowerCase())
            )
        ])
        .filter(([, phrases]) => phrases.length > 0);

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-2 px-2">
                <h2 className="text-2xl sm:text-3xl font-bold">Quick Reference Guide</h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                    Common phrases translated from Hindi/Hinglish to professional English
                </p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search phrases... (e.g., 'leave', 'meeting', 'salary')"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 px-2">
                <Button
                    variant={selectedCategory === null ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                    className="text-xs sm:text-sm"
                >
                    All
                </Button>
                {Object.keys(quickPhrases).map(category => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="text-xs sm:text-sm"
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {/* Phrases */}
            <div className="space-y-4 sm:space-y-6">
                {filteredPhrases.map(([category, phrases]) => (
                    <Card key={category}>
                        <CardHeader className="p-4 sm:p-6">
                            <CardTitle className="text-lg sm:text-xl">{category}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 pt-0">
                            <div className="space-y-2 sm:space-y-3">
                                {phrases.map((phrase, index) => {
                                    const uniqueIndex = `${category}-${index}`;
                                    return (
                                        <div
                                            key={index}
                                            className="p-3 sm:p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                        >
                                            <div className="flex items-start justify-between gap-2 sm:gap-4">
                                                <div className="flex-1 space-y-1.5 sm:space-y-2 min-w-0">
                                                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                                        <span className="text-xs sm:text-sm font-medium text-muted-foreground break-words">
                                                            {phrase.hindi}
                                                        </span>
                                                        <Badge variant="outline" className="text-[10px] sm:text-xs shrink-0">
                                                            {phrase.context}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 break-words">
                                                        {phrase.english}
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleCopy(phrase.english, uniqueIndex)}
                                                    className="shrink-0 h-8 w-8 p-0"
                                                >
                                                    {copiedIndex === uniqueIndex ? (
                                                        <Check className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <Copy className="w-4 h-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredPhrases.length === 0 && (
                <Card>
                    <CardContent className="p-8 text-center">
                        <p className="text-muted-foreground">No phrases found. Try a different search.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

