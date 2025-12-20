import TranslatorComponent from "@/components/TranslatorComponent";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "WhatsApp to Official Email Converter | EnglishGyani",
    description: "Convert informal WhatsApp messages or Hinglish into professional corporate emails instantly with AI. Free tool for Indian professionals.",
};

export default function WhatsAppToEmailPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8">
                <Link href="/tools" className="flex items-center text-sm text-slate-500 hover:text-blue-600 mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Tools
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    WhatsApp to Official Email 📧
                </h1>
                <p className="text-lg text-slate-600">
                    Drafted a message in Hinglish on WhatsApp? Don't send it yet.
                    Paste it below, and our AI will turn it into a <strong>Professional Email</strong> suitable for your boss or client.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-600 opacity-10"></div>
                <div className="p-6 md:p-8">
                    <TranslatorComponent />
                </div>
            </div>

            <div className="mt-12 bg-blue-50 rounded-xl p-8 border border-blue-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Why use this tool?</h2>
                <ul className="space-y-3 text-slate-700">
                    <li className="flex gap-2">
                        <span>✅</span>
                        <span><strong>Remove "SMS Language":</strong> Fixes "u r", "plz", and other informal abbreviations.</span>
                    </li>
                    <li className="flex gap-2">
                        <span>✅</span>
                        <span><strong>Hinglish Support:</strong> Understands "Kal leave chahiye" and writes "Requesting leave for tomorrow".</span>
                    </li>
                    <li className="flex gap-2">
                        <span>✅</span>
                        <span><strong>Tone Check:</strong> Ensures you don't sound rude or demanding.</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
