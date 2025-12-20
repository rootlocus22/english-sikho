import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '@/lib/gemini';
import { trackActivity } from '@/lib/analytics-server';

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

const INTERVIEW_COACH_SYSTEM_PROMPT = `You are an expert Interview Coach and Career Counselor. You evaluate interview answers and provide constructive feedback.

Your task:
1. Evaluate the user's answer to the interview question
2. Provide a score from 0-100 based on:
   - Clarity and structure (STAR method if applicable)
   - Relevance to the question
   - Professionalism and confidence
   - Specific examples and details
   - Language quality

3. Identify strengths in the answer
4. Suggest improvements
5. Optionally provide a better version of the answer

Output ONLY a valid JSON object with:
{
  "score": number (0-100),
  "feedback": "Overall feedback on the answer",
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["suggestion 1", "suggestion 2"],
  "betterAnswer": "An improved version of their answer (optional)"
}
Do not include \`\`\`json.`;

export async function POST(req: NextRequest) {
    try {
        // Extract userId from headers (set by middleware or client)
        const userId = req.headers.get('x-user-id');

        // Use Admin SDK to fetch user data if userId exists
        let userData: any = null;

        if (userId) {
            const { adminDb } = await import('@/lib/firebase-admin');

            if (!adminDb) {
                return NextResponse.json({
                    error: "Server configuration error"
                }, { status: 500 });
            }

            const userDoc = await adminDb.collection('users').doc(userId).get();

            if (!userDoc.exists) {
                return NextResponse.json({
                    error: "User not found",
                    requiresAuth: true
                }, { status: 404 });
            }

            userData = userDoc.data();

            // Enforce credit limits for non-premium users
            if (!userData?.isPremium && (userData?.credits || 0) <= 0) {
                return NextResponse.json({
                    error: "No credits remaining. Upgrade to Pro for unlimited access!",
                    needsUpgrade: true,
                    credits: 0
                }, { status: 403 });
            }
        }
        // If no userId, we treat as "Guest" and allow usage (client manages the 3-limit locally)


        // Read body ONCE and destructure all possible fields
        const body = await req.json();
        const { type, input, target, toneLevel, history, scenarioId, imageBase64, question, userAnswer, category } = body;

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

            const SCENARIO_PROMPTS: Record<string, string> = {
                'salary': "You are a tough manager. The company budget is tight, and you are skeptical about giving a raise.",
                'leave': "You are a manager who needs the team at full capacity for an upcoming deadline. Be reluctant to grant leave.",
                'mistake': "You are an angry client who has just faced a service outage. Demand an explanation.",
                'promotion': "You are a manager who needs convinced that the employee is ready for the next level. Ask for specific achievements.",
                'decline-work': "You are a manager trying to assign a new urgent project. You are stressed and need someone to take it.",
                'blocker': "You are a senior stakeholder who is unhappy about delays. You need a clear recovery plan.",
                'conflict': "You are a colleague who believes your technical approach is correct. Disagree politely but firmly.",
                'feedback': "You are a junior developer who thinks their code is fine. Be defensive initially.",
                'small-talk': "You are a friendly US-based client at a coffee machine. Chat about sports, weather, or weekend plans."
            };

            const scenarioPrompt = SCENARIO_PROMPTS[scenarioId] || "You are a professional roleplay partner.";

            prompt = `System: ${scenarioPrompt}
            System: Keep replies short (under 40 words). Be realistic, professional, but challenge the user to improve their communication.
            
            Conversation History:
            ${historyText}
            
            Manager/Partner:`;
        } else if (type === 'interview-coach') {
            prompt = `${INTERVIEW_COACH_SYSTEM_PROMPT}

Interview Question: "${question}"
Candidate's Answer: "${userAnswer}"
Interview Category: ${category}

Evaluate this answer and provide constructive feedback to help the candidate improve.`;
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

        // Update usage stats for all users (Premium & Free)
        if (userId && !userData?.isPremium) {
            // We only need to import adminDb here if we are writing
            const { adminDb } = await import('@/lib/firebase-admin');
            const updates: any = {
                totalSessionsUsed: (userData?.totalSessionsUsed || 0) + 1,
                lastSessionAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                credits: (userData?.credits || 0) - 1
            };
            console.log(`Credit decremented for user ${userId}. Remaining: ${updates.credits}`);
            await adminDb.collection('users').doc(userId).update(updates);
        }

        // Log analytics for ALL users (Premium and Free)
        await trackActivity({
            userId: userId || 'guest',
            feature: type, // e.g., 'translator', 'coach'
            creditsUsed: userData?.isPremium ? 0 : 1,
            metadata: {
                hasImage: !!imageBase64,
                scenarioId,
                toneLevel
            }
        });

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
