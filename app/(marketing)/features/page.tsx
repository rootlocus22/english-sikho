import FeaturesSection from "@/components/FeaturesSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Features - EnglishGyani | AI Speaking Coach, Tone Rewriter & More',
    description: 'Explore all EnglishGyani features: AI Speaking Coach, Tone Rewriter, Interview Simulator, and Vocabulary Gym.',
    alternates: {
        canonical: '/features',
    },
};

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col">


            <div className="flex-1">
                {/* Hero */}
                <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
                    <div className="container max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Har Situation ke liye <span className="text-blue-600">Perfect Tool</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Office emails, boss ke saath baat, presentations - har cheez ke liye EnglishGyani mein ek solution hai. Aur sab kuch FREE!
                        </p>
                    </div>
                </section>

                {/* Features Detail */}
                <FeaturesSection />

                {/* Detailed Feature Breakdown for SEO */}
                <section className="py-20 px-4 max-w-4xl mx-auto">
                    <div className="space-y-16">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">1. AI Speaking Coach</h2>
                            <p className="text-lg text-slate-700">
                                This is our flagship feature. Unlike other apps that just make you repeat sentences, our Coach has a conversation with you.
                                It asks questions based on your previous answers. If you make a grammar mistake, it gently corrects you after
                                the conversation is over, so your flow isn't broken. It's like having a friendly native speaker friend available 24/7.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">2. The "Tone" Rewriter</h2>
                            <p className="text-lg text-slate-700">
                                Have you ever written an email that sounded too rude? Or too weak? Our Tone Rewriter takes your rough English
                                input and transforms it into 3 variations: Professional, Friendly, or Assertive. This is perfect for
                                handling difficult client situations or asking for a raise.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">3. Interview Simulator</h2>
                            <p className="text-lg text-slate-700">
                                Nervous about your next job interview? We have simulated interviews for over 50 roles (Sales, HR, Engineering, etc.).
                                The AI acts as a strict interviewer, asking follow-up questions to test your depth. You get a score at the end
                                comprising Compatibility, Grammar, and Confidence metrics.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">4. Vocabulary "Gym"</h2>
                            <p className="text-lg text-slate-700">
                                Memorizing words from a dictionary doesn't work. Our Gym forces you to use new words in sentences.
                                The AI checks if you used the word correctly in context. This "Active Recall" method builds permanent muscle memory.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-blue-600 text-white text-center px-4">
                    <div className="container max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Sare features try karo - Bilkul FREE!
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            No credit card, no payment - bas Google se login karo aur shuru ho jao.
                        </p>
                        <a href="/dashboard" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-xl">
                            Try All Features Now
                        </a>
                    </div>
                </section>
            </div>


        </div>
    );
}
