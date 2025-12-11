"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Check, Sparkles, Zap, GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PremiumWelcomePage() {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        // Trigger confetti
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-6 ring-4 ring-white/30">
                            <Sparkles className="w-10 h-10 text-yellow-300" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                            Welcome to Premium!
                        </h1>
                        <p className="text-blue-100 text-lg md:text-xl font-medium">
                            Your journey to English mastery just got supercharged. 🚀
                        </p>
                    </motion.div>
                </div>

                <div className="p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                                Unlocked Features
                            </h2>
                            <ul className="space-y-4">
                                <FeatureItem text="Unlimited AI Speaking Coach" />
                                <FeatureItem text="Advanced Tone Analysis" />
                                <FeatureItem text="Priority AI Processing" />
                                <FeatureItem text="Personalized Progress Reports" />
                                <FeatureItem text="Ad-free Experience" />
                            </ul>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-center">
                            <div className="text-center mb-6">
                                <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Credits Added</span>
                                <div className="text-5xl font-extrabold text-blue-600 mt-2">9,999</div>
                                <p className="text-slate-600 mt-2 text-sm">
                                    You have plenty of credits to practice without limits.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <Button
                                    size="lg"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 text-lg shadow-lg shadow-blue-200 transition-all hover:scale-[1.02]"
                                    onClick={() => router.push("/dashboard/coach")}
                                >
                                    <GraduationCap className="w-5 h-5 mr-2" />
                                    Start Practicing Now
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-bold h-12"
                                    onClick={() => router.push("/dashboard")}
                                >
                                    Go to Dashboard
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-slate-700 font-medium"
        >
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-green-600" />
            </div>
            {text}
        </motion.li>
    );
}
