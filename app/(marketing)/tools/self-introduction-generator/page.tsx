import type { Metadata } from 'next';
import Link from 'next/link';
import SelfIntroGenerator from '@/components/tools/SelfIntroGenerator';

export const metadata: Metadata = {
    title: 'Self Introduction for Freshers: Generate Your Answer in 10s | EnglishGyani',
    description: 'Scared of "Tell me about yourself"? Use our Free AI Self Introduction Generator. Best answer script for freshers in India. Practice with AI.',
};

export default function SelfIntroToolPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section with Tool */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
                    <div className="text-center mb-10">
                        <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold mb-4 tracking-wide uppercase">
                            For Freshers & Job Seekers
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                            Create Your <span className="text-blue-600">Self Introduction</span> in 10 Seconds
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Interview kal hai aur darr lag raha hai? Don't worry. Enter your details and get a professional script tailored for Indian freshers.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <SelfIntroGenerator />
                    </div>
                </div>
            </div>

            {/* SEO Content Section */}
            <div className="max-w-3xl mx-auto px-4 py-16">
                <div className="prose prose-lg prose-slate prose-headings:text-slate-900 prose-a:text-blue-600">

                    <h2>Why is "Tell Me About Yourself" so scary?</h2>
                    <p>
                        Yeh sawal interview ka sabse pehla aur sabse important sawal hota hai. Agar aapne iska jawab confidence se diya, toh 50% job wahi pakki ho jati hai.
                        Most students galti kya karte hain? Woh apni puri life history batane lagte hain.
                    </p>

                    <div className="bg-red-50 p-6 rounded-xl border border-red-100 my-8 not-prose">
                        <h3 className="text-red-800 font-bold text-lg mb-2">❌ 3 Big Mistakes Freshers Make:</h3>
                        <ul className="space-y-2 text-red-700">
                            <li className="flex items-start gap-2">
                                <span className="mt-1">🚫</span> "Myself Rahul..." (Grammatically wrong. Say "I am Rahul")
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1">🚫</span> Talking about family background in detail (Father is farmer, etc. - Not relevant yet)
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1">🚫</span> Ratta maara hua answer (Robotic sounding)
                            </li>
                        </ul>
                    </div>

                    <h2>The Perfect Formula: Past + Present + Future</h2>
                    <p>
                        Ek perfect self-introduction teen cheezon se banta hai:
                    </p>
                    <ul>
                        <li><strong>Present:</strong> Aap kaun hain aur abhi kya kar rahe hain? (Name, Qualification)</li>
                        <li><strong>Past:</strong> Aapne kya seekha hai? (Skills, Projects, Internships)</li>
                        <li><strong>Future:</strong> Aap ye job kyun chahte hain? (Why this company?)</li>
                    </ul>

                    <h3>Sample Answer for Software Engineer Fresher</h3>
                    <blockquote className="bg-slate-100 border-l-4 border-blue-500 italic p-4 rounded-r-lg">
                        "Hi, I am Rahul. I recently completed my B.Tech in CSE. I am passionate about coding and have built 2 projects using React and Java. I am a quick learner and I am looking for a platform where I can apply my skills and grow as a developer."
                    </blockquote>

                    <h3>Ab Kya Karein? (Next Steps)</h3>
                    <p>
                        Script toh ban gayi, par interview mein <strong>BOLNA</strong> padega. Writing is easy, speaking is hard.
                    </p>
                    <p>
                        EnglishGyani ka <strong>AI Interview Gym</strong> join karein jahan aap is script ko bolkar practice kar sakte hain. Humara AI aapko batayega ki aap confident lag rahe hain ya nahi.
                    </p>

                    <div className="not-prose mt-10 text-center">
                        <Link
                            href="/dashboard/gym"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-green-600 rounded-xl hover:bg-green-700 shadow-green-200 shadow-xl"
                        >
                            Practice Speaking This Answer (Free)
                        </Link>
                        <p className="mt-3 text-sm text-slate-500">No credit card required. 100% Free for Freshers.</p>
                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-200">
                        <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-slate-800">Q: Should I mention my hobbies?</h4>
                                <p className="text-slate-600">Yes, but keep it brief. "I like playing cricket" shows you are active and a team player.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">Q: How long should the introduction be?</h4>
                                <p className="text-slate-600">Ideally 60-90 seconds. Anything longer than 2 minutes is boring.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
