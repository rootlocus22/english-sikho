"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function StickyCTA({
    phrase,
    intentCategory
}: {
    phrase: string;
    intentCategory: string;
}) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling down 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={cn(
                "fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t shadow-lg z-50 transition-transform duration-300",
                isVisible ? "translate-y-0" : "translate-y-full"
            )}
        >
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                <div className="hidden md:block">
                    <p className="text-sm font-medium text-muted-foreground">
                        Don&apos;t just read it. Practice speaking it.
                    </p>
                    <p className="text-xs text-muted-foreground/80">
                        Get instant feedback on your pronunciation and tone.
                    </p>
                </div>
                <div className="flex-1 md:flex-none">
                    <Button
                        size="lg"
                        className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md animate-pulse-slow"
                        asChild
                    >
                        <Link href="/dashboard">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Practice &quot;{phrase}&quot; with AI Coach
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
