import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-foreground text-background">
            <div className="container max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-foreground tracking-tight hover:opacity-80 transition-opacity">
                            <div className="bg-background/10 p-1.5 rounded-lg text-background">
                                <Sparkles className="w-5 h-5 fill-background/20" />
                            </div>
                            <span>EnglishGyani</span>
                        </Link>
                        <p className="text-sm text-muted-foreground/80 leading-relaxed">
                            Apni corporate English ko master karein with India's most advanced AI coach. Daily practice, real improvement.
                        </p>
                        <div className="text-xs text-muted-foreground/60 pt-4">
                            <p className="font-medium text-muted-foreground">Operated by Nyquist Tech</p>
                            <p>Bengaluru, India</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-primary-foreground mb-6 text-sm uppercase tracking-wider">Platform</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground/80">
                            <li><Link href="/features" className="hover:text-primary-foreground transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-primary-foreground transition-colors">Pricing</Link></li>
                            <li><Link href="/dashboard" className="hover:text-primary-foreground transition-colors">Dashboard</Link></li>
                            <li><Link href="/login" className="hover:text-primary-foreground transition-colors">Login / Sign Up</Link></li>
                        </ul>
                    </div>

                    {/* Learn */}
                    <div>
                        <h3 className="font-bold text-primary-foreground mb-6 text-sm uppercase tracking-wider">Seekhiye (Resources)</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground/80">
                            <li><Link href="/learn/spoken-english-classes-near-me" className="hover:text-primary-foreground transition-colors">Spoken English</Link></li>
                            <li><Link href="/learn/english-speaking-course" className="hover:text-primary-foreground transition-colors">Speaking Course</Link></li>
                            <li><Link href="/learn/improve-english" className="hover:text-primary-foreground transition-colors">Improve English</Link></li>
                            <li><Link href="/dashboard/templates" className="hover:text-primary-foreground transition-colors">Templates</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-bold text-primary-foreground mb-6 text-sm uppercase tracking-wider">Company</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground/80">
                            <li><Link href="/about" className="hover:text-primary-foreground transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary-foreground transition-colors">Contact Us</Link></li>
                            <li><Link href="/refund-policy" className="hover:text-primary-foreground transition-colors">Refund Policy</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary-foreground transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/50">
                    <p>© 2024 EnglishGyani by Nyquist Tech. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-primary-foreground transition-colors">Terms</Link>
                        <Link href="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
