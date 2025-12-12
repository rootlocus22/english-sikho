import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import PaywallModal from "@/components/PaywallModal";
import AnalyticsTracker from "@/components/AnalyticsTracker";

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
  },
  verification: {
    google: "cojYuKe6Efu6cfNXRZOCgTh4p_8pK1SRheDQZ9wZCSo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-PWJGKD3QD7"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-PWJGKD3QD7');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uk7o7reurn");
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 min-h-screen`}
      >
        <AnalyticsTracker />
        {children}
        <PaywallModal />
        <Toaster />
      </body>
    </html>
  );
}
