/**
 * RegDrafter Router - API للمحرر التنظيمي
 */

import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { getRegDrafterEngine } from "./regDrafterEngine";

export const regDrafterRouter = router({
  /**
   * الحصول على القوالب المتاحة
   */
  getTemplates: protectedProcedure
    .input(
      z.object({
        framework: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const engine = getRegDrafterEngine();
      const templates = engine.getTemplates(input.framework);

      return {
        templates,
        count: templates.length,
      };
    }),

  /**
   * كتابة سياسة جديدة
   */
  draftPolicy: protectedProcedure
    .input(
      z.object({
        templateId: z.string().optional(),
        policyType: z.string(),
        framework: z.string(),
        companyName: z.string(),
        industry: z.string().optional(),
        customRequirements: z.string().optional(),
        language: z.enum(["ar", "en"]).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const engine = getRegDrafterEngine();

      // تهيئة المحرك إذا لم يكن مهيأً
      await engine.initialize();

      const result = await engine.draftPolicy({
        ...input,
        userId: ctx.user.id.toString(),
      });

      return result;
    }),

  /**
   * مراجعة سياسة موجودة
   */
  reviewPolicy: protectedProcedure
    .input(
      z.object({
        policyText: z.string(),
        framework: z.string(),
        language: z.enum(["ar", "en"]).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const engine = getRegDrafterEngine();

      // تهيئة المحرك إذا لم يكن مهيأً
      await engine.initialize();

      const result = await engine.reviewPolicy({
        ...input,
        userId: ctx.user.id.toString(),
      });

      return result;
    }),
});
