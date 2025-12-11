import { getSortedPostsData } from '@/lib/blog';
import Link from 'next/link';
import { format } from 'date-fns';

export const metadata = {
    title: 'English Learning Hub | EnglishGyani',
    description: 'Master Corporate English, Email Writing, and more with our expert guides for Indian professionals.',
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
                                        {tags.slice(0, 2).map((tag) => (
                                            <span key={tag} className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
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
            </div>
        </div>
    );
}
