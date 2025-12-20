"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SCENARIO_DATA } from "@/data/scenarios";
import { Mail, BookA } from "lucide-react";
import { TrackedLink } from "@/components/ui/tracked-elements";

export default function TemplatesPage() {
    return (
        <div className="max-w-5xl mx-auto w-full py-8 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-800">Scenario Library</h1>
                <p className="text-slate-500">Pick a template to start practicing.</p>
            </div>

            <div className="space-y-8">
                {Object.entries(SCENARIO_DATA).map(([category, items]) => (
                    <div key={category}>
                        <h2 className="text-xl font-bold capitalize flex items-center gap-2 mb-4 text-slate-700">
                            {category === 'email' ? <Mail className="w-5 h-5" /> : <BookA className="w-5 h-5" />}
                            {category} Scenarios
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
                ))}
            </div>
        </div>
    );
}
