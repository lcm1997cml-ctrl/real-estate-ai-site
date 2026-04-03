import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  whatsapp: z.string().min(8),
  budget: z.string().min(1),
  purpose: z.string().min(1),
  district: z.string().min(1),
  notes: z.string().optional(),
});

type LeadPayload = z.infer<typeof schema> & { id: string; createdAt: string };

/** Send email notification via Resend API (no SDK required). */
async function notifyEmail(lead: LeadPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const from = process.env.LEAD_FROM_EMAIL ?? "leads@resend.dev";
  const html = `
    <h2>新查詢 — ${lead.name}</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      <tr><td><b>時間</b></td><td>${new Date(lead.createdAt).toLocaleString("zh-HK", { timeZone: "Asia/Hong_Kong" })}</td></tr>
      <tr><td><b>姓名</b></td><td>${lead.name}</td></tr>
      <tr><td><b>電話</b></td><td>${lead.phone}</td></tr>
      <tr><td><b>WhatsApp</b></td><td>${lead.whatsapp}</td></tr>
      <tr><td><b>預算</b></td><td>${lead.budget}</td></tr>
      <tr><td><b>用途</b></td><td>${lead.purpose}</td></tr>
      <tr><td><b>地區</b></td><td>${lead.district}</td></tr>
      <tr><td><b>備註</b></td><td>${lead.notes ?? "—"}</td></tr>
    </table>
    <p style="margin-top:16px">
      <a href="https://wa.me/${lead.whatsapp}">立即 WhatsApp 跟進</a>
    </p>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `新查詢：${lead.name}（${lead.phone}）`,
      html,
    }),
  });
}

/** Send lead data to Google Sheets via Apps Script webhook. */
async function notifyGoogleSheets(lead: LeadPayload) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ ok: false, error: result.error.flatten() }, { status: 400 });
  }

  const lead: LeadPayload = {
    id: `lead_${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...result.data,
  };

  // Run notifications in parallel; errors are non-fatal so the user always gets a success response.
  await Promise.allSettled([notifyEmail(lead), notifyGoogleSheets(lead)]);

  // Fallback log in dev when no integrations are configured
  if (!process.env.RESEND_API_KEY && !process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
    console.log("[lead]", lead);
  }

  return NextResponse.json({ ok: true, message: "Lead 已成功接收", data: lead });
}
