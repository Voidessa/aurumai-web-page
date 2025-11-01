import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validators";
import { verifyTurnstile } from "@/lib/turnstile";
import { rateLimit } from "@/lib/redis";
import { adminAlert } from "@/lib/telegram";
import { saveLead } from "@/lib/storage";
import { gaLead } from "@/lib/analytics";

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
  try {
    const ip = req.headers.get("x-forwarded-for") || "";
    if (!(await rateLimit(`lead:${ip}`, 5, 60))) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429, headers: corsHeaders });
    }

    const body = await req.json().catch(() => null);
    const parse = leadSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ ok: false, error: "bad_input" }, { status: 400, headers: corsHeaders });
    }

    // Turnstile (можно отключить, если нет sitekey на фронте)
    const ok = await verifyTurnstile(parse.data.turnstileToken, ip);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "turnstile_failed" }, { status: 400, headers: corsHeaders });
    }

    const payload = { ...parse.data };
    delete (payload as any).turnstileToken;

    await saveLead(payload);
    await adminAlert(
      `🔥 <b>Новый лид</b>\nИмя: ${payload.name}\nEmail: ${payload.email}\nTG: ${payload.telegram || "-"}\n` +
      `Опыт: ${payload.experience || "-"}\nЦель: ${payload.goal || "-"}\nИсточник: ${payload.source || "-"}\nUTM: ${JSON.stringify(payload.utm || {})}`
    );
    await gaLead({});

    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  } catch (error: any) {
    console.error("Error in /api/lead:", error);
    return NextResponse.json({ ok: false, error: "server_error", message: error.message }, { status: 500, headers: corsHeaders });
  }
}

