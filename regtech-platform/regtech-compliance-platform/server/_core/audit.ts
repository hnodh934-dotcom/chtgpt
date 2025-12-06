import { getDb } from "../db";
import { auditLogs, type InsertAuditLog } from "../../drizzle/schema";

/**
 * تسجيل عملية في Audit Log
 */
export async function logAudit(params: {
  userId?: number;
  organizationId?: number;
  resource: string;
  resourceId?: number;
  action: "create" | "read" | "update" | "delete";
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  status?: "success" | "failure";
  errorMessage?: string;
}): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Audit] Cannot log: database not available");
    return;
  }

  try {
    const log: InsertAuditLog = {
      userId: params.userId,
      organizationId: params.organizationId,
      resource: params.resource,
      resourceId: params.resourceId,
      action: params.action,
      changes: params.changes ? JSON.stringify(params.changes) : null,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
      status: params.status || "success",
      errorMessage: params.errorMessage,
    };

    await db.insert(auditLogs).values(log);
  } catch (error) {
    console.error("[Audit] Failed to log:", error);
    // لا نرمي خطأ لأن فشل التسجيل لا يجب أن يوقف العملية الأساسية
  }
}

/**
 * استخراج IP address من request
 */
export function getClientIp(req: any): string | undefined {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.headers["x-real-ip"] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress
  );
}

/**
 * استخراج User Agent من request
 */
export function getUserAgent(req: any): string | undefined {
  return req.headers["user-agent"];
}
