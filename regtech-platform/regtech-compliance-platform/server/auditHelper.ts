import { v4 as uuidv4 } from "uuid";
import type { AuditEvent } from "../shared/advisory-types";

/**
 * ============================================================================
 * Audit Helper - مساعد سجل التدقيق
 * ============================================================================
 * 
 * يوفر دوال لتسجيل الأحداث في سجل التدقيق الشامل
 */

// تخزين مؤقت للأحداث (في الإنتاج، يجب حفظها في قاعدة البيانات)
const auditEvents: Map<string, AuditEvent[]> = new Map();

/**
 * إنشاء معرف فريد لسجل التدقيق
 */
export function createAuditRef(): string {
  return uuidv4();
}

/**
 * تسجيل حدث في سجل التدقيق
 */
export async function logAuditEvent(event: Omit<AuditEvent, "timestamp">): Promise<void> {
  const fullEvent: AuditEvent = {
    ...event,
    timestamp: new Date(),
  };

  // الحصول على الأحداث الحالية أو إنشاء مصفوفة جديدة
  const events = auditEvents.get(event.auditRef) || [];
  events.push(fullEvent);
  auditEvents.set(event.auditRef, events);

  // في الإنتاج: حفظ في قاعدة البيانات
  // await db.insert(auditLogs).values(fullEvent);

  console.log(`[Audit] ${event.step}`, event.data || "");
}

/**
 * الحصول على جميع أحداث سجل تدقيق معين
 */
export function getAuditEvents(auditRef: string): AuditEvent[] {
  return auditEvents.get(auditRef) || [];
}

/**
 * تنظيف أحداث قديمة (اختياري)
 */
export function clearOldAuditEvents(olderThanHours: number = 24): void {
  const cutoffTime = new Date();
  cutoffTime.setHours(cutoffTime.getHours() - olderThanHours);

  const entries = Array.from(auditEvents.entries());
  for (const [auditRef, events] of entries) {
    const filteredEvents = events.filter((e: AuditEvent) => e.timestamp > cutoffTime);
    if (filteredEvents.length === 0) {
      auditEvents.delete(auditRef);
    } else {
      auditEvents.set(auditRef, filteredEvents);
    }
  }
}

/**
 * مساعد لتسجيل خطوات التحليل
 */
export class AnalysisAuditLogger {
  private auditRef: string;
  private userId?: number;

  constructor(auditRef: string, userId?: number) {
    this.auditRef = auditRef;
    this.userId = userId;
  }

  async logRequestReceived(data: Record<string, any>): Promise<void> {
    await logAuditEvent({
      auditRef: this.auditRef,
      step: "request.received",
      userId: this.userId,
      data,
    });
  }

  async logRulesLoaded(count: number): Promise<void> {
    await logAuditEvent({
      auditRef: this.auditRef,
      step: "rules.loaded",
      userId: this.userId,
      data: { count },
    });
  }

  async logEngineRunStarted(): Promise<void> {
    await logAuditEvent({
      auditRef: this.auditRef,
      step: "engine.run.started",
      userId: this.userId,
    });
  }

  async logEngineRunCompleted(matchesCount: number): Promise<void> {
    await logAuditEvent({
      auditRef: this.auditRef,
      step: "engine.run.completed",
      userId: this.userId,
      data: { matches: matchesCount },
    });
  }

  async logResultMapped(gapsCount: number): Promise<void> {
    await logAuditEvent({
      auditRef: this.auditRef,
      step: "result.mapped",
      userId: this.userId,
      data: { gaps: gapsCount },
    });
  }

  async logResponseSent(): Promise<void> {
    await logAuditEvent({
      auditRef: this.auditRef,
      step: "response.sent",
      userId: this.userId,
    });
  }

  async logRecommendationAdopted(): Promise<void> {
    await logAuditEvent({
      auditRef: this.auditRef,
      step: "recommendation.adopted",
      userId: this.userId,
    });
  }

  async logError(error: Error | string): Promise<void> {
    await logAuditEvent({
      auditRef: this.auditRef,
      step: "error.occurred",
      userId: this.userId,
      error: typeof error === "string" ? error : error.message,
    });
  }

  /**
   * تسجيل حدث عام (للاستخدام في RaaC وغيره)
   */
  static async logEvent(event: { auditRef: string; event: string; details?: any; userId?: string }): Promise<void> {
    await logAuditEvent({
      auditRef: event.auditRef,
      step: event.event,
      userId: event.userId ? parseInt(event.userId) : undefined,
      data: event.details,
    });
  }
}
