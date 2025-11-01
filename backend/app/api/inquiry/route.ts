import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validators";
import { verifyTurnstile } from "@/lib/turnstile";
import { rateLimit } from "@/lib/redis";
import { adminAlert } from "@/lib/telegram";
import { saveInquiry } from "@/lib/storage";

// CORS заголовки
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Обработка OPTIONS (preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "";
  if (!(await rateLimit(`inq:${ip}`, 5, 60))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429, headers: corsHeaders });
  }

  const body = await req.json().catch(() => null);
  const parse = inquirySchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ ok: false, error: "bad_input" }, { status: 400, headers: corsHeaders });
  }

  const ok = await verifyTurnstile(parse.data.turnstileToken, ip);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "turnstile_failed" }, { status: 400, headers: corsHeaders });
  }

  const payload = { ...parse.data };
  delete (payload as any).turnstileToken;

  await saveInquiry(payload);
  await adminAlert(
    `📨 <b>${payload.kind === "PARTNERSHIP" ? "Сотрудничество" : "Вопрос"}</b>\n` +
    `Имя: ${payload.name} | Email: ${payload.email}\nTG: ${payload.telegram || "-"} | Компания: ${payload.company || "-"}\n` +
    `Сообщение: ${payload.message}\nИсточник: ${payload.source || "-"}\nUTM: ${JSON.stringify(payload.utm || {})}`
  );

  return NextResponse.json({ ok: true }, { headers: corsHeaders });
}

