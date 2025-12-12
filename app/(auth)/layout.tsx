import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <main className="flex-1 w-full">
                {children}
            </main>
        </div>
    );
}
