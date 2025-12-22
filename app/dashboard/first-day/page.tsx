"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store";
import { workplaceScenarios } from "@/data/workplace-scenarios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrackedLink } from "@/components/ui/tracked-elements";
import { ArrowRight, Briefcase, CheckCircle2, Trophy, Users, MessageCircle, ThumbsUp, Coffee } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categoryIcons = {
    'introductions': Users,
    'meetings': Briefcase,
    'small-talk': Coffee,
    'requests': MessageCircle,
    'feedback': ThumbsUp
};

const categoryNames = {
    'introductions': 'Introductions',
    'meetings': 'Team Meetings',
    'small-talk': 'Small Talk',
    'requests': 'Asking for Help',
    'feedback': 'Receiving Feedback'
};

export default function FirstDayPage() {
    const { userId } = useUserStore();
    const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);

    useEffect(() => {
        // Load completed scenarios from localStorage
        const saved = localStorage.getItem(`first-day-progress-${userId}`);
        if (saved) {
            setCompletedScenarios(JSON.parse(saved));
        }
    }, [userId]);

    const completionPercentage = (completedScenarios.length / workplaceScenarios.length) * 100;

    // Group scenarios by category
    const groupedScenarios = workplaceScenarios.reduce((acc, scenario) => {
        if (!acc[scenario.category]) {
            acc[scenario.category] = [];
        }
        acc[scenario.category].push(scenario);
        return acc;
    }, {} as Record<string, typeof workplaceScenarios>);

    return (
        <div className="container max-w-6xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 rounded-full">
                    <Briefcase className="w-4 h-4 text-green-600 dark:text-green-300" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-200">Workplace Communication</span>
                </div>
                <h1 className="text-4xl font-bold">First Day at Work</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Practice common workplace scenarios to feel confident and prepared on your first day
                </p>
            </div>

            {/* Progress Card */}
            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-bold">Your Progress</h3>
                        <p className="text-sm text-muted-foreground">
                            {completedScenarios.length} of {workplaceScenarios.length} scenarios practiced
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                        <span className="text-2xl font-bold">{Math.round(completionPercentage)}%</span>
                    </div>
                </div>
                <Progress value={completionPercentage} className="h-3" />
            </Card>

            {/* Why This Matters */}
            <Card className="p-6 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                <h3 className="font-bold mb-3">💼 Why Practice First Day Scenarios?</h3>
                <ul className="space-y-2 text-sm">
                    <li>• First impressions matter - make them count</li>
                    <li>• Feel less nervous and more confident</li>
                    <li>• Know what to say in common situations</li>
                    <li>• Build good relationships with colleagues from day one</li>
                </ul>
            </Card>

            {/* Scenarios by Category */}
            {Object.entries(groupedScenarios).map(([category, scenarios]) => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons];
                const categoryName = categoryNames[category as keyof typeof categoryNames];

                return (
                    <div key={category} className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                            <h2 className="text-2xl font-bold">{categoryName}</h2>
                            <Badge variant="secondary">{scenarios.length} scenarios</Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {scenarios.map((scenario) => {
                                const isCompleted = completedScenarios.includes(scenario.id);

                                return (
                                    <Card
                                        key={scenario.id}
                                        className="p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                                    >
                                        <div className="space-y-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="text-lg font-bold">{scenario.title}</h3>
                                                        {isCompleted && (
                                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-3">
                                                        {scenario.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="text-xs capitalize">
                                                    {scenario.difficulty}
                                                </Badge>
                                                {isCompleted && (
                                                    <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                                                        Completed
                                                    </Badge>
                                                )}
                                            </div>

                                            <TrackedLink
                                                href={`/dashboard/first-day/${scenario.id}`}
                                                eventData={{
                                                    action: 'click_workplace_scenario',
                                                    category: 'learning',
                                                    label: scenario.id
                                                }}
                                            >
                                                <Button className="w-full" variant={isCompleted ? "outline" : "default"}>
                                                    {isCompleted ? 'Review Scenario' : 'Practice Scenario'}
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </TrackedLink>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            {/* Completion CTA */}
            {completionPercentage === 100 && (
                <Card className="p-8 text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    <Trophy className="w-16 h-16 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">🎉 All Scenarios Completed!</h2>
                    <p className="mb-6 text-white/90">
                        You're ready for your first day! Remember to be yourself and stay confident.
                    </p>
                    <Button variant="secondary">
                        Explore More Learning Features
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Card>
            )}
        </div>
    );
}
