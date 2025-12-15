import { getPostData, getAllPostSlugs } from '@/lib/blog';
import { format } from 'date-fns';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
            <div className="bg-background min-h-screen pb-20">
                {/* Hero Header */}
                <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 -z-10">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                    </div>

                    <div className="container max-w-4xl mx-auto px-4 text-center">
                        <Link href="/learn" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
                            ← Back to Learning Hub
                        </Link>

                        <div className="flex justify-center gap-2 mb-6 flex-wrap">
                            {postData.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/20">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                            {postData.title}
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                            {postData.description}
                        </p>

                        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground/80">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <time>{format(new Date(postData.date), 'MMMM d, yyyy')}</time>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>5 min read</span>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Content Container with Sidebar */}
                <div className="container max-w-6xl mx-auto px-4 -mt-10 relative z-10 pb-20">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <article className="bg-card rounded-3xl shadow-xl shadow-black/5 border border-border/50 p-8 md:p-12 h-full">
                                <div
                                    className="prose prose-lg prose-slate dark:prose-invert max-w-none 
                                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                                    prose-p:text-muted-foreground prose-p:leading-relaxed
                                    prose-strong:text-foreground prose-strong:font-semibold
                                    prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                                    prose-li:text-muted-foreground
                                    prose-img:rounded-2xl prose-img:shadow-lg"
                                    dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                                />
                            </article>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Author Card */}
                            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
                                <h3 className="font-bold text-foreground mb-4 uppercase text-xs tracking-wider">Written By</h3>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                        E
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground">EnglishGyani Team</p>
                                        <p className="text-xs text-muted-foreground">Expert English Coaches & AI</p>
                                    </div>
                                </div>
                            </div>

                            {/* Popular Tools Widget */}
                            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg sticky top-24">
                                <div className="flex items-center gap-2 mb-6">
                                    <Sparkles className="w-5 h-5 text-yellow-400" />
                                    <h3 className="font-bold">Free Tools for You</h3>
                                </div>

                                <div className="space-y-4">
                                    <Link href="/tools/self-introduction-generator" className="block group">
                                        <div className="bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-4 border border-white/10">
                                            <h4 className="font-semibold mb-1 group-hover:text-yellow-300 transition-colors">Self Intro Generator</h4>
                                            <p className="text-xs text-white/60">Introduce yourself perfectly in interviews.</p>
                                        </div>
                                    </Link>

                                    <Link href="/templates/sick-leave-email" className="block group">
                                        <div className="bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-4 border border-white/10">
                                            <h4 className="font-semibold mb-1 group-hover:text-yellow-300 transition-colors">Email Writer</h4>
                                            <p className="text-xs text-white/60">Write professional emails in seconds.</p>
                                        </div>
                                    </Link>

                                    <Link href="/dashboard/gym" className="block group">
                                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4 shadow-lg transform group-hover:scale-105 transition-all">
                                            <h4 className="font-bold mb-1 flex items-center gap-2">
                                                Practice Speaking <ArrowRight className="w-4 h-4" />
                                            </h4>
                                            <p className="text-xs text-white/80">Join AI Gym for free.</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    } catch (error) {
        notFound();
    }
}
