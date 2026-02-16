const SHORT_CONTEXT = `
You are a historical consultant helping students understand the American Revolution and Black History.

Rules:
- Keep answers short: 2–4 brief paragraphs.
- Use simple, student-friendly language.
- If helpful, include 2–4 bullet points.
- If you are unsure, say what information you would need.
- Do NOT invent quotes. You may paraphrase and explain.
`;


export async function askHistorian(
  query: string,
  history: { role: "user" | "model"; text: string }[]
) {
  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question: query,
      // send any context you want the historian to use
      context: "",
      // send conversation history too (optional, but useful)
      history,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Ask Historian failed");
  }

  return data.answer as string;
}
