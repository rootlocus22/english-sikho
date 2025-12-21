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
                        <a href="mailto:support@englishgyani.com" className="flex items-center gap-2 hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            support@englishgyani.com
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
