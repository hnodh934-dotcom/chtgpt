import { vi } from "vitest";

/**
 * Mock LLM Response
 */
export interface MockLLMResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Mock LLM Responses للاختبارات
 */
export const mockLLMResponses = {
  regAdvisor: {
    simpleQuestion: {
      choices: [{
        message: {
          role: "assistant",
          content: JSON.stringify({
            answer: "وفقاً لنظام حماية البيانات الشخصية (PDPL)، يجب الحصول على موافقة صريحة من صاحب البيانات قبل معالجة بياناته الشخصية.",
            sources: ["PDPL-1", "PDPL-2"],
            relatedQuestions: [
              "ما هي أنواع الموافقة المطلوبة؟",
              "كيف يمكن سحب الموافقة؟",
              "ما هي عقوبات عدم الحصول على الموافقة؟"
            ],
            confidence: 0.95
          })
        },
        finish_reason: "stop"
      }],
      usage: {
        prompt_tokens: 150,
        completion_tokens: 200,
        total_tokens: 350
      }
    },
    documentAnalysis: {
      choices: [{
        message: {
          role: "assistant",
          content: JSON.stringify({
            summary: "تحليل سياسة الخصوصية",
            gaps: [
              {
                controlCode: "PDPL-1",
                articleCode: "Article-2",
                severity: "high",
                description: "لا تتضمن السياسة آلية واضحة للحصول على موافقة المستخدم"
              },
              {
                controlCode: "PDPL-2",
                articleCode: "Article-3",
                severity: "medium",
                description: "لا توجد معلومات كافية عن مدة الاحتفاظ بالبيانات"
              }
            ],
            recommendations: [
              "إضافة نموذج موافقة صريح",
              "تحديد مدة الاحتفاظ بالبيانات",
              "إضافة آلية لسحب الموافقة"
            ],
            complianceScore: 0.65
          })
        },
        finish_reason: "stop"
      }]
    }
  },
  
  regDrafter: {
    policyDraft: {
      choices: [{
        message: {
          role: "assistant",
          content: JSON.stringify({
            policy: {
              title: "سياسة حماية البيانات الشخصية",
              sections: [
                {
                  title: "1. المقدمة",
                  content: "تلتزم الشركة بحماية البيانات الشخصية وفقاً لنظام حماية البيانات الشخصية (PDPL)."
                },
                {
                  title: "2. نطاق التطبيق",
                  content: "تنطبق هذه السياسة على جميع البيانات الشخصية التي تجمعها الشركة."
                },
                {
                  title: "3. الموافقة",
                  content: "تحصل الشركة على موافقة صريحة قبل معالجة أي بيانات شخصية."
                }
              ],
              relatedControls: ["PDPL-1", "PDPL-2"],
              version: "1.0",
              effectiveDate: "2025-01-01"
            }
          })
        },
        finish_reason: "stop"
      }]
    },
    policyReview: {
      choices: [{
        message: {
          role: "assistant",
          content: JSON.stringify({
            overallScore: 0.75,
            strengths: [
              "السياسة تغطي المتطلبات الأساسية",
              "اللغة واضحة ومفهومة"
            ],
            weaknesses: [
              "لا توجد آلية واضحة لسحب الموافقة",
              "مدة الاحتفاظ بالبيانات غير محددة"
            ],
            missingControls: ["PDPL-3", "PDPL-4"],
            recommendations: [
              "إضافة قسم عن حقوق أصحاب البيانات",
              "تحديد مدة الاحتفاظ بالبيانات",
              "إضافة آلية للشكاوى"
            ]
          })
        },
        finish_reason: "stop"
      }]
    }
  },
  
  raac: {
    rulesExport: {
      choices: [{
        message: {
          role: "assistant",
          content: JSON.stringify({
            rules: [
              {
                id: "PDPL-1",
                condition: "data_collection === true",
                action: "require_consent",
                priority: "high"
              },
              {
                id: "PDPL-2",
                condition: "consent_given === false",
                action: "block_processing",
                priority: "critical"
              }
            ],
            metadata: {
              framework: "PDPL",
              version: "1.0",
              generatedAt: "2025-11-08T12:00:00Z"
            }
          })
        },
        finish_reason: "stop"
      }]
    },
    dataValidation: {
      choices: [{
        message: {
          role: "assistant",
          content: JSON.stringify({
            isCompliant: false,
            violations: [
              {
                ruleId: "PDPL-1",
                field: "consent",
                message: "الموافقة مطلوبة قبل معالجة البيانات",
                severity: "high"
              },
              {
                ruleId: "PDPL-2",
                field: "retention_period",
                message: "مدة الاحتفاظ غير محددة",
                severity: "medium"
              }
            ],
            score: 0.60,
            recommendations: [
              "الحصول على موافقة صريحة",
              "تحديد مدة الاحتفاظ بالبيانات"
            ]
          })
        },
        finish_reason: "stop"
      }]
    }
  }
};

/**
 * Mock invokeLLM function
 */
export function createMockLLM() {
  return vi.fn().mockImplementation(async ({ messages, response_format }: any) => {
    // تحديد نوع الطلب بناءً على المحتوى
    const lastMessage = messages[messages.length - 1];
    const content = typeof lastMessage.content === "string" 
      ? lastMessage.content 
      : JSON.stringify(lastMessage.content);

    // RegAdvisor
    if (content.includes("question") || content.includes("سؤال")) {
      return mockLLMResponses.regAdvisor.simpleQuestion;
    }
    if (content.includes("document") || content.includes("وثيقة")) {
      return mockLLMResponses.regAdvisor.documentAnalysis;
    }

    // RegDrafter
    if (content.includes("draft") || content.includes("صياغة")) {
      return mockLLMResponses.regDrafter.policyDraft;
    }
    if (content.includes("review") || content.includes("مراجعة")) {
      return mockLLMResponses.regDrafter.policyReview;
    }

    // RaaC
    if (content.includes("export") || content.includes("تصدير")) {
      return mockLLMResponses.raac.rulesExport;
    }
    if (content.includes("validate") || content.includes("التحقق")) {
      return mockLLMResponses.raac.dataValidation;
    }

    // Default response
    return {
      choices: [{
        message: {
          role: "assistant",
          content: JSON.stringify({
            result: "Mock LLM response",
            success: true
          })
        },
        finish_reason: "stop"
      }]
    };
  });
}

/**
 * Mock LLM Error
 */
export function createMockLLMError() {
  return vi.fn().mockRejectedValue(new Error("LLM API Error: Rate limit exceeded"));
}

/**
 * Mock LLM Timeout
 */
export function createMockLLMTimeout() {
  return vi.fn().mockImplementation(() => {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error("LLM API Timeout")), 100);
    });
  });
}

/**
 * Mock LLM Invalid JSON
 */
export function createMockLLMInvalidJSON() {
  return vi.fn().mockResolvedValue({
    choices: [{
      message: {
        role: "assistant",
        content: "This is not valid JSON {invalid}"
      },
      finish_reason: "stop"
    }]
  });
}
