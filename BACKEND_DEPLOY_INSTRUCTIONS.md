# Инструкция по деплою Backend API

## Проблема
Форма на сайте не отправляется, потому что backend API не задеплоен. Сейчас форма показывает успех локально (mock), но данные не сохраняются.

## Решение: Задеплоить backend на Vercel

### Шаг 1: Подготовка
```bash
cd /Users/hojiakbar/Downloads/aurumai-web-page-main/backend
```

### Шаг 2: Деплой на Vercel

**Вариант А: Через Vercel CLI (быстрее)**
```bash
# Установите Vercel CLI (если ещё нет)
npm i -g vercel

# Войдите в аккаунт
vercel login

# Задеплойте backend
vercel --prod
```

**Вариант Б: Через Vercel Dashboard**
1. Зайдите на [vercel.com](https://vercel.com)
2. Нажмите **"Add New Project"**
3. Импортируйте репозиторий `Voidessa/aurumai-web-page`
4. **Root Directory**: выберите `backend`
5. Framework: **Next.js** (автоопределится)
6. Нажмите **"Deploy"**

### Шаг 3: Настройка переменных окружения

После деплоя перейдите в **Settings → Environment Variables** и добавьте:

#### Обязательные:
```
CRM_TARGET=SHEETS
```

#### Telegram уведомления (опционально):
```
TELEGRAM_BOT_TOKEN=ваш_токен_от_BotFather
TELEGRAM_ADMIN_CHAT_ID=ваш_chat_id
```

#### Redis rate limiting (опционально):
```
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

#### Google Sheets (если CRM_TARGET=SHEETS):
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=...
GOOGLE_PRIVATE_KEY=...
SPREADSHEET_ID=...
```

### Шаг 4: Получите URL backend

После деплоя Vercel выдаст URL типа:
```
https://aurumai-backend-xyz.vercel.app
```

### Шаг 5: Обновите фронтенд

1. Откройте `index.html` (строка 135):
```javascript
window.__API_BASE_URL__ = 'https://aurumai-backend-xyz.vercel.app';
```

2. Откройте `components/FinalCTA.tsx` (строка 54-73):
Раскомментируйте реальный API call и закомментируйте mock.

3. Закоммитьте и запушьте:
```bash
git add -A
git commit -m "feat: connect frontend to deployed backend API"
git push origin main
```

## Проверка

После деплоя:
1. Откройте сайт
2. Заполните форму
3. Проверьте консоль браузера (F12) — должен быть успешный POST запрос
4. Проверьте Google Sheets или Telegram — должна прийти запись

## Быстрый старт (если нет времени на настройку)

Можно использовать mock (текущее состояние):
- Форма показывает успех
- Данные логируются в консоль браузера
- Реальной отправки нет

Это подходит для демо/тестирования UI.
