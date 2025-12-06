import type { User } from "../../drizzle/schema";

// Mock user data
export const mockUser: User = {
  id: 1,
  openId: "test-open-id",
  name: "Test User",
  email: "test@example.com",
  loginMethod: "google",
  role: "user",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
  lastSignedIn: new Date("2024-01-01"),
};

export const mockAdminUser: User = {
  ...mockUser,
  id: 2,
  openId: "admin-open-id",
  name: "Admin User",
  email: "admin@example.com",
  role: "admin",
};

// Mock framework data
export const mockFramework = {
  id: 1,
  code: "PDPL",
  nameAr: "نظام حماية البيانات الشخصية",
  nameEn: "Personal Data Protection Law",
  descriptionAr: "نظام حماية البيانات الشخصية",
  descriptionEn: "Personal Data Protection Law",
  authority: "SDAIA",
  sector: "general",
  effectiveDate: new Date("2023-09-14"),
  lastUpdated: new Date("2023-09-14"),
  version: "1.0",
  status: "active" as const,
  isMandatory: true,
  sourceUrl: "https://sdaia.gov.sa/",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// Mock control data
export const mockControl = {
  id: 1,
  frameworkId: 1,
  code: "PDPL-1",
  titleAr: "الحصول على موافقة صريحة",
  titleEn: "Obtain Explicit Consent",
  descriptionAr: "يجب الحصول على موافقة صريحة من صاحب البيانات",
  descriptionEn: "Must obtain explicit consent from data subject",
  category: "consent",
  priority: "high" as const,
  implementationGuidance: "Implement consent forms",
  complianceMetrics: "Track consent rates",
  references: "Article 6",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// Mock article data
export const mockArticle = {
  id: 1,
  frameworkId: 1,
  articleNumber: "6",
  titleAr: "الموافقة",
  titleEn: "Consent",
  contentAr: "يجب الحصول على موافقة صريحة",
  contentEn: "Must obtain explicit consent",
  category: "consent",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// Mock notification data
export const mockNotification = {
  id: 1,
  userId: 1,
  type: "info" as const,
  title: "Test Notification",
  message: "This is a test notification",
  isRead: false,
  createdAt: new Date("2024-01-01"),
  readAt: null,
};

// Mock RegAdvisor query result
export const mockRegAdvisorResult = {
  answer: "Based on PDPL Article 6, you must obtain explicit consent.",
  citations: [
    {
      frameworkCode: "PDPL",
      articleNumber: "6",
      relevance: 0.95,
    },
  ],
  confidence: 0.9,
  relatedQuestions: [
    "What are the exceptions to consent requirements?",
    "How to implement consent forms?",
  ],
};

// Mock RegDrafter policy result
export const mockRegDrafterResult = {
  policy: "# Data Protection Policy\n\n## 1. Introduction\n...",
  template: "PDPL",
  generatedAt: new Date("2024-01-01"),
};

// Mock RaaC export result
export const mockRaacResult = {
  format: "json" as const,
  data: {
    framework: "PDPL",
    controls: [mockControl],
  },
  exportedAt: new Date("2024-01-01"),
};

// Mock compliance score result
export const mockComplianceScore = {
  overall: 75,
  byFramework: {
    PDPL: 80,
    ECC: 70,
  },
  gaps: [
    {
      controlId: 1,
      severity: "high" as const,
      recommendation: "Implement consent forms",
    },
  ],
};
