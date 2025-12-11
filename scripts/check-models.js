const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API KEY found in .env.local");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).apiKey; // Hack to get instance? No, need a different way.
        // Actually the SDK doesn't always expose listModels directly on the main class easily in all versions?
        // Let's check if we can generic fetch if SDK doesn't support it directly.
        // But wait, the error message said "Call ListModels". 
        // It's usually on the client.

        // Attempting to access via simple fetch since SDK might change
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name}`);
                }
            });
        } else {
            console.log("No models found or error:", data);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
