import { ENV } from "./env";
import { createOrganization, getRoleByName, getUserByOpenId, upsertUser } from "../db";
import type { InsertUser } from "../../drizzle/schema";

/**
 * إنشاء مؤسسة ودور للمستخدم الجديد
 */
export async function onboardNewUser(openId: string, name: string | null, email: string | null): Promise<void> {
  try {
    // التحقق من أن المستخدم غير موجود
    const existingUser = await getUserByOpenId(openId);
    if (existingUser && existingUser.organizationId && existingUser.roleId) {
      // المستخدم موجود ومكتمل
      return;
    }

    // تحديد إذا كان المالك
    const isOwner = openId === ENV.ownerOpenId;

    let organizationId: number;
    let roleId: number;

    if (isOwner) {
      // المالك: إنشاء مؤسسة باسمه وتعيين دور "مدير النظام"
      const orgName = name || email || "مؤسسة المالك";
      const orgId = await createOrganization({
        name: orgName,
        type: "private",
      });
      organizationId = orgId;

      // جلب دور "مدير النظام"
      const systemAdminRole = await getRoleByName("مدير النظام");
      roleId = systemAdminRole || 1; // fallback to 1 if not found
    } else {
      // مستخدم عادي: إنشاء مؤسسة باسمه وتعيين دور "عميل"
      const orgName = name || email || "مؤسسة جديدة";
      const orgId = await createOrganization({
        name: orgName,
        type: "private",
      });
      organizationId = orgId;

      // جلب دور "عميل"
      const clientRole = await getRoleByName("عميل");
      roleId = clientRole || 9; // fallback to 9 (Client role from seed)
    }

    // تحديث المستخدم
    const userData: InsertUser = {
      openId,
      name: name || null,
      email: email || null,
      organizationId,
      roleId,
    };

    await upsertUser(userData);

    console.log(`[Onboarding] User ${openId} onboarded successfully. Org: ${organizationId}, Role: ${roleId}`);
  } catch (error) {
    console.error(`[Onboarding] Failed to onboard user ${openId}:`, error);
    throw error;
  }
}

/**
 * التحقق من اكتمال بيانات المستخدم
 */
export async function ensureUserOnboarded(openId: string, name: string | null, email: string | null): Promise<void> {
  const user = await getUserByOpenId(openId);

  if (!user) {
    // مستخدم جديد تماماً
    await onboardNewUser(openId, name, email);
    return;
  }

  if (!user.organizationId || !user.roleId) {
    // مستخدم موجود لكن بيانات ناقصة
    await onboardNewUser(openId, name, email);
  }
}
