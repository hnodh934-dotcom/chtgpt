/**
 * Email Alert System - نظام إرسال التنبيهات عبر البريد الإلكتروني
 * 
 * يرسل تنبيهات فورية للمالك عند حدوث أخطاء حرجة
 */

import { notifyOwner } from "./_core/notification";
import type { MonitorAlert } from "./advisoryMonitor";

/**
 * إرسال تنبيه email للمالك
 */
export async function sendEmailAlert(alert: MonitorAlert): Promise<boolean> {
  try {
    // استخدام notifyOwner المدمج في المنصة
    const success = await notifyOwner({
      title: `🚨 ${alert.level}: Advisory Mode Alert`,
      content: formatAlertEmail(alert),
    });

    if (success) {
      console.log(`[EmailAlerts] Successfully sent email for ${alert.level} alert`);
    } else {
      console.warn(`[EmailAlerts] Failed to send email for ${alert.level} alert`);
    }

    return success;
  } catch (error) {
    console.error("[EmailAlerts] Error sending email alert:", error);
    return false;
  }
}

/**
 * تنسيق محتوى البريد الإلكتروني
 */
function formatAlertEmail(alert: MonitorAlert): string {
  const timestamp = new Date(alert.timestamp).toLocaleString("ar-SA", {
    timeZone: "Asia/Riyadh",
    dateStyle: "full",
    timeStyle: "long",
  });

  let content = `
📊 **تنبيه من نظام المراقبة**

**المستوى:** ${alert.level}
**الوقت:** ${timestamp}
**الرسالة:** ${alert.message}
`;

  if (alert.context) {
    content += `\n**التفاصيل:**\n\`\`\`json\n${JSON.stringify(alert.context, null, 2)}\n\`\`\`\n`;
  }

  // إضافة توصيات حسب نوع التنبيه
  if (alert.level === "CRITICAL") {
    content += `\n⚠️ **إجراء مطلوب:**\nهذا تنبيه حرج يتطلب انتباهك الفوري. يرجى التحقق من النظام في أقرب وقت ممكن.\n`;
    content += `\n🔗 **الوصول للوحة المراقبة:**\n[افتح لوحة المراقبة](/monitor)\n`;
  } else if (alert.level === "ERROR") {
    content += `\n⚠️ **تحذير:**\nتم اكتشاف خطأ في النظام. يرجى المراجعة عند الإمكان.\n`;
  }

  content += `\n---\n\n_هذا تنبيه تلقائي من منصة الامتثال القانوني والتقني._`;

  return content;
}

/**
 * إرسال تنبيهات متعددة دفعة واحدة
 */
export async function sendBatchEmailAlerts(alerts: MonitorAlert[]): Promise<{
  sent: number;
  failed: number;
}> {
  let sent = 0;
  let failed = 0;

  for (const alert of alerts) {
    const success = await sendEmailAlert(alert);
    if (success) {
      sent++;
    } else {
      failed++;
    }
  }

  return { sent, failed };
}

/**
 * إرسال تقرير يومي
 */
export async function sendDailyReport(stats: {
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  criticalAlerts: number;
  passRate: number;
}): Promise<boolean> {
  try {
    const content = `
📊 **التقرير اليومي لنظام المراقبة**

**الإحصائيات:**
- إجمالي الفحوصات: ${stats.totalChecks}
- الفحوصات الناجحة: ${stats.passedChecks}
- الفحوصات الفاشلة: ${stats.failedChecks}
- التنبيهات الحرجة: ${stats.criticalAlerts}
- نسبة النجاح: ${stats.passRate.toFixed(1)}%

${stats.passRate >= 95 ? "✅ **النظام صحي**" : "⚠️ **النظام يحتاج انتباه**"}

${stats.criticalAlerts > 0 ? `\n🚨 **تحذير:** يوجد ${stats.criticalAlerts} تنبيه حرج يحتاج مراجعة.\n` : ""}

🔗 **الوصول للوحة المراقبة:**
[افتح لوحة المراقبة](/monitor)

---

_هذا تقرير يومي تلقائي من منصة الامتثال القانوني والتقني._
`;

    const success = await notifyOwner({
      title: "📊 التقرير اليومي لنظام المراقبة",
      content,
    });

    if (success) {
      console.log("[EmailAlerts] Successfully sent daily report");
    } else {
      console.warn("[EmailAlerts] Failed to send daily report");
    }

    return success;
  } catch (error) {
    console.error("[EmailAlerts] Error sending daily report:", error);
    return false;
  }
}

/**
 * إرسال تقرير أسبوعي
 */
export async function sendWeeklyReport(stats: {
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  criticalAlerts: number;
  passRate: number;
  topErrors: Array<{ message: string; count: number }>;
}): Promise<boolean> {
  try {
    let content = `
📊 **التقرير الأسبوعي لنظام المراقبة**

**الإحصائيات:**
- إجمالي الفحوصات: ${stats.totalChecks}
- الفحوصات الناجحة: ${stats.passedChecks}
- الفحوصات الفاشلة: ${stats.failedChecks}
- التنبيهات الحرجة: ${stats.criticalAlerts}
- نسبة النجاح: ${stats.passRate.toFixed(1)}%

${stats.passRate >= 95 ? "✅ **النظام صحي**" : "⚠️ **النظام يحتاج انتباه**"}
`;

    if (stats.topErrors && stats.topErrors.length > 0) {
      content += `\n**أكثر الأخطاء تكراراً:**\n`;
      stats.topErrors.forEach((error, index) => {
        content += `${index + 1}. ${error.message} (${error.count} مرة)\n`;
      });
    }

    content += `\n🔗 **الوصول للوحة المراقبة:**\n[افتح لوحة المراقبة](/monitor)\n`;

    content += `\n---\n\n_هذا تقرير أسبوعي تلقائي من منصة الامتثال القانوني والتقني._`;

    const success = await notifyOwner({
      title: "📊 التقرير الأسبوعي لنظام المراقبة",
      content,
    });

    if (success) {
      console.log("[EmailAlerts] Successfully sent weekly report");
    } else {
      console.warn("[EmailAlerts] Failed to send weekly report");
    }

    return success;
  } catch (error) {
    console.error("[EmailAlerts] Error sending weekly report:", error);
    return false;
  }
}
