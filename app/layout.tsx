import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import PaywallModal from "@/components/PaywallModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EnglishGyani - Master Professional English with AI",
  description: "AI-powered English coaching for Indian professionals. Practice speaking, writing, and professional communication with personalized AI feedback.",
  icons: {
    icon: '/favicon.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "EnglishGyani - Master Professional English",
    description: "AI-powered English coaching for Indian professionals",
    images: ['/logo.png'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 min-h-screen`}
      >
        {children}
        <PaywallModal />
        <Toaster />
      </body>
    </html>
  );
}
