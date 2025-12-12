import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info Card */}
                    <div className="bg-white rounded-xl shadow-sm p-8 h-full">
                        <h1 className="text-3xl font-bold text-slate-900 mb-6">Get in Touch</h1>
                        <p className="text-slate-600 mb-8">
                            We'd love to hear from you. Whether you have a question about usage, pricing, or just want to say hi, our team is ready to answer all your questions.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                                <Mail className="w-6 h-6 text-blue-600 mt-1" />
                                <div>
                                    <h3 className="font-bold text-slate-900">Email Us</h3>
                                    <p className="text-sm text-slate-500 mb-1">For support and queries</p>
                                    <a href="mailto:support@nyquisttech.com" className="text-blue-600 font-medium hover:underline">
                                        support@nyquisttech.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                                <Phone className="w-6 h-6 text-purple-600 mt-1" />
                                <div>
                                    <h3 className="font-bold text-slate-900">Call Us</h3>
                                    <p className="text-sm text-slate-500 mb-1">Mon-Fri from 9am to 6pm</p>
                                    <a href="tel:+918431256903" className="text-purple-600 font-medium hover:underline">
                                        +91 84312 56903
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-lg">
                                <MapPin className="w-6 h-6 text-emerald-600 mt-1" />
                                <div>
                                    <h3 className="font-bold text-slate-900">Visit Us</h3>
                                    <p className="text-sm text-slate-500 mb-1">Our Headquarters</p>
                                    <p className="text-slate-700 font-medium">
                                        Nyquist Tech<br />
                                        Bengaluru,<br />
                                        Karnataka, India
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ / Direct Message Placeholder */}
                    <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col justify-center text-center space-y-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-lg text-white">
                            <Mail className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Need immediate help?</h2>
                        <p className="text-slate-600">
                            Check out our Dashboard for AI tools, or email us directly. We typically respond within 24 hours.
                        </p>
                        <Link href="/login">
                            <button className="w-full py-3 px-4 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors">
                                Go to Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
