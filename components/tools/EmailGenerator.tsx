'use client';

import { useState } from 'react';
import { Send, Copy, Check, Sliders } from 'lucide-react';

export default function EmailGenerator() {
    const [formData, setFormData] = useState({
        recipient: '',
        topic: '',
        keyPoints: '',
        tone: 50 // 0 = Casual, 100 = Formal
    });

    const [generatedEmail, setGeneratedEmail] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    const getToneLabel = (value: number) => {
        if (value < 30) return "Casual (Yaar/Dost)";
        if (value > 70) return "Strictly Professional";
        return "Semi-Formal (Office)";
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate AI generation lag
        setTimeout(() => {
            const tone = formData.tone;
            let subject = `Regarding ${formData.topic || 'Important Matter'}`;
            let salutation = tone < 30 ? `Hi ${formData.recipient},` : `Dear ${formData.recipient},`;
            let closing = tone < 30 ? "Cheers," : "Sincerely,";

            let body = "";

            if (tone < 30) {
                body = `Just wanted to quickly talk about ${formData.topic}. \n\n${formData.keyPoints ? `Here's the thing: ${formData.keyPoints}.` : "I need to discuss this with you whenever you're free."} \n\nLet me know!`;
            } else if (tone > 70) {
                body = `I am writing to formally bring to your attention regarding ${formData.topic}. \n\n${formData.keyPoints ? `Key details are as follows: ${formData.keyPoints}.` : "I would appreciate a moment of your time to discuss this matter in detail."} \n\nThank you for your understanding.`;
            } else {
                body = `I wanted to reach out regarding ${formData.topic}. \n\n${formData.keyPoints ? `Basically: ${formData.keyPoints}.` : "Can we have a quick sync on this?"} \n\nLooking forward to hearing from you.`;
            }

            setGeneratedEmail(`Subject: ${subject}\n\n${salutation}\n\n${body}\n\n${closing}\n[Your Name]`);
            setIsGenerating(false);
        }, 1500);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedEmail);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
            <div className="bg-slate-900 p-6 text-white">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Send className="w-5 h-5 text-indigo-400" />
                    Professional Email Writer
                </h3>
            </div>

            <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">To (Recipient Name)</label>
                        <input
                            type="text"
                            placeholder="e.g. Amit Sir / HR Manager"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.recipient}
                            onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Topic / Reason</label>
                        <input
                            type="text"
                            placeholder="e.g. Sick Leave / Resignation"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.topic}
                            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Key Points (You can write in Hinglish)</label>
                        <textarea
                            rows={3}
                            placeholder="e.g. Kal raat se bukhaar hai, doctor ne 2 days rest bola hai."
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                            value={formData.keyPoints}
                            onChange={(e) => setFormData({ ...formData, keyPoints: e.target.value })}
                        />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Sliders className="w-4 h-4" /> Tone
                            </label>
                            <span className={`text-xs font-bold px-2 py-1 rounded ${formData.tone > 70 ? 'bg-indigo-100 text-indigo-700' : formData.tone < 30 ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                {getToneLabel(formData.tone)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={formData.tone}
                            onChange={(e) => setFormData({ ...formData, tone: parseInt(e.target.value) })}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">
                            <span>Casual</span>
                            <span>Formal</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                    >
                        {isGenerating ? 'Writing...' : 'Write My Email'}
                    </button>
                </div>

                {/* Output */}
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 relative">
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={handleCopy}
                            disabled={!generatedEmail}
                            className="p-2 text-slate-500 hover:text-indigo-600 transition-colors"
                            title="Copy to clipboard"
                        >
                            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                        </button>
                    </div>

                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Preview</h4>

                    {generatedEmail ? (
                        <div className="prose prose-slate prose-sm">
                            <pre className="text-slate-800 font-sans whitespace-pre-wrap leading-relaxed bg-transparent border-none p-0">
                                {generatedEmail}
                            </pre>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[200px]">
                            <Send className="w-12 h-12 mb-4 opacity-10" />
                            <p className="text-sm">Adjust tone & details to see magic...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
