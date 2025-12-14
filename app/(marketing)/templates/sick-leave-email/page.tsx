import type { Metadata } from 'next';
import EmailGenerator from '@/components/tools/EmailGenerator';

export const metadata: Metadata = {
    title: 'Sick Leave Email Generator for Office (Professional Format) | EnglishGyani',
    description: 'Write a professional sick leave email in 10 seconds. AI Email Writer for office employees. Free sick leave templates for fever, viral infection, and emergency.',
};

export default function SickLeavePage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
                    <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
                        Office Survival Tools
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                        Write a Professional <span className="text-indigo-600">Sick Leave Email</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
                        Bukhaar hai aur boss ko mail likhna hai? Don't stress. Just enter details and copy the perfect email.
                    </p>

                    <div className="max-w-3xl mx-auto">
                        <EmailGenerator />
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-16">
                <div className="prose prose-lg prose-slate">
                    <h2>Sick Leave Best Practices</h2>
                    <ul>
                        <li><strong>Keep it short:</strong> Bosses don't want to read a medical history. Just say you are unwell.</li>
                        <li><strong>Mention availability:</strong> Clearly say if you will be available on phone or not.</li>
                        <li><strong>Subject Line matters:</strong> Use "Sick Leave Application - [Your Name]" for faster approval.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
