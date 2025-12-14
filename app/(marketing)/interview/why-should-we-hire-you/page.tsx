import type { Metadata } from 'next';
import PracticeAudioCTA from '@/components/tools/PracticeAudioCTA';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '"Why Should We Hire You?" Best Answer for Freshers (2025) | EnglishGyani',
    description: 'Stuck on "Why should we hire you?" Get 3 perfect answers for freshers. Generative AI tool to practice your answer for free. Best for Indian graduates.',
};

export default function HiringQuestionPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
                    <div className="inline-block px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">
                        Tricky Interview Question #1
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
                        How to Answer: <br className="hidden md:block" />
                        <span className="text-blue-600">"Why Should We Hire You?"</span>
                    </h1>

                    <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 max-w-2xl mx-auto shadow-sm mb-10 text-left">
                        <h3 className="text-sm font-bold text-slate-500 uppercase mb-3 tracking-wider">The "Perfect" Answer Script:</h3>
                        <p className="text-lg text-slate-800 font-medium leading-relaxed italic">
                            "As a fresher, I bring a lot of energy and a fresh perspective. I have the theoretical knowledge from my degree, and I am eager to apply it practically. I am a quick learner and I am ready to work hard to contribute to the company's growth while upgrading my own skills."
                        </p>
                        <div className="mt-6 text-center">
                            <PracticeAudioCTA topic="hiring" label="Speak This Answer Now" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-3xl mx-auto px-4 py-16">
                <div className="prose prose-lg prose-slate prose-headings:text-slate-900 prose-a:text-blue-600">

                    <h2>Why do HRs ask this? (Hinglish Logic)</h2>
                    <p>
                        Jab interviewer ye punchta hai, toh wo actually ye janna chahta hai:
                    </p>
                    <ul className="list-none pl-0 space-y-2">
                        <li>✅ <strong>Value:</strong> Aap company ke liye kya kar sakte hain?</li>
                        <li>✅ <strong>Fit:</strong> Kya aap company culture mein fit honge?</li>
                        <li>✅ <strong>Confidence:</strong> Kya aap khud pe believe karte hain?</li>
                    </ul>

                    <h3>❌ Avoid these "Desperate" Answers</h3>
                    <ul>
                        <li>"I need this job badly." (Bheek mat maango, value dikhao)</li>
                        <li>"Because I am the best." (Overconfidence mat dikhao)</li>
                        <li>"You are a big company." (Company ki taareef mat karo, apni value batao)</li>
                    </ul>

                    <h2>3 Best Sample Answers for Different Roles</h2>

                    <div className="bg-white border-l-4 border-indigo-500 p-6 shadow-sm my-6 rounded-r-lg">
                        <h4 className="text-indigo-700 font-bold m-0 mb-2">Option 1: For Software Engineers</h4>
                        <p className="m-0 text-slate-700">"You should hire me because I not only have Strong Java skills but also a problem-solving mindset. I have built 2 projects that show I can turn code into solutions, and I am ready to do the same for your team."</p>
                    </div>

                    <div className="bg-white border-l-4 border-emerald-500 p-6 shadow-sm my-6 rounded-r-lg">
                        <h4 className="text-emerald-700 font-bold m-0 mb-2">Option 2: For BPO / Customer Support</h4>
                        <p className="m-0 text-slate-700">"I have excellent patience and communication skills, which are crucial for this role. I can handle difficult situations calmly and ensure customer satisfaction, as I did during my college fest organization."</p>
                    </div>

                    <div className="bg-white border-l-4 border-amber-500 p-6 shadow-sm my-6 rounded-r-lg">
                        <h4 className="text-amber-700 font-bold m-0 mb-2">Option 3: For Sales / Marketing</h4>
                        <p className="m-0 text-slate-700">"I am a result-oriented person. Even in college, I led the sponsorship team and raised record funds. I am hungry for targets and ready to bring that same drive to your sales team."</p>
                    </div>

                    <h3>Practice Makes Perfect</h3>
                    <p>
                        Padh ke sab kuch aasan lagta hai, par interview room mein nervousness ki wajah se sab bhool jate hain.
                        Isliye <strong>Bolne ki Practice</strong> zaroori hai.
                    </p>

                    <div className="not-prose mt-8 p-8 bg-blue-600 rounded-2xl text-center text-white shadow-xl shadow-blue-200">
                        <h3 className="text-2xl font-bold mb-3">Ready to Crack the Interview?</h3>
                        <p className="mb-6 opacity-90 text-lg">Use our AI Gym to practice these answers until you sound 100% natural.</p>
                        <Link href="/dashboard/gym?topic=hiring" className="inline-block bg-white text-blue-700 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
                            Start Free Practice
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
