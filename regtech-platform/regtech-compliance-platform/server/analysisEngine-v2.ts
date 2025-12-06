import { invokeLLM } from "./_core/llm";
import { buildStructuredRules, rulesToPromptText, StructuredRule } from "./ruleEngine";

/**
 * محرك التحليل بالذكاء الاصطناعي - النسخة المحدثة
 * يحلل الوثائق ويقارنها مع الأطر التنظيمية مع ربط كامل بقاعدة البيانات
 */

/**
 * المحلل الرئيسي: تحليل الامتثال الشامل مع القواعد المهيكلة
 */
export async function analyzeDocumentComplianceV2(
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
${documentText.substring(0, 4000)}

**القواعد والضوابط (من قاعدة البيانات - ${rules.length} ضابط):**
${rulesText}

**المطلوب:**
لكل فجوة تكتشفها، يجب أن تحدد:
1. **رمز الضابط المخالف** (مثل PDPL-1) - يجب أن يكون من القائمة أعلاه
2. **رمز المادة القانونية** (مثل PDPL-ART-6) - إن وجدت
3. **نص دقيق من الوثيقة** يثبت وجود الفجوة (evidenceText)
4. **السبب المحدد** للمخالفة
5. **الأولوية** (high/medium/low)
6. **الجهد المقدر** للإصلاح

**قدم تحليلاً شاملاً يتضمن:**
1. **نسبة الامتثال الإجمالية** (0-100%)
2. **التقييم العام**: ملخص الوضع الحالي
3. **الفجوات**: مع الاستشهادات الدقيقة
4. **التوصيات**: مع الضوابط المرتبطة
5. **نقاط القوة**: ما هي الجوانب المتوافقة؟
6. **المخاطر**: مع الضوابط المرتبطة

**الرد بصيغة JSON:**
{
  "complianceScore": 0-100,
  "overallAssessment": "...",
  "gaps": [{ 
    "title": "...", 
    "description": "...", 
    "priority": "high|medium|low", 
    "affectedControlCodes": ["PDPL-1", "PDPL-2"],
    "affectedArticleCodes": ["PDPL-ART-6"],
    "evidenceText": "نص من الوثيقة يثبت الفجوة",
    "estimatedEffort": "2-3 أسابيع"
  }],
  "recommendations": [{ 
    "title": "...", 
    "description": "...", 
    "priority": "high|medium|low", 
    "estimatedEffort": "...",
    "relatedControlCodes": ["PDPL-1"]
  }],
  "strengths": ["strength1", "strength2"],
  "risks": [{ 
    "risk": "...", 
    "severity": "high|medium|low", 
    "likelihood": "high|medium|low",
    "relatedControlCodes": ["PDPL-1"]
  }]
}`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: "أنت محلل امتثال قانوني خبير." },
      { role: "user", content: prompt }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "compliance_analysis_with_citations",
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
                  affectedControlCodes: {
                    type: "array",
                    items: { type: "string" }
                  },
                  affectedArticleCodes: {
                    type: "array",
                    items: { type: "string" }
                  },
                  evidenceText: { type: "string" },
                  estimatedEffort: { type: "string" }
                },
                required: ["title", "description", "priority", "affectedControlCodes", "evidenceText", "estimatedEffort"],
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
                  estimatedEffort: { type: "string" },
                  relatedControlCodes: {
                    type: "array",
                    items: { type: "string" }
                  }
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
                  likelihood: { type: "string", enum: ["high", "medium", "low"] },
                  relatedControlCodes: {
                    type: "array",
                    items: { type: "string" }
                  }
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
  const parsed = JSON.parse(contentStr || "{}");
  
  // ✅ إرجاع النتائج مع القواعد المهيكلة للمعالجة اللاحقة
  return {
    ...parsed,
    _structuredRules: rules,  // للاستخدام في Result Mapping
    _framework: framework
  };
}
