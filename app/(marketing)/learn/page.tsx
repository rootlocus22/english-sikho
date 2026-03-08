import { getSortedPostsData } from '@/lib/blog';
import { SEO_KEYWORDS } from '@/data/seo-keywords';
import Link from 'next/link';
import { format } from 'date-fns';
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.englishgyani.com';

export const metadata: Metadata = {
    title: 'English Learning Hub',
    description: 'Master Corporate English, Email Writing, and more with our expert guides for Indian professionals.',
    alternates: { canonical: `${baseUrl}/learn` },
    openGraph: {
        title: 'English Learning Hub | EnglishGyani',
        description: 'Master Corporate English, Email Writing, and more with our expert guides for Indian professionals.',
        url: `${baseUrl}/learn`,
        type: 'website',
    },
    keywords: ['English learning', 'Corporate English', 'Email writing', 'English guides', 'Indian professionals', 'Hinglish to English'],
};

export default function LearnPage() {
    const allPostsData = getSortedPostsData();

    return (
        <div className="min-h-screen bg-slate-50 py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
                        English Learning Hub
                    </h1>
                    <p className="text-xl text-slate-600">
                        Practical guides for Indian professionals to master Hinglish-to-English, corporate communication, and fluency.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {allPostsData.map(({ slug, date, title, description, tags }) => (
                        <Link key={slug} href={`/learn/${slug}`} className="group relative block h-full">
                            <div className="h-full bg-white rounded-2xl p-6 shadow-sm border border-slate-200 transition-all duration-200 hover:shadow-md hover:-translate-y-1 flex flex-col">
                                <div className="flex-1">
                                    <div className="flex gap-2 mb-3 flex-wrap">
                                        {tags.slice(0, 2).map((tag: string) => (
                                            <span key={tag} className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {description}
                                    </p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                                    <time>{format(new Date(date), 'MMMM d, yyyy')}</time>
                                    <span className="text-blue-600 group-hover:underline">Read Article →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {allPostsData.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-500">New content coming soon! Check back later.</p>
                    </div>
                )}

                {/* Programmatic topic guides - internal linking for SEO */}
                {SEO_KEYWORDS.length > 0 && (
                    <section className="mt-16 pt-16 border-t border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Explore by topic</h2>
                        <p className="text-slate-600 mb-6 max-w-2xl">
                            Practical guides on spoken English, courses, writing, and more—curated for Indian professionals.
                        </p>
                        <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {SEO_KEYWORDS.slice(0, 32).map((item) => (
                                <li key={item.slug}>
                                    <Link
                                        href={`/learn/${item.slug}`}
                                        className="text-slate-700 hover:text-blue-600 hover:underline text-sm"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {SEO_KEYWORDS.length > 32 && (
                            <p className="mt-4 text-slate-500 text-sm">
                                +{SEO_KEYWORDS.length - 32} more topics — use search or browse below.
                            </p>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
}
