import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO_KEYWORDS } from "@/data/seo-keywords";
import { SCENARIO_DATA } from "@/data/scenarios";
import Link from "next/link";
import { Metadata } from 'next';
import FeaturesSection from "@/components/FeaturesSection";
import { ArrowRight, CheckCircle2, Star, Users, Bot, Mic, ShieldCheck, Zap, Globe, BrainCircuit, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: 'EnglishGyani - AI English Speaking Coach for Indian Professionals',
  description: 'Master Corporate English without fear. EnglishGyani is India\'s first AI-powered speaking coach that helps you practice interviews, emails, and daily conversation. Start for free.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  // Generate FAQ Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does EnglishGyani improve my speaking?",
        "acceptedAnswer": { "@type": "Answer", "text": "We use AI roleplays to simulate real-life scenarios like job interviews and client meetings. You speak, AI listens and gives instant feedback on grammar and tone." }
      },
      {
        "@type": "Question",
        "name": "Is it free to use?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes! You get 3 free practice sessions every single day. No credit card required to start." }
      },
      {
        "@type": "Question",
        "name": "Does it support Hindi speakers?",
        "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Our AI understands Indian accents and Hinglish, helping you transition smoothly to professional global English." }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48">
        {/* innovative Background: Neural Grid + Floating Language Elements */}
        <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-b from-indigo-50/80 via-white to-white overflow-hidden">
          {/* Grid Pattern - High Contrast */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:40px_40px] opacity-100"></div>

          {/* Central Glow */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 z-0 h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[100px]"></div>

          {/* Floating Elements - Animated & Colorful */}
          {/* English 'Aa' - Top Left */}
          <div className="absolute top-24 left-[5%] lg:left-[10%] p-6 bg-white shadow-xl shadow-indigo-200/40 rounded-3xl border border-indigo-100 -rotate-12 animate-bounce duration-[8000ms] z-10">
            <span className="text-6xl font-extrabold text-indigo-600 drop-shadow-sm">Aa</span>
          </div>

          {/* Mic Icon - Bottom Right */}
          <div className="absolute bottom-32 right-[5%] lg:right-[10%] p-6 bg-white shadow-xl shadow-purple-200/40 rounded-3xl border border-purple-100 rotate-12 animate-pulse duration-[4000ms] z-10">
            <Mic className="w-12 h-12 text-purple-600 drop-shadow-sm" />
          </div>

          {/* Hindi 'अ' - Top Right */}
          <div className="absolute top-32 right-[8%] lg:right-[15%] p-6 bg-white shadow-xl shadow-pink-200/40 rounded-full border border-pink-100 rotate-6 animate-bounce duration-[10000ms] z-10">
            <span className="text-5xl font-extrabold text-pink-500 drop-shadow-sm">अ</span>
          </div>

          {/* Bot Icon - Bottom Left */}
          <div className="absolute bottom-24 left-[8%] lg:left-[15%] p-5 bg-white shadow-xl shadow-blue-200/40 rounded-2xl border border-blue-100 -rotate-6 animate-pulse duration-[5000ms] z-10">
            <Bot className="w-10 h-10 text-blue-600 drop-shadow-sm" />
          </div>

          {/* Decoration Circles */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl z-0" />
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl z-0" />
        </div>

        <div className="container mx-auto px-4 text-center max-w-5xl relative z-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20 hover:bg-primary/15 transition-colors cursor-default">
            <Sparkles className="w-4 h-4" />
            <span>India's First AI-Powered English Coach</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-[1.1]">
            Master Corporate English <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-purple-600">
              Without The Fear.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Forget boring video lectures. Practice <strong>real conversations</strong>, emails, and interviews with an AI that judges your grammar, not you.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 mb-16">
            <Link href="/signup">
              <Button size="lg" className="h-16 px-10 text-lg rounded-full shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 transition-all hover:-translate-y-1">
                Free mein Practice Karein <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline" className="h-16 px-10 text-lg rounded-full border-2 hover:bg-accent/50 transition-all">
                See How It Works
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>No Credit Card Req</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>3 Free Daily Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <span>Indian Accent Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools Section (High Intent) */}
      <section className="py-10 bg-blue-50/50 border-y border-blue-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Most Popular Free Tools 🔥</h2>
              <p className="text-slate-600">No login required. Just use and improve.</p>
            </div>
            <Link href="/tools" className="text-blue-600 font-bold text-sm hover:underline">View All Tools →</Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Tool 1 */}
            <Link href="/tools/self-introduction-generator" className="group">
              <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-xl">👋</span>
                </div>
                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-blue-600">Self Introduction Generator</h3>
                <p className="text-sm text-slate-500">For Freshers. Create a professional intro script in 10 seconds.</p>
              </div>
            </Link>

            {/* Tool 2 */}
            <Link href="/interview/top-10-interview-questions" className="group">
              <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-xl">🎤</span>
                </div>
                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-purple-600">Top 10 Interview Questions</h3>
                <p className="text-sm text-slate-500">With sample answers for "Why should we hire you?" & more.</p>
              </div>
            </Link>

            {/* Tool 3 (Bucket 2) */}
            <Link href="/templates/sick-leave-email" className="group">
              <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-xl">✉️</span>
                </div>
                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-green-600">Professional Email Writer</h3>
                <p className="text-sm text-slate-500">Sick leave, Resignation, or Salary Hike - Write it perfectly.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-12 border-y bg-accent/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="text-center px-4">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-4xl font-bold text-foreground mb-1">4.8/5</p>
              <p className="text-muted-foreground text-sm uppercase tracking-wider">User Ratings</p>
            </div>
            <div className="text-center px-4">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-4xl font-bold text-foreground mb-1">10,000+</p>
              <p className="text-muted-foreground text-sm uppercase tracking-wider">Professionals Upskilled</p>
            </div>
            <div className="text-center px-4">
              <Bot className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-4xl font-bold text-foreground mb-1">50k+</p>
              <p className="text-muted-foreground text-sm uppercase tracking-wider">Sessions Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition: Old Way vs New Way */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Stop Watching. Start Speaking.</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Most apps sell you videos. We give you a gym. Build muscle memory through active practice, not passive listening.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* The Old Way */}
            <div className="relative group p-1">
              <div className="absolute inset-0 bg-red-100 rounded-3xl transform rotate-2 transition-transform group-hover:rotate-3 opacity-50"></div>
              <Card className="relative bg-white border-2 border-red-100 shadow-sm rounded-3xl h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-red-600/80 font-semibold mb-2">Passive Learning</CardTitle>
                  <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">The Usual Way</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4 opacity-70">
                      <span className="text-2xl">😴</span>
                      <span>Watching boring grammar videos</span>
                    </li>
                    <li className="flex items-start gap-4 opacity-70">
                      <span className="text-2xl">💸</span>
                      <span>Expensive tutors (₹1000/hr)</span>
                    </li>
                    <li className="flex items-start gap-4 opacity-70">
                      <span className="text-2xl">😨</span>
                      <span>Fear of making mistakes in public</span>
                    </li>
                    <li className="flex items-start gap-4 opacity-70">
                      <span className="text-2xl">📅</span>
                      <span>Fixed schedules & travel time</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* The New Way */}
            <div className="relative group p-1">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-3xl transform -rotate-1 transition-transform group-hover:-rotate-2 opacity-20"></div>
              <div className="absolute inset-0 bg-white rounded-3xl"></div> {/* Mask */}
              <Card className="relative bg-white/50 backdrop-blur-xl border-2 border-primary/20 shadow-2xl shadow-primary/10 rounded-3xl h-full overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BrainCircuit className="w-32 h-32" />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-primary font-bold mb-2">Active AI Coaching</CardTitle>
                  <p className="text-primary/70 text-sm font-bold uppercase tracking-wide">The EnglishGyani Way</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold text-sm">✓</span>
                      <span className="text-lg text-slate-800 font-medium">Speak & get instant feedback</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold text-sm">✓</span>
                      <span className="text-lg text-slate-800 font-medium">Unlimited practice for ₹0</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold text-sm">✓</span>
                      <span className="text-lg text-slate-800 font-medium">100% Private & Judgment Free</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold text-sm">✓</span>
                      <span className="text-lg text-slate-800 font-medium">Practice anytime, anywhere</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-24 bg-accent/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">A Complete Gym for Your English</h2>
            <p className="text-xl text-muted-foreground">Every tool you need to sound professional, fluent, and confident.</p>
          </div>
          <FeaturesSection />
        </div>
      </section>

      {/* Quick Start Templates */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">Start with a Scenario</h2>
              <p className="text-muted-foreground text-lg">Kya bolein samajh nahi aa raha? Pick a template - bas edit karo aur bhejo!</p>
            </div>
            <Link href="/dashboard/templates">
              <Button variant="ghost" className="text-primary hover:text-primary/80 group text-lg">
                View All Templates <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCENARIO_DATA.email.slice(0, 3).map((item, i) => (
              <Link key={item.slug} href={`/dashboard/templates/email/${item.slug}`} className="group">
                <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer border-2 bg-card/50">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-xl">✉️</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">Professional template for {item.title.toLowerCase()} in corporate settings.</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {SCENARIO_DATA.vocabulary.slice(0, 3).map((item, i) => (
              <Link key={item.slug} href={`/dashboard/templates/vocabulary/${item.slug}`} className="group">
                <Card className="h-full hover:shadow-lg hover:border-purple-300 transition-all cursor-pointer border-2 bg-card/50">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-xl">🧠</span>
                    </div>
                    <CardTitle className="group-hover:text-purple-600 transition-colors">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">Learn advanced vocabulary for {item.title.toLowerCase()}.</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/30 to-transparent blur-[120px] rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Ready to Find Your Voice?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join 10,000+ professionals mastering English with AI. Bilkul free hai, aur bas 2 minute lagenge start karne mein.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="h-16 px-12 text-xl font-bold rounded-full shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all">
                Get Started for Free
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-blue-200/80 text-sm font-medium">No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* SEO Footer Links */}
      <section className="py-16 px-4 bg-muted/30 border-t">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-xs font-bold mb-8 text-muted-foreground uppercase tracking-widest">Trending Topics</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground/80">
            {SEO_KEYWORDS.slice(0, 30).map(k => (
              <Link key={k.slug} href={`/learn/${k.slug}`} className="hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4">
                {k.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M9 17v4" />
      <path d="M3 21h6" />
    </svg>
  )
}


