import { VERNACULAR_DICTIONARY } from '@/data/vernacular-dictionary';
import Link from 'next/link';
import { Metadata } from 'next';
import { Book, BookOpen, Languages, Search, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: "Business English Dictionary - 127 Words in Hindi & Tamil | EnglishGyani",
    description: "Learn 127 essential business English words with meanings in Hindi and Tamil. Complete pronunciation guide, examples, and usage tips for Indian professionals.",
    alternates: {
        canonical: '/meaning',
    },
    keywords: [
        'business English dictionary',
        'corporate vocabulary',
        'English words meaning in Hindi',
        'English words meaning in Tamil',
        'business English India',
        'professional vocabulary'
    ],
};

export default function DictionaryHub() {
    // Group words alphabetically
    const groupedWords = VERNACULAR_DICTIONARY.reduce((acc, entry) => {
        const firstLetter = entry.word[0].toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(entry);
        return acc;
    }, {} as Record<string, typeof VERNACULAR_DICTIONARY>);

    const letters = Object.keys(groupedWords).sort();

    // Count by type
    const counts = VERNACULAR_DICTIONARY.reduce((acc, entry) => {
        acc[entry.type] = (acc[entry.type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-32">
                <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-b from-purple-50/80 via-white to-white overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:40px_40px] opacity-100"></div>
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 z-0 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[100px]"></div>
                </div>

                <div className="container mx-auto px-4 text-center max-w-5xl relative z-20">
                    <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-bold mb-6 border border-purple-200">
                        <BookOpen className="w-4 h-4" />
                        <span>127 Business Words | Hindi + Tamil</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 md:mb-8 leading-[1.15] md:leading-[1.1]">
                        Business English <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-600">Dictionary</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
                        <strong>127 essential corporate words</strong> with meanings in Hindi & Tamil, pronunciation guides, and real business examples.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 px-4 sm:px-0">
                        <a href="#words">
                            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-full shadow-xl shadow-purple-500/25 hover:shadow-2xl transition-all hover:-translate-y-1">
                                <Search className="w-5 h-5 mr-2" />
                                Browse All Words
                            </Button>
                        </a>
                        <Link href="/corporate-phrasebook">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base rounded-full border-2 hover:bg-accent/50 transition-all">
                                <Languages className="w-5 h-5 mr-2" />
                                View Phrasebook
                            </Button>
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span>{counts.noun || 0} Nouns</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span>{counts.verb || 0} Verbs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span>{counts.adjective || 0} Adjectives</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span>100% Free</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Alphabetical Word List */}
            <section id="words" className="py-12 bg-background">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="space-y-12">
                        {letters.map((letter) => (
                            <div key={letter} className="scroll-mt-20">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-2xl shadow-lg">
                                        {letter}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">{letter}</h2>
                                        <p className="text-sm text-slate-500">{groupedWords[letter].length} words</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {groupedWords[letter].map((entry) => (
                                        <Link
                                            key={entry.slug}
                                            href={`/meaning/${entry.slug}`}
                                            className="group block p-5 rounded-xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all hover:-translate-y-1"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                                                    {entry.word}
                                                </h3>
                                                <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded bg-slate-100 text-slate-600">
                                                    {entry.type}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-500 italic mb-2">/{entry.pronunciation}/</p>
                                            <div className="space-y-1">
                                                <p className="text-sm text-orange-700 font-medium">
                                                    <span className="text-xs text-slate-400 mr-1">Hindi:</span>
                                                    {entry.hindiMeaning}
                                                </p>
                                                <p className="text-sm text-purple-700 font-medium">
                                                    <span className="text-xs text-slate-400 mr-1">Tamil:</span>
                                                    {entry.tamilMeaning}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Content */}
            <section className="py-20 bg-accent/20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="prose prose-slate prose-lg max-w-none bg-white p-8 md:p-12 rounded-2xl border shadow-sm">
                        <h2 className="text-3xl font-bold mb-6">Why Learn Business English Vocabulary?</h2>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            In today's globalized workplace, <strong>strong business English vocabulary</strong> is essential for career advancement in India.
                            Many professionals struggle with corporate jargon and formal terminology, leading to miscommunication and missed opportunities.
                        </p>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            Our dictionary helps you master 127 essential words across three categories:
                        </p>
                        <ul className="space-y-3">
                            <li className="text-lg"><strong>Business Nouns ({counts.noun})</strong>: Key concepts like Milestone, Synergy, Compliance, Revenue, Strategy</li>
                            <li className="text-lg"><strong>Action Verbs ({counts.verb})</strong>: Professional actions like Leverage, Execute, Optimize, Analyze, Collaborate</li>
                            <li className="text-lg"><strong>Descriptive Adjectives ({counts.adjective})</strong>: Power words like Sustainable, Efficient, Transparent, Crucial</li>
                        </ul>

                        <h3 className="text-2xl font-bold mt-8 mb-4">How to Use This Dictionary</h3>
                        <ol className="space-y-3">
                            <li className="text-lg">Browse words alphabetically or search for specific terms</li>
                            <li className="text-lg">Click any word to see detailed explanation with examples</li>
                            <li className="text-lg">Learn pronunciation using our phonetic guides</li>
                            <li className="text-lg">Practice using words in your daily emails and meetings</li>
                            <li className="text-lg">Use our AI coach to get feedback on your usage</li>
                        </ol>

                        <div className="mt-8 p-6 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
                            <p className="text-base text-slate-800 font-medium mb-2">💡 Pro Tip:</p>
                            <p className="text-base text-slate-700">
                                Don't just memorize definitions - understand context! Each word includes a real business scenario showing exactly when and how to use it.
                                <Link href="/signup" className="text-purple-600 font-bold hover:underline ml-1">Practice with our AI Coach →</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 z-0">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Master Business Vocabulary
                    </h2>
                    <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
                        127 words × Daily practice = Corporate communication confidence. Start learning today!
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/signup">
                            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold rounded-full shadow-2xl hover:scale-105 transition-all">
                                <Book className="w-5 h-5 mr-2" />
                                Start Learning Free
                            </Button>
                        </Link>
                        <Link href="/corporate-phrasebook">
                            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold rounded-full bg-white/10 text-white border-white/30 hover:bg-white/20">
                                View Phrasebook
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
