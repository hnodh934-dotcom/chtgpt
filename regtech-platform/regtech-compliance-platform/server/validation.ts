/**
 * Zod Validation Schemas
 * 
 * Centralized validation schemas for all tRPC procedures
 * Provides type-safe input validation and error handling
 */

import { z } from 'zod';

// ==================== Common Schemas ====================

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(1000).default(50),
});

export const idSchema = z.number().int().positive();

export const frameworkIdSchema = z.number().int().positive();

export const prioritySchema = z.enum(['critical', 'high', 'medium', 'low']);

export const categorySchema = z.enum([
  'Data Protection',
  'Technical Controls',
  'Operational Controls',
  'Governance',
  'Risk Management',
  'Compliance',
]);

// ==================== RegAdvisor Schemas ====================

export const regAdvisorAskSchema = z.object({
  question: z.string().min(10).max(2000),
  frameworkId: z.number().int().positive().optional(),
  conversationId: z.string().uuid().optional(),
});

export const regAdvisorFeedbackSchema = z.object({
  responseId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  feedback: z.string().max(1000).optional(),
});

// ==================== RegDrafter Schemas ====================

export const regDrafterDraftSchema = z.object({
  framework: z.string().min(2).max(50),
  template: z.string().min(2).max(100),
  companyName: z.string().min(2).max(200),
  industry: z.string().min(2).max(100),
  requirements: z.string().max(5000).optional(),
  language: z.enum(['ar', 'en']).default('ar'),
});

export const regDrafterReviewSchema = z.object({
  policyText: z.string().min(100).max(50000),
  framework: z.string().min(2).max(50),
});

// ==================== RaaC Schemas ====================

export const raacExportSchema = z.object({
  frameworkId: z.number().int().positive(),
  format: z.enum(['json', 'xml', 'yaml', 'openapi']),
  includeMetadata: z.boolean().default(true),
});

export const raacValidateSchema = z.object({
  frameworkId: z.number().int().positive(),
  data: z.record(z.string(), z.unknown()),
});

// ==================== Framework Schemas ====================

export const frameworkListSchema = z.object({
  category: z.enum(['regulation', 'standard', 'guideline']).optional(),
  sector: z.string().optional(),
  priority: prioritySchema.optional(),
});

export const frameworkDetailsSchema = z.object({
  id: idSchema,
});

// ==================== Control Schemas ====================

export const controlListSchema = paginationSchema.extend({
  frameworkId: frameworkIdSchema.optional(),
  category: categorySchema.optional(),
  priority: prioritySchema.optional(),
  search: z.string().max(200).optional(),
});

export const controlDetailsSchema = z.object({
  id: idSchema,
});

// ==================== Assessment Schemas ====================

export const assessmentCreateSchema = z.object({
  frameworkId: frameworkIdSchema,
  organizationId: z.number().int().positive(),
  name: z.string().min(3).max(200),
  description: z.string().max(1000).optional(),
  dueDate: z.date().optional(),
});

export const assessmentUpdateSchema = z.object({
  id: idSchema,
  status: z.enum(['draft', 'in_progress', 'completed', 'archived']).optional(),
  score: z.number().min(0).max(100).optional(),
  findings: z.string().max(5000).optional(),
});

// ==================== Monitor Schemas ====================

export const monitorAlertSchema = z.object({
  frameworkId: frameworkIdSchema.optional(),
  level: z.enum(['critical', 'warning', 'info']).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export const monitorOverrideSchema = z.object({
  alertId: z.number().int().positive(),
  override: z.boolean(),
  reason: z.string().min(10).max(500),
});

// ==================== Analysis Schemas ====================

export const analysisRunSchema = z.object({
  frameworkId: frameworkIdSchema,
  documentUrl: z.string().url().optional(),
  documentText: z.string().min(100).max(100000).optional(),
  analysisType: z.enum(['compliance', 'gap', 'risk']).default('compliance'),
});

// ==================== Audit Schemas ====================

export const auditLogSchema = z.object({
  action: z.string().min(2).max(100),
  entityType: z.string().min(2).max(50),
  entityId: z.number().int().positive().optional(),
  details: z.record(z.string(), z.unknown()).optional(),
});

export const auditQuerySchema = paginationSchema.extend({
  userId: z.number().int().positive().optional(),
  action: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

// ==================== Export Types ====================

export type PaginationInput = z.infer<typeof paginationSchema>;
export type RegAdvisorAskInput = z.infer<typeof regAdvisorAskSchema>;
export type RegDrafterDraftInput = z.infer<typeof regDrafterDraftSchema>;
export type RaacExportInput = z.infer<typeof raacExportSchema>;
export type ControlListInput = z.infer<typeof controlListSchema>;
export type AssessmentCreateInput = z.infer<typeof assessmentCreateSchema>;
export type MonitorAlertInput = z.infer<typeof monitorAlertSchema>;
export type AnalysisRunInput = z.infer<typeof analysisRunSchema>;
export type AuditLogInput = z.infer<typeof auditLogSchema>;
