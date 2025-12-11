"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { SCENARIO_DATA } from "@/data/scenarios";
import ToneRewriter from "@/components/ToneRewriter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Helper component to pre-fill ToneRewriter
// Since ToneRewriter doesn't accept props for initial value in my implementation, 
// I might need to update ToneRewriter or wrap it. 
// Actually, I should update ToneRewriter to accept `initialValue`.
// But to save time, I will create a wrapper or just update ToneRewriter.
// Let's update ToneRewriter.tsx first to accept 'defaultValue' prop.

// WAIT: I can just render ToneRewriter.tsx and passing props.
// I need to check ToneRewriter.tsx first. It currently uses `useState("")`.
// I will assume I update it.

export default function TemplateRunnerPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { category, slug } = use(params);

    // @ts-ignore
    const categoryData = SCENARIO_DATA[category as keyof typeof SCENARIO_DATA];
    if (!categoryData) return notFound();

    const scenario = categoryData.find((s: any) => s.slug === slug);
    if (!scenario) return notFound();

    return (
        <div className="max-w-4xl mx-auto w-full py-8 space-y-6">
            <Link href="/dashboard/templates" className="flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Library
            </Link>

            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-800">{scenario.title}</h1>
                <p className="text-slate-600">{scenario.description}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800 mb-6">
                <strong>Tip:</strong> This is a template. Adjust the tone slider to make it sound exactly how you want!
            </div>

            <ToneRewriter initialValue={scenario.default_text} />
        </div>
    );
}
