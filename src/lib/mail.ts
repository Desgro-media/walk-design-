import "server-only";
import nodemailer from "nodemailer";

export function mailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");

export interface Enquiry {
  name: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  scope: string;
  message: string;
}

// Sends a new website enquiry to the studio inbox. Replying goes straight to the visitor.
export async function sendEnquiryEmail(e: Enquiry) {
  const port = Number(process.env.SMTP_PORT) || 465;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const rows: [string, string][] = [
    ["Name", e.name],
    ["Email", e.email],
    ["Phone / WhatsApp", e.phone],
    ["Project location", e.location],
    ["Service", e.service],
    ["Area / budget", e.scope],
  ];

  await transport.sendMail({
    from: `"Walk In Design website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: process.env.ENQUIRY_TO || "info@walkndesign.com",
    replyTo: `"${oneLine(e.name).replace(/"/g, "")}" <${e.email}>`,
    subject: `New enquiry: ${oneLine(e.name)}${e.service ? ` — ${oneLine(e.service)}` : ""}`,
    text: [...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`), "", e.message].join("\n"),
    html: `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="color:#736E67">${k}</td><td>${esc(v)}</td></tr>`)
      .join("")}</table><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${esc(e.message)}</p>`,
  });
}
