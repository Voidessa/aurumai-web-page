# 📱 Как добавить ссылку на Telegram

## Инструкция

Иконка Telegram уже добавлена в навигацию сайта. 

Чтобы добавить вашу ссылку:

1. Откройте файл: `components/Header.tsx`

2. Найдите строку ~98-106 (секция с Telegram иконкой):

```tsx
{/* Telegram Icon - placeholder для будущей ссылки */}
<a
  href="#"  // ← ЗАМЕНИТЕ ЭТУ СТРОКУ
  target="_blank"
  rel="noopener noreferrer"
  ...
>
```

3. Замените `href="#"` на вашу ссылку:

```tsx
href="https://t.me/your_channel_or_bot"
```

## Примеры ссылок:

**Telegram канал:**
```tsx
href="https://t.me/aurumai_channel"
```

**Telegram бот:**
```tsx
href="https://t.me/aurumai_bot"
```

**Telegram группа:**
```tsx
href="https://t.me/+invite_link_here"
```

## После изменения:

```bash
git add components/Header.tsx
git commit -m "Add Telegram link"
git push origin main
```

Vercel автоматически задеплоит изменения через 2-3 минуты! 🚀
