
import Link from 'next/link';
import { Mail, MapPin, Phone, ArrowLeft } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-slate-50 border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                    <div className="mb-8">
                        <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Have a question? We love to hear from our learners.
                    </p>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="container max-w-5xl mx-auto grid md:grid-cols-2 gap-12">

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Contact Channels</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                                <Mail className="w-6 h-6 text-blue-600 mt-1" />
                                <div>
                                    <h3 className="font-bold text-slate-900">Email Support</h3>
                                    <p className="text-slate-600 text-sm mb-2">Best for account issues & general queries.</p>
                                    <a href="mailto:support@englishgyani.com" className="text-blue-600 font-medium hover:underline">
                                        support@englishgyani.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                                <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                                <div>
                                    <h3 className="font-bold text-slate-900">Registered Office</h3>
                                    <p className="text-slate-600 text-sm">
                                        EnglishGyani EdTech Pvt Ltd.<br />
                                        4th Floor, Tech Park, Sector 44<br />
                                        Gurgaon, Haryana 122002
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold mb-6">Partnerships</h2>
                            <p className="text-slate-600">
                                Are you an institute or a college? We offer bulk licenses for campuses.
                                Reach out to us at <a href="mailto:partners@englishgyani.com" className="text-blue-600 hover:underline">partners@englishgyani.com</a>.
                            </p>
                        </div>
                    </div>

                    {/* Support FAQs */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
                        <div className="space-y-4">
                            <div className="p-4 border border-slate-200 rounded-lg">
                                <h4 className="font-bold text-slate-900">I forgot my password. What to do?</h4>
                                <p className="text-slate-600 text-sm mt-1">
                                    Click on 'Forgot Password' on the login screen. We will send a reset link to your registered email.
                                </p>
                            </div>
                            <div className="p-4 border border-slate-200 rounded-lg">
                                <h4 className="font-bold text-slate-900">How to cancel my subscription?</h4>
                                <p className="text-slate-600 text-sm mt-1">
                                    Go to Dashboard Settings Billing. Click on "Cancel Plan". Your access will continue until the billing cycle ends.
                                </p>
                            </div>
                            <div className="p-4 border border-slate-200 rounded-lg">
                                <h4 className="font-bold text-slate-900">Do you offer refunds?</h4>
                                <p className="text-slate-600 text-sm mt-1">
                                    Yes, we offer a 7-day money-back guarantee for all new subscriptions. Email us if you are not satisfied.
                                </p>
                            </div>
                            <div className="p-4 border border-slate-200 rounded-lg">
                                <h4 className="font-bold text-slate-900">Is the content strictly for IT professionals?</h4>
                                <p className="text-slate-600 text-sm mt-1">
                                    No. While we have specialized modules for IT, our general fluency and business communication courses are perfect for sales, HR, marketing, and students.
                                </p>
                            </div>

                            <div className="p-4 border border-slate-200 rounded-lg">
                                <h4 className="font-bold text-slate-900">Are you hiring?</h4>
                                <p className="text-slate-600 text-sm mt-1">
                                    We are always looking for talented engineers and content creators. Send your resume to careers@englishgyani.com.
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-slate-900 text-white rounded-xl">
                            <h3 className="text-xl font-bold mb-3">For Corporate Training</h3>
                            <p className="text-slate-300 mb-4">
                                Want to upskill your entire sales or customer support team? We offer customized dashboards for companies to track employee progress.
                            </p>
                            <a href="mailto:corporate@englishgyani.com" className="inline-block px-4 py-2 bg-white text-slate-900 font-bold rounded hover:bg-slate-100 transition-colors">
                                Request Corporate Demo
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
