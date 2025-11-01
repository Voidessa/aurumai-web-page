import { google } from "googleapis";
import { PrismaClient } from "@prisma/client";

const prisma = process.env.CRM_TARGET === "SUPABASE" ? new PrismaClient() : null;

export async function saveLead(data: any) {
  if (process.env.CRM_TARGET === "SUPABASE" && prisma) {
    return prisma.lead.upsert({
      where: { email: data.email },
      update: { ...data },
      create: { ...data }
    });
  }
  // Google Sheets
  let privateKey = (process.env.GOOGLE_SA_KEY || "").replace(/\\n/g, "\n");
  // Убираем кавычки, если они есть
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }
  const auth = new google.auth.JWT(
    process.env.GOOGLE_SA_EMAIL,
    undefined,
    privateKey,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID!;
  
  // Проверяем и создаем лист "Leads" если нужно
  let range = "Leads!A:Z";
  try {
    // Получаем информацию о таблице
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetExists = spreadsheet.data.sheets?.some(sheet => sheet.properties?.title === "Leads");
    
    if (!sheetExists) {
      // Создаем лист "Leads"
      const addSheetResponse = await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: "Leads",
                gridProperties: { rowCount: 1000, columnCount: 10 }
              }
            }
          }]
        }
      });
      
      // Добавляем заголовки
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: "Leads!A1:I1",
        valueInputOption: "RAW",
        requestBody: {
          values: [[
            "Дата",
            "Имя",
            "Email",
            "Telegram",
            "Опыт",
            "Цель",
            "Источник",
            "UTM",
            "Статус"
          ]]
        }
      });
    }
  } catch (error: any) {
    console.error("Error checking/creating Leads sheet:", error.message);
    // Если не удалось создать лист, попробуем использовать первый существующий лист
    try {
      const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
      const firstSheet = spreadsheet.data.sheets?.[0];
      if (firstSheet?.properties?.title) {
        range = `${firstSheet.properties.title}!A:Z`;
        console.log(`Using existing sheet: ${firstSheet.properties.title}`);
      } else {
        throw new Error("No sheets found");
      }
    } catch (fallbackError: any) {
      console.error("Error using fallback sheet:", fallbackError.message);
      throw new Error(`Failed to access Google Sheets: ${fallbackError.message}`);
    }
  }
  
  // Добавляем данные
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: { 
      values: [[
        new Date().toISOString(), 
        data.name, 
        data.email, 
        data.telegram || "", 
        data.experience || "", 
        data.goal || "",
        data.source || "", 
        JSON.stringify(data.utm || {}), 
        "NEW"
      ]] 
    }
  });
  return { ok: true };
}

export async function saveInquiry(data: any) {
  if (process.env.CRM_TARGET === "SUPABASE" && prisma) {
    return prisma.inquiry.create({ data });
  }
  let privateKey = (process.env.GOOGLE_SA_KEY || "").replace(/\\n/g, "\n");
  // Убираем кавычки, если они есть
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }
  const auth = new google.auth.JWT(
    process.env.GOOGLE_SA_EMAIL, 
    undefined,
    privateKey,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
    range: "Inquiries!A:Z",
    valueInputOption: "RAW",
    requestBody: { 
      values: [[
        new Date().toISOString(), 
        data.kind, 
        data.name, 
        data.email, 
        data.telegram || "", 
        data.company || "",
        data.message, 
        data.source || "", 
        JSON.stringify(data.utm || {})
      ]] 
    }
  });
  return { ok: true };
}

