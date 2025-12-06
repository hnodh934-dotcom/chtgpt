/**
 * RaaC Engine - Regulation as Code
 * 
 * محرك تحويل الأنظمة التنظيمية إلى كود قابل للتنفيذ
 * يصدّر القواعد بصيغ JSON, XML, YAML للتكامل مع الأنظمة الخارجية
 */

import { buildStructuredRules, type StructuredRule } from "./ruleEngine";
import { createAuditRef, AnalysisAuditLogger } from "./auditHelper";
import { getAllFrameworks, getAllControls, getAllArticles } from "./db";

// ============================================================================
// Types
// ============================================================================

export interface RaaCExportRequest {
  frameworkId?: number;
  format: "json" | "xml" | "yaml" | "openapi";
  includeMetadata?: boolean;
  version?: string;
  userId?: string;
}

export interface RaaCRule {
  id: string;
  type: "control" | "article" | "provision";
  code: string;
  title: string;
  description: string;
  framework: {
    id: number;
    code: string;
    name: string;
  };
  severity: "critical" | "high" | "medium" | "low";
  category?: string;
  predicates: Array<{
    field: string;
    operator: "equals" | "contains" | "matches" | "exists" | "greater_than" | "less_than";
    value?: string | number | boolean;
    description: string;
  }>;
  actions: Array<{
    type: "require" | "prohibit" | "recommend" | "notify";
    description: string;
  }>;
  references: Array<{
    type: "article" | "provision" | "external";
    code: string;
    text: string;
    url?: string;
  }>;
  metadata: {
    effectiveDate?: string;
    expiryDate?: string;
    lastUpdated: string;
    source: string;
    jurisdiction: string;
  };
}

export interface RaaCExportResponse {
  version: string;
  exportDate: string;
  format: string;
  framework?: {
    id: number;
    code: string;
    name: string;
  };
  rulesCount: number;
  content: string; // JSON, XML, or YAML string
  downloadUrl?: string;
  auditRef: string;
}

export interface RaaCValidationRequest {
  data: any; // JSON object to validate
  frameworkId?: number;
  userId?: string;
}

export interface RaaCValidationResponse {
  valid: boolean;
  violations: Array<{
    ruleId: string;
    ruleCode: string;
    severity: "critical" | "high" | "medium" | "low";
    message: string;
    field?: string;
    actualValue?: any;
    expectedValue?: any;
  }>;
  complianceScore: number; // 0-100
  summary: {
    total: number;
    passed: number;
    failed: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  auditRef: string;
}

// ============================================================================
// RaaC Engine
// ============================================================================

export class RaaCEngine {
  private rules: StructuredRule[] = [];
  private initialized = false;

  /**
   * تهيئة المحرك
   */
  async initialize(frameworkId?: number): Promise<void> {
    if (this.initialized) return;

    console.log("[RaaC] Initializing engine...");

    try {
      const result = await buildStructuredRules(frameworkId || 1);
      this.rules = result.rules;
      this.initialized = true;
      console.log(`[RaaC] Initialized with ${this.rules.length} rules`);
    } catch (error) {
      console.error("[RaaC] Failed to initialize:", error);
      throw new Error("فشل تهيئة محرك RaaC");
    }
  }

  /**
   * تصدير القواعد بصيغة محددة
   */
  async exportRules(request: RaaCExportRequest): Promise<RaaCExportResponse> {
    if (!this.initialized) {
      await this.initialize(request.frameworkId);
    }

    const auditRef = createAuditRef();

    // تسجيل في Audit Log
    AnalysisAuditLogger.logEvent({
      auditRef,
      event: "raac_export_rules",
      details: {
        format: request.format,
        frameworkId: request.frameworkId,
        includeMetadata: request.includeMetadata,
      },
    });

    try {
      // تحويل القواعد إلى RaaC format
      const raacRules = await this.convertToRaaCFormat(request.frameworkId);

      // الحصول على معلومات الإطار
      let framework: any = undefined;
      if (request.frameworkId) {
        const frameworks = await getAllFrameworks();
        framework = frameworks.find((f) => f.id === request.frameworkId);
      }

      // تصدير حسب الصيغة
      let content: string;
      switch (request.format) {
        case "json":
          content = this.exportAsJSON(raacRules, request.includeMetadata);
          break;
        case "xml":
          content = this.exportAsXML(raacRules, request.includeMetadata);
          break;
        case "yaml":
          content = this.exportAsYAML(raacRules, request.includeMetadata);
          break;
        case "openapi":
          content = this.exportAsOpenAPI(raacRules, framework);
          break;
        default:
          throw new Error(`Unsupported format: ${request.format}`);
      }

      // تسجيل النجاح
      AnalysisAuditLogger.logEvent({
        auditRef,
        event: "raac_rules_exported",
        details: {
          rulesCount: raacRules.length,
          contentLength: content.length,
        },
      });

      return {
        version: request.version || "1.0.0",
        exportDate: new Date().toISOString(),
        format: request.format,
        framework: framework
          ? {
              id: framework.id,
              code: framework.code,
              name: framework.nameAr,
            }
          : undefined,
        rulesCount: raacRules.length,
        content,
        auditRef,
      };
    } catch (error) {
      // تسجيل الفشل
      AnalysisAuditLogger.logEvent({
        auditRef,
        event: "raac_export_error",
        details: {
          error: error instanceof Error ? error.message : String(error),
        },
      });

      throw error;
    }
  }

  /**
   * التحقق من البيانات مقابل القواعد
   */
  async validateData(request: RaaCValidationRequest): Promise<RaaCValidationResponse> {
    if (!this.initialized) {
      await this.initialize(request.frameworkId);
    }

    const auditRef = createAuditRef();

    // تسجيل في Audit Log
    AnalysisAuditLogger.logEvent({
      auditRef,
      event: "raac_validate_data",
      details: {
        frameworkId: request.frameworkId,
        dataKeys: Object.keys(request.data),
      },
    });

    try {
      const violations: RaaCValidationResponse["violations"] = [];

      // تحويل القواعد إلى RaaC format
      const raacRules = await this.convertToRaaCFormat(request.frameworkId);

      // التحقق من كل قاعدة
      for (const rule of raacRules) {
        const violation = this.checkRule(rule, request.data);
        if (violation) {
          violations.push(violation);
        }
      }

      // حساب الإحصائيات
      const summary = {
        total: raacRules.length,
        passed: raacRules.length - violations.length,
        failed: violations.length,
        critical: violations.filter((v) => v.severity === "critical").length,
        high: violations.filter((v) => v.severity === "high").length,
        medium: violations.filter((v) => v.severity === "medium").length,
        low: violations.filter((v) => v.severity === "low").length,
      };

      const complianceScore = Math.round((summary.passed / summary.total) * 100);

      // تسجيل النجاح
      AnalysisAuditLogger.logEvent({
        auditRef,
        event: "raac_data_validated",
        details: {
          complianceScore,
          violationsCount: violations.length,
        },
      });

      return {
        valid: violations.length === 0,
        violations,
        complianceScore,
        summary,
        auditRef,
      };
    } catch (error) {
      // تسجيل الفشل
      AnalysisAuditLogger.logEvent({
        auditRef,
        event: "raac_validation_error",
        details: {
          error: error instanceof Error ? error.message : String(error),
        },
      });

      throw error;
    }
  }

  // ========================================================================
  // Helper Methods
  // ========================================================================

  /**
   * تحويل القواعد إلى RaaC format
   */
  private async convertToRaaCFormat(frameworkId?: number): Promise<RaaCRule[]> {
    const relevantRules = frameworkId
      ? this.rules.filter((r) => r.frameworkId === frameworkId)
      : this.rules;

    return relevantRules.map((rule) => {
      // استخراج predicates من القاعدة (مبسّط)
      const predicates = [{
        field: "compliance",
        operator: "required" as any,
        value: true,
        description: rule.controlDescription,
      }];

      // استخراج actions من النص
      const actions = this.extractActions(rule.controlDescription);

      // استخراج references من المواد
      const references = rule.relatedArticles.map((a) => ({
        type: "article" as const,
        code: a.articleCode,
        text: a.articleText,
        url: "",
      }));

      return {
        id: `rule-${rule.controlId}`,
        type: "control" as const,
        code: rule.controlCode,
        title: rule.controlName.substring(0, 100),
        description: rule.controlDescription,
        framework: {
          id: rule.frameworkId,
          code: rule.frameworkCode,
          name: rule.frameworkName,
        },
        severity: this.determineSeverity(rule),
        category: rule.controlCategory,
        predicates,
        actions,
        references,
        metadata: {
          lastUpdated: new Date().toISOString(),
          source: rule.frameworkName,
          jurisdiction: "Saudi Arabia",
        },
      };
    });
  }

  /**
   * استخراج الإجراءات من النص
   */
  private extractActions(text: string): RaaCRule["actions"] {
    const actions: RaaCRule["actions"] = [];

    // كلمات مفتاحية للإجراءات
    if (text.includes("يجب") || text.includes("ينبغي") || text.includes("يلزم")) {
      actions.push({
        type: "require",
        description: "متطلب إلزامي",
      });
    }

    if (text.includes("يحظر") || text.includes("لا يجوز") || text.includes("يمنع")) {
      actions.push({
        type: "prohibit",
        description: "ممنوع",
      });
    }

    if (text.includes("يوصى") || text.includes("يفضل") || text.includes("من الأفضل")) {
      actions.push({
        type: "recommend",
        description: "موصى به",
      });
    }

    if (text.includes("إبلاغ") || text.includes("إشعار") || text.includes("إخطار")) {
      actions.push({
        type: "notify",
        description: "يتطلب إشعار",
      });
    }

    // إذا لم نجد أي إجراء، نضيف require افتراضياً
    if (actions.length === 0) {
      actions.push({
        type: "require",
        description: "متطلب عام",
      });
    }

    return actions;
  }

  /**
   * تحديد مستوى الخطورة
   */
  private determineSeverity(rule: StructuredRule): "critical" | "high" | "medium" | "low" {
    const text = rule.controlDescription.toLowerCase();

    // Critical keywords
    if (
      text.includes("حرج") ||
      text.includes("أساسي") ||
      text.includes("إلزامي") ||
      text.includes("يجب")
    ) {
      return "critical";
    }

    // High keywords
    if (
      text.includes("مهم") ||
      text.includes("ضروري") ||
      text.includes("ينبغي")
    ) {
      return "high";
    }

    // Medium keywords
    if (
      text.includes("يوصى") ||
      text.includes("يفضل")
    ) {
      return "medium";
    }

    return "low";
  }

  /**
   * التحقق من قاعدة واحدة
   */
  private checkRule(
    rule: RaaCRule,
    data: any
  ): RaaCValidationResponse["violations"][0] | null {
    // هذا مثال بسيط - في الواقع يحتاج منطق أكثر تعقيداً
    for (const predicate of rule.predicates) {
      const fieldValue = this.getNestedValue(data, predicate.field);

      let violated = false;
      let actualValue = fieldValue;
      let expectedValue = predicate.value;

      switch (predicate.operator) {
        case "exists":
          violated = fieldValue === undefined || fieldValue === null;
          break;
        case "equals":
          violated = fieldValue !== predicate.value;
          break;
        case "contains":
          violated =
            !fieldValue ||
            !String(fieldValue).includes(String(predicate.value));
          break;
        case "greater_than":
          violated = !(Number(fieldValue) > Number(predicate.value));
          break;
        case "less_than":
          violated = !(Number(fieldValue) < Number(predicate.value));
          break;
      }

      if (violated) {
        return {
          ruleId: rule.id,
          ruleCode: rule.code,
          severity: rule.severity,
          message: `${rule.title}: ${predicate.description}`,
          field: predicate.field,
          actualValue,
          expectedValue,
        };
      }
    }

    return null;
  }

  /**
   * الحصول على قيمة متداخلة من object
   */
  private getNestedValue(obj: any, path: string): any {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }

  /**
   * تصدير بصيغة JSON
   */
  private exportAsJSON(rules: RaaCRule[], includeMetadata?: boolean): string {
    const output = {
      version: "1.0.0",
      format: "raac-json",
      generatedAt: new Date().toISOString(),
      rules: includeMetadata
        ? rules
        : rules.map((r) => {
            const { metadata, ...rest } = r;
            return rest;
          }),
    };

    return JSON.stringify(output, null, 2);
  }

  /**
   * تصدير بصيغة XML
   */
  private exportAsXML(rules: RaaCRule[], includeMetadata?: boolean): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<raac version="1.0.0" format="raac-xml">\n';
    xml += `  <generatedAt>${new Date().toISOString()}</generatedAt>\n`;
    xml += "  <rules>\n";

    for (const rule of rules) {
      xml += `    <rule id="${rule.id}" type="${rule.type}" severity="${rule.severity}">\n`;
      xml += `      <code>${this.escapeXML(rule.code)}</code>\n`;
      xml += `      <title>${this.escapeXML(rule.title)}</title>\n`;
      xml += `      <description>${this.escapeXML(rule.description)}</description>\n`;
      xml += `      <framework id="${rule.framework.id}" code="${rule.framework.code}">\n`;
      xml += `        <name>${this.escapeXML(rule.framework.name)}</name>\n`;
      xml += `      </framework>\n`;

      if (rule.predicates.length > 0) {
        xml += "      <predicates>\n";
        for (const p of rule.predicates) {
          xml += `        <predicate field="${p.field}" operator="${p.operator}">\n`;
          if (p.value !== undefined) {
            xml += `          <value>${this.escapeXML(String(p.value))}</value>\n`;
          }
          xml += `          <description>${this.escapeXML(p.description)}</description>\n`;
          xml += "        </predicate>\n";
        }
        xml += "      </predicates>\n";
      }

      if (rule.actions.length > 0) {
        xml += "      <actions>\n";
        for (const a of rule.actions) {
          xml += `        <action type="${a.type}">\n`;
          xml += `          <description>${this.escapeXML(a.description)}</description>\n`;
          xml += "        </action>\n";
        }
        xml += "      </actions>\n";
      }

      xml += "    </rule>\n";
    }

    xml += "  </rules>\n";
    xml += "</raac>\n";

    return xml;
  }

  /**
   * تصدير بصيغة YAML
   */
  private exportAsYAML(rules: RaaCRule[], includeMetadata?: boolean): string {
    let yaml = "version: 1.0.0\n";
    yaml += "format: raac-yaml\n";
    yaml += `generatedAt: ${new Date().toISOString()}\n`;
    yaml += "rules:\n";

    for (const rule of rules) {
      yaml += `  - id: ${rule.id}\n`;
      yaml += `    type: ${rule.type}\n`;
      yaml += `    code: ${rule.code}\n`;
      yaml += `    title: "${rule.title.replace(/"/g, '\\"')}"\n`;
      yaml += `    severity: ${rule.severity}\n`;
      yaml += `    framework:\n`;
      yaml += `      id: ${rule.framework.id}\n`;
      yaml += `      code: ${rule.framework.code}\n`;
      yaml += `      name: "${rule.framework.name}"\n`;

      if (rule.predicates.length > 0) {
        yaml += `    predicates:\n`;
        for (const p of rule.predicates) {
          yaml += `      - field: ${p.field}\n`;
          yaml += `        operator: ${p.operator}\n`;
          if (p.value !== undefined) {
            yaml += `        value: ${JSON.stringify(p.value)}\n`;
          }
          yaml += `        description: "${p.description}"\n`;
        }
      }

      if (rule.actions.length > 0) {
        yaml += `    actions:\n`;
        for (const a of rule.actions) {
          yaml += `      - type: ${a.type}\n`;
          yaml += `        description: "${a.description}"\n`;
        }
      }
    }

    return yaml;
  }

  /**
   * تصدير بصيغة OpenAPI
   */
  private exportAsOpenAPI(rules: RaaCRule[], framework?: any): string {
    const openapi = {
      openapi: "3.0.0",
      info: {
        title: framework
          ? `${framework.nameAr} - Compliance API`
          : "RegTech Compliance API",
        version: "1.0.0",
        description: "API for validating compliance with regulatory requirements",
      },
      paths: {
        "/validate": {
          post: {
            summary: "Validate data against regulatory rules",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: this.generateSchemaFromRules(rules),
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Validation result",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        valid: { type: "boolean" },
                        violations: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              ruleId: { type: "string" },
                              ruleCode: { type: "string" },
                              severity: { type: "string" },
                              message: { type: "string" },
                            },
                          },
                        },
                        complianceScore: { type: "number" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    return JSON.stringify(openapi, null, 2);
  }

  /**
   * توليد JSON Schema من القواعد
   */
  private generateSchemaFromRules(rules: RaaCRule[]): Record<string, any> {
    const properties: Record<string, any> = {};

    for (const rule of rules) {
      for (const predicate of rule.predicates) {
        if (!properties[predicate.field]) {
          properties[predicate.field] = {
            type: this.inferType(predicate.value),
            description: predicate.description,
          };
        }
      }
    }

    return properties;
  }

  /**
   * استنتاج نوع البيانات
   */
  private inferType(value: any): string {
    if (typeof value === "number") return "number";
    if (typeof value === "boolean") return "boolean";
    if (Array.isArray(value)) return "array";
    if (typeof value === "object") return "object";
    return "string";
  }

  /**
   * Escape XML special characters
   */
  private escapeXML(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

let engineInstance: RaaCEngine | null = null;

export function getRaaCEngine(): RaaCEngine {
  if (!engineInstance) {
    engineInstance = new RaaCEngine();
  }
  return engineInstance;
}
