import mysql from 'mysql2/promise';
import { URL } from 'url';

let config;
if (process.env.DATABASE_URL) {
  const url = new URL(process.env.DATABASE_URL);
  config = {
    host: url.hostname,
    port: url.port || 3306,
    user: url.username,
    password: url.password,
    database: url.pathname.substring(1),
    ssl: url.searchParams.get('ssl') ? JSON.parse(url.searchParams.get('ssl')) : false,
  };
} else {
  config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'regtech',
  };
}

async function seed() {
  const connection = await mysql.createConnection(config);

  try {
    console.log('🌱 بدء إضافة البيانات الأولية...\n');

    // 1. إضافة الأطر التنظيمية
    const frameworks = [
      {
        code: 'fw-pdpl',
        name: 'نظام حماية البيانات الشخصية',
        description: 'نظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم (م/19)',
        authority: 'الهيئة السعودية للبيانات والذكاء الاصطناعي',
        category: 'law',
        version: '1.0',
        status: 'active',
        priority: 'critical',
        officialUrl: 'https://sdaia.gov.sa/ar/PDPL/Pages/default.aspx',
      },
      {
        code: 'fw-ecc',
        name: 'نظام الأمن السيبراني',
        description: 'معايير الأمن السيبراني للبنية التحتية الحرجة',
        authority: 'الهيئة الوطنية للأمن السيبراني',
        category: 'regulation',
        version: '2.0',
        status: 'active',
        priority: 'high',
        officialUrl: 'https://www.ncsc.gov.sa',
      },
      {
        code: 'fw-sama',
        name: 'متطلبات SAMA للفينتك',
        description: 'متطلبات مؤسسة النقد العربي السعودي للشركات المالية التقنية',
        authority: 'مؤسسة النقد العربي السعودي',
        category: 'regulation',
        version: '3.0',
        status: 'active',
        priority: 'critical',
        officialUrl: 'https://www.sama.gov.sa',
      },
      {
        code: 'fw-cma',
        name: 'متطلبات هيئة السوق المالية',
        description: 'متطلبات هيئة السوق المالية للشركات المرخصة',
        authority: 'هيئة السوق المالية',
        category: 'regulation',
        version: '2.5',
        status: 'active',
        priority: 'high',
        officialUrl: 'https://www.cma.org.sa',
      },
      {
        code: 'fw-zatca',
        name: 'متطلبات الزكاة والدخل',
        description: 'متطلبات الزكاة والدخل للفاتورة الإلكترونية والضرائب',
        authority: 'الهيئة العامة للزكاة والدخل',
        category: 'regulation',
        version: '2.0',
        status: 'active',
        priority: 'high',
        officialUrl: 'https://www.zatca.gov.sa',
      },
    ];

    for (const fw of frameworks) {
      await connection.execute(
        'INSERT IGNORE INTO frameworks (code, name, description, authority, category, version, status, priority, officialUrl, isPublic, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, true, NOW(), NOW())',
        [fw.code, fw.name, fw.description, fw.authority, fw.category, fw.version, fw.status, fw.priority, fw.officialUrl]
      );
    }
    console.log('✅ تم إضافة 5 أطر تنظيمية\n');

    // 2. إضافة الضوابط
    const [fwRows] = await connection.execute('SELECT id, code FROM frameworks');
    const pdplId = fwRows.find(r => r.code === 'fw-pdpl')?.id;

    if (pdplId) {
      const controls = [
        {
          frameworkId: pdplId,
          code: 'PDPL-001',
          name: 'الموافقة على معالجة البيانات',
          description: 'الحصول على موافقة صريحة قبل معالجة البيانات الشخصية',
          category: 'Consent',
          priority: 'critical',
          status: 'active',
        },
        {
          frameworkId: pdplId,
          code: 'PDPL-002',
          name: 'حماية البيانات أثناء النقل',
          description: 'تشفير البيانات أثناء النقل عبر الشبكات',
          category: 'Security',
          priority: 'high',
          status: 'active',
        },
        {
          frameworkId: pdplId,
          code: 'PDPL-003',
          name: 'حقوق الأفراد',
          description: 'توفير آليات للأفراد للوصول إلى بياناتهم وحذفها',
          category: 'Rights',
          priority: 'high',
          status: 'active',
        },
        {
          frameworkId: pdplId,
          code: 'PDPL-004',
          name: 'تقييم الأثر على الخصوصية',
          description: 'إجراء تقييم شامل لأثر معالجة البيانات على الخصوصية',
          category: 'Assessment',
          priority: 'medium',
          status: 'active',
        },
        {
          frameworkId: pdplId,
          code: 'PDPL-005',
          name: 'الإخطار بالخروقات',
          description: 'إخطار السلطات والأفراد عند حدوث خرق أمني',
          category: 'Incident',
          priority: 'critical',
          status: 'active',
        },
      ];

      for (const control of controls) {
        await connection.execute(
          'INSERT IGNORE INTO controls (frameworkId, code, name, description, category, priority, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
          [control.frameworkId, control.code, control.name, control.description, control.category, control.priority, control.status]
        );
      }
      console.log('✅ تم إضافة 5 ضوابط\n');
    }

    // 3. إضافة المواد
    if (pdplId) {
      const articles = [
        {
          frameworkId: pdplId,
          articleNumber: 'المادة 1',
          title: 'التعاريف والمبادئ',
          content: 'تحدد هذه المادة المبادئ الأساسية لحماية البيانات الشخصية',
          status: 'active',
        },
        {
          frameworkId: pdplId,
          articleNumber: 'المادة 2',
          title: 'الحقوق والالتزامات',
          content: 'توضح حقوق الأفراد والتزامات معالجات البيانات',
          status: 'active',
        },
        {
          frameworkId: pdplId,
          articleNumber: 'المادة 3',
          title: 'الجزاءات والعقوبات',
          content: 'تحدد العقوبات على مخالفة أحكام النظام',
          status: 'active',
        },
        {
          frameworkId: pdplId,
          articleNumber: 'المادة 4',
          title: 'الاستثناءات',
          content: 'تحدد الحالات الاستثنائية من تطبيق أحكام النظام',
          status: 'active',
        },
        {
          frameworkId: pdplId,
          articleNumber: 'المادة 5',
          title: 'التطبيق والنفاذ',
          content: 'توضح كيفية تطبيق النظام والجهات المسؤولة',
          status: 'active',
        },
        {
          frameworkId: pdplId,
          articleNumber: 'المادة 6',
          title: 'التعديلات والتحديثات',
          content: 'تحدد آلية تعديل وتحديث أحكام النظام',
          status: 'active',
        },
      ];

      for (const article of articles) {
        await connection.execute(
          'INSERT IGNORE INTO articles (frameworkId, articleNumber, title, content, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
          [article.frameworkId, article.articleNumber, article.title, article.content, article.status]
        );
      }
      console.log('✅ تم إضافة 6 مواد\n');
    }

    console.log('🎉 تم إضافة جميع البيانات الأولية بنجاح!\n');
  } catch (error) {
    console.error('❌ خطأ:', error.message);
  } finally {
    await connection.end();
  }
}

seed();
