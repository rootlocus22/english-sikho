import { getPostData, getAllPostSlugs } from '@/lib/blog';
import { format } from 'date-fns';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrackedLink } from '@/components/ui/tracked-elements';

// Programmatic SEO Imports
import { SEO_KEYWORDS } from "@/data/seo-keywords";
import { remark } from 'remark';
import html from 'remark-html';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

// --- UTILITIES FOR PROGRAMMATIC PATE ---
const formatSlug = (slug: string) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const getIntent = (slug: string) => {
    if (slug.includes('classes') || slug.includes('course') || slug.includes('institute')) return 'learning';
    if (slug.includes('interview') || slug.includes('job') || slug.includes('career') || slug.includes('placement') || slug.includes('hr-interview')) return 'interview';
    if (slug.includes('business') || slug.includes('corporate') || slug.includes('professional') || slug.includes('sales') || slug.includes('client')) return 'business';
    if (slug.includes('ai') || slug.includes('chatbot') || slug.includes('virtual') || slug.includes('automated') || slug.includes('smart')) return 'ai';
    if (slug.includes('grammar') || slug.includes('writing') || slug.includes('composition') || slug.includes('tense') || slug.includes('sentence')) return 'grammar';
    if (slug.includes('conversation') || slug.includes('fluent') || slug.includes('daily') || slug.includes('phrases') || slug.includes('speaking-practice')) return 'conversation';
    if (slug.includes('app') || slug.includes('tool') || slug.includes('tutor')) return 'tool';
    return 'general';
};

const generateSchema = (title: string, intent: string) => {
    const faqs = [
        {
            question: `Is this ${title} course suitable for beginners?`,
            answer: "Yes, our AI coach adapts to your level, whether you are a fresher or a working professional. You start with basic scenarios and move to advanced business communication."
        },
        {
            question: "How is this different from offline coaching classes?",
            answer: "Unlike crowded classes where you get 2 minutes to speak, EnglishGyani's AI gives you 24/7 speaking practice with instant feedback on grammar and pronunciation."
        },
        {
            question: "Can I practice specifically for job interviews?",
            answer: "Absolutely. We have dedicated modules for HR rounds, technical explanations, and salary negotiations tailored to the Indian job market."
        }
    ];

    if (intent === 'business') {
        faqs.push({
            question: "Does this cover email writing and presentation skills?",
            answer: "Yes, we focus heavily on corporate communication including formal emails, meeting etiquette, and presentation delivery."
        });
    }

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
};
// ---------------------------------------

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    // 1. Try Blog Post
    try {
        const postData = await getPostData(slug);
        return {
            title: `${postData.title} | EnglishGyani`,
            description: postData.description,
            alternates: { canonical: `/learn/${slug}` }
        };
    } catch (e) {
        // 2. Try Programmatic Topic
        const keywordData = SEO_KEYWORDS.find(k => k.slug === slug);
        if (keywordData) {
            return {
                title: `${keywordData.title} | EnglishGyani`,
                description: keywordData.metaDescription,
                alternates: {
                    canonical: `/learn/${slug}`,
                },
                openGraph: {
                    title: keywordData.title,
                    description: keywordData.metaDescription,
                    type: 'article',
                    url: `/learn/${slug}`,
                }
            };
        }
    }

    return { title: 'Not Found | EnglishGyani' };
}

export async function generateStaticParams() {
    // Combine both Manual Blogs and Programmatic Topics
    const blogPaths = getAllPostSlugs();
    const topicPaths = SEO_KEYWORDS.map(item => ({ slug: item.slug }));

    return [...blogPaths, ...topicPaths];
}

export default async function HybridPage({ params }: Props) {
    const { slug } = await params;

    // --- MODE 1: BLOG POST ---
    try {
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
                            {postData.tags.map((tag: string) => (
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
    } catch (e) {
        // --- MODE 2: PROGRAMMATIC TOPIC ---
        const keywordData = SEO_KEYWORDS.find(k => k.slug === slug);

        if (!keywordData) {
            return notFound();
        }

        const title = keywordData.title;
        const intent = getIntent(slug);
        const schema = generateSchema(title, intent);
        const processedContent = await remark().use(html).process(keywordData.content || '');
        const contentHtml = processedContent.toString();

        // Interlinking Logic
        const relatedLinks = (() => {
            const isCity = slug.includes('in-');
            const isJob = slug.includes('for-');

            return SEO_KEYWORDS
                .filter(k => {
                    if (isCity) return k.slug.includes('english-for-'); // Show Jobs on City pages
                    if (isJob) return k.slug.includes('course-in-');   // Show Cities on Job pages
                    return Math.random() > 0.5; // Random mix for others
                })
                .sort(() => 0.5 - Math.random()) // Shuffle
                .slice(0, 6); // Take 6
        })();

        return (
            <div className="min-h-screen bg-white">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />

                {/* Breadcrumb */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                    <div className="max-w-4xl mx-auto text-sm text-slate-500">
                        <Link href="/" className="hover:text-slate-900">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/learn" className="hover:text-slate-900">Learn</Link>
                        <span className="mx-2">/</span>
                        <span className="text-slate-800 font-medium truncate">{title}</span>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="bg-slate-50 border-b border-slate-200">
                    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-center">
                        <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                            Topic: {formatSlug(slug)}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                            {title}
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                            {intent === 'learning' && "Local classes are expensive, time-consuming, and outdated. Switch to AI-powered practice that works 24/7."}
                            {intent === 'interview' && "Don't let poor English cost you your dream job. Practice interview fluency with our AI coach - crack interviews confidently!"}
                            {intent === 'business' && "Corporate success needs professional English. Master business communication with AI - emails, meetings, presentations."}
                            {intent === 'ai' && "Experience the future of learning. AI personalizes every lesson, adapts to you, and accelerates your fluency journey."}
                            {intent === 'grammar' && "Grammar made simple! Stop memorizing rules. Practice with AI and see instant improvement in writing and speaking."}
                            {intent === 'conversation' && "Speak English naturally every day. AI conversation partner available 24/7 - no judgment, pure practice."}
                            {intent === 'tool' && "Apps like Duolingo are for beginners. EnglishGyani is built for Indian Professionals who want career growth."}
                            {intent === 'general' && "Mastering English doesn't take years. With the right AI tools, you can improve your fluency in 30 days."}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/dashboard"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1"
                                eventData={{ action: 'click_topic_hero_cta', category: 'onboarding', label: slug }}
                            >
                                Start Practicing Free
                            </TrackedLink>
                            <TrackedLink
                                href="/pricing"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-700 transition-all duration-200 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900"
                                eventData={{ action: 'click_topic_pricing_cta', category: 'ecommerce', label: slug }}
                            >
                                View Plans
                            </TrackedLink>
                        </div>
                    </div>
                </div>

                {/* Value Props Section - Customized */}
                <div className="py-20 max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6 text-2xl">⚡</div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">
                                {intent === 'learning' && 'Faster than Classes'}
                                {intent === 'interview' && 'Mock Interviews 24/7'}
                                {intent === 'business' && 'Real Business Scenarios'}
                                {intent === 'ai' && 'Personalizes to You'}
                                {intent === 'grammar' && 'Instant Error Detection'}
                                {intent === 'conversation' && 'Unlimited Practice'}
                                {(intent === 'tool' || intent === 'general') && 'Instant Feedback'}
                            </h3>
                            <p className="text-slate-600">
                                {intent === 'learning' && "Why travel 2 hours for a 1-hour class? Practice anytime, anywhere with our AI gym."}
                                {intent === 'interview' && "Practice unlimited mock interviews. Get feedback on answers, body language tips, confidence building."}
                                {intent === 'business' && "AI simulates client meetings, presentations, negotiations - just like your real office environment."}
                                {intent === 'ai' && "Our AI learns your mistakes, adapts to your level, focuses on YOUR specific weaknesses."}
                                {intent === 'grammar' && "AI catches every grammar mistake instantly and explains why it's wrong - learn 10x faster."}
                                {intent === 'conversation' && "Talk with AI anytime - morning coffee, lunch break, late night. Zero judgment, pure practice."}
                                {(intent === 'tool' || intent === 'general') && "Get real-time corrections on your pronunciation and grammar as you speak."}
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
                            <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-6 text-2xl">🇮🇳</div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Built for Indian English</h3>
                            <p className="text-slate-600">
                                We understand "Hinglish". Our AI helps you transition from Indian phrases to Global Corporate standards smoothly.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6 text-2xl">💰</div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">
                                {intent === 'learning' ? '10x Cheaper' : 'Free to Try'}
                            </h3>
                            <p className="text-slate-600">
                                Traditional coaching costs ₹5,000+ per month. EnglishGyani gives you unlimited practice for a fraction of that.
                            </p>
                        </div>
                    </div>
                </div>

                {/* SEO Content Injection - DYNAMIC */}
                <div className="bg-slate-50 py-20 border-t border-slate-200">
                    <div className="max-w-3xl mx-auto px-6">
                        <div
                            className="prose prose-lg prose-slate prose-headings:text-slate-900 prose-a:text-blue-600 prose-strong:text-slate-900 prose-li:text-slate-700"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />
                    </div>
                </div>

                {/* Related Topics (Interlinking) */}
                <div className="bg-white py-16 border-t border-slate-200">
                    <div className="max-w-6xl mx-auto px-6">
                        <h3 className="text-2xl font-bold text-slate-900 mb-8">
                            Explore Related Topics
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedLinks.map((link) => (
                                <Link
                                    key={link.slug}
                                    href={`/learn/${link.slug}`}
                                    className="block p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group"
                                >
                                    <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 line-clamp-2">
                                        {link.title.split('|')[0].trim()}
                                    </h4>
                                    <span className="text-sm text-slate-400 mt-2 block">Read More →</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="py-20 text-center px-6 bg-slate-50">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to upgrade your career?</h2>
                    <TrackedLink
                        href="/dashboard"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 shadow-blue-200 shadow-xl"
                        eventData={{ action: 'click_topic_footer_cta', category: 'onboarding', label: slug }}
                    >
                        Get Started with {title}
                    </TrackedLink>
                </div>
            </div>
        );
    }
}
