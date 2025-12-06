import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, int, varchar, text, timestamp, mysqlEnum, boolean } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const analysisResults = mysqlTable("analysisResults", {
	id: int().autoincrement().notNull(),
	organizationId: int().notNull(),
	assessmentId: int(),
	analysisType: varchar({ length: 100 }).notNull(),
	result: text(),
	score: int(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
},
(table) => [
	index("analysis_org_idx").on(table.organizationId),
	index("analysis_assessment_idx").on(table.assessmentId),
]);

export const articles = mysqlTable("articles", {
	id: int().autoincrement().notNull(),
	frameworkId: int().notNull(),
	articleNumber: varchar({ length: 50 }).notNull(),
	title: varchar({ length: 255 }).notNull(),
	content: text().notNull(),
	status: mysqlEnum(['draft','active','archived']).default('active').notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("article_framework_idx").on(table.frameworkId),
	index("article_number_idx").on(table.articleNumber),
]);

export const assessments = mysqlTable("assessments", {
	id: int().autoincrement().notNull(),
	organizationId: int().notNull(),
	projectId: int(),
	frameworkId: int().notNull(),
	status: mysqlEnum(['draft','in_progress','completed','archived']).default('draft').notNull(),
	complianceScore: int(),
	startDate: timestamp({ mode: 'string' }),
	dueDate: timestamp({ mode: 'string' }),
	completedDate: timestamp({ mode: 'string' }),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("assessment_org_idx").on(table.organizationId),
	index("assessment_project_idx").on(table.projectId),
	index("assessment_framework_idx").on(table.frameworkId),
	index("assessment_status_idx").on(table.status),
]);

export const auditLogs = mysqlTable("audit_logs", {
	id: int().autoincrement().notNull(),
	userId: int(),
	organizationId: int(),
	resource: varchar({ length: 100 }).notNull(),
	resourceId: int(),
	action: varchar({ length: 100 }).notNull(),
	changes: text(),
	ipAddress: varchar({ length: 45 }),
	userAgent: text(),
	status: mysqlEnum(['success','failure']).default('success').notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
},
(table) => [
	index("audit_user_idx").on(table.userId),
	index("audit_org_idx").on(table.organizationId),
	index("audit_resource_idx").on(table.resource),
	index("audit_created_idx").on(table.createdAt),
]);

export const blogPosts = mysqlTable("blogPosts", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	slug: varchar({ length: 255 }).notNull(),
	content: text().notNull(),
	author: varchar({ length: 100 }),
	status: mysqlEnum(['draft','published','archived']).default('draft').notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("blogPosts_slug_unique").on(table.slug),
]);

export const controlAssessments = mysqlTable("control_assessments", {
	id: int().autoincrement().notNull(),
	assessmentId: int().notNull(),
	controlId: int().notNull(),
	status: mysqlEnum(['not_assessed','compliant','non_compliant','partial','not_applicable']).default('not_assessed').notNull(),
	evidence: text(),
	notes: text(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("ca_assessment_idx").on(table.assessmentId),
	index("ca_control_idx").on(table.controlId),
]);

export const controls = mysqlTable("controls", {
	id: int().autoincrement().notNull(),
	frameworkId: int().notNull(),
	code: varchar({ length: 50 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	category: varchar({ length: 100 }),
	priority: mysqlEnum(['low','medium','high','critical']).default('medium').notNull(),
	status: mysqlEnum(['draft','active','archived']).default('active').notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("framework_idx").on(table.frameworkId),
	index("control_code_idx").on(table.code),
	index("category_idx").on(table.category),
	index("priority_idx").on(table.priority),
]);

export const edges = mysqlTable("edges", {
	id: int().autoincrement().notNull(),
	controlId: int().notNull(),
	articleId: int().notNull(),
	relationshipType: mysqlEnum(['implements','references','requires','related']).default('related').notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
},
(table) => [
	index("edge_control_idx").on(table.controlId),
	index("edge_article_idx").on(table.articleId),
]);

export const evidence = mysqlTable("evidence", {
	id: int().autoincrement().notNull(),
	organizationId: int().notNull(),
	controlAssessmentId: int(),
	title: varchar({ length: 255 }).notNull(),
	description: text(),
	documentUrl: varchar({ length: 500 }),
	documentType: varchar({ length: 50 }),
	uploadedBy: int(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("evidence_org_idx").on(table.organizationId),
	index("evidence_ca_idx").on(table.controlAssessmentId),
]);

export const frameworks = mysqlTable("frameworks", {
	id: int().autoincrement().notNull(),
	code: varchar({ length: 50 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	authority: varchar({ length: 255 }),
	sector: varchar({ length: 100 }),
	category: mysqlEnum(['law','regulation','standard','guideline','policy']).notNull(),
	effectiveDate: timestamp({ mode: 'string' }),
	lastUpdated: timestamp({ mode: 'string' }),
	version: varchar({ length: 20 }).default('1.0').notNull(),
	status: mysqlEnum(['draft','active','archived','superseded']).default('active').notNull(),
	officialUrl: varchar({ length: 500 }),
	documentUrl: varchar({ length: 500 }),
	priority: mysqlEnum(['low','medium','high','critical']).default('medium').notNull(),
	isPublic: boolean('isPublic').default(true).notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("frameworks_code_unique").on(table.code),
	index("code_idx").on(table.code),
	index("sector_idx").on(table.sector),
	index("status_idx").on(table.status),
]);

export const invoices = mysqlTable("invoices", {
	id: int().autoincrement().notNull(),
	organizationId: int().notNull(),
	subscriptionId: int(),
	invoiceNumber: varchar({ length: 50 }).notNull(),
	amount: int().notNull(),
	currency: varchar({ length: 3 }).default('SAR').notNull(),
	status: mysqlEnum(['draft','sent','paid','overdue','cancelled']).default('draft').notNull(),
	issueDate: timestamp({ mode: 'string' }),
	dueDate: timestamp({ mode: 'string' }),
	paidDate: timestamp({ mode: 'string' }),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("invoices_invoiceNumber_unique").on(table.invoiceNumber),
	index("invoice_org_idx").on(table.organizationId),
	index("invoice_subscription_idx").on(table.subscriptionId),
	index("invoice_status_idx").on(table.status),
]);

export const leads = mysqlTable("leads", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 320 }).notNull(),
	phone: varchar({ length: 20 }),
	company: varchar({ length: 255 }),
	message: text(),
	status: mysqlEnum(['new','contacted','qualified','converted','rejected']).default('new').notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("lead_email_idx").on(table.email),
	index("lead_status_idx").on(table.status),
]);

export const meetings = mysqlTable("meetings", {
	id: int().autoincrement().notNull(),
	organizationId: int().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text(),
	startTime: timestamp({ mode: 'string' }).notNull(),
	endTime: timestamp({ mode: 'string' }),
	location: varchar({ length: 255 }),
	attendees: text(),
	notes: text(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("meeting_org_idx").on(table.organizationId),
	index("meeting_start_idx").on(table.startTime),
]);

export const notifications = mysqlTable("notifications", {
	id: int().autoincrement().notNull(),
	userId: int().notNull(),
	organizationId: int().notNull(),
	title: varchar({ length: 255 }).notNull(),
	message: text().notNull(),
	type: mysqlEnum(['info','warning','error','success']).default('info').notNull(),
	isRead: boolean().default(0).notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
},
(table) => [
	index("notification_user_idx").on(table.userId),
	index("notification_org_idx").on(table.organizationId),
]);

export const organizations = mysqlTable("organizations", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	type: mysqlEnum(['public','private','nonprofit','government']).notNull(),
	sector: varchar({ length: 100 }),
	size: mysqlEnum(['small','medium','large','enterprise']),
	country: varchar({ length: 2 }).default('SA').notNull(),
	city: varchar({ length: 100 }),
	website: varchar({ length: 255 }),
	contactEmail: varchar({ length: 320 }),
	contactPhone: varchar({ length: 20 }),
	isActive: boolean().default(1).notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("name_idx").on(table.name),
	index("sector_idx").on(table.sector),
]);

export const packages = mysqlTable("packages", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	price: int().notNull(),
	currency: varchar({ length: 3 }).default('SAR').notNull(),
	billingCycle: mysqlEnum(['monthly','quarterly','annual']).notNull(),
	features: text(),
	status: mysqlEnum(['active','inactive','archived']).default('active').notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
});

export const payments = mysqlTable("payments", {
	id: int().autoincrement().notNull(),
	invoiceId: int().notNull(),
	organizationId: int().notNull(),
	amount: int().notNull(),
	currency: varchar({ length: 3 }).default('SAR').notNull(),
	paymentMethod: mysqlEnum(['credit_card','bank_transfer','check','other']).notNull(),
	status: mysqlEnum(['pending','completed','failed','refunded']).default('pending').notNull(),
	transactionId: varchar({ length: 100 }),
	notes: text(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("payment_invoice_idx").on(table.invoiceId),
	index("payment_org_idx").on(table.organizationId),
	index("payment_status_idx").on(table.status),
]);

export const permissions = mysqlTable("permissions", {
	id: int().autoincrement().notNull(),
	resource: varchar({ length: 100 }).notNull(),
	action: varchar({ length: 100 }).notNull(),
	description: text(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
},
(table) => [
	index("permission_resource_idx").on(table.resource),
]);

export const projects = mysqlTable("projects", {
	id: int().autoincrement().notNull(),
	organizationId: int().notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	status: mysqlEnum(['planning','active','paused','completed','archived']).default('active').notNull(),
	startDate: timestamp({ mode: 'string' }),
	endDate: timestamp({ mode: 'string' }),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("project_org_idx").on(table.organizationId),
	index("project_status_idx").on(table.status),
]);

export const provisions = mysqlTable("provisions", {
	id: int().autoincrement().notNull(),
	frameworkId: int().notNull(),
	code: varchar({ length: 50 }).notNull(),
	title: varchar({ length: 255 }).notNull(),
	content: text(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("provision_framework_idx").on(table.frameworkId),
	index("provision_code_idx").on(table.code),
]);

export const reports = mysqlTable("reports", {
	id: int().autoincrement().notNull(),
	organizationId: int().notNull(),
	assessmentId: int(),
	title: varchar({ length: 255 }).notNull(),
	reportType: mysqlEnum(['compliance','gap_analysis','audit','executive_summary','detailed']).notNull(),
	status: mysqlEnum(['draft','published','archived']).default('draft').notNull(),
	content: text(),
	generatedDate: timestamp({ mode: 'string' }),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("report_org_idx").on(table.organizationId),
	index("report_assessment_idx").on(table.assessmentId),
]);

export const roles = mysqlTable("roles", {
	id: int().autoincrement().notNull(),
	organizationId: int().notNull(),
	name: varchar({ length: 100 }).notNull(),
	description: text(),
	permissions: text(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("role_org_idx").on(table.organizationId),
]);

export const subscriptions = mysqlTable("subscriptions", {
	id: int().autoincrement().notNull(),
	organizationId: int().notNull(),
	packageId: int().notNull(),
	status: mysqlEnum(['active','paused','cancelled','expired']).default('active').notNull(),
	startDate: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	endDate: timestamp({ mode: 'string' }),
	autoRenew: boolean().default(1).notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("subscription_org_idx").on(table.organizationId),
	index("subscription_package_idx").on(table.packageId),
]);

export const supportReplies = mysqlTable("support_replies", {
	id: int().autoincrement().notNull(),
	ticketId: int().notNull(),
	userId: int().notNull(),
	message: text().notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("reply_ticket_idx").on(table.ticketId),
	index("reply_user_idx").on(table.userId),
]);

export const supportTickets = mysqlTable("support_tickets", {
	id: int().autoincrement().notNull(),
	organizationId: int().notNull(),
	userId: int().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	priority: mysqlEnum(['low','medium','high','critical']).default('medium').notNull(),
	status: mysqlEnum(['open','in_progress','resolved','closed']).default('open').notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("ticket_org_idx").on(table.organizationId),
	index("ticket_user_idx").on(table.userId),
	index("ticket_status_idx").on(table.status),
]);

export const tasks = mysqlTable("tasks", {
	id: int().autoincrement().notNull(),
	organizationId: int().notNull(),
	projectId: int(),
	assignedTo: int(),
	title: varchar({ length: 255 }).notNull(),
	description: text(),
	status: mysqlEnum(['todo','in_progress','review','done']).default('todo').notNull(),
	priority: mysqlEnum(['low','medium','high','critical']).default('medium').notNull(),
	dueDate: timestamp({ mode: 'string' }),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	index("task_org_idx").on(table.organizationId),
	index("task_project_idx").on(table.projectId),
	index("task_assigned_idx").on(table.assignedTo),
	index("task_status_idx").on(table.status),
]);

export const users = mysqlTable("users", {
	id: int().autoincrement().notNull(),
	openId: varchar({ length: 64 }).notNull(),
	name: text(),
	email: varchar({ length: 320 }),
	loginMethod: varchar({ length: 64 }),
	roleId: int(),
	organizationId: int(),
	isActive: boolean().default(1).notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	lastSignedIn: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
},
(table) => [
	index("users_openId_unique").on(table.openId),
	index("email_idx").on(table.email),
	index("organization_idx").on(table.organizationId),
	index("role_idx").on(table.roleId),
]);
import {
  int,
  varchar,
  text,
  timestamp,
  boolean,
  mysqlEnum,
  mysqlTable,
  json,
  decimal,
} from "drizzle-orm/mysql-core";

/**
 * 🏦 SAMA & CMA Compliance Tables
 * متطلبات البنك المركزي السعودي وهيئة السوق المالية
 */

// ============================================
// AML/CTF - مكافحة غسل الأموال وتمويل الإرهاب
// ============================================

export const amlChecks = mysqlTable("aml_checks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  checkType: mysqlEnum("checkType", [
    "initial_kyc",
    "periodic_review",
    "transaction_monitoring",
    "sanctions_screening",
  ]).notNull(),
  status: mysqlEnum("status", ["pending", "passed", "failed", "review"]).notNull(),
  riskLevel: mysqlEnum("riskLevel", ["low", "medium", "high", "critical"]).notNull(),
  details: json("details"),
  checkDate: timestamp("checkDate").notNull(),
  expiryDate: timestamp("expiryDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const sanctionsList = mysqlTable("sanctions_list", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameAr: varchar("nameAr", { length: 255 }),
  sanctionType: mysqlEnum("sanctionType", [
    "OFAC",
    "UN",
    "EU",
    "SAMA",
    "LOCAL",
  ]).notNull(),
  country: varchar("country", { length: 100 }),
  reason: text("reason"),
  listDate: timestamp("listDate").notNull(),
  status: mysqlEnum("status", ["active", "removed", "expired"]).notNull(),
  sourceUrl: varchar("sourceUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const suspiciousTransactions = mysqlTable("suspicious_transactions", {
  id: int("id").autoincrement().primaryKey(),
  transactionId: int("transactionId"),
  userId: int("userId").notNull(),
  amount: decimal("amount", { precision: 20, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull(),
  reason: text("reason").notNull(),
  riskScore: decimal("riskScore", { precision: 5, scale: 2 }).notNull(),
  status: mysqlEnum("status", [
    "pending",
    "under_review",
    "reported",
    "cleared",
    "blocked",
  ]).notNull(),
  reportedToSAMA: boolean("reportedToSAMA").default(false),
  reportDate: timestamp("reportDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ============================================
// KYC - اعرف عميلك
// ============================================

export const kycDocuments = mysqlTable("kyc_documents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  documentType: mysqlEnum("documentType", [
    "national_id",
    "passport",
    "driver_license",
    "residence_permit",
  ]).notNull(),
  documentNumber: varchar("documentNumber", { length: 100 }).notNull(),
  issuedDate: timestamp("issuedDate"),
  expiryDate: timestamp("expiryDate"),
  documentUrl: varchar("documentUrl", { length: 500 }),
  verificationStatus: mysqlEnum("verificationStatus", [
    "pending",
    "verified",
    "rejected",
    "expired",
  ]).notNull(),
  verifiedBy: int("verifiedBy"),
  verificationDate: timestamp("verificationDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const customerRiskProfile = mysqlTable("customer_risk_profile", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  riskLevel: mysqlEnum("riskLevel", ["low", "medium", "high", "critical"]).notNull(),
  riskFactors: json("riskFactors"),
  pep: boolean("pep").default(false), // Politically Exposed Person
  pepDetails: text("pepDetails"),
  businessType: varchar("businessType", { length: 100 }),
  sourceOfFunds: varchar("sourceOfFunds", { length: 255 }),
  expectedTransactionVolume: decimal("expectedTransactionVolume", { precision: 20, scale: 2 }),
  lastReviewDate: timestamp("lastReviewDate"),
  nextReviewDate: timestamp("nextReviewDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ============================================
// Security & Data Protection - الأمان والبيانات
// ============================================

export const dataEncryption = mysqlTable("data_encryption", {
  id: int("id").autoincrement().primaryKey(),
  dataType: mysqlEnum("dataType", [
    "personal_data",
    "financial_data",
    "transaction_data",
    "document_data",
  ]).notNull(),
  encryptionMethod: varchar("encryptionMethod", { length: 100 }).notNull(),
  encryptionKeyId: varchar("encryptionKeyId", { length: 255 }).notNull(),
  encryptionDate: timestamp("encryptionDate").notNull(),
  decryptionAttempts: int("decryptionAttempts").default(0),
  lastDecryptionDate: timestamp("lastDecryptionDate"),
  status: mysqlEnum("status", ["active", "rotated", "archived"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const auditLog = mysqlTable("audit_log", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  action: varchar("action", { length: 255 }).notNull(),
  entityType: varchar("entityType", { length: 100 }).notNull(),
  entityId: int("entityId"),
  oldValue: json("oldValue"),
  newValue: json("newValue"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  status: mysqlEnum("status", ["success", "failure"]).notNull(),
  reason: text("reason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const securityIncidents = mysqlTable("security_incidents", {
  id: int("id").autoincrement().primaryKey(),
  incidentType: mysqlEnum("incidentType", [
    "data_breach",
    "unauthorized_access",
    "malware",
    "ddos",
    "other",
  ]).notNull(),
  severity: mysqlEnum("severity", ["low", "medium", "high", "critical"]).notNull(),
  description: text("description").notNull(),
  affectedUsers: int("affectedUsers"),
  affectedData: text("affectedData"),
  detectionDate: timestamp("detectionDate").notNull(),
  reportedToAuthorities: boolean("reportedToAuthorities").default(false),
  reportDate: timestamp("reportDate"),
  resolutionDate: timestamp("resolutionDate"),
  status: mysqlEnum("status", [
    "detected",
    "investigating",
    "resolved",
    "closed",
  ]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ============================================
// Regulatory Reporting - التقارير التنظيمية
// ============================================

export const regulatoryReports = mysqlTable("regulatory_reports", {
  id: int("id").autoincrement().primaryKey(),
  reportType: mysqlEnum("reportType", [
    "aml_ctf",
    "transaction_report",
    "customer_report",
    "incident_report",
    "compliance_report",
  ]).notNull(),
  authority: mysqlEnum("authority", ["SAMA", "CMA", "NCSC", "OTHER"]).notNull(),
  reportPeriod: varchar("reportPeriod", { length: 50 }).notNull(),
  data: json("data").notNull(),
  submissionStatus: mysqlEnum("submissionStatus", [
    "draft",
    "ready",
    "submitted",
    "acknowledged",
    "rejected",
  ]).notNull(),
  submissionDate: timestamp("submissionDate"),
  referenceNumber: varchar("referenceNumber", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ============================================
// Investor Protection - حماية المستثمر
// ============================================

export const investorRiskProfile = mysqlTable("investor_risk_profile", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  riskTolerance: mysqlEnum("riskTolerance", [
    "conservative",
    "moderate",
    "aggressive",
  ]).notNull(),
  investmentExperience: mysqlEnum("investmentExperience", [
    "beginner",
    "intermediate",
    "advanced",
  ]).notNull(),
  financialSituation: varchar("financialSituation", { length: 100 }),
  investmentObjective: text("investmentObjective"),
  timeHorizon: varchar("timeHorizon", { length: 50 }),
  profileDate: timestamp("profileDate").notNull(),
  lastReviewDate: timestamp("lastReviewDate"),
  nextReviewDate: timestamp("nextReviewDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const disclosures = mysqlTable("disclosures", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("productId"),
  disclosureType: mysqlEnum("disclosureType", [
    "risk_disclosure",
    "fee_disclosure",
    "conflict_of_interest",
    "terms_and_conditions",
  ]).notNull(),
  content: text("content").notNull(),
  contentAr: text("contentAr"),
  version: int("version").default(1),
  effectiveDate: timestamp("effectiveDate").notNull(),
  expiryDate: timestamp("expiryDate"),
  status: mysqlEnum("status", ["active", "archived"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const complaints = mysqlTable("complaints", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  complaintType: mysqlEnum("complaintType", [
    "service_issue",
    "fee_dispute",
    "unauthorized_transaction",
    "data_privacy",
    "other",
  ]).notNull(),
  description: text("description").notNull(),
  attachments: json("attachments"),
  status: mysqlEnum("status", [
    "submitted",
    "under_review",
    "resolved",
    "closed",
  ]).notNull(),
  resolution: text("resolution"),
  resolutionDate: timestamp("resolutionDate"),
  compensationAmount: decimal("compensationAmount", { precision: 20, scale: 2 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ============================================
// Types
// ============================================

export type AMLCheck = typeof amlChecks.$inferSelect;
export type InsertAMLCheck = typeof amlChecks.$inferInsert;

export type SanctionsList = typeof sanctionsList.$inferSelect;
export type InsertSanctionsList = typeof sanctionsList.$inferInsert;

export type SuspiciousTransaction = typeof suspiciousTransactions.$inferSelect;
export type InsertSuspiciousTransaction = typeof suspiciousTransactions.$inferInsert;

export type KYCDocument = typeof kycDocuments.$inferSelect;
export type InsertKYCDocument = typeof kycDocuments.$inferInsert;

export type CustomerRiskProfile = typeof customerRiskProfile.$inferSelect;
export type InsertCustomerRiskProfile = typeof customerRiskProfile.$inferInsert;

export type DataEncryption = typeof dataEncryption.$inferSelect;
export type InsertDataEncryption = typeof dataEncryption.$inferInsert;

export type AuditLog = typeof auditLog.$inferSelect;
export type InsertAuditLog = typeof auditLog.$inferInsert;

export type SecurityIncident = typeof securityIncidents.$inferSelect;
export type InsertSecurityIncident = typeof securityIncidents.$inferInsert;

export type RegulatoryReport = typeof regulatoryReports.$inferSelect;
export type InsertRegulatoryReport = typeof regulatoryReports.$inferInsert;

export type InvestorRiskProfile = typeof investorRiskProfile.$inferSelect;
export type InsertInvestorRiskProfile = typeof investorRiskProfile.$inferInsert;

export type Disclosure = typeof disclosures.$inferSelect;
export type InsertDisclosure = typeof disclosures.$inferInsert;

export type Complaint = typeof complaints.$inferSelect;
export type InsertComplaint = typeof complaints.$inferInsert;
