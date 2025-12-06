/**
 * Advisory Mode Monitor - Monitor for Advisory Mode
 * 
 * Monitors all analyzeDocument responses and verifies:
 * 1. kind="advisory"
 * 2. auditRef exists
 * 3. ADVISORY_NOTICE exists
 * 4. Complete citations for each gap
 * 
 * Works as early warning before any future issues
 */

import { ADVISORY_NOTICE } from "../shared/advisory-types";

/**
 * Alert levels
 */
export enum AlertLevel {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  CRITICAL = "CRITICAL",
}

/**
 * Alert type
 */
export interface MonitorAlert {
  level: AlertLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, any>;
}

/**
 * Monitor stats
 */
export interface MonitorStats {
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  alerts: MonitorAlert[];
  lastCheckTime: Date;
}

/**
 * Monitor Singleton
 */
export class AdvisoryMonitor {
  private readonly CLEANUP_INTERVAL_MS = 24 * 60 * 60 * 1000;
  private readonly MAX_ALERT_AGE_MS = 90 * 24 * 60 * 60 * 1000;
  private cleanupTimer: NodeJS.Timeout | null = null;
  private stats: MonitorStats = {
    totalChecks: 0,
    passedChecks: 0,
    failedChecks: 0,
    alerts: [],
    lastCheckTime: new Date(),
  };

  private alertHandlers: Array<(alert: MonitorAlert) => void> = [];

  constructor() {
    this.startAutoCleanup();
  }

  onAlert(handler: (alert: MonitorAlert) => void): void {
    this.alertHandlers.push(handler);
  }

  private alert(level: AlertLevel, message: string, context?: Record<string, any>): void {
    const alert: MonitorAlert = {
      level,
      message,
      timestamp: new Date(),
      context,
    };

    this.stats.alerts.push(alert);

    const logMethod = level === AlertLevel.CRITICAL || level === AlertLevel.ERROR
      ? console.error
      : level === AlertLevel.WARNING
      ? console.warn
      : console.log;

    logMethod(`[AdvisoryMonitor] [${level}] ${message}`, context || "");

    this.alertHandlers.forEach((handler) => handler(alert));

    if (level === AlertLevel.CRITICAL) {
      this.notifyOwner(alert);
    }
  }

  private async notifyOwner(alert: MonitorAlert): Promise<void> {
    try {
      console.error(
        `[AdvisoryMonitor] [CRITICAL ALERT] ${alert.message}`,
        alert.context
      );
      
      const { sendEmailAlert } = await import("./emailAlerts");
      await sendEmailAlert(alert);
    } catch (error) {
      console.error("[AdvisoryMonitor] Failed to notify owner:", error);
    }
  }

  checkAnalyzeResponse(response: any, routeName: string): boolean {
    this.stats.totalChecks++;
    this.stats.lastCheckTime = new Date();

    let passed = true;

    if (!response.kind || response.kind !== "advisory") {
      this.alert(
        AlertLevel.CRITICAL,
        `CRITICAL: Response from ${routeName} missing kind="advisory"`,
        { response, routeName }
      );
      passed = false;
    }

    if (!response.auditRef || typeof response.auditRef !== "string") {
      this.alert(
        AlertLevel.CRITICAL,
        `CRITICAL: Response from ${routeName} missing auditRef`,
        { response, routeName }
      );
      passed = false;
    }

    if (!response.advisoryNotice || response.advisoryNotice !== ADVISORY_NOTICE) {
      this.alert(
        AlertLevel.CRITICAL,
        `CRITICAL: Response from ${routeName} missing or incorrect ADVISORY_NOTICE`,
        { response, routeName }
      );
      passed = false;
    }

    if (response.gaps && Array.isArray(response.gaps)) {
      response.gaps.forEach((gap: any, index: number) => {
        if (!gap.controlCode || !gap.articleCode) {
          this.alert(
            AlertLevel.ERROR,
            `ERROR: Gap #${index} in ${routeName} missing citations`,
            { gap, routeName, index }
          );
          passed = false;
        }

        if (!gap.controlText || !gap.articleText) {
          this.alert(
            AlertLevel.ERROR,
            `ERROR: Gap #${index} in ${routeName} missing citation texts`,
            { gap, routeName, index }
          );
          passed = false;
        }
      });
    }

    if (!response.frameworkId || !response.frameworkName) {
      this.alert(
        AlertLevel.WARNING,
        `WARNING: Response from ${routeName} missing frameworkId or frameworkName`,
        { response, routeName }
      );
    }

    if (!response.generatedAt) {
      this.alert(
        AlertLevel.WARNING,
        `WARNING: Response from ${routeName} missing generatedAt timestamp`,
        { response, routeName }
      );
    }

    if (passed) {
      this.stats.passedChecks++;
      this.alert(
        AlertLevel.INFO,
        `PASS: Response from ${routeName} passed all checks`,
        { routeName }
      );
    } else {
      this.stats.failedChecks++;
    }

    return passed;
  }

  checkGapReportResponse(response: any, routeName: string): boolean {
    this.stats.totalChecks++;
    this.stats.lastCheckTime = new Date();

    let passed = true;

    if (!response.kind || response.kind !== "advisory") {
      this.alert(
        AlertLevel.CRITICAL,
        `CRITICAL: Gap report from ${routeName} missing kind="advisory"`,
        { response, routeName }
      );
      passed = false;
    }

    if (!response.advisoryNotice || response.advisoryNotice !== ADVISORY_NOTICE) {
      this.alert(
        AlertLevel.CRITICAL,
        `CRITICAL: Gap report from ${routeName} missing or incorrect ADVISORY_NOTICE`,
        { response, routeName }
      );
      passed = false;
    }

    if (passed) {
      this.stats.passedChecks++;
      this.alert(
        AlertLevel.INFO,
        `PASS: Gap report from ${routeName} passed all checks`,
        { routeName }
      );
    } else {
      this.stats.failedChecks++;
    }

    return passed;
  }

  getStats(): MonitorStats {
    return { ...this.stats };
  }

  resetStats(): void {
    this.stats = {
      totalChecks: 0,
      passedChecks: 0,
      failedChecks: 0,
      alerts: [],
      lastCheckTime: new Date(),
    };
  }

  getCriticalAlerts(): MonitorAlert[] {
    return this.stats.alerts.filter(
      (a) => a.level === AlertLevel.CRITICAL || a.level === AlertLevel.ERROR
    );
  }

  getHealthReport(): {
    healthy: boolean;
    totalChecks: number;
    passRate: number;
    criticalAlerts: number;
    lastCheckTime: Date;
  } {
    const criticalAlerts = this.getCriticalAlerts().length;
    const passRate =
      this.stats.totalChecks > 0
        ? (this.stats.passedChecks / this.stats.totalChecks) * 100
        : 100;

    return {
      healthy: criticalAlerts === 0 && passRate >= 95,
      totalChecks: this.stats.totalChecks,
      passRate,
      criticalAlerts,
      lastCheckTime: this.stats.lastCheckTime,
    };
  }

  private startAutoCleanup(): void {
    this.cleanupOldAlerts();

    this.cleanupTimer = setInterval(() => {
      this.cleanupOldAlerts();
    }, this.CLEANUP_INTERVAL_MS);

    console.log(
      "[AdvisoryMonitor] Auto-cleanup started (runs every 24 hours, keeps last 90 days)"
    );
  }

  stopAutoCleanup(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
      console.log("[AdvisoryMonitor] Auto-cleanup stopped");
    }
  }

  private cleanupOldAlerts(): void {
    const cutoffTime = Date.now() - this.MAX_ALERT_AGE_MS;
    const beforeCount = this.stats.alerts.length;

    this.stats.alerts = this.stats.alerts.filter(
      (alert) => new Date(alert.timestamp).getTime() >= cutoffTime
    );

    const afterCount = this.stats.alerts.length;
    const deletedCount = beforeCount - afterCount;

    if (deletedCount > 0) {
      console.log(
        `[AdvisoryMonitor] Cleaned up ${deletedCount} old alerts (older than 90 days)`
      );
    }
  }

  manualCleanup(maxAgeDays: number = 90): number {
    const cutoffTime = Date.now() - maxAgeDays * 24 * 60 * 60 * 1000;
    const beforeCount = this.stats.alerts.length;

    this.stats.alerts = this.stats.alerts.filter(
      (alert) => new Date(alert.timestamp).getTime() >= cutoffTime
    );

    const afterCount = this.stats.alerts.length;
    const deletedCount = beforeCount - afterCount;

    console.log(
      `[AdvisoryMonitor] Manual cleanup: deleted ${deletedCount} alerts (older than ${maxAgeDays} days)`
    );

    return deletedCount;
  }
}

export const advisoryMonitor = new AdvisoryMonitor();

export function createAdvisoryMonitorMiddleware() {
  return async function monitorMiddleware(opts: {
    path: string;
    type: string;
    next: () => Promise<any>;
  }) {
    const result = await opts.next();

    if (
      opts.path.includes("analyzeDocument") ||
      opts.path.includes("advisory.analyzeDocument") ||
      opts.path.includes("diagnostic.analyzeDocument")
    ) {
      const responseToCheck = result.analysis || result;
      advisoryMonitor.checkAnalyzeResponse(responseToCheck, opts.path);
    }

    if (opts.path.includes("getGapReport")) {
      advisoryMonitor.checkGapReportResponse(result, opts.path);
    }

    return result;
  };
}

export function validateAdvisoryResponse(
  response: any,
  routeName: string = "unknown"
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!response.kind || response.kind !== "advisory") {
    errors.push("Missing or incorrect kind (expected 'advisory')");
  }

  if (!response.auditRef) {
    errors.push("Missing auditRef");
  }

  if (!response.advisoryNotice || response.advisoryNotice !== ADVISORY_NOTICE) {
    errors.push("Missing or incorrect ADVISORY_NOTICE");
  }

  if (response.gaps && Array.isArray(response.gaps)) {
    response.gaps.forEach((gap: any, index: number) => {
      if (!gap.controlCode || !gap.articleCode) {
        errors.push(`Gap #${index} missing citations`);
      }
      if (!gap.controlText || !gap.articleText) {
        errors.push(`Gap #${index} missing citation texts`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
