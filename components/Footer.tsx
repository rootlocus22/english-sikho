import Link from "next/link";
import { Brain } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="container max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 font-bold text-xl text-white mb-4">
                            <img src="/logo.png" alt="EnglishGyani" className="h-10 w-10 rounded-xl shadow-lg" />
                            EnglishGyani
                        </Link>
                        <p className="text-sm text-slate-400 mb-4">
                            Apni Corporate English ko behtar banao. AI ke saath practice karo.
                        </p>
                        <div className="text-xs text-slate-500">
                            <p>Operated by Nyquist Tech</p>
                            <p>Bengaluru, India</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                            <li><Link href="/login" className="hover:text-white transition-colors">Login / Sign Up</Link></li>
                        </ul>
                    </div>

                    {/* Learn */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Seekhiye (Learn)</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/learn/spoken-english-classes-near-me" className="hover:text-white transition-colors">Spoken English</Link></li>
                            <li><Link href="/learn/english-speaking-course" className="hover:text-white transition-colors">Speaking Course</Link></li>
                            <li><Link href="/learn/improve-english" className="hover:text-white transition-colors">Improve English</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© 2024 EnglishGyani by Nyquist Tech. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-slate-300">Privacy</Link>
                        <Link href="/terms" className="hover:text-slate-300">Terms</Link>
                        <Link href="/contact" className="hover:text-slate-300">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
