"use client";

import ToneRewriter from "@/components/ToneRewriter";
import TranslatorComponent from "@/components/TranslatorComponent";
import VoiceSettings from "@/components/VoiceSettings";

export default function DashboardPage() {
    return (
        <div className="space-y-6 md:space-y-8">
            {/* Page Header */}
            <div className="-mx-4 -mt-4 border-b border-slate-200 bg-white px-4 py-6 md:px-6 md:py-8">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">Fix My English</h1>
                        <p className="text-sm text-slate-600 md:text-base">
                            Instantly translate 'Hinglish' to Corporate English or adjust your tone.
                        </p>
                    </div>
                    <VoiceSettings />
                </div>
            </div>

            {/* Tools Grid */}
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                <TranslatorComponent />
                <ToneRewriter />
            </div>
        </div>
    );
}
