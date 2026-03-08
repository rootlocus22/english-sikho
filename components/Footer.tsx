import Link from "next/link";
import { Sparkles } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
    return (
        <footer className="bg-[#213E8C] text-white">
            <div className="container max-w-7xl mx-auto px-4 py-12">
                {/* Top Section - Logo and Description */}
                <div className="mb-12">
                    <BrandLogo eventData={{ action: 'click_footer_logo', category: 'navigation', label: 'home' }} />
                    <p className="text-white/80 leading-relaxed max-w-xl mt-4 text-sm">
                        Master Business English with India's most advanced AI coach. Get instant feedback on grammar, pronunciation, and professional communication. Daily practice, real improvement.
                    </p>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    {/* Learning Tools */}
                    <div>
                        <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Learning Tools</h3>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li><Link href="/dashboard" className="hover:text-white transition-colors">AI English Coach</Link></li>
                            <li><Link href="/dashboard/speaking" className="hover:text-white transition-colors">Speaking Practice</Link></li>
                            <li><Link href="/dashboard/grammar" className="hover:text-white transition-colors">Grammar Checker</Link></li>
                            <li><Link href="/dashboard/translator" className="hover:text-white transition-colors">Translator</Link></li>
                            <li><Link href="/dashboard/tone" className="hover:text-white transition-colors">Tone Rewriter</Link></li>
                        </ul>
                    </div>

                    {/* By Skill */}
                    <div>
                        <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">By Skill</h3>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li><Link href="/learn/spoken-english-classes-near-me" className="hover:text-white transition-colors">Spoken English</Link></li>
                            <li><Link href="/learn/english-speaking-course" className="hover:text-white transition-colors">Speaking Course</Link></li>
                            <li><Link href="/learn/improve-english" className="hover:text-white transition-colors">Improve English</Link></li>
                            <li><Link href="/dashboard/interview-prep" className="hover:text-white transition-colors">Interview Prep</Link></li>
                            <li><Link href="/dashboard/templates" className="hover:text-white transition-colors">Email Templates</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Resources</h3>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li><Link href="/corporate-phrasebook" className="hover:text-white transition-colors">Phrasebook</Link></li>
                            <li><Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link></li>
                            <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal & Support */}
                    <div>
                        <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Legal & Support</h3>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Contact Info Bar */}
                <div className="border-t border-white/10 pt-8 mb-8">
                    <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
                        <a href="mailto:info@nyquisttech.com" className="flex items-center gap-2 hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            info@nyquisttech.com
                        </a>
                        <a
                            href="https://wa.me/918431256903?text=Hi%20EnglishGyani%2C%20I%20need%20help"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-green-400 transition-colors"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            WhatsApp: +91 84312 56903
                        </a>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Bengaluru, India
                        </div>
                    </div>
                </div>

                {/* Bottom Bar - Copyright */}
                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
                    <p>© 2024 EnglishGyani by Nyquist Tech. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <span>🌟 Trusted by 10,000+ Professionals</span>
                        <span>🇮🇳 Made for Bharat</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
