'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

export default function SelfIntroGenerator() {
    const [formData, setFormData] = useState({
        name: '',
        qualification: '',
        role: '',
        experience: 'Fresher',
        strength: ''
    });

    const [generatedScript, setGeneratedScript] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate AI generation lag for effect
        setTimeout(() => {
            const script = `Good morning/afternoon, Sir/Ma'am.

My name is ${formData.name || '[Your Name]'}. I recently completed my ${formData.qualification || '[Degree]'} from [University Name].

I am very excited to apply for the ${formData.role || '[Job Role]'} position at your company. 
${formData.strength ? `My key strength is ${formData.strength}.` : 'I am a quick learner and very hardworking.'}

Although I am a fresher, I have done projects that have helped me build relevant skills. I am eager to start my career with a reputed organization like yours where I can learn and grow.

Thank you for giving me this opportunity to introduce myself.`;

            setGeneratedScript(script);
            setIsGenerating(false);
        }, 1500);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedScript);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Free AI Introduction Generator</h3>
                <p className="opacity-90 text-sm">Fill details - Get ready-to-speak script</p>
            </div>

            <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Your Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Rahul Kumar"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Qualification (Degree)</label>
                        <input
                            type="text"
                            placeholder="e.g. B.Tech in Computer Science"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.qualification}
                            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Target Job Role</label>
                        <input
                            type="text"
                            placeholder="e.g. Java Developer / Sales Executive"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Key Strength (One Word)</label>
                        <input
                            type="text"
                            placeholder="e.g. Hardworking / Creative / Team Player"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.strength}
                            onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
                        />
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 mt-4"
                    >
                        {isGenerating ? (
                            <>Generating...</>
                        ) : (
                            <><Sparkles className="w-5 h-5" /> Generate My Introduction</>
                        )}
                    </button>
                </div>

                {/* Output */}
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 relative">
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={handleCopy}
                            disabled={!generatedScript}
                            className="p-2 text-slate-500 hover:text-blue-600 transition-colors"
                            title="Copy to clipboard"
                        >
                            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                        </button>
                    </div>

                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Your Script:</h4>

                    {generatedScript ? (
                        <div className="prose prose-slate">
                            <p className="text-slate-800 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                                {generatedScript}
                            </p>
                            <div className="mt-6 p-3 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-800">
                                💡 <strong>Pro Tip:</strong> Don't just read it. Memorize the flow, but speak naturally.
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[200px]">
                            <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                            <p>Fill the form to see magic...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
