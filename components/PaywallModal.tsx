"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/store";
import { Lock } from "lucide-react";
import { auth } from "@/lib/firebase"; // Assuming we will add auth logic
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function PaywallModal() {
    const { isPaywallOpen, setPaywallOpen, userId } = useUserStore();

    const router = useRouter();

    const handleLogin = () => {
        setPaywallOpen(false);
        router.push("/login"); // Direct to full login page
    };

    const handleUpgrade = () => {
        setPaywallOpen(false);
        router.push("/pricing");
    };

    return (
        <Dialog open={isPaywallOpen} onOpenChange={setPaywallOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center justify-center mb-4">
                        <div className="p-3 bg-orange-100 rounded-full">
                            <Lock className="w-8 h-8 text-orange-600" />
                        </div>
                    </div>
                    <DialogTitle className="text-center text-2xl font-bold">
                        {userId ? "Out of Credits" : "Login to Save Progress"}
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-500">
                        {userId
                            ? "You've used your 10 free credits for today. Upgrade to Premium for unlimited access."
                            : "You've reached the limit for guest users. Sign in to get 10 free daily credits!"}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3 py-4">
                    {!userId ? (
                        <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                            Go to Login Page
                        </Button>
                    ) : (
                        <Button onClick={handleUpgrade} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                            Upgrade to Premium (₹199/mo)
                        </Button>
                    )}
                    <Button variant="ghost" onClick={() => setPaywallOpen(false)}>
                        Maybe Later
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
