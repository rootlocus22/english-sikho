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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.englishgyani.com'),
  title: {
    default: "EnglishGyani - Master Corporate English with AI Coach",
    template: "%s | EnglishGyani"
  },
  description: "AI-powered English coaching for Indian professionals. Practice speaking, writing, corporate communication, and interviews with personalized AI feedback.",
  keywords: [
    "English Speaking Course",
    "Corporate English",
    "Business Communication",
    "AI English Coach",
    "Interview Preparation",
    "Soft Skills Training",
    "EnglishGyani",
    "English Sikho"
  ],
  authors: [{ name: "EnglishGyani Team" }],
  creator: "EnglishGyani",
  publisher: "EnglishGyani",
  icons: {
    icon: '/favicon.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.englishgyani.com',
    title: "EnglishGyani - Master Corporate English",
    description: "AI-powered English coaching for Indian professionals. Practice real-world scenarios.",
    siteName: 'EnglishGyani',
    images: [{
      url: '/og-image.png', // Ensure this exists or fallback to logo
      width: 1200,
      height: 630,
      alt: 'EnglishGyani AI Coach'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "EnglishGyani - Master Corporate English with AI",
    description: "Practice speaking, writing, and interviews with personalized AI feedback.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: "cojYuKe6Efu6cfNXRZOCgTh4p_8pK1SRheDQZ9wZCSo",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "EnglishGyani",
  "url": "https://www.englishgyani.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://englishgyani.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "EnglishGyani",
  "url": "https://www.englishgyani.com",
  "logo": "https://www.englishgyani.com/logo.png",
  "sameAs": [
    "https://twitter.com/englishgyani",
    "https://linkedin.com/company/englishgyani"
  ]
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
        <Script id="json-ld-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Script id="json-ld-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <AnalyticsTracker />
        {children}
        <PaywallModal />
        <Toaster />
      </body>
    </html>
  );
}
