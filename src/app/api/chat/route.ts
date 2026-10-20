import { buildSystemPrompt } from "@/lib/chatKnowledge";
import { getProjects } from "@/lib/projects";
import { getOwners } from "@/lib/owners";

const MODEL = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";
const MAX_MESSAGES = 12;
const MAX_CHARS = 800;

// Simple per-IP limiter (in-memory; resets on restart). Keeps the free quota from being drained.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 25;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_HITS;
}

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "The assistant isn't set up yet. Please use the enquiry form or WhatsApp to reach us." },
      { status: 503 }
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return Response.json({ error: "You're sending messages quickly. Please wait a few minutes and try again." }, { status: 429 });
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  const messages: Msg[] = raw
    .filter(
      (m): m is Msg =>
        !!m &&
        typeof m === "object" &&
        ((m as Msg).role === "user" || (m as Msg).role === "assistant") &&
        typeof (m as Msg).content === "string" &&
        (m as Msg).content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const payload = JSON.stringify({
      systemInstruction: { parts: [{ text: buildSystemPrompt(await getProjects(), await getOwners()) }] },
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: { temperature: 0.4, maxOutputTokens: 600 },
    });

    // Gemini's free tier sometimes returns a brief 503 ("high demand"); retry a couple of times
    let res: Response;
    for (let attempt = 0; ; attempt++) {
      res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: payload,
        signal: AbortSignal.timeout(25000),
      });
      if (res.status !== 503 || attempt >= 2) break;
      await new Promise((r) => setTimeout(r, 1200 * (attempt + 1)));
    }

    if (!res.ok) {
      console.error("[chat] Gemini error", res.status, (await res.text()).slice(0, 300));
      const busy = res.status === 429;
      return Response.json(
        {
          error: busy
            ? "The assistant is busy right now. Please try again in a minute, or use the enquiry form."
            : "Sorry, the assistant is unavailable right now. Please use the enquiry form or WhatsApp.",
        },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply: string | undefined = data?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text ?? "")
      .join("")
      .trim();

    if (!reply) {
      return Response.json({ reply: "I couldn't answer that one. Please send us a project enquiry and we'll get back to you." });
    }
    return Response.json({ reply });
  } catch (err) {
    console.error("[chat] request failed", err);
    return Response.json({ error: "Sorry, something went wrong. Please try again." }, { status: 500 });
  }
}
