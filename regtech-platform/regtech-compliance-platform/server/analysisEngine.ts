import { invokeLLM } from "./_core/llm";
import { buildStructuredRules, rulesToPromptText, StructuredRule } from "./ruleEngine";

/**
 * محرك التحليل بالذكاء الاصطناعي
 * يحلل الوثائق ويقارنها مع الأطر التنظيمية
 */

/**
 * الوكيل الأول: محلل الامتثال المالي
 */
export async function financialComplianceAgent(documentText: string, frameworkName: string) {
  const prompt = `أنت محلل امتثال مالي متخصص في الأنظمة السعودية.

**المهمة:**
حلل الوثيقة التالية من منظور مالي واقتصادي مقابل إطار "${frameworkName}".

**الوثيقة:**
${documentText.substring(0, 4000)}

**قدم تحليلاً شاملاً يتضمن:**
1. **تقييم كفاية رأس المال**: هل تستوفي المتطلبات المالية؟
2. **نسب السيولة**: هل تحقق الحدود الدنيا المطلوبة؟
3. **المخاطر المالية**: ما هي المخاطر المالية المحتملة؟
4. **تقدير التكاليف**: كم ستكلف معالجة الفجوات؟
5. **الغرامات المحتملة**: ما هي الغرامات في حال عدم الامتثال؟
6. **التوصيات المالية**: ما هي الخطوات المالية المطلوبة؟

**الرد بصيغة JSON:**
{
  "capitalAdequacy": { "status": "compliant|partial|non_compliant", "details": "..." },
  "liquidityRatios": { "status": "compliant|partial|non_compliant", "details": "..." },
  "financialRisks": ["risk1", "risk2"],
  "estimatedCosts": { "amount": 0, "currency": "SAR", "breakdown": "..." },
  "potentialFines": { "min": 0, "max": 0, "currency": "SAR" },
  "recommendations": ["rec1", "rec2"]
}`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: "أنت محلل امتثال مالي خبير." },
      { role: "user", content: prompt }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "financial_analysis",
        strict: true,
        schema: {
          type: "object",
          properties: {
            capitalAdequacy: {
              type: "object",
              properties: {
                status: { type: "string", enum: ["compliant", "partial", "non_compliant"] },
                details: { type: "string" }
              },
              required: ["status", "details"],
              additionalProperties: false
            },
            liquidityRatios: {
              type: "object",
              properties: {
                status: { type: "string", enum: ["compliant", "partial", "non_compliant"] },
                details: { type: "string" }
              },
              required: ["status", "details"],
              additionalProperties: false
            },
            financialRisks: {
              type: "array",
              items: { type: "string" }
            },
            estimatedCosts: {
              type: "object",
              properties: {
                amount: { type: "number" },
                currency: { type: "string" },
                breakdown: { type: "string" }
              },
              required: ["amount", "currency", "breakdown"],
              additionalProperties: false
            },
            potentialFines: {
              type: "object",
              properties: {
                min: { type: "number" },
                max: { type: "number" },
                currency: { type: "string" }
              },
              required: ["min", "max", "currency"],
              additionalProperties: false
            },
            recommendations: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: ["capitalAdequacy", "liquidityRatios", "financialRisks", "estimatedCosts", "potentialFines", "recommendations"],
          additionalProperties: false
        }
      }
    }
  });

  const content = response.choices[0].message.content;
  const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
  return JSON.parse(contentStr || "{}");
}

/**
 * الوكيل الثاني: مستشار الاستراتيجية الاقتصادية
 */
export async function strategicEconomicAgent(documentText: string, frameworkName: string, organizationType: string) {
  const prompt = `أنت مستشار استراتيجية اقتصادية متخصص في التحول الرقمي والامتثال.

**المهمة:**
حلل نموذج العمل والاستراتيجية الاقتصادية للمؤسسة من نوع "${organizationType}" مقابل إطار "${frameworkName}".

**الوثيقة:**
${documentText.substring(0, 4000)}

**قدم تحليلاً استراتيجياً يتضمن:**
1. **تقييم نموذج العمل**: هل النموذج متوافق مع متطلبات الإطار؟
2. **المخاطر الاقتصادية**: ما هي المخاطر على استمرارية العمل؟
3. **فرص التحسين**: ما هي الفرص الاقتصادية المتاحة؟
4. **ROI للامتثال**: ما هو العائد المتوقع من الاستثمار في الامتثال؟
5. **استراتيجيات التوافق**: ما هي الاستراتيجيات الموصى بها؟
6. **الأولويات**: ما هي الأولويات الاستراتيجية؟

**الرد بصيغة JSON:**
{
  "businessModelAssessment": { "score": 0-100, "analysis": "..." },
  "economicRisks": [{ "risk": "...", "impact": "high|medium|low", "probability": "high|medium|low" }],
  "improvementOpportunities": ["opp1", "opp2"],
  "complianceROI": { "timeframe": "...", "expectedReturn": "...", "benefits": ["..."] },
  "alignmentStrategies": ["strategy1", "strategy2"],
  "strategicPriorities": [{ "priority": "...", "rationale": "...", "timeline": "..." }]
}`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: "أنت مستشار استراتيجية اقتصادية خبير." },
      { role: "user", content: prompt }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "strategic_analysis",
        strict: true,
        schema: {
          type: "object",
          properties: {
            businessModelAssessment: {
              type: "object",
              properties: {
                score: { type: "number" },
                analysis: { type: "string" }
              },
              required: ["score", "analysis"],
              additionalProperties: false
            },
            economicRisks: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  risk: { type: "string" },
                  impact: { type: "string", enum: ["high", "medium", "low"] },
                  probability: { type: "string", enum: ["high", "medium", "low"] }
                },
                required: ["risk", "impact", "probability"],
                additionalProperties: false
              }
            },
            improvementOpportunities: {
              type: "array",
              items: { type: "string" }
            },
            complianceROI: {
              type: "object",
              properties: {
                timeframe: { type: "string" },
                expectedReturn: { type: "string" },
                benefits: {
                  type: "array",
                  items: { type: "string" }
                }
              },
              required: ["timeframe", "expectedReturn", "benefits"],
              additionalProperties: false
            },
            alignmentStrategies: {
              type: "array",
              items: { type: "string" }
            },
            strategicPriorities: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  priority: { type: "string" },
                  rationale: { type: "string" },
                  timeline: { type: "string" }
                },
                required: ["priority", "rationale", "timeline"],
                additionalProperties: false
              }
            }
          },
          required: ["businessModelAssessment", "economicRisks", "improvementOpportunities", "complianceROI", "alignmentStrategies", "strategicPriorities"],
          additionalProperties: false
        }
      }
    }
  });

  const content = response.choices[0].message.content;
  const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
  return JSON.parse(contentStr || "{}");
}

/**
 * المحلل الرئيسي: تحليل الامتثال الشامل مع القواعد المهيكلة
 */
export async function analyzeDocumentCompliance(
  documentText: string,
  frameworkId: number,
  frameworkName: string
) {
  // ✅ جلب القواعد المهيكلة من قاعدة البيانات
  const { framework, rules } = await buildStructuredRules(frameworkId);
  
  if (!framework || rules.length === 0) {
    throw new Error(`لم يتم العثور على قواعد للإطار: ${frameworkName}`);
  }
  
  // ✅ تحويل القواعد إلى نص منظم
  const rulesText = rulesToPromptText(rules);
  
  const prompt = `أنت محلل امتثال قانوني متخصص في الأنظمة السعودية.

**المهمة:**
حلل الوثيقة التالية مقابل إطار "${frameworkName}" وحدد مستوى الامتثال والفجوات.

**الوثيقة:**
${documentText.substring(0, 3000)}

**القواعد والضوابط (عينة):**
${rulesText}

**قدم تحليلاً شاملاً يتضمن:**
1. **نسبة الامتثال الإجمالية** (0-100%)
2. **التقييم العام**: ملخص الوضع الحالي
3. **الفجوات**: ما هي الفجوات الرئيسية؟
4. **التوصيات**: ما هي الخطوات المطلوبة؟
5. **نقاط القوة**: ما هي الجوانب المتوافقة؟
6. **المخاطر**: ما هي المخاطر القانونية؟

**الرد بصيغة JSON:**
{
  "complianceScore": 0-100,
  "overallAssessment": "...",
  "gaps": [{ "title": "...", "description": "...", "priority": "high|medium|low", "affectedControls": ["..."] }],
  "recommendations": [{ "title": "...", "description": "...", "priority": "high|medium|low", "estimatedEffort": "..." }],
  "strengths": ["strength1", "strength2"],
  "risks": [{ "risk": "...", "severity": "high|medium|low", "likelihood": "high|medium|low" }]
}`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: "أنت محلل امتثال قانوني خبير." },
      { role: "user", content: prompt }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "compliance_analysis",
        strict: true,
        schema: {
          type: "object",
          properties: {
            complianceScore: { type: "number" },
            overallAssessment: { type: "string" },
            gaps: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  priority: { type: "string", enum: ["high", "medium", "low"] },
                  affectedControls: {
                    type: "array",
                    items: { type: "string" }
                  }
                },
                required: ["title", "description", "priority", "affectedControls"],
                additionalProperties: false
              }
            },
            recommendations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  priority: { type: "string", enum: ["high", "medium", "low"] },
                  estimatedEffort: { type: "string" }
                },
                required: ["title", "description", "priority", "estimatedEffort"],
                additionalProperties: false
              }
            },
            strengths: {
              type: "array",
              items: { type: "string" }
            },
            risks: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  risk: { type: "string" },
                  severity: { type: "string", enum: ["high", "medium", "low"] },
                  likelihood: { type: "string", enum: ["high", "medium", "low"] }
                },
                required: ["risk", "severity", "likelihood"],
                additionalProperties: false
              }
            }
          },
          required: ["complianceScore", "overallAssessment", "gaps", "recommendations", "strengths", "risks"],
          additionalProperties: false
        }
      }
    }
  });

  const content = response.choices[0].message.content;
  const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
  return JSON.parse(contentStr || "{}");
}

/**
 * المحرك الرئيسي: تحليل شامل مع الوكيلين
 */
export async function comprehensiveAnalysis(
  documentText: string,
  frameworkId: number,
  frameworkName: string,
  organizationType: string = "private"
) {
  // التحليل الرئيسي
  const mainAnalysis = await analyzeDocumentCompliance(documentText, frameworkId, frameworkName);
  
  // تحليل الوكيل المالي
  const financialAnalysis = await financialComplianceAgent(documentText, frameworkName);
  
  // تحليل الوكيل الاستراتيجي
  const strategicAnalysis = await strategicEconomicAgent(documentText, frameworkName, organizationType);
  
  return {
    ...mainAnalysis,
    financialAnalysis,
    strategicAnalysis,
    analyzedAt: new Date().toISOString()
  };
}
