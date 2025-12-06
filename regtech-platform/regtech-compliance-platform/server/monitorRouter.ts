/**
 * Monitor Router - واجهة برمجية لنظام المراقبة
 * 
 * يوفر APIs للوصول إلى إحصائيات Monitor وإدارة النظام
 */

import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { advisoryMonitor } from "./advisoryMonitor";
import { TRPCError } from "@trpc/server";

/**
 * موجه المراقبة
 */
export const monitorRouter = router({
  /**
   * الحصول على إحصائيات Monitor
   */
  getStats: protectedProcedure.query(async () => {
    const stats = advisoryMonitor.getStats();
    
    // حساب التقارير اليومية (آخر 24 ساعة)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const dailyAlerts = stats.alerts.filter(
      (a) => new Date(a.timestamp) >= oneDayAgo
    );

    return {
      totalChecks: stats.totalChecks,
      passedChecks: stats.passedChecks,
      failedChecks: stats.failedChecks,
      lastCheckTime: stats.lastCheckTime,
      dailyReports: dailyAlerts.filter((a) => a.level === "INFO").length,
      criticalErrors: stats.alerts.filter((a) => a.level === "CRITICAL").length,
      recentAlerts: stats.alerts.slice(-10).reverse(), // آخر 10 تنبيهات
    };
  }),

  /**
   * الحصول على تقرير صحة النظام
   */
  getHealth: protectedProcedure.query(async () => {
    return advisoryMonitor.getHealthReport();
  }),

  /**
   * الحصول على التنبيهات الحرجة فقط
   */
  getCriticalAlerts: protectedProcedure.query(async () => {
    return advisoryMonitor.getCriticalAlerts();
  }),

  /**
   * إعادة تعيين الإحصائيات (للمالك فقط)
   */
  resetStats: protectedProcedure
    .mutation(async ({ ctx }) => {
      // التحقق من أن المستخدم هو المالك (roleId = 1 للـ System Admin)
      if (ctx.user.roleId !== 1) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "هذه العملية متاحة للمالك فقط",
        });
      }

      advisoryMonitor.resetStats();

      return {
        success: true,
        message: "تم إعادة تعيين الإحصائيات بنجاح",
      };
    }),

  /**
   * Override Mode - تجاوز مؤقت للرفض (للطوارئ فقط)
   */
  enableOverrideMode: protectedProcedure
    .input(
      z.object({
        reason: z.string().min(10, "يجب توضيح السبب (10 أحرف على الأقل)"),
        duration: z.number().min(1).max(60), // دقائق (1-60)
      })
    )
    .mutation(async ({ input, ctx }) => {
      // التحقق من أن المستخدم هو المالك (roleId = 1 للـ System Admin)
      if (ctx.user.roleId !== 1) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Override Mode متاح للمالك فقط",
        });
      }

      // تسجيل التفعيل
      console.warn(
        `[AdvisoryMonitor] [OVERRIDE MODE ENABLED] by ${ctx.user.name} (${ctx.user.id})`,
        {
          reason: input.reason,
          duration: input.duration,
          timestamp: new Date().toISOString(),
        }
      );

      // في الإنتاج: حفظ في قاعدة البيانات
      // await db.insert(overrideModeLog).values({...});

      return {
        success: true,
        message: `تم تفعيل Override Mode لمدة ${input.duration} دقيقة`,
        expiresAt: new Date(Date.now() + input.duration * 60 * 1000).toISOString(),
        warning: "⚠️ تحذير: Override Mode يسمح بإصدار تقارير بدون التحقق الكامل. استخدمه بحذر!",
      };
    }),

  /**
   * تعطيل Override Mode
   */
  disableOverrideMode: protectedProcedure
    .mutation(async ({ ctx }) => {
      // التحقق من أن المستخدم هو المالك (roleId = 1 للـ System Admin)
      if (ctx.user.roleId !== 1) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "هذه العملية متاحة للمالك فقط",
        });
      }

      console.warn(
        `[AdvisoryMonitor] [OVERRIDE MODE DISABLED] by ${ctx.user.name} (${ctx.user.id})`,
        {
          timestamp: new Date().toISOString(),
        }
      );

      return {
        success: true,
        message: "تم تعطيل Override Mode",
      };
    }),
});
