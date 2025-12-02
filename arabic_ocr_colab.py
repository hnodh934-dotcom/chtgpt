# ═══════════════════════════════════════════════════════════════
#        سكربت تحويل PDF صوري إلى نص عربي - Google Colab
#        Wathqa Arabic OCR Script
# ═══════════════════════════════════════════════════════════════

# ──────────────────────────────────────
# الخطوة 1: تثبيت المكتبات (شغّل هذه الخلية أولاً)
# ──────────────────────────────────────

!apt-get update
!apt-get install -y tesseract-ocr tesseract-ocr-ara poppler-utils
!pip install pytesseract pdf2image Pillow arabic-reshaper python-bidi

# ──────────────────────────────────────
# الخطوة 2: الكود الرئيسي
# ──────────────────────────────────────

import pytesseract
from pdf2image import convert_from_path
from PIL import Image
import arabic_reshaper
from bidi.algorithm import get_display
import os
from google.colab import files

def process_pdf_to_text(pdf_path):
    """تحويل PDF صوري إلى نص عربي"""
    print(f"📄 جاري معالجة: {pdf_path}")

    # تحويل PDF إلى صور
    print("   ⏳ تحويل الصفحات إلى صور...")
    pages = convert_from_path(pdf_path, dpi=300)

    all_text = []
    total_pages = len(pages)

    for i, page in enumerate(pages, 1):
        print(f"   📝 معالجة صفحة {i}/{total_pages}...")

        # استخراج النص بالعربية
        text = pytesseract.image_to_string(page, lang='ara')
        all_text.append(f"═══ صفحة {i} ═══\n{text}\n")

    return "\n".join(all_text)

def process_image_to_text(image_path):
    """تحويل صورة إلى نص عربي"""
    print(f"🖼️ جاري معالجة: {image_path}")

    image = Image.open(image_path)
    text = pytesseract.image_to_string(image, lang='ara')

    return text

# ──────────────────────────────────────
# الخطوة 3: رفع الملفات ومعالجتها
# ──────────────────────────────────────

print("\n" + "═" * 50)
print("   🔷 نظام تحويل PDF/صور إلى نص عربي 🔷")
print("═" * 50 + "\n")

print("📤 ارفع ملفاتك (PDF أو صور)...")
uploaded = files.upload()

for filename in uploaded.keys():
    print(f"\n{'─' * 40}")

    # تحديد نوع الملف
    ext = filename.lower().split('.')[-1]

    if ext == 'pdf':
        result = process_pdf_to_text(filename)
    elif ext in ['png', 'jpg', 'jpeg', 'tiff', 'bmp']:
        result = process_image_to_text(filename)
    else:
        print(f"⚠️ نوع الملف غير مدعوم: {filename}")
        continue

    # حفظ النتيجة
    output_name = filename.rsplit('.', 1)[0] + '_نص.txt'

    with open(output_name, 'w', encoding='utf-8') as f:
        f.write(result)

    print(f"\n✅ تم الحفظ في: {output_name}")

    # عرض معاينة
    print("\n📋 معاينة النص المستخرج:")
    print("─" * 40)
    preview = result[:1000] + "..." if len(result) > 1000 else result
    print(preview)
    print("─" * 40)

    # تحميل الملف
    print("\n📥 جاري تحميل الملف...")
    files.download(output_name)

print("\n" + "═" * 50)
print("   ✨ تمت المعالجة بنجاح! ✨")
print("═" * 50)
