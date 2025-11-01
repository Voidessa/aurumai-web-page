# AI Course Backend API

Backend API для проекта курса по AI. Развернут на Vercel как Next.js API-only проект.

## 🚀 Быстрый старт

**Начните с:** [START_HERE.md](./START_HERE.md) - пошаговая инструкция для деплоя

**Или следуйте чеклисту:** [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)

## Архитектура

- **Frontend** (Vite) → отправляет формы на
- **Backend API** (Vercel, Next.js route handlers):
  - `POST /api/lead` — предзапись
  - `POST /api/inquiry` — вопрос/сотрудничество
  - `GET /api/healthz` — проверка живости

### Хранение
- По флагу `CRM_TARGET`: `SHEETS` (Google Sheets) или `SUPABASE` (Postgres/Prisma)

### Защита
- Cloudflare Turnstile
- Rate-limit (Upstash Redis)
- Zod-валидация

### Уведомления
- Telegram Admin Chat (бот отправляет карточки)

### Трекинг
- Захват UTM + source (insta_course / insta_agency / telegram / seo)

### Аналитика
- GA4 Measurement Protocol (опционально)
- Meta CAPI (опционально)

## Установка

```bash
npm install
```

## Настройка окружения

Создайте файл `.env.local` на основе `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Заполните необходимые переменные окружения:

### Обязательные
- `CRM_TARGET` — режим хранения: `SHEETS` или `SUPABASE`
- `TELEGRAM_BOT_TOKEN` — токен Telegram бота
- `TELEGRAM_ADMIN_CHAT_ID` — ID чата для уведомлений

### Для Google Sheets (если `CRM_TARGET=SHEETS`)
- `GOOGLE_SA_EMAIL` — email service account
- `GOOGLE_SA_KEY` — приватный ключ service account
- `GOOGLE_SHEETS_ID` — ID Google таблицы

### Для Supabase (если `CRM_TARGET=SUPABASE`)
- `DATABASE_URL` — URL подключения к PostgreSQL

### Защита (опционально)
- `TURNSTILE_SECRET_KEY` — секретный ключ Cloudflare Turnstile
- `REDIS_URL` — URL Redis для rate-limiting (Upstash)

### Аналитика (опционально)
- `GA4_MEASUREMENT_ID` — ID измерения GA4
- `GA4_API_SECRET` — секретный ключ GA4 API
- `META_PIXEL_ID` — ID Meta Pixel
- `META_ACCESS_TOKEN` — токен доступа Meta

## Разработка

```bash
npm run dev
```

API будет доступен на `http://localhost:3000`

## Миграции базы данных (для Supabase)

Если используете `CRM_TARGET=SUPABASE`:

```bash
# Локальная разработка
npx prisma migrate dev --name init

# Продакшн
npx prisma migrate deploy
```

## Деплой на Vercel

1. Загрузите проект на GitHub
2. В Vercel → New Project → импортируйте репозиторий
3. Framework Preset: **Next.js**
4. В Settings → Environment Variables добавьте все переменные из `.env.local`
5. Deploy

## Использование на фронтенде

### 1. Добавьте скрипт захвата UTM в `index.html`:

```html
<script>
(function(){
  const p = new URLSearchParams(location.search);
  const utm = {
    utm_source: p.get('utm_source') || p.get('source'),
    utm_medium: p.get('utm_medium'),
    utm_campaign: p.get('utm_campaign'),
    utm_content: p.get('utm_content'),
    utm_term: p.get('utm_term')
  };
  const source = (p.get('source') || '').trim(); // insta_course | insta_agency | telegram | seo
  window.__LEAD_CTX__ = { utm, source };
})();
</script>
```

### 2. Отправка формы предзаписи:

```typescript
async function submitLead(form) {
  const ctx = window.__LEAD_CTX__ || {};
  const payload = {
    name: form.name.value,
    email: form.email.value,
    telegram: form.telegram.value || undefined,
    experience: form.experience.value || undefined,
    goal: form.goal.value || undefined,
    source: ctx.source || 'direct',
    utm: ctx.utm,
    turnstileToken: window.turnstileToken // если используешь Turnstile
  };
  const res = await fetch("https://<твой-бекенд-домен>/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "send_failed");
}
```

### 3. Отправка формы вопроса/сотрудничества:

```typescript
async function submitInquiry(form) {
  const ctx = window.__LEAD_CTX__ || {};
  const payload = {
    kind: form.kind.value, // "QUESTION" или "PARTNERSHIP"
    name: form.name.value,
    email: form.email.value,
    telegram: form.telegram.value || undefined,
    company: form.company.value || undefined,
    message: form.message.value,
    source: ctx.source || 'direct',
    utm: ctx.utm,
    turnstileToken: window.turnstileToken
  };
  const res = await fetch("https://<твой-бекенд-домен>/api/inquiry", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "send_failed");
}
```

## Проверка работоспособности

1. `GET /api/healthz` должен возвращать `"ok"`
2. Отправка формы должна возвращать `{ok: true}`
3. Запись должна появиться в Sheets/DB
4. В Telegram админ-чат должна прийти карточка
5. Rate-limit срабатывает при спаме
6. Turnstile блокирует ботов (если включен)

