import { VERNACULAR_DICTIONARY } from '@/data/vernacular-dictionary';
import { Metadata } from 'next';
import Link from 'next/link';
import { Mic, Volume2, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return VERNACULAR_DICTIONARY.map((entry) => ({
        word: entry.slug,
    }));
}

type Props = {
    params: { word: string }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const entry = VERNACULAR_DICTIONARY.find(e => e.slug === params.word);

    if (!entry) {
        return {
            title: 'Word Not Found | EnglishGyani',
        };
    }

    return {
        title: `${entry.word} Meaning in Hindi & Tamil - Business English | EnglishGyani`,
        description: `What is the meaning of "${entry.word}" in Hindi and Tamil? Learn how to use "${entry.word}" in office emails and meetings. Practice pronunciation for free.`,
        alternates: {
            canonical: `/meaning/${entry.slug}`,
        },
    };
}

export default function WordPage({ params }: Props) {
    const entry = VERNACULAR_DICTIONARY.find(e => e.slug === params.word);

    if (!entry) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
                        Business Vocabulary Builder
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        {entry.word}
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-slate-500 font-medium text-lg mb-8">
                        <span className="italic">/{entry.pronunciation}/</span>
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-xs uppercase font-bold tracking-wider">{entry.type}</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
                        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-orange-900">अ</div>
                            <h3 className="text-xs font-bold text-orange-800 uppercase tracking-widest mb-1">Meaning (Hindi)</h3>
                            <p className="text-2xl font-bold text-slate-900">{entry.hindiMeaning}</p>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-purple-900">அ</div>
                            <h3 className="text-xs font-bold text-purple-800 uppercase tracking-widest mb-1">Meaning (Tamil)</h3>
                            <p className="text-2xl font-bold text-slate-900">{entry.tamilMeaning}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-3xl mx-auto px-4 py-16">

                {/* Context Card */}
                <div className="bg-white rounded-2xl border border-indigo-100 shadow-xl shadow-indigo-100/50 overflow-hidden mb-12">
                    <div className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <div className="p-8">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                            <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                <Volume2 className="w-5 h-5" />
                            </span>
                            How to use in Office?
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Example Sentence</h4>
                                <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed">
                                    "{entry.exampleSentence}"
                                </p>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Business Context</h4>
                                <p className="text-slate-600">
                                    {entry.businessContext}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Educational Content (SEO Deep Dive) */}
                <div className="prose prose-slate max-w-none mb-12">
                    <h3>Why is "{entry.word}" important in business?</h3>
                    <p>
                        In the corporate world, precision is power. Using the right word at the right time establishes your authority.
                        Many professionals in India struggle with confident communication not because they lack ideas, but because they lack the
                        specific vocabulary to express those ideas. By mastering words like "{entry.word}", you are adding a powerful tool to your communication arsenal.
                    </p>

                    <h3>Common Issues with Usage</h3>
                    <p>
                        A common mistake many non-native speakers make is direct translation from their mother tongue (Hindi or Tamil).
                        This often leads to awkward phrasing. For example, instead of using a long sentence to explain a concept,
                        using the single word "{entry.word}" makes you sound more concise and professional.
                    </p>
                    <p>
                        <strong>Tip:</strong> Only use "{entry.word}" when you are sure of the context. Practice using it in low-stakes situations
                        like internal team meetings before using it in client presentations.
                    </p>

                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 not-prose my-8">
                        <h4 className="text-lg font-bold text-blue-900 mb-2">🚀 Interview Tip</h4>
                        <p className="text-blue-800">
                            Recruiters love candidates who use industry-standard terminology. If you use "{entry.word}" correctly during a job interview,
                            it signals that you are industry-ready. It shows you understand the jargon of the trade and can hit the ground running.
                        </p>
                    </div>

                    <h3>Pronunciation Masterclass</h3>
                    <p>
                        Spelling is easy, but speaking is hard. The biggest giveaway of a non-native speaker is stressing the wrong syllable.
                        When you practice this word, focus on the "rhythm" of the word. Don't speak it flatly. English is a stress-timed language.
                        Use our AI tool above to listen to the native pronunciation and try to mimic the <em>music</em> of the word, not just the sounds.
                    </p>

                    <h3>Mastering Corporate Speak 101</h3>
                    <p>
                        "Corporate Speak" is almost a different language. It is designed to be polite, indirect, and professional.
                        Words like "{entry.word}" are building blocks. Here are 3 rules for using them:
                    </p>
                    <ol>
                        <li><strong>Be Specific:</strong> Don't say "thing" or "stuff". Use the specific Business Noun.</li>
                        <li><strong>Be Action-Oriented:</strong> Use strong Verbs. Don't say "We did the thinking", say "We brainstormed".</li>
                        <li><strong>Keep it Simple:</strong> Do not use big words just to show off. Use the <em>right</em> word.</li>
                    </ol>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Don't just read. Speak it.</h3>
                    <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
                        Knowing the meaning is not enough. You must pronounce it correctly to look professional.
                    </p>

                    <Link
                        href={`/dashboard/gym?topic=${entry.slug}`}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all group"
                    >
                        <Mic className="w-5 h-5" />
                        <span>Practice Pronouncing "{entry.word}"</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="text-xs text-slate-400 mt-4 font-medium uppercase tracking-wider">Free AI Feedback • No Login Required</p>
                </div>

                {/* Breadcrumbs / SEO Links */}
                <div className="mt-20 pt-10 border-t border-slate-200">
                    <h4 className="text-sm font-bold text-slate-900 mb-4">More Words</h4>
                    <div className="flex flex-wrap gap-2">
                        {/* Simple way to show random other words */}
                        {VERNACULAR_DICTIONARY.slice(0, 5).map(w => (
                            <Link
                                key={w.slug}
                                href={`/meaning/${w.slug}`}
                                className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
                            >
                                {w.word}
                            </Link>
                        ))}
                        <Link href="/" className="px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-500 hover:bg-slate-200">
                            View All
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
