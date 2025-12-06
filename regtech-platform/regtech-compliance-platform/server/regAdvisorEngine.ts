/**
 * RegAdvisor Engine - المستشار التنظيمي الذكي
 * 
 * محرك chatbot متقدم مدعوم بالذكاء الاصطناعي يقدم استشارات فورية
 * حول الأطر التنظيمية (PDPL, ECC, SAMA)
 */

import { invokeLLM } from "./_core/llm";
import { buildStructuredRules, type StructuredRule } from "./ruleEngine";
import { createAuditRef, AnalysisAuditLogger } from "./auditHelper";

// ============================================================================
// Types
// ============================================================================

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export interface ChatContext {
  conversationId: string;
  messages: ChatMessage[];
  framework?: string; // "PDPL" | "ECC" | "SAMA" | "ALL"
  language?: "ar" | "en";
  userId?: string;
}

export interface AdvisoryResponse {
  answer: string;
  sources: Array<{
    controlCode: string;
    articleCode: string;
    articleText: string;
    frameworkName: string;
  }>;
  recommendations?: string[];
  relatedQuestions?: string[];
  auditRef: string;
  confidence: number; // 0-1
  language: "ar" | "en";
}

export interface DocumentAnalysisRequest {
  documentText: string;
  framework?: string;
  language?: "ar" | "en";
  userId?: string;
}

export interface DocumentAnalysisResponse {
  complianceScore: number; // 0-100
  gaps: Array<{
    title: string;
    description: string;
    severity: "critical" | "high" | "medium" | "low";
    controlCode: string;
    articleCode: string;
    recommendation: string;
  }>;
  summary: string;
  auditRef: string;
}

// ============================================================================
// RegAdvisor Engine
// ============================================================================

export class RegAdvisorEngine {
  private rules: StructuredRule[] = [];
  private initialized = false;

  /**
   * تهيئة المحرك - جلب القواعد من قاعدة البيانات
   */
  async initialize(frameworkId?: number): Promise<void> {
    if (this.initialized) return;

    console.log("[RegAdvisor] Initializing engine...");
    
    try {
      const result = await buildStructuredRules(frameworkId || 1);
      this.rules = result.rules;
      this.initialized = true;
      console.log(`[RegAdvisor] Initialized with ${this.rules.length} rules`);
    } catch (error) {
      console.error("[RegAdvisor] Failed to initialize:", error);
      throw new Error("فشل تهيئة محرك RegAdvisor");
    }
  }

  /**
   * الإجابة على سؤال المستخدم
   */
  async ask(
    question: string,
    context?: Partial<ChatContext>
  ): Promise<AdvisoryResponse> {
    if (!this.initialized) {
      await this.initialize();
    }

    const auditRef = createAuditRef();
    const language = context?.language || "ar";
    const conversationId = context?.conversationId || auditRef;

    // تسجيل في Audit Log
    AnalysisAuditLogger.logEvent({
      auditRef,
      event: "regadvisor_question",
      details: {
        question,
        conversationId,
        framework: context?.framework,
        language,
      },
    });

    try {
      // بناء السياق من القواعد
      const relevantRules = this.findRelevantRules(question);
      const rulesContext = this.buildRulesContext(relevantRules, language);

      // بناء الرسائل
      const messages: ChatMessage[] = [
        {
          role: "system",
          content: this.buildSystemPrompt(language, rulesContext),
        },
        ...(context?.messages || []),
        {
          role: "user",
          content: question,
        },
      ];

      // استدعاء LLM
      const response = await invokeLLM({
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "advisory_response",
            strict: true,
            schema: {
              type: "object",
              properties: {
                answer: {
                  type: "string",
                  description: "الإجابة الكاملة على السؤال",
                },
                controlCodes: {
                  type: "array",
                  items: { type: "string" },
                  description: "رموز الضوابط المرتبطة",
                },
                articleCodes: {
                  type: "array",
                  items: { type: "string" },
                  description: "رموز المواد المرتبطة",
                },
                recommendations: {
                  type: "array",
                  items: { type: "string" },
                  description: "التوصيات العملية",
                },
                relatedQuestions: {
                  type: "array",
                  items: { type: "string" },
                  description: "أسئلة ذات صلة",
                },
                confidence: {
                  type: "number",
                  description: "مستوى الثقة (0-1)",
                },
              },
              required: [
                "answer",
                "controlCodes",
                "articleCodes",
                "confidence",
              ],
              additionalProperties: false,
            },
          },
        },
      });

      const content = response.choices[0].message.content;
      const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
      const result = JSON.parse(contentStr || "{}");

      // استخراج المصادر
      const sources = this.extractSources(
        result.controlCodes || [],
        result.articleCodes || []
      );

      // التحقق من وجود مصادر
      if (sources.length === 0) {
        throw new Error(
          "تعذر العثور على مصادر موثقة للإجابة. يرجى إعادة صياغة السؤال."
        );
      }

      // تسجيل النجاح
      AnalysisAuditLogger.logEvent({
        auditRef,
        event: "regadvisor_answer",
        details: {
          sourcesCount: sources.length,
          confidence: result.confidence,
        },
      });

      return {
        answer: result.answer,
        sources,
        recommendations: result.recommendations,
        relatedQuestions: result.relatedQuestions,
        auditRef,
        confidence: result.confidence,
        language,
      };
    } catch (error) {
      // تسجيل الفشل
      AnalysisAuditLogger.logEvent({
        auditRef,
        event: "regadvisor_error",
        details: {
          error: error instanceof Error ? error.message : String(error),
        },
      });

      throw error;
    }
  }

  /**
   * تحليل مستند
   */
  async analyzeDocument(
    request: DocumentAnalysisRequest
  ): Promise<DocumentAnalysisResponse> {
    if (!this.initialized) {
      await this.initialize();
    }

    const auditRef = createAuditRef();
    const language = request.language || "ar";

    // تسجيل في Audit Log
    AnalysisAuditLogger.logEvent({
      auditRef,
      event: "regadvisor_document_analysis",
      details: {
        documentLength: request.documentText.length,
        framework: request.framework,
        language,
      },
    });

    try {
      // بناء السياق من القواعد
      const rulesContext = this.buildRulesContext(this.rules, language);

      // استدعاء LLM
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: this.buildDocumentAnalysisPrompt(language, rulesContext),
          },
          {
            role: "user",
            content: `قم بتحليل المستند التالي:\n\n${request.documentText}`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "document_analysis",
            strict: true,
            schema: {
              type: "object",
              properties: {
                complianceScore: {
                  type: "number",
                  description: "نسبة الامتثال (0-100)",
                },
                gaps: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" },
                      severity: {
                        type: "string",
                        enum: ["critical", "high", "medium", "low"],
                      },
                      controlCode: { type: "string" },
                      articleCode: { type: "string" },
                      recommendation: { type: "string" },
                    },
                    required: [
                      "title",
                      "description",
                      "severity",
                      "controlCode",
                      "articleCode",
                      "recommendation",
                    ],
                    additionalProperties: false,
                  },
                },
                summary: {
                  type: "string",
                  description: "ملخص التحليل",
                },
              },
              required: ["complianceScore", "gaps", "summary"],
              additionalProperties: false,
            },
          },
        },
      });

      const content = response.choices[0].message.content;
      const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
      const result = JSON.parse(contentStr || "{}");

      // التحقق من الفجوات
      for (const gap of result.gaps) {
        const rule = this.rules.find(
          (r) =>
            r.controlCode === gap.controlCode ||
            r.relatedArticles.some((a: any) => a.articleCode === gap.articleCode)
        );

        if (!rule) {
          throw new Error(
            `تعذر التحقق من الفجوة: ${gap.title} (${gap.controlCode})`
          );
        }
      }

      // تسجيل النجاح
      AnalysisAuditLogger.logEvent({
        auditRef,
        event: "regadvisor_document_analyzed",
        details: {
          complianceScore: result.complianceScore,
          gapsCount: result.gaps.length,
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
        event: "regadvisor_document_error",
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

  /**
   * البحث عن القواعد ذات الصلة بالسؤال
   */
  private findRelevantRules(question: string): StructuredRule[] {
    const keywords = question.toLowerCase().split(/\s+/);
    const scored = this.rules.map((rule) => {
      let score = 0;
      const ruleText = `${rule.controlDescription} ${rule.relatedArticles.map((a: any) => a.articleText).join(" ")}`.toLowerCase();

      for (const keyword of keywords) {
        if (ruleText.includes(keyword)) {
          score++;
        }
      }

      return { rule, score };
    });

    // ترتيب حسب النقاط وأخذ أعلى 10
    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((s) => s.rule);
  }

  /**
   * بناء سياق القواعد للـ LLM
   */
  private buildRulesContext(
    rules: StructuredRule[],
    language: "ar" | "en"
  ): string {
    return rules
      .map((rule) => {
        const articles = rule.relatedArticles
          .map(
            (a: any) =>
              `  - ${a.articleCode}: ${a.articleText.substring(0, 200)}${a.articleText.length > 200 ? "..." : ""}`
          )
          .join("\n");

        return `
### ${rule.controlCode} - ${rule.frameworkName}
${rule.controlDescription}

المواد:
${articles}
`;
      })
      .join("\n---\n");
  }

  /**
   * بناء System Prompt
   */
  private buildSystemPrompt(language: "ar" | "en", rulesContext: string): string {
    if (language === "ar") {
      return `أنت RegAdvisor، المستشار التنظيمي الذكي المتخصص في الأطر التنظيمية السعودية (PDPL, ECC, SAMA).

**دورك:**
- تقديم استشارات دقيقة وموثقة حول الامتثال التنظيمي
- الاستناد فقط إلى القواعد والمواد الموثقة أدناه
- عدم اختراع أو افتراض معلومات غير موجودة
- تقديم إجابات واضحة وعملية

**القواعد المتاحة:**
${rulesContext}

**تعليمات:**
1. اقرأ السؤال بعناية
2. ابحث في القواعد أعلاه عن المعلومات ذات الصلة
3. قدم إجابة دقيقة مع ذكر رموز الضوابط والمواد
4. أضف توصيات عملية إذا لزم الأمر
5. اقترح أسئلة ذات صلة لمساعدة المستخدم

**مهم:**
- إذا لم تجد معلومات كافية في القواعد، قل ذلك صراحة
- لا تخترع رموز ضوابط أو مواد غير موجودة
- كن واضحاً ومباشراً`;
    } else {
      return `You are RegAdvisor, an intelligent regulatory advisor specializing in Saudi regulatory frameworks (PDPL, ECC, SAMA).

**Your role:**
- Provide accurate and documented regulatory compliance advice
- Rely only on the documented rules and articles below
- Do not invent or assume information that doesn't exist
- Provide clear and actionable answers

**Available Rules:**
${rulesContext}

**Instructions:**
1. Read the question carefully
2. Search the rules above for relevant information
3. Provide an accurate answer citing control and article codes
4. Add practical recommendations if needed
5. Suggest related questions to help the user

**Important:**
- If you don't find sufficient information in the rules, say so explicitly
- Do not invent control or article codes that don't exist
- Be clear and direct`;
    }
  }

  /**
   * بناء Prompt لتحليل المستندات
   */
  private buildDocumentAnalysisPrompt(
    language: "ar" | "en",
    rulesContext: string
  ): string {
    if (language === "ar") {
      return `أنت محلل امتثال متخصص. مهمتك تحليل المستندات والسياسات ومقارنتها بالمتطلبات التنظيمية.

**القواعد المتاحة:**
${rulesContext}

**تعليمات:**
1. اقرأ المستند بعناية
2. قارنه بالقواعد أعلاه
3. حدد الفجوات (ما هو مفقود أو غير كافٍ)
4. احسب نسبة الامتثال (0-100)
5. قدم توصيات عملية لكل فجوة

**معايير التقييم:**
- critical: فجوة حرجة تؤدي لغرامات كبيرة
- high: فجوة مهمة تؤثر على الامتثال
- medium: فجوة متوسطة يجب معالجتها
- low: فجوة بسيطة أو تحسين مقترح

**مهم:**
- كن دقيقاً في تحديد رموز الضوابط والمواد
- لا تخترع فجوات غير موجودة
- ركز على الفجوات الحقيقية والمؤثرة`;
    } else {
      return `You are a compliance analyst. Your task is to analyze documents and policies against regulatory requirements.

**Available Rules:**
${rulesContext}

**Instructions:**
1. Read the document carefully
2. Compare it against the rules above
3. Identify gaps (what's missing or insufficient)
4. Calculate compliance score (0-100)
5. Provide actionable recommendations for each gap

**Severity Criteria:**
- critical: Critical gap leading to major penalties
- high: Important gap affecting compliance
- medium: Medium gap that should be addressed
- low: Minor gap or suggested improvement

**Important:**
- Be precise in identifying control and article codes
- Do not invent non-existent gaps
- Focus on real and impactful gaps`;
    }
  }

  /**
   * استخراج المصادر من رموز الضوابط والمواد
   */
  private extractSources(
    controlCodes: string[],
    articleCodes: string[]
  ): AdvisoryResponse["sources"] {
    const sources: AdvisoryResponse["sources"] = [];

    for (const controlCode of controlCodes) {
      const rule = this.rules.find((r) => r.controlCode === controlCode);
      if (rule) {
        for (const article of rule.relatedArticles) {
          if (articleCodes.includes(article.articleCode)) {
            sources.push({
              controlCode: rule.controlCode,
              articleCode: article.articleCode,
              articleText: article.articleText,
              frameworkName: rule.frameworkName,
            });
          }
        }
      }
    }

    return sources;
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

let engineInstance: RegAdvisorEngine | null = null;

export function getRegAdvisorEngine(): RegAdvisorEngine {
  if (!engineInstance) {
    engineInstance = new RegAdvisorEngine();
  }
  return engineInstance;
}
