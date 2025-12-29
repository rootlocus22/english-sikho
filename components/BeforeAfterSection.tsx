'use client';

import { Card } from '@/components/ui/card';
import { X, Check } from 'lucide-react';

const examples = [
    {
        title: 'Email to Boss',
        before: {
            text: 'Sir, I need leave tomorrow. Please approve.',
            issues: ['Too direct', 'No context', 'Unprofessional tone']
        },
        after: {
            text: 'Hi [Boss Name], I hope you\'re doing well. I would like to request a leave for tomorrow due to a personal emergency. I\'ve completed all urgent tasks and will ensure a smooth handover. I\'d appreciate your approval. Thank you!',
            improvements: ['Professional tone', 'Clear context', 'Shows responsibility']
        }
    },
    {
        title: 'Interview Self-Introduction',
        before: {
            text: 'I am Rahul. I have 3 years experience. I know Java and Python. I want this job.',
            issues: ['Too brief', 'No structure', 'Weak impact']
        },
        after: {
            text: 'Hi, I\'m Rahul, a software engineer with 3 years of experience building scalable applications. I specialize in Java and Python, and I\'ve led projects that improved system performance by 40%. I\'m excited about this opportunity because it aligns perfectly with my passion for innovative solutions.',
            improvements: ['Structured', 'Shows value', 'Professional']
        }
    },
    {
        title: 'Client Communication',
        before: {
            text: 'The project is delayed. We need more time. Sorry.',
            issues: ['Negative tone', 'No explanation', 'Unprofessional']
        },
        after: {
            text: 'Hi [Client Name], I wanted to update you on the project timeline. We\'ve encountered some technical challenges that require additional time to ensure quality. I\'ve attached a revised timeline with specific milestones. I appreciate your understanding and will keep you updated on our progress.',
            improvements: ['Proactive', 'Transparent', 'Solution-focused']
        }
    }
];

export default function BeforeAfterSection() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                        See The Difference 📊
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Real examples of how EnglishGyani transforms communication
                    </p>
                </div>

                <div className="space-y-8">
                    {examples.map((example, i) => (
                        <Card key={i} className="p-6 md:p-8 border-2 border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                                {example.title}
                            </h3>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Before */}
                                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <X className="w-5 h-5 text-red-600" />
                                        <h4 className="font-bold text-red-900">Before EnglishGyani</h4>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 mb-4 border border-red-200">
                                        <p className="text-slate-700 italic">"{example.before.text}"</p>
                                    </div>
                                    <div className="space-y-2">
                                        {example.before.issues.map((issue, j) => (
                                            <div key={j} className="flex items-start gap-2 text-sm text-red-700">
                                                <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                                <span>{issue}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* After */}
                                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Check className="w-5 h-5 text-green-600" />
                                        <h4 className="font-bold text-green-900">After EnglishGyani</h4>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 mb-4 border border-green-200">
                                        <p className="text-slate-700">"{example.after.text}"</p>
                                    </div>
                                    <div className="space-y-2">
                                        {example.after.improvements.map((improvement, j) => (
                                            <div key={j} className="flex items-start gap-2 text-sm text-green-700">
                                                <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                                <span>{improvement}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-lg text-slate-700 mb-4">
                        <strong className="text-slate-900">This could be you in just 30 days.</strong>
                    </p>
                    <p className="text-slate-600">
                        Join 10,000+ professionals who transformed their English communication
                    </p>
                </div>
            </div>
        </section>
    );
}

