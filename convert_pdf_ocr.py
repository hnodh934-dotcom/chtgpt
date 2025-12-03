#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
تحويل PDF صوري إلى نص عربي باستخدام OCR
"""

import os
import sys
from pdf2image import convert_from_path
import pytesseract
from PIL import Image
from datetime import datetime

# الإعدادات
PDF_PATH = "/home/user/chtgpt/pdf24_merged (22)-مضغوط.pdf"
OUTPUT_DIR = "/home/user/chtgpt/ocr_output/"
OUTPUT_TXT = "/home/user/chtgpt/النص_المستخرج.txt"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def main():
    print("\n" + "═" * 60)
    print("   🔷 تحويل PDF إلى نص عربي - OCR 🔷")
    print("═" * 60)

    print(f"\n📄 الملف: {PDF_PATH}")
    print(f"📁 مجلد الإخراج: {OUTPUT_DIR}")
    print(f"⏰ البدء: {datetime.now().strftime('%H:%M:%S')}")
    print("\n" + "─" * 60)

    all_text = []

    # تحويل على دفعات لتوفير الذاكرة
    batch_size = 10
    total_pages = 3248

    for start_page in range(1, total_pages + 1, batch_size):
        end_page = min(start_page + batch_size - 1, total_pages)

        print(f"\n⏳ معالجة الصفحات {start_page} - {end_page}...")

        try:
            # تحويل دفعة من الصفحات
            pages = convert_from_path(
                PDF_PATH,
                dpi=200,
                first_page=start_page,
                last_page=end_page,
                thread_count=2
            )

            for i, page in enumerate(pages):
                page_num = start_page + i

                # استخراج النص
                text = pytesseract.image_to_string(page, lang='ara')

                # إضافة للنص الكامل
                all_text.append(f"\n{'═' * 40}")
                all_text.append(f"    صفحة {page_num}")
                all_text.append(f"{'═' * 40}\n")
                all_text.append(text)

                # طباعة التقدم
                progress = (page_num / total_pages) * 100
                print(f"   ✓ صفحة {page_num}/{total_pages} ({progress:.1f}%)")

            # حفظ تدريجي كل 50 صفحة
            if end_page % 50 == 0 or end_page == total_pages:
                with open(OUTPUT_TXT, 'w', encoding='utf-8') as f:
                    f.write('\n'.join(all_text))
                print(f"   💾 تم الحفظ المؤقت...")

        except Exception as e:
            print(f"   ⚠️ خطأ في الصفحات {start_page}-{end_page}: {e}")
            continue

    # الحفظ النهائي
    with open(OUTPUT_TXT, 'w', encoding='utf-8') as f:
        f.write('\n'.join(all_text))

    print("\n" + "═" * 60)
    print(f"   ✅ تم الانتهاء!")
    print(f"   📄 الملف: {OUTPUT_TXT}")
    print(f"   ⏰ الانتهاء: {datetime.now().strftime('%H:%M:%S')}")
    print("═" * 60 + "\n")

if __name__ == "__main__":
    main()
