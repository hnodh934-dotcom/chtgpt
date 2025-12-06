import { drizzle } from 'drizzle-orm/mysql2';

const db = drizzle(process.env.DATABASE_URL);

async function addIndexes() {
  try {
    console.log('🔧 إضافة indexes لتحسين الأداء...');
    
    // إضافة indexes لجدول controls
    await db.execute(`CREATE INDEX IF NOT EXISTS category_idx ON controls(category)`);
    console.log('✅ category_idx');
    
    await db.execute(`CREATE INDEX IF NOT EXISTS framework_category_idx ON controls(frameworkId, category)`);
    console.log('✅ framework_category_idx');
    
    await db.execute(`CREATE INDEX IF NOT EXISTS priority_idx ON controls(priority)`);
    console.log('✅ priority_idx');
    
    // إضافة indexes لجدول assessments
    await db.execute(`CREATE INDEX IF NOT EXISTS org_status_idx ON assessments(organizationId, status)`);
    console.log('✅ org_status_idx');
    
    await db.execute(`CREATE INDEX IF NOT EXISTS framework_status_idx ON assessments(frameworkId, status)`);
    console.log('✅ framework_status_idx');
    
    await db.execute(`CREATE INDEX IF NOT EXISTS due_date_idx ON assessments(dueDate)`);
    console.log('✅ due_date_idx');
    
    console.log('\n🎉 تم إضافة جميع indexes بنجاح!');
  } catch (error) {
    console.error('❌ خطأ:', error.message);
    process.exit(1);
  }
  process.exit(0);
}

addIndexes();
