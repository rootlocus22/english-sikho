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

                {/* Content Container */}
                <div className="container max-w-3xl mx-auto px-4 -mt-10 relative z-10">
                    <article className="bg-card rounded-3xl shadow-xl shadow-black/5 border border-border/50 p-8 md:p-12">
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

                    {/* CTA Section */}
                    <div className="mt-12 bg-gradient-to-br from-primary to-purple-600 rounded-3xl p-1 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="bg-background/95 backdrop-blur-xl rounded-[22px] p-8 md:p-12 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Sparkles className="w-32 h-32" />
                            </div>

                            <h3 className="text-3xl font-bold text-foreground mb-4">Ready to put this into practice?</h3>
                            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                                Don't just read about English. Practice with India's best AI coach. It's free, fun, and judgment-free.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link href="/signup">
                                    <Button size="lg" className="h-14 px-8 text-base rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 w-full sm:w-auto">
                                        Free mein Start karein <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        notFound();
    }
}
