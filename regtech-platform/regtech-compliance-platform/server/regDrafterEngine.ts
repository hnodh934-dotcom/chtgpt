/**
 * RegDrafter Engine - المحرر التنظيمي الذكي
 * 
 * محرك ذكي لكتابة ومراجعة السياسات والإجراءات التنظيمية
 */

import { invokeLLM } from "./_core/llm";
import { buildStructuredRules, type StructuredRule } from "./ruleEngine";
import { createAuditRef, AnalysisAuditLogger } from "./auditHelper";

// ============================================================================
// Types
// ============================================================================

export interface PolicyTemplate {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  framework: string; // "PDPL" | "ECC" | "SAMA"
  sections: Array<{
    title: string;
    description: string;
    required: boolean;
  }>;
  estimatedLength: number; // كلمات
}

export interface DraftPolicyRequest {
  templateId?: string;
  policyType: string; // "privacy" | "security" | "outsourcing" | "custom"
  framework: string;
  companyName: string;
  industry?: string;
  customRequirements?: string;
  language?: "ar" | "en";
  userId?: string;
}

export interface DraftPolicyResponse {
  policyDocument: string; // Markdown
  sections: Array<{
    title: string;
    content: string;
    controlCodes: string[];
    articleCodes: string[];
  }>;
  metadata: {
    wordCount: number;
    estimatedReadTime: number; // minutes
    complianceScore: number; // 0-100
    framework: string;
  };
  auditRef: string;
  recommendations: string[];
}

export interface ReviewPolicyRequest {
  policyText: string;
  framework: string;
  language?: "ar" | "en";
  userId?: string;
}

export interface ReviewPolicyResponse {
  overallScore: number; // 0-100
  sections: Array<{
    title: string;
    score: number;
    issues: Array<{
      severity: "critical" | "high" | "medium" | "low";
      description: string;
      suggestion: string;
      controlCode?: string;
      articleCode?: string;
    }>;
  }>;
  missingElements: Array<{
    element: string;
    description: string;
    controlCode: string;
    articleCode: string;
  }>;
  recommendations: string[];
  auditRef: string;
}

// ============================================================================
// Templates
// ============================================================================

const POLICY_TEMPLATES: PolicyTemplate[] = [
  {
    id: "pdpl-privacy-policy",
    name: "سياسة الخصوصية (PDPL)",
    nameEn: "Privacy Policy (PDPL)",
    description: "سياسة خصوصية شاملة متوافقة مع نظام حماية البيانات الشخصية",
    framework: "PDPL",
    sections: [
      {
        title: "المقدمة والنطاق",
        description: "تعريف السياسة ونطاق تطبيقها",
        required: true,
      },
      {
        title: "أنواع البيانات المجمعة",
        description: "تفصيل البيانات الشخصية التي يتم جمعها",
        required: true,
      },
      {
        title: "أغراض المعالجة",
        description: "الأغراض المشروعة لمعالجة البيانات",
        required: true,
      },
      {
        title: "الأساس القانوني",
        description: "الأساس القانوني لكل نوع معالجة",
        required: true,
      },
      {
        title: "مشاركة البيانات",
        description: "حالات ومتطلبات مشاركة البيانات مع أطراف ثالثة",
        required: true,
      },
      {
        title: "حقوق صاحب البيانات",
        description: "حقوق الأفراد في الوصول والتصحيح والحذف",
        required: true,
      },
      {
        title: "أمن البيانات",
        description: "التدابير الأمنية لحماية البيانات",
        required: true,
      },
      {
        title: "الاحتفاظ والحذف",
        description: "مدة الاحتفاظ وإجراءات الحذف",
        required: true,
      },
      {
        title: "معلومات الاتصال",
        description: "معلومات مسؤول حماية البيانات",
        required: true,
      },
    ],
    estimatedLength: 2000,
  },
  {
    id: "ecc-security-policy",
    name: "سياسة الأمن السيبراني (ECC)",
    nameEn: "Cybersecurity Policy (ECC)",
    description: "سياسة أمن سيبراني شاملة متوافقة مع الضوابط الأساسية",
    framework: "ECC",
    sections: [
      {
        title: "الهدف والنطاق",
        description: "أهداف السياسة ونطاق تطبيقها",
        required: true,
      },
      {
        title: "الأدوار والمسؤوليات",
        description: "تحديد الأدوار الأمنية والمسؤوليات",
        required: true,
      },
      {
        title: "إدارة الوصول",
        description: "ضوابط الوصول والمصادقة",
        required: true,
      },
      {
        title: "حماية البيانات",
        description: "تشفير وحماية البيانات",
        required: true,
      },
      {
        title: "إدارة الحوادث",
        description: "إجراءات الاستجابة للحوادث الأمنية",
        required: true,
      },
      {
        title: "النسخ الاحتياطي والاستعادة",
        description: "إجراءات النسخ الاحتياطي واستمرارية الأعمال",
        required: true,
      },
      {
        title: "التدريب والتوعية",
        description: "برامج التوعية الأمنية",
        required: true,
      },
    ],
    estimatedLength: 1800,
  },
  {
    id: "sama-outsourcing-policy",
    name: "سياسة الاستعانة بمصادر خارجية (SAMA)",
    nameEn: "Outsourcing Policy (SAMA)",
    description: "سياسة استعانة خارجية متوافقة مع تعليمات ساما",
    framework: "SAMA",
    sections: [
      {
        title: "الهدف والنطاق",
        description: "أهداف السياسة ونطاق الاستعانة الخارجية",
        required: true,
      },
      {
        title: "الحوكمة والإشراف",
        description: "هيكل الحوكمة والرقابة",
        required: true,
      },
      {
        title: "تقييم المخاطر",
        description: "منهجية تقييم مخاطر الاستعانة الخارجية",
        required: true,
      },
      {
        title: "اختيار مقدمي الخدمات",
        description: "معايير وإجراءات الاختيار",
        required: true,
      },
      {
        title: "العقود والاتفاقيات",
        description: "المتطلبات التعاقدية الإلزامية",
        required: true,
      },
      {
        title: "المراقبة والتقييم",
        description: "آليات المراقبة المستمرة",
        required: true,
      },
      {
        title: "خطة الخروج",
        description: "إجراءات إنهاء العلاقة التعاقدية",
        required: true,
      },
    ],
    estimatedLength: 2200,
  },
  {
    id: "nca-incident-response-policy",
    name: "سياسة الاستجابة للحوادث (NCA)",
    nameEn: "Incident Response Policy (NCA)",
    description: "سياسة استجابة للحوادث السيبرانية متوافقة مع ضوابط NCA",
    framework: "NCA",
    sections: [
      {
        title: "الهدف والنطاق",
        description: "أهداف السياسة ونطاق تطبيقها",
        required: true,
      },
      {
        title: "فريق الاستجابة",
        description: "تشكيل ومسؤوليات فريق الاستجابة",
        required: true,
      },
      {
        title: "الكشف والتصنيف",
        description: "إجراءات الكشف وتصنيف الحوادث",
        required: true,
      },
      {
        title: "الاحتواء والقضاء",
        description: "خطوات احتواء وقضاء الحوادث",
        required: true,
      },
      {
        title: "الاستعادة",
        description: "إجراءات الاستعادة والعودة للعمليات",
        required: true,
      },
      {
        title: "التبليغ",
        description: "متطلبات التبليغ للهيئة الوطنية",
        required: true,
      },
      {
        title: "التحليل والتحسين",
        description: "تحليل ما بعد الحادث والتحسين المستمر",
        required: true,
      },
    ],
    estimatedLength: 1900,
  },
  {
    id: "citc-data-protection-policy",
    name: "سياسة حماية بيانات العملاء (CITC)",
    nameEn: "Customer Data Protection Policy (CITC)",
    description: "سياسة حماية بيانات العملاء لقطاع الاتصالات",
    framework: "CITC",
    sections: [
      {
        title: "المقدمة والنطاق",
        description: "تعريف السياسة ونطاق تطبيقها",
        required: true,
      },
      {
        title: "جمع البيانات",
        description: "أنواع وأغراض جمع بيانات العملاء",
        required: true,
      },
      {
        title: "الحماية والأمان",
        description: "التدابير الأمنية لحماية البيانات",
        required: true,
      },
      {
        title: "مشاركة البيانات",
        description: "ضوابط مشاركة البيانات مع أطراف ثالثة",
        required: true,
      },
      {
        title: "حقوق العملاء",
        description: "حقوق العملاء في الوصول والتعديل",
        required: true,
      },
      {
        title: "الاحتفاظ والحذف",
        description: "مدة الاحتفاظ وإجراءات الحذف",
        required: true,
      },
      {
        title: "التبليغ عن الاختراقات",
        description: "إجراءات التبليغ عن اختراقات البيانات",
        required: true,
      },
    ],
    estimatedLength: 1700,
  },
];

// ============================================================================
// RegDrafter Engine
// ============================================================================

export class RegDrafterEngine {
  private rules: StructuredRule[] = [];
  private initialized = false;

  /**
   * تهيئة المحرك
   */
  async initialize(frameworkId?: number): Promise<void> {
    if (this.initialized) return;

    console.log("[RegDrafter] Initializing engine...");

    try {
      const result = await buildStructuredRules(frameworkId || 1);
      this.rules = result.rules;
      this.initialized = true;
      console.log(`[RegDrafter] Initialized with ${this.rules.length} rules`);
    } catch (error) {
      console.error("[RegDrafter] Failed to initialize:", error);
      throw new Error("فشل تهيئة محرك RegDrafter");
    }
  }

  /**
   * الحصول على القوالب المتاحة
   */
  getTemplates(framework?: string): PolicyTemplate[] {
    if (framework) {
      return POLICY_TEMPLATES.filter((t) => t.framework === framework);
    }
    return POLICY_TEMPLATES;
  }

  /**
   * كتابة سياسة جديدة
   */
  async draftPolicy(
    request: DraftPolicyRequest
  ): Promise<DraftPolicyResponse> {
    if (!this.initialized) {
      await this.initialize();
    }

    const auditRef = createAuditRef();
    const language = request.language || "ar";

    // تسجيل في Audit Log
    AnalysisAuditLogger.logEvent({
      auditRef,
      event: "regdrafter_draft_policy",
      details: {
        policyType: request.policyType,
        framework: request.framework,
        language,
      },
    });

    try {
      // الحصول على القالب
      const template = request.templateId
        ? POLICY_TEMPLATES.find((t) => t.id === request.templateId)
        : POLICY_TEMPLATES.find(
            (t) =>
              t.framework === request.framework &&
              t.id.includes(request.policyType)
          );

      if (!template) {
        throw new Error("لم يتم العثور على قالب مناسب");
      }

      // جلب القواعد ذات الصلة
      const relevantRules = this.rules.filter(
        (r) => r.frameworkName === request.framework
      );

      const rulesContext = this.buildRulesContext(relevantRules, language);

      // بناء Prompt
      const prompt = this.buildDraftPrompt(
        template,
        request,
        rulesContext,
        language
      );

      // استدعاء LLM
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: prompt.system,
          },
          {
            role: "user",
            content: prompt.user,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "policy_draft",
            strict: true,
            schema: {
              type: "object",
              properties: {
                sections: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      content: { type: "string" },
                      controlCodes: {
                        type: "array",
                        items: { type: "string" },
                      },
                      articleCodes: {
                        type: "array",
                        items: { type: "string" },
                      },
                    },
                    required: [
                      "title",
                      "content",
                      "controlCodes",
                      "articleCodes",
                    ],
                    additionalProperties: false,
                  },
                },
                recommendations: {
                  type: "array",
                  items: { type: "string" },
                },
              },
              required: ["sections", "recommendations"],
              additionalProperties: false,
            },
          },
        },
      });

      const content = response.choices[0].message.content;
      const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
      const result = JSON.parse(contentStr || "{}");

      // التحقق من الاستشهادات
      for (const section of result.sections) {
        for (const controlCode of section.controlCodes) {
          const rule = this.rules.find((r) => r.controlCode === controlCode);
          if (!rule) {
            throw new Error(
              `تعذر التحقق من الضابط: ${controlCode} في قسم "${section.title}"`
            );
          }
        }
      }

      // بناء المستند الكامل
      const policyDocument = this.buildPolicyDocument(
        template,
        request,
        result.sections,
        language
      );

      // حساب الإحصائيات
      const wordCount = policyDocument.split(/\s+/).length;
      const estimatedReadTime = Math.ceil(wordCount / 200);

      // تسجيل النجاح
      AnalysisAuditLogger.logEvent({
        auditRef,
        event: "regdrafter_policy_drafted",
        details: {
          wordCount,
          sectionsCount: result.sections.length,
        },
      });

      return {
        policyDocument,
        sections: result.sections,
        metadata: {
          wordCount,
          estimatedReadTime,
          complianceScore: 95, // TODO: حساب فعلي
          framework: request.framework,
        },
        auditRef,
        recommendations: result.recommendations,
      };
    } catch (error) {
      // تسجيل الفشل
      AnalysisAuditLogger.logEvent({
        auditRef,
        event: "regdrafter_draft_error",
        details: {
          error: error instanceof Error ? error.message : String(error),
        },
      });

      throw error;
    }
  }

  /**
   * مراجعة سياسة موجودة
   */
  async reviewPolicy(
    request: ReviewPolicyRequest
  ): Promise<ReviewPolicyResponse> {
    if (!this.initialized) {
      await this.initialize();
    }

    const auditRef = createAuditRef();
    const language = request.language || "ar";

    // تسجيل في Audit Log
    AnalysisAuditLogger.logEvent({
      auditRef,
      event: "regdrafter_review_policy",
      details: {
        policyLength: request.policyText.length,
        framework: request.framework,
        language,
      },
    });

    try {
      // جلب القواعد ذات الصلة
      const relevantRules = this.rules.filter(
        (r) => r.frameworkName === request.framework
      );

      const rulesContext = this.buildRulesContext(relevantRules, language);

      // استدعاء LLM
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: this.buildReviewPrompt(rulesContext, language),
          },
          {
            role: "user",
            content: `قم بمراجعة السياسة التالية:\n\n${request.policyText}`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "policy_review",
            strict: true,
            schema: {
              type: "object",
              properties: {
                overallScore: { type: "number" },
                sections: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      score: { type: "number" },
                      issues: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            severity: {
                              type: "string",
                              enum: ["critical", "high", "medium", "low"],
                            },
                            description: { type: "string" },
                            suggestion: { type: "string" },
                            controlCode: { type: "string" },
                            articleCode: { type: "string" },
                          },
                          required: [
                            "severity",
                            "description",
                            "suggestion",
                          ],
                          additionalProperties: false,
                        },
                      },
                    },
                    required: ["title", "score", "issues"],
                    additionalProperties: false,
                  },
                },
                missingElements: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      element: { type: "string" },
                      description: { type: "string" },
                      controlCode: { type: "string" },
                      articleCode: { type: "string" },
                    },
                    required: [
                      "element",
                      "description",
                      "controlCode",
                      "articleCode",
                    ],
                    additionalProperties: false,
                  },
                },
                recommendations: {
                  type: "array",
                  items: { type: "string" },
                },
              },
              required: [
                "overallScore",
                "sections",
                "missingElements",
                "recommendations",
              ],
              additionalProperties: false,
            },
          },
        },
      });

      const content = response.choices[0].message.content;
      const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
      const result = JSON.parse(contentStr || "{}");

      // التحقق من الاستشهادات
      for (const missing of result.missingElements) {
        const rule = this.rules.find(
          (r) => r.controlCode === missing.controlCode
        );
        if (!rule) {
          throw new Error(
            `تعذر التحقق من العنصر المفقود: ${missing.element}`
          );
        }
      }

      // تسجيل النجاح
      AnalysisAuditLogger.logEvent({
        auditRef,
        event: "regdrafter_policy_reviewed",
        details: {
          overallScore: result.overallScore,
          sectionsCount: result.sections.length,
          missingCount: result.missingElements.length,
        },
      });

      return {
        ...result,
        auditRef,
      };
    } catch (error) {
      // تسجيل الفشل
      AnalysisAuditLogger.logEvent({
        auditRef,
        event: "regdrafter_review_error",
        details: {
          error: error instanceof Error ? error.message : String(error),
        },
      });

      throw error;
    }
  }

  // ========================================================================
  // Helper Methods
  // ========================================================================

  private buildRulesContext(
    rules: StructuredRule[],
    language: "ar" | "en"
  ): string {
    return rules
      .map((rule) => {
        const articles = rule.relatedArticles
          .map((a: any) => `  - ${a.articleCode}: ${a.articleText.substring(0, 150)}...`)
          .join("\n");

        return `
### ${rule.controlCode}
${rule.controlDescription}

المواد:
${articles}
`;
      })
      .join("\n---\n");
  }

  private buildDraftPrompt(
    template: PolicyTemplate,
    request: DraftPolicyRequest,
    rulesContext: string,
    language: "ar" | "en"
  ): { system: string; user: string } {
    const system = `أنت خبير في كتابة السياسات التنظيمية. مهمتك كتابة سياسة احترافية ومتوافقة مع المتطلبات التنظيمية.

**القواعد المتاحة:**
${rulesContext}

**تعليمات:**
1. اكتب كل قسم بشكل واضح ومفصل
2. استشهد برموز الضوابط والمواد ذات الصلة
3. استخدم لغة قانونية واضحة
4. تأكد من تغطية جميع المتطلبات الإلزامية
5. اجعل السياسة قابلة للتطبيق عملياً

**مهم:**
- لا تخترع ضوابط أو مواد غير موجودة
- كل قسم يجب أن يكون مربوطاً بالقواعد أعلاه
- اجعل المحتوى محدداً وقابلاً للقياس`;

    const user = `اكتب سياسة "${template.name}" لشركة "${request.companyName}".

**الأقسام المطلوبة:**
${template.sections.map((s) => `- ${s.title}: ${s.description}`).join("\n")}

${request.customRequirements ? `**متطلبات إضافية:**\n${request.customRequirements}` : ""}

${request.industry ? `**القطاع:** ${request.industry}` : ""}`;

    return { system, user };
  }

  private buildReviewPrompt(rulesContext: string, language: "ar" | "en"): string {
    return `أنت مراجع سياسات متخصص. مهمتك مراجعة السياسات والتأكد من توافقها مع المتطلبات التنظيمية.

**القواعد المتاحة:**
${rulesContext}

**تعليمات:**
1. راجع كل قسم في السياسة
2. حدد المشاكل والنواقص
3. قيّم مستوى التوافق (0-100)
4. حدد العناصر المفقودة
5. قدم توصيات عملية للتحسين

**معايير التقييم:**
- critical: نقص حرج يؤدي لعدم الامتثال
- high: نقص مهم يجب معالجته
- medium: نقص متوسط يحتاج تحسين
- low: تحسين مقترح

**مهم:**
- كن دقيقاً في تحديد رموز الضوابط والمواد
- ركز على النواقص الحقيقية والمؤثرة
- قدم اقتراحات عملية قابلة للتطبيق`;
  }

  private buildPolicyDocument(
    template: PolicyTemplate,
    request: DraftPolicyRequest,
    sections: DraftPolicyResponse["sections"],
    language: "ar" | "en"
  ): string {
    const header = `# ${template.name}

**الشركة:** ${request.companyName}  
**الإطار التنظيمي:** ${request.framework}  
**تاريخ الإصدار:** ${new Date().toLocaleDateString("ar-SA")}  
**الإصدار:** 1.0

---

`;

    const body = sections
      .map((section) => {
        const citations = section.controlCodes
          .map((code, idx) => `[${code}/${section.articleCodes[idx] || ""}]`)
          .join(", ");

        return `## ${section.title}

${section.content}

**المراجع:** ${citations}

---

`;
      })
      .join("\n");

    const footer = `## معلومات الاتصال

للاستفسارات حول هذه السياسة، يرجى التواصل مع:

- **مسؤول الامتثال:** [الاسم]
- **البريد الإلكتروني:** [البريد]
- **الهاتف:** [الهاتف]

---

*تم إنشاء هذه السياسة بواسطة RegDrafter - المحرر التنظيمي الذكي*
`;

    return header + body + footer;
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

let engineInstance: RegDrafterEngine | null = null;

export function getRegDrafterEngine(): RegDrafterEngine {
  if (!engineInstance) {
    engineInstance = new RegDrafterEngine();
  }
  return engineInstance;
}
