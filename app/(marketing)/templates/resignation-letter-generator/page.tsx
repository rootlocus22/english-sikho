import type { Metadata } from 'next';
import EmailGenerator from '@/components/tools/EmailGenerator';

export const metadata: Metadata = {
    title: 'Resignation Letter Generator: Professional & Polite Format | EnglishGyani',
    description: 'Generate a professional resignation letter instantly. Free AI tool for notice period, reason for leaving, and handover details. Best for Indian corporate employees.',
};

export default function ResignationPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
                    <div className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
                        High Stakes Communication
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                        Professional <span className="text-indigo-600">Resignation Letter</span> Generator
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
                        Leaving your job? Leave on a good note. Generate a polite, formal, and bridge-building resignation email.
                    </p>

                    <div className="max-w-3xl mx-auto">
                        <EmailGenerator />
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-16">
                <div className="prose prose-lg prose-slate">
                    <h2>How to Resign Gracefully</h2>
                    <p>
                        Resignation ek sensitive matter hai. Hamesha yaad rakhein:
                    </p>
                    <ul>
                        <li><strong>Don't burn bridges:</strong> Future mein reference chahiye ho sakta hai.</li>
                        <li><strong>Be clear about dates:</strong> Last working day clear mention karein.</li>
                        <li><strong>Express gratitude:</strong> Even if you hated the job, say "Thank you for the opportunity".</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
