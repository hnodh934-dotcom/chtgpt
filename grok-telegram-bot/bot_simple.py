#!/usr/bin/env python3
"""
بوت تيليجرام بسيط مع Grok AI - يدعم OCR للعربي والصور وPDF
"""

import os
import base64
import requests
import time
import tempfile
import subprocess
from dotenv import load_dotenv

load_dotenv()

GROK_API_KEY = os.getenv("GROK_API_KEY")
TELEGRAM_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_API = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}"


def grok_chat(message):
    """إرسال رسالة لـ Grok"""
    try:
        response = requests.post(
            "https://api.x.ai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROK_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "grok-3-latest",
                "messages": [
                    {"role": "system", "content": "أنت مساعد ذكي تتحدث العربية بطلاقة."},
                    {"role": "user", "content": message}
                ],
                "max_tokens": 1000
            },
            timeout=60
        )
        data = response.json()
        if "choices" in data:
            return data["choices"][0]["message"]["content"]
        elif "error" in data:
            return f"❌ خطأ من Grok: {data['error'].get('message', str(data['error']))}"
        else:
            return f"❌ رد غير متوقع: {str(data)[:200]}"
    except Exception as e:
        return f"❌ خطأ: {str(e)}"


def grok_vision(image_base64, prompt="استخرج كل النص من هذه الصورة بدقة"):
    """إرسال صورة لـ Grok Vision"""
    try:
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
                "max_tokens": 4000
            },
            timeout=120
        )
        data = response.json()
        if "choices" in data:
            return data["choices"][0]["message"]["content"]
        elif "error" in data:
            return f"❌ خطأ من Grok: {data['error'].get('message', str(data['error']))}"
        else:
            return f"❌ رد غير متوقع: {str(data)[:200]}"
    except Exception as e:
        return f"❌ خطأ: {str(e)}"


def send_message(chat_id, text):
    """إرسال رسالة تيليجرام"""
    try:
        if len(text) > 4000:
            chunks = [text[i:i+4000] for i in range(0, len(text), 4000)]
            for chunk in chunks:
                requests.post(f"{TELEGRAM_API}/sendMessage", json={"chat_id": chat_id, "text": chunk}, timeout=30)
        else:
            requests.post(f"{TELEGRAM_API}/sendMessage", json={"chat_id": chat_id, "text": text}, timeout=30)
    except Exception as e:
        print(f"خطأ في إرسال الرسالة: {e}")


def get_updates(offset=None):
    """جلب الرسائل الجديدة"""
    try:
        params = {"timeout": 30}
        if offset:
            params["offset"] = offset
        response = requests.get(f"{TELEGRAM_API}/getUpdates", params=params, timeout=60)
        if response.status_code == 200:
            return response.json().get("result", [])
        return []
    except Exception as e:
        print(f"خطأ في جلب التحديثات: {e}")
        return []


def download_file(file_id):
    """تحميل ملف من تيليجرام"""
    try:
        file_info = requests.get(f"{TELEGRAM_API}/getFile", params={"file_id": file_id}, timeout=30).json()
        if "result" not in file_info:
            return None, None
        file_path = file_info["result"]["file_path"]
        file_url = f"https://api.telegram.org/file/bot{TELEGRAM_TOKEN}/{file_path}"
        response = requests.get(file_url, timeout=60)
        return response.content, file_path
    except Exception as e:
        print(f"خطأ في تحميل الملف: {e}")
        return None, None


def pdf_to_images(pdf_bytes):
    """تحويل PDF إلى صور"""
    images = []
    try:
        with tempfile.TemporaryDirectory() as tmpdir:
            pdf_path = os.path.join(tmpdir, "input.pdf")
            with open(pdf_path, "wb") as f:
                f.write(pdf_bytes)

            # استخدام pdftoppm لتحويل PDF لصور
            output_prefix = os.path.join(tmpdir, "page")
            subprocess.run(
                ["pdftoppm", "-jpeg", "-r", "150", pdf_path, output_prefix],
                check=True,
                capture_output=True
            )

            # قراءة الصور الناتجة
            for filename in sorted(os.listdir(tmpdir)):
                if filename.startswith("page") and filename.endswith(".jpg"):
                    img_path = os.path.join(tmpdir, filename)
                    with open(img_path, "rb") as f:
                        images.append(base64.b64encode(f.read()).decode('utf-8'))
    except Exception as e:
        print(f"خطأ في تحويل PDF: {e}")
    return images


def main():
    print("🤖 البوت شغال!")
    print(f"🔑 Grok API: {GROK_API_KEY[:20]}...")
    print(f"🤖 Telegram: {TELEGRAM_TOKEN[:20]}...")

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
                username = message.get("from", {}).get("username", "مجهول")
                print(f"📩 رسالة من @{username}")

                # رسالة ترحيب
                if message.get("text", "").startswith("/start"):
                    send_message(chat_id, "مرحباً! 👋\n\n📝 أرسل صورة = أستخرج النص\n📄 أرسل PDF = أحوله لنص\n💬 أرسل رسالة = أرد عليك\n\nجربني! 🚀")
                    continue

                # معالجة الصور
                if "photo" in message:
                    send_message(chat_id, "🔍 جاري قراءة الصورة...")
                    photo = message["photo"][-1]
                    file_bytes, _ = download_file(photo["file_id"])

                    if file_bytes:
                        image_b64 = base64.b64encode(file_bytes).decode('utf-8')
                        caption = message.get("caption", "")
                        if "وصف" in caption:
                            result = grok_vision(image_b64, "صف هذه الصورة بالتفصيل بالعربية")
                        else:
                            result = grok_vision(image_b64, "استخرج كل النص من هذه الصورة بدقة عالية. حافظ على التنسيق الأصلي.")
                        send_message(chat_id, result)
                    else:
                        send_message(chat_id, "❌ ما قدرت أحمل الصورة")
                    continue

                # معالجة الملفات (PDF والصور)
                if "document" in message:
                    doc = message["document"]
                    file_name = doc.get("file_name", "").lower()
                    mime_type = doc.get("mime_type", "")

                    # PDF
                    if file_name.endswith(".pdf") or mime_type == "application/pdf":
                        send_message(chat_id, "📄 جاري تحويل PDF...")
                        file_bytes, _ = download_file(doc["file_id"])

                        if file_bytes:
                            images = pdf_to_images(file_bytes)
                            if images:
                                all_text = []
                                for i, img_b64 in enumerate(images):
                                    send_message(chat_id, f"🔍 جاري قراءة صفحة {i+1}/{len(images)}...")
                                    text = grok_vision(img_b64, "استخرج كل النص من هذه الصورة بدقة. حافظ على التنسيق.")
                                    all_text.append(f"--- صفحة {i+1} ---\n{text}")

                                result = "\n\n".join(all_text)
                                send_message(chat_id, result)
                            else:
                                send_message(chat_id, "❌ ما قدرت أحول الـ PDF. جرب ترسله كصور.")
                        else:
                            send_message(chat_id, "❌ ما قدرت أحمل الملف")
                        continue

                    # صور كملفات
                    if mime_type and mime_type.startswith("image/"):
                        send_message(chat_id, "🔍 جاري قراءة الصورة...")
                        file_bytes, _ = download_file(doc["file_id"])
                        if file_bytes:
                            image_b64 = base64.b64encode(file_bytes).decode('utf-8')
                            result = grok_vision(image_b64, "استخرج كل النص من هذه الصورة بدقة عالية.")
                            send_message(chat_id, result)
                        else:
                            send_message(chat_id, "❌ ما قدرت أحمل الصورة")
                        continue

                    send_message(chat_id, "⚠️ أدعم الصور و PDF فقط حالياً")
                    continue

                # معالجة النص
                if "text" in message and not message["text"].startswith("/"):
                    send_message(chat_id, "⏳ جاري التفكير...")
                    result = grok_chat(message["text"])
                    send_message(chat_id, result)

        except KeyboardInterrupt:
            print("\n👋 تم إيقاف البوت")
            break
        except Exception as e:
            print(f"خطأ عام: {e}")
            time.sleep(5)


if __name__ == "__main__":
    main()
