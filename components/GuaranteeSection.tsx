'use client';

import { Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function GuaranteeSection() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <Card className="bg-white border-4 border-green-500 shadow-2xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                            <Shield className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            100% Money-Back Guarantee
                        </h2>
                        <p className="text-xl text-slate-700 font-semibold">
                            Try risk-free for 7 days. Not satisfied? Get full refund. No questions asked.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="text-center p-6 bg-green-50 rounded-xl">
                            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">7-Day Trial</h3>
                            <p className="text-slate-600 text-sm">
                                Use all features for 7 days. If you don't see improvement, get full refund.
                            </p>
                        </div>
                        <div className="text-center p-6 bg-blue-50 rounded-xl">
                            <CheckCircle2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">No Questions Asked</h3>
                            <p className="text-slate-600 text-sm">
                                We trust you. If it's not working, we'll refund immediately. No hassle.
                            </p>
                        </div>
                        <div className="text-center p-6 bg-purple-50 rounded-xl">
                            <CheckCircle2 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Instant Refund</h3>
                            <p className="text-slate-600 text-sm">
                                Refund processed within 24 hours. Money back in your account in 3-5 days.
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                        <h3 className="font-bold text-lg mb-4 text-slate-900">What This Means For You:</h3>
                        <ul className="space-y-3 text-slate-700">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Zero Risk:</strong> Try everything. If it doesn't work, get your money back.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Full Access:</strong> Use all Pro features during trial. Nothing is locked.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                <span><strong>Easy Process:</strong> Just email us. No forms, no calls, no hassle.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-slate-600 mb-4">
                            <strong className="text-slate-900">10,000+</strong> professionals trust us. 
                            Less than 2% request refunds.
                        </p>
                        <Button 
                            size="lg"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-8 py-6 text-lg"
                            onClick={() => window.location.href = '/dashboard/upgrade'}
                        >
                            Start Risk-Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </Card>
            </div>
        </section>
    );
}

