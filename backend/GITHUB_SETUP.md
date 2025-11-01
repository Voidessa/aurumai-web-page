# Настройка GitHub репозитория

## Быстрая команда для инициализации и загрузки

```bash
cd backend

# Инициализация git (если еще не инициализирован)
git init
git branch -M main

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "Initial commit: Next.js API backend for AI Course"

# Добавление remote (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ai-course-backend.git

# Или если используете SSH:
# git remote add origin git@github.com:YOUR_USERNAME/ai-course-backend.git

# Загрузка на GitHub
git push -u origin main
```

## Создание репозитория на GitHub

Если репозитория еще нет:

1. Зайдите на [github.com](https://github.com)
2. Нажмите **"+"** → **"New repository"**
3. Имя: `ai-course-backend` (или любое другое)
4. Описание: `Backend API for AI Course landing page`
5. Выберите **Private** (рекомендуется) или **Public**
6. **НЕ** инициализируйте с README, .gitignore или лицензией (мы уже создали все)
7. Нажмите **"Create repository"**
8. Следуйте командам выше для загрузки кода

## Альтернатива: GitHub CLI

Если у вас установлен [GitHub CLI](https://cli.github.com):

```bash
cd backend
gh repo create ai-course-backend --private --source=. --remote=origin --push
```

Это автоматически создаст репозиторий и загрузит код.

## Проверка

После загрузки откройте:
```
https://github.com/YOUR_USERNAME/ai-course-backend
```

Вы должны увидеть все файлы бекенда.

## Следующий шаг

После загрузки на GitHub переходите к [DEPLOY.md](./DEPLOY.md) для деплоя на Vercel.

