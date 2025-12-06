import {
  createRole, 
  createPermission,
  createPackage,
  getAllRoles,
  getAllPackages,
  getDb,
} from "./db";
import { organizations } from "../drizzle/schema";

/**
 * ============================================
 * Seed الأدوار الأساسية
 * ============================================
 */

export async function seedRoles() {
  console.log("[Seed] بدء seed الأدوار...");
  
  const existingRoles = await getAllRoles();
  if (existingRoles.length > 0) {
    console.log("[Seed] الأدوار موجودة مسبقاً، تخطي...");
    return;
  }

  // الحصول على أول مؤسسة من قاعدة البيانات
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const [org] = await db.select().from(organizations).limit(1);
  if (!org) {
    throw new Error("No organization found. Please seed organizations first.");
  }

  const roles = [
    {
      organizationId: org.id,
      name: "مدير النظام",
      description: "صلاحيات كاملة على النظام",
      permissions: "صلاحيات كاملة على النظام",
    },
    {
      organizationId: org.id,
      name: "مدير المؤسسة",
      description: "إدارة المؤسسة والمستخدمين",
      permissions: "إدارة المؤسسة والمستخدمين",
    },
    {
      organizationId: org.id,
      name: "محامي رئيسي",
      description: "مسؤول عن الجوانب القانونية للمشاريع",
      permissions: "مسؤول عن الجوانب القانونية",
    },
    {
      organizationId: org.id,
      name: "استشاري تقني رئيسي",
      description: "مسؤول عن الجوانب التقنية للمشاريع",
      permissions: "مسؤول عن الجوانب التقنية",
    },
    {
      organizationId: org.id,
      name: "مدير مشروع",
      description: "إدارة المشاريع والمهام",
      permissions: "إدارة المشاريع والمهام",
    },
    {
      organizationId: org.id,
      name: "محامي",
      description: "تنفيذ المهام القانونية",
      permissions: "تنفيذ المهام القانونية",
    },
    {
      organizationId: org.id,
      name: "استشاري تقني",
      description: "تنفيذ المهام التقنية",
      permissions: "تنفيذ المهام التقنية",
    },
    {
      organizationId: org.id,
      name: "دعم فني",
      description: "تقديم الدعم الفني للعملاء",
      permissions: "تقديم الدعم الفني",
    },
    {
      organizationId: org.id,
      name: "عميل",
      description: "مستخدم عميل",
      permissions: "صلاحيات محدودة",
    },
  ];

  for (const role of roles) {
    await createRole(role);
    console.log(`[Seed] تم إنشاء دور: ${role.name}`);
  }

  console.log("[Seed] اكتمل seed الأدوار ✅");
}

/**
 * ============================================
 * Seed الباقات الأساسية
 * ============================================
 */

export async function seedPackages() {
  console.log("[Seed] بدء seed الباقات...");
  
  const existingPackages = await getAllPackages();
  if (existingPackages.length > 0) {
    console.log("[Seed] الباقات موجودة مسبقاً، تخطي...");
    return;
  }

  const packages = [
    {
      name: "Starter Package",
      description: "الباقة الأساسية للشركات الصغيرة",
      price: 1500,
      currency: "SAR",
      billingCycle: "monthly" as const,
      features: "الميزات الأساسية",
      status: "active" as const,
    },
    {
      name: "Growth Package",
      description: "الباقة المتوسطة للشركات المتنامية",
      price: 4000,
      currency: "SAR",
      billingCycle: "quarterly" as const,
      features: "ميزات متقدمة",
      status: "active" as const,
    },
    {
      name: "Enterprise Package",
      description: "الباقة الشاملة للشركات الكبرى",
      price: 30000,
      currency: "SAR",
      billingCycle: "annual" as const,
      features: "جميع الميزات",
      status: "active" as const,
    },
  ];

  for (const pkg of packages) {
    await createPackage(pkg);
    console.log(`[Seed] تم إنشاء باقة: ${pkg.name}`);
  }

  console.log("[Seed] اكتمل seed الباقات ✅");
}

/**
 * ============================================
 * تشغيل جميع Seed الأساسية
 * ============================================
 */

export async function runCommercialSeeds() {
  try {
    console.log("\n========================================");
    console.log("🌱 بدء Seed البيانات الأساسية...");
    console.log("========================================\n");

    await seedRoles();
    await seedPackages();

    console.log("\n========================================");
    console.log("✅ اكتمل Seed البيانات الأساسية!");
    console.log("========================================\n");
  } catch (error) {
    console.error("\n❌ Seed failed:", error);
    throw error;
  }
}
