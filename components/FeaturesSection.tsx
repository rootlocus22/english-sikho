import { Check, Bot, Mail, Mic, Terminal, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FeaturesSection() {
    const features = [
        {
            id: "tone-changer",
            icon: <Terminal className="w-8 h-8 text-primary" />,
            title: "Boss-Friendly Emailer",
            subtitle: "Rude mat bano",
            desc: "Don't sound rude. 'Do this now' ko 'Could you please?' mein badlo one click mein.",
            image: "/images/tone-changer-demo.png",
            link: "/dashboard",
            checks: [
                "4 Politeness Levels (Rude → Professional)",
                "Instant Rewrite with Explanations",
                "Perfect for tricky emails"
            ]
        },
        {
            id: "roleplay",
            icon: <Bot className="w-8 h-8 text-indigo-500" />,
            title: "Real-Life Practice",
            subtitle: "Interview se pehle galti karo",
            desc: "Simulate a salary negotiation, a difficult client call, or a job interview. Yahan galti karo taki real life mein na ho.",
            image: "/images/roleplay-gym-demo.png",
            link: "/dashboard/gym",
            checks: [
                "Realistic AI Personas (Boss, Client, Recruiter)",
                "Bina dare practice karo",
                "Unlimited retries in a safe space"
            ]
        },
        {
            id: "reply-helper",
            icon: <Mail className="w-8 h-8 text-rose-500" />,
            title: "Smart Reply",
            subtitle: "Jawaab hum denge",
            desc: "Confused by a passive-aggressive email? Screenshot upload karo. AI will explain the hidden meaning and draft 3 professional replies.",
            image: "/images/reply-helper-demo.png",
            link: "/dashboard/reply-helper",
            checks: [
                "Analyzes screenshots & text",
                "Decodes hidden meanings",
                "Drafts 3 distinct reply options"
            ]
        },
        {
            id: "speaking",
            icon: <Mic className="w-8 h-8 text-teal-500" />,
            title: "Apna English Coach",
            subtitle: "Fix Your Pronunciation",
            desc: "Speak freely. The AI listens and corrects your grammar instantly. Jeb mein personal tutor rakho.",
            image: "/images/speaking-coach-demo.png",
            link: "/dashboard/coach",
            checks: [
                "Live Grammar Correction",
                "Pronunciation Analysis",
                "Fluency Scoring"
            ]
        }
    ];

    return (
        <section className="py-0 px-4">
            <div className="container max-w-6xl mx-auto space-y-16 md:space-y-32">
                {features.map((f, i) => (
                    <div key={i} className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="flex-1 space-y-6 md:space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-secondary/50 border border-secondary shadow-sm">
                                    {f.icon}
                                </div>
                                <span className="text-xs md:text-sm font-bold text-primary tracking-widest uppercase">{f.subtitle}</span>
                            </div>

                            <div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 md:mb-4">{f.title}</h2>
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{f.desc}</p>
                            </div>

                            <ul className="space-y-4">
                                {f.checks.map((c, j) => (
                                    <li key={j} className="flex items-center gap-3 text-foreground/80 font-medium">
                                        <div className="bg-green-500/10 p-1 rounded-full">
                                            <Check className="w-4 h-4 text-green-600" />
                                        </div>
                                        <span>{c}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href={f.link}>
                                <Button variant="outline" className="mt-4 border-primary/20 text-primary hover:bg-primary/5 group">
                                    Try {f.title} Free <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>

                        <div className="flex-1 relative w-full aspect-[4/3]">
                            {/* Abstract decorative blobs */}
                            <div className={`absolute -inset-4 bg-gradient-to-r ${i % 2 === 0 ? 'from-primary/20 to-purple-500/20' : 'from-blue-500/20 to-teal-500/20'} rounded-[2rem] blur-2xl opacity-50`} />

                            <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/50 backdrop-blur-sm dark:bg-black/50 ring-1 ring-black/5">
                                {/* Mock Browser Header */}
                                <div className="h-8 bg-muted/80 backdrop-blur-md border-b flex items-center px-4 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                </div>
                                <div className="relative w-full h-[calc(100%-2rem)] bg-muted/20">
                                    {/* Use a placeholder if image missing, or actual image */}
                                    <Image
                                        src={f.image}
                                        alt={f.title}
                                        fill
                                        className="object-cover object-top"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
