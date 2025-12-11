import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '@/lib/gemini';

const TRANSLATOR_SYSTEM_PROMPT = `You are an expert Corporate English Coach for Indian professionals. You understand Hindi, Tamil, Telugu, and 'Hinglish'. Your goal is to take informal or broken input and output perfectly grammatically correct, professional English options.
Output ONLY a valid JSON object with the following keys:
{
  "formal": "String - Extremely formal version",
  "persuasive": "String - Persuasive and strong version",
  "casualProfessional": "String - Professional but relaxed version"
}
Do not include \`\`\`json or any other text.`;

const COACH_SYSTEM_PROMPT = `You are a strict English Pronunciation and Grammar Coach. Compare the user's spoken input with the target text.
Analyze if the meaning was conveyed and if the words match the target.
Output ONLY a valid JSON object with:
{
  "score": number (0-100 integer),
  "feedback": "Short constructive feedback.",
  "incorrectIndices": number[] (indices of words in the spoken input that seem wrong/extra, or -1 if missing)
}
Actually, for simplicity, just return:
{
  "score": number (0-100),
  "feedback": "string",
  "analysis": "string detailing what went wrong"
}
Do not include \`\`\`json.`;

const REWRITE_SYSTEM_PROMPT = `You are an expert English Editor. Your goal is to rewrite the input text to match a specific tone level (1-4).
Levels:
1: Direct / Rude / Blunt
2: Casual / Friendly
3: Professional / Standard Corporate
4: Extremely Formal / Diplomatic / "Butter-Polite"

Output ONLY a valid JSON object with:
{
  "rewritten": "String - The rewritten text",
  "explanation": "String - Brief explanation of changes"
}
Do not include \`\`\`json.`;

export async function POST(req: NextRequest) {
    try {
        // Read body ONCE and destructure all possible fields
        const body = await req.json();
        const { type, input, target, toneLevel, history, scenarioId, imageBase64 } = body;

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "Gemini API Key missing" }, { status: 500 });
        }

        let prompt = "";
        if (type === 'translator') {
            prompt = `${TRANSLATOR_SYSTEM_PROMPT}\n\nInput: "${input}"`;
        } else if (type === 'coach') {
            prompt = `${COACH_SYSTEM_PROMPT}\n\nTarget Text: "${target}"\nSpoken Text: "${input}"`;
        } else if (type === 'tone-rewrite') {
            prompt = `${REWRITE_SYSTEM_PROMPT}\n\nInput: "${input}"\nTone Level: ${toneLevel}`;
        } else if (type === 'roleplay-chat') {
            // Simple stringify of history for the prompt
            const historyText = history.map((m: any) => `${m.role === 'user' ? 'Employee' : 'Manager'}: ${m.content}`).join('\n');
            const scenarioPrompt = scenarioId === 'salary' ? "You are a tough manager denying a raise."
                : scenarioId === 'leave' ? "You are a manager needing full team attendance."
                    : "You are an angry client.";

            prompt = `System: ${scenarioPrompt}
            System: Keep replies short (under 30 words). Be realistic.
            
            Conversation History:
            ${historyText}
            
            Manager:`;
        } else if (type === 'image-analysis') {
            // Multimodal prompt
            prompt = [
                `You are an expert communication coach. Analyze this image (screenshot of email/message).
                 1. Decode the "Real Meaning" (What they actually mean vs what they said).
                 2. Draft 3 reply options: Safe, Polite Denial, and Assertive.
                 
                 Output in JSON:
                 {
                    "realMeaning": "string",
                    "replies": [
                        { "type": "Safe", "text": "..." },
                        { "type": "Polite Denial", "text": "..." },
                        { "type": "Assertive", "text": "..." }
                    ]
                 }
                 Do not include \`\`\`json.`,
                {
                    inlineData: {
                        data: imageBase64,
                        mimeType: "image/png" // Assuming PNG or JPEG, API is flexible usually
                    }
                }
            ] as any;
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        const text = await generateContent(prompt);

        // For chat, we might just return text, not JSON, or wrap it
        if (type === 'roleplay-chat') {
            return NextResponse.json({ reply: text });
        }

        // Clean up markdown and fix common issues
        let cleanText = text
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();

        // If response is truncated, try to fix it
        if (!cleanText.endsWith('}') && !cleanText.endsWith(']')) {
            console.log("Detected truncated response, attempting repair...");

            // Count opening and closing braces/brackets
            const openBraces = (cleanText.match(/{/g) || []).length;
            const closeBraces = (cleanText.match(/}/g) || []).length;
            const openBrackets = (cleanText.match(/\[/g) || []).length;
            const closeBrackets = (cleanText.match(/\]/g) || []).length;

            // Add missing closing characters
            const missingBrackets = openBrackets - closeBrackets;
            const missingBraces = openBraces - closeBraces;

            for (let i = 0; i < missingBrackets; i++) {
                cleanText += ']';
            }
            for (let i = 0; i < missingBraces; i++) {
                cleanText += '}';
            }

            console.log("Repaired JSON");
        }

        try {
            const jsonResponse = JSON.parse(cleanText);
            return NextResponse.json(jsonResponse);
        } catch (e) {
            console.error("JSON Parse Error", cleanText.substring(0, 500));
            return NextResponse.json({ error: "Failed to parse AI response", raw: cleanText.substring(0, 500) }, { status: 500 });
        }

    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
