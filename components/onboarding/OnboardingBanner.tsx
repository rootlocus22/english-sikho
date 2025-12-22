"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OnboardingBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Check if user has dismissed the banner
        const dismissed = localStorage.getItem('onboarding-banner-dismissed');
        if (!dismissed) {
            setIsVisible(true);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
        localStorage.setItem('onboarding-banner-dismissed', 'true');
    };

    if (!isVisible || isDismissed) return null;

    return (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="container max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl">🎯</span>
                        <div className="flex-1">
                            <p className="font-medium">Get a personalized learning experience!</p>
                            <p className="text-sm text-white/80">
                                Complete quick setup (2 min) to see features tailored for your goals
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/onboarding">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="bg-white text-blue-600 hover:bg-white/90"
                            >
                                Personalize Now
                            </Button>
                        </Link>
                        <button
                            onClick={handleDismiss}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Dismiss"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
