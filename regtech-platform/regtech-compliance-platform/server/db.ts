import { eq, and, or, inArray, sql, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  frameworks, InsertFramework,
  controls, InsertControl,
  articles, InsertArticle,
  provisions, InsertProvision,
  edges, InsertEdge,
  organizations, InsertOrganization,
  assessments, InsertAssessment,
  controlAssessments, InsertControlAssessment,
  evidence, InsertEvidence,
  reports, InsertReport,
  notifications, InsertNotification,
  auditLogs, InsertAuditLog,
  invoices, InsertInvoice,
  payments, InsertPayment,
  meetings, InsertMeeting,
  supportTickets, InsertSupportTicket,
  supportReplies, InsertSupportReply,
  tasks, InsertTask,
  projects, InsertProject,
  roles, InsertRole,
  permissions, InsertPermission,
  subscriptions, InsertSubscription,
  packages, InsertPackage,
  leads, InsertLead,
  blogPosts, InsertBlogPost,
  analysisResults, InsertAnalysisResult,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

/**
 * ============================================
 * إدارة المستخدمين
 * User Management
 * ============================================
 */

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.roleId !== undefined) {
      values.roleId = user.roleId;
      updateSet.roleId = user.roleId;
    }
    // TODO: تعيين roleId للمالك تلقائياً
    if (user.organizationId !== undefined) {
      values.organizationId = user.organizationId;
      updateSet.organizationId = user.organizationId;
    }
    // language and timezone removed - not in schema

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * ============================================
 * إدارة المؤسسات
 * Organization Management
 * ============================================
 */

export async function createOrganization(org: InsertOrganization) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db.insert(organizations).values(org);
    // Drizzle returns the inserted row with id, not insertId
    // For TiDB/MySQL, we need to query back the inserted row
    if (org.name) {
      const inserted = await db.select().from(organizations)
        .where(eq(organizations.name, org.name))
        .limit(1);
      if (inserted.length > 0) {
        return inserted[0].id;
      }
    }
    throw new Error("Failed to retrieve inserted organization ID");
  } catch (error) {
    console.error("[Database] Failed to create organization:", error);
    throw error;
  }
}

export async function getOrganizationById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(organizations).where(eq(organizations.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllOrganizations() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(organizations);
}

/**
 * ============================================
 * إدارة الأطر التنظيمية
 * Framework Management
 * ============================================
 */

export async function createFramework(framework: InsertFramework) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(frameworks).values(framework);
  return result.insertId;
}

export async function getFrameworkById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(frameworks).where(eq(frameworks.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getFrameworkByCode(code: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(frameworks).where(eq(frameworks.code, code)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllFrameworks() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(frameworks).orderBy(frameworks.code);
}

/**
 * ============================================
 * إدارة الضوابط
 * Control Management
 * ============================================
 */

export async function createControl(control: InsertControl) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(controls).values(control);
  return result.insertId;
}

export async function getControlById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(controls).where(eq(controls.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getControlsByFrameworkId(frameworkId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(controls).where(eq(controls.frameworkId, frameworkId)).orderBy(controls.order);
}

/**
 * ============================================
 * إدارة التقييمات
 * Assessment Management
 * ============================================
 */

export async function createAssessment(assessment: InsertAssessment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(assessments).values(assessment);
  return result.insertId;
}

export async function getAssessmentById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(assessments).where(eq(assessments.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAssessmentsByOrganizationId(organizationId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(assessments).where(eq(assessments.organizationId, organizationId));
}

/**
 * ============================================
 * إدارة تقييمات الضوابط
 * Control Assessment Management
 * ============================================
 */

export async function createControlAssessment(controlAssessment: InsertControlAssessment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(controlAssessments).values(controlAssessment);
  return result.insertId;
}

export async function getControlAssessmentsByAssessmentId(assessmentId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(controlAssessments).where(eq(controlAssessments.assessmentId, assessmentId));
}

/**
 * ============================================
 * إدارة الأدلة
 * Evidence Management
 * ============================================
 */

export async function createEvidence(evidenceData: InsertEvidence) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(evidence).values(evidenceData);
  return result.insertId;
}

export async function getEvidenceByControlAssessmentId(controlAssessmentId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(evidence).where(eq(evidence.controlAssessmentId, controlAssessmentId));
}



/**
 * ============================================
 * إدارة التقارير
 * Report Management
 * ============================================
 */

export async function createReport(report: InsertReport) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(reports).values(report);
  return result.insertId;
}

export async function getReportsByAssessmentId(assessmentId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(reports).where(eq(reports.assessmentId, assessmentId));
}

/**
 * ============================================
 * إدارة الإشعارات
 * Notification Management
 * ============================================
 */

export async function createNotification(notification: InsertNotification) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(notifications).values(notification);
  return result.insertId;
}

export async function getNotificationsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(notifications).where(eq(notifications.userId, userId));
}

/**
 * ============================================
 * إدارة سجلات التدقيق
 * Audit Log Management
 * ============================================
 */

export async function createAuditLog(log: InsertAuditLog) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(auditLogs).values(log);
  return result.insertId;
}

export async function getAuditLogsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(auditLogs).where(eq(auditLogs.userId, userId));
}

/**
 * ============================================
 * إدارة الطبقات الأربع (Frameworks, Controls, Articles, Provisions)
 * Four-Layer Management
 * ============================================
 */

// Controls - additional functions
export async function getAllControls() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(controls);
}

// Articles
export async function getAllArticles() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(articles);
}

export async function getArticleById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  return result[0] || null;
}

export async function getArticlesByControlId(controlId: number) {
  const db = await getDb();
  if (!db) return [];
  
  // Get edges where fromType is control and fromId matches
  const edgeResults = await db.select().from(edges).where(
    and(
      eq(edges.fromType, 'control'),
      eq(edges.fromId, controlId),
      eq(edges.toType, 'article'),
      eq(edges.relationType, 'basedOn')
    )
  );
  
  if (edgeResults.length === 0) return [];
  
  // Extract article IDs
  const articleIds = edgeResults.map(edge => edge.toId);
  
  if (articleIds.length === 0) return [];
  
  // Get articles by IDs
  return await db.select().from(articles).where(
    sql`${articles.id} IN (${sql.join(articleIds.map(id => sql`${id}`), sql`, `)})`
  );
}

// Provisions
export async function getAllProvisions() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(provisions);
}

export async function getProvisionById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(provisions).where(eq(provisions.id, id)).limit(1);
  return result[0] || null;
}

export async function getProvisionsByArticleId(articleId: number) {
  const db = await getDb();
  if (!db) return [];
  
  // Get edges where fromType is article and fromId matches
  const edgeResults = await db.select().from(edges).where(
    and(
      eq(edges.fromType, 'article'),
      eq(edges.fromId, articleId),
      eq(edges.toType, 'provision'),
      eq(edges.relationType, 'restricts')
    )
  );
  
  if (edgeResults.length === 0) return [];
  
  // Extract provision IDs
  const provisionIds = edgeResults.map(edge => edge.toId);
  
  if (provisionIds.length === 0) return [];
  
  // Get provisions by IDs
  return await db.select().from(provisions).where(
    sql`${provisions.id} IN (${sql.join(provisionIds.map(id => sql`${id}`), sql`, `)})`
  );
}

// Edges (Relations)
export async function getAllEdges() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(edges);
}

/**
 * ============================================
 * إدارة الأدوار والصلاحيات
 * Roles & Permissions Management
 * ============================================
 */

import { 
  roles, InsertRole,
  permissions, InsertPermission,
  projects, InsertProject,
  tasks, InsertTask,
  packages, InsertPackage,
  subscriptions, InsertSubscription,

  supportReplies, InsertSupportReply,
  leads, InsertLead,
} from "../drizzle/schema";

// Roles
export async function getAllRoles() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(roles);
}

export async function getRoleById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(roles).where(eq(roles.id, id)).limit(1);
  return result[0] || null;
}

export async function createRole(role: InsertRole) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(roles).values(role);
  return result;
}

// Permissions
export async function getPermissionsByRoleId(roleId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(permissions).where(eq(permissions.roleId, roleId));
}

export async function createPermission(permission: InsertPermission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(permissions).values(permission);
  return result;
}

/**
 * ============================================
 * إدارة المشاريع والمهام
 * Projects & Tasks Management
 * ============================================
 */

// Projects
export async function getAllProjects(organizationId?: number) {
  const db = await getDb();
  if (!db) return [];
  if (organizationId) {
    return await db.select().from(projects).where(eq(projects.organizationId, organizationId));
  }
  return await db.select().from(projects);
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result[0] || null;
}

export async function createProject(project: InsertProject) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(projects).values(project);
  return result;
}

export async function updateProject(id: number, project: Partial<InsertProject>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(projects).set(project).where(eq(projects.id, id));
  return result;
}

// Tasks
export async function getTasksByProjectId(projectId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(tasks).where(eq(tasks.projectId, projectId));
}

export async function getTasksByAssignee(assignedTo: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(tasks).where(eq(tasks.assignedTo, assignedTo));
}

export async function createTask(task: InsertTask) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(tasks).values(task);
  return result;
}

export async function updateTask(id: number, task: Partial<InsertTask>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(tasks).set(task).where(eq(tasks.id, id));
  return result;
}

/**
 * ============================================
 * إدارة الباقات والاشتراكات
 * Packages & Subscriptions Management
 * ============================================
 */

// Packages
export async function getAllPackages() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(packages).where(eq(packages.status, 'active'));
}

export async function getPackageById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(packages).where(eq(packages.id, id)).limit(1);
  return result[0] || null;
}

export async function createPackage(pkg: InsertPackage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(packages).values(pkg);
  return result;
}

// Subscriptions
export async function getSubscriptionsByOrganizationId(organizationId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(subscriptions).where(eq(subscriptions.organizationId, organizationId));
}

export async function getActiveSubscription(organizationId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(subscriptions).where(
    and(
      eq(subscriptions.organizationId, organizationId),
      eq(subscriptions.status, 'active')
    )
  ).limit(1);
  return result[0] || null;
}

export async function createSubscription(subscription: InsertSubscription) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(subscriptions).values(subscription);
  return result;
}

/**
 * ============================================
 * إدارة الفواتير والمدفوعات
 * Invoices & Payments Management
 * ============================================
 */

// Invoices
export async function getInvoicesByOrganizationId(organizationId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(invoices).where(eq(invoices.organizationId, organizationId));
}

export async function getInvoiceById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(invoices).where(eq(invoices.id, id)).limit(1);
  return result[0] || null;
}

export async function createInvoice(invoice: InsertInvoice) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(invoices).values(invoice);
  return result;
}

export async function updateInvoice(id: number, invoice: Partial<InsertInvoice>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(invoices).set(invoice).where(eq(invoices.id, id));
  return result;
}

// Payments
export async function getPaymentsByInvoiceId(invoiceId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(payments).where(eq(payments.invoiceId, invoiceId));
}

export async function createPayment(payment: InsertPayment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(payments).values(payment);
  return result;
}

/**
 * ============================================
 * إدارة الوثائق والاجتماعات
 * Documents & Meetings Management
 * ============================================
 */



// Meetings
export async function getMeetingsByOrganizationId(organizationId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(meetings).where(eq(meetings.organizationId, organizationId));
}

export async function getMeetingsByProjectId(projectId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(meetings).where(eq(meetings.projectId, projectId));
}

export async function createMeeting(meeting: InsertMeeting) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(meetings).values(meeting);
  return result;
}

/**
 * ============================================
 * إدارة الدعم والتذاكر
 * Support & Tickets Management
 * ============================================
 */

// Support Tickets
export async function getSupportTicketsByOrganizationId(organizationId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(supportTickets).where(eq(supportTickets.organizationId, organizationId));
}

export async function getSupportTicketById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(supportTickets).where(eq(supportTickets.id, id)).limit(1);
  return result[0] || null;
}

export async function createSupportTicket(ticket: InsertSupportTicket) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(supportTickets).values(ticket);
  return result;
}

export async function updateSupportTicket(id: number, ticket: Partial<InsertSupportTicket>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(supportTickets).set(ticket).where(eq(supportTickets.id, id));
  return result;
}

// Support Replies
export async function getRepliesByTicketId(ticketId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(supportReplies).where(eq(supportReplies.ticketId, ticketId));
}

export async function createSupportReply(reply: InsertSupportReply) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(supportReplies).values(reply);
  return result;
}

/**
 * ============================================
 * إدارة العملاء المحتملين
 * Leads Management
 * ============================================
 */

export async function getAllLeads() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(leads);
}

export async function getLeadById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result[0] || null;
}

export async function createLead(lead: InsertLead) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(leads).values(lead);
  return result;
}

export async function updateLead(id: number, lead: Partial<InsertLead>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(leads).set(lead).where(eq(leads.id, id));
  return result;
}

export async function getRoleByName(name: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(roles).where(eq(roles.name, name)).limit(1);
  return result[0]?.id || null;
}


// ============================================================================
// Audit Log Functions
// ============================================================================

export async function getAuditLogs(params: {
  organizationId?: number;
  userId?: number;
  resource?: string;
  action?: "create" | "read" | "update" | "delete";
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(auditLogs).$dynamic();

  if (params.organizationId) {
    query = query.where(eq(auditLogs.organizationId, params.organizationId));
  }
  if (params.userId) {
    query = query.where(eq(auditLogs.userId, params.userId));
  }
  if (params.resource) {
    query = query.where(eq(auditLogs.resource, params.resource));
  }
  if (params.action) {
    query = query.where(eq(auditLogs.action, params.action));
  }

  const results = await query
    .orderBy(desc(auditLogs.createdAt))
    .limit(params.limit || 100)
    .offset(params.offset || 0);

  return results;
}

export async function getAuditLogById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const results = await db.select().from(auditLogs).where(eq(auditLogs.id, id)).limit(1);
  return results.length > 0 ? results[0] : undefined;
}

/**
 * ============================================
 * Rule Engine Database Queries
 * دوال محرك القواعد القانوني
 * ============================================
 */

/**
 * جلب إطار تنظيمي مع كل التفاصيل (ضوابط، مواد، علاقات)
 */
export async function getFrameworkWithDetails(frameworkId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const frameworkResult = await db.select()
    .from(frameworks)
    .where(eq(frameworks.id, frameworkId))
    .limit(1);
  
  if (frameworkResult.length === 0) return null;
  
  const framework = frameworkResult[0];
  const frameworkControls = await getControlsByFrameworkId(frameworkId);
  const frameworkArticles = await getArticlesByFrameworkId(frameworkId);
  const frameworkEdges = await getEdgesByFramework(frameworkId);
  
  return {
    ...framework,
    controls: frameworkControls,
    articles: frameworkArticles,
    edges: frameworkEdges
  };
}

/**
 * جلب ضوابط مع المواد القانونية المرتبطة
 */
export async function getControlsWithArticles(frameworkId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const frameworkControls = await db.select()
    .from(controls)
    .where(eq(controls.frameworkId, frameworkId))
    .orderBy(controls.order);
  
  const frameworkEdges = await db.select()
    .from(edges)
    .where(
      and(
        eq(edges.fromType, 'control'),
        eq(edges.toType, 'article')
      )
    );
  
  const frameworkArticles = await db.select()
    .from(articles)
    .where(eq(articles.frameworkId, frameworkId));
  
  return frameworkControls.map(control => ({
    ...control,
    relatedArticles: frameworkEdges
      .filter(e => e.fromId === control.id)
      .map(e => frameworkArticles.find(a => a.id === e.toId))
      .filter(Boolean)
  }));
}

/**
 * جلب جميع المواد القانونية لإطار معين
 */
export async function getArticlesByFrameworkId(frameworkId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select()
    .from(articles)
    .where(eq(articles.frameworkId, frameworkId))
    .orderBy(articles.order);
}

/**
 * جلب العلاقات (Edges) لإطار معين
 */
export async function getEdgesByFramework(frameworkId: number) {
  const db = await getDb();
  if (!db) return [];
  
  // جلب جميع الضوابط للإطار
  const frameworkControls = await db.select({ id: controls.id })
    .from(controls)
    .where(eq(controls.frameworkId, frameworkId));
  
  const controlIds = frameworkControls.map(c => c.id);
  
  if (controlIds.length === 0) return [];
  
  // جلب العلاقات المرتبطة بهذه الضوابط
  return await db.select()
    .from(edges)
    .where(
      or(
        inArray(edges.fromId, controlIds),
        inArray(edges.toId, controlIds)
      )
    );
}

/**
 * جلب مادة قانونية بالرمز (Code)
 */
export async function getArticleByCode(frameworkId: number, code: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select()
    .from(articles)
    .where(
      and(
        eq(articles.frameworkId, frameworkId),
        eq(articles.code, code)
      )
    )
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

/**
 * جلب ضابط بالرمز (Code)
 */
export async function getControlByCode(frameworkId: number, code: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select()
    .from(controls)
    .where(
      and(
        eq(controls.frameworkId, frameworkId),
        eq(controls.code, code)
      )
    )
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}
