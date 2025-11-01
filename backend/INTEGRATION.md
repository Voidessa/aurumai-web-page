# Интеграция фронтенда с бекендом

## Быстрый старт

### 1. Деплой бекенда на Vercel

1. Загрузите папку `backend` на GitHub как отдельный репозиторий
2. В Vercel → New Project → импортируйте репозиторий
3. Framework Preset: **Next.js**
4. Добавьте все переменные окружения из `.env.local.example` в Settings → Environment Variables
5. Deploy
6. Скопируйте URL вашего бекенда (например, `https://ai-course-backend.vercel.app`)

### 2. Настройка фронтенда

#### Вариант A: Через переменные окружения (рекомендуется)

Создайте файл `.env.local` в корне фронтенд проекта:

```bash
VITE_API_BASE_URL=https://your-backend.vercel.app
```

#### Вариант B: Прямое изменение в коде

В файле `components/FinalCTA.tsx` замените:

```typescript
const API_BASE_URL = 'https://your-backend.vercel.app';
```

на ваш URL бекенда.

### 3. UTM-трекинг

Скрипт захвата UTM уже добавлен в `index.html`. Он автоматически:
- Извлекает UTM-параметры из URL (`utm_source`, `utm_medium`, `utm_campaign`, и т.д.)
- Извлекает параметр `source` (insta_course, insta_agency, telegram, seo)
- Сохраняет данные в `window.__LEAD_CTX__`

Примеры URL для тестирования:
- `https://your-site.com/?source=insta_course&utm_campaign=ai_course_2024`
- `https://your-site.com/?utm_source=telegram&utm_medium=social&utm_campaign=course`

### 4. Опционально: Cloudflare Turnstile

Если хотите добавить защиту от ботов:

1. Зарегистрируйтесь в Cloudflare Turnstile
2. Получите sitekey и secret key
3. Добавьте secret key в переменные окружения бекенда: `TURNSTILE_SECRET_KEY`
4. На фронтенде добавьте виджет Turnstile:

```html
<!-- В index.html перед закрывающим </body> -->
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```

```html
<!-- В форме перед кнопкой отправки -->
<div class="cf-turnstile" data-sitekey="YOUR_SITEKEY" data-callback="onTurnstileSuccess"></div>

<script>
function onTurnstileSuccess(token) {
  window.turnstileToken = token;
}
</script>
```

### 5. Тестирование

1. Запустите фронтенд: `npm run dev`
2. Откройте форму предзаписи
3. Заполните и отправьте форму
4. Проверьте:
   - ✅ Запись появилась в Google Sheets / Supabase
   - ✅ В Telegram админ-чат пришло уведомление
   - ✅ В консоли браузера нет ошибок

## API Endpoints

### POST /api/lead

Отправка формы предзаписи.

**Request:**
```json
{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "telegram": "@ivan",
  "experience": "новичок",
  "goal": "Научиться создавать фотореалистичные изображения",
  "source": "insta_course",
  "utm": {
    "utm_source": "instagram",
    "utm_campaign": "ai_course_2024"
  },
  "turnstileToken": "..." // опционально
}
```

**Response:**
```json
{
  "ok": true
}
```

**Ошибки:**
- `400` - `{"ok": false, "error": "bad_input"}` - невалидные данные
- `400` - `{"ok": false, "error": "turnstile_failed"}` - ошибка проверки Turnstile
- `429` - `{"ok": false, "error": "rate_limited"}` - превышен лимит запросов

### POST /api/inquiry

Отправка вопроса или запроса на сотрудничество.

**Request:**
```json
{
  "kind": "QUESTION", // или "PARTNERSHIP"
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "telegram": "@ivan",
  "company": "ООО Компания", // опционально
  "message": "Вопрос о курсе...",
  "source": "seo",
  "utm": {...},
  "turnstileToken": "..."
}
```

### GET /api/healthz

Проверка работоспособности API.

**Response:**
```
ok
```

## Добавление формы для вопросов/сотрудничества

Если нужно добавить форму для `/api/inquiry`, создайте новый компонент аналогично `FinalCTA.tsx`:

```typescript
const payload = {
  kind: 'QUESTION', // или 'PARTNERSHIP'
  name: form.name,
  email: form.email,
  telegram: form.telegram || undefined,
  company: form.company || undefined,
  message: form.message,
  source: ctx.source || 'direct',
  utm: ctx.utm || {},
  turnstileToken: (window as any).turnstileToken
};

const response = await fetch(`${API_BASE_URL}/api/inquiry`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
```

## Troubleshooting

### Форма не отправляется

1. Проверьте URL бекенда в консоли браузера
2. Убедитесь, что бекенд развернут и доступен (проверьте `/api/healthz`)
3. Проверьте CORS настройки (Vercel по умолчанию разрешает все источники для API routes)

### Ошибка rate_limited

Это нормально - защита от спама срабатывает при превышении лимита (5 запросов в минуту с одного IP). Подождите минуту и попробуйте снова.

### Turnstile не работает

Убедитесь, что:
- Sitekey и secret key корректны
- Sitekey добавлен в HTML
- Secret key добавлен в переменные окружения бекенда
- Callback функция `onTurnstileSuccess` вызывается

### Данные не сохраняются

Проверьте:
- Переменная `CRM_TARGET` установлена правильно (`SHEETS` или `SUPABASE`)
- Для Google Sheets: проверьте credentials service account
- Для Supabase: выполните миграции Prisma (`npx prisma migrate deploy`)

