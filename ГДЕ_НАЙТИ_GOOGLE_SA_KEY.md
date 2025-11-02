# 🔑 Где найти GOOGLE_SA_KEY

## 📍 Где находится ключ:

**Файл:** `/Users/hojiakbar/Downloads/aurum-ai-web-page-d90378fae551.json`

Это JSON файл, который вы скачали из Google Cloud Console при создании Service Account.

---

## 📝 Как скопировать ключ:

### Вариант 1: Откройте файл в редакторе

1. Откройте файл: `aurum-ai-web-page-d90378fae551.json`
   - Он находится в папке Downloads на вашем Mac
   - Путь: `/Users/hojiakbar/Downloads/`

2. Найдите поле `"private_key"` (строка 5 в файле)

3. Скопируйте **ВСЁ** значение этого поля:
   - Начинается с: `-----BEGIN PRIVATE KEY-----`
   - Заканчивается: `-----END PRIVATE KEY-----\n`
   - Включает все строки между ними

### Вариант 2: Используйте готовый ключ

Вот полный ключ из вашего файла (уже готов к использованию):

```
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDcXEaO/vnbIWgx
+kPj7ZX1g7y1WXGCILNvlsmQHgOntMsXtbVJ3ebQKRfn6FEQW5sETt/NFnhQDr62
VjJX83Hlmevhj+pGOTunKh4SfkyK6NuV+XRjPJ12xYlwfBEFGZ8v5HNz0kOfjmmF
tz4Doc5fqgCCMI+G7iJNw1DMN9Pfdeo3i2n3HorbiOXSirctv/8YoPy0ETyBHn7i
gEcUVMVTcvQA56aaUDuQlAmuZGb3+stQe83z51aglT7wkuOVMwIDiJWswWQcJ1Qc
6O5qvvktJ/ysxs8YoAutCU01ASZSugCjsVQUSvWPq2v2uhttjtPiPI3muKAIg/Wz
9lzpZW5FAgMBAAECggEAAUzfO//rKvFsPGdCpd3Nvt4hIoFiLfCI4xfSizsEZRNf
B/4SEVsWRya9yBXS/uq25CswHywc6erg7X9eI9MBNcMym9bXIXvOZrv5mk8ww5Pu
LX2o6ExtsgImZC4+F3fBYSRAq91J529D1iMnqzz15qUuTZZcoCozRnnobNwRMCGl
nV4EASE6XOKQZKO7OlwB4PXVfeadutG/gnpom/ysJRPPuwKjuiJmisB0+XyOjZWU
6AFNw1hcYTLDB0HjTXRtXNLVr+Qrg3VWyBzQxsdPB8p2a2MoRiZ14IdpMlyOXwPY
ItFahbuonDl6X653P3lS22/EyfstXiF7umJDNsT8nQKBgQD2mUcllzi0sZpXiNUV
9pwqlEGC8+pRhLGT/1frMOkshSz3+pelEDBDm5/ocP3avVwpwtVQixQcsILLra59
PD8rx6pvkjzxdZNmXJVQ6SWboSnX8WdMxY3f7+Svd2vBqx0B0EBmS1DqZgEW594i
63c+0chHkpZtxWlYGAIFCutPwwKBgQDkwuuxaWPbAbGQO9HmMO6GPB9vtm85eWn1
C7ACKeCWOpWlC0TU3Ppa3tM2LVmo+rIqeuGPa8Twdx5PgFLFKcCDCSR0Tg7Rp89x
eLhnxpQZ9Uz4SfsEP6u73ra3/g31EBCN2Yw5MbwP9/U2sK32R0UKTNkgMYsgd+C8
57YBIKMxVwKBgHzYDs/2Jiw8uhHU4WQ0LM3VrvD4QcmxbyGpJT6ZzYLPjXuh74IO
lxCzShqokaxbL7youcwEDVOU/TLWpD8c8DJe7Gd91sK7rrsk5idHUdXfmsqLmauh
XHlh/xniULiEw7O2VdQ0DywMJkMNckWlhgJUvJuXl/bM+c8yoFsjMwx3AoGBAKWM
FcrOzO+ZmykY0T53XLYR3mIWsQjzv2URLy9xpNCy1saYkBhHTnniVREY4pCx06uA
P6ltwRiP64R3Be8e1u08+X+dWYYJncqtJS4ce+MJLMllqF0bwqjzdGFUXj9hf8lX
jO16+3DG7VLFqy7VxrW8hUiR8e/uMNokCQdp2g+DAoGBANnYShzaV/g/iGFqQ48A
FetS140kJhTeMyKuQUx4h0+3cVqzxt4PBU/WRvhWPoX/uFuAxgWGTc0J5/spzVwI
PjrkCWw9EV9rlzLUe7N+tqFxhgClnYqN+snBoZCKN3k3LtT40RXP95wTCc5jYzJu
LjzTnbblIikKCW1BRdrsXtGG
-----END PRIVATE KEY-----
```

---

## ✅ Как добавить в Vercel:

1. Откройте проект **БЕКЕНДА** на Vercel
2. Settings → Environment Variables
3. Добавьте новую переменную:
   - **Key:** `GOOGLE_SA_KEY`
   - **Value:** Вставьте весь ключ выше (можно многострочно или одной строкой)
4. Нажмите **Save**

**⚠️ ВАЖНО:**
- Скопируйте ключ целиком, включая `-----BEGIN PRIVATE KEY-----` и `-----END PRIVATE KEY-----`
- Сохраните все переносы строк
- Можно вставить как многострочный текст в Vercel

---

## 📂 Структура JSON файла:

```json
{
  "type": "service_account",
  "project_id": "aurum-ai-web-page",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",  ← ВОТ ОН!
  "client_email": "ai-course-backend@aurum-ai-web-page.iam.gserviceaccount.com",
  ...
}
```

**Поле `"private_key"` - это и есть `GOOGLE_SA_KEY`**

---

## 🔍 Если файл потерялся:

Если вы не можете найти файл:

1. Зайдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Перейдите: IAM & Admin → Service Accounts
3. Найдите: `ai-course-backend@aurum-ai-web-page.iam.gserviceaccount.com`
4. Нажмите на него → Keys → Add Key → Create new key
5. Скачайте новый JSON файл
6. Используйте `private_key` из нового файла

---

## ✅ Готово!

Теперь у вас есть полный ключ, который нужно добавить в Vercel как `GOOGLE_SA_KEY`.

После добавления **обязательно передеплойте бекенд** (Deployments → Redeploy)!

