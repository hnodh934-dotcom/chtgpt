#!/usr/bin/env python3
"""
بوت تيليجرام بسيط مع Grok AI - يدعم OCR للعربي
"""

import os
import base64
import requests
import time
from dotenv import load_dotenv

load_dotenv()

GROK_API_KEY = os.getenv("GROK_API_KEY")
TELEGRAM_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_API = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}"


def grok_chat(message):
    """إرسال رسالة لـ Grok"""
    response = requests.post(
        "https://api.x.ai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {GROK_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "grok-2-latest",
            "messages": [
                {"role": "system", "content": "أنت مساعد ذكي تتحدث العربية بطلاقة."},
                {"role": "user", "content": message}
            ],
            "max_tokens": 1000
        }
    )
    return response.json()["choices"][0]["message"]["content"]


def grok_vision(image_base64, prompt="استخرج كل النص من هذه الصورة بدقة"):
    """إرسال صورة لـ Grok Vision"""
    response = requests.post(
        "https://api.x.ai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {GROK_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "grok-2-vision-latest",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{image_base64}"}}
                    ]
                }
            ],
            "max_tokens": 2000
        }
    )
    return response.json()["choices"][0]["message"]["content"]


def send_message(chat_id, text):
    """إرسال رسالة تيليجرام"""
    # تقسيم الرسائل الطويلة
    if len(text) > 4000:
        chunks = [text[i:i+4000] for i in range(0, len(text), 4000)]
        for chunk in chunks:
            requests.post(f"{TELEGRAM_API}/sendMessage", json={"chat_id": chat_id, "text": chunk})
    else:
        requests.post(f"{TELEGRAM_API}/sendMessage", json={"chat_id": chat_id, "text": text})


def get_updates(offset=None):
    """جلب الرسائل الجديدة"""
    params = {"timeout": 30}
    if offset:
        params["offset"] = offset
    response = requests.get(f"{TELEGRAM_API}/getUpdates", params=params)
    return response.json().get("result", [])


def download_photo(file_id):
    """تحميل صورة من تيليجرام"""
    # الحصول على مسار الملف
    file_info = requests.get(f"{TELEGRAM_API}/getFile", params={"file_id": file_id}).json()
    file_path = file_info["result"]["file_path"]

    # تحميل الملف
    file_url = f"https://api.telegram.org/file/bot{TELEGRAM_TOKEN}/{file_path}"
    response = requests.get(file_url)
    return base64.b64encode(response.content).decode('utf-8')


def main():
    print("🤖 البوت شغال! اضغط Ctrl+C للإيقاف")

    offset = None

    while True:
        try:
            updates = get_updates(offset)

            for update in updates:
                offset = update["update_id"] + 1

                if "message" not in update:
                    continue

                message = update["message"]
                chat_id = message["chat"]["id"]

                # رسالة ترحيب
                if message.get("text", "").startswith("/start"):
                    send_message(chat_id, """
مرحباً! 👋 أنا بوت Grok

📝 أرسل صورة = أستخرج النص منها (OCR)
💬 أرسل رسالة = أرد عليك

جربني الآن! 🚀
                    """)
                    continue

                # معالجة الصور
                if "photo" in message:
                    send_message(chat_id, "🔍 جاري قراءة الصورة...")
                    try:
                        photo = message["photo"][-1]  # أعلى جودة
                        image_b64 = download_photo(photo["file_id"])

                        caption = message.get("caption", "")
                        if "وصف" in caption or "describe" in caption.lower():
                            result = grok_vision(image_b64, "صف هذه الصورة بالتفصيل بالعربية")
                        else:
                            result = grok_vision(image_b64, "استخرج كل النص من هذه الصورة بدقة عالية. حافظ على التنسيق الأصلي.")

                        send_message(chat_id, result)
                    except Exception as e:
                        send_message(chat_id, f"❌ خطأ: {str(e)}")
                    continue

                # معالجة النص
                if "text" in message and not message["text"].startswith("/"):
                    send_message(chat_id, "⏳ جاري التفكير...")
                    try:
                        result = grok_chat(message["text"])
                        send_message(chat_id, result)
                    except Exception as e:
                        send_message(chat_id, f"❌ خطأ: {str(e)}")

        except KeyboardInterrupt:
            print("\n👋 تم إيقاف البوت")
            break
        except Exception as e:
            print(f"خطأ: {e}")
            time.sleep(5)


if __name__ == "__main__":
    main()
