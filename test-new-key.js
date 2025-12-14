
import { GoogleGenAI } from "@google/genai";

const apiKey = "AIzaSyBnOqDoZ74Pj0vHHmmtmQ0d1kHxj3FCq5A";
const modelName = "gemini-1.5-flash-001";

console.log(`Testing New Key with ${modelName}...`);

async function testConnection() {
    try {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const chat = ai.chats.create({
            model: modelName,
            config: { temperature: 0.7 },
        });

        console.log("Sending message...");
        const result = await chat.sendMessage({ message: "Hello, new key check." });
        console.log("SUCCESS! API Key is active.");
        console.log("Response:", result.text);
    } catch (error) {
        console.error("FAILED:");
        console.error(error.message);
    }
}

testConnection();
