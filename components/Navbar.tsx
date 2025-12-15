import Link from "next/link";
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
                    <Link href="/features" className="hover:text-primary transition-colors">Features</Link>
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
                            <DropdownMenuItem asChild><Link href="/features">Features</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/pricing">Pricing</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/login">Log in</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/signup" className="text-primary font-bold">Sign up Free</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
