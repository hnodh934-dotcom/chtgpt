import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { AnalyzeInputSchema, ADVISORY_NOTICE } from "../shared/advisory-types";
import { advisoryMonitor } from "./advisoryMonitor";
import { buildStructuredRules } from "./ruleEngine";
import { analyzeDocumentComplianceV2 } from "./analysisEngine-v2";
import { createAuditRef, AnalysisAuditLogger } from "./auditHelper";
import type { RuleRecord } from "../shared/advisory-types";

/**
 * Diagnostic Router - معالجات التشخيص والتحليل
 * 
 * ⚠️ DEPRECATION NOTICE:
 * - diagnostic.analyzeDocument is DEPRECATED
 * - Use advisory.analyzeDocument instead
 * - This route will be removed in v3.0
 */
export const diagnosticRouter = router({
  /**
   * رفع وثيقة للتحليل
   */
  uploadDocument: protectedProcedure
    .input(z.object({
      fileName: z.string(),
      fileSize: z.number(),
      fileType: z.string(),
      category: z.enum(["policies", "financial", "agreements", "licenses", "procedures", "reports", "other"]),
      fileContent: z.string(), // Base64 or text content
    }))
    .mutation(async ({ input, ctx }) => {
      // Simulation: في الواقع سيتم رفع الملف إلى S3 وحفظه في قاعدة البيانات
      const documentId = Math.floor(Math.random() * 10000);
      
      return {
        success: true,
        documentId,
        message: "تم رفع الوثيقة بنجاح",
      };
    }),

  /**
   * ⚠️ DEPRECATED: استخدم advisory.analyzeDocument بدلاً من ذلك
   * 
   * تحليل وثيقة مقابل إطار تنظيمي
   * 
   * @deprecated سيتم إزالة هذا المسار في v3.0
   */
  analyzeDocument: protectedProcedure
    .input(z.object({
      documentId: z.number().optional(),
      documentText: z.string(),
      frameworkId: z.number(),
      frameworkName: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      // ⚠️ DEPRECATION WARNING
      console.warn(
        "[DEPRECATED] diagnostic.analyzeDocument is deprecated. " +
        "Use advisory.analyzeDocument instead. " +
        "This route will be removed in v3.0"
      );

      // إنشاء معرف سجل التدقيق
      const auditRef = createAuditRef();
      const logger = new AnalysisAuditLogger(auditRef, ctx.user.id);

      try {
        // تسجيل استقبال الطلب
        await logger.logRequestReceived({
          documentId: input.documentId,
          frameworkId: input.frameworkId,
          frameworkName: input.frameworkName,
          documentLength: input.documentText.length,
          deprecated: true, // تمييز الطلبات من المسار القديم
        });

        // بناء القواعد المهيكلة من قاعدة البيانات
        const { rules } = await buildStructuredRules(input.frameworkId);

        if (!rules || rules.length === 0) {
          throw new Error("لم يتم العثور على إطار تنظيمي مطابق أو لا توجد قواعد محددة.");
        }

        await logger.logRulesLoaded(rules.length);

        // تحويل StructuredRule إلى RuleRecord
        const ruleRecords: RuleRecord[] = rules.map((r) => ({
          controlCode: r.controlCode,
          controlText: r.controlDescription,
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

        // تشغيل محرك التحليل
        await logger.logEngineRunStarted();

        const rawResult = await analyzeDocumentComplianceV2(
          input.documentText,
          input.frameworkId,
          input.frameworkName
        );

        await logger.logEngineRunCompleted(rawResult.gaps?.length || 0);

        // إثراء النتائج (نفس منطق advisoryRouter)
        const gaps = (rawResult.gaps || []).map((m: any) => {
          const rule = ruleRecords.find(
            (r) =>
              r.controlCode === m.affectedControlCodes?.[0] &&
              r.articleCode === m.affectedArticleCodes?.[0]
          );

          if (!rule) {
            throw new Error(
              `تعذر إكمال التحليل لأن بعض النتائج لا يمكن ربطها بضوابط/مواد موثّقة في قاعدة القواعد. (رمز الضابط: ${m.affectedControlCodes?.[0]}, رمز المادة: ${m.affectedArticleCodes?.[0]})`
            );
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

        await logger.logResultMapped(gaps.length);

        // إرجاع نتيجة متوافقة مع Advisory Mode
        const advisoryResult = {
          kind: "advisory" as const,
          frameworkId: input.frameworkId.toString(),
          frameworkName: input.frameworkName,
          gaps,
          complianceFindings: rawResult.complianceFindings || [],
          complianceScore: rawResult.complianceScore,
          generatedAt: new Date().toISOString(),
          auditRef,
          advisoryNotice: ADVISORY_NOTICE,
        };

        await logger.logResponseSent();

        // ✅ فحص الاستجابة بواسطة Monitor
        advisoryMonitor.checkAnalyzeResponse(
          advisoryResult,
          "diagnostic.analyzeDocument (DEPRECATED)"
        );

        return {
          success: true,
          analysisId: input.documentId || Math.floor(Math.random() * 10000),
          analysis: advisoryResult,
          message: `⚠️ تحذير: هذا المسار قديم. استخدم advisory.analyzeDocument في المستقبل.`,
          deprecationWarning: "This endpoint is deprecated and will be removed in v3.0. Use advisory.analyzeDocument instead.",
        };
      } catch (error) {
        await logger.logError(error as Error);
        throw error;
      }
    }),

  /**
   * الحصول على خريطة الامتثال للمؤسسة
   */
  getComplianceMap: protectedProcedure
    .query(async ({ ctx }) => {
      // Simulation: جلب البيانات من قاعدة البيانات
      return {
        frameworks: [
          {
            id: 1,
            name: "نظام حماية البيانات الشخصية",
            code: "PDPL",
            overallScore: 72.5,
            controlsTotal: 45,
            controlsCompliant: 28,
            controlsPartial: 12,
            controlsNonCompliant: 5,
            gapsCount: 17,
            highPriorityGaps: 5,
            lastAnalysisDate: new Date().toISOString(),
          },
          {
            id: 2,
            name: "الضوابط الأساسية للأمن السيبراني",
            code: "ECC",
            overallScore: 65.0,
            controlsTotal: 114,
            controlsCompliant: 68,
            controlsPartial: 28,
            controlsNonCompliant: 18,
            gapsCount: 46,
            highPriorityGaps: 12,
            lastAnalysisDate: new Date().toISOString(),
          },
        ],
      };
    }),

  /**
   * الحصول على تقرير الفجوات
   */
  getGapReport: protectedProcedure
    .input(z.object({
      frameworkId: z.number(),
    }))
    .query(async ({ input, ctx }) => {
      // Simulation: جلب البيانات من قاعدة البيانات
      return {
        kind: "advisory" as const, // ✅ إضافة kind
        frameworkName: "نظام حماية البيانات الشخصية",
        overallScore: 72.5,
        gaps: [
          {
            title: "عدم تعيين مسؤول حماية بيانات",
            description: "لم يتم تعيين مسؤول حماية بيانات معتمد كما تتطلب المادة 5 من النظام",
            priority: "high" as const,
            affectedControls: ["CTL-001", "CTL-002"],
            estimatedEffort: "2-3 أسابيع",
            estimatedCost: { min: 50000, max: 100000, currency: "SAR" },
          },
          {
            title: "نقص في توثيق عمليات المعالجة",
            description: "لا يوجد سجل شامل لجميع عمليات معالجة البيانات الشخصية",
            priority: "high" as const,
            affectedControls: ["CTL-003", "CTL-004", "CTL-005"],
            estimatedEffort: "4-6 أسابيع",
            estimatedCost: { min: 30000, max: 60000, currency: "SAR" },
          },
          {
            title: "عدم إجراء تقييم أثر الخصوصية",
            description: "لم يتم إجراء تقييم أثر الخصوصية للعمليات عالية المخاطر",
            priority: "medium" as const,
            affectedControls: ["CTL-010"],
            estimatedEffort: "3-4 أسابيع",
            estimatedCost: { min: 40000, max: 80000, currency: "SAR" },
          },
        ],
        recommendations: [
          {
            title: "تعيين مسؤول حماية بيانات معتمد",
            description: "البحث عن وتعيين مسؤول حماية بيانات معتمد (CDPO) أو تدريب موظف داخلي",
            priority: "high" as const,
            timeline: "فوري - خلال شهر",
          },
          {
            title: "إنشاء سجل عمليات المعالجة",
            description: "توثيق جميع عمليات معالجة البيانات الشخصية في سجل شامل",
            priority: "high" as const,
            timeline: "خلال شهرين",
          },
        ],
        financialSummary: {
          totalEstimatedCost: { min: 120000, max: 240000, currency: "SAR" },
          potentialFines: { min: 500000, max: 5000000, currency: "SAR" },
          roi: "تجنب غرامات محتملة تصل إلى 5 مليون ريال",
        },
        advisoryNotice: ADVISORY_NOTICE, // ✅ إضافة التنويه
      };
    }),

  /**
   * الحصول على قائمة الوثائق المرفوعة
   */
  getDocuments: protectedProcedure
    .query(async ({ ctx }) => {
      // Simulation: جلب البيانات من قاعدة البيانات
      return {
        documents: [
          {
            id: 1,
            fileName: "سياسة_حماية_البيانات.pdf",
            fileSize: 245000,
            fileType: "pdf",
            category: "policies" as const,
            status: "analyzed" as const,
            analysisStatus: "completed" as const,
            uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            complianceScore: 75.0,
          },
          {
            id: 2,
            fileName: "النماذج_المالية_2024.xlsx",
            fileSize: 512000,
            fileType: "xlsx",
            category: "financial" as const,
            status: "analyzed" as const,
            analysisStatus: "completed" as const,
            uploadedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
            complianceScore: 68.5,
          },
        ],
      };
    }),
});
