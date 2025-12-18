
import Link from 'next/link';
import { ArrowLeft, Brain, Globe2, Heart, Users } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-slate-50 border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                        About EnglishGyani
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        We are on a mission to democratize English learning in India.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto prose prose-lg prose-slate">
                    <h2>The Story Behind EnglishGyani</h2>
                    <p>
                        In 2023, we noticed a disturbing trend. Brilliant engineers, creative designers, and hardworking sales professionals in India were
                        losing opportunities simply because they hesitated to speak English. They had the technical skills, but the "Language Barrier"
                        acted as a glass ceiling.
                    </p>
                    <p>
                        Traditional coaching centers were not the solution. They were expensive, required travel, and focused on
                        archaic grammar rules that didn't help in real conversations. We realized that what people needed wasn't a
                        teacher with a stick, but a <strong>Gym for their Voice</strong>.
                    </p>

                    <h3>The Problem: Passive vs. Active Learning</h3>
                    <p>
                        Most people try to learn English by watching movies or reading books. This is "Passive Learning".
                        It helps you understand, but it doesn't help you speak. Speaking is a motor skill, like swimming or driving.
                        You cannot learn to swim by watching YouTube videos of Michael Phelps. You have to jump in the water.
                    </p>
                    <p>
                        <strong>EnglishGyani</strong> solves this by forcing you to speak. Our AI Coach asks you questions, listens to your answers,
                        and corrects your mistakes in real-time. It's like having a personal tutor available 24/7 in your pocket.
                    </p>

                    <h3>Our Core Values</h3>
                    <ul>
                        <li><strong>No Judgment:</strong> Making mistakes is the only way to learn. Our AI never judges you.</li>
                        <li><strong>Affordability:</strong> Quality education should not be a luxury. We are 90% cheaper than offline classes.</li>
                        <li><strong>Speed:</strong> We believe in "Minimum Viable Grammar". Learn only what you need to communicate effectively.</li>
                    </ul>

                    <blockquote>
                        "Our vision is an India where no one is rejected from a job interview because of their language skills."
                    </blockquote>

                    <h3>Join the Revolution</h3>
                    <p>
                        We are a team of engineers, linguists, and educators passionate about solving this problem.
                        If you are ready to break your barriers, join us today.
                    </p>

                    <h3>Our Technical Approach</h3>
                    <p>
                        We didn't just build a wrapper around ChatGPT. We built a proprietary "Accent Agnostic" layer that understands
                        Indian English nuances better than any US-based model.
                    </p>
                    <p>
                        <strong>The "fluency-engine":</strong> Our backend processes audio in real-time, checking for:
                    </p>
                    <ul>
                        <li><strong>Filler Words:</strong> Detecting "umm", "aaa", "like".</li>
                        <li><strong>Pacing:</strong> Are you speaking too fast (nervous) or too slow (unsure)?</li>
                        <li><strong>Grammar:</strong> Subject-Verb agreement errors common in Hindi-to-English translation.</li>
                    </ul>
                    <p>
                        This approach ensures that you get feedback that is actually relevant to <strong>your</strong> speaking style,
                        not generic advice.
                    </p>

                    <h3>Backed by Research</h3>
                    <p>
                        Our curriculum is based on the "Input Hypothesis" by Stephen Krashen and the "Output Hypothesis" by Swain.
                        Research shows that you need Comprehensible Input (Reading/Listening) + Comprehensible Output (Speaking/Writing)
                        to achieve fluency. EnglishGyani provides both in a balanced loop.
                    </p>
                </div>
            </section>
        </div>
    );
}
