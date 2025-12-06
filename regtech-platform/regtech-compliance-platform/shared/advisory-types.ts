import { z } from "zod";

/**
 * ============================================================================
 * Advisory Mode Types - أنواع وضع التوصيات الاستشارية
 * ============================================================================
 * 
 * هذا الملف يحتوي على جميع الأنواع المتعلقة بوضع التوصيات الاستشارية
 * حيث يتم الفصل الصريح بين "التوصية" و"القرار"
 */

/**
 * مخطط التحقق من مدخلات التحليل
 */
export const AnalyzeInputSchema = z.object({
  docId: z.string().uuid("معرف الوثيقة يجب أن يكون UUID صحيح"),
  frameworkId: z.string().min(2, "معرف الإطار التنظيمي مطلوب"),
  frameworkName: z.string().min(2, "اسم الإطار التنظيمي مطلوب"),
  documentText: z.string().min(50, "نص الوثيقة يجب أن يكون 50 حرف على الأقل"),
});

export type AnalyzeInput = z.infer<typeof AnalyzeInputSchema>;

/**
 * سجل قاعدة القواعد
 */
export type RuleRecord = {
  controlCode: string;          // مثل "PDPL-1"
  controlText: string;           // النص الحرفي للضابط
  controlName: string;           // اسم الضابط
  controlDescription: string;    // وصف الضابط
  controlCategory: string;       // فئة الضابط
  controlPriority: string;       // أولوية الضابط
  articleCode: string;           // مثل "PDPL-ART-6"
  articleText: string;           // النص الحرفي للمادة
  articleName: string;           // اسم المادة
  implementationGuidance?: string;  // إرشادات التنفيذ
  requiredEvidence?: string;        // الأدلة المطلوبة
};

/**
 * دليل من الوثيقة
 */
export type Evidence = {
  quote: string;      // الاقتباس الحرفي
  page?: number;      // رقم الصفحة (اختياري)
  offset?: number;    // الموقع في النص (اختياري)
};

/**
 * مستوى المخاطرة
 */
export type RiskLevel = "low" | "medium" | "high";

/**
 * فجوة امتثال
 */
export type Gap = {
  gapId: string;                    // معرف فريد للفجوة
  summary: string;                  // ملخص الفجوة
  evidence: Evidence;               // دليل من الوثيقة
  controlCode: string;              // رمز الضابط
  controlText: string;              // النص الحرفي للضابط
  controlName: string;              // اسم الضابط
  controlDescription: string;       // وصف الضابط
  articleCode: string;              // رمز المادة
  articleText: string;              // النص الحرفي للمادة
  articleName: string;              // اسم المادة
  implementationGuidance: string;   // إرشادات تنفيذ عملية
  requiredEvidence: string;         // ما يجب توفيره لإثبات الامتثال
  riskLevel: RiskLevel;             // مستوى المخاطرة
};

/**
 * نتيجة التحليل (التوصية الاستشارية)
 */
export type AnalyzeOutput = {
  kind: "advisory";                 // نوع النتيجة (دائماً "advisory")
  frameworkId: string;              // معرف الإطار التنظيمي
  frameworkName: string;            // اسم الإطار التنظيمي
  gaps: Gap[];                      // فجوات الامتثال
  complianceFindings: string[];     // نتائج الامتثال الإيجابية
  complianceScore?: number;         // درجة الامتثال (0-100)
  generatedAt: string;              // تاريخ التوليد (ISO 8601)
  auditRef: string;                 // معرف سجل التدقيق
  advisoryNotice: string;           // التنويه القانوني
};

/**
 * التنويه القانوني الثابت
 */
export const ADVISORY_NOTICE = `تم إنشاء هذه التوصية بناءً على مدخلات المستخدم ومعايير النظام التحليلية، ولا تُعد مستنداً رسمياً أو قراراً مُلزِماً. القرار النهائي مسؤولية المستخدم.`;

/**
 * حدث في سجل التدقيق
 */
export type AuditEvent = {
  auditRef: string;              // معرف سجل التدقيق
  step: string;                  // خطوة التنفيذ
  userId?: number;               // معرف المستخدم
  timestamp: Date;               // الطابع الزمني
  data?: Record<string, any>;    // بيانات إضافية
  error?: string;                // رسالة خطأ (إن وجدت)
};

/**
 * طلب اعتماد توصية
 */
export const AdoptRecommendationSchema = z.object({
  auditRef: z.string().uuid("معرف سجل التدقيق يجب أن يكون UUID صحيح"),
  acceptsLiability: z.boolean().refine(val => val === true, {
    message: "يجب الموافقة على تحمل المسؤولية النهائية",
  }),
});

export type AdoptRecommendationInput = z.infer<typeof AdoptRecommendationSchema>;

/**
 * نتيجة اعتماد التوصية
 */
export type AdoptRecommendationOutput = {
  success: boolean;
  message: string;
  adoptedAt: string;
  auditRef: string;
};
