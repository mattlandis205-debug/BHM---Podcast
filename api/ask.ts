import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // easy browser test
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, message: "POST JSON to /api/ask" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { question, context } = body || {};
    if (!question) {
      return res.status(400).json({ error: "Missing question" });
    }

    const ai = new GoogleGenAI({ apiKey: key });

    const prompt = `${context ? `Context:\n${context}\n\n` : ""}Question:\n${question}\n\nAnswer as a helpful historian.`;

    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    // result.text is the convenience field in this SDK
    return res.status(200).json({ answer: result.text });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}
