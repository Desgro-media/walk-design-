import { dbConfigured, sql } from "@/lib/admin/db";
import { mailConfigured, sendEnquiryEmail } from "@/lib/mail";

// Simple per-IP limiter (in-memory; resets on restart), same approach as the chat route
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_HITS;
}

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  if (!dbConfigured() && !mailConfigured()) {
    return Response.json({ error: "Enquiries aren't set up yet. Please reach us on WhatsApp or by phone." }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return Response.json({ error: "Too many enquiries. Please try again in a few minutes." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Hidden field only bots fill in: pretend success
  if (clip(body.website, 200)) return Response.json({ ok: true });

  const name = clip(body.name, 120);
  const email = clip(body.email, 200);
  const message = clip(body.message, 4000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  }

  const enquiry = {
    name,
    email,
    message,
    phone: clip(body.phone, 60),
    location: clip(body.location, 120),
    service: clip(body.service, 60),
    scope: clip(body.scope, 200),
  };

  // Save the lead and email the studio independently: the enquiry is kept if either one works
  const [saved, emailed] = await Promise.allSettled([
    dbConfigured()
      ? sql()`
          insert into leads (name, email, phone, location, service, scope, message)
          values (${name}, ${email}, ${enquiry.phone}, ${enquiry.location}, ${enquiry.service}, ${enquiry.scope}, ${message})`
      : Promise.reject(new Error("db off")),
    mailConfigured() ? sendEnquiryEmail(enquiry) : Promise.reject(new Error("mail off")),
  ]);
  if (emailed.status === "rejected" && mailConfigured()) console.error("Enquiry email failed:", emailed.reason);
  if (saved.status === "rejected" && emailed.status === "rejected") {
    return Response.json({ error: "We couldn't send your enquiry. Please try again or contact us on WhatsApp." }, { status: 500 });
  }

  return Response.json({ ok: true });
}
