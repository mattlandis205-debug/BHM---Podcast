
import { GoogleGenAI } from "@google/genai";
import { PODCAST_CONTEXT } from "../constants";

export async function askHistorian(query: string, history: { role: 'user' | 'model', text: string }[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `
    You are a historical consultant specializing in the American Revolution and Black History.
    Use the following context from the 'American Made' podcast script to answer student questions:
    ${PODCAST_CONTEXT}
    
    If the student asks about the 'Screen Scrambler', tell them it's a "totally not real" device from the podcast's commercial break designed for lazy students, but they should focus on their history work!
    
    Keep answers engaging, educational, and focused on the central question: "Who offered a better path to freedom: King George or George Washington?"
    
    Acknowledge the nuances: British freedom was strategic (only for Patriot-owned slaves), and American freedom was inconsistent (state-by-state, often revoked).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: `System Instruction: ${systemInstruction}` }] },
        ...history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble accessing the archives right now. Please try again.";
  }
}
