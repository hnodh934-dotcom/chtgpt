/**
 * RaaC Router - API للتنظيم كالكود
 */

import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { getRaaCEngine } from "./raacEngine";

export const raacRouter = router({
  /**
   * تصدير القواعد بصيغة محددة
   */
  exportRules: protectedProcedure
    .input(
      z.object({
        frameworkId: z.number().optional(),
        format: z.enum(["json", "xml", "yaml", "openapi"]),
        includeMetadata: z.boolean().optional(),
        version: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const engine = getRaaCEngine();

      // تهيئة المحرك إذا لم يكن مهيأً
      await engine.initialize(input.frameworkId);

      const result = await engine.exportRules({
        frameworkId: input.frameworkId,
        format: input.format,
        includeMetadata: input.includeMetadata,
        version: input.version,
        userId: ctx.user.id.toString(),
      });

      return result;
    }),

  /**
   * التحقق من البيانات مقابل القواعد
   */
  validateData: protectedProcedure
    .input(
      z.object({
        data: z.record(z.string(), z.any()),
        frameworkId: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const engine = getRaaCEngine();

      // تهيئة المحرك إذا لم يكن مهيأً
      await engine.initialize(input.frameworkId);

      const result = await engine.validateData({
        data: input.data,
        frameworkId: input.frameworkId,
        userId: ctx.user.id.toString(),
      });

      return result;
    }),

  /**
   * الحصول على قائمة الأطر المتاحة للتصدير
   */
  getAvailableFrameworks: protectedProcedure.query(async () => {
    const engine = getRaaCEngine();
    await engine.initialize();

    // هذا يمكن تحسينه لجلب من DB مباشرة
    return {
      frameworks: [
        { id: 1, code: "PDPL", name: "نظام حماية البيانات الشخصية" },
        { id: 2, code: "ECC", name: "الضوابط الأساسية للأمن السيبراني" },
      ],
    };
  }),
});
