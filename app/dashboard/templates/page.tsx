"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SCENARIO_DATA } from "@/data/scenarios";
import { Mail, BookA, Linkedin, Hash, MessageSquare } from "lucide-react";
import { TrackedLink } from "@/components/ui/tracked-elements";

const CATEGORY_ICONS: Record<string, any> = {
    email: Mail,
    vocabulary: BookA,
    linkedIn: Linkedin,
    slack: Hash,
    messages: MessageSquare
};

const CATEGORY_LABELS: Record<string, string> = {
    email: "Email Templates",
    vocabulary: "Confusing Words",
    linkedIn: "LinkedIn Messages",
    slack: "Deep Work / Slack Updates",
    messages: "Chats"
};

export default function TemplatesPage() {
    return (
        <div className="max-w-5xl mx-auto w-full py-8 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-800">Template Library</h1>
                <p className="text-slate-500">Ready-to-use professional templates for every situation.</p>
            </div>

            <div className="space-y-12">
                {Object.entries(SCENARIO_DATA).map(([category, items]) => {
                    const Icon = CATEGORY_ICONS[category] || Mail;
                    return (
                        <div key={category} className="scroll-mt-20">
                            <h2 className="text-xl font-bold capitalize flex items-center gap-2 mb-4 text-slate-800 border-b pb-2">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    <Icon className="w-5 h-5" />
                                </div>
                                {CATEGORY_LABELS[category] || category}
                            </h2>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {items.map((item) => (
                                    <TrackedLink
                                        key={item.slug}
                                        href={`/dashboard/templates/${category}/${item.slug}`}
                                        eventData={{ action: 'select_template', category: 'content', label: item.title }}
                                    >
                                        <Card className="h-full hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300">
                                            <CardHeader>
                                                <CardTitle className="text-base">{item.title}</CardTitle>
                                                <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </TrackedLink>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
