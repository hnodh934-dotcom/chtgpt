/**
 * سكريبت البيانات الأولية للأطر التنظيمية السعودية
 * Saudi Regulatory Frameworks Seed Data Script
 */

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../drizzle/schema.ts';

const frameworksData = [
  {
    code: 'PDPL',
    name: 'Personal Data Protection Law',
    nameAr: 'نظام حماية البيانات الشخصية',
    description: 'The Personal Data Protection Law (PDPL) regulates the processing of personal data in Saudi Arabia, ensuring the protection of individuals\' privacy and personal information.',
    descriptionAr: 'نظام حماية البيانات الشخصية ينظم معالجة البيانات الشخصية في المملكة العربية السعودية، ويضمن حماية خصوصية الأفراد ومعلوماتهم الشخصية.',
    issuingAuthority: 'Saudi Data & AI Authority (SDAIA)',
    issuingAuthorityAr: 'الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)',
    effectiveDate: new Date('2023-03-14'),
    version: '1.0',
    applicableSectors: JSON.stringify(['financial_services', 'technology', 'healthcare', 'retail', 'government', 'education']),
    mandatory: true,
    relatedFrameworks: JSON.stringify([]),
    documentUrl: 'https://sdaia.gov.sa/ar/PDPL/Pages/default.aspx',
    officialWebsite: 'https://sdaia.gov.sa',
    status: 'active',
    displayOrder: 1,
  },
  {
    code: 'ECC',
    name: 'Essential Cybersecurity Controls',
    nameAr: 'الضوابط الأساسية للأمن السيبراني',
    description: 'The Essential Cybersecurity Controls (ECC) framework consists of 114 controls designed to protect critical infrastructure and sensitive information from cyber threats.',
    descriptionAr: 'إطار الضوابط الأساسية للأمن السيبراني يتكون من 114 ضابطاً مصممة لحماية البنية التحتية الحرجة والمعلومات الحساسة من التهديدات السيبرانية.',
    issuingAuthority: 'National Cybersecurity Authority (NCA)',
    issuingAuthorityAr: 'الهيئة الوطنية للأمن السيبراني',
    effectiveDate: new Date('2018-01-01'),
    version: '2.0',
    applicableSectors: JSON.stringify(['financial_services', 'technology', 'healthcare', 'government']),
    mandatory: true,
    relatedFrameworks: JSON.stringify([]),
    documentUrl: 'https://nca.gov.sa/pages/ecc.html',
    officialWebsite: 'https://nca.gov.sa',
    status: 'active',
    displayOrder: 2,
  },
  {
    code: 'AML_CFT',
    name: 'Anti-Money Laundering and Counter-Terrorism Financing',
    nameAr: 'نظام مكافحة غسل الأموال وتمويل الإرهاب',
    description: 'The AML/CFT framework imposes strict obligations on financial institutions and designated non-financial businesses to prevent money laundering and terrorism financing.',
    descriptionAr: 'إطار مكافحة غسل الأموال وتمويل الإرهاب يفرض التزامات صارمة على المؤسسات المالية والأعمال والمهن غير المالية المحددة لمنع غسل الأموال وتمويل الإرهاب.',
    issuingAuthority: 'Saudi Central Bank (SAMA)',
    issuingAuthorityAr: 'البنك المركزي السعودي (ساما)',
    effectiveDate: new Date('2017-11-05'),
    version: '1.0',
    applicableSectors: JSON.stringify(['financial_services']),
    mandatory: true,
    relatedFrameworks: JSON.stringify([]),
    documentUrl: 'https://www.sama.gov.sa/en-US/Laws/Pages/BankingRulesLaws.aspx',
    officialWebsite: 'https://www.sama.gov.sa',
    status: 'active',
    displayOrder: 3,
  },
  {
    code: 'PSL',
    name: 'Payment Services Law',
    nameAr: 'نظام المدفوعات وخدماتها',
    description: 'The Payment Services Law regulates payment services in Saudi Arabia, ensuring the stability of the financial system and protecting payment service users.',
    descriptionAr: 'نظام المدفوعات وخدماتها ينظم خدمات المدفوعات في المملكة العربية السعودية، ويضمن استقرار النظام المالي وحماية مستخدمي خدمات المدفوعات.',
    issuingAuthority: 'Saudi Central Bank (SAMA)',
    issuingAuthorityAr: 'البنك المركزي السعودي (ساما)',
    effectiveDate: new Date('2019-04-16'),
    version: '1.0',
    applicableSectors: JSON.stringify(['financial_services']),
    mandatory: true,
    relatedFrameworks: JSON.stringify([]),
    documentUrl: 'https://www.sama.gov.sa/en-US/Laws/Pages/PaymentSystemsLaw.aspx',
    officialWebsite: 'https://www.sama.gov.sa',
    status: 'active',
    displayOrder: 4,
  },
  {
    code: 'FINTECH_SANDBOX',
    name: 'Fintech Sandbox Instructions',
    nameAr: 'تعليمات مختبر التقنية المالية',
    description: 'The Fintech Sandbox provides a controlled environment for testing innovative financial services under regulatory supervision.',
    descriptionAr: 'مختبر التقنية المالية يوفر بيئة محكومة لاختبار الخدمات المالية المبتكرة تحت الإشراف التنظيمي.',
    issuingAuthority: 'Capital Market Authority (CMA)',
    issuingAuthorityAr: 'هيئة السوق المالية',
    effectiveDate: new Date('2018-06-01'),
    version: '1.0',
    applicableSectors: JSON.stringify(['financial_services', 'technology']),
    mandatory: false,
    relatedFrameworks: JSON.stringify([]),
    documentUrl: 'https://cma.org.sa/en/RulesRegulations/Regulations/Pages/default.aspx',
    officialWebsite: 'https://cma.org.sa',
    status: 'active',
    displayOrder: 5,
  },
  {
    code: 'CROWDFUNDING',
    name: 'Debt Crowdfunding Rules',
    nameAr: 'قواعد التمويل الجماعي بالدين',
    description: 'The Debt Crowdfunding Rules regulate crowdfunding platforms that facilitate debt-based financing.',
    descriptionAr: 'قواعد التمويل الجماعي بالدين تنظم منصات التمويل الجماعي التي تسهل التمويل القائم على الدين.',
    issuingAuthority: 'Capital Market Authority (CMA)',
    issuingAuthorityAr: 'هيئة السوق المالية',
    effectiveDate: new Date('2019-01-01'),
    version: '1.0',
    applicableSectors: JSON.stringify(['financial_services']),
    mandatory: true,
    relatedFrameworks: JSON.stringify([]),
    documentUrl: 'https://cma.org.sa/en/RulesRegulations/Regulations/Pages/default.aspx',
    officialWebsite: 'https://cma.org.sa',
    status: 'active',
    displayOrder: 6,
  },
  {
    code: 'COMPANIES_LAW',
    name: 'Companies Law',
    nameAr: 'نظام الشركات',
    description: 'The Companies Law regulates the establishment and management of companies in Saudi Arabia.',
    descriptionAr: 'نظام الشركات ينظم تأسيس وإدارة الشركات في المملكة العربية السعودية.',
    issuingAuthority: 'Ministry of Commerce',
    issuingAuthorityAr: 'وزارة التجارة',
    effectiveDate: new Date('2023-01-19'),
    version: '2.0',
    applicableSectors: JSON.stringify(['financial_services', 'technology', 'healthcare', 'retail', 'education', 'other']),
    mandatory: true,
    relatedFrameworks: JSON.stringify([]),
    documentUrl: 'https://mc.gov.sa/en/regulations/Pages/default.aspx',
    officialWebsite: 'https://mc.gov.sa',
    status: 'active',
    displayOrder: 7,
  },
];

const pdplControlsData = [
  {
    code: 'PDPL-1.1',
    title: 'Lawfulness and Transparency',
    titleAr: 'الشرعية والشفافية',
    description: 'Personal data must be processed lawfully and transparently, with the data subject being informed.',
    descriptionAr: 'يجب معالجة البيانات الشخصية بطرق مشروعة وشفافة مع إعلام صاحب البيانات.',
    category: 'Data Processing Principles',
    categoryAr: 'مبادئ معالجة البيانات',
    priority: 'critical',
    implementationGuidance: 'Establish clear data processing policies and provide privacy notices to data subjects.',
    implementationGuidanceAr: 'وضع سياسات واضحة لمعالجة البيانات وتقديم إشعارات الخصوصية لأصحاب البيانات.',
    evidenceRequirements: JSON.stringify(['Privacy Policy', 'Privacy Notices', 'Consent Forms']),
    testingProcedures: JSON.stringify(['Review privacy policy', 'Verify consent mechanisms', 'Check transparency of data processing']),
    tags: JSON.stringify(['privacy', 'transparency', 'lawfulness']),
    displayOrder: 1,
  },
  {
    code: 'PDPL-1.2',
    title: 'Purpose Limitation',
    titleAr: 'تحديد الغرض',
    description: 'Personal data must be collected for specified, explicit, and legitimate purposes only.',
    descriptionAr: 'يجب جمع البيانات الشخصية لأغراض محددة وصريحة ومشروعة فقط.',
    category: 'Data Processing Principles',
    categoryAr: 'مبادئ معالجة البيانات',
    priority: 'critical',
    implementationGuidance: 'Document the specific purposes for data collection and ensure data is not used for incompatible purposes.',
    implementationGuidanceAr: 'توثيق الأغراض المحددة لجمع البيانات والتأكد من عدم استخدام البيانات لأغراض غير متوافقة.',
    evidenceRequirements: JSON.stringify(['Data Processing Register', 'Purpose Documentation']),
    testingProcedures: JSON.stringify(['Review data collection purposes', 'Verify purpose limitation controls']),
    tags: JSON.stringify(['purpose', 'limitation', 'data-collection']),
    displayOrder: 2,
  },
  {
    code: 'PDPL-1.3',
    title: 'Data Minimization',
    titleAr: 'التناسب',
    description: 'Only collect personal data that is necessary and proportionate to the stated purpose.',
    descriptionAr: 'جمع البيانات الشخصية الضرورية فقط والمتناسبة مع الغرض المحدد.',
    category: 'Data Processing Principles',
    categoryAr: 'مبادئ معالجة البيانات',
    priority: 'high',
    implementationGuidance: 'Implement data minimization controls and regularly review data collection practices.',
    implementationGuidanceAr: 'تطبيق ضوابط تقليل البيانات ومراجعة ممارسات جمع البيانات بانتظام.',
    evidenceRequirements: JSON.stringify(['Data Minimization Policy', 'Data Collection Forms']),
    testingProcedures: JSON.stringify(['Review data fields collected', 'Verify necessity of each data element']),
    tags: JSON.stringify(['minimization', 'proportionality']),
    displayOrder: 3,
  },
  {
    code: 'PDPL-1.4',
    title: 'Accuracy',
    titleAr: 'الدقة',
    description: 'Personal data must be accurate and kept up to date.',
    descriptionAr: 'يجب أن تكون البيانات الشخصية دقيقة ومحدثة.',
    category: 'Data Processing Principles',
    categoryAr: 'مبادئ معالجة البيانات',
    priority: 'high',
    implementationGuidance: 'Implement mechanisms to ensure data accuracy and allow data subjects to update their information.',
    implementationGuidanceAr: 'تطبيق آليات لضمان دقة البيانات والسماح لأصحاب البيانات بتحديث معلوماتهم.',
    evidenceRequirements: JSON.stringify(['Data Accuracy Procedures', 'Data Update Mechanisms']),
    testingProcedures: JSON.stringify(['Review data accuracy controls', 'Test data update functionality']),
    tags: JSON.stringify(['accuracy', 'data-quality']),
    displayOrder: 4,
  },
  {
    code: 'PDPL-1.5',
    title: 'Storage Limitation',
    titleAr: 'تقييد الاحتفاظ',
    description: 'Personal data must not be kept longer than necessary for the purpose.',
    descriptionAr: 'يجب عدم الاحتفاظ بالبيانات الشخصية لمدة أطول من اللازم للغرض.',
    category: 'Data Processing Principles',
    categoryAr: 'مبادئ معالجة البيانات',
    priority: 'high',
    implementationGuidance: 'Define data retention periods and implement automated deletion mechanisms.',
    implementationGuidanceAr: 'تحديد فترات الاحتفاظ بالبيانات وتطبيق آليات الحذف التلقائي.',
    evidenceRequirements: JSON.stringify(['Data Retention Policy', 'Deletion Procedures']),
    testingProcedures: JSON.stringify(['Review retention periods', 'Verify deletion mechanisms']),
    tags: JSON.stringify(['retention', 'deletion']),
    displayOrder: 5,
  },
];

async function main() {
  console.log('🚀 بدء إدخال البيانات الأولية...\n');

  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection, { schema, mode: 'default' });

  try {
    // 1. إدخال الأطر التنظيمية
    console.log('📋 إدخال الأطر التنظيمية...');
    const insertedFrameworks = [];
    
    for (const framework of frameworksData) {
      const [result] = await connection.execute(
        `INSERT INTO frameworks (code, name, nameAr, description, descriptionAr, issuingAuthority, issuingAuthorityAr, effectiveDate, version, applicableSectors, mandatory, relatedFrameworks, documentUrl, officialWebsite, status, displayOrder) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          framework.code,
          framework.name,
          framework.nameAr,
          framework.description,
          framework.descriptionAr,
          framework.issuingAuthority,
          framework.issuingAuthorityAr,
          framework.effectiveDate,
          framework.version,
          framework.applicableSectors,
          framework.mandatory,
          framework.relatedFrameworks,
          framework.documentUrl,
          framework.officialWebsite,
          framework.status,
          framework.displayOrder,
        ]
      );
      
      insertedFrameworks.push({
        id: result.insertId,
        code: framework.code,
      });
      console.log(`   ✅ تم إدخال: ${framework.nameAr} (${framework.code})`);
    }

    console.log(`\n✅ تم إدخال ${insertedFrameworks.length} إطار تنظيمي بنجاح\n`);

    // 2. إدخال ضوابط PDPL
    console.log('🔒 إدخال ضوابط نظام حماية البيانات الشخصية (PDPL)...');
    
    const pdplFramework = insertedFrameworks.find(f => f.code === 'PDPL');
    
    if (pdplFramework) {
      let controlCount = 0;
      for (const control of pdplControlsData) {
        await connection.execute(
          `INSERT INTO controls (frameworkId, code, title, titleAr, description, descriptionAr, category, categoryAr, priority, implementationGuidance, implementationGuidanceAr, evidenceRequirements, testingProcedures, tags, displayOrder) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            pdplFramework.id,
            control.code,
            control.title,
            control.titleAr,
            control.description,
            control.descriptionAr,
            control.category,
            control.categoryAr,
            control.priority,
            control.implementationGuidance,
            control.implementationGuidanceAr,
            control.evidenceRequirements,
            control.testingProcedures,
            control.tags,
            control.displayOrder,
          ]
        );
        controlCount++;
        console.log(`   ✅ تم إدخال: ${control.titleAr} (${control.code})`);
      }
      console.log(`\n✅ تم إدخال ${controlCount} ضابط من PDPL بنجاح\n`);
    }

    // 3. إحصائيات نهائية
    console.log('\n📊 إحصائيات البيانات المُدخلة:');
    console.log('═══════════════════════════════════════');
    console.log(`   الأطر التنظيمية: ${insertedFrameworks.length}`);
    console.log(`   الضوابط (PDPL): ${pdplControlsData.length}`);
    console.log(`   الإجمالي: ${insertedFrameworks.length + pdplControlsData.length} سجل`);
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
