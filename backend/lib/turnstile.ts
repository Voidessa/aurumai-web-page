export async function verifyTurnstile(token?: string, ip?: string) {
  // Если Turnstile не настроен, пропускаем проверку
  if (!process.env.TURNSTILE_SECRET_KEY) return true;
  // Если Turnstile настроен, но токена нет - отклоняем
  if (!token) return false;
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ 
      secret: process.env.TURNSTILE_SECRET_KEY!, 
      response: token, 
      remoteip: ip || "" 
    })
  }).then(r => r.json());
  return !!r.success;
}

