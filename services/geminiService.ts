import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Topic, CEFRLevel, Language } from "../types";

// NOTE: In a real production app, you should proxy this through a backend
// to protect your API key. For this specific prompt requirement (MVP),
// we use process.env.API_KEY directly.

const getSystemInstruction = (
  level: CEFRLevel,
  topic: Topic,
  uiLanguage: Language
): string => {
  const userLangName = uiLanguage === 'ES' ? 'Spanish' : 'English';

  return `
You are an expert French language tutor named "David".
Your Goal: Teach the user French at the CEFR level "${level}".
Current Topic: "${topic.title}" (${topic.description}).

Pedagogical Rules:
1. Explain concepts primarily in ${userLangName} so the user understands the theory. 
   - If the user writes in Spanish, explain in Spanish.
   - If the user writes in English, explain in English.
   - Do NOT mix instruction languages unless necessary for translation.
2. Provide all examples in French.
3. Encourage the user to practice writing sentences in French related to "${topic.title}".
4. Correct the user's mistakes gently. Explain *why* it was a mistake using ${userLangName}.
5. Keep the vocabulary and grammar complexity appropriate for level ${level}.

Off-Topic Control Protocol:
This session is STRICTLY for learning French, specifically the topic "${topic.title}".
- If the user asks about general French (not exactly this topic), answer briefly but try to bridge it back to "${topic.title}".
- If the user talks about something completely unrelated (e.g., coding, politics, sports news not related to learning French):
    - 1st Strike: Politely decline and redirect. "I am here to teach you French. Let's focus on ${topic.title}."
    - 2nd Strike: Be firmer. "Please, let's stick to our French lesson on ${topic.title}."
    - 3rd Strike: Issue a final warning. "I cannot continue this conversation if it is not about learning French. This session is for educational purposes only."

Tone: Encouraging, patient, professional, structured.
Start the conversation by introducing yourself as David, stating the topic in ${userLangName}, and asking a simple starting question in French.
`;
};

export const createChatSession = async (
  level: CEFRLevel,
  topic: Topic,
  uiLanguage: Language
): Promise<Chat> => {
  // Ensure API Key is available
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const chat = ai.chats.create({
    model: 'gemini-1.5-flash', // Using flash for speed and cost-effectiveness in a tutor scenario
    config: {
      temperature: 0.7, // Balance between creativity in examples and strict adherence to rules
      systemInstruction: getSystemInstruction(level, topic, uiLanguage),
    },
  });

  return chat;
};

export const sendMessageToTutor = async (
  chat: Chat,
  message: string
): Promise<string> => {
  try {
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "Désolé, je n'ai pas compris. (Error generating response)";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection error. Please check your internet or API key.";
  }
};