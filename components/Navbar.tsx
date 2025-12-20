import Link from "next/link";
import { TrackedLink } from "@/components/ui/tracked-elements";
import { Button } from "@/components/ui/button";
import { Menu, Sparkles } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    return (
        <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50 transition-all duration-300">
            <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground hover:opacity-80 transition-opacity">
                    <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                        <Sparkles className="w-5 h-5 fill-primary/20" />
                    </div>
                    <span>EnglishGyani</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <div className="relative group">
                        <button className="flex items-center gap-1 hover:text-primary transition-colors focus:outline-none">
                            Free Tools
                        </button>
                        {/* Hover Dropdown */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                            <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 w-64 grid gap-1">
                                <TrackedLink
                                    href="/tools/whatsapp-to-email"
                                    className="flex flex-col p-3 hover:bg-slate-50 rounded-lg transition-colors"
                                    eventData={{ action: 'click_nav_tool', category: 'navigation', label: 'whatsapp_tool' }}
                                >
                                    <span className="text-slate-900 font-semibold mb-0.5">WhatsApp se Email</span>
                                    <span className="text-xs text-slate-500">Toota-phoota likho, perfect paao</span>
                                </TrackedLink>
                                <TrackedLink
                                    href="/tools/self-introduction-generator"
                                    className="flex flex-col p-3 hover:bg-slate-50 rounded-lg transition-colors"
                                    eventData={{ action: 'click_nav_tool', category: 'navigation', label: 'intro_generator' }}
                                >
                                    <span className="text-slate-900 font-semibold mb-0.5">Self Introduction</span>
                                    <span className="text-xs text-slate-500">Interview ke liye</span>
                                </TrackedLink>
                                <div className="h-px bg-slate-100 my-1" />
                                <TrackedLink
                                    href="/tools"
                                    className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors text-blue-600"
                                    eventData={{ action: 'click_nav_all_tools', category: 'navigation', label: 'view_all' }}
                                >
                                    <span className="font-semibold">Sabhi Tools Dekhein</span>
                                    <span className="text-lg">→</span>
                                </TrackedLink>
                            </div>
                        </div>
                    </div>

                    <Link href="/features" className="hover:text-primary transition-colors">Kaise Kaam Karta Hai</Link>
                    <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
                    <div className="h-4 w-px bg-border" />
                    <Link href="/login">
                        <Button variant="ghost" className="hover:bg-primary/5 hover:text-primary">Log in</Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105">Free mein Start karein</Button>
                    </Link>
                </nav>
                <div className="md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><Menu className="w-5 h-5" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem asChild><Link href="/tools">Free Tools</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/tools/whatsapp-to-email">WhatsApp se Email</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/features">Kaise Kaam Karta Hai</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/pricing">Pricing</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/login">Log in</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/signup" className="text-primary font-bold">Start Free</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
