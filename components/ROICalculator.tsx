'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, DollarSign } from 'lucide-react';

export default function ROICalculator() {
    const [currentSalary, setCurrentSalary] = useState(500000);
    const [years, setYears] = useState(1);

    // Research shows English proficiency can increase salary by 15-30%
    const salaryIncreasePercent = 20; // Conservative estimate
    const annualIncrease = Math.round((currentSalary * salaryIncreasePercent) / 100);
    const totalIncrease = annualIncrease * years;
    const investment = 299 * 12 * years; // Pro plan yearly
    const roi = totalIncrease - investment;
    const roiPercent = Math.round((roi / investment) * 100);

    return (
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <CardHeader>
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900">
                        Calculate Your ROI
                    </CardTitle>
                </div>
                <p className="text-sm sm:text-base text-slate-600">
                    See how improving English can boost your salary
                </p>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Your Current Annual Salary (₹)
                    </label>
                    <input
                        type="number"
                        value={currentSalary}
                        onChange={(e) => setCurrentSalary(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-lg font-semibold"
                        min="100000"
                        max="10000000"
                        step="50000"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Time Period (Years)
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3].map(year => (
                            <button
                                key={year}
                                onClick={() => setYears(year)}
                                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                                    years === year
                                        ? 'bg-green-600 text-white shadow-lg'
                                        : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-green-300'
                                }`}
                            >
                                {year} {year === 1 ? 'Year' : 'Years'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-green-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="text-sm sm:text-base text-slate-600">Potential Salary Increase</span>
                        <span className="text-xl sm:text-2xl font-bold text-green-600">
                            +₹{annualIncrease.toLocaleString('en-IN')}/year
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="text-sm sm:text-base text-slate-600">Total Increase ({years} {years === 1 ? 'year' : 'years'})</span>
                        <span className="text-xl sm:text-2xl font-bold text-green-700">
                            ₹{totalIncrease.toLocaleString('en-IN')}
                        </span>
                    </div>
                    <div className="border-t border-slate-200 pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <span className="text-sm sm:text-base text-slate-600">Investment (EnglishGyani Pro)</span>
                            <span className="text-base sm:text-lg font-semibold text-slate-700">
                                ₹{investment.toLocaleString('en-IN')}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-4 border-t border-green-200">
                            <span className="text-base sm:text-lg font-bold text-slate-900">Net Return</span>
                            <span className="text-2xl sm:text-3xl font-bold text-green-600">
                                ₹{roi.toLocaleString('en-IN')}
                            </span>
                        </div>
                        <div className="mt-2 text-left sm:text-right">
                            <span className="text-xs sm:text-sm text-green-600 font-semibold">
                                {roiPercent > 0 ? '+' : ''}{roiPercent}% ROI
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-blue-900">
                        <strong>Research shows:</strong> English proficiency can increase salary by 15-30%. 
                        We used a conservative 20% estimate. Your actual increase may vary.
                    </p>
                </div>

                <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6 text-lg"
                    onClick={() => window.location.href = '/dashboard/upgrade'}
                >
                    Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </CardContent>
        </Card>
    );
}

