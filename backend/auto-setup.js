#!/usr/bin/env node

/**
 * Автоматическая настройка бекенда
 * Заполняет .env.local из предоставленных данных
 */

const fs = require('fs');
const path = require('path');

// Данные будут переданы через аргументы или переменные окружения
const config = {
  CRM_TARGET: process.env.CRM_TARGET || 'SHEETS',
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
  TELEGRAM_ADMIN_CHAT_ID: process.env.TELEGRAM_ADMIN_CHAT_ID || '',
  
  // Google Sheets
  GOOGLE_SA_EMAIL: process.env.GOOGLE_SA_EMAIL || '',
  GOOGLE_SA_KEY: process.env.GOOGLE_SA_KEY || '',
  GOOGLE_SHEETS_ID: process.env.GOOGLE_SHEETS_ID || '',
  
  // Supabase
  DATABASE_URL: process.env.DATABASE_URL || '',
  
  // Опциональные
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY || '',
  REDIS_URL: process.env.REDIS_URL || '',
  GA4_MEASUREMENT_ID: process.env.GA4_MEASUREMENT_ID || '',
  GA4_API_SECRET: process.env.GA4_API_SECRET || '',
  META_PIXEL_ID: process.env.META_PIXEL_ID || '',
  META_ACCESS_TOKEN: process.env.META_ACCESS_TOKEN || '',
};

function generateEnvFile() {
  let content = `# Storage mode: SHEETS or SUPABASE\n`;
  content += `CRM_TARGET=${config.CRM_TARGET}\n\n`;
  
  content += `# Telegram admin alerts\n`;
  content += `TELEGRAM_BOT_TOKEN=${config.TELEGRAM_BOT_TOKEN}\n`;
  content += `TELEGRAM_ADMIN_CHAT_ID=${config.TELEGRAM_ADMIN_CHAT_ID}\n\n`;
  
  if (config.CRM_TARGET === 'SHEETS') {
    content += `# Google Sheets (если CRM_TARGET=SHEETS)\n`;
    content += `GOOGLE_SA_EMAIL=${config.GOOGLE_SA_EMAIL}\n`;
    content += `GOOGLE_SA_KEY=${config.GOOGLE_SA_KEY}\n`;
    content += `GOOGLE_SHEETS_ID=${config.GOOGLE_SHEETS_ID}\n\n`;
  } else {
    content += `# Supabase/Postgres (если CRM_TARGET=SUPABASE)\n`;
    content += `DATABASE_URL=${config.DATABASE_URL}\n\n`;
  }
  
  if (config.TURNSTILE_SECRET_KEY) {
    content += `# Anti-spam\n`;
    content += `TURNSTILE_SECRET_KEY=${config.TURNSTILE_SECRET_KEY}\n`;
  }
  
  if (config.REDIS_URL) {
    content += `REDIS_URL=${config.REDIS_URL}\n\n`;
  }
  
  if (config.GA4_MEASUREMENT_ID || config.GA4_API_SECRET) {
    content += `# Analytics (опционально)\n`;
    if (config.GA4_MEASUREMENT_ID) content += `GA4_MEASUREMENT_ID=${config.GA4_MEASUREMENT_ID}\n`;
    if (config.GA4_API_SECRET) content += `GA4_API_SECRET=${config.GA4_API_SECRET}\n`;
    if (config.META_PIXEL_ID) content += `META_PIXEL_ID=${config.META_PIXEL_ID}\n`;
    if (config.META_ACCESS_TOKEN) content += `META_ACCESS_TOKEN=${config.META_ACCESS_TOKEN}\n`;
  }
  
  return content;
}

const envPath = path.join(__dirname, '.env.local');
const envContent = generateEnvFile();

fs.writeFileSync(envPath, envContent, 'utf8');
console.log('✅ Файл .env.local создан успешно!');
console.log('📍 Путь:', envPath);

