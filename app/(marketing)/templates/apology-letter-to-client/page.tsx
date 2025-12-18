import type { Metadata } from 'next';
import EmailGenerator from '@/components/tools/EmailGenerator';

export const metadata: Metadata = {
    title: 'Apology Letter to Client/Boss: Professional Format | EnglishGyani',
    description: 'Made a mistake at work? Write a sincere apology email to client or boss. Save your reputation with our AI Email Writer.',
    alternates: {
        canonical: '/templates/apology-letter-to-client',
    },
};

export default function ApologyPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
                    <div className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
                        Damage Control
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                        Write a Professional <span className="text-indigo-600">Apology Email</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
                        Galti ho gayi? Fix it fast. A sincere apology can save a client relationship.
                    </p>

                    <div className="max-w-3xl mx-auto">
                        <EmailGenerator />
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-16">
                <div className="prose prose-lg prose-slate">
                    <h2>How to Apologize Professionally</h2>
                    <ul>
                        <li><strong>Admit it:</strong> "I apologize for the oversight." (Don't make excuses).</li>
                        <li><strong>Fix it:</strong> "Here is how I am correcting the issue."</li>
                        <li><strong>Assure it:</strong> "This will not happen again."</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
