import { describe, it, expect } from "vitest";
import { z } from "zod";

// Import validation schemas from routers
describe("Validation Schemas", () => {
  describe("RegAdvisor Schemas", () => {
    const AskQuestionSchema = z.object({
      question: z.string().min(3, "السؤال يجب أن يكون 3 أحرف على الأقل"),
      conversationId: z.string().optional(),
      framework: z.enum(["PDPL", "ECC", "SAMA", "ALL"]).optional(),
      language: z.enum(["ar", "en"]).optional().default("ar"),
      context: z
        .array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        )
        .optional(),
    });

    it("should validate valid question", () => {
      const data = {
        question: "ما هي متطلبات الموافقة؟",
        framework: "PDPL" as const,
        language: "ar" as const,
      };

      const result = AskQuestionSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should reject short question", () => {
      const data = {
        question: "ما",
      };

      const result = AskQuestionSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject invalid framework", () => {
      const data = {
        question: "سؤال صحيح",
        framework: "INVALID",
      };

      const result = AskQuestionSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject invalid language", () => {
      const data = {
        question: "سؤال صحيح",
        language: "fr",
      };

      const result = AskQuestionSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should accept optional fields", () => {
      const data = {
        question: "سؤال صحيح",
      };

      const result = AskQuestionSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.language).toBe("ar"); // default
      }
    });

    it("should validate context array", () => {
      const data = {
        question: "سؤال صحيح",
        context: [
          { role: "user" as const, content: "سؤال سابق" },
          { role: "assistant" as const, content: "إجابة سابقة" },
        ],
      };

      const result = AskQuestionSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe("RegDrafter Schemas", () => {
    const DraftPolicySchema = z.object({
      templateId: z.string().optional(),
      policyType: z.string(),
      framework: z.string(),
      companyName: z.string(),
      industry: z.string().optional(),
      customRequirements: z.string().optional(),
      language: z.enum(["ar", "en"]).optional(),
    });

    it("should validate valid policy request", () => {
      const data = {
        policyType: "privacy",
        framework: "PDPL",
        companyName: "شركة الاختبار",
        industry: "تقنية",
        language: "ar" as const,
      };

      const result = DraftPolicySchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should reject missing required fields", () => {
      const data = {
        policyType: "privacy",
      };

      const result = DraftPolicySchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should accept optional fields", () => {
      const data = {
        policyType: "privacy",
        framework: "PDPL",
        companyName: "شركة الاختبار",
      };

      const result = DraftPolicySchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe("RaaC Schemas", () => {
    const ExportRulesSchema = z.object({
      frameworkId: z.number().optional(),
      format: z.enum(["json", "xml", "yaml", "openapi"]),
      includeMetadata: z.boolean().optional(),
      version: z.string().optional(),
    });

    it("should validate valid export request", () => {
      const data = {
        format: "json" as const,
        frameworkId: 1,
        includeMetadata: true,
      };

      const result = ExportRulesSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should reject invalid format", () => {
      const data = {
        format: "pdf",
      };

      const result = ExportRulesSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should validate all formats", () => {
      const formats = ["json", "xml", "yaml", "openapi"];

      formats.forEach((format) => {
        const data = { format };
        const result = ExportRulesSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    const ValidateDataSchema = z.object({
      data: z.record(z.string(), z.any()),
      frameworkId: z.number().optional(),
    });

    it("should validate data validation request", () => {
      const data = {
        data: {
          hasConsent: true,
          dataProtectionOfficer: true,
        },
        frameworkId: 1,
      };

      const result = ValidateDataSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should accept empty data object", () => {
      const data = {
        data: {},
      };

      const result = ValidateDataSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe("Compliance Schemas", () => {
    const GetScoreSchema = z.object({
      frameworkId: z.number().optional(),
      organizationId: z.number().optional(),
    });

    it("should validate score request", () => {
      const data = {
        frameworkId: 1,
        organizationId: 1,
      };

      const result = GetScoreSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should accept optional fields", () => {
      const data = {};

      const result = GetScoreSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe("Notifications Schemas", () => {
    const ListNotificationsSchema = z.object({
      page: z.number().min(1).optional().default(1),
      limit: z.number().min(1).max(100).optional().default(20),
      isRead: z.boolean().optional(),
      type: z.enum(["info", "warning", "error", "success"]).optional(),
    });

    it("should validate notifications list request", () => {
      const data = {
        page: 1,
        limit: 20,
        isRead: false,
      };

      const result = ListNotificationsSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should reject invalid page number", () => {
      const data = {
        page: 0,
      };

      const result = ListNotificationsSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject limit > 100", () => {
      const data = {
        limit: 101,
      };

      const result = ListNotificationsSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should apply defaults", () => {
      const data = {};

      const result = ListNotificationsSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
      }
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty strings", () => {
      const schema = z.string().min(1);
      const result = schema.safeParse("");
      expect(result.success).toBe(false);
    });

    it("should handle null values", () => {
      const schema = z.string();
      const result = schema.safeParse(null);
      expect(result.success).toBe(false);
    });

    it("should handle undefined values", () => {
      const schema = z.string();
      const result = schema.safeParse(undefined);
      expect(result.success).toBe(false);
    });

    it("should handle optional with default", () => {
      const schema = z.string().optional().default("default");
      const result = schema.safeParse(undefined);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe("default");
      }
    });

    it("should handle arrays", () => {
      const schema = z.array(z.string()).min(1);
      const result1 = schema.safeParse([]);
      const result2 = schema.safeParse(["item"]);

      expect(result1.success).toBe(false);
      expect(result2.success).toBe(true);
    });

    it("should handle nested objects", () => {
      const schema = z.object({
        user: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
      });

      const validData = {
        user: {
          name: "Test User",
          email: "test@example.com",
        },
      };

      const invalidData = {
        user: {
          name: "Test User",
          email: "invalid-email",
        },
      };

      expect(schema.safeParse(validData).success).toBe(true);
      expect(schema.safeParse(invalidData).success).toBe(false);
    });

    it("should handle enums", () => {
      const schema = z.enum(["option1", "option2", "option3"]);

      expect(schema.safeParse("option1").success).toBe(true);
      expect(schema.safeParse("option4").success).toBe(false);
    });

    it("should handle unions", () => {
      const schema = z.union([z.string(), z.number()]);

      expect(schema.safeParse("text").success).toBe(true);
      expect(schema.safeParse(123).success).toBe(true);
      expect(schema.safeParse(true).success).toBe(false);
    });
  });
});
