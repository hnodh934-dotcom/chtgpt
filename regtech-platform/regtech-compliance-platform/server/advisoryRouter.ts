import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import {
  AnalyzeInputSchema,
  AdoptRecommendationSchema,
  ADVISORY_NOTICE,
  type AnalyzeOutput,
  type Gap,
  type RuleRecord,
} from "../shared/advisory-types";
import { buildStructuredRules } from "./ruleEngine";
import { analyzeDocumentComplianceV2 } from "./analysisEngine-v2";
import {
  createAuditRef,
  AnalysisAuditLogger,
} from "./auditHelper";
import { advisoryMonitor } from "./advisoryMonitor";

/**
 * ============================================================================
 * Advisory Router - موجه التوصيات الاستشارية
 * ============================================================================
 * 
 * يوفر APIs لتحليل الوثائق وإصدار توصيات استشارية (وليس قرارات ملزمة)
 */

/**
 * دالة ربط النتائج الأولية بقاعدة القواعد وإثرائها
 */
function mapResultsToAdvisory(
  raw: any,
  rules: RuleRecord[],
  auditRef: string,
  frameworkId: string,
  frameworkName: string
): AnalyzeOutput {
  const gaps: Gap[] = (raw.gaps || []).map((m: any) => {
    // البحث عن القاعدة المطابقة
    const rule = rules.find(
      (r) =>
        r.controlCode === m.affectedControlCodes?.[0] &&
        r.articleCode === m.affectedArticleCodes?.[0]
    );

    // إذا لم يتم العثور على القاعدة، رفض النتيجة
    if (!rule) {
      throw new TRPCError({
        code: "UNPROCESSABLE_CONTENT",
        message: `تعذر إكمال التحليل لأن بعض النتائج لا يمكن ربطها بضوابط/مواد موثّقة في قاعدة القواعد. (رمز الضابط: ${m.affectedControlCodes?.[0]}, رمز المادة: ${m.affectedArticleCodes?.[0]})`,
      });
    }

    return {
      gapId: m.gapId || `gap-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      summary: m.title || m.description || "فجوة غير محددة",
      evidence: {
        quote: m.evidenceText || m.description || "",
        page: m.page,
        offset: m.offset,
      },
      controlCode: rule.controlCode,
      controlText: rule.controlText,
      controlName: rule.controlName,
      controlDescription: rule.controlDescription,
      articleCode: rule.articleCode,
      articleText: rule.articleText,
      articleName: rule.articleName,
      implementationGuidance: rule.implementationGuidance || m.estimatedEffort || "لا توجد إرشادات محددة",
      requiredEvidence: rule.requiredEvidence || "لا توجد متطلبات محددة",
      riskLevel: (m.priority === "high" ? "high" : m.priority === "low" ? "low" : "medium") as "low" | "medium" | "high",
    };
  });

  return {
    kind: "advisory",
    frameworkId,
    frameworkName,
    gaps,
    complianceFindings: raw.complianceFindings || [],
    complianceScore: raw.complianceScore,
    generatedAt: new Date().toISOString(),
    auditRef,
    advisoryNotice: ADVISORY_NOTICE,
  };
}

/**
 * موجه التوصيات الاستشارية
 */
export const advisoryRouter = router({
  /**
   * تحليل وثيقة وإصدار توصيات استشارية
   */
  analyzeDocument: protectedProcedure
    .input(AnalyzeInputSchema)
    .mutation(async ({ input, ctx }) => {
      // إنشاء معرف سجل التدقيق
      const auditRef = createAuditRef();
      const logger = new AnalysisAuditLogger(auditRef, ctx.user.id);

      try {
        // 1. تسجيل استقبال الطلب
        await logger.logRequestReceived({
          docId: input.docId,
          frameworkId: input.frameworkId,
          frameworkName: input.frameworkName,
          documentLength: input.documentText.length,
        });

        // 2. بناء القواعد المهيكلة من قاعدة البيانات
        const { rules } = await buildStructuredRules(parseInt(input.frameworkId));

        if (!rules || rules.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "لم يتم العثور على إطار تنظيمي مطابق أو لا توجد قواعد محددة.",
          });
        }

        await logger.logRulesLoaded(rules.length);

        // تحويل StructuredRule إلى RuleRecord
        const ruleRecords: RuleRecord[] = rules.map((r) => ({
          controlCode: r.controlCode,
          controlText: r.controlDescription, // استخدام description كـ text
          controlName: r.controlName,
          controlDescription: r.controlDescription,
          controlCategory: r.controlCategory,
          controlPriority: r.controlPriority,
          articleCode: r.relatedArticles[0]?.articleCode || "",
          articleText: r.relatedArticles[0]?.articleText || "",
          articleName: r.relatedArticles[0]?.articleName || "",
          implementationGuidance: r.implementationGuidance,
          requiredEvidence: r.evidenceRequirements,
        }));

        // 3. تشغيل محرك التحليل
        await logger.logEngineRunStarted();

        const rawResult = await analyzeDocumentComplianceV2(
          input.documentText,
          parseInt(input.frameworkId),
          input.frameworkName
        );

        await logger.logEngineRunCompleted(rawResult.gaps?.length || 0);

        // 4. إثراء النتائج وربطها بقاعدة القواعد
        const advisoryResult = mapResultsToAdvisory(
          rawResult,
          ruleRecords,
          auditRef,
          input.frameworkId,
          input.frameworkName
        );

        await logger.logResultMapped(advisoryResult.gaps.length);

        // 5. إرسال الاستجابة
        await logger.logResponseSent();

        // ✅ فحص الاستجابة بواسطة Monitor
        advisoryMonitor.checkAnalyzeResponse(
          advisoryResult,
          "advisory.analyzeDocument"
        );

        return {
          success: true,
          analysis: advisoryResult,
          message: `تم تحليل الوثيقة بنجاح مقابل ${rules.length} ضابط ومادة قانونية.`,
        };
      } catch (error) {
        await logger.logError(error as Error);
        throw error;
      }
    }),

  /**
   * اعتماد توصية (بعد موافقة المستخدم)
   */
  adoptRecommendation: protectedProcedure
    .input(AdoptRecommendationSchema)
    .mutation(async ({ input, ctx }) => {
      // التحقق من موافقة المستخدم في الطلب
      if (!input.acceptsLiability) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "يجب الموافقة على تحمل المسؤولية النهائية لاعتماد التوصية.",
        });
      }

      // تسجيل الاعتماد في سجل التدقيق
      const logger = new AnalysisAuditLogger(input.auditRef, ctx.user.id);
      await logger.logRecommendationAdopted();

      // في الإنتاج: حفظ الاعتماد في قاعدة البيانات
      // await db.insert(adoptedRecommendations).values({...});

      return {
        success: true,
        message: "تم اعتماد التوصية بنجاح.",
        adoptedAt: new Date().toISOString(),
        auditRef: input.auditRef,
      };
    }),

  /**
   * الحصول على سجل التدقيق لتحليل معين
   */
  getAuditTrail: protectedProcedure
    .input(z.object({ auditRef: z.string().uuid() }))
    .query(async ({ input }) => {
      const { getAuditEvents } = await import("./auditHelper");
      const events = getAuditEvents(input.auditRef);

      return {
        auditRef: input.auditRef,
        events,
        totalEvents: events.length,
      };
    }),
});
