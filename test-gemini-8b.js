
import { GoogleGenAI } from "@google/genai";

const apiKey = "AIzaSyCu-vk887xerP8ALqBeYhMNhxc-08TqQWc";
const modelName = "gemini-1.5-flash-8b";

console.log(`Testing ${modelName}...`);

async function testConnection() {
    try {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const chat = ai.chats.create({
            model: modelName,
            config: { temperature: 0.7 },
        });

        console.log("Sending message...");
        const result = await chat.sendMessage({ message: "Hello" });
        console.log("SUCCESS! Response:");
        console.log(result.text);
    } catch (error) {
        console.error("FAILED:");
        console.error(error.message);
        if (error.message.includes("429")) {
            console.log("Result: QUOTA EXCEEDED (Busy)");
        } else if (error.message.includes("404")) {
            console.log("Result: NOT FOUND (Invalid Name)");
        }
    }
}

testConnection();
