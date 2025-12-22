"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TrackedButton } from "@/components/ui/tracked-elements";
import { Brain, CheckCircle2, Globe2, Sparkles, Star, Zap } from "lucide-react";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useUserStore } from "@/lib/store";
import { event } from "@/lib/analytics";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

import { Suspense } from "react";

function LoginPageContent() {
    const { setUserId, setUserData } = useUserStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect') || '/dashboard';
    const message = searchParams.get('message');

    // Show message if present (one time)
    useEffect(() => {
        if (message) {
            toast.info(message);
        }
    }, [message]);

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Set user ID immediately
            setUserId(user.uid);

            const { db } = await import("@/lib/firebase");
            const { doc, getDoc, setDoc } = await import("firebase/firestore");
            const userDocRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userDocRef);

            if (userSnap.exists()) {
                const data = userSnap.data();
                setUserData({
                    email: data.email,
                    displayName: data.displayName,
                    photoURL: data.photoURL,
                    isPremium: data.isPremium || false,
                    credits: data.credits ?? 10
                });
            } else {
                // If user doesn't exist (e.g. first login via Google without explicit signup flow), create doc
                const now = new Date();
                const newUserData = {
                    email: user.email || "",
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    isPremium: false,
                    credits: 10,
                    totalSessionsUsed: 0,
                    createdAt: now.toISOString(),
                    updatedAt: now.toISOString(),
                    lastSessionAt: now.toISOString(),
                    subscription: {
                        tier: 'free',
                        plan: null,
                        status: 'active',
                        startDate: now.toISOString(),
                        endDate: null,
                        renewalDate: null,
                        amount: 0,
                        currency: 'INR',
                        autoRenew: false
                    }
                };
                await setDoc(userDocRef, newUserData);
                setUserData({
                    email: newUserData.email,
                    displayName: newUserData.displayName,
                    photoURL: newUserData.photoURL,
                    isPremium: newUserData.isPremium,
                    credits: newUserData.credits
                });
            }

            toast.success(`Swagat hai ${user.displayName || 'Gyani'}!`);
            event({
                action: "login",
                category: "engagement",
                label: "google_login"
            });
            router.push(redirectUrl);
        } catch (error: any) {
            console.error("Login error:", error);
            toast.error("Login nahi ho paya. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;

            setUserId(user.uid);

            const { db } = await import("@/lib/firebase");
            const { doc, getDoc, setDoc } = await import("firebase/firestore");
            const userDocRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userDocRef);

            if (userSnap.exists()) {
                const data = userSnap.data();
                setUserData({
                    email: data.email,
                    displayName: data.displayName,
                    photoURL: data.photoURL,
                    isPremium: data.isPremium || false,
                    credits: data.credits ?? 10
                });
            } else {
                // Fallback if doc missing
                const now = new Date();
                const newUserData = {
                    email: user.email || "",
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    isPremium: false,
                    credits: 10,
                    totalSessionsUsed: 0,
                    createdAt: now.toISOString(),
                    updatedAt: now.toISOString(),
                    lastSessionAt: now.toISOString(),
                    subscription: {
                        tier: 'free',
                        plan: null,
                        status: 'active',
                        startDate: now.toISOString(),
                        endDate: null,
                        renewalDate: null,
                        amount: 0,
                        currency: 'INR',
                        autoRenew: false
                    }
                };
                await setDoc(userDocRef, newUserData);
                setUserData({
                    email: newUserData.email,
                    displayName: newUserData.displayName,
                    photoURL: newUserData.photoURL,
                    isPremium: newUserData.isPremium,
                    credits: newUserData.credits
                });
            }

            // Track login event
            event({
                action: "login",
                category: "engagement",
                label: "email_login"
            });

            // Check if user has completed onboarding
            const { hasCompletedOnboarding } = await import("@/lib/userProfile");
            const completed = await hasCompletedOnboarding(user.uid);

            if (!completed) {
                toast.success("Welcome back! Let's personalize your experience.");
                router.push('/onboarding');
            } else {
                toast.success(`Welcome back ${user.displayName || 'Gyani'}!`);
                router.push(redirectUrl);
            }
        } catch (error: any) {
            console.error("Login error:", error);
            toast.error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">

            {/* Left Side - Hero/Branding (Hidden on mobile) */}
            <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#213E8C] to-[#0f1d3d] text-white p-12 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('https://resumegyani.in/grid.svg')] opacity-20"></div>

                {/* Floating Blobs */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#3a5baa] rounded-full blur-[128px] opacity-30 animate-pulse"></div>
                <div className="absolute top-1/2 -right-24 w-64 h-64 bg-[#2a4987] rounded-full blur-[128px] opacity-30 animate-pulse delay-1000"></div>

                {/* Header */}
                <div className="relative z-10">
                    <div className="mb-8">
                        <BrandLogo eventData={{ action: 'click_login_logo', category: 'navigation', label: 'home_from_login' }} />
                    </div>

                    <h1 className="text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-blue-100 to-cyan-100 bg-clip-text text-transparent">
                        Welcome Back to Your English Journey
                    </h1>
                    <p className="text-xl text-blue-100/80 max-w-lg leading-relaxed">
                        Continue improving your professional English with daily AI-powered practice sessions.
                    </p>
                </div>

                {/* Feature Points */}
                <div className="relative z-10 space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                            <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Daily Practice Sessions</h3>
                            <p className="text-blue-100/70 text-sm">Resume your personalized learning path</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                            <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">AI-Powered Feedback</h3>
                            <p className="text-blue-100/70 text-sm">Get instant corrections and suggestions</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                            <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Real Conversations</h3>
                            <p className="text-blue-100/70 text-sm">Practice with workplace scenarios</p>
                        </div>
                    </div>
                </div>

                {/* Testimonial */}
                <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <p className="text-blue-50 mb-4 italic leading-relaxed">
                        "I use EnglishGyani every morning before work. My confidence in client calls has improved dramatically!"
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center font-bold">
                            NS
                        </div>
                        <div>
                            <div className="font-bold">Neha Singh</div>
                            <div className="text-sm text-blue-200">Marketing Manager</div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-8 text-sm text-blue-200/60">
                    Secure login • Your data is encrypted
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex flex-col items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    {/* Form Header */}
                    <div className="text-center">
                        <div className="lg:hidden flex justify-center mb-6">
                            <BrandLogo eventData={{ action: 'click_login_logo_mobile', category: 'navigation', label: 'home_from_login' }} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="text-gray-600 mt-2 font-medium">Apni learning journey continue karein</p>
                    </div>

                    {/* Google Button */}
                    <TrackedButton
                        size="lg"
                        variant="outline"
                        className="w-full h-14 text-base font-medium relative bg-white hover:bg-gray-50 border-gray-300 text-gray-700 shadow-sm"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        eventData={{ action: 'click_login_google', category: 'engagement', label: 'google_auth_attempt' }}
                    >
                        {loading ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-3" />
                        )}
                        Continue with Google
                    </TrackedButton>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-300" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-500 font-medium">Or log in with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="rahul@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold"
                            disabled={loading}
                        >
                            {loading ? "Logging In..." : "Log In"}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-300" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-500 font-medium">Secure Access</span>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="text-center space-y-4">
                        <p className="text-xs text-slate-500">
                            By continuing, you agree to our <a href="#" className="underline decoration-slate-400 hover:text-blue-700">Terms of Service</a> and <a href="#" className="underline decoration-slate-400 hover:text-blue-700">Privacy Policy</a>.
                        </p>

                        <div className="pt-6">
                            <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors group">
                                <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <LoginPageContent />
        </Suspense>
    );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <div className="flex items-center gap-4 text-blue-50/90 font-medium p-3 rounded-lg hover:bg-white/5 transition-colors cursor-default">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/10 shadow-sm">
                {icon}
            </div>
            {text}
        </div>
    )
}
