"use client"

import * as React from "react"
import {
    BookOpen,
    Brain,
    Dumbbell,
    Image as ImageIcon,
    LifeBuoy,
    Send,
    SlidersHorizontal,
    Sparkles,
    Mic,
    User,
    Briefcase,
    TrendingUp,
    Award,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    useSidebar,
} from "@/components/ui/sidebar"
import { useUserStore } from "@/lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { TrackedLink } from "@/components/ui/tracked-elements";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

// Menu items
const navMain = [
    {
        title: "Fix My English",
        titleHindi: "Apni English Sudharo",
        url: "/dashboard",
        icon: SlidersHorizontal,
    },
    {
        title: "Reply Helper",
        titleHindi: "Reply Dhundho",
        url: "/dashboard/reply-helper",
        icon: ImageIcon,
    },
    {
        title: "Practice Gym",
        titleHindi: "Practice Kamra",
        url: "/dashboard/gym",
        icon: Dumbbell,
    },
    {
        title: "Speaking Coach",
        titleHindi: "Bolne ka Practice",
        url: "/dashboard/coach",
        icon: Mic,
    },
    {
        title: "Templates",
        titleHindi: "Ready Templates",
        url: "/dashboard/templates",
        icon: BookOpen,
    },
    {
        title: "Interview Prep",
        titleHindi: "Interview Prep",
        url: "/dashboard/interview-prep",
        icon: Briefcase,
        isPro: true
    },
    {
        title: "Analytics",
        titleHindi: "Analytics",
        url: "/dashboard/analytics",
        icon: TrendingUp,
        isPro: true
    },
    {
        title: "Certificates",
        titleHindi: "Certificates",
        url: "/dashboard/certificates",
        icon: Award,
        isPro: true
    },
    {
        title: "My Profile",
        titleHindi: "Mera Profile",
        url: "/dashboard/profile",
        icon: User,
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const router = useRouter();
    const { userId, userData, setUserId, setUserData } = useUserStore();
    const { displayName, email, photoURL, isPremium, credits } = userData || { credits: 0, isPremium: false };
    const { setOpenMobile } = useSidebar();

    const getUserInitials = () => {
        if (displayName) {
            return displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        }
        return 'U';
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUserId(null);
            setUserData(null);
            toast.success("Logged out successfully!");
            router.push("/");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to logout. Please try again.");
        }
    };

    // Close sidebar on mobile when navigating
    const handleNavClick = () => {
        setOpenMobile(false);
    };

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <TrackedLink
                                href="/dashboard"
                                eventData={{ action: 'click_sidebar_logo', category: 'navigation', label: 'dashboard_home' }}
                            >
                                <img src="/logo.png" alt="EnglishGyani" className="h-12 w-12 rounded-xl shadow-md" />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold text-base">EnglishGyani</span>
                                    <span className="truncate text-xs">AI Coach</span>
                                </div>
                            </TrackedLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {/* Credit Display - Top */}
                <div className="px-4 py-3">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-bold text-blue-900">
                                {isPremium ? "Pro Credits" : "Free Credits"}
                            </h4>
                            <Sparkles className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="text-2xl font-extrabold text-blue-600 mb-1">
                            {isPremium ? "Unlimited" : credits}
                        </div>
                        <p className="text-xs text-blue-700">
                            {isPremium ? "Enjoy unlimited sessions!" : `${credits} sessions aaj ke liye`}
                        </p>
                        {!isPremium && (
                            <TrackedLink
                                href="/dashboard/upgrade"
                                onClick={handleNavClick}
                                eventData={{ action: 'click_sidebar_upgrade', category: 'ecommerce', label: 'upgrade_to_pro' }}
                            >
                                <Button size="sm" className="w-full mt-3 text-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md">
                                    Upgrade to Pro 🚀
                                </Button>
                            </TrackedLink>
                        )}
                    </div>
                </div>

                <SidebarGroup>
                    <SidebarGroupLabel>Tools / Saadhan</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navMain.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.titleHindi}>
                                        <TrackedLink
                                            href={item.url}
                                            onClick={handleNavClick}
                                            eventData={{ action: 'click_sidebar_item', category: 'navigation', label: item.title }}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                            {item.isPro && (
                                                <Badge className="ml-auto bg-blue-600 text-white text-[10px]">PRO</Badge>
                                            )}
                                        </TrackedLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={photoURL || ""} alt={displayName || "User"} />
                                <AvatarFallback className="rounded-lg bg-blue-600 text-white">
                                    {getUserInitials()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {displayName || "English Learner"}
                                </span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {email || "guest@englishgyani.com"}
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" onClick={handleLogout} className="hover:bg-red-50 hover:text-red-600 cursor-pointer">
                            <LogOut className="h-5 w-5" />
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">Logout</span>
                                <span className="truncate text-xs text-muted-foreground">Sign out karo</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
