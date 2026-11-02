// Minimal Gemini client based on fetch, so it runs unchanged on Cloudflare Workers.
// The model can be overridden with the GEMINI_MODEL variable (see wrangler.jsonc).

export const DEFAULT_GEMINI_MODEL = "gemini-3.8-flash";

export interface GeminiEnv {
  GEMINI_API_KEY?: string;
  GEMINI_MODEL?: string;
}

export async function generateText(env: GeminiEnv, prompt: string): Promise<string> {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY non configurata");

  const model = env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Gemini API ${response.status}: ${detail.slice(0, 300)}`);
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  return parts.map((p) => p.text ?? "").join("").trim();
}
