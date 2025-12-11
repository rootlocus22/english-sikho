"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle2, Globe2, Sparkles, Star, Zap, Rocket } from "lucide-react";
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useUserStore } from "@/lib/store";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

import { Suspense } from "react";

function SignupPageContent() {
    const { setUserId, setUserData } = useUserStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect') || '/dashboard';

    // Auth logic is same as login for Google
    const handleGoogleSignup = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            setUserId(user.uid);

            const { db } = await import("@/lib/firebase");
            const { doc, setDoc } = await import("firebase/firestore");

            const newUserData = {
                email: user.email || "",
                displayName: user.displayName,
                photoURL: user.photoURL,
                isPremium: false,
                credits: 10,
                createdAt: new Date().toISOString()
            };

            await setDoc(doc(db, "users", user.uid), newUserData);

            setUserData(newUserData);

            toast.success(`Account created! Welcome, ${user.displayName || 'Friend'}!`);
            router.push(redirectUrl);
        } catch (error: any) {
            console.error("Signup error:", error);
            toast.error("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;

            await updateProfile(user, { displayName: name });
            setUserId(user.uid);

            const { db } = await import("@/lib/firebase");
            const { doc, setDoc } = await import("firebase/firestore");

            const newUserData = {
                email: user.email || "",
                displayName: name,
                photoURL: user.photoURL,
                isPremium: false,
                credits: 10,
                createdAt: new Date().toISOString()
            };

            await setDoc(doc(db, "users", user.uid), newUserData);
            setUserData(newUserData);

            toast.success(`Welcome, ${name}!`);
            router.push(redirectUrl);
        } catch (error: any) {
            console.error("Signup error:", error);
            toast.error(error.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">

            {/* Left Side - Success Branding */}
            <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-purple-600 to-indigo-900 text-white p-12 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('https://resumegyani.in/grid.svg')] opacity-20"></div>

                {/* Animated Blobs */}
                <div className="absolute top-24 -right-24 w-96 h-96 bg-pink-500 rounded-full blur-[128px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-24 -left-24 w-80 h-80 bg-blue-500 rounded-full blur-[128px] opacity-20 animate-pulse delay-700"></div>

                {/* Header */}
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-white/90 font-medium mb-8">
                        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/10">
                            <Brain className="w-6 h-6" />
                        </div>
                        EnglishGyani
                    </div>

                    <h1 className="text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-pink-200 to-indigo-200 bg-clip-text text-transparent">
                        Start Your Journey to Fluency
                    </h1>
                    <p className="text-xl text-indigo-100/80 max-w-lg leading-relaxed">
                        Create your free account today and get 10 AI credits immediately.
                    </p>
                </div>

                {/* Value Props */}
                <div className="relative z-10 space-y-6">
                    <FeatureItem icon={<Rocket className="w-5 h-5 text-orange-400" />} text="10 Free Practice Credits" />
                    <FeatureItem icon={<Sparkles className="w-5 h-5 text-yellow-400" />} text="Personalized AI Coach" />
                    <FeatureItem icon={<Globe2 className="w-5 h-5 text-blue-400" />} text="Real-world Scenarios" />
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
                        "I was hesitant, but the free trial convinced me. Now I can't start my day without a practice session!"
                    </blockquote>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center font-bold text-sm">
                            NS
                        </div>
                        <div>
                            <div className="font-bold">Neha Singh</div>
                            <div className="text-sm text-indigo-200">Marketing Manager</div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-8 text-sm text-indigo-200/60">
                    No credit card required for signup.
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex flex-col items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    {/* Form Header */}
                    <div className="text-center">
                        <div className="lg:hidden flex justify-center mb-6">
                            <img src="/logo.png" alt="EnglishGyani" className="h-24 w-24 rounded-2xl shadow-xl" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="text-gray-600 mt-2 font-medium">Free credits aapka wait kar rahe hain!</p>
                    </div>

                    {/* Google Button */}
                    <Button
                        size="lg"
                        variant="outline"
                        className="w-full h-14 text-base font-medium relative bg-white hover:bg-gray-50 border-gray-300 text-gray-700 shadow-sm"
                        onClick={handleGoogleSignup}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-3" />
                        )}
                        Sign up with Google
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-300" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-500 font-medium">Or confirm with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleEmailSignup} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Rahul Dubey"
                            />
                        </div>
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
                            {loading ? "Creating Account..." : "Create Free Account"}
                        </Button>
                    </form>

                    {/* Footer Info */}
                    <div className="text-center space-y-4">
                        <p className="text-xs text-slate-500">
                            By joining, you agree to our <a href="#" className="underline decoration-slate-400 hover:text-blue-700">Terms of Service</a> and <a href="#" className="underline decoration-slate-400 hover:text-blue-700">Privacy Policy</a>.
                        </p>

                        <div className="pt-6 border-t border-slate-200">
                            <p className="text-sm text-slate-600">
                                Already have an account?{" "}
                                <Link href="/login" className="text-blue-700 font-bold hover:underline">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SignupPageContent />
        </Suspense>
    );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <div className="flex items-center gap-4 text-indigo-50/90 font-medium p-3 rounded-lg hover:bg-white/5 transition-colors cursor-default">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/10 shadow-sm">
                {icon}
            </div>
            {text}
        </div>
    )
}
