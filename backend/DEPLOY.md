# Инструкция по деплою бекенда на Vercel

## Предварительные требования

1. Аккаунт на [Vercel](https://vercel.com)
2. GitHub репозиторий с бекендом
3. Настроенные сервисы (Google Sheets API или Supabase, Telegram Bot, Upstash Redis - опционально)

## Шаг 1: Подготовка репозитория

```bash
cd backend
git init
git add .
git commit -m "Initial commit: Next.js API backend"
git branch -M main
git remote add origin https://github.com/yourusername/ai-course-backend.git
git push -u origin main
```

## Шаг 2: Создание проекта на Vercel

1. Зайдите на [vercel.com](https://vercel.com) и войдите через GitHub
2. Нажмите **"Add New..."** → **"Project"**
3. Импортируйте репозиторий `ai-course-backend`
4. Framework Preset должен автоматически определиться как **Next.js**
5. Нажмите **"Deploy"** (пока без переменных окружения)

## Шаг 3: Настройка переменных окружения

После первого деплоя:

1. Перейдите в **Settings** → **Environment Variables**
2. Добавьте все переменные из списка ниже

### Обязательные переменные

```
CRM_TARGET=SHEETS
```

или для Supabase:

```
CRM_TARGET=SUPABASE
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

### Telegram уведомления

```
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_ADMIN_CHAT_ID=-1001234567890
```

**Как получить:**
- Bot Token: создайте бота через [@BotFather](https://t.me/BotFather)
- Chat ID: добавьте бота в группу, отправьте сообщение, затем:
  ```
  https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
  ```
  Найдите `chat.id` в ответе

### Для Google Sheets (если CRM_TARGET=SHEETS)

```
GOOGLE_SA_EMAIL=service-account@project-id.iam.gserviceaccount.com
GOOGLE_SA_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_ID=1AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

**Как настроить:**

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com)
2. Создайте новый проект или выберите существующий
3. Включите **Google Sheets API**
4. Создайте Service Account:
   - APIs & Services → Credentials → Create Credentials → Service Account
   - Скачайте JSON ключ
   - Скопируйте `client_email` в `GOOGLE_SA_EMAIL`
   - Скопируйте `private_key` в `GOOGLE_SA_KEY` (сохраните кавычки и `\n`)
5. Откройте Google Sheets таблицу
6. Поделитесь доступом с email service account (редактор)
7. Скопируйте ID таблицы из URL: `https://docs.google.com/spreadsheets/d/{SHEETS_ID}/edit`

**Важно:** В Google Sheets создайте два листа:
- `Leads` (для предзаписей)
- `Inquiries` (для вопросов/сотрудничества)

Или таблица создастся автоматически при первом запросе.

### Для Supabase (если CRM_TARGET=SUPABASE)

```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

**Как настроить:**

1. Создайте проект на [Supabase](https://supabase.com)
2. Скопируйте Connection String из Settings → Database
3. Выполните миграции локально или через Prisma Studio:
   ```bash
   npx prisma migrate deploy
   ```

### Защита (опционально, но рекомендуется)

#### Cloudflare Turnstile

```
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

**Как получить:**
1. Зайдите на [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Выберите ваш сайт → Turnstile
3. Создайте виджет
4. Скопируйте Secret Key

#### Rate Limiting (Upstash Redis)

```
REDIS_URL=rediss://:password@region.upstash.io:6379
```

**Как получить:**
1. Создайте аккаунт на [Upstash](https://upstash.com)
2. Создайте Redis базу данных
3. Скопируйте REST URL из консоли

### Аналитика (опционально)

#### Google Analytics 4

```
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_API_SECRET=xxxxxxxxxxxxx
```

#### Meta Pixel

```
META_PIXEL_ID=123456789012345
META_ACCESS_TOKEN=EAAG...
```

## Шаг 4: Повторный деплой

После добавления всех переменных:

1. Перейдите в **Deployments**
2. Нажмите на последний деплой → **Redeploy**
3. Дождитесь завершения

## Шаг 5: Проверка работоспособности

### Тест health check

```bash
curl https://your-project.vercel.app/api/healthz
```

Должно вернуть: `ok`

### Тест API lead

```bash
curl -X POST https://your-project.vercel.app/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "source": "test"
  }'
```

Должно вернуть: `{"ok":true}`

### Проверка логов

В Vercel Dashboard → Deployments → выберите деплой → Functions → посмотрите логи в случае ошибок.

## Шаг 6: Обновление фронтенда

В файле `.env.local` фронтенда (или прямо в `FinalCTA.tsx`):

```
VITE_API_BASE_URL=https://your-project.vercel.app
```

Или в коде:

```typescript
const API_BASE_URL = 'https://your-project.vercel.app';
```

## Troubleshooting

### Ошибка "Module not found"

Убедитесь, что в `package.json` все зависимости указаны в `dependencies`, а не только в `devDependencies`.

### Ошибка подключения к базе данных (Supabase)

1. Проверьте `DATABASE_URL` формат
2. Убедитесь, что миграции выполнены: `npx prisma migrate deploy`
3. Проверьте, что Prisma Client сгенерирован: `npx prisma generate`

### Ошибка Google Sheets API

1. Проверьте, что Service Account имеет доступ к таблице
2. Убедитесь, что Google Sheets API включен
3. Проверьте формат `GOOGLE_SA_KEY` (должен быть с `\n` и в кавычках)

### Ошибка Telegram бота

1. Проверьте токен бота
2. Убедитесь, что бот добавлен в группу и является администратором
3. Проверьте формат `TELEGRAM_ADMIN_CHAT_ID` (для групп должен начинаться с `-`)

## Production Checklist

- [ ] Все переменные окружения добавлены
- [ ] Health check работает (`/api/healthz`)
- [ ] Тестовая отправка формы работает
- [ ] Данные сохраняются в Sheets/DB
- [ ] Telegram уведомления приходят
- [ ] Rate limiting работает (попробуйте отправить >5 запросов)
- [ ] Turnstile работает (если включен)
- [ ] Фронтенд обновлен с правильным URL API
- [ ] Логи проверены на ошибки

## Поддержка

При возникновении проблем проверьте:
1. Логи в Vercel Dashboard
2. Network tab в браузере (на фронтенде)
3. Console logs в браузере

