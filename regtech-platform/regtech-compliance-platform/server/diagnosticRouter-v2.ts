/**
 * Diagnostic Router V2 - مع محرك القواعد القانوني
 * 
 * يربط كل نتيجة تحليل بمصدرها في قاعدة البيانات
 */

import { router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { analyzeDocumentComplianceV2 } from "./analysisEngine-v2";
import { enrichAnalysisResult, getEnrichedResultStatistics } from "./resultMapper";

export const diagnosticRouterV2 = router({
  /**
   * تحليل وثيقة مع محرك القواعد القانوني
   */
  analyzeDocumentV2: protectedProcedure
    .input(z.object({
      documentId: z.number(),
      documentText: z.string(),
      frameworkId: z.number(),
      frameworkName: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        // ✅ تحليل الوثيقة مع القواعد المهيكلة من DB
        const rawAnalysis = await analyzeDocumentComplianceV2(
          input.documentText,
          input.frameworkId,
          input.frameworkName
        );
        
        // ✅ إثراء النتائج بالاستشهادات الكاملة
        const enrichedResult = enrichAnalysisResult(rawAnalysis);
        
        // ✅ حساب الإحصائيات
        const statistics = getEnrichedResultStatistics(enrichedResult);
        
        // TODO: حفظ النتائج في قاعدة البيانات
        // await saveAnalysisResult(input.documentId, enrichedResult);
        
        return {
          success: true,
          analysis: enrichedResult,
          statistics,
          message: `تم تحليل الوثيقة بنجاح مقابل ${enrichedResult.totalControls} ضابط و ${enrichedResult.totalArticles} مادة قانونية`,
        };
      } catch (error: any) {
        console.error('[DiagnosticV2] Analysis error:', error);
        return {
          success: false,
          error: error.message || 'فشل التحليل',
        };
      }
    }),
  
  /**
   * الحصول على إحصائيات سريعة
   */
  getQuickStats: protectedProcedure
    .input(z.object({
      frameworkId: z.number(),
    }))
    .query(async ({ input }) => {
      const { buildStructuredRules } = await import('./ruleEngine');
      const { framework, rules } = await buildStructuredRules(input.frameworkId);
      
      if (!framework || rules.length === 0) {
        return {
          success: false,
          error: 'لم يتم العثور على قواعد',
        };
      }
      
      const { getRulesStatistics } = await import('./ruleEngine');
      const stats = getRulesStatistics(rules);
      
      return {
        success: true,
        framework: {
          id: framework.id,
          code: framework.code,
          name: framework.name,
          authority: framework.authority,
          version: framework.version,
        },
        statistics: stats,
      };
    }),
});
