"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { getUserData } from "@/lib/firestore";
import { useUserStore } from "@/lib/store";
import { Loader2 } from "lucide-react";
import { doc, onSnapshot } from "firebase/firestore";

import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { VoiceSelector } from "@/components/VoiceSelector"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { userId, setUserId, setUserData } = useUserStore();

    // Real-time Firestore listener for credit updates
    useEffect(() => {
        if (!userId) return;

        console.log("Setting up real-time Firestore listener for user:", userId);
        const userDocRef = doc(db, "users", userId);

        const unsubscribeFirestore = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                console.log("Real-time update from Firestore:", data);
                setUserData({
                    email: data.email,
                    displayName: data.displayName,
                    photoURL: data.photoURL,
                    isPremium: data.isPremium || false,
                    credits: data.credits || 0
                });
            }
        }, (error) => {
            console.error("Firestore listener error:", error);
        });

        return () => {
            console.log("Cleaning up Firestore listener");
            unsubscribeFirestore();
        };
    }, [userId, setUserData]);

    useEffect(() => {
        // Safety timeout
        const timeout = setTimeout(() => {
            console.error("Auth check timed out");
            setLoading(false);
            router.replace("/login");
        }, 5000);

        if (!auth) {
            console.log("Firebase auth not initialized");
            clearTimeout(timeout);
            setLoading(false);
            const currentPath = window.location.pathname;
            router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log("User authenticated:", user.uid);
                setUserId(user.uid);

                // Fetch real user data from Firestore
                try {
                    const userData = await getUserData(user.uid);
                    if (userData) {
                        console.log("User data fetched from Firestore:", userData);
                        setUserData({
                            email: userData.email,
                            displayName: userData.displayName,
                            photoURL: userData.photoURL,
                            isPremium: userData.isPremium,
                            credits: userData.credits
                        });
                    } else {
                        // User not found in Firestore, might be new user
                        console.log("User not found in Firestore, using auth data");
                        setUserData({
                            email: user.email || "",
                            displayName: user.displayName,
                            photoURL: user.photoURL,
                            isPremium: false,
                            credits: 10
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    // Fallback to auth data
                    setUserData({
                        email: user.email || "",
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        isPremium: false,
                        credits: 10
                    });
                }

                clearTimeout(timeout);
                setLoading(false);
            } else {
                console.log("No user authenticated");
                setUserId(null);
                clearTimeout(timeout);
                // Redirect with return URL
                const currentPath = window.location.pathname;
                router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
            }
        });

        return () => {
            clearTimeout(timeout);
            unsubscribe();
        };
    }, [router, setUserId, setUserData]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
                <div className="text-center space-y-4">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto" />
                    <p className="text-slate-600 font-medium">Aapka dashboard load ho raha hai...</p>
                </div>
            </div>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-white/20 px-4 bg-white/70 backdrop-blur-md shadow-sm">
                    <div className="flex items-center gap-2 flex-1">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/dashboard">EnglishGyani</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    {/* Voice Selector - Central Control */}
                    <div className="flex items-center gap-2">
                        <VoiceSelector />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 bg-slate-50 min-h-[calc(100vh-4rem)] overflow-x-hidden">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
