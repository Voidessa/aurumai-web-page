const token = process.env.TELEGRAM_BOT_TOKEN!;
const chat = process.env.TELEGRAM_ADMIN_CHAT_ID!;

export async function adminAlert(text: string) {
  if (!token || !chat) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ 
      chat_id: chat, 
      text, 
      parse_mode: "HTML", 
      disable_web_page_preview: true 
    })
  }).catch(() => {});
}

