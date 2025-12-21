
import { notFound } from "next/navigation";
import { getAllPhrases, getPhraseBySlug, getRelatedPhrases } from "@/lib/pseo-data";
import ToneSwitcher from "@/components/pseo/ToneSwitcher";
import StickyCTA from "@/components/pseo/StickyCTA";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, MessageCircle, Briefcase, Zap, Home, Quote } from "lucide-react";
import Script from "next/script";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const phrases = getAllPhrases();
    return phrases.map((phrase) => ({
        slug: phrase.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const phrase = getPhraseBySlug(slug);

    if (!phrase) {
        return {
            title: "Phrase Not Found",
        };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.englishgyani.com';
    const canonicalUrl = `${baseUrl}/phrases/${phrase.slug}`;

    return {
        title: phrase.meta_title || `How to say "${phrase.hindi_phrase}" professionally | EnglishGyani`,
        description: phrase.meta_description || `Learn the professional way to say "${phrase.hindi_phrase}" in English. CEO-level alternatives for ${phrase.intent_category.toLowerCase()} situations. Free guide for Indian professionals.`,
        keywords: [
            `${phrase.hindi_phrase}`,
            `professional English phrases`,
            `corporate English India`,
            `${phrase.intent_category}`,
            `Hindi to English translation`,
            `workplace communication`,
            `business English for Indians`
        ],
        alternates: {
            canonical: canonicalUrl,
        },
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        openGraph: {
            title: phrase.meta_title || `How to say "${phrase.hindi_phrase}" professionally`,
            description: phrase.meta_description || `Learn professional English alternatives for "${phrase.hindi_phrase}"`,
            type: "article",
            url: canonicalUrl,
            siteName: 'EnglishGyani',
        },
        twitter: {
            card: 'summary_large_image',
            title: phrase.meta_title || `How to say "${phrase.hindi_phrase}" professionally`,
            description: phrase.meta_description || `Professional English for "${phrase.hindi_phrase}"`,
        },
    };
}

export default async function PhrasePage({ params }: PageProps) {
    const { slug } = await params;
    const phrase = getPhraseBySlug(slug);

    if (!phrase) {
        notFound();
    }

    const relatedPhrases = getRelatedPhrases(phrase.intent_category, phrase.slug);

    // JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to say "${phrase.hindi_phrase}" professionally in English`,
        "step": [
            {
                "@type": "HowToStep",
                "text": `Instead of saying '${phrase.hindi_phrase}', use: '${phrase.pro_option_1}' in formal emails.`
            },
            {
                "@type": "HowToStep",
                "text": `For quick chats, use: '${phrase.pro_option_2}'`
            }
        ]
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
            "@type": "Question",
            "name": `What is the professional way to say "${phrase.hindi_phrase}"?`,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": `The professional way to say "${phrase.hindi_phrase}" is "${phrase.pro_option_1}". This is best suited for formal emails and documentation.`
            }
        }]
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Script
                id="json-ld-howto"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Script
                id="json-ld-faq"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {/* Sticky Top Bar for Navigation */}
            <nav className="bg-white border-b sticky top-0 z-40">
                <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                    <Link href="/corporate-phrasebook" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Dictionary
                    </Link>
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Home className="h-4 w-4" />
                        <span className="hidden sm:inline">EnglishGyani</span>
                    </Link>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
                <div className="grid md:grid-cols-[1fr_300px] gap-8">
                    {/* Main Content */}
                    <article>
                        <header className="mb-8">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4">
                                {phrase.intent_category}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                                How to say <span className="text-primary">&quot;{phrase.hindi_phrase}&quot;</span> professionally
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Stop translating directly from Hindi. Use these corporate-ready phrases instead.
                            </p>
                        </header>

                        {/* Direct Answer Box */}
                        <section className="bg-white rounded-2xl shadow-sm border p-6 mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Quote className="h-24 w-24" />
                            </div>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                                <Briefcase className="h-4 w-4" /> Professional Version
                            </h2>
                            <blockquote className="text-2xl md:text-3xl font-medium text-slate-900 leading-relaxed border-l-4 border-primary pl-6 py-2 bg-slate-50/50 rounded-r-lg">
                                &quot;{phrase.pro_option_1}&quot;
                            </blockquote>
                        </section>

                        {/* Interactive Switcher */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Zap className="h-6 w-6 text-yellow-500" />
                                Compare the Tones
                            </h2>
                            <ToneSwitcher
                                original={phrase.hindi_phrase}
                                polite={phrase.pro_option_2}
                                professional={phrase.pro_option_1}
                            />
                        </section>

                        {/* Context Section */}
                        <section className="prose prose-slate max-w-none bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 mb-8">
                            <h3 className="text-indigo-900 flex items-center gap-2 mt-0">
                                <BookOpen className="h-5 w-5" />
                                Why this works better
                            </h3>
                            <p className="text-indigo-900/80 mb-0 leading-relaxed">
                                {phrase.cultural_context}
                            </p>
                        </section>

                        {/* Detailed Content for SEO - solves thin content issue */}
                        <section className="prose prose-slate prose-lg max-w-none bg-white p-8 rounded-xl border shadow-sm mb-8">
                            <h2>When to Use This Phrase</h2>
                            <p>
                                In Indian corporate culture, direct translations from Hindi often sound either too casual or unintentionally rude.
                                The phrase <strong>"{phrase.hindi_phrase}"</strong> is commonly used in informal conversations, but in professional settings—especially emails,
                                meetings, and formal communications—it needs to be rephrased for clarity and professionalism.
                            </p>

                            <h3>Best Situations for This Phrase:</h3>
                            <ul>
                                <li><strong>Formal Emails:</strong> When communicating with managers, HR, clients, or cross-functional teams</li>
                                <li><strong>Video Calls & Meetings:</strong> During standup meetings, presentations, or client discussions</li>
                                <li><strong>Slack/Teams Chat:</strong> Quick professional updates without sounding too stiff</li>
                                <li><strong>Documentation:</strong> Project updates, status reports, or official communication</li>
                            </ul>

                            <h3>Example Scenarios:</h3>
                            <div className="bg-slate-50 p-5 rounded-lg border-l-4 border-primary my-6">
                                <p className="font-semibold text-slate-900 mb-2">❌ What NOT to say:</p>
                                <p className="text-slate-700 mb-0">"{phrase.hindi_phrase}"</p>
                            </div>

                            <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500 my-6">
                                <p className="font-semibold text-green-900 mb-2">✅ What TO say (Formal):</p>
                                <p className="text-green-800 mb-0">"{phrase.pro_option_1}"</p>
                            </div>

                            <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500 my-6">
                                <p className="font-semibold text-blue-900 mb-2">✅ What TO say (Casual):</p>
                                <p className="text-blue-800 mb-0">"{phrase.pro_option_2}"</p>
                            </div>

                            <h3>Why Indian Professionals Struggle Here</h3>
                            <p>
                                Many Indian professionals grew up speaking Hindi, regional languages, or Hinglish at home. When they enter corporate environments,
                                they often translate directly from their mother tongue, leading to phrases that sound awkward or unprofessional in English.
                            </p>
                            <p>
                                This specific phrase belongs to the <strong>{phrase.intent_category}</strong> category, which is particularly important for
                                career growth. Using the right tone here can make the difference between sounding confident vs. hesitant, or professional vs. casual.
                            </p>

                            <h3>Tips for Using This Professionally</h3>
                            <ul>
                                <li><strong>Match your audience:</strong> Use the formal version for external stakeholders, the casual version for team chats</li>
                                <li><strong>Tone matters:</strong> Even the right words can sound wrong if your tone is off—practice with our AI coach</li>
                                <li><strong>Context is key:</strong> Consider urgency, relationship, and medium (email vs call) before choosing your phrase</li>
                                <li><strong>Practice makes perfect:</strong> The more you use professional phrases, the more natural they'll feel</li>
                            </ul>

                            <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg mt-6">
                                <p className="font-bold text-amber-900 mb-2">💡 Pro Tip:</p>
                                <p className="text-amber-900 mb-0">
                                    Don't just memorize these phrases—understand the underlying principle. Professional English isn't about sounding fancy;
                                    it's about being clear, respectful, and direct. Practice with real scenarios to build confidence.
                                </p>
                            </div>
                        </section>

                        {/* Mobile only Related Scenarios (rendered below on desktop) */}
                        <div className="md:hidden">
                            <h3 className="font-bold text-lg mb-4">Related Scenarios</h3>
                            <div className="grid gap-3">
                                {relatedPhrases.map((p) => (
                                    <Link
                                        key={p.slug}
                                        href={`/phrases/${p.slug}`}
                                        className="block p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <span className="text-sm text-muted-foreground block mb-1">How to say:</span>
                                        <span className="font-medium text-primary">&quot;{p.hindi_phrase}&quot;</span>
                                    </Link>
                                ))}
                                {relatedPhrases.length === 0 && (
                                    <p className="text-muted-foreground text-sm">No related phrases found in this category yet.</p>
                                )}
                            </div>
                        </div>
                    </article>

                    {/* Sidebar (Desktop) */}
                    <aside className="hidden md:block">
                        <div className="sticky top-24 space-y-8">
                            <div className="bg-white rounded-xl border shadow-sm p-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <MessageCircle className="h-5 w-5 text-primary" />
                                    Related Scenarios
                                </h3>
                                <div className="space-y-3">
                                    {relatedPhrases.map((p) => (
                                        <Link
                                            key={p.slug}
                                            href={`/phrases/${p.slug}`}
                                            className="block p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                                        >
                                            <span className="text-xs text-muted-foreground block mb-1">How to say:</span>
                                            <span className="font-medium text-slate-800">&quot;{p.hindi_phrase}&quot;</span>
                                        </Link>
                                    ))}
                                    {relatedPhrases.length === 0 && (
                                        <p className="text-muted-foreground text-sm">No related phrases found.</p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl p-6 text-white shadow-lg">
                                <h3 className="font-bold text-lg mb-2">Need personal coaching?</h3>
                                <p className="text-indigo-200 text-sm mb-4">
                                    Practice these scenarios with our AI coach and get instant feedback on your tone.
                                </p>
                                <Link
                                    href="/dashboard"
                                    className="block w-full text-center py-2.5 px-4 bg-white text-indigo-900 rounded-lg font-semibold hover:bg-indigo-50 transition-colors text-sm"
                                >
                                    Start Free Practice
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <StickyCTA phrase={phrase.hindi_phrase} intentCategory={phrase.intent_category} />
        </div>
    );
}
