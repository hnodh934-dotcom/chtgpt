import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { rateLimiters } from "./_core/rateLimit";
import { systemRouter } from "./_core/systemRouter";
import { regAdvisorRouter } from "./regAdvisorRouter";
import { regDrafterRouter } from "./regDrafterRouter";
import { raacRouter } from "./raacRouter";
import { contactRouter } from "./contactRouter";
import { blogRouter } from "./blogRouter";
import { newsletterRouter } from "./newsletterRouter";
import { amlRouter } from "./routers/aml";
import { kycRouter } from "./routers/kyc";
import { complianceRouter } from "./routers/compliance";
import { protectedProcedure, publicProcedure, router, requireOrganizationProcedure, requirePermissionProcedure } from "./_core/trpc";
import { FEATURE_FLAGS, requireFeatureMiddleware, getAllFeatureFlagsInfo } from "./_core/featureFlags";
import { 
  getAllFrameworks, 
  getFrameworkById, 
  getAllControls,
  getControlById,
  getControlsByFrameworkId,
  getAllArticles,
  getArticleById,
  getArticlesByControlId,
  getAllProvisions,
  getProvisionById,
  getProvisionsByArticleId,
  getAllEdges,
  // Roles & Permissions
  getAllRoles,
  getRoleById,
  createRole,
  getPermissionsByRoleId,
  createPermission,
  // Projects & Tasks
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  getTasksByProjectId,
  getTasksByAssignee,
  createTask,
  updateTask,
  // Packages & Subscriptions
  getAllPackages,
  getPackageById,
  createPackage,
  getSubscriptionsByOrganizationId,
  getActiveSubscription,
  createSubscription,
  // Invoices & Payments
  getInvoicesByOrganizationId,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  getPaymentsByInvoiceId,
  createPayment,
  // Documents & Meetings
  getMeetingsByOrganizationId,
  getMeetingsByProjectId,
  createMeeting,
  // Support Tickets
  getSupportTicketsByOrganizationId,
  getSupportTicketById,
  createSupportTicket,
  updateSupportTicket,
  getRepliesByTicketId,
  createSupportReply,
  // Leads
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  // Audit Logs
  getAuditLogs,
  getAuditLogById,
} from "./db";
import { z } from "zod";
import { diagnosticRouter } from "./diagnosticRouter";
import { advisoryRouter } from "./advisoryRouter";
import { monitorRouter } from "./monitorRouter";
import { complianceRouter } from "./complianceRouter";
import { notificationsRouter } from "./notificationsRouter";

export const appRouter = router({
  regAdvisor: regAdvisorRouter,
  regDrafter: regDrafterRouter,
  raac: raacRouter,
  compliance: complianceRouter,
  notifications: notificationsRouter,
  system: systemRouter,
  diagnostic: diagnosticRouter,
  advisory: advisoryRouter,
  monitor: monitorRouter,
  contact: contactRouter,
  blog: blogRouter,
  newsletter: newsletterRouter,
  
  auth: router({
    me: publicProcedure.use(rateLimiters.standard).query(opts => opts.ctx.user),
    logout: publicProcedure.use(rateLimiters.strict).mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Frameworks API
  frameworks: router({
    list: publicProcedure.query(async () => {
      return await getAllFrameworks();
    }),
    
    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getFrameworkById(input.id);
      }),
  }),

  // Controls API
  controls: router({
    list: publicProcedure
      .input(z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
      }).optional())
      .query(async ({ input }) => {
        const page = input?.page || 1;
        const limit = input?.limit || 20;
        const offset = (page - 1) * limit;
        
        const allControls = await getAllControls();
        const total = allControls.length;
        const controls = allControls.slice(offset, offset + limit);
        
        return {
          controls,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        };
      }),
    
    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getControlById(input.id);
      }),
    
    listByFramework: publicProcedure
      .input(z.object({ frameworkId: z.number() }))
      .query(async ({ input }) => {
        return await getControlsByFrameworkId(input.frameworkId);
      }),
  }),

  // Articles API
  articles: router({
    list: publicProcedure
      .input(z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
      }).optional())
      .query(async ({ input }) => {
        const page = input?.page || 1;
        const limit = input?.limit || 20;
        const offset = (page - 1) * limit;
        
        const allArticles = await getAllArticles();
        const total = allArticles.length;
        const articles = allArticles.slice(offset, offset + limit);
        
        return {
          articles,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        };
      }),
    
    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getArticleById(input.id);
      }),
    
    listByControl: publicProcedure
      .input(z.object({ controlId: z.number() }))
      .query(async ({ input }) => {
        return await getArticlesByControlId(input.controlId);
      }),
  }),

  // Provisions API
  provisions: router({
    list: publicProcedure.query(async () => {
      return await getAllProvisions();
    }),
    
    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getProvisionById(input.id);
      }),
    
    listByArticle: publicProcedure
      .input(z.object({ articleId: z.number() }))
      .query(async ({ input }) => {
        return await getProvisionsByArticleId(input.articleId);
      }),
  }),

  // Edges API
  edges: router({
    list: publicProcedure.query(async () => {
      return await getAllEdges();
    }),
  }),

  // Roles API
  roles: router({
    list: protectedProcedure.query(async () => {
      return await getAllRoles();
    }),
    
    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getRoleById(input.id);
      }),
    
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        description: z.string().optional(),
        level: z.number(),
        isSystem: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        return await createRole(input);
      }),
  }),

  // Permissions API
  permissions: router({
    listByRole: protectedProcedure
      .input(z.object({ roleId: z.number() }))
      .query(async ({ input }) => {
        return await getPermissionsByRoleId(input.roleId);
      }),
    
    create: protectedProcedure
      .input(z.object({
        roleId: z.number(),
        resource: z.string(),
        action: z.enum(['create', 'read', 'update', 'delete', 'export', 'approve']),
        scope: z.enum(['own', 'organization', 'all']).optional(),
      }))
      .mutation(async ({ input }) => {
        return await createPermission(input);
      }),
  }),

  // Projects API
  projects: router({
    list: requireOrganizationProcedure
      .input(z.object({ organizationId: z.number().optional() }))
      .query(async ({ ctx, input }) => {
        // استخدام organizationId من context لضمان multi-tenancy
        const orgId = input.organizationId || ctx.organizationId!;
        return await getAllProjects(orgId);
      }),
    
    get: requirePermissionProcedure("projects", "read")
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getProjectById(input.id);
      }),
    
    create: requirePermissionProcedure("projects", "create")
      .input(z.object({
        organizationId: z.number(),
        name: z.string(),
        description: z.string().optional(),
        type: z.enum(['assessment', 'implementation', 'audit', 'consulting', 'training']),
        status: z.enum(['lead', 'proposal', 'contracted', 'kickoff', 'in_progress', 'review', 'completed', 'cancelled']).optional(),
        priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // استخدام organizationId من context
        const data = { ...input, organizationId: ctx.organizationId! };
        return await createProject(data);
      }),
    
    update: requirePermissionProcedure("projects", "update")
      .input(z.object({
        id: z.number(),
        data: z.object({
          status: z.enum(['lead', 'proposal', 'contracted', 'kickoff', 'in_progress', 'review', 'completed', 'cancelled']).optional(),
          progress: z.number().optional(),
          notes: z.string().optional(),
        }),
      }))
      .mutation(async ({ input }) => {
        return await updateProject(input.id, input.data);
      }),
  }),

  // Tasks API
  tasks: router({
    listByProject: requirePermissionProcedure("tasks", "read")
      .input(z.object({ projectId: z.number() }))
      .query(async ({ input }) => {
        return await getTasksByProjectId(input.projectId);
      }),
    
    listByAssignee: requirePermissionProcedure("tasks", "read")
      .input(z.object({ assignedTo: z.number() }))
      .query(async ({ input }) => {
        return await getTasksByAssignee(input.assignedTo);
      }),
    
    create: requirePermissionProcedure("tasks", "create")
      .input(z.object({
        projectId: z.number(),
        assignedTo: z.number(),
        title: z.string(),
        description: z.string().optional(),
        type: z.enum(['analysis', 'documentation', 'review', 'meeting', 'training', 'other']),
        priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
        createdBy: z.number(),
      }))
      .mutation(async ({ input }) => {
        return await createTask(input);
      }),
    
    update: requirePermissionProcedure("tasks", "update")
      .input(z.object({
        id: z.number(),
        data: z.object({
          status: z.enum(['todo', 'in_progress', 'blocked', 'review', 'completed', 'cancelled']).optional(),
          notes: z.string().optional(),
        }),
      }))
      .mutation(async ({ input }) => {
        return await updateTask(input.id, input.data);
      }),
  }),

  // Packages API
  packages: router({
    list: publicProcedure.query(async () => {
      return await getAllPackages();
    }),
    
    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getPackageById(input.id);
      }),
    
    create: protectedProcedure
      .input(z.object({
        code: z.string(),
        name: z.string(),
        description: z.string().optional(),
        type: z.enum(['starter', 'growth', 'enterprise', 'custom']),
        priceMin: z.string(),
        priceMax: z.string().optional(),
        supportLevel: z.enum(['basic', 'standard', 'premium', 'dedicated']),
      }))
      .mutation(async ({ input }) => {
        return await createPackage(input);
      }),
  }),

  // Subscriptions API (Feature Flag Protected)
  subscriptions: router({
    listByOrganization: requirePermissionProcedure("subscriptions", "read")
      .use(requireFeatureMiddleware(FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED))
      .input(z.object({ organizationId: z.number() }))
      .query(async ({ input }) => {
        return await getSubscriptionsByOrganizationId(input.organizationId);
      }),
    
    getActive: requirePermissionProcedure("subscriptions", "read")
      .use(requireFeatureMiddleware(FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED))
      .input(z.object({ organizationId: z.number() }))
      .query(async ({ input }) => {
        return await getActiveSubscription(input.organizationId);
      }),
    
    create: requirePermissionProcedure("subscriptions", "create")
      .input(z.object({
        organizationId: z.number(),
        packageId: z.number().optional(),
        type: z.enum(['monthly_basic', 'monthly_advanced', 'monthly_premium', 'annual_basic', 'annual_advanced', 'annual_premium']),
        price: z.string(),
        billingCycle: z.enum(['monthly', 'quarterly', 'annually']),
        startDate: z.date(),
      }))
      .mutation(async ({ input }) => {
        return await createSubscription(input);
      }),
  }),

  // Invoices API (Feature Flag Protected)
  invoices: router({
    listByOrganization: requirePermissionProcedure("invoices", "read")
      .use(requireFeatureMiddleware(FEATURE_FLAGS.INVOICES_ENABLED))
      .input(z.object({ organizationId: z.number() }))
      .query(async ({ input }) => {
        return await getInvoicesByOrganizationId(input.organizationId);
      }),
    
    get: requirePermissionProcedure("invoices", "read")
      .use(requireFeatureMiddleware(FEATURE_FLAGS.INVOICES_ENABLED))
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getInvoiceById(input.id);
      }),
    
    create: requirePermissionProcedure("invoices", "create")
      .input(z.object({
        organizationId: z.number(),
        projectId: z.number().optional(),
        subscriptionId: z.number().optional(),
        invoiceNumber: z.string(),
        type: z.enum(['project_milestone', 'subscription', 'additional_services', 'custom']),
        issueDate: z.date(),
        dueDate: z.date(),
        subtotal: z.string(),
        taxRate: z.string(),
        taxAmount: z.string(),
        total: z.string(),
        amountDue: z.string(),
        createdBy: z.number(),
      }))
      .mutation(async ({ input }) => {
        return await createInvoice(input);
      }),
    
    update: requirePermissionProcedure("invoices", "update")
      .input(z.object({
        id: z.number(),
        data: z.object({
          status: z.enum(['draft', 'sent', 'viewed', 'partial', 'paid', 'overdue', 'cancelled']).optional(),
          amountPaid: z.string().optional(),
        }),
      }))
      .mutation(async ({ input }) => {
        return await updateInvoice(input.id, input.data);
      }),
  }),

  // Payments API (Feature Flag Protected)
  payments: router({
    listByInvoice: requirePermissionProcedure("payments", "read")
      .use(requireFeatureMiddleware(FEATURE_FLAGS.PAYMENTS_ENABLED))
      .input(z.object({ invoiceId: z.number() }))
      .query(async ({ input }) => {
        return await getPaymentsByInvoiceId(input.invoiceId);
      }),
    
    create: requirePermissionProcedure("payments", "create")
      .use(requireFeatureMiddleware(FEATURE_FLAGS.PAYMENTS_ENABLED))
      .input(z.object({
        invoiceId: z.number(),
        organizationId: z.number(),
        paymentNumber: z.string(),
        method: z.enum(['bank_transfer', 'credit_card', 'debit_card', 'online_payment', 'cash', 'check']),
        amount: z.string(),
      }))
      .mutation(async ({ input }) => {
        return await createPayment(input);
      }),
  }),



  // Meetings API
  meetings: router({
    listByOrganization: requirePermissionProcedure("meetings", "read")
      .input(z.object({ organizationId: z.number() }))
      .query(async ({ input }) => {
        return await getMeetingsByOrganizationId(input.organizationId);
      }),
    
    listByProject: requirePermissionProcedure("meetings", "read")
      .input(z.object({ projectId: z.number() }))
      .query(async ({ input }) => {
        return await getMeetingsByProjectId(input.projectId);
      }),
    
    create: requirePermissionProcedure("meetings", "create")
      .input(z.object({
        organizationId: z.number(),
        projectId: z.number().optional(),
        title: z.string(),
        description: z.string().optional(),
        type: z.enum(['discovery', 'kickoff', 'progress', 'review', 'training', 'support', 'other']),
        startTime: z.date(),
        endTime: z.date(),
        organizerId: z.number(),
      }))
      .mutation(async ({ input }) => {
        return await createMeeting(input);
      }),
  }),

  // Support Tickets API
  supportTickets: router({
    listByOrganization: requirePermissionProcedure("support", "read")
      .input(z.object({ organizationId: z.number() }))
      .query(async ({ input }) => {
        return await getSupportTicketsByOrganizationId(input.organizationId);
      }),
    
    get: requirePermissionProcedure("support", "read")
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getSupportTicketById(input.id);
      }),
    
    create: requirePermissionProcedure("support", "create")
      .input(z.object({
        organizationId: z.number(),
        ticketNumber: z.string(),
        subject: z.string(),
        description: z.string(),
        type: z.enum(['technical', 'billing', 'general', 'feature_request', 'bug_report']),
        priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
        createdBy: z.number(),
      }))
      .mutation(async ({ input }) => {
        return await createSupportTicket(input);
      }),
    
    update: requirePermissionProcedure("support", "update")
      .input(z.object({
        id: z.number(),
        data: z.object({
          status: z.enum(['open', 'in_progress', 'waiting_customer', 'resolved', 'closed']).optional(),
          assignedTo: z.number().optional(),
        }),
      }))
      .mutation(async ({ input }) => {
        return await updateSupportTicket(input.id, input.data);
      }),
  }),

  // Support Replies API
  supportReplies: router({
    listByTicket: requirePermissionProcedure("support", "read")
      .input(z.object({ ticketId: z.number() }))
      .query(async ({ input }) => {
        return await getRepliesByTicketId(input.ticketId);
      }),
    
    create: requirePermissionProcedure("support", "create")
      .input(z.object({
        ticketId: z.number(),
        userId: z.number(),
        message: z.string(),
        isInternal: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        return await createSupportReply(input);
      }),
  }),

  // Leads API
  leads: router({
    list: requirePermissionProcedure("leads", "read").query(async () => {
      return await getAllLeads();
    }),
    
    get: requirePermissionProcedure("leads", "read")
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getLeadById(input.id);
      }),
    
    create: publicProcedure
      .input(z.object({
        companyName: z.string(),
        contactName: z.string(),
        contactEmail: z.string().email(),
        contactPhone: z.string().optional(),
        position: z.string().optional(),
        industry: z.string().optional(),
        source: z.enum(['website', 'referral', 'linkedin', 'email', 'phone', 'event', 'other']),
      }))
      .mutation(async ({ input }) => {
        return await createLead(input);
      }),
    
    update: requirePermissionProcedure("leads", "update")
      .input(z.object({
        id: z.number(),
        data: z.object({
          status: z.enum(['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost']).optional(),
          assignedTo: z.number().optional(),
          notes: z.string().optional(),
        }),
      }))
      .mutation(async ({ input }) => {
        return await updateLead(input.id, input.data);
      }),
  }),

  // ============================================================================
  // Audit Logs
  // ============================================================================
  auditLogs: router({
    list: requirePermissionProcedure("audit_logs", "read")
      .input(z.object({
        resource: z.string().optional(),
        action: z.enum(["create", "read", "update", "delete"]).optional(),
        limit: z.number().min(1).max(1000).optional(),
        offset: z.number().min(0).optional(),
      }).optional())
      .query(async ({ ctx, input }) => {
        return await getAuditLogs({
          organizationId: ctx.user?.organizationId || undefined,
          resource: input?.resource,
          action: input?.action,
          limit: input?.limit,
          offset: input?.offset,
        });
      }),

    getById: requirePermissionProcedure("audit_logs", "read")
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getAuditLogById(input.id);
      }),
   }),

  // AML/CTF Router
  aml: amlRouter,

  // KYC Router
  kyc: kycRouter,

  // Compliance Router
  compliance: complianceRouter,
});
export type AppRouter = typeof appRouter;
