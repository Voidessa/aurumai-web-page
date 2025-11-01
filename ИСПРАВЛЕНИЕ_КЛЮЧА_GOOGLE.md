# 🔧 Исправление ошибки: DECODER routines::unsupported

## ❌ Ошибка:

```
Failed to access Google Sheets: error:1E08010C:DECODER routines::unsupported
```

**Причина:** Приватный ключ `GOOGLE_SA_KEY` неправильно отформатирован в Vercel. Переносы строк потерялись или были преобразованы неправильно.

---

## ✅ Решение:

### Вариант 1: Вставить ключ одной строкой с \n (РЕКОМЕНДУЕТСЯ)

В Vercel, при добавлении `GOOGLE_SA_KEY`, вставьте ключ **одной строкой**, заменив все переносы на `\n`:

```
-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDcXEaO/vnbIWgx\n+kPj7ZX1g7y1WXGCILNvlsmQHgOntMsXtbVJ3ebQKRfn6FEQW5sETt/NFnhQDr62\nVjJX83Hlmevhj+pGOTunKh4SfkyK6NuV+XRjPJ12xYlwfBEFGZ8v5HNz0kOfjmmF\ntz4Doc5fqgCCMI+G7iJNw1DMN9Pfdeo3i2n3HorbiOXSirctv/8YoPy0ETyBHn7i\ngEcUVMVTcvQA56aaUDuQlAmuZGb3+stQe83z51aglT7wkuOVMwIDiJWswWQcJ1Qc\n6O5qvvktJ/ysxs8YoAutCU01ASZSugCjsVQUSvWPq2v2uhttjtPiPI3muKAIg/Wz\n9lzpZW5FAgMBAAECggEAAUzfO//rKvFsPGdCpd3Nvt4hIoFiLfCI4xfSizsEZRNf\nB/4SEVsWRya9yBXS/uq25CswHywc6erg7X9eI9MBNcMym9bXIXvOZrv5mk8ww5Pu\nLX2o6ExtsgImZC4+F3fBYSRAq91J529D1iMnqzz15qUuTZZcoCozRnnobNwRMCGl\nnV4EASE6XOKQZKO7OlwB4PXVfeadutG/gnpom/ysJRPPuwKjuiJmisB0+XyOjZWU\n6AFNw1hcYTLDB0HjTXRtXNLVr+Qrg3VWyBzQxsdPB8p2a2MoRiZ14IdpMlyOXwPY\nItFahbuonDl6X653P3lS22/EyfstXiF7umJDNsT8nQKBgQD2mUcllzi0sZpXiNUV\n9pwqlEGC8+pRhLGT/1frMOkshSz3+pelEDBDm5/ocP3avVwpwtVQixQcsILLra59\nPD8rx6pvkjzxdZNmXJVQ6SWboSnX8WdMxY3f7+Svd2vBqx0B0EBmS1DqZgEW594i\n63c+0chHkpZtxWlYGAIFCutPwwKBgQDkwuuxaWPbAbGQO9HmMO6GPB9vtm85eWn1\nC7ACKeCWOpWlC0TU3Ppa3tM2LVmo+rIqeuGPa8Twdx5PgFLFKcCDCSR0Tg7Rp89x\neLhnxpQZ9Uz4SfsEP6u73ra3/g31EBCN2Yw5MbwP9/U2sK32R0UKTNkgMYsgd+C8\n57YBIKMxVwKBgHzYDs/2Jiw8uhHU4WQ0LM3VrvD4QcmxbyGpJT6ZzYLPjXuh74IO\nlxCzShqokaxbL7youcwEDVOU/TLWpD8c8DJe7Gd91sK7rrsk5idHUdXfmsqLmauh\nXHlh/xniULiEw7O2VdQ0DywMJkMNckWlhgJUvJuXl/bM+c8yoFsjMwx3AoGBAKWM\nFcrOzO+ZmykY0T53XLYR3mIWsQjzv2URLy9xpNCy1saYkBhHTnniVREY4pCx06uA\nP6ltwRiP64R3Be8e1u08+X+dWYYJncqtJS4ce+MJLMllqF0bwqjzdGFUXj9hf8lX\njO16+3DG7VLFqy7VxrW8hUiR8e/uMNokCQdp2g+DAoGBANnYShzaV/g/iGFqQ48A\nFetS140kJhTeMyKuQUx4h0+3cVqzxt4PBU/WRvhWPoX/uFuAxgWGTc0J5/spzVwI\nPjrkCWw9EV9rlzLUe7N+tqFxhgClnYqN+snBoZCKN3k3LtT40RXP95wTCc5jYzJu\nLjzTnbblIikKCW1BRdrsXtGG\n-----END PRIVATE KEY-----\n
```

**⚠️ ВАЖНО:** 
- Вся строка должна быть одной строкой (без переносов)
- Все переносы заменены на `\n`
- Начинается с `-----BEGIN PRIVATE KEY-----\n`
- Заканчивается на `-----END PRIVATE KEY-----\n`

---

### Вариант 2: Многострочный текст (если Vercel поддерживает)

Некоторые версии Vercel поддерживают многострочный ввод. Попробуйте вставить ключ как есть:

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

## 📝 Пошаговая инструкция:

### Шаг 1: Откройте проект бекенда на Vercel

1. [vercel.com/dashboard](https://vercel.com/dashboard)
2. Откройте проект: `aurumai-web-page`
3. Settings → Environment Variables

### Шаг 2: Найдите или создайте `GOOGLE_SA_KEY`

- Если переменная уже есть — нажмите на неё и отредактируйте
- Если нет — создайте новую

### Шаг 3: Вставьте ключ одной строкой

Используйте **Вариант 1** (одна строка с `\n`).

Скопируйте всю строку из раздела "Вариант 1" выше и вставьте в поле Value.

### Шаг 4: Сохраните и передеплойте

1. Нажмите **Save**
2. Перейдите в **Deployments**
3. Нажмите **"..."** → **"Redeploy"**

---

## ✅ Проверка после исправления:

После передеплоя проверьте:

```bash
curl -X POST https://aurumai-web-page.vercel.app/api/lead \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","experience":"новичок","goal":"Тест","source":"direct","utm":{},"turnstileToken":""}'
```

**Должно вернуться:**
```json
{"ok":true}
```

Если вернулся `{"ok":true}` — всё работает! Форма должна заработать.

---

**После исправления форма должна работать!** 🚀

