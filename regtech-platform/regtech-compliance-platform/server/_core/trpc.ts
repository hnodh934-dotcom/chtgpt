import { NOT_ADMIN_ERR_MSG, UNAUTHED_ERR_MSG } from '@shared/const';
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

const requireUser = t.middleware(async opts => {
  const { ctx, next } = opts;

  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(requireUser);

export const adminProcedure = t.procedure.use(
  t.middleware(async opts => {
    const { ctx, next } = opts;

    // TODO: استخدام roleId وpermissions بدلاً من role enum
    if (!ctx.user || !ctx.roleId) {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  }),
);

/**
 * Procedure يتطلب صلاحية معينة
 * @param resource - اسم المورد (مثل: "projects", "documents")
 * @param action - نوع العملية (create, read, update, delete, export, approve)
 */
export function requirePermissionProcedure(
  resource: string,
  action: "create" | "read" | "update" | "delete" | "export" | "approve"
) {
  return protectedProcedure.use(
    t.middleware(async opts => {
      const { ctx, next } = opts;
      
      // استيراد dynamically لتجنب circular dependency
      const { requirePermission } = await import("./permissions");
      
      await requirePermission(ctx, resource, action);
      
      return next({ ctx });
    })
  );
}

/**
 * Procedure يتطلب مستوى دور معين
 * @param minLevel - الحد الأدنى لمستوى الدور (1-10)
 */
export function requireRoleLevelProcedure(minLevel: number) {
  return protectedProcedure.use(
    t.middleware(async opts => {
      const { ctx, next } = opts;
      
      const { requireRoleLevel } = await import("./permissions");
      
      await requireRoleLevel(ctx, minLevel);
      
      return next({ ctx });
    })
  );
}

/**
 * Procedure يتطلب organizationId (multi-tenancy)
 */
export const requireOrganizationProcedure = protectedProcedure.use(
  t.middleware(async opts => {
    const { ctx, next } = opts;
    
    const { requireOrganization } = await import("./permissions");
    
    const organizationId = requireOrganization(ctx);
    
    return next({
      ctx: {
        ...ctx,
        organizationId, // ensure it's set
      },
    });
  })
);
