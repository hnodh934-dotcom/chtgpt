import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { leads } from "../drizzle/schema";
import { notifyOwner } from "./_core/notification";

/**
 * Contact Router - معالجة رسائل التواصل
 */
export const contactRouter = router({
  /**
   * إرسال رسالة تواصل جديدة
   */
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل").max(255),
        email: z.string().email("البريد الإلكتروني غير صحيح").max(320),
        phone: z.string().optional(),
        company: z.string().optional(),
        message: z.string().min(20, "الرسالة يجب أن تكون 20 حرف على الأقل"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // حفظ الرسالة في قاعدة البيانات باستخدام جدول leads
      const result = await db.insert(leads).values({
        name: input.name,
        email: input.email,
        phone: input.phone,
        company: input.company,
        message: input.message,
        status: "new",
      });

      // إرسال إشعار للمالك
      try {
        await notifyOwner({
          title: `📧 رسالة تواصل جديدة من ${input.name}`,
          content: `**البريد:** ${input.email}\n\n**الرسالة:**\n${input.message.substring(0, 200)}${input.message.length > 200 ? "..." : ""}`,
        });
      } catch (error) {
        console.error("[Contact] Failed to send notification:", error);
        // لا نفشل العملية إذا فشل الإشعار
      }

      return {
        success: true,
        message: "تم إرسال رسالتك بنجاح. سنتواصل معك قريباً!",
      };
    }),
});
