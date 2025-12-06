/**
 * RegAdvisor Router - APIs للمستشار التنظيمي الذكي
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getRegAdvisorEngine } from "./regAdvisorEngine";

// ============================================================================
// Schemas
// ============================================================================

const AskQuestionSchema = z.object({
  question: z.string().min(3, "السؤال يجب أن يكون 3 أحرف على الأقل"),
  conversationId: z.string().optional(),
  framework: z.enum(["PDPL", "ECC", "SAMA", "ALL"]).optional(),
  language: z.enum(["ar", "en"]).optional().default("ar"),
  context: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .optional(),
});

const AnalyzeDocumentSchema = z.object({
  documentText: z.string().min(100, "المستند يجب أن يكون 100 حرف على الأقل"),
  framework: z.enum(["PDPL", "ECC", "SAMA", "ALL"]).optional(),
  language: z.enum(["ar", "en"]).optional().default("ar"),
});

// ============================================================================
// Router
// ============================================================================

export const regAdvisorRouter = router({
  /**
   * سؤال المستشار
   */
  ask: protectedProcedure
    .input(AskQuestionSchema)
    .mutation(async ({ input, ctx }) => {
      const engine = getRegAdvisorEngine();

      const response = await engine.ask(input.question, {
        conversationId: input.conversationId,
        framework: input.framework,
        language: input.language,
        userId: String(ctx.user.id),
        messages: input.context?.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.content,
        })),
      });

      return response;
    }),

  /**
   * تحليل مستند
   */
  analyzeDocument: protectedProcedure
    .input(AnalyzeDocumentSchema)
    .mutation(async ({ input, ctx }) => {
      const engine = getRegAdvisorEngine();

      const response = await engine.analyzeDocument({
        documentText: input.documentText,
        framework: input.framework,
        language: input.language,
        userId: String(ctx.user.id),
      });

      return response;
    }),

  /**
   * الحصول على أمثلة أسئلة
   */
  getExampleQuestions: publicProcedure
    .input(
      z.object({
        language: z.enum(["ar", "en"]).optional().default("ar"),
        framework: z.enum(["PDPL", "ECC", "SAMA", "ALL"]).optional(),
      })
    )
    .query(({ input }) => {
      const examples = {
        ar: {
          PDPL: [
            "هل يجب تعيين مسؤول حماية بيانات؟",
            "ما هي متطلبات الحصول على موافقة المستخدم؟",
            "كيف أتعامل مع طلبات حذف البيانات؟",
            "ما هي الغرامات المحتملة لعدم الامتثال؟",
            "هل يجب إجراء تقييم أثر الخصوصية؟",
          ],
          ECC: [
            "ما هي متطلبات المصادقة متعددة العوامل (MFA)؟",
            "كيف أحمي البيانات في السحابة؟",
            "ما هي متطلبات تشفير البيانات؟",
            "كيف أتعامل مع الحوادث الأمنية؟",
            "ما هي متطلبات إدارة الوصول؟",
          ],
          SAMA: [
            "ما هي متطلبات الاستعانة بمصادر خارجية؟",
            "كيف أحصل على موافقة ساما للاستعانة الخارجية؟",
            "ما هي متطلبات إدارة مخاطر الطرف الثالث؟",
            "كيف أراقب أداء مقدمي الخدمات الخارجيين؟",
            "ما هي متطلبات خطة استمرارية الأعمال؟",
          ],
          ALL: [
            "ما هي الأطر التنظيمية التي تنطبق على شركتي؟",
            "كيف أبدأ رحلة الامتثال؟",
            "ما هي أهم الأولويات للامتثال؟",
            "كيف أقيّم مستوى امتثالي الحالي؟",
            "ما هي التكلفة المتوقعة للامتثال؟",
          ],
        },
        en: {
          PDPL: [
            "Do I need to appoint a Data Protection Officer?",
            "What are the requirements for user consent?",
            "How do I handle data deletion requests?",
            "What are the potential penalties for non-compliance?",
            "Do I need to conduct a Privacy Impact Assessment?",
          ],
          ECC: [
            "What are the MFA requirements?",
            "How do I protect data in the cloud?",
            "What are the data encryption requirements?",
            "How do I handle security incidents?",
            "What are the access management requirements?",
          ],
          SAMA: [
            "What are the outsourcing requirements?",
            "How do I get SAMA approval for outsourcing?",
            "What are the third-party risk management requirements?",
            "How do I monitor external service providers?",
            "What are the business continuity requirements?",
          ],
          ALL: [
            "Which regulatory frameworks apply to my company?",
            "How do I start my compliance journey?",
            "What are the top priorities for compliance?",
            "How do I assess my current compliance level?",
            "What is the expected cost of compliance?",
          ],
        },
      };

      const lang = input.language;
      const framework = input.framework || "ALL";

      return {
        examples: examples[lang][framework],
      };
    }),

  /**
   * إحصائيات الاستخدام
   */
  getUsageStats: protectedProcedure.query(async ({ ctx }) => {
    // TODO: استخراج من Audit Log
    return {
      totalQuestions: 0,
      totalDocuments: 0,
      averageConfidence: 0,
      topFrameworks: [],
    };
  }),
});
