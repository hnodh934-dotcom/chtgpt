/**
 * Seed script للأطر التنظيمية السعودية السبعة
 */

import { drizzle } from "drizzle-orm/mysql2";
import { frameworks, controls, articles, edges } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function seedRegulatoryFrameworks() {
  console.log("🌱 Starting regulatory frameworks seed...\n");

  // ===== 1. PDPL =====
  console.log("📋 Seeding PDPL...");
  const [pdpl] = await db.insert(frameworks).values({
    code: "fw-pdpl",
    name: "نظام حماية البيانات الشخصية",
    nameEn: "Personal Data Protection Law (PDPL)",
    description: "نظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم (م/19) بتاريخ 9/2/1443هـ",
    authority: "الهيئة السعودية للبيانات والذكاء الاصطناعي",
    authorityEn: "Saudi Authority for Data & AI (SDAIA)",
    category: "law",
    effectiveDate: new Date("2023-09-14"),
    officialUrl: "https://sdaia.gov.sa/ar/PDPL/Pages/default.aspx",
    status: "active",
  }).$returningId();

  const pdplControls = await db.insert(controls).values([
    {
      frameworkId: pdpl.id,
      code: "PDPL-1",
      name: "الحصول على موافقة صاحب البيانات",
      nameEn: "Obtaining Data Subject Consent",
      description: "يجب الحصول على موافقة صريحة من صاحب البيانات قبل جمع أو معالجة بياناته الشخصية",
      category: "consent",
      priority: "high",
    },
    {
      frameworkId: pdpl.id,
      code: "PDPL-2",
      name: "إشعار الخصوصية",
      nameEn: "Privacy Notice",
      description: "توفير إشعار خصوصية واضح ومفصل لأصحاب البيانات",
      category: "transparency",
      priority: "high",
    },
    {
      frameworkId: pdpl.id,
      code: "PDPL-3",
      name: "حقوق أصحاب البيانات",
      nameEn: "Data Subject Rights",
      description: "ضمان حقوق أصحاب البيانات في الوصول والتصحيح والحذف",
      category: "rights",
      priority: "high",
    },
    {
      frameworkId: pdpl.id,
      code: "PDPL-4",
      name: "أمن البيانات",
      nameEn: "Data Security",
      description: "تطبيق تدابير أمنية تقنية وتنظيمية لحماية البيانات الشخصية",
      category: "security",
      priority: "critical",
    },
    {
      frameworkId: pdpl.id,
      code: "PDPL-5",
      name: "الإبلاغ عن الانتهاكات",
      nameEn: "Breach Notification",
      description: "الإبلاغ عن انتهاكات البيانات للهيئة وأصحاب البيانات المتأثرين",
      category: "incident",
      priority: "critical",
    },
  ]).$returningId();

  const pdplArticles = await db.insert(articles).values([
    {
      frameworkId: pdpl.id,
      articleNumber: "6",
      title: "المادة السادسة - شروط معالجة البيانات",
      content: "لا يجوز معالجة البيانات الشخصية إلا بعد الحصول على موافقة صاحب البيانات الشخصية",
      status: "active",
    },
    {
      frameworkId: pdpl.id,
      articleNumber: "12",
      title: "المادة الثانية عشرة - الإشعار",
      content: "على المتحكم أو المعالج إشعار صاحب البيانات الشخصية بطريقة واضحة ومفهومة",
      status: "active",
    },
  ]).$returningId();

  await db.insert(edges).values([
    { fromType: "control", fromId: pdplControls[0].id, toType: "article", toId: pdplArticles[0].id, relationType: "implements" },
    { fromType: "control", fromId: pdplControls[1].id, toType: "article", toId: pdplArticles[1].id, relationType: "implements" },
  ]);

  console.log(`✅ PDPL: ${pdplControls.length} controls, ${pdplArticles.length} articles\n`);

  // ===== 2. ECC =====
  console.log("📋 Seeding ECC...");
  const [ecc] = await db.insert(frameworks).values({
    code: "fw-ecc",
    name: "الضوابط الأساسية للأمن السيبراني",
    nameEn: "Essential Cybersecurity Controls (ECC)",
    description: "الضوابط الأساسية للأمن السيبراني الصادرة عن الهيئة الوطنية للأمن السيبراني",
    authority: "الهيئة الوطنية للأمن السيبراني",
    authorityEn: "National Cybersecurity Authority (NCA)",
    category: "standard",
    effectiveDate: new Date("2019-05-18"),
    officialUrl: "https://nca.gov.sa/pages/ecc.html",
    status: "active",
  }).$returningId();

  const eccControls = await db.insert(controls).values([
    {
      frameworkId: ecc.id,
      code: "ECC-1-1",
      name: "إدارة الأصول",
      nameEn: "Asset Management",
      description: "تحديد وتصنيف جميع الأصول المعلوماتية في المنظمة",
      category: "asset_management",
      priority: "high",
    },
    {
      frameworkId: ecc.id,
      code: "ECC-2-1",
      name: "التحكم في الوصول",
      nameEn: "Access Control",
      description: "تطبيق سياسات التحكم في الوصول للأنظمة والبيانات",
      category: "access_control",
      priority: "critical",
    },
    {
      frameworkId: ecc.id,
      code: "ECC-3-1",
      name: "إدارة الثغرات",
      nameEn: "Vulnerability Management",
      description: "اكتشاف ومعالجة الثغرات الأمنية بشكل دوري",
      category: "vulnerability",
      priority: "high",
    },
    {
      frameworkId: ecc.id,
      code: "ECC-4-1",
      name: "الاستجابة للحوادث",
      nameEn: "Incident Response",
      description: "وضع خطة للاستجابة للحوادث السيبرانية",
      category: "incident",
      priority: "critical",
    },
    {
      frameworkId: ecc.id,
      code: "ECC-5-1",
      name: "النسخ الاحتياطي",
      nameEn: "Backup",
      description: "إجراء نسخ احتياطي دوري للبيانات الحرجة",
      category: "backup",
      priority: "high",
    },
  ]).$returningId();

  console.log(`✅ ECC: ${eccControls.length} controls\n`);

  // ===== 3. AML/CFT =====
  console.log("📋 Seeding AML/CFT...");
  const [aml] = await db.insert(frameworks).values({
    code: "fw-aml",
    name: "قواعد مكافحة غسل الأموال وتمويل الإرهاب",
    nameEn: "Anti-Money Laundering & Counter-Terrorism Financing Rules",
    description: "قواعد مكافحة غسل الأموال وتمويل الإرهاب الصادرة عن البنك المركزي السعودي",
    authority: "البنك المركزي السعودي",
    authorityEn: "Saudi Central Bank (SAMA)",
    category: "regulation",
    effectiveDate: new Date("2019-12-01"),
    officialUrl: "https://www.sama.gov.sa/ar-sa/Laws/Pages/BankingRulesAndRegulations.aspx",
    status: "active",
  }).$returningId();

  const amlControls = await db.insert(controls).values([
    {
      frameworkId: aml.id,
      code: "AML-1",
      name: "التحقق من هوية العميل (KYC)",
      nameEn: "Know Your Customer (KYC)",
      description: "التحقق من هوية العملاء قبل إنشاء علاقة عمل",
      category: "kyc",
      priority: "critical",
    },
    {
      frameworkId: aml.id,
      code: "AML-2",
      name: "مراقبة المعاملات",
      nameEn: "Transaction Monitoring",
      description: "مراقبة المعاملات المشبوهة والإبلاغ عنها",
      category: "monitoring",
      priority: "critical",
    },
    {
      frameworkId: aml.id,
      code: "AML-3",
      name: "العناية المعززة",
      nameEn: "Enhanced Due Diligence",
      description: "تطبيق إجراءات عناية معززة للعملاء عاليي المخاطر",
      category: "due_diligence",
      priority: "high",
    },
  ]).$returningId();

  console.log(`✅ AML/CFT: ${amlControls.length} controls\n`);

  // ===== 4. Payment Systems =====
  console.log("📋 Seeding Payment Systems Law...");
  const [payments] = await db.insert(frameworks).values({
    code: "fw-pay",
    name: "نظام المدفوعات وخدماتها",
    nameEn: "Payment Systems and Services Law",
    description: "نظام المدفوعات الصادر بالمرسوم الملكي رقم (م/18) بتاريخ 5/2/1443هـ",
    authority: "البنك المركزي السعودي",
    authorityEn: "Saudi Central Bank (SAMA)",
    category: "law",
    effectiveDate: new Date("2022-03-11"),
    officialUrl: "https://www.sama.gov.sa/ar-sa/Laws/Pages/PaymentSystemsLaw.aspx",
    status: "active",
  }).$returningId();

  const paymentsControls = await db.insert(controls).values([
    {
      frameworkId: payments.id,
      code: "PAY-1",
      name: "ترخيص مقدمي خدمات الدفع",
      nameEn: "Payment Service Provider Licensing",
      description: "الحصول على ترخيص من البنك المركزي لتقديم خدمات الدفع",
      category: "licensing",
      priority: "critical",
    },
    {
      frameworkId: payments.id,
      code: "PAY-2",
      name: "أمن عمليات الدفع",
      nameEn: "Payment Security",
      description: "تطبيق معايير أمنية لحماية عمليات الدفع",
      category: "security",
      priority: "critical",
    },
  ]).$returningId();

  console.log(`✅ Payment Systems: ${paymentsControls.length} controls\n`);

  // ===== 5. Fintech Lab =====
  console.log("📋 Seeding Fintech Lab Instructions...");
  const [fintech] = await db.insert(frameworks).values({
    code: "fw-fintech",
    name: "تعليمات مختبر التقنية المالية",
    nameEn: "Fintech Lab Instructions",
    description: "تعليمات مختبر التقنية المالية الصادرة عن البنك المركزي السعودي",
    authority: "البنك المركزي السعودي",
    authorityEn: "Saudi Central Bank (SAMA)",
    category: "guideline",
    effectiveDate: new Date("2018-02-01"),
    officialUrl: "https://www.sama.gov.sa/ar-sa/FinTech/Pages/FintechLab.aspx",
    status: "active",
  }).$returningId();

  const fintechControls = await db.insert(controls).values([
    {
      frameworkId: fintech.id,
      code: "FTL-1",
      name: "التقديم للمختبر",
      nameEn: "Lab Application",
      description: "تقديم طلب للانضمام إلى مختبر التقنية المالية",
      category: "application",
      priority: "high",
    },
    {
      frameworkId: fintech.id,
      code: "FTL-2",
      name: "الاختبار في بيئة محكومة",
      nameEn: "Controlled Testing",
      description: "اختبار الحلول التقنية في بيئة محكومة",
      category: "testing",
      priority: "medium",
    },
  ]).$returningId();

  console.log(`✅ Fintech Lab: ${fintechControls.length} controls\n`);

  // ===== 6. Crowdfunding =====
  console.log("📋 Seeding Crowdfunding Rules...");
  const [crowdfunding] = await db.insert(frameworks).values({
    code: "fw-crowd",
    name: "قواعد التمويل الجماعي بالدين",
    nameEn: "Debt-Based Crowdfunding Rules",
    description: "قواعد التمويل الجماعي الصادرة عن هيئة السوق المالية",
    authority: "هيئة السوق المالية",
    authorityEn: "Capital Market Authority (CMA)",
    category: "regulation",
    effectiveDate: new Date("2020-10-01"),
    officialUrl: "https://cma.org.sa/RulesRegulations/Regulations/Pages/default.aspx",
    status: "active",
  }).$returningId();

  const crowdfundingControls = await db.insert(controls).values([
    {
      frameworkId: crowdfunding.id,
      code: "CRD-1",
      name: "ترخيص منصة التمويل الجماعي",
      nameEn: "Crowdfunding Platform Licensing",
      description: "الحصول على ترخيص من هيئة السوق المالية",
      category: "licensing",
      priority: "critical",
    },
    {
      frameworkId: crowdfunding.id,
      code: "CRD-2",
      name: "الإفصاح للمستثمرين",
      nameEn: "Investor Disclosure",
      description: "توفير معلومات كافية للمستثمرين عن المشاريع",
      category: "disclosure",
      priority: "high",
    },
  ]).$returningId();

  console.log(`✅ Crowdfunding: ${crowdfundingControls.length} controls\n`);

  // ===== 7. Companies Law =====
  console.log("📋 Seeding Companies Law...");
  const [companies] = await db.insert(frameworks).values({
    code: "fw-companies",
    name: "نظام الشركات",
    nameEn: "Companies Law",
    description: "نظام الشركات الصادر بالمرسوم الملكي رقم (م/132) بتاريخ 1/12/1443هـ",
    authority: "وزارة التجارة",
    authorityEn: "Ministry of Commerce",
    category: "law",
    effectiveDate: new Date("2023-01-19"),
    officialUrl: "https://mc.gov.sa/ar/regulations/Pages/CompaniesLaw.aspx",
    status: "active",
  }).$returningId();

  const companiesControls = await db.insert(controls).values([
    {
      frameworkId: companies.id,
      code: "COM-1",
      name: "تأسيس الشركة",
      nameEn: "Company Incorporation",
      description: "استيفاء متطلبات تأسيس الشركة وفقاً للنظام",
      category: "incorporation",
      priority: "critical",
    },
    {
      frameworkId: companies.id,
      code: "COM-2",
      name: "حوكمة الشركات",
      nameEn: "Corporate Governance",
      description: "تطبيق قواعد حوكمة الشركات",
      category: "governance",
      priority: "high",
    },
  ]).$returningId();

  console.log(`✅ Companies Law: ${companiesControls.length} controls\n`);

  // ===== Summary =====
  const totalControls = pdplControls.length + eccControls.length + amlControls.length + 
                        paymentsControls.length + fintechControls.length + 
                        crowdfundingControls.length + companiesControls.length;
  
  console.log("=" .repeat(50));
  console.log("✅ Regulatory frameworks seed completed!\n");
  console.log("📊 Summary:");
  console.log(`   - 7 Frameworks`);
  console.log(`   - ${totalControls} Controls`);
  console.log(`   - ${pdplArticles.length} Articles`);
  console.log("=" .repeat(50));
}

seedRegulatoryFrameworks()
  .then(() => {
    console.log("\n✅ Seed completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Seed failed:", error);
    process.exit(1);
  });
