import type { Metadata } from 'next';
import PracticeAudioCTA from '@/components/tools/PracticeAudioCTA';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'List of Strengths and Weaknesses for Interview (With Examples) | EnglishGyani',
    description: 'What are your strengths and weaknesses? Best answers for freshers. List of safe weaknesses to mention in interviews. AI Practice Tool.',
};

export default function StrengthsWeaknessesPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
                    <div className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
                        Personal Interview Questions
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
                        What are your <span className="text-blue-600">Strengths & Weaknesses?</span>
                    </h1>

                    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10 text-left">
                        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                            <h3 className="text-sm font-bold text-green-700 uppercase mb-2">✅ Best Strengths</h3>
                            <ul className="text-slate-700 space-y-2 font-medium">
                                <li>• Quick Learner</li>
                                <li>• Adaptable</li>
                                <li>• Team Player</li>
                                <li>• Problem Solver</li>
                            </ul>
                        </div>
                        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                            <h3 className="text-sm font-bold text-orange-700 uppercase mb-2">⚠️ Safe Weaknesses</h3>
                            <ul className="text-slate-700 space-y-2 font-medium">
                                <li>• Public Speaking (Improving)</li>
                                <li>• Self-Critical</li>
                                <li>• Too Detail Oriented</li>
                                <li>• Hard to say "No"</li>
                            </ul>
                        </div>
                    </div>

                    <PracticeAudioCTA topic="strengths" label="Practice Your List" />
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-3xl mx-auto px-4 py-16">
                <div className="prose prose-lg prose-slate prose-headings:text-slate-900 prose-a:text-blue-600">

                    <h2>The Logic Behind "Weakness"</h2>
                    <p>
                        HR ye nahi janna chahta ki aap mein kya kharabi hai. Wo ye dekhna chahta hai ki:
                        <strong> Are you honest and self-aware?</strong>
                    </p>
                    <p>
                        Sabse badi galti hoti hai ye kehna: <em>"I use Facebook too much"</em> ya <em>"I am lazy"</em>.
                        Aise weaknesses batayein jo job pe asar na daalein, aur jise aap sudhaar rahe hain.
                    </p>

                    <h3>How to Frame Your Weakness (The "Positive Spin")</h3>
                    <p>
                        Trick ye hai ki weakness ke saath ek <strong>Solution</strong> bhi batayein.
                    </p>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm not-prose space-y-4">
                        <div className="flex gap-4 items-start">
                            <div className="bg-red-100 text-red-600 font-bold px-2 py-1 rounded text-sm mt-1">BAD</div>
                            <p className="text-slate-700">"I have a problem with public speaking." <span className="text-slate-400">(Shows lack of confidence)</span></p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="bg-green-100 text-green-600 font-bold px-2 py-1 rounded text-sm mt-1">GOOD</div>
                            <p className="text-slate-700">"I used to find public speaking difficult, but I have joined a weekly group discussion club to improve it. Now I am much more confident." <span className="text-slate-400">(Shows growth mindset)</span></p>
                        </div>
                    </div>

                    <h2>Top 5 Strengths for Freshers</h2>
                    <ol>
                        <li>
                            <strong>Adaptable:</strong> "Change is constant, aur main nayi situations mein jaldi adjust ho jata hoon."
                        </li>
                        <li>
                            <strong>Hardworking:</strong> "Main fresh hoon, isliye extra hours aur effort daalne ke liye ready hoon."
                        </li>
                        <li>
                            <strong>Creative:</strong> "Main purani problems ke liye naye solutions dhoondh sakta hoon."
                        </li>
                        <li>
                            <strong>Punctual:</strong> "Time ki value karta hoon." (Always a safe bet!)
                        </li>
                        <li>
                            <strong>Optimistic:</strong> "Positive attitude rakhta hoon, even in pressure."
                        </li>
                    </ol>

                    <h3>Test Your Answer</h3>
                    <p>
                        Apna answer record karein aur sunein. Kya aap confident lag rahe hain? Ya rattu-tota?
                        EnglishGyani AI aapko batayega ki aapki tone natural hai ya nahi.
                    </p>

                    <div className="not-prose mt-8 text-center">
                        <PracticeAudioCTA topic="strengths" label="Go to AI Gym" className="scale-110" />
                    </div>

                </div>
            </div>
        </div>
    );
}
