"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Upload, FileImageIcon } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { toast } from "sonner";

export default function EmailDecoder() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const { credits, decrementCredits, openPaywall } = useUserStore();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!preview) return;

        if (credits <= 0) {
            openPaywall();
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            // Extract base64 content
            const base64Data = preview.split(',')[1];

            const response = await fetch("/api/ai/coach", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "image-analysis",
                    imageBase64: base64Data
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setResult(data);
            decrementCredits();
            toast.success("Analysis complete!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to analyze image. Try a smaller image.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Upload Screenshot</CardTitle>
                    <CardDescription>Upload a screenshot of the confusing email or message.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {preview ? (
                            <img src={preview} alt="Preview" className="max-h-[250px] object-contain rounded-md" />
                        ) : (
                            <div className="text-center text-slate-500">
                                <Upload className="mx-auto h-12 w-12 mb-2 text-slate-400" />
                                <p>Click to upload or drag & drop</p>
                            </div>
                        )}
                    </div>
                    <Button onClick={handleAnalyze} disabled={loading || !preview} className="w-full">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileImageIcon className="mr-2 h-4 w-4" />}
                        Analyze Meaning
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <Card className="border-blue-200 shadow-md">
                    <CardHeader className="bg-blue-50/50">
                        <CardTitle className="text-blue-900">Analysis Result</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Real Meaning (Hidden Subtext)</h4>
                            <p className="text-lg font-medium text-slate-800">{result.realMeaning}</p>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Suggested Replies</h4>
                            <Tabs defaultValue="safe" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    {result.replies.map((r: any, i: number) => (
                                        <TabsTrigger key={i} value={r.type.toLowerCase().replace(' ', '-')}>{r.type}</TabsTrigger>
                                    ))}
                                </TabsList>
                                {result.replies.map((r: any, i: number) => (
                                    <TabsContent key={i} value={r.type.toLowerCase().replace(' ', '-')} className="mt-4">
                                        <div className="bg-slate-100 p-4 rounded-md text-slate-800 text-sm whitespace-pre-wrap">
                                            {r.text}
                                        </div>
                                        <Button variant="ghost" size="sm" className="mt-2 w-full" onClick={() => {
                                            navigator.clipboard.writeText(r.text);
                                            toast.success("Copied!");
                                        }}>
                                            Copy
                                        </Button>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
