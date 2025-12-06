import { drizzle } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { frameworks, articles, controls } from '../drizzle/schema.js';
import { readFileSync } from 'fs';

const db = drizzle(process.env.DATABASE_URL);

/**
 * ============================================================================
 * Seed Script الكامل - جميع الأطر التنظيمية
 * ============================================================================
 */

async function seedComplete() {
  try {
    console.log('🚀 بدء ملء قاعدة البيانات الكامل...\n');
    
    // 1. حذف البيانات القديمة
    console.log('🗑️  حذف البيانات القديمة...');
    await db.delete(controls);
    await db.delete(articles);
    await db.delete(frameworks);
    console.log('✅ تم حذف البيانات القديمة\n');
    
    // 2. إدراج الأطر التنظيمية السبعة
    console.log('📋 إدراج الأطر التنظيمية...');
    const frameworksData = [
      {
        code: 'PDPL',
        name: 'نظام حماية البيانات الشخصية',
        nameEn: 'Personal Data Protection Law',
        description: 'نظام يهدف إلى حماية البيانات الشخصية للأفراد وتنظيم عمليات جمعها ومعالجتها',
        descriptionEn: 'A law aimed at protecting personal data of individuals and regulating its collection and processing',
        authority: 'هيئة حماية البيانات الشخصية',
        authorityEn: 'Saudi Data & AI Authority (SDAIA)',
        sector: 'عام',
        category: 'law',
        effectiveDate: new Date('2023-09-14'),
        version: '1.0',
        status: 'active',
        officialUrl: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/b7cfae89-828e-4994-b167-adaa00e37188/1',
        documentUrl: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/b7cfae89-828e-4994-b167-adaa00e37188/1',
        priority: 'critical',
        isPublic: true,
      },
      {
        code: 'ECC',
        name: 'الضوابط الأساسية للأمن السيبراني',
        nameEn: 'Essential Cybersecurity Controls',
        description: 'ضوابط أساسية لتعزيز الأمن السيبراني على المستوى الوطني وحماية الأصول المعلوماتية',
        descriptionEn: 'Essential controls to enhance cybersecurity at the national level and protect information assets',
        authority: 'الهيئة الوطنية للأمن السيبراني',
        authorityEn: 'National Cybersecurity Authority (NCA)',
        sector: 'تقني',
        category: 'standard',
        effectiveDate: new Date('2024-01-01'),
        version: '2.0',
        status: 'active',
        officialUrl: 'https://nca.gov.sa/pages/ecc.html',
        documentUrl: 'https://cdn.nca.gov.sa/api/files/public/upload/29a9e86a-595f-4af9-8db5-88715a458a14%5FECC-2-2024---NCA.pdf',
        priority: 'critical',
        isPublic: true,
      },
      {
        code: 'SAMA_CYBER',
        name: 'ضوابط الأمن السيبراني للقطاع المالي',
        nameEn: 'Cybersecurity Framework for Financial Sector',
        description: 'إطار شامل للأمن السيبراني للمؤسسات المالية الخاضعة لإشراف البنك المركزي السعودي',
        descriptionEn: 'Comprehensive cybersecurity framework for financial institutions supervised by SAMA',
        authority: 'البنك المركزي السعودي',
        authorityEn: 'Saudi Central Bank (SAMA)',
        sector: 'مالي',
        category: 'regulation',
        effectiveDate: new Date('2022-01-01'),
        version: '1.0',
        status: 'active',
        officialUrl: 'https://www.sama.gov.sa',
        priority: 'critical',
        isPublic: true,
      },
      {
        code: 'CITC_DATA',
        name: 'لوائح حماية البيانات والخصوصية - هيئة الاتصالات',
        nameEn: 'Data Protection and Privacy Regulations - CITC',
        description: 'لوائح تنظم حماية البيانات والخصوصية في قطاع الاتصالات وتقنية المعلومات',
        descriptionEn: 'Regulations governing data protection and privacy in telecommunications and IT sector',
        authority: 'هيئة الاتصالات والفضاء والتقنية',
        authorityEn: 'Communications, Space & Technology Commission (CST)',
        sector: 'اتصالات',
        category: 'regulation',
        effectiveDate: new Date('2021-01-01'),
        version: '1.0',
        status: 'active',
        officialUrl: 'https://www.cst.gov.sa',
        priority: 'high',
        isPublic: true,
      },
      {
        code: 'SFDA_DATA',
        name: 'لوائح حماية البيانات الصحية',
        nameEn: 'Health Data Protection Regulations',
        description: 'لوائح تنظم حماية البيانات الصحية والطبية في المنشآت الصحية',
        descriptionEn: 'Regulations governing protection of health and medical data in healthcare facilities',
        authority: 'الهيئة العامة للغذاء والدواء',
        authorityEn: 'Saudi Food and Drug Authority (SFDA)',
        sector: 'صحي',
        category: 'regulation',
        effectiveDate: new Date('2020-01-01'),
        version: '1.0',
        status: 'active',
        officialUrl: 'https://www.sfda.gov.sa',
        priority: 'high',
        isPublic: true,
      },
      {
        code: 'COMPANIES_LAW',
        name: 'نظام الشركات',
        nameEn: 'Companies Law',
        description: 'نظام ينظم تأسيس الشركات وإدارتها وحوكمتها في المملكة',
        descriptionEn: 'Law regulating the establishment, management and governance of companies in the Kingdom',
        authority: 'وزارة التجارة',
        authorityEn: 'Ministry of Commerce',
        sector: 'تجاري',
        category: 'law',
        effectiveDate: new Date('2023-01-19'),
        version: '1.0',
        status: 'active',
        officialUrl: 'https://laws.boe.gov.sa',
        priority: 'high',
        isPublic: true,
      },
      {
        code: 'AML_CFT',
        name: 'نظام مكافحة غسل الأموال وتمويل الإرهاب',
        nameEn: 'Anti-Money Laundering and Counter-Terrorism Financing Law',
        description: 'نظام يهدف إلى مكافحة غسل الأموال وتمويل الإرهاب',
        descriptionEn: 'Law aimed at combating money laundering and terrorism financing',
        authority: 'الهيئة العامة لمكافحة الفساد',
        authorityEn: 'Oversight and Anti-Corruption Authority (Nazaha)',
        sector: 'مالي',
        category: 'law',
        effectiveDate: new Date('2022-01-01'),
        version: '1.0',
        status: 'active',
        officialUrl: 'https://laws.boe.gov.sa',
        priority: 'critical',
        isPublic: true,
      },
    ];
    
    await db.insert(frameworks).values(frameworksData);
    console.log(`✅ تم إدراج ${frameworksData.length} إطار تنظيمي\n`);
    
    // 3. الحصول على IDs للأطر
    const pdplFramework = await db.select().from(frameworks).where(eq(frameworks.code, 'PDPL')).limit(1);
    const eccFramework = await db.select().from(frameworks).where(eq(frameworks.code, 'ECC')).limit(1);
    
    if (pdplFramework.length === 0 || eccFramework.length === 0) {
      throw new Error('فشل في الحصول على معرفات الأطر التنظيمية');
    }
    
    // 4. إدراج مواد PDPL (43 مادة)
    console.log('📄 إدراج مواد نظام حماية البيانات الشخصية...');
    const pdplArticlesData = JSON.parse(readFileSync('/home/ubuntu/pdpl-seed-articles.json', 'utf-8'));
    const pdplArticlesWithFramework = pdplArticlesData.map(article => ({
      ...article,
      frameworkId: pdplFramework[0].id,
    }));
    await db.insert(articles).values(pdplArticlesWithFramework);
    console.log(`✅ تم إدراج ${pdplArticlesData.length} مادة لنظام PDPL\n`);
    
    // 5. إدراج ضوابط ECC (215 ضابط)
    console.log('🔒 إدراج ضوابط الأمن السيبراني...');
    const eccControlsData = JSON.parse(readFileSync('/home/ubuntu/ecc-seed-controls.json', 'utf-8'));
    const eccControlsWithFramework = eccControlsData.map(control => ({
      ...control,
      frameworkId: eccFramework[0].id,
    }));
    await db.insert(controls).values(eccControlsWithFramework);
    console.log(`✅ تم إدراج ${eccControlsData.length} ضابط للأمن السيبراني\n`);
    
    console.log('🎉 اكتملت عملية ملء قاعدة البيانات بنجاح!');
    console.log('\n📊 الإحصائيات النهائية:');
    console.log(`   - الأطر التنظيمية: ${frameworksData.length}`);
    console.log(`   - مواد PDPL: ${pdplArticlesData.length}`);
    console.log(`   - ضوابط ECC: ${eccControlsData.length}`);
    console.log(`   - الإجمالي: ${frameworksData.length + pdplArticlesData.length + eccControlsData.length} سجل`);
    
  } catch (error) {
    console.error('❌ خطأ في ملء قاعدة البيانات:', error);
    throw error;
  }
}

// تنفيذ السكريبت
seedComplete()
  .then(() => {
    console.log('\n✅ تم الانتهاء بنجاح');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ فشلت العملية:', error);
    process.exit(1);
  });
