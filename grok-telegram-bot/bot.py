#!/usr/bin/env python3
"""
بوت تيليجرام مع Grok AI - يدعم OCR للعربي
"""

import os
import base64
import logging
from io import BytesIO
from dotenv import load_dotenv
from openai import OpenAI
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# تحميل المتغيرات
load_dotenv()

# إعداد اللوق
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# إعداد Grok API
client = OpenAI(
    api_key=os.getenv("GROK_API_KEY"),
    base_url="https://api.x.ai/v1"
)

# === الأوامر ===

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """رسالة الترحيب"""
    welcome = """
مرحباً! 👋 أنا بوت Grok للذكاء الاصطناعي

✨ أقدر أساعدك في:

📝 /text - أرسل صورة وأستخرج النص منها (OCR)
💬 أرسل أي رسالة وأرد عليك
🖼️ أرسل صورة وأوصفها لك

جربني الآن! أرسل صورة أو سؤال 🚀
    """
    await update.message.reply_text(welcome)


async def handle_text(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """الرد على الرسائل النصية"""
    user_message = update.message.text

    await update.message.reply_text("⏳ جاري التفكير...")

    try:
        response = client.chat.completions.create(
            model="grok-2-latest",
            messages=[
                {"role": "system", "content": "أنت مساعد ذكي تتحدث العربية بطلاقة. أجب بشكل مختصر ومفيد."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=1000
        )

        reply = response.choices[0].message.content
        await update.message.reply_text(reply)

    except Exception as e:
        logger.error(f"خطأ: {e}")
        await update.message.reply_text(f"❌ حدث خطأ: {str(e)}")


async def handle_image(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """معالجة الصور - OCR واستخراج النص"""

    await update.message.reply_text("🔍 جاري قراءة الصورة...")

    try:
        # تحميل الصورة
        photo = update.message.photo[-1]  # أعلى جودة
        file = await context.bot.get_file(photo.file_id)

        # تحميل البيانات
        image_bytes = BytesIO()
        await file.download_to_memory(image_bytes)
        image_bytes.seek(0)

        # تحويل لـ base64
        image_base64 = base64.b64encode(image_bytes.read()).decode('utf-8')

        # تحديد نوع الطلب
        caption = update.message.caption or ""

        if "نص" in caption or "ocr" in caption.lower() or "استخرج" in caption:
            prompt = """استخرج كل النص الموجود في هذه الصورة بدقة عالية.
            - حافظ على التنسيق الأصلي
            - اكتب النص العربي من اليمين لليسار
            - لا تضف أي تعليقات، فقط النص المستخرج"""
        else:
            prompt = "صف هذه الصورة بالتفصيل بالعربية. إذا كان فيها نص، اذكره."

        # إرسال للـ API
        response = client.chat.completions.create(
            model="grok-2-vision-latest",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{image_base64}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=2000
        )

        reply = response.choices[0].message.content

        # إذا الرد طويل، نقسمه
        if len(reply) > 4000:
            chunks = [reply[i:i+4000] for i in range(0, len(reply), 4000)]
            for chunk in chunks:
                await update.message.reply_text(chunk)
        else:
            await update.message.reply_text(reply)

    except Exception as e:
        logger.error(f"خطأ في معالجة الصورة: {e}")
        await update.message.reply_text(f"❌ خطأ: {str(e)}")


async def handle_document(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """معالجة الملفات (صور كملفات)"""

    doc = update.message.document

    # التحقق من نوع الملف
    if doc.mime_type and doc.mime_type.startswith('image/'):
        await update.message.reply_text("🔍 جاري قراءة الصورة...")

        try:
            file = await context.bot.get_file(doc.file_id)
            image_bytes = BytesIO()
            await file.download_to_memory(image_bytes)
            image_bytes.seek(0)

            image_base64 = base64.b64encode(image_bytes.read()).decode('utf-8')

            response = client.chat.completions.create(
                model="grok-2-vision-latest",
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": "استخرج كل النص من هذه الصورة بدقة. حافظ على التنسيق."},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{image_base64}"
                                }
                            }
                        ]
                    }
                ],
                max_tokens=2000
            )

            await update.message.reply_text(response.choices[0].message.content)

        except Exception as e:
            await update.message.reply_text(f"❌ خطأ: {str(e)}")
    else:
        await update.message.reply_text("⚠️ حالياً أدعم الصور فقط. أرسل صورة وأستخرج النص منها.")


def main():
    """تشغيل البوت"""

    token = os.getenv("TELEGRAM_BOT_TOKEN")

    if not token or token == "YOUR_TELEGRAM_TOKEN_HERE":
        print("❌ خطأ: لازم تضيف TELEGRAM_BOT_TOKEN في ملف .env")
        print("\n📝 طريقة الحصول على التوكن:")
        print("1. افتح تيليجرام")
        print("2. ابحث عن @BotFather")
        print("3. أرسل /newbot")
        print("4. اختر اسم للبوت")
        print("5. انسخ التوكن وضعه في ملف .env")
        return

    # إنشاء التطبيق
    app = Application.builder().token(token).build()

    # إضافة الأوامر
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_text))
    app.add_handler(MessageHandler(filters.PHOTO, handle_image))
    app.add_handler(MessageHandler(filters.Document.ALL, handle_document))

    # تشغيل
    print("🤖 البوت شغال! اضغط Ctrl+C للإيقاف")
    app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
