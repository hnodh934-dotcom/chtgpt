/**
 * Simulation Backend - محاكاة Backend كامل
 * 
 * هيكل نظيف قابل للاستبدال لاحقاً بـ Drizzle بدون كسر API
 * 
 * الهيكل:
 * 1. Zod Models (الحقيقة الوحيدة للنوع)
 * 2. Port/Repository Interfaces
 * 3. In-Memory Repositories
 * 4. Use Cases
 * 5. Express HTTP Routes
 * 6. Seed Data
 */

import express from "express";
import { z } from "zod";

// ============================================================================
// 1. Zod Models - الحقيقة الوحيدة للنوع
// ============================================================================

/**
 * مشروع التشخيص
 */
export const DiagnosticProjectSchema = z.object({
  id: z.number(),
  organizationId: z.number(),
  name: z.string(),
  description: z.string().optional(),
  status: z.enum(["draft", "analyzing", "completed", "archived"]),
  overallScore: z.number().min(0).max(100).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  completedAt: z.date().optional(),
});

export type DiagnosticProject = z.infer<typeof DiagnosticProjectSchema>;
export type InsertDiagnosticProject = Omit<DiagnosticProject, "id" | "createdAt" | "updatedAt">;

/**
 * وثيقة مرفوعة
 */
export const DocumentSchema = z.object({
  id: z.number(),
  projectId: z.number(),
  organizationId: z.number(),
  fileName: z.string(),
  fileSize: z.number(),
  fileType: z.string(),
  fileUrl: z.string(),
  category: z.enum(["policies", "financial", "agreements", "licenses", "procedures", "reports", "other"]),
  status: z.enum(["uploaded", "processing", "analyzed", "failed"]),
  uploadedAt: z.date(),
  analyzedAt: z.date().optional(),
});

export type Document = z.infer<typeof DocumentSchema>;
export type InsertDocument = Omit<Document, "id" | "uploadedAt">;

/**
 * نتيجة التحليل
 */
export const AnalysisResultSchema = z.object({
  id: z.number(),
  documentId: z.number(),
  projectId: z.number(),
  frameworkId: z.number(),
  frameworkName: z.string(),
  complianceScore: z.number().min(0).max(100),
  overallAssessment: z.string(),
  gaps: z.array(z.object({
    title: z.string(),
    description: z.string(),
    priority: z.enum(["high", "medium", "low"]),
    affectedControls: z.array(z.string()),
  })),
  recommendations: z.array(z.object({
    title: z.string(),
    description: z.string(),
    priority: z.enum(["high", "medium", "low"]),
    estimatedEffort: z.string(),
  })),
  strengths: z.array(z.string()),
  risks: z.array(z.object({
    risk: z.string(),
    severity: z.enum(["high", "medium", "low"]),
    likelihood: z.enum(["high", "medium", "low"]),
  })),
  financialAnalysis: z.object({
    capitalAdequacy: z.object({
      status: z.enum(["compliant", "partial", "non_compliant"]),
      details: z.string(),
    }),
    liquidityRatios: z.object({
      status: z.enum(["compliant", "partial", "non_compliant"]),
      details: z.string(),
    }),
    financialRisks: z.array(z.string()),
    estimatedCosts: z.object({
      amount: z.number(),
      currency: z.string(),
      breakdown: z.string(),
    }),
    potentialFines: z.object({
      min: z.number(),
      max: z.number(),
      currency: z.string(),
    }),
    recommendations: z.array(z.string()),
  }),
  strategicAnalysis: z.object({
    businessModelAssessment: z.object({
      score: z.number(),
      analysis: z.string(),
    }),
    economicRisks: z.array(z.object({
      risk: z.string(),
      impact: z.enum(["high", "medium", "low"]),
      probability: z.enum(["high", "medium", "low"]),
    })),
    improvementOpportunities: z.array(z.string()),
    complianceROI: z.object({
      timeframe: z.string(),
      expectedReturn: z.string(),
      benefits: z.array(z.string()),
    }),
    alignmentStrategies: z.array(z.string()),
    strategicPriorities: z.array(z.object({
      priority: z.string(),
      rationale: z.string(),
      timeline: z.string(),
    })),
  }),
  analyzedAt: z.date(),
});

export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;
export type InsertAnalysisResult = Omit<AnalysisResult, "id" | "analyzedAt">;

/**
 * خريطة الامتثال
 */
export const ComplianceMapSchema = z.object({
  id: z.number(),
  projectId: z.number(),
  frameworkId: z.number(),
  frameworkName: z.string(),
  frameworkCode: z.string(),
  overallScore: z.number().min(0).max(100),
  controlsTotal: z.number(),
  controlsCompliant: z.number(),
  controlsPartial: z.number(),
  controlsNonCompliant: z.number(),
  gapsCount: z.number(),
  highPriorityGaps: z.number(),
  lastAnalysisDate: z.date(),
});

export type ComplianceMap = z.infer<typeof ComplianceMapSchema>;

// ============================================================================
// 2. Port/Repository Interfaces
// ============================================================================

export interface DiagnosticProjectRepository {
  findById(id: number): Promise<DiagnosticProject | null>;
  findByOrganizationId(organizationId: number): Promise<DiagnosticProject[]>;
  create(data: InsertDiagnosticProject): Promise<DiagnosticProject>;
  update(id: number, data: Partial<DiagnosticProject>): Promise<DiagnosticProject | null>;
  delete(id: number): Promise<boolean>;
}

export interface DocumentRepository {
  findById(id: number): Promise<Document | null>;
  findByProjectId(projectId: number): Promise<Document[]>;
  findByOrganizationId(organizationId: number): Promise<Document[]>;
  create(data: InsertDocument): Promise<Document>;
  update(id: number, data: Partial<Document>): Promise<Document | null>;
  delete(id: number): Promise<boolean>;
}

export interface AnalysisResultRepository {
  findById(id: number): Promise<AnalysisResult | null>;
  findByDocumentId(documentId: number): Promise<AnalysisResult[]>;
  findByProjectId(projectId: number): Promise<AnalysisResult[]>;
  create(data: InsertAnalysisResult): Promise<AnalysisResult>;
}

export interface ComplianceMapRepository {
  findByProjectId(projectId: number): Promise<ComplianceMap[]>;
  findByFrameworkId(projectId: number, frameworkId: number): Promise<ComplianceMap | null>;
}

// ============================================================================
// 3. In-Memory Repositories
// ============================================================================

class InMemoryDiagnosticProjectRepository implements DiagnosticProjectRepository {
  private projects: DiagnosticProject[] = [];
  private nextId = 1;

  async findById(id: number): Promise<DiagnosticProject | null> {
    return this.projects.find(p => p.id === id) || null;
  }

  async findByOrganizationId(organizationId: number): Promise<DiagnosticProject[]> {
    return this.projects.filter(p => p.organizationId === organizationId);
  }

  async create(data: InsertDiagnosticProject): Promise<DiagnosticProject> {
    const project: DiagnosticProject = {
      ...data,
      id: this.nextId++,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.projects.push(project);
    return project;
  }

  async update(id: number, data: Partial<DiagnosticProject>): Promise<DiagnosticProject | null> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.projects[index] = {
      ...this.projects[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.projects[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.projects.splice(index, 1);
    return true;
  }

  // Helper for seeding
  seed(projects: DiagnosticProject[]) {
    this.projects = projects;
    this.nextId = Math.max(...projects.map(p => p.id), 0) + 1;
  }
}

class InMemoryDocumentRepository implements DocumentRepository {
  private documents: Document[] = [];
  private nextId = 1;

  async findById(id: number): Promise<Document | null> {
    return this.documents.find(d => d.id === id) || null;
  }

  async findByProjectId(projectId: number): Promise<Document[]> {
    return this.documents.filter(d => d.projectId === projectId);
  }

  async findByOrganizationId(organizationId: number): Promise<Document[]> {
    return this.documents.filter(d => d.organizationId === organizationId);
  }

  async create(data: InsertDocument): Promise<Document> {
    const document: Document = {
      ...data,
      id: this.nextId++,
      uploadedAt: new Date(),
    };
    this.documents.push(document);
    return document;
  }

  async update(id: number, data: Partial<Document>): Promise<Document | null> {
    const index = this.documents.findIndex(d => d.id === id);
    if (index === -1) return null;
    
    this.documents[index] = {
      ...this.documents[index],
      ...data,
    };
    return this.documents[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.documents.findIndex(d => d.id === id);
    if (index === -1) return false;
    this.documents.splice(index, 1);
    return true;
  }

  // Helper for seeding
  seed(documents: Document[]) {
    this.documents = documents;
    this.nextId = Math.max(...documents.map(d => d.id), 0) + 1;
  }
}

class InMemoryAnalysisResultRepository implements AnalysisResultRepository {
  private results: AnalysisResult[] = [];
  private nextId = 1;

  async findById(id: number): Promise<AnalysisResult | null> {
    return this.results.find(r => r.id === id) || null;
  }

  async findByDocumentId(documentId: number): Promise<AnalysisResult[]> {
    return this.results.filter(r => r.documentId === documentId);
  }

  async findByProjectId(projectId: number): Promise<AnalysisResult[]> {
    return this.results.filter(r => r.projectId === projectId);
  }

  async create(data: InsertAnalysisResult): Promise<AnalysisResult> {
    const result: AnalysisResult = {
      ...data,
      id: this.nextId++,
      analyzedAt: new Date(),
    };
    this.results.push(result);
    return result;
  }

  // Helper for seeding
  seed(results: AnalysisResult[]) {
    this.results = results;
    this.nextId = Math.max(...results.map(r => r.id), 0) + 1;
  }
}

class InMemoryComplianceMapRepository implements ComplianceMapRepository {
  private maps: ComplianceMap[] = [];

  async findByProjectId(projectId: number): Promise<ComplianceMap[]> {
    return this.maps.filter(m => m.projectId === projectId);
  }

  async findByFrameworkId(projectId: number, frameworkId: number): Promise<ComplianceMap | null> {
    return this.maps.find(m => m.projectId === projectId && m.frameworkId === frameworkId) || null;
  }

  // Helper for seeding
  seed(maps: ComplianceMap[]) {
    this.maps = maps;
  }
}

// ============================================================================
// 4. Use Cases
// ============================================================================

class DiagnosticProjectService {
  constructor(private repo: DiagnosticProjectRepository) {}

  async getProject(id: number) {
    return await this.repo.findById(id);
  }

  async getProjectsByOrganization(organizationId: number) {
    return await this.repo.findByOrganizationId(organizationId);
  }

  async createProject(data: InsertDiagnosticProject) {
    return await this.repo.create(data);
  }

  async updateProject(id: number, data: Partial<DiagnosticProject>) {
    return await this.repo.update(id, data);
  }

  async deleteProject(id: number) {
    return await this.repo.delete(id);
  }
}

class DocumentService {
  constructor(private repo: DocumentRepository) {}

  async getDocument(id: number) {
    return await this.repo.findById(id);
  }

  async getDocumentsByProject(projectId: number) {
    return await this.repo.findByProjectId(projectId);
  }

  async getDocumentsByOrganization(organizationId: number) {
    return await this.repo.findByOrganizationId(organizationId);
  }

  async uploadDocument(data: InsertDocument) {
    return await this.repo.create(data);
  }

  async updateDocument(id: number, data: Partial<Document>) {
    return await this.repo.update(id, data);
  }

  async deleteDocument(id: number) {
    return await this.repo.delete(id);
  }
}

class AnalysisService {
  constructor(
    private analysisRepo: AnalysisResultRepository,
    private complianceMapRepo: ComplianceMapRepository
  ) {}

  async getAnalysisResult(id: number) {
    return await this.analysisRepo.findById(id);
  }

  async getAnalysisResultsByDocument(documentId: number) {
    return await this.analysisRepo.findByDocumentId(documentId);
  }

  async getAnalysisResultsByProject(projectId: number) {
    return await this.analysisRepo.findByProjectId(projectId);
  }

  async createAnalysisResult(data: InsertAnalysisResult) {
    return await this.analysisRepo.create(data);
  }

  async getComplianceMap(projectId: number) {
    return await this.complianceMapRepo.findByProjectId(projectId);
  }

  async getComplianceMapByFramework(projectId: number, frameworkId: number) {
    return await this.complianceMapRepo.findByFrameworkId(projectId, frameworkId);
  }
}

// ============================================================================
// 5. Seed Data
// ============================================================================

function seedData(
  projectRepo: InMemoryDiagnosticProjectRepository,
  documentRepo: InMemoryDocumentRepository,
  analysisRepo: InMemoryAnalysisResultRepository,
  complianceMapRepo: InMemoryComplianceMapRepository
) {
  // Seed Projects
  const projects: DiagnosticProject[] = [
    {
      id: 1,
      organizationId: 1,
      name: "تقييم امتثال PDPL",
      description: "تقييم شامل للامتثال لنظام حماية البيانات الشخصية",
      status: "completed",
      overallScore: 72.5,
      createdAt: new Date(Date.now() - 86400000 * 30),
      updatedAt: new Date(Date.now() - 86400000 * 2),
      completedAt: new Date(Date.now() - 86400000 * 2),
    },
    {
      id: 2,
      organizationId: 1,
      name: "تقييم الأمن السيبراني ECC",
      description: "تقييم الامتثال للضوابط الأساسية للأمن السيبراني",
      status: "analyzing",
      overallScore: 65.0,
      createdAt: new Date(Date.now() - 86400000 * 15),
      updatedAt: new Date(Date.now() - 86400000 * 1),
    },
  ];
  projectRepo.seed(projects);

  // Seed Documents
  const documents: Document[] = [
    {
      id: 1,
      projectId: 1,
      organizationId: 1,
      fileName: "سياسة_حماية_البيانات.pdf",
      fileSize: 245000,
      fileType: "pdf",
      fileUrl: "https://storage.example.com/docs/policy-1.pdf",
      category: "policies",
      status: "analyzed",
      uploadedAt: new Date(Date.now() - 86400000 * 28),
      analyzedAt: new Date(Date.now() - 86400000 * 27),
    },
    {
      id: 2,
      projectId: 1,
      organizationId: 1,
      fileName: "النماذج_المالية_2024.xlsx",
      fileSize: 512000,
      fileType: "xlsx",
      fileUrl: "https://storage.example.com/docs/financial-1.xlsx",
      category: "financial",
      status: "analyzed",
      uploadedAt: new Date(Date.now() - 86400000 * 25),
      analyzedAt: new Date(Date.now() - 86400000 * 24),
    },
    {
      id: 3,
      projectId: 2,
      organizationId: 1,
      fileName: "سياسة_الأمن_السيبراني.pdf",
      fileSize: 380000,
      fileType: "pdf",
      fileUrl: "https://storage.example.com/docs/cyber-policy-1.pdf",
      category: "policies",
      status: "processing",
      uploadedAt: new Date(Date.now() - 86400000 * 2),
    },
  ];
  documentRepo.seed(documents);

  // Seed Analysis Results
  const analysisResults: AnalysisResult[] = [
    {
      id: 1,
      documentId: 1,
      projectId: 1,
      frameworkId: 1,
      frameworkName: "نظام حماية البيانات الشخصية",
      complianceScore: 72.5,
      overallAssessment: "المؤسسة لديها أساس جيد للامتثال لكن تحتاج إلى تحسينات في عدة مجالات رئيسية",
      gaps: [
        {
          title: "عدم تعيين مسؤول حماية بيانات",
          description: "لم يتم تعيين مسؤول حماية بيانات معتمد كما تتطلب المادة 5 من النظام",
          priority: "high",
          affectedControls: ["CTL-001", "CTL-002"],
        },
        {
          title: "نقص في توثيق عمليات المعالجة",
          description: "لا يوجد سجل شامل لجميع عمليات معالجة البيانات الشخصية",
          priority: "high",
          affectedControls: ["CTL-003", "CTL-004", "CTL-005"],
        },
      ],
      recommendations: [
        {
          title: "تعيين مسؤول حماية بيانات معتمد",
          description: "البحث عن وتعيين مسؤول حماية بيانات معتمد (CDPO) أو تدريب موظف داخلي",
          priority: "high",
          estimatedEffort: "2-3 أسابيع",
        },
      ],
      strengths: [
        "وجود سياسة حماية بيانات موثقة",
        "تطبيق تشفير للبيانات الحساسة",
      ],
      risks: [
        {
          risk: "غرامات تنظيمية محتملة",
          severity: "high",
          likelihood: "medium",
        },
      ],
      financialAnalysis: {
        capitalAdequacy: {
          status: "compliant",
          details: "رأس المال يستوفي المتطلبات الأساسية",
        },
        liquidityRatios: {
          status: "partial",
          details: "نسب السيولة قريبة من الحد الأدنى",
        },
        financialRisks: ["تكاليف الامتثال المرتفعة", "غرامات محتملة"],
        estimatedCosts: {
          amount: 150000,
          currency: "SAR",
          breakdown: "تعيين مسؤول + تدريب + أنظمة",
        },
        potentialFines: {
          min: 500000,
          max: 5000000,
          currency: "SAR",
        },
        recommendations: [
          "تخصيص ميزانية للامتثال",
          "إنشاء صندوق طوارئ للغرامات",
        ],
      },
      strategicAnalysis: {
        businessModelAssessment: {
          score: 75,
          analysis: "نموذج العمل متوافق بشكل عام مع متطلبات الامتثال",
        },
        economicRisks: [
          {
            risk: "فقدان ثقة العملاء",
            impact: "high",
            probability: "medium",
          },
        ],
        improvementOpportunities: [
          "أتمتة عمليات الامتثال",
          "تحسين كفاءة العمليات",
        ],
        complianceROI: {
          timeframe: "12-18 شهر",
          expectedReturn: "تجنب غرامات + تحسين السمعة",
          benefits: ["حماية قانونية", "ميزة تنافسية", "ثقة العملاء"],
        },
        alignmentStrategies: [
          "دمج الامتثال في العمليات اليومية",
          "تدريب مستمر للموظفين",
        ],
        strategicPriorities: [
          {
            priority: "تعيين مسؤول حماية بيانات",
            rationale: "متطلب قانوني أساسي",
            timeline: "فوري - خلال شهر",
          },
        ],
      },
      analyzedAt: new Date(Date.now() - 86400000 * 27),
    },
  ];
  analysisRepo.seed(analysisResults);

  // Seed Compliance Maps
  const complianceMaps: ComplianceMap[] = [
    {
      id: 1,
      projectId: 1,
      frameworkId: 1,
      frameworkName: "نظام حماية البيانات الشخصية",
      frameworkCode: "PDPL",
      overallScore: 72.5,
      controlsTotal: 45,
      controlsCompliant: 28,
      controlsPartial: 12,
      controlsNonCompliant: 5,
      gapsCount: 17,
      highPriorityGaps: 5,
      lastAnalysisDate: new Date(Date.now() - 86400000 * 2),
    },
    {
      id: 2,
      projectId: 2,
      frameworkId: 2,
      frameworkName: "الضوابط الأساسية للأمن السيبراني",
      frameworkCode: "ECC",
      overallScore: 65.0,
      controlsTotal: 114,
      controlsCompliant: 68,
      controlsPartial: 28,
      controlsNonCompliant: 18,
      gapsCount: 46,
      highPriorityGaps: 12,
      lastAnalysisDate: new Date(Date.now() - 86400000 * 1),
    },
  ];
  complianceMapRepo.seed(complianceMaps);
}

// ============================================================================
// 6. Express HTTP Routes
// ============================================================================

function createApp() {
  const app = express();
  app.use(express.json());

  // Initialize repositories
  const projectRepo = new InMemoryDiagnosticProjectRepository();
  const documentRepo = new InMemoryDocumentRepository();
  const analysisRepo = new InMemoryAnalysisResultRepository();
  const complianceMapRepo = new InMemoryComplianceMapRepository();

  // Seed data
  seedData(projectRepo, documentRepo, analysisRepo, complianceMapRepo);

  // Initialize services
  const projectService = new DiagnosticProjectService(projectRepo);
  const documentService = new DocumentService(documentRepo);
  const analysisService = new AnalysisService(analysisRepo, complianceMapRepo);

  // Health check
  app.get("/health", (req, res) => {
    res.json({ status: "ok", mode: "simulation" });
  });

  // Projects routes
  app.get("/api/projects", async (req, res) => {
    const organizationId = parseInt(req.query.organizationId as string) || 1;
    const projects = await projectService.getProjectsByOrganization(organizationId);
    res.json({ projects });
  });

  app.get("/api/projects/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const project = await projectService.getProject(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  });

  app.post("/api/projects", async (req, res) => {
    const data = req.body;
    const project = await projectService.createProject(data);
    res.status(201).json(project);
  });

  app.patch("/api/projects/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    const project = await projectService.updateProject(id, data);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  });

  app.delete("/api/projects/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await projectService.deleteProject(id);
    if (!success) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(204).send();
  });

  // Documents routes
  app.get("/api/documents", async (req, res) => {
    const projectId = req.query.projectId ? parseInt(req.query.projectId as string) : null;
    const organizationId = parseInt(req.query.organizationId as string) || 1;
    
    const documents = projectId
      ? await documentService.getDocumentsByProject(projectId)
      : await documentService.getDocumentsByOrganization(organizationId);
    
    res.json({ documents });
  });

  app.get("/api/documents/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const document = await documentService.getDocument(id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(document);
  });

  app.post("/api/documents", async (req, res) => {
    const data = req.body;
    const document = await documentService.uploadDocument(data);
    res.status(201).json(document);
  });

  // Analysis routes
  app.get("/api/analysis/results", async (req, res) => {
    const projectId = parseInt(req.query.projectId as string);
    const results = await analysisService.getAnalysisResultsByProject(projectId);
    res.json({ results });
  });

  app.get("/api/analysis/results/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await analysisService.getAnalysisResult(id);
    if (!result) {
      return res.status(404).json({ error: "Analysis result not found" });
    }
    res.json(result);
  });

  app.post("/api/analysis/results", async (req, res) => {
    const data = req.body;
    const result = await analysisService.createAnalysisResult(data);
    res.status(201).json(result);
  });

  // Compliance map routes
  app.get("/api/compliance-map", async (req, res) => {
    const projectId = parseInt(req.query.projectId as string);
    const maps = await analysisService.getComplianceMap(projectId);
    res.json({ maps });
  });

  app.get("/api/compliance-map/:frameworkId", async (req, res) => {
    const projectId = parseInt(req.query.projectId as string);
    const frameworkId = parseInt(req.params.frameworkId);
    const map = await analysisService.getComplianceMapByFramework(projectId, frameworkId);
    if (!map) {
      return res.status(404).json({ error: "Compliance map not found" });
    }
    res.json(map);
  });

  return app;
}

// ============================================================================
// 7. Bootstrap
// ============================================================================

if (process.env.SIMULATION === "1") {
  const app = createApp();
  const PORT = process.env.SIM_PORT || 3001;
  
  app.listen(PORT, () => {
    console.log(`🚀 Simulation Backend running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`📁 Projects API: http://localhost:${PORT}/api/projects`);
    console.log(`📄 Documents API: http://localhost:${PORT}/api/documents`);
  });
}

export { createApp };
