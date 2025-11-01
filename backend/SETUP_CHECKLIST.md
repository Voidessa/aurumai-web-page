# Чеклист настройки

## ✅ Шаг 1: Переменные окружения

### Минимальная конфигурация

Создайте файл `.env.local` в папке `backend/` с обязательными переменными:

```bash
# Режим хранения (выберите один)
CRM_TARGET=SHEETS
# или
CRM_TARGET=SUPABASE

# Telegram уведомления (обязательно)
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_ADMIN_CHAT_ID=ваш_chat_id
```

### Если выбрали SHEETS:

```bash
GOOGLE_SA_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_SA_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_ID=1AbCdEfGhIjKlMnOpQrStUvWxYz
```

### Если выбрали SUPABASE:

```bash
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

### Опционально (рекомендуется для продакшена):

```bash
# Защита от ботов
TURNSTILE_SECRET_KEY=ваш_secret_key

# Rate limiting
REDIS_URL=rediss://:password@region.upstash.io:6379

# Аналитика
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_API_SECRET=xxxxxxxxxxxxx
```

**Как создать .env.local:**
```bash
cd backend
cp env.example .env.local
# Затем отредактируйте .env.local и заполните значения
```

## ✅ Шаг 2: Настройка GitHub

### Автоматическая настройка:

```bash
cd backend
bash setup.sh  # Создаст .env.local из примера
```

### Загрузка на GitHub:

Следуйте инструкциям в [GITHUB_SETUP.md](./GITHUB_SETUP.md):

```bash
cd backend
git init
git add .
git commit -m "Initial commit: Next.js API backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-course-backend.git
git push -u origin main
```

## ✅ Шаг 3: Деплой на Vercel

1. Зайдите на [vercel.com](https://vercel.com)
2. Импортируйте репозиторий `ai-course-backend`
3. Добавьте все переменные из `.env.local` в Vercel Environment Variables
4. Deploy

**Подробная инструкция:** [DEPLOY.md](./DEPLOY.md)

## ✅ Шаг 4: Настройка фронтенда

После деплоя бекенда получите его URL (например: `https://ai-course-backend.vercel.app`)

### Вариант A: Через .env.local (рекомендуется)

Создайте `.env.local` в корне фронтенд проекта:

```bash
# В корне проекта (не в backend/)
VITE_API_BASE_URL=https://your-backend.vercel.app
```

### Вариант B: Прямое изменение кода

Обновите `components/FinalCTA.tsx`:

```typescript
const API_BASE_URL = 'https://your-backend.vercel.app';
```

## ✅ Проверка работоспособности

### 1. Health check бекенда:

```bash
curl https://your-backend.vercel.app/api/healthz
```

Должно вернуть: `ok`

### 2. Тест отправки формы:

На фронтенде:
1. Заполните форму предзаписи
2. Отправьте
3. Проверьте:
   - ✅ Форма отправляется без ошибок
   - ✅ Данные появились в Google Sheets / Supabase
   - ✅ В Telegram админ-чат пришло уведомление

### 3. Проверка логов:

В Vercel Dashboard → Deployments → выберите деплой → Functions → Logs

## 🔧 Получение необходимых токенов и ключей

### Telegram Bot Token:

1. Найдите [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте `/newbot`
3. Следуйте инструкциям
4. Скопируйте токен вида: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`

### Telegram Chat ID:

1. Создайте группу в Telegram
2. Добавьте вашего бота в группу
3. Отправьте любое сообщение в группу
4. Выполните:
   ```bash
   curl https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
5. Найдите `"chat":{"id":-1001234567890}` в ответе
6. Скопируйте ID (для групп начинается с `-`)

### Google Sheets Service Account:

1. [Google Cloud Console](https://console.cloud.google.com) → Create Project
2. APIs & Services → Enable API → Google Sheets API
3. Credentials → Create Credentials → Service Account
4. Создайте ключ (JSON) и скачайте
5. Откройте JSON, скопируйте:
   - `client_email` → `GOOGLE_SA_EMAIL`
   - `private_key` → `GOOGLE_SA_KEY` (сохраните кавычки и `\n`)
6. Откройте Google Sheets, поделитесь доступом с email service account (редактор)
7. ID таблицы из URL: `https://docs.google.com/spreadsheets/d/{ID}/edit`

### Supabase Connection String:

1. [Supabase](https://supabase.com) → New Project
2. Settings → Database
3. Connection String → Copy (URI mode)
4. Замените `[YOUR-PASSWORD]` на ваш пароль

### Cloudflare Turnstile:

1. [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Turnstile → Add Site
3. Скопируйте Site Key (для фронтенда) и Secret Key (для бекенда)

### Upstash Redis:

1. [Upstash](https://upstash.com) → Create Database
2. REST URL → Copy (начинается с `rediss://`)

## 📋 Быстрая команда для начала

```bash
# 1. Настройка бекенда
cd backend
bash setup.sh
# Отредактируйте .env.local

# 2. Локальный тест (опционально)
npm run dev
# Проверьте http://localhost:3000/api/healthz

# 3. Загрузка на GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-course-backend.git
git push -u origin main

# 4. Деплой на Vercel (через веб-интерфейс)
# См. DEPLOY.md

# 5. Настройка фронтенда
cd ..
echo "VITE_API_BASE_URL=https://your-backend.vercel.app" > .env.local
```

## 🆘 Проблемы?

См. раздел Troubleshooting в:
- [DEPLOY.md](./DEPLOY.md) - проблемы деплоя
- [INTEGRATION.md](./INTEGRATION.md) - проблемы интеграции

