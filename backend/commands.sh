#!/bin/bash

# Скрипт для быстрой настройки и деплоя бекенда
# Запустите: bash commands.sh

set -e

echo "🚀 AI Course Backend - Быстрая настройка"
echo ""

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Проверка, что мы в папке backend
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Ошибка: Запустите скрипт из папки backend${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Шаг 1: Создание .env.local${NC}"
if [ ! -f ".env.local" ]; then
    if [ -f "env.example" ]; then
        cp env.example .env.local
        echo -e "${GREEN}✅ .env.local создан из env.example${NC}"
        echo -e "${YELLOW}⚠️  ВАЖНО: Отредактируйте .env.local и заполните все переменные!${NC}"
    else
        echo -e "${RED}❌ Файл env.example не найден${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  .env.local уже существует, пропускаю...${NC}"
fi

echo ""
echo -e "${YELLOW}📦 Шаг 2: Установка зависимостей${NC}"
npm install

echo ""
echo -e "${YELLOW}🔧 Шаг 3: Генерация Prisma Client${NC}"
if [ -f "prisma/schema.prisma" ]; then
    npx prisma generate
    echo -e "${GREEN}✅ Prisma Client сгенерирован${NC}"
else
    echo -e "${YELLOW}⚠️  Prisma schema не найден, пропускаю...${NC}"
fi

echo ""
echo -e "${GREEN}✅ Локальная настройка завершена!${NC}"
echo ""
echo -e "${YELLOW}📝 Следующие шаги:${NC}"
echo ""
echo "1. Отредактируйте .env.local и заполните все переменные"
echo "2. Для локального теста: npm run dev"
echo "3. Для деплоя на GitHub:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/YOUR_USERNAME/ai-course-backend.git"
echo "   git push -u origin main"
echo ""
echo "4. Деплой на Vercel через веб-интерфейс"
echo "   См. START_HERE.md или DEPLOY.md"
echo ""

