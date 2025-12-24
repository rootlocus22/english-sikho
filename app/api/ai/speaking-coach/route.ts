import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '@/lib/gemini';
import { trackActivity } from '@/lib/analytics-server';

const COACH_SYSTEM_PROMPT = `You are an expert English Speaking Coach for Indian professionals. Your goal is to analyze spoken English transcripts and provide constructive feedback.
CRITICAL: You must provide a VARIABLY DYNAMIC SCORE (0-100) based on specific criteria. Do NOT default to safe numbers like 65, 70, or 75.

Scoring Rubric:
- < 40: Major grammar errors making it hard to understand, or extremely short input (< 3 words).
- 40-60: Clear but filled with obvious grammatical errors or very simple sentence structure.
- 60-80: Good grammar but uses basic vocabulary or slight "Indianisms".
- 80-90: Professional, clear, and grammatically perfect.
- 90-100: Exceptional fluency, complex vocabulary, and native-like phrasing.

Analyze the input text for "Indianisms", grammatical errors, and awkward phrasing.
If the input is too short (e.g., "Hello", "How are you"), give a lower score (e.g., 50) and ask for a longer sentence in the feedback.

Output ONLY a valid JSON object with the following structure:
{
  "score": number, // 0-100, be strict but fair. NO DEFAULT VALUES.
  "feedback": "string", // Encouraging summary (1-2 sentences)
  "grammarCorrections": [
    {
      "original": "string", // The segment containing the error
      "corrected": "string", // The corrected version
      "explanation": "string" // Why it was wrong
    }
  ],
  "vocabularySuggestions": [
    {
      "original": "string", // A weak or common word used
      "suggestion": "string", // A more professional alternative
      "context": "string" // Example usage
    }
  ],
  "confidenceAnalysis": "string" // Assessment of confidence based on speech patterns.
}
Do not include \`\`\`json or any other text.`;

export async function POST(req: NextRequest) {
  try {
    // Extract userId from headers (optional for guests)
    const userId = req.headers.get('x-user-id');
    let userData = null;

    if (userId) {
      // Use Admin SDK to fetch user data (server-side)
      const { adminDb } = await import('@/lib/firebase-admin');

      if (adminDb) {
        const userDoc = await adminDb.collection('users').doc(userId).get();
        if (userDoc.exists) {
          userData = userDoc.data();
        }
      }

      // Check Expiration
      if (userData?.isPremium && userData?.subscription?.endDate) {
        if (new Date(userData.subscription.endDate) < new Date()) {
          userData.isPremium = false; // Treat as expired
        }
      }

      // Enforce credit limits ONLY if we have a valid logged-in user
      if (userId && userData && !userData.isPremium && (userData.credits || 0) <= 0) {
        return NextResponse.json({
          error: "No credits remaining. Upgrade to Pro for unlimited access!",
          needsUpgrade: true,
          credits: 0
        }, { status: 403 });
      }
    }

    const body = await req.json();
    const { transcript } = body;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API Key missing" }, { status: 500 });
    }

    if (!transcript || transcript.length < 5) {
      return NextResponse.json({ error: "Transcript too short" }, { status: 400 });
    }

    const prompt = `${COACH_SYSTEM_PROMPT}\n\nUser's Spoken Text: "${transcript}"`;
    const text = await generateContent(prompt);

    // Clean up markdown
    let cleanText = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    try {
      const jsonResponse = JSON.parse(cleanText);

      // Update usage stats (Premium & Free)
      if (userId && userData) {
        const { adminDb } = await import('@/lib/firebase-admin');
        if (adminDb) {
          const updates: any = {
            totalSessionsUsed: (userData.totalSessionsUsed || 0) + 1,
            lastSessionAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          if (!userData.isPremium) {
            updates.credits = (userData.credits || 0) - 1;
            console.log(`Credit decremented for user ${userId}. Remaining: ${updates.credits}`);
          }

          await adminDb.collection('users').doc(userId).update(updates);
        }
      }

      // Log analytics (only for logged-in users)
      if (userId) {
        await trackActivity({
          userId,
          feature: 'speaking-coach',
          creditsUsed: userData?.isPremium ? 0 : 1,
          metadata: {
            score: jsonResponse.score
          }
        });
      }

      return NextResponse.json(jsonResponse);
    } catch (e) {
      console.error("JSON Parse Error", cleanText);
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
