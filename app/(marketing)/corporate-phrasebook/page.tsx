import { getAllPhrases } from "@/lib/pseo-data";
import Link from "next/link";
import { Metadata } from "next";
import { Book, Briefcase, ChevronRight, Bot, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "213 Corporate English Phrases for Indians - EnglishGyani Phrasebook",
    description: "Master professional English for emails, meetings, appraisals & interviews. 213 phrases with Hindi-to-English translations for Indian professionals. Free guide.",
    alternates: {
        canonical: '/corporate-phrasebook',
    },
};

export default function PhrasebookHub() {
    const allPhrases = getAllPhrases();

    // Group phrases by category
    const categories = allPhrases.reduce((acc, phrase) => {
        if (!acc[phrase.intent_category]) {
            acc[phrase.intent_category] = [];
        }
        acc[phrase.intent_category].push(phrase);
        return acc;
    }, {} as Record<string, typeof allPhrases>);

    const categoryNames = Object.keys(categories).sort();

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            {/* Hero Section - Matching homepage style */}
            <section className="relative overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-32">
                {/* Background matching homepage */}
                <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-b from-indigo-50/80 via-white to-white overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:40px_40px] opacity-100"></div>
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 z-0 h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[100px]"></div>
                </div>

                <div className="container mx-auto px-4 text-center max-w-5xl relative z-20">
                    <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6 border border-blue-200">
                        <Book className="w-4 h-4" />
                        <span>213 Professional Phrases</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 md:mb-8 leading-[1.15] md:leading-[1.1]">
                        Corporate English <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-purple-600">Phrasebook</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
                        <strong>Stop translating from Hindi. Start speaking professionally.</strong> Browse 213+ phrases for emails, meetings, appraisals & interviews.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 px-4 sm:px-0">
                        <Link href="#categories">
                            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-full shadow-xl shadow-primary/25 hover:shadow-2xl transition-all hover:-translate-y-1">
                                Browse All Phrases
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base rounded-full border-2 hover:bg-accent/50 transition-all">
                                Practice with AI Coach
                            </Button>
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span>Bilingual (Hindi → English)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span>Formal + Casual Versions</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span>100% Free</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section id="categories" className="py-12 bg-background">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryNames.map((category) => (
                            <div key={category} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all">
                                <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50/30 border-b flex items-center justify-between">
                                    <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                        <Briefcase className="h-5 w-5 text-primary" />
                                        {category}
                                    </h2>
                                    <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                                        {categories[category].length}
                                    </span>
                                </div>
                                <ul className="p-4 space-y-1 max-h-[400px] overflow-y-auto">
                                    {categories[category].map((phrase) => (
                                        <li key={phrase.slug}>
                                            <Link
                                                href={`/phrases/${phrase.slug}`}
                                                className="group flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                                            >
                                                <span className="text-sm text-slate-700 group-hover:text-primary transition-colors font-medium">
                                                    {phrase.hindi_phrase}
                                                </span>
                                                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Content - Matching homepage prose style */}
            <section className="py-20 bg-accent/20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="prose prose-slate prose-lg max-w-none bg-white p-8 md:p-12 rounded-2xl border shadow-sm">
                        <h2 className="text-3xl font-bold mb-6">Why Use EnglishGyani's Corporate Phrasebook?</h2>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            Mastering corporate communication is <strong>crucial for career growth in India</strong>. Many professionals struggle with direct translations from Hindi, which can often sound rude or unprofessional in English.
                        </p>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            Our phrasebook is designed to help you navigate:
                        </p>
                        <ul className="space-y-3">
                            <li className="text-lg"><strong>Salary Negotiations:</strong> Ask for a raise without sounding demanding - "Mujhe increment chahiye" becomes professional requests.</li>
                            <li className="text-lg"><strong>Leave Requests:</strong> Inform your manager about sick leave professionally - from "Main beemar hoon" to executive-level communication.</li>
                            <li className="text-lg"><strong>Meeting Etiquette:</strong> Speak up confidently in client calls with proper phrases for presentations, questions, and follow-ups.</li>
                            <li className="text-lg"><strong>Email Writing:</strong> Master the art of professional emails - from CC'ing to apologies to urgent requests.</li>
                            <li className="text-lg"><strong>Interview Preparation:</strong> Answer tough questions like "Why should we hire you?" with confidence and clarity.</li>
                        </ul>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            Each phrase comes with both a <strong>formal "CEO-Level"</strong> option and a casual professional alternative, ensuring you always sound executive-ready while maintaining authenticity.
                        </p>
                        <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                            <p className="text-base text-slate-800 font-medium mb-2">💡 Pro Tip:</p>
                            <p className="text-base text-slate-700">
                                Don't just read these phrases - practice them with our AI Coach! Get real-time feedback on pronunciation, tone, and confidence. <Link href="/signup" className="text-primary font-bold hover:underline">Start practicing free →</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Matching homepage */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary z-0">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Ready to Sound Professional?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        Browse 213 phrases or practice them live with our AI Coach. Bilkul free hai - bas shuru karo!
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/signup">
                            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold rounded-full shadow-2xl hover:scale-105 transition-all">
                                Practice with AI Coach
                            </Button>
                        </Link>
                        <Link href="#categories">
                            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold rounded-full bg-white/10 text-white border-white/30 hover:bg-white/20">
                                Browse Phrases
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
