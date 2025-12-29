'use client';

import { Check, X } from 'lucide-react';
import { Card } from '@/components/ui/card';

const competitors = [
    {
        name: 'EnglishGyani',
        price: '₹299/mo',
        features: {
            aiSpeakingCoach: true,
            interviewPrep: true,
            businessTemplates: true,
            pronunciationAnalysis: true,
            indianAccentSupport: true,
            unlimitedPractice: true,
            realTimeFeedback: true,
            judgmentFree: true,
        },
        highlight: true
    },
    {
        name: 'Duolingo',
        price: '₹499/mo',
        features: {
            aiSpeakingCoach: false,
            interviewPrep: false,
            businessTemplates: false,
            pronunciationAnalysis: false,
            indianAccentSupport: false,
            unlimitedPractice: false,
            realTimeFeedback: false,
            judgmentFree: false,
        },
        highlight: false
    },
    {
        name: 'Traditional Coaching',
        price: '₹5,000+/mo',
        features: {
            aiSpeakingCoach: false,
            interviewPrep: true,
            businessTemplates: false,
            pronunciationAnalysis: true,
            indianAccentSupport: false,
            unlimitedPractice: false,
            realTimeFeedback: true,
            judgmentFree: false,
        },
        highlight: false
    },
    {
        name: 'Other Apps',
        price: '₹299-599/mo',
        features: {
            aiSpeakingCoach: false,
            interviewPrep: false,
            businessTemplates: false,
            pronunciationAnalysis: false,
            indianAccentSupport: false,
            unlimitedPractice: false,
            realTimeFeedback: false,
            judgmentFree: false,
        },
        highlight: false
    }
];

const featureLabels = {
    aiSpeakingCoach: 'AI Speaking Coach',
    interviewPrep: 'Interview Preparation',
    businessTemplates: 'Business Email Templates',
    pronunciationAnalysis: 'Pronunciation Analysis',
    indianAccentSupport: 'Indian Accent Support',
    unlimitedPractice: 'Unlimited Practice',
    realTimeFeedback: 'Real-time Feedback',
    judgmentFree: '100% Judgment Free',
};

export default function CompetitorComparison() {
    return (
        <section className="py-16 md:py-24 bg-slate-50">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                        Why EnglishGyani Wins 🏆
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Compare us with alternatives. See why 10,000+ professionals chose us.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        <table className="w-full bg-white rounded-xl border-2 border-slate-200 shadow-lg overflow-hidden">
                            <thead>
                                <tr className="bg-slate-100 border-b-2 border-slate-200">
                                    <th className="px-6 py-4 text-left font-bold text-slate-900">Feature</th>
                                    {competitors.map((comp, i) => (
                                        <th
                                            key={i}
                                            className={`px-6 py-4 text-center font-bold ${
                                                comp.highlight
                                                    ? 'bg-gradient-to-b from-blue-600 to-indigo-600 text-white'
                                                    : 'text-slate-700'
                                            }`}
                                        >
                                            <div>{comp.name}</div>
                                            <div className="text-sm font-normal mt-1 opacity-90">{comp.price}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(featureLabels).map(([key, label]) => (
                                    <tr key={key} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-700">{label}</td>
                                        {competitors.map((comp, i) => (
                                            <td key={i} className="px-6 py-4 text-center">
                                                {comp.features[key as keyof typeof comp.features] ? (
                                                    <Check className="w-6 h-6 text-green-600 mx-auto" />
                                                ) : (
                                                    <X className="w-6 h-6 text-slate-300 mx-auto" />
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    <Card className="p-6 bg-white border-2 border-blue-200">
                        <h3 className="font-bold text-lg mb-3 text-slate-900">💰 Best Value</h3>
                        <p className="text-slate-600 text-sm">
                            97% cheaper than coaching. More features than Duolingo at half the price.
                        </p>
                    </Card>
                    <Card className="p-6 bg-white border-2 border-green-200">
                        <h3 className="font-bold text-lg mb-3 text-slate-900">🇮🇳 Made for India</h3>
                        <p className="text-slate-600 text-sm">
                            Understands Indian accents, MTI issues, and workplace scenarios.
                        </p>
                    </Card>
                    <Card className="p-6 bg-white border-2 border-purple-200">
                        <h3 className="font-bold text-lg mb-3 text-slate-900">🤖 AI-Powered</h3>
                        <p className="text-slate-600 text-sm">
                            Real-time feedback, personalized coaching, available 24/7.
                        </p>
                    </Card>
                </div>
            </div>
        </section>
    );
}

