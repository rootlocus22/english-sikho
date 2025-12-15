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
