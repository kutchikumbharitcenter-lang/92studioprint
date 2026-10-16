import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM = `You are the helper bot of 92 Print Studio, a print shop in Pakistan.
Services: T-shirt, mug, cap, bag (tote/promotional) and business printing (visiting cards, flyers, banners).
Strengths: premium quality, fast turnaround, affordable prices, custom design support, on-time delivery.
Contact and quotes: WhatsApp +92 321 3283881.
Rules: Reply in the same language the customer writes (English, Urdu, Roman Urdu). Keep answers under 80 words.
Never invent prices, discounts or delivery dates: say a quote needs quantity, product and design, then point to WhatsApp.
Only talk about printing and this shop. Politely refuse anything else.`;

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 12;
}

export async function POST(req: NextRequest) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return NextResponse.json({ error: "Chat not configured." }, { status: 500 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return NextResponse.json({ error: "Too many messages. Wait a minute." }, { status: 429 });

  let body: { messages?: { role: string; content: string }[] };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Bad request." }, { status: 400 }); }

  const messages = (body.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }));
  if (!messages.length) return NextResponse.json({ error: "No message." }, { status: 400 });

  const model = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
  // gpt-oss: effort low/medium/high. qwen3: none/default. Keeps replies fast.
  const reasoning = model.includes("gpt-oss")
    ? { reasoning_effort: "low", include_reasoning: false }
    : model.includes("qwen3")
      ? { reasoning_effort: "none" }
      : {};

  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: SYSTEM }, ...messages],
        temperature: 0.6,
        max_completion_tokens: 800, // reasoning tokens count too
        ...reasoning,
      }),
    });
    if (!r.ok) return NextResponse.json({ error: "Chat busy. Try WhatsApp." }, { status: 502 });
    const data = await r.json();
    const raw: string = data.choices?.[0]?.message?.content ?? "";
    const reply = raw.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
    return NextResponse.json({ reply: reply || "Please message us on WhatsApp." });
  } catch {
    return NextResponse.json({ error: "Network error." }, { status: 502 });
  }
}
