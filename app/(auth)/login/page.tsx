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

            toast.success(`Welcome back ${user.displayName || 'Gyani'}!`);
            event({
                action: "login",
                category: "engagement",
                label: "email_login"
            });
            router.push(redirectUrl);
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
            <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-indigo-600 to-purple-900 text-white p-12 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('https://resumegyani.in/grid.svg')] opacity-20"></div>

                {/* Floating Blobs */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-[128px] opacity-30 animate-pulse"></div>
                <div className="absolute top-1/2 -right-24 w-64 h-64 bg-purple-500 rounded-full blur-[128px] opacity-30 animate-pulse delay-1000"></div>

                {/* Header */}
                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 text-white/90 font-medium mb-8 hover:opacity-80 transition-opacity w-fit">
                        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/10">
                            <Brain className="w-6 h-6" />
                        </div>
                        EnglishGyani
                    </Link>

                    <h1 className="text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                        Master Professional English with AI
                    </h1>
                    <p className="text-xl text-blue-100/80 max-w-lg leading-relaxed">
                        Join india's fastest growing community of professionals upgrading their communication skills.
                    </p>
                </div>

                {/* Features List */}
                <div className="relative z-10 space-y-6">
                    <FeatureItem icon={<Zap className="w-5 h-5 text-yellow-500" />} text="Instant AI Speech Analysis" />
                    <FeatureItem icon={<Globe2 className="w-5 h-5 text-blue-400" />} text="Hinglish to Professional English" />
                    <FeatureItem icon={<CheckCircle2 className="w-5 h-5 text-green-400" />} text="Daily Practice Scenarios" />
                </div>

                {/* Testimonial */}
                <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 mt-12">
                    <div className="flex gap-1 text-yellow-400 mb-3">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                    </div>
                    <blockquote className="text-lg font-medium mb-4">
                        "The Speaking Coach is a game changer! My confidence in meetings has doubled in just 2 weeks."
                    </blockquote>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center font-bold text-sm">
                            AD
                        </div>
                        <div>
                            <div className="font-bold">Amit Dubey</div>
                            <div className="text-sm text-blue-200">Senior Developer at TechGlobal</div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-8 text-sm text-blue-200/60">
                    Trusted by 10,000+ Indians 🇮🇳
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex flex-col items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    {/* Form Header */}
                    <div className="text-center">
                        <div className="lg:hidden flex justify-center mb-6">
                            <img src="/logo.png" alt="EnglishGyani" className="h-24 w-24 rounded-2xl shadow-xl" />
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
        </div>
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
