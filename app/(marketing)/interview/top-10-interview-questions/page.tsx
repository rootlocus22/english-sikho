import type { Metadata } from 'next';
import Link from 'next/link';
import { Mic, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Top 10 Interview Questions and Answers for Freshers | EnglishGyani',
    description: 'Prepare for your first job interview with the top 10 most asked questions. Sample answers for "Tell me about yourself", "Salary expectations", and more.',
    alternates: {
        canonical: '/interview/top-10-interview-questions',
    },
};

const questions = [
    {
        id: 1,
        q: "Tell me about yourself.",
        hint: "Past + Present + Future formula use karein.",
        link: "/tools/self-introduction-generator"
    },
    {
        id: 2,
        q: "Why should we hire you?",
        hint: "Company ka faayda batayein, apna nahi.",
        link: "/interview/why-should-we-hire-you"
    },
    {
        id: 3,
        q: "What are your strengths and weaknesses?",
        hint: "Honest rahein, par weakness ko improve karte hue dikhayein.",
        link: "/interview/strengths-and-weaknesses"
    },
    {
        id: 4,
        q: "Where do you see yourself in 5 years?",
        hint: "Ambition dikhayein, par loyal rahein.",
        answer: "I see myself growing with this company and taking on more responsibilities as a senior [Role]."
    },
    {
        id: 5,
        q: "Why do you want work here?",
        hint: "Company ki research show karein.",
        answer: "I admire your company's work in [Field] and I want to be part of such an innovative team."
    },
    {
        id: 6,
        q: "Can you handle pressure?",
        hint: "Example ke saath haan bolein.",
        answer: "Yes, during my exams/projects, I learned to prioritize tasks and stay calm."
    },
    {
        id: 7,
        q: "Are you willing to relocate?",
        hint: "Fresher hain toh 'Yes' hi bolein.",
        answer: "Yes, I am excited to travel and explore new places for my career."
    },
    {
        id: 8,
        q: "What is your salary expectation?",
        hint: "Market standard ka reference dein.",
        answer: "As per industry standards for a fresher with my skills."
    },
    {
        id: 9,
        q: "Do you have any questions for us?",
        hint: "Hamesha ek sawal puchein (Smart lagta hai).",
        answer: "Yes, what does a typical day look like for this role?"
    },
    {
        id: 10,
        q: "Briefly explain your project.",
        hint: "Problem -> Solution -> Your Role.",
        answer: "I built a [Project Name] that solves [Problem]. My role was [Your Role]."
    }
];

export default function TopQuestionsPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                        Top 10 <span className="text-blue-600">Interview Questions</span> <br /> & Answers for Freshers
                    </h1>
                    <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                        In 10 sawalo ke bahar kuch nahi aayega. Inhe master kar liya, toh job pakki.
                        Taiyar hain practice ke liye?
                    </p>
                    <Link
                        href="/dashboard/gym?topic=mock"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
                    >
                        <Mic className="w-5 h-5" /> Start Full Mock Interview
                    </Link>
                </div>
            </div>

            {/* Questions List */}
            <div className="max-w-3xl mx-auto px-4 py-12">
                <div className="space-y-6">
                    {questions.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                                            {item.id}
                                        </span>
                                        <h3 className="text-xl font-bold text-slate-900">{item.q}</h3>
                                    </div>
                                    <p className="text-amber-700 text-sm font-medium ml-11 mb-3 bg-amber-50 inline-block px-2 py-1 rounded">
                                        💡 Hint: {item.hint}
                                    </p>
                                    {item.answer && (
                                        <p className="text-slate-600 ml-11 italic text-sm border-l-2 border-slate-300 pl-3">
                                            "{item.answer}"
                                        </p>
                                    )}
                                </div>
                                {item.link && (
                                    <Link
                                        href={item.link}
                                        className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </Link>
                                )}
                            </div>

                            {/* Mobile View / Action Area */}
                            <div className="mt-4 ml-11 flex flex-wrap gap-3">
                                <Link
                                    href={`/dashboard/gym?topic=${item.id === 1 ? 'intro' : 'interview'}`}
                                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                                >
                                    <Mic className="w-3 h-3" /> Practice this
                                </Link>
                                {item.link && (
                                    <Link
                                        href={item.link}
                                        className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1"
                                    >
                                        Read Deep Dive →
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Don't Memorize. Internalize.</h3>
                    <p className="opacity-80 mb-8 max-w-xl mx-auto">
                        Interviewers ko pata chal jata hai jab aap rattu-tota bante hain.
                        AI ke saath practice karke natural fluency layein.
                    </p>
                    <Link
                        href="/dashboard/gym"
                        className="inline-block px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors"
                    >
                        Go to AI Gym
                    </Link>
                </div>
            </div>
        </div>
    );
}
