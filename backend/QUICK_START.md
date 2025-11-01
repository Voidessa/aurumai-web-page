# Быстрый старт

## Что было создано

Бекенд-проект на Next.js для API-роутов, готовый к деплою на Vercel.

## Структура проекта

```
backend/
├── app/
│   └── api/
│       ├── healthz/route.ts     # Health check endpoint
│       ├── lead/route.ts        # POST /api/lead - предзапись
│       └── inquiry/route.ts     # POST /api/inquiry - вопросы/сотрудничество
├── lib/
│   ├── analytics.ts             # GA4 интеграция (опционально)
│   ├── redis.ts                 # Rate limiting через Upstash Redis
│   ├── storage.ts               # Сохранение в Google Sheets или Supabase
│   ├── telegram.ts              # Уведомления в Telegram
│   ├── turnstile.ts             # Cloudflare Turnstile проверка
│   └── validators.ts            # Zod схемы валидации
├── prisma/
│   └── schema.prisma            # Prisma схема (для Supabase)
├── .gitignore
├── DEPLOY.md                    # Подробная инструкция по деплою
├── INTEGRATION.md               # Инструкция по интеграции с фронтендом
├── README.md                    # Основная документация
├── next.config.js
├── package.json
└── tsconfig.json
```

## Следующие шаги

### 1. Локальная разработка (опционально)

```bash
cd backend
npm install
npm run dev
```

API будет доступен на `http://localhost:3000`

### 2. Деплой на Vercel

Следуйте инструкциям в [DEPLOY.md](./DEPLOY.md):

1. Загрузите `backend` на GitHub
2. Создайте проект в Vercel
3. Добавьте переменные окружения
4. Deploy

### 3. Настройка фронтенда

Следуйте инструкциям в [INTEGRATION.md](./INTEGRATION.md):

1. Обновите `VITE_API_BASE_URL` в `.env.local` или `FinalCTA.tsx`
2. Протестируйте отправку формы

## Минимальная конфигурация

Для быстрого старта достаточно:

1. **CRM_TARGET=SHEETS** или **SUPABASE**
2. **TELEGRAM_BOT_TOKEN** и **TELEGRAM_ADMIN_CHAT_ID** (для уведомлений)

Остальное опционально:
- Turnstile (защита от ботов)
- Redis (rate limiting)
- GA4 (аналитика)

## Проверка работы

После деплоя:

```bash
# Health check
curl https://your-backend.vercel.app/api/healthz

# Тест отправки лида
curl -X POST https://your-backend.vercel.app/api/lead \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","source":"test"}'
```

## Нужна помощь?

См. подробные инструкции:
- [DEPLOY.md](./DEPLOY.md) - деплой и настройка
- [INTEGRATION.md](./INTEGRATION.md) - интеграция с фронтендом
- [README.md](./README.md) - общая документация

