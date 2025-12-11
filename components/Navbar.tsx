import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, Menu } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-md shadow-sm">
            <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4">
                <Link href="/" className="flex items-center gap-3 font-bold text-2xl text-slate-900 hover:text-blue-600 transition-colors">
                    <img src="/logo.png" alt="EnglishGyani" className="h-14 w-14 rounded-xl shadow-md" />
                    EnglishGyani
                </Link>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
                    <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <Link href="/features" className="hover:text-blue-600 transition-colors">Features</Link>
                    <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
                    <Link href="/login">
                        <Button variant="ghost" className="text-slate-700">Login</Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="shadow-lg">Free mein shuru karo</Button>
                    </Link>
                </nav>
                <div className="md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><Menu /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild><Link href="/">Home</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/features">Features</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/pricing">Pricing</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/login">Login</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/dashboard">Dashboard</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
