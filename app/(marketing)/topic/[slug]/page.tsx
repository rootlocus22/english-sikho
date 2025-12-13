import Link from "next/link";
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SEO_KEYWORDS } from "@/data/seo-keywords";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

// Logic to format slug into readable text
const formatSlug = (slug: string) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Logic to determine intent based on keywords
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const title = formatSlug(slug);
    return {
        title: `${title} | EnglishGyani`,
        description: `Looking for ${title}? EnglishGyani provides AI-powered English training tailored for Indian professionals. Better than local classes, cheaper than tutors.`,
    };
}

export function generateStaticParams() {
    return SEO_KEYWORDS.map((item) => ({
        slug: item.slug,
    }));
}

export default async function TopicPage({ params }: Props) {
    const { slug } = await params;

    // Optional: Validating if slug exists in our targeted list
    // if (!SEO_KEYWORDS.includes(slug)) return notFound();

    const title = formatSlug(slug);
    const intent = getIntent(slug);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-slate-50 border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
                    <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                        Showing Results for: {title}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                        Stop Searching for <span className="text-blue-600 block mt-2">"{title}"</span>
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

            {/* SEO Content Injection */}
            <div className="bg-slate-50 py-20">
                <div className="max-w-3xl mx-auto px-6 prose prose-lg prose-slate">
                    <h2>Why {title} is the wrong goal</h2>
                    <p>
                        When people search for <strong>{title}</strong>, they are usually looking for a result: confidence.
                        They want to speak without hesitation, write emails without errors, and get promoted.
                    </p>
                    <p>
                        But traditional methods like memorizing grammar rules or attending crowded classes often fail because they lack
                        <strong> active practice</strong>.
                    </p>
                    <h3>The EnglishGyani Approach</h3>
                    <ul>
                        <li><strong>No Judgment:</strong> Practice with an AI that never gets tired or annoyed.</li>
                        <li><strong>Roleplay Real Scenarios:</strong> Practice for interviews, salary negotiations, or client meetings.</li>
                        <li><strong>Tone Correction:</strong> Convert your casual thoughts into professional emails instantly.</li>
                    </ul>
                </div>
            </div>

            {/* Final CTA */}
            <div className="py-20 text-center px-6">
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
