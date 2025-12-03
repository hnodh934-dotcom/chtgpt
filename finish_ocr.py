#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
إكمال OCR - من صفحة 3101 إلى 3248
"""

import os
from pdf2image import convert_from_path
import pytesseract
from datetime import datetime

PDF_PATH = "/home/user/chtgpt/pdf24_merged (22)-مضغوط.pdf"
OUTPUT_TXT = "/home/user/chtgpt/النص_المستخرج.txt"

def main():
    print("\n" + "═" * 60)
    print("   إكمال OCR - من صفحة 3101 إلى 3248")
    print("═" * 60)

    with open(OUTPUT_TXT, 'r', encoding='utf-8') as f:
        existing_text = f.read()

    all_text = [existing_text]

    batch_size = 10
    start_from = 3101
    total_pages = 3248

    print(f"\n من الصفحة: {start_from}")
    print(f" إلى الصفحة: {total_pages}")
    print(f" البدء: {datetime.now().strftime('%H:%M:%S')}")
    print("\n" + "-" * 60)

    for start_page in range(start_from, total_pages + 1, batch_size):
        end_page = min(start_page + batch_size - 1, total_pages)

        print(f"\n معالجة الصفحات {start_page} - {end_page}...")

        try:
            pages = convert_from_path(
                PDF_PATH,
                dpi=200,
                first_page=start_page,
                last_page=end_page,
                thread_count=2
            )

            for i, page in enumerate(pages):
                page_num = start_page + i

                text = pytesseract.image_to_string(page, lang='ara')

                all_text.append(f"\n{'=' * 40}")
                all_text.append(f"    صفحة {page_num}")
                all_text.append(f"{'=' * 40}\n")
                all_text.append(text)

                progress = (page_num / total_pages) * 100
                print(f"   صفحة {page_num}/{total_pages} ({progress:.1f}%)")

            # حفظ كل 20 صفحة
            if (end_page - 3100) % 20 == 0 or end_page == total_pages:
                with open(OUTPUT_TXT, 'w', encoding='utf-8') as f:
                    f.write('\n'.join(all_text))
                print(f"   تم الحفظ...")

        except Exception as e:
            print(f"   خطأ: {e}")
            continue

    with open(OUTPUT_TXT, 'w', encoding='utf-8') as f:
        f.write('\n'.join(all_text))

    print("\n" + "=" * 60)
    print(f"   تم الانتهاء من جميع الصفحات!")
    print(f"   الوقت: {datetime.now().strftime('%H:%M:%S')}")
    print("=" * 60 + "\n")

if __name__ == "__main__":
    main()
