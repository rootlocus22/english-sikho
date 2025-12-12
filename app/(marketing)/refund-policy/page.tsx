import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
                <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-8 group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <h1 className="text-3xl font-bold text-slate-900 mb-6">Refund and Cancellation Policy</h1>
                <p className="text-sm text-slate-500 mb-8">Last updated: December 12, 2024</p>

                <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Refund Policy</h2>
                        <p>
                            At EnglishGyani (operated by Nyquist Tech), we strive to provide the best AI-powered English learning experience.
                        </p>
                        <p className="mt-2">
                            <strong>Platform Credits & Subscriptions:</strong><br />
                            Due to the digital nature of our AI services (credits for speech analysis, email decoding, etc.), all purchases are generally non-refundable once the credits have been used.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>If you have purchased a subscription or credit pack and have <strong>not used any credits</strong>, you may request a full refund within 7 days of purchase.</li>
                            <li>Requests made after 7 days or after using any portion of the credits will not be eligible for a refund.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Cancellation Policy</h2>
                        <p>
                            You may cancel your subscription renewal at any time through your dashboard or by contacting support.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Cancellation Effect:</strong> Your subscription will remain active until the end of the current billing period. You will not be charged for the next cycle.</li>
                            <li>No partial refunds are provided for the remaining time in an active billing period.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">3. How to Request a Review</h2>
                        <p>
                            If you believe there was a technical error (e.g., double charge, service unavailable), please contact us immediately. We review such cases individually.
                        </p>
                        <p className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <strong>Contact Support:</strong><br />
                            Email: <a href="mailto:support@nyquisttech.com" className="text-blue-600 hover:underline">support@nyquisttech.com</a><br />
                            Phone: +91 84312 56903<br />
                            Address: Bengaluru, Karnataka, India
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
