import Link from 'next/link';
import { ArrowLeft, Brain, Globe2, Heart, Users } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
                    <Link href="/" className="inline-flex items-center text-sm text-blue-100 hover:text-white mb-6 group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold mb-4">About EnglishGyani</h1>
                    <p className="text-xl text-blue-100">Empowering Indian professionals with AI-driven communication skills.</p>
                </div>

                <div className="p-8 md:p-12 space-y-12">
                    {/* Mission */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            At EnglishGyani (operated by Nyquist Tech), we believe that language shouldn't be a barrier to professional success. Our mission is to democratize high-quality, personalized English coaching using cutting-edge AI technology, making it accessible and affordable for everyone in India.
                        </p>
                    </section>

                    {/* Values Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-slate-50 rounded-xl">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Brain className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2">AI Innovation</h3>
                            <p className="text-sm text-slate-500">Leveraging the latest in NLP and speech analysis to provide instant, accurate feedback.</p>
                        </div>
                        <div className="text-center p-6 bg-slate-50 rounded-xl">
                            <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2">User Focused</h3>
                            <p className="text-sm text-slate-500">Built specifically for the Indian context, understanding local nuances and challenges.</p>
                        </div>
                        <div className="text-center p-6 bg-slate-50 rounded-xl">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe2 className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2">Accessibility</h3>
                            <p className="text-sm text-slate-500">Quality education should be available to all, regardless of location or background.</p>
                        </div>
                    </div>

                    {/* Team/Company Info */}
                    <section className="bg-slate-50 p-8 rounded-xl border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <Users className="w-6 h-6 text-slate-500" />
                            Who We Are
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p>
                                EnglishGyani is a product of <strong>Nyquist Tech</strong>, a technology company based in the tech hub of India. We are a team of engineers, educators, and designers passionate about solving real-world problems through technology.
                            </p>
                            <div className="mt-6 pt-6 border-t border-slate-200">
                                <p className="font-medium text-slate-900">Nyquist Tech</p>
                                <p>Bengaluru, Karnataka, India</p>
                                <p>Email: <a href="mailto:support@nyquisttech.com" className="text-blue-600 hover:underline">support@nyquisttech.com</a></p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
