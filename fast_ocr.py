#!/usr/bin/env python3
"""
سكربت OCR سريع للعربي - يحول PDF إلى TXT
"""

import os
import subprocess
import tempfile
from concurrent.futures import ThreadPoolExecutor, as_completed
import sys

def process_page(args):
    """معالجة صفحة واحدة"""
    pdf_path, page_num, output_dir = args
    try:
        with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as tmp:
            tmp_path = tmp.name

        # تحويل الصفحة لصورة
        subprocess.run([
            'pdftoppm', '-png', '-r', '200',
            '-f', str(page_num), '-l', str(page_num),
            '-singlefile', pdf_path, tmp_path.replace('.png', '')
        ], capture_output=True, check=True)

        # OCR بالعربي
        result = subprocess.run([
            'tesseract', tmp_path, 'stdout', '-l', 'ara', '--psm', '6'
        ], capture_output=True, text=True)

        os.unlink(tmp_path)
        return page_num, result.stdout
    except Exception as e:
        return page_num, f"[خطأ في صفحة {page_num}: {str(e)}]"

def pdf_to_txt(pdf_path, output_path, max_workers=8):
    """تحويل PDF كامل إلى TXT"""

    # معرفة عدد الصفحات
    result = subprocess.run(['pdfinfo', pdf_path], capture_output=True, text=True)
    pages = 0
    for line in result.stdout.split('\n'):
        if 'Pages:' in line:
            pages = int(line.split(':')[1].strip())
            break

    print(f"📄 {os.path.basename(pdf_path)}: {pages} صفحة")

    # معالجة بالتوازي
    all_text = {}
    args_list = [(pdf_path, i, None) for i in range(1, pages + 1)]

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(process_page, args): args[1] for args in args_list}
        done = 0
        for future in as_completed(futures):
            page_num, text = future.result()
            all_text[page_num] = text
            done += 1
            if done % 50 == 0 or done == pages:
                print(f"  ✅ {done}/{pages} ({int(done/pages*100)}%)")

    # ترتيب وكتابة
    with open(output_path, 'w', encoding='utf-8') as f:
        for i in range(1, pages + 1):
            f.write(f"\n--- صفحة {i} ---\n")
            f.write(all_text.get(i, ''))
            f.write('\n')

    print(f"✅ تم حفظ: {output_path}")

if __name__ == "__main__":
    files = [
        ("pdf24_merged (20)-مضغوط.pdf", "output_20.txt"),
        ("pdf24_merged (21)-مضغوط.pdf", "output_21.txt"),
        ("pdf24_merged (22)-مضغوط.pdf", "output_22.txt"),
    ]

    for pdf, txt in files:
        if os.path.exists(pdf):
            print(f"\n🔄 جاري معالجة: {pdf}")
            pdf_to_txt(pdf, txt, max_workers=8)
