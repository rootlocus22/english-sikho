import Link from "next/link";
import { ArrowRight, MessageSquare, Mic, PenTool, Sparkles } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free English Tools | EnglishGyani",
    description: "Access our collection of free AI-powered tools to improve your corporate English. Generators, Templates, and Practice Exercises.",
};

const TOOLS = [
    {
        title: "Self Introduction Generator",
        description: "Create a professional introduction for interviews in 10 seconds.",
        href: "/tools/self-introduction-generator",
        icon: Sparkles,
        color: "bg-blue-100 text-blue-600"
    },
    {
        title: "Top 10 Interview Questions",
        description: "Prepare for the most common HR questions with simplified answers.",
        href: "/interview/top-10-interview-questions",
        icon: Mic,
        color: "bg-purple-100 text-purple-600"
    },
    {
        title: "Professional Email Writer",
        description: "Templates for sick leave, resignation, salary negotiation, and more.",
        href: "/templates/sick-leave-email",
        icon: MessageSquare,
        color: "bg-green-100 text-green-600"
    },
    {
        title: "Resignation Letter Generator",
        description: "Generate a polite and professional resignation letter instantly.",
        href: "/templates/resignation-letter-generator",
        icon: PenTool,
        color: "bg-orange-100 text-orange-600"
    }
];

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 z-0 h-full w-full bg-slate-50 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

            <div className="container mx-auto px-4 py-20 relative z-10 max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                        Free English Tools
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Powerful, free utilities to help you navigate your career with confidence.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {TOOLS.map((tool) => (
                        <Link key={tool.href} href={tool.href} className="group">
                            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 h-full flex flex-col">
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${tool.color}`}>
                                        <tool.icon className="w-7 h-7" />
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {tool.title}
                                </h2>
                                <p className="text-slate-500 leading-relaxed text-lg">
                                    {tool.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
