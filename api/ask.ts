import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { question, context } = body;

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${context ? `Context:\n${context}\n\n` : ""}Question:\n${question}\n\nAnswer as a helpful historian.`;

    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    return res.status(200).json({ answer });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}
