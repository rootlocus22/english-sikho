import type { Metadata } from 'next';
import EmailGenerator from '@/components/tools/EmailGenerator';

export const metadata: Metadata = {
    title: 'Leave Application for Office: Copy-Paste Templates | EnglishGyani',
    description: 'Write a professional leave application for office. Free AI tool for casual leave, planned vacation, or personal emergency. Get copy-paste format.',
    alternates: {
        canonical: '/templates/request-for-leave',
    },
};

export default function LeaveRequestPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
                        Everyday Office Tool
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                        Write a <span className="text-indigo-600">Leave Application</span> for Office
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
                        Planning a holiday or need time off? Get your leave approved instantly with a perfectly written email.
                    </p>

                    <div className="max-w-3xl mx-auto">
                        <EmailGenerator />
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-16">
                <div className="prose prose-lg prose-slate">
                    <h2>Leave Application Format</h2>
                    <ul>
                        <li><strong>Subject:</strong> "Leave Application - [Dates]"</li>
                        <li><strong>Handover:</strong> Mention who will handle your work.</li>
                        <li><strong>Emergency Contact:</strong> Share your number for urgent issues.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
