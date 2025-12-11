import { getPostData, getAllPostSlugs } from '@/lib/blog';
import { format } from 'date-fns';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { slug } = await params;
        const postData = await getPostData(slug);
        return {
            title: `${postData.title} | EnglishGyani`,
            description: postData.description,
        };
    } catch (error) {
        return {
            title: 'Blog Not Found',
        };
    }
}

export async function generateStaticParams() {
    const paths = getAllPostSlugs();
    return paths;
}

export default async function BlogPost({ params }: Props) {
    try {
        const { slug } = await params;
        const postData = await getPostData(slug);

        return (
            <div className="min-h-screen bg-slate-50 py-12 md:py-20">
                <article className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="mb-8">
                        <Link href="/learn" className="text-blue-600 hover:underline mb-4 inline-block">
                            ← Back to Learning Hub
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                            {postData.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <time>{format(new Date(postData.date), 'MMMM d, yyyy')}</time>
                            <span>•</span>
                            <div className="flex gap-2">
                                {postData.tags.map((tag) => (
                                    <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div
                        className="prose prose-lg prose-slate max-w-none 
              prose-headings:font-bold prose-headings:text-slate-900 
              prose-a:text-blue-600 prose-img:rounded-xl"
                        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                    />

                    <div className="mt-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Want to practice what you learned?</h3>
                        <p className="text-slate-600 mb-6">Try our AI-powered Practice Gym or Instant Translator for free.</p>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
                        >
                            Start Practicing Free
                        </Link>
                    </div>
                </article>
            </div>
        );
    } catch (error) {
        notFound();
    }
}
