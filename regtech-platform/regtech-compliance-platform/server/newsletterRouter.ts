import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";

/**
 * Newsletter Router - إدارة اشتراكات النشرة البريدية
 */
export const newsletterRouter = router({
  /**
   * الاشتراك في النشرة البريدية
   */
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email("البريد الإلكتروني غير صحيح"),
        name: z.string().min(2).max(255).optional(),
      })
    )
    .mutation(async ({ input }) => {
      // في المستقبل، يمكن إضافة جدول newsletterSubscriptions
      // حالياً نستخدم رسالة نجاح بسيطة
      return {
        success: true,
        message: "شكراً لاشتراكك! ستصلك آخر الأخبار والتحديثات التنظيمية",
      };
    }),

  /**
   * إلغاء الاشتراك
   */
  unsubscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      // في المستقبل، يمكن إضافة جدول newsletterSubscriptions
      // حالياً نستخدم رسالة نجاح بسيطة
      return {
        success: true,
        message: "تم إلغاء اشتراكك بنجاح",
      };
    }),
});
