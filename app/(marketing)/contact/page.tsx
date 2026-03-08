
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
                            <a
                                href="https://wa.me/918431256903?text=Hi%20EnglishGyani%2C%20I%20need%20help"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-4 p-6 bg-green-50 rounded-xl border-2 border-green-200 hover:border-green-400 transition-colors group"
                            >
                                <svg className="w-7 h-7 text-green-600 mt-1" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                <div>
                                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                        WhatsApp Support
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Fastest</span>
                                    </h3>
                                    <p className="text-slate-600 text-sm mb-2">Get instant help. We reply within minutes during business hours.</p>
                                    <span className="text-green-600 font-bold text-lg group-hover:underline">
                                        +91 84312 56903
                                    </span>
                                </div>
                            </a>

                            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                                <Mail className="w-6 h-6 text-blue-600 mt-1" />
                                <div>
                                    <h3 className="font-bold text-slate-900">Email Support</h3>
                                    <p className="text-slate-600 text-sm mb-2">Best for account issues & detailed queries. We reply within 24 hours.</p>
                                    <a href="mailto:info@nyquisttech.com" className="text-blue-600 font-medium hover:underline">
                                        info@nyquisttech.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                                <Phone className="w-6 h-6 text-blue-600 mt-1" />
                                <div>
                                    <h3 className="font-bold text-slate-900">Phone</h3>
                                    <p className="text-slate-600 text-sm mb-2">Call us during business hours (Mon-Sat, 10 AM - 7 PM IST).</p>
                                    <a href="tel:+918431256903" className="text-blue-600 font-medium hover:underline">
                                        +91 84312 56903
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
                                <h4 className="font-bold text-slate-900">Is it a one-time payment? Will any money be auto-deducted?</h4>
                                <p className="text-slate-600 text-sm mt-1">
                                    Yes — one-time payment only. You pay once for the plan you choose (1 month, 3 months, or 1 year). No money is auto-deducted later. No surprise charges. We don&apos;t save your card for future payments.
                                </p>
                            </div>
                            <div className="p-4 border border-slate-200 rounded-lg">
                                <h4 className="font-bold text-slate-900">Do you offer refunds?</h4>
                                <p className="text-slate-600 text-sm mt-1">
                                    No. EnglishGyani is a digital product. All sales are final. We do not offer refunds once you have purchased and accessed the service. See our <a href="/refund-policy" className="text-blue-600 hover:underline">Refund Policy</a> for full details.
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
