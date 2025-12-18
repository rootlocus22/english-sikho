import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Privacy Policy | EnglishGyani',
    description: 'How we protect your data and privacy at EnglishGyani.',
    alternates: {
        canonical: '/privacy',
    },
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
                <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-8 group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <h1 className="text-3xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
                <p className="text-sm text-slate-500 mb-8">Last updated: December 12, 2024</p>

                <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Data Collection</h2>
                        <p>
                            We collect basic information required to provide our services, including:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Account information (Name, Email, Google Auth data).</li>
                            <li>Usage data (AI credits consumed, learning progress).</li>
                            <li>Input data (Text or Audio provided for analysis).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Use of Data</h2>
                        <p>
                            Your data is used solely to:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Provide personalized AI coaching and feedback.</li>
                            <li>Improve our AI models and service quality.</li>
                            <li>Communicate important service updates.</li>
                        </ul>
                        <p className="mt-2 font-medium">We strictly do not share or sell your personal data to third parties.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Data Security</h2>
                        <p>
                            We implement industry-standard security measures (encryption, secure cloud storage via Google Cloud/Firebase) to protect your information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Your Rights</h2>
                        <p>
                            You have the right to request access to your data or request deletion of your account. Please contact us at support@nyquisttech.com for such requests.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Contact Us</h2>
                        <p>
                            <strong>Nyquist Tech</strong><br />
                            Bengaluru, Karnataka, India<br />
                            Email: support@nyquisttech.com<br />
                            Phone: +91 84312 56903
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
