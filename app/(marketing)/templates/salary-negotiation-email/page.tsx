import type { Metadata } from 'next';
import EmailGenerator from '@/components/tools/EmailGenerator';

export const metadata: Metadata = {
    title: 'Salary Negotiation Email Template: Ask for a Hike Professionaly | EnglishGyani',
    description: 'Scared to ask for a salary hike? Use our AI Email Generator to write a data-backed salary negotiation email. Get the raise you deserve.',
};

export default function SalaryPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
                    <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
                        Career Growth Tool
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                        How to Ask for a <span className="text-indigo-600">Salary Hike?</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
                        Don't just say "I want more money". Explain your value. Use our Professional Tone setting.
                    </p>

                    <div className="max-w-3xl mx-auto">
                        <EmailGenerator />
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-16">
                <div className="prose prose-lg prose-slate">
                    <h2>Salary Hike Email Tips</h2>
                    <ul>
                        <li><strong>Focus on Achievements:</strong> List 2-3 big wins from the last year.</li>
                        <li><strong>Research Market Rate:</strong> Know what your role pays in other companies.</li>
                        <li><strong>Be Professional, Not Emotional:</strong> Don't complain about expenses. Talk about business value.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
