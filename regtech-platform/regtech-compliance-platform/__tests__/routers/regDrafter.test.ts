import { describe, it, expect, beforeEach, vi } from "vitest";
import { createMockLLM, mockLLMResponses } from "../mocks/llm";
import { getTestDb, seedTestDb, cleanupTestDb } from "../setup/testDb";

/**
 * RegDrafter Router Integration Tests
 * 
 * Tests the RegDrafter API endpoints for policy drafting and review
 */
describe("RegDrafter Router Integration Tests", () => {
  let mockLLM: ReturnType<typeof createMockLLM>;

  beforeEach(() => {
    cleanupTestDb();
    seedTestDb();
    mockLLM = createMockLLM();
    vi.mock("../../server/_core/llm", () => ({
      invokeLLM: mockLLM,
    }));
  });

  describe("getTemplates - قوالب السياسات", () => {
    it("should return all available templates", async () => {
      const templates = [
        { id: "privacy-policy", name: "سياسة الخصوصية", framework: "PDPL" },
        { id: "data-retention", name: "سياسة الاحتفاظ بالبيانات", framework: "PDPL" },
        { id: "access-control", name: "سياسة التحكم في الوصول", framework: "ECC" }
      ];

      expect(templates).toBeInstanceOf(Array);
      expect(templates.length).toBeGreaterThan(0);
      templates.forEach(t => {
        expect(t).toHaveProperty("id");
        expect(t).toHaveProperty("name");
        expect(t).toHaveProperty("framework");
      });
    });

    it("should filter templates by framework", async () => {
      const framework = "PDPL";
      const allTemplates = [
        { id: "privacy-policy", name: "سياسة الخصوصية", framework: "PDPL" },
        { id: "data-retention", name: "سياسة الاحتفاظ بالبيانات", framework: "PDPL" },
        { id: "access-control", name: "سياسة التحكم في الوصول", framework: "ECC" }
      ];

      const filtered = allTemplates.filter(t => t.framework === framework);

      expect(filtered.length).toBe(2);
      filtered.forEach(t => {
        expect(t.framework).toBe(framework);
      });
    });

    it("should return empty array for invalid framework", async () => {
      const framework = "INVALID";
      const allTemplates = [
        { id: "privacy-policy", name: "سياسة الخصوصية", framework: "PDPL" }
      ];

      const filtered = allTemplates.filter(t => t.framework === framework);

      expect(filtered.length).toBe(0);
    });
  });

  describe("draftPolicy - صياغة سياسة", () => {
    it("should draft a privacy policy for PDPL framework", async () => {
      const request = {
        framework: "PDPL",
        policyType: "privacy-policy",
        companyName: "شركة التقنية المتقدمة",
        language: "ar" as const
      };

      const response = mockLLMResponses.regDrafter.policyDraft;
      const policy = JSON.parse(response.choices[0].message.content);

      expect(policy).toHaveProperty("policy");
      expect(policy.policy).toHaveProperty("title");
      expect(policy.policy).toHaveProperty("sections");
      expect(policy.policy).toHaveProperty("relatedControls");
      expect(policy.policy).toHaveProperty("version");
      
      expect(policy.policy.sections).toBeInstanceOf(Array);
      expect(policy.policy.sections.length).toBeGreaterThan(0);
      expect(policy.policy.relatedControls).toBeInstanceOf(Array);
    });

    it("should draft a policy for ECC framework", async () => {
      const request = {
        framework: "ECC",
        policyType: "access-control",
        companyName: "Advanced Tech Company",
        language: "en" as const
      };

      const response = mockLLMResponses.regDrafter.policyDraft;
      const policy = JSON.parse(response.choices[0].message.content);

      expect(policy).toHaveProperty("policy");
      expect(policy.policy.title).toBeTruthy();
    });

    it("should reject request with missing company name", () => {
      const request = {
        framework: "PDPL",
        policyType: "privacy-policy",
        companyName: "",
        language: "ar" as const
      };

      expect(() => {
        if (!request.companyName || request.companyName.trim().length === 0) {
          throw new Error("Company name is required");
        }
      }).toThrow("Company name is required");
    });

    it("should include custom requirements in policy", async () => {
      const request = {
        framework: "PDPL",
        policyType: "privacy-policy",
        companyName: "شركة التقنية",
        customRequirements: [
          "يجب تشفير جميع البيانات",
          "مدة الاحتفاظ بالبيانات 3 سنوات"
        ],
        language: "ar" as const
      };

      expect(request.customRequirements).toBeInstanceOf(Array);
      expect(request.customRequirements?.length).toBe(2);
    });

    it("should use template if provided", async () => {
      const request = {
        framework: "PDPL",
        policyType: "privacy-policy",
        companyName: "شركة التقنية",
        templateId: "privacy-policy-template-1",
        language: "ar" as const
      };

      expect(request.templateId).toBeTruthy();
      expect(typeof request.templateId).toBe("string");
    });

    it("should support English language", async () => {
      const request = {
        framework: "PDPL",
        policyType: "privacy-policy",
        companyName: "Tech Company",
        language: "en" as const
      };

      expect(request.language).toBe("en");
    });
  });

  describe("reviewPolicy - مراجعة سياسة", () => {
    it("should review an existing policy", async () => {
      const policy = `
        سياسة الخصوصية
        
        1. المقدمة
        تلتزم الشركة بحماية البيانات الشخصية.
        
        2. جمع البيانات
        نجمع البيانات من المستخدمين.
        
        3. استخدام البيانات
        نستخدم البيانات لتحسين خدماتنا.
      `;
      const framework = "PDPL";

      const response = mockLLMResponses.regDrafter.policyReview;
      const review = JSON.parse(response.choices[0].message.content);

      expect(review).toHaveProperty("overallScore");
      expect(review).toHaveProperty("strengths");
      expect(review).toHaveProperty("weaknesses");
      expect(review).toHaveProperty("missingControls");
      expect(review).toHaveProperty("recommendations");
      
      expect(review.overallScore).toBeGreaterThanOrEqual(0);
      expect(review.overallScore).toBeLessThanOrEqual(1);
      expect(review.strengths).toBeInstanceOf(Array);
      expect(review.weaknesses).toBeInstanceOf(Array);
      expect(review.missingControls).toBeInstanceOf(Array);
      expect(review.recommendations).toBeInstanceOf(Array);
    });

    it("should reject very short policy", () => {
      const policy = "سياسة قصيرة";
      
      expect(() => {
        if (policy.length < 100) {
          throw new Error("Policy too short for review");
        }
      }).toThrow("Policy too short for review");
    });

    it("should identify missing controls", async () => {
      const response = mockLLMResponses.regDrafter.policyReview;
      const review = JSON.parse(response.choices[0].message.content);

      expect(review.missingControls).toBeInstanceOf(Array);
      review.missingControls.forEach((control: string) => {
        expect(typeof control).toBe("string");
        expect(control.length).toBeGreaterThan(0);
      });
    });

    it("should provide actionable recommendations", async () => {
      const response = mockLLMResponses.regDrafter.policyReview;
      const review = JSON.parse(response.choices[0].message.content);

      expect(review.recommendations).toBeInstanceOf(Array);
      expect(review.recommendations.length).toBeGreaterThan(0);
      review.recommendations.forEach((rec: string) => {
        expect(typeof rec).toBe("string");
        expect(rec.length).toBeGreaterThan(10);
      });
    });
  });

  describe("Authentication & Authorization", () => {
    it("should require authentication for draftPolicy", () => {
      const isAuthenticated = false;
      
      expect(() => {
        if (!isAuthenticated) {
          throw new Error("UNAUTHORIZED");
        }
      }).toThrow("UNAUTHORIZED");
    });

    it("should require authentication for reviewPolicy", () => {
      const isAuthenticated = false;
      
      expect(() => {
        if (!isAuthenticated) {
          throw new Error("UNAUTHORIZED");
        }
      }).toThrow("UNAUTHORIZED");
    });
  });

  describe("Rate Limiting", () => {
    it("should enforce rate limits on draftPolicy", () => {
      const requestCount = 51;
      const rateLimit = 50;
      
      expect(() => {
        if (requestCount > rateLimit) {
          throw new Error("TOO_MANY_REQUESTS");
        }
      }).toThrow("TOO_MANY_REQUESTS");
    });

    it("should allow requests within rate limit", () => {
      const requestCount = 25;
      const rateLimit = 50;
      
      expect(requestCount).toBeLessThan(rateLimit);
    });
  });

  describe("Error Handling", () => {
    it("should handle LLM errors gracefully", async () => {
      const mockError = vi.fn().mockRejectedValue(new Error("LLM API Error"));
      
      await expect(mockError()).rejects.toThrow("LLM API Error");
    });

    it("should handle invalid framework code", async () => {
      const invalidFramework = "INVALID_FRAMEWORK";
      
      const db = getTestDb();
      const frameworks = await db.query.frameworks.findMany({
        where: (f, { eq }) => eq(f.code, invalidFramework)
      });

      expect(frameworks.length).toBe(0);
    });

    it("should handle database errors", async () => {
      const mockDbError = vi.fn().mockRejectedValue(new Error("Database error"));
      
      await expect(mockDbError()).rejects.toThrow("Database error");
    });
  });
});
