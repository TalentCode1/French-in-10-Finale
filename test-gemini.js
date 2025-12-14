
import { GoogleGenAI } from "@google/genai";

const apiKey = "AIzaSyCu-vk887xerP8ALqBeYhMNhxc-08TqQWc";

const modelsToTry = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-002",
    "gemini-2.0-flash-exp"
];

async function testConnection() {
    const ai = new GoogleGenAI({ apiKey: apiKey });

    for (const modelName of modelsToTry) {
        console.log(`\n--- Testing Model: ${modelName} ---`);
        try {
            const chat = ai.chats.create({
                model: modelName,
                config: { temperature: 0.7 },
            });

            console.log("Sending message...");
            const result = await chat.sendMessage({ message: "Hello" });
            console.log(`SUCCESS with ${modelName}! Response: ${result.text.substring(0, 50)}...`);
            return; // Stop on first success
        } catch (error) {
            console.error(`FAILED with ${modelName}: ${error.message}`);
        }
    }
}

testConnection();
