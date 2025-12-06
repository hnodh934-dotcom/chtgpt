/**
 * سكريبت تنفيذ البيانات الأولية
 * Run Seed Data Script
 * 
 * هذا السكريبت يقوم بإدخال البيانات الأولية للأطر التنظيمية والضوابط
 * في قاعدة البيانات.
 * 
 * الاستخدام:
 * node scripts/run-seed.mjs
 */

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { frameworks, controls } from '../drizzle/schema.ts';

// استيراد البيانات
import { frameworks as frameworksData, pdplControls } from './seed-frameworks.ts';

async function main() {
  console.log('🚀 بدء إدخال البيانات الأولية...\n');

  // الاتصال بقاعدة البيانات
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection);

  try {
    // 1. إدخال الأطر التنظيمية
    console.log('📋 إدخال الأطر التنظيمية...');
    const insertedFrameworks = [];
    
    for (const framework of frameworksData) {
      const [result] = await db.insert(frameworks).values(framework);
      insertedFrameworks.push({
        id: result.insertId,
        code: framework.code,
      });
      console.log(`   ✅ تم إدخال: ${framework.nameAr} (${framework.code})`);
    }

    console.log(`\n✅ تم إدخال ${insertedFrameworks.length} إطار تنظيمي بنجاح\n`);

    // 2. إدخال ضوابط PDPL
    console.log('🔒 إدخال ضوابط نظام حماية البيانات الشخصية (PDPL)...');
    
    // البحث عن ID إطار PDPL
    const pdplFramework = insertedFrameworks.find(f => f.code === 'PDPL');
    
    if (pdplFramework) {
      let controlCount = 0;
      for (const control of pdplControls) {
        await db.insert(controls).values({
          ...control,
          frameworkId: pdplFramework.id,
        });
        controlCount++;
        console.log(`   ✅ تم إدخال: ${control.titleAr} (${control.code})`);
      }
      console.log(`\n✅ تم إدخال ${controlCount} ضابط من PDPL بنجاح\n`);
    } else {
      console.error('❌ خطأ: لم يتم العثور على إطار PDPL');
    }

    // 3. إحصائيات نهائية
    console.log('\n📊 إحصائيات البيانات المُدخلة:');
    console.log('═══════════════════════════════════════');
    console.log(`   الأطر التنظيمية: ${insertedFrameworks.length}`);
    console.log(`   الضوابط (PDPL): ${pdplControls.length}`);
    console.log(`   الإجمالي: ${insertedFrameworks.length + pdplControls.length} سجل`);
    console.log('═══════════════════════════════════════\n');

    console.log('✨ تم إكمال إدخال البيانات الأولية بنجاح!\n');

  } catch (error) {
    console.error('\n❌ حدث خطأ أثناء إدخال البيانات:');
    console.error(error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

main();
