import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Refund Policy | EnglishGyani',
    description: 'EnglishGyani no-refund policy for digital services. One-time payment, no auto-deduction.',
    alternates: {
        canonical: '/refund-policy',
    },
};

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
                <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-8 group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <h1 className="text-3xl font-bold text-slate-900 mb-6">Refund and Cancellation Policy</h1>
                <p className="text-sm text-slate-500 mb-8">Last updated: March 2025</p>

                <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">1. No Refunds — Digital Services</h2>
                        <p>
                            At EnglishGyani (operated by Nyquist Tech), we provide digital, AI-powered learning services. Once you purchase a plan and access the service, the product is considered delivered.
                        </p>
                        <p className="mt-2">
                            <strong>All sales are final.</strong> We do not offer refunds for our plans (Starter or Pro, whether monthly, quarterly, or yearly) due to the nature of digital products. By completing a purchase, you acknowledge that you have read and accepted this no-refund policy.
                        </p>
                        <p className="mt-2">
                            Exceptions may be considered only in cases of <strong>technical or billing errors</strong> (e.g. you were charged twice for the same order, or the service was completely unavailable through no fault of yours). Such requests will be reviewed individually. Contact us via WhatsApp or email (see Section 3).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">2. One-Time Payment — No Auto-Deduction</h2>
                        <p>
                            All plans are <strong>one-time payments</strong>. We charge you once for the plan you choose (e.g. 1 month, 3 months, or 1 year). <strong>No money is auto-deducted later. No surprise charges.</strong> We do not save your card for future charges. If you wish to continue after your plan ends, you may purchase again when you choose.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Contact Support</h2>
                        <p>
                            For questions about your purchase, billing errors, or technical issues:
                        </p>
                        <p className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <strong>Contact Support:</strong><br />
                            WhatsApp: <a href="https://wa.me/918431256903?text=Hi%2C%20I%20have%20a%20question%20about%20my%20purchase" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-medium">+91 84312 56903</a> (Fastest)<br />
                            Email: <a href="mailto:info@nyquisttech.com" className="text-blue-600 hover:underline">info@nyquisttech.com</a><br />
                            Phone: +91 84312 56903<br />
                            Address: Bengaluru, Karnataka, India
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
