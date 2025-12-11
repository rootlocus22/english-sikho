import Link from "next/link";
import { Brain } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="container max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 font-bold text-2xl text-white mb-4">
                            <img src="/logo.png" alt="EnglishGyani" className="h-14 w-14 rounded-xl shadow-lg" />
                            EnglishGyani
                        </Link>
                        <p className="text-sm text-slate-400 mb-4">
                            Apni Corporate English ko behtar banao. AI ke saath practice karo, bina kisi sharmindagi ke.
                        </p>
                        <p className="text-xs text-slate-500">
                            Made with ❤️ for Indian Professionals
                        </p>
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
                        <h3 className="font-semibold text-white mb-4">Seekhiye / Learn</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/learn/spoken-english-classes-near-me" className="hover:text-white transition-colors">Spoken English</Link></li>
                            <li><Link href="/learn/english-speaking-course" className="hover:text-white transition-colors">Speaking Course</Link></li>
                            <li><Link href="/learn/improve-english" className="hover:text-white transition-colors">Improve English</Link></li>
                            <li><Link href="/learn/basic-english-learning" className="hover:text-white transition-colors">Basic English</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    <p>© 2024 EnglishGyani. Sabhi adhikaar surakshit / All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
