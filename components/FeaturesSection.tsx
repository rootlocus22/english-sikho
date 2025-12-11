import { Check, Bot, Mail, Mic, Terminal } from "lucide-react";
import Image from "next/image";

export default function FeaturesSection() {
    const features = [
        {
            icon: <Terminal className="w-12 h-12 text-purple-600" />,
            title: "Tone Changer (Style Badlo)",
            desc: "Ek second mein apne message ki politeness change karo. Rude se professional tak - sirf ek slider!",
            image: "/images/tone-changer-demo.png",
            checks: [
                "4 tone levels: Rude → Casual → Professional → Butter-Polite",
                "Instant rewriting with explanation",
                "Perfect for office emails"
            ]
        },
        {
            icon: <Bot className="w-12 h-12 text-blue-600" />,
            title: "Roleplay Gym (Practice Kamra)",
            desc: "AI boss, AI client, AI interviewer ke saath practice karo. Real scenarios mein confident bano!",
            image: "/images/roleplay-gym-demo.png",
            checks: [
                "Salary negotiation practice",
                "Difficult conversation simulation",
                "Unlimited retries - mistakes se sikho!"
            ]
        },
        {
            icon: <Mail className="w-12 h-12 text-orange-600" />,
            title: "Reply Helper (Jawab Dhundho)",
            desc: "Confusing email/message ka screenshot upload karo. AI batayega real meaning kya hai aur kaise reply karna hai.",
            image: "/images/reply-helper-demo.png",
            checks: [
                "Image analysis powered by AI",
                "Hidden meaning decoder",
                "3 ready-to-use reply options"
            ]
        },
        {
            icon: <Mic className="w-12 h-12 text-green-600" />,
            title: "Speaking Coach (Bolne ka Practice)",
            desc: "Mic on karo, English mein bolo - AI turant feedback dega pronunciation aur grammar par.",
            image: "/images/speaking-coach-demo.png",
            checks: [
                "Real-time voice analysis",
                "Pronunciation correction",
                "Confidence scoring"
            ]
        }
    ];

    return (
        <section className="py-16 px-4">
            <div className="container max-w-6xl mx-auto space-y-24">
                {features.map((f, i) => (
                    <div key={i} className={`flex flex-col md:flex-row gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="flex-1 space-y-6">
                            <div className="bg-slate-50 w-20 h-20 rounded-2xl flex items-center justify-center">
                                {f.icon}
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900">{f.title}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">{f.desc}</p>
                            <ul className="space-y-4">
                                {f.checks.map((c, j) => (
                                    <li key={j} className="flex items-start gap-3 text-slate-700">
                                        <div className="bg-green-100 p-1.5 rounded-full mt-1">
                                            <Check className="w-4 h-4 text-green-600" />
                                        </div>
                                        <span className="text-base">{c}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 group hover:shadow-3xl transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/50 to-white/20 z-10" />
                            <Image
                                src={f.image}
                                alt={f.title}
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
