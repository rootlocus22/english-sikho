"use client";

import ToneRewriter from "@/components/ToneRewriter";

export default function ToneRewriterPage() {
    return (
        <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-2xl font-bold mb-6 text-slate-900">Boss-Friendly Emailer</h1>
            <ToneRewriter />
        </div>
    );
}
