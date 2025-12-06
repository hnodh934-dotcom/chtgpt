/**
 * بيانات عينة تشغيلية للنظام الهرمي الرباعي الطبقات
 * 
 * العينة تحتوي على:
 * - 2 أطر تنظيمية (PDPL + نظام المدفوعات)
 * - 3 ضوابط
 * - 5 مواد
 * - 2 أحكام
 * - 10 علاقات (edges)
 */

import type { Framework, Control, Article, Provision, Edge, RelationType } from './types/layered-system';

/**
 * الأطر التنظيمية (Frameworks)
 */
export const frameworks: Framework[] = [
  {
    id: 'fw-pdpl',
    version: '1.0.0',
    kind: 'framework',
    name: 'نظام حماية البيانات الشخصية (PDPL)',
    description: 'إطار حماية البيانات',
    regulator: 'سدايا',
    sector: 'عام',
    effectiveDate: '2022-09-01',
    jurisdiction: 'المملكة العربية السعودية',
    externalUrl: 'https://sdaia.gov.sa/ar/SDAIA/about/Documents/PDPL.pdf',
    tags: ['حماية البيانات', 'الخصوصية', 'GDPR'],
  },
  {
    id: 'fw-pay',
    version: '1.0.0',
    kind: 'framework',
    name: 'نظام المدفوعات وخدماتها',
    description: 'تنظيم مزودي خدمات المدفوعات',
    regulator: 'البنك المركزي السعودي',
    sector: 'مدفوعات',
    effectiveDate: '2022-08-16',
    jurisdiction: 'المملكة العربية السعودية',
    externalUrl: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/...',
    tags: ['مدفوعات', 'خدمات مالية', 'ساما'],
  },
];

/**
 * الضوابط (Controls)
 */
export const controls: Control[] = [
  {
    id: 'ctl-consent',
    version: '1.0.0',
    kind: 'control',
    name: 'إدارة الموافقات',
    description: 'الحصول على موافقات صريحة وقابلة للإثبات',
    regulator: 'سدايا',
    sector: 'عام',
    frameworkId: 'fw-pdpl',
    category: 'حماية البيانات',
    priority: 'high',
    implementationGuidance: 'يجب الحصول على موافقة صريحة من صاحب البيانات قبل معالجة بياناته الشخصية، مع توثيق الموافقة وإمكانية سحبها في أي وقت.',
  },
  {
    id: 'ctl-retention',
    version: '1.0.0',
    kind: 'control',
    name: 'سياسات الاحتفاظ',
    description: 'تقييد مدد الاحتفاظ بالبيانات',
    regulator: 'سدايا',
    sector: 'عام',
    frameworkId: 'fw-pdpl',
    category: 'حماية البيانات',
    priority: 'high',
    implementationGuidance: 'يجب تحديد مدة الاحتفاظ بالبيانات الشخصية بناءً على الغرض من المعالجة، وحذف البيانات عند انتهاء الحاجة إليها.',
  },
  {
    id: 'ctl-safeguard',
    version: '1.0.0',
    kind: 'control',
    name: 'حماية أموال العملاء',
    description: 'فصل أموال العملاء وحمايتها',
    regulator: 'ساما',
    sector: 'مدفوعات',
    frameworkId: 'fw-pay',
    category: 'الحماية المالية',
    priority: 'high',
    implementationGuidance: 'يجب فصل أموال العملاء عن الأموال التشغيلية للشركة، وحفظها في حسابات منفصلة لدى بنوك مرخصة.',
  },
];

/**
 * المواد (Articles)
 */
export const articles: Article[] = [
  {
    id: 'art-pdpl-1',
    version: '1.0.0',
    kind: 'article',
    name: 'الشرعية والشفافية',
    description: 'معالجة مشروعة وشفافة',
    regulator: 'سدايا',
    sector: 'عام',
    controlId: 'ctl-consent',
    articleNo: 'م 3',
    legalText: 'يجب أن تكون معالجة البيانات الشخصية مشروعة وعادلة وشفافة بالنسبة لصاحب البيانات.',
    references: ['PDPL المادة 3', 'اللائحة التنفيذية الفصل الثاني'],
  },
  {
    id: 'art-pdpl-2',
    version: '1.0.0',
    kind: 'article',
    name: 'تقييد الاحتفاظ',
    description: 'عدم الاحتفاظ أطول من اللازم',
    regulator: 'سدايا',
    sector: 'عام',
    controlId: 'ctl-retention',
    articleNo: 'م 12',
    legalText: 'لا يجوز الاحتفاظ بالبيانات الشخصية لمدة أطول من اللازم لتحقيق الأغراض التي جُمعت من أجلها.',
    references: ['PDPL المادة 12', 'اللائحة التنفيذية الفصل الرابع'],
  },
  {
    id: 'art-pdpl-3',
    version: '1.0.0',
    kind: 'article',
    name: 'حقوق الوصول',
    description: 'حق الاطلاع والتصحيح',
    regulator: 'سدايا',
    sector: 'عام',
    controlId: 'ctl-consent',
    articleNo: 'م 8',
    legalText: 'لصاحب البيانات الحق في الوصول إلى بياناته الشخصية والحصول على نسخة منها، وطلب تصحيحها أو حذفها.',
    references: ['PDPL المادة 8', 'اللائحة التنفيذية الفصل الثالث'],
  },
  {
    id: 'art-pay-1',
    version: '1.0.0',
    kind: 'article',
    name: 'حماية أموال العملاء',
    description: 'حسابات منفصلة',
    regulator: 'ساما',
    sector: 'مدفوعات',
    controlId: 'ctl-safeguard',
    articleNo: 'م 15',
    legalText: 'يجب على مزود خدمة الدفع الاحتفاظ بأموال العملاء في حسابات منفصلة عن حساباته الخاصة.',
    references: ['نظام المدفوعات المادة 15', 'التعليمات الرقابية 2024'],
  },
  {
    id: 'art-pay-2',
    version: '1.0.0',
    kind: 'article',
    name: 'الإفصاح والشفافية',
    description: 'إفصاح كامل عن الرسوم',
    regulator: 'ساما',
    sector: 'مدفوعات',
    controlId: 'ctl-safeguard',
    articleNo: 'م 17',
    legalText: 'يجب على مزود خدمة الدفع الإفصاح بشكل واضح وشفاف عن جميع الرسوم والعمولات المرتبطة بالخدمة.',
    references: ['نظام المدفوعات المادة 17', 'دليل الإفصاح 2023'],
  },
];

/**
 * الأحكام (Provisions)
 */
export const provisions: Provision[] = [
  {
    id: 'prov-001',
    version: '1.0.0',
    kind: 'provision',
    name: 'حكم: تقييد الاحتفاظ',
    description: 'تأكيد مبدأ التقييد زمنياً',
    regulator: 'سدايا',
    sector: 'عام',
    articleId: 'art-pdpl-2',
    citation: 'س.إ.ع 1445/...',
    court: 'اللجنة الاستئنافية لحماية البيانات',
    date: '2024-03-15',
    summary: 'أكدت اللجنة أن الاحتفاظ بالبيانات لأغراض تسويقية بعد انتهاء العلاقة التعاقدية يعد مخالفاً للمادة 12 من نظام حماية البيانات الشخصية.',
  },
  {
    id: 'prov-002',
    version: '1.0.0',
    kind: 'provision',
    name: 'مبدأ: فصل أموال العملاء',
    description: 'تأكيد الفصل وعدم الاستخدام التشغيلي',
    regulator: 'ساما',
    sector: 'مدفوعات',
    articleId: 'art-pay-1',
    citation: 'تعليمات رقابية 2024',
    court: 'البنك المركزي السعودي',
    date: '2024-01-10',
    summary: 'أصدر البنك المركزي تعليمات رقابية تؤكد على ضرورة فصل أموال العملاء بشكل كامل، وعدم استخدامها في العمليات التشغيلية للشركة تحت أي ظرف.',
  },
];

/**
 * دالة مساعدة لإنشاء علاقة (Edge)
 */
const asRel = (fromId: string, toId: string, relation: RelationType): Edge => ({
  id: `${fromId}->${toId}`,
  fromId,
  toId,
  relation,
  createdAt: new Date().toISOString(),
  createdBy: 'system',
});

/**
 * العلاقات (Edges) بين العقد
 */
export const edges: Edge[] = [
  // Framework → Control
  asRel('fw-pdpl', 'ctl-consent', 'يفسّر'),
  asRel('fw-pdpl', 'ctl-retention', 'يفسّر'),
  asRel('fw-pay', 'ctl-safeguard', 'يفسّر'),
  
  // Control → Article
  asRel('ctl-consent', 'art-pdpl-1', 'يستند إلى'),
  asRel('ctl-consent', 'art-pdpl-3', 'يستند إلى'),
  asRel('ctl-retention', 'art-pdpl-2', 'يستند إلى'),
  asRel('ctl-safeguard', 'art-pay-1', 'يستند إلى'),
  asRel('ctl-safeguard', 'art-pay-2', 'يحيل إلى'),
  
  // Article → Provision
  asRel('art-pdpl-2', 'prov-001', 'يقيّد'),
  asRel('art-pay-1', 'prov-002', 'يستند إلى'),
];
