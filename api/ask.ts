import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/genai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Helpful for testing in a browser
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, message: "Use POST to /api/ask" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { question, context } = body || {};

    if (!question) {
      return res.status(400).json({ error: "Missing 'question'" });
    }

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${context ? `Context:\n${context}\n\n` : ""}Question:\n${question}\n\nAnswer as a helpful historian.`;
    const result = await model.generateContent(prompt);

    return res.status(200).json({ answer: result.response.text() });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}
