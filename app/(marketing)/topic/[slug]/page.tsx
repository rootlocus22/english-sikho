import Link from "next/link";
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SEO_KEYWORDS } from "@/data/seo-keywords";
import { remark } from 'remark';
import html from 'remark-html';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

// Logic to format slug into readable text (Fallback title)
const formatSlug = (slug: string) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Logic to determine intent based on keywords (Keep this for UI customization)
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

// Logic to generate FAQ Schema based on intent
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const keywordData = SEO_KEYWORDS.find(k => k.slug === slug);

    if (!keywordData) {
        return {
            title: 'Topic Not Found | EnglishGyani',
        };
    }

    return {
        title: `${keywordData.title} | EnglishGyani`,
        description: keywordData.metaDescription,
        alternates: {
            canonical: `/topic/${slug}`,
        },
        openGraph: {
            title: keywordData.title,
            description: keywordData.metaDescription,
            type: 'article',
            url: `/topic/${slug}`,
        }
    };
}

export function generateStaticParams() {
    return SEO_KEYWORDS.map((item) => ({
        slug: item.slug,
    }));
}

export default async function TopicPage({ params }: Props) {
    const { slug } = await params;
    const keywordData = SEO_KEYWORDS.find(k => k.slug === slug);

    if (!keywordData) {
        return notFound();
    }

    const title = keywordData.title; // Use rich title from data
    const intent = getIntent(slug);
    const schema = generateSchema(title, intent);

    // Process Markdown Content
    const processedContent = await remark()
        .use(html)
        .process(keywordData.content || '');
    const contentHtml = processedContent.toString();

    // Interlinking Logic
    const relatedLinks = (() => {
        // If City, show Jobs. If Job, show Cities.
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
                    <Link href="/topic" className="hover:text-slate-900">Topics</Link>
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
                        {intent === 'conversation' && "Speak English naturally every day. AI conversation partner available 24/7 - no judgment, just progress."}
                        {intent === 'tool' && "Apps like Duolingo are for beginners. EnglishGyani is built for Indian Professionals who want career growth."}
                        {intent === 'general' && "Mastering English doesn't take years. With the right AI tools, you can improve your fluency in 30 days."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1"
                        >
                            Start Practicing Free
                        </Link>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-700 transition-all duration-200 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900"
                        >
                            View Plans
                        </Link>
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
                                href={`/topic/${link.slug}`}
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
                <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 shadow-blue-200 shadow-xl"
                >
                    Get Started with {title}
                </Link>
            </div>
        </div>
    );
}

