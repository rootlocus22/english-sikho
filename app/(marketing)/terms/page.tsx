import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Terms and Conditions | EnglishGyani',
    description: 'Terms of service for EnglishGyani platform usage.',
    alternates: {
        canonical: '/terms',
    },
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
                <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-8 group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <h1 className="text-3xl font-bold text-slate-900 mb-6">Terms and Conditions</h1>
                <p className="text-sm text-slate-500 mb-8">Last updated: December 12, 2024</p>

                <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Introduction</h2>
                        <p>
                            Welcome to EnglishGyani. These Terms and Conditions govern your use of our website and services operated by Nyquist Tech ("we", "us", or "our").
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Use of Services</h2>
                        <p>
                            EnglishGyani provides AI-powered tools for English learning. By using our services, you agree to:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Provide accurate account information.</li>
                            <li>Use the services for personal, non-commercial learning purposes.</li>
                            <li>Not attempt to reverse engineer or abuse our AI systems.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">3. User Accounts & Credits</h2>
                        <p>
                            You are responsible for maintaining the confidentiality of your account. Service credits purchased or awarded are for use within the platform and have no cash value.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Payments — One-Time Only, No Auto-Deduction</h2>
                        <p>
                            All paid plans (Starter, Pro) are <strong>one-time payments</strong>. You pay once for the plan and duration you choose (e.g. 1 month, 3 months, or 1 year). <strong>No money will be auto-deducted after your purchase. No surprise charges.</strong> We do not store your payment method for recurring billing. If you want to extend or renew access after your plan ends, you may purchase again at your discretion. Refunds are not offered for our digital services; see our <Link href="/refund-policy" className="text-blue-600 hover:underline">Refund Policy</Link> for details.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Intellectual Property</h2>
                        <p>
                            All content, features, and functionality (including our AI models and learning materials) are owned by Nyquist Tech and are protected by copyright and other intellectual property laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Limitation of Liability</h2>
                        <p>
                            EnglishGyani is an educational tool. We are not liable for any consequential damages arising from the use or inability to use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">7. Contact Us</h2>
                        <p>
                            For any questions regarding these Terms, please contact us at:
                        </p>
                        <p className="mt-4">
                            <strong>Nyquist Tech</strong><br />
                            Bengaluru, Karnataka, India<br />
                            Email: <a href="mailto:info@nyquisttech.com" className="text-blue-600 hover:underline">info@nyquisttech.com</a><br />
                            WhatsApp: <a href="https://wa.me/918431256903" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">+91 84312 56903</a><br />
                            Phone: +91 84312 56903
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
