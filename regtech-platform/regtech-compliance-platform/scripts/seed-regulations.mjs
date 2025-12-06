import { drizzle } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { frameworks, articles, controls } from '../drizzle/schema.js';

const db = drizzle(process.env.DATABASE_URL);

/**
 * ============================================================================
 * بيانات الأطر التنظيمية السبعة
 * ============================================================================
 */

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

/**
 * ============================================================================
 * مواد نظام حماية البيانات الشخصية (PDPL)
 * ============================================================================
 */

const pdplArticles = [
  {
    code: 'ART-01',
    name: 'المادة الأولى: التعريفات',
    nameEn: 'Article 1: Definitions',
    text: 'يُقصد بالألفاظ والعبارات الآتية -أينما وردت في النظام- المعاني المبينة أمام كل منها، ما لم يقتض السياق خلاف ذلك...',
    textEn: 'The following terms and expressions, wherever they appear in the Law, shall have the meanings assigned thereto...',
    interpretation: 'تحدد هذه المادة المصطلحات الأساسية المستخدمة في النظام',
    interpretationEn: 'This article defines the basic terms used in the Law',
    category: 'تعريفات',
    order: 1,
  },
  {
    code: 'ART-02',
    name: 'المادة الثانية: نطاق التطبيق',
    nameEn: 'Article 2: Scope of Application',
    text: 'تسري أحكام النظام على جمع البيانات الشخصية أو معالجتها كليًّا أو جزئيًّا بوسائل آلية أو غير آلية...',
    textEn: 'The provisions of the Law shall apply to the collection or processing of personal data...',
    interpretation: 'تحدد هذه المادة نطاق تطبيق النظام على جميع عمليات معالجة البيانات',
    interpretationEn: 'This article defines the scope of application to all data processing operations',
    category: 'نطاق التطبيق',
    order: 2,
  },
  {
    code: 'ART-03',
    name: 'المادة الثالثة: الاستثناءات',
    nameEn: 'Article 3: Exceptions',
    text: 'لا تسري أحكام النظام على معالجة البيانات الشخصية في الأحوال الآتية: 1) إذا كانت المعالجة لأغراض شخصية أو عائلية محضة...',
    textEn: 'The provisions of the Law shall not apply to the processing of personal data in the following cases...',
    interpretation: 'تحدد هذه المادة الحالات المستثناة من تطبيق النظام',
    interpretationEn: 'This article specifies cases exempt from the application of the Law',
    category: 'استثناءات',
    order: 3,
  },
  {
    code: 'ART-04',
    name: 'المادة الرابعة: حقوق صاحب البيانات',
    nameEn: 'Article 4: Data Subject Rights',
    text: 'لصاحب البيانات الشخصية الحقوق الآتية: 1) الحق في معرفة البيانات الشخصية التي جرى جمعها عنه...',
    textEn: 'The data subject shall have the following rights: 1) The right to know what personal data has been collected...',
    interpretation: 'تمنح هذه المادة صاحب البيانات حقوقاً أساسية في الوصول والتصحيح والحذف',
    interpretationEn: 'This article grants the data subject fundamental rights of access, rectification and erasure',
    category: 'حقوق',
    order: 4,
  },
  {
    code: 'ART-05',
    name: 'المادة الخامسة: قيود على حقوق صاحب البيانات',
    nameEn: 'Article 5: Restrictions on Data Subject Rights',
    text: 'يجوز تقييد حقوق صاحب البيانات الشخصية المنصوص عليها في المادة (الرابعة) من النظام في الأحوال الآتية...',
    textEn: 'The rights of the data subject stipulated in Article (4) may be restricted in the following cases...',
    interpretation: 'تحدد هذه المادة الحالات التي يجوز فيها تقييد حقوق صاحب البيانات لأسباب أمنية أو قانونية',
    interpretationEn: 'This article specifies cases where data subject rights may be restricted for security or legal reasons',
    category: 'قيود',
    order: 5,
  },
];

/**
 * ============================================================================
 * ضوابط الأمن السيبراني الأساسية (ECC) - عينة
 * ============================================================================
 */

const eccControls = [
  {
    code: 'ECC-1-1',
    name: 'إدارة الأصول',
    nameEn: 'Asset Management',
    description: 'يجب على الجهة تحديد وتصنيف جميع الأصول المعلوماتية والتقنية',
    descriptionEn: 'The entity must identify and classify all information and technical assets',
    category: 'إدارة الأصول',
    priority: 'critical',
    implementationGuidance: 'إنشاء سجل شامل لجميع الأصول مع تصنيفها حسب الأهمية والحساسية',
    implementationGuidanceEn: 'Create a comprehensive register of all assets with classification by importance and sensitivity',
    evidenceRequirements: 'سجل الأصول، سياسة التصنيف، تقارير المراجعة الدورية',
    evidenceRequirementsEn: 'Asset register, classification policy, periodic audit reports',
    isRequired: true,
    order: 1,
  },
  {
    code: 'ECC-1-2',
    name: 'ملكية الأصول',
    nameEn: 'Asset Ownership',
    description: 'يجب تحديد مالك لكل أصل معلوماتي أو تقني',
    descriptionEn: 'An owner must be assigned to each information or technical asset',
    category: 'إدارة الأصول',
    priority: 'high',
    implementationGuidance: 'تعيين مسؤول عن كل أصل وتوثيق المسؤوليات',
    implementationGuidanceEn: 'Assign a responsible person for each asset and document responsibilities',
    evidenceRequirements: 'مصفوفة المسؤوليات، توقيعات المالكين',
    evidenceRequirementsEn: 'Responsibility matrix, owner signatures',
    isRequired: true,
    order: 2,
  },
  {
    code: 'ECC-2-1',
    name: 'التحكم في الوصول',
    nameEn: 'Access Control',
    description: 'يجب تطبيق سياسة للتحكم في الوصول إلى الأنظمة والبيانات',
    descriptionEn: 'An access control policy must be implemented for systems and data',
    category: 'التحكم في الوصول',
    priority: 'critical',
    implementationGuidance: 'تطبيق مبدأ الصلاحيات الأدنى (Least Privilege) والمصادقة متعددة العوامل',
    implementationGuidanceEn: 'Implement least privilege principle and multi-factor authentication',
    evidenceRequirements: 'سياسة التحكم في الوصول، سجلات الوصول، تقارير المراجعة',
    evidenceRequirementsEn: 'Access control policy, access logs, audit reports',
    isRequired: true,
    order: 3,
  },
  {
    code: 'ECC-2-2',
    name: 'إدارة الهويات',
    nameEn: 'Identity Management',
    description: 'يجب إدارة هويات المستخدمين بشكل آمن',
    descriptionEn: 'User identities must be managed securely',
    category: 'التحكم في الوصول',
    priority: 'critical',
    implementationGuidance: 'استخدام نظام مركزي لإدارة الهويات مع مراجعة دورية للصلاحيات',
    implementationGuidanceEn: 'Use centralized identity management system with periodic access reviews',
    evidenceRequirements: 'نظام إدارة الهويات، سجلات المراجعة، تقارير الصلاحيات',
    evidenceRequirementsEn: 'Identity management system, review logs, access reports',
    isRequired: true,
    order: 4,
  },
  {
    code: 'ECC-3-1',
    name: 'حماية البيانات',
    nameEn: 'Data Protection',
    description: 'يجب حماية البيانات الحساسة أثناء التخزين والنقل',
    descriptionEn: 'Sensitive data must be protected during storage and transmission',
    category: 'حماية البيانات',
    priority: 'critical',
    implementationGuidance: 'استخدام التشفير القوي للبيانات الحساسة وتطبيق آليات النسخ الاحتياطي',
    implementationGuidanceEn: 'Use strong encryption for sensitive data and implement backup mechanisms',
    evidenceRequirements: 'سياسة التشفير، شهادات التشفير، تقارير النسخ الاحتياطي',
    evidenceRequirementsEn: 'Encryption policy, encryption certificates, backup reports',
    isRequired: true,
    order: 5,
  },
];

/**
 * ============================================================================
 * تنفيذ عملية الملء
 * ============================================================================
 */

async function seedRegulations() {
  try {
    console.log('🚀 بدء ملء قاعدة البيانات...');
    
    // 1. إدراج الأطر التنظيمية
    console.log('📋 إدراج الأطر التنظيمية...');
    const insertedFrameworks = await db.insert(frameworks).values(frameworksData);
    console.log(`✅ تم إدراج ${frameworksData.length} إطار تنظيمي`);
    
    // 2. الحصول على IDs للأطر المدرجة
    const pdplFramework = await db.select().from(frameworks).where(eq(frameworks.code, 'PDPL')).limit(1);
    const eccFramework = await db.select().from(frameworks).where(eq(frameworks.code, 'ECC')).limit(1);
    
    if (pdplFramework.length === 0 || eccFramework.length === 0) {
      throw new Error('فشل في الحصول على معرفات الأطر التنظيمية');
    }
    
    // 3. إدراج مواد PDPL
    console.log('📄 إدراج مواد نظام حماية البيانات الشخصية...');
    const pdplArticlesWithFramework = pdplArticles.map(article => ({
      ...article,
      frameworkId: pdplFramework[0].id,
    }));
    await db.insert(articles).values(pdplArticlesWithFramework);
    console.log(`✅ تم إدراج ${pdplArticles.length} مادة لنظام PDPL`);
    
    // 4. إدراج ضوابط ECC
    console.log('🔒 إدراج ضوابط الأمن السيبراني...');
    const eccControlsWithFramework = eccControls.map(control => ({
      ...control,
      frameworkId: eccFramework[0].id,
    }));
    await db.insert(controls).values(eccControlsWithFramework);
    console.log(`✅ تم إدراج ${eccControls.length} ضابط للأمن السيبراني`);
    
    console.log('🎉 اكتملت عملية ملء قاعدة البيانات بنجاح!');
    
  } catch (error) {
    console.error('❌ خطأ في ملء قاعدة البيانات:', error);
    throw error;
  }
}

// تنفيذ السكريبت
seedRegulations()
  .then(() => {
    console.log('✅ تم الانتهاء بنجاح');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ فشلت العملية:', error);
    process.exit(1);
  });
