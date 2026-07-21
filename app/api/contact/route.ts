import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  /** honeypot — real users never fill this */
  company?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();

  // Silently accept spam bots that trip the honeypot.
  if (body.company) return NextResponse.json({ ok: true });

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email and message." },
      { status: 422 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 422 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { error: "That message is a little too long." },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "The contact form isn't configured yet. Email me directly and I'll fix this.",
      },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO ?? "danielchinemerem302@gmail.com";
  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";
  const heading = subject || "New portfolio message";

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] ${heading} — ${name}`,
      text: `New message from your portfolio contact form\n\nName:    ${name}\nEmail:   ${email}\nSubject: ${subject || "(none)"}\n\n${message}\n`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:560px;margin:auto;color:#0a0a0a">
          <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8a8d94;margin:0 0 8px">New portfolio message</p>
          <h2 style="margin:0 0 16px;font-size:20px">${escapeHtml(heading)}</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:6px 0;color:#8a8d94;width:80px">Name</td><td style="padding:6px 0">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:6px 0;color:#8a8d94">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;border-radius:12px;background:#f4f4f0;white-space:pre-wrap;font-size:15px;line-height:1.6">${escapeHtml(message)}</div>
        </div>`,
    });

    if (error) {
      console.error("[contact] resend error:", error);
      return NextResponse.json(
        { error: "Couldn't send right now. Please try again in a moment." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] send threw:", e);
    return NextResponse.json(
      { error: "Couldn't send right now. Please try again in a moment." },
      { status: 502 },
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
