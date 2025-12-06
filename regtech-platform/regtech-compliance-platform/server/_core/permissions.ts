import { TRPCError } from "@trpc/server";
import type { TrpcContext } from "./context";
import { getRoleById, getPermissionsByRoleId } from "../db";

/**
 * التحقق من أن المستخدم لديه organizationId
 */
export function requireOrganization(ctx: TrpcContext): number {
  if (!ctx.organizationId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "يجب أن تكون مرتبطاً بمؤسسة للوصول لهذه الخدمة",
    });
  }
  return ctx.organizationId;
}

/**
 * التحقق من أن المستخدم لديه roleId
 */
export function requireRole(ctx: TrpcContext): number {
  if (!ctx.roleId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "يجب أن يكون لديك دور محدد للوصول لهذه الخدمة",
    });
  }
  return ctx.roleId;
}

/**
 * التحقق من أن المستخدم لديه صلاحية معينة
 */
export async function requirePermission(
  ctx: TrpcContext,
  resource: string,
  action: "create" | "read" | "update" | "delete" | "export" | "approve"
): Promise<void> {
  const roleId = requireRole(ctx);

  // جلب صلاحيات الدور
  const permissions = await getPermissionsByRoleId(roleId);

  // التحقق من وجود الصلاحية
  const hasPermission = permissions.some(
    p => p.resource === resource && p.action === action
  );

  if (!hasPermission) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: `ليس لديك صلاحية ${action} على ${resource}`,
    });
  }
}

/**
 * التحقق من أن المستخدم لديه أي صلاحية على resource
 */
export async function requireAnyPermission(
  ctx: TrpcContext,
  resource: string,
  actions: Array<"create" | "read" | "update" | "delete" | "export" | "approve">
): Promise<void> {
  const roleId = requireRole(ctx);

  // جلب صلاحيات الدور
  const permissions = await getPermissionsByRoleId(roleId);

  // التحقق من وجود أي صلاحية
  const hasAnyPermission = permissions.some(
    p => p.resource === resource && actions.includes(p.action)
  );

  if (!hasAnyPermission) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: `ليس لديك أي من الصلاحيات المطلوبة على ${resource}`,
    });
  }
}

/**
 * التحقق من أن المستخدم لديه مستوى دور معين أو أعلى
 */
export async function requireRoleLevel(
  ctx: TrpcContext,
  minLevel: number
): Promise<void> {
  const roleId = requireRole(ctx);

  // جلب معلومات الدور
  const role = await getRoleById(roleId);

  if (!role) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "دور غير صالح",
    });
  }

  if (role.level < minLevel) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: `يتطلب مستوى دور ${minLevel} أو أعلى`,
    });
  }
}

/**
 * التحقق من أن البيانات تنتمي لنفس مؤسسة المستخدم
 */
export function ensureSameOrganization(
  ctx: TrpcContext,
  dataOrganizationId: number | null
): void {
  const userOrgId = requireOrganization(ctx);

  if (dataOrganizationId !== userOrgId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "ليس لديك صلاحية الوصول لبيانات مؤسسة أخرى",
    });
  }
}

/**
 * Helper: الحصول على organizationId من context أو رمي خطأ
 */
export function getOrganizationId(ctx: TrpcContext): number {
  return requireOrganization(ctx);
}

/**
 * Helper: الحصول على roleId من context أو رمي خطأ
 */
export function getRoleId(ctx: TrpcContext): number {
  return requireRole(ctx);
}
