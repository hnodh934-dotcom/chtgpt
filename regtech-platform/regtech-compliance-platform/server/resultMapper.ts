/**
 * طبقة ربط النتائج (Result Mapping Layer)
 * 
 * تربط نتائج AI بالضوابط والمواد الفعلية في قاعدة البيانات
 * وتُثري الفجوات بالاستشهادات الكاملة
 */

import { StructuredRule } from './ruleEngine';

/**
 * فجوة مع استشهادات كاملة (Enriched Gap)
 */
export interface EnrichedGap {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  evidenceText: string;
  estimatedEffort: string;
  
  // الضوابط المرتبطة
  controls: Array<{
    id: number;
    code: string;
    name: string;
    nameEn?: string;
    description: string;
    category: string;
    priority: string;
    isRequired: boolean;
    implementationGuidance?: string;
    evidenceRequirements?: string;
  }>;
  
  // المواد القانونية المرتبطة
  articles: Array<{
    id: number;
    code: string;
    name: string;
    nameEn?: string;
    text: string;
    textEn?: string;
    interpretation?: string;
    category: string;
  }>;
}

/**
 * توصية مع استشهادات
 */
export interface EnrichedRecommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedEffort: string;
  
  // الضوابط المرتبطة
  relatedControls: Array<{
    id: number;
    code: string;
    name: string;
    description: string;
  }>;
}

/**
 * مخاطرة مع استشهادات
 */
export interface EnrichedRisk {
  risk: string;
  severity: 'high' | 'medium' | 'low';
  likelihood: 'high' | 'medium' | 'low';
  
  // الضوابط المرتبطة
  relatedControls: Array<{
    id: number;
    code: string;
    name: string;
    description: string;
  }>;
}

/**
 * نتيجة تحليل كاملة مع استشهادات
 */
export interface EnrichedAnalysisResult {
  complianceScore: number;
  overallAssessment: string;
  gaps: EnrichedGap[];
  recommendations: EnrichedRecommendation[];
  strengths: string[];
  risks: EnrichedRisk[];
  
  // معلومات إضافية
  frameworkInfo: {
    id: number;
    code: string;
    name: string;
    authority: string;
    version: string;
  };
  
  analyzedAt: string;
  totalControls: number;
  totalArticles: number;
}

/**
 * ربط الفجوة بالضابط بواسطة الرمز
 */
export function mapGapToControl(
  controlCode: string,
  structuredRules: StructuredRule[]
): StructuredRule | null {
  return structuredRules.find(r => r.controlCode === controlCode) || null;
}

/**
 * ربط الفجوة بالمادة بواسطة الرمز
 */
export function mapGapToArticle(
  articleCode: string,
  structuredRules: StructuredRule[]
) {
  for (const rule of structuredRules) {
    const article = rule.relatedArticles.find(a => a.articleCode === articleCode);
    if (article) return article;
  }
  return null;
}

/**
 * إثراء الفجوة بالاستشهادات الكاملة
 */
export function enrichGapWithCitations(
  gap: any,  // من AI
  structuredRules: StructuredRule[]
): EnrichedGap {
  // ربط الضوابط
  const controls = (gap.affectedControlCodes || [])
    .map((code: string) => mapGapToControl(code, structuredRules))
    .filter(Boolean)
    .map((rule: StructuredRule) => ({
      id: rule.controlId,
      code: rule.controlCode,
      name: rule.controlName,
      nameEn: rule.controlNameEn,
      description: rule.controlDescription,
      category: rule.controlCategory,
      priority: rule.controlPriority,
      isRequired: rule.isRequired,
      implementationGuidance: rule.implementationGuidance,
      evidenceRequirements: rule.evidenceRequirements,
    }));
  
  // ربط المواد القانونية
  const articles = (gap.affectedArticleCodes || [])
    .map((code: string) => mapGapToArticle(code, structuredRules))
    .filter(Boolean);
  
  return {
    title: gap.title,
    description: gap.description,
    priority: gap.priority,
    evidenceText: gap.evidenceText || '',
    estimatedEffort: gap.estimatedEffort || 'غير محدد',
    controls,
    articles,
  };
}

/**
 * إثراء التوصية بالاستشهادات
 */
export function enrichRecommendation(
  recommendation: any,
  structuredRules: StructuredRule[]
): EnrichedRecommendation {
  const relatedControls = (recommendation.relatedControlCodes || [])
    .map((code: string) => mapGapToControl(code, structuredRules))
    .filter(Boolean)
    .map((rule: StructuredRule) => ({
      id: rule.controlId,
      code: rule.controlCode,
      name: rule.controlName,
      description: rule.controlDescription,
    }));
  
  return {
    title: recommendation.title,
    description: recommendation.description,
    priority: recommendation.priority,
    estimatedEffort: recommendation.estimatedEffort,
    relatedControls,
  };
}

/**
 * إثراء المخاطرة بالاستشهادات
 */
export function enrichRisk(
  risk: any,
  structuredRules: StructuredRule[]
): EnrichedRisk {
  const relatedControls = (risk.relatedControlCodes || [])
    .map((code: string) => mapGapToControl(code, structuredRules))
    .filter(Boolean)
    .map((rule: StructuredRule) => ({
      id: rule.controlId,
      code: rule.controlCode,
      name: rule.controlName,
      description: rule.controlDescription,
    }));
  
  return {
    risk: risk.risk,
    severity: risk.severity,
    likelihood: risk.likelihood,
    relatedControls,
  };
}

/**
 * إثراء نتيجة التحليل الكاملة
 */
export function enrichAnalysisResult(
  analysisResult: any
): EnrichedAnalysisResult {
  const structuredRules = analysisResult._structuredRules || [];
  const framework = analysisResult._framework;
  
  if (!framework || structuredRules.length === 0) {
    throw new Error('لا توجد قواعد مهيكلة في نتيجة التحليل');
  }
  
  // إثراء الفجوات
  const enrichedGaps = (analysisResult.gaps || []).map((gap: any) =>
    enrichGapWithCitations(gap, structuredRules)
  );
  
  // إثراء التوصيات
  const enrichedRecommendations = (analysisResult.recommendations || []).map((rec: any) =>
    enrichRecommendation(rec, structuredRules)
  );
  
  // إثراء المخاطر
  const enrichedRisks = (analysisResult.risks || []).map((risk: any) =>
    enrichRisk(risk, structuredRules)
  );
  
  return {
    complianceScore: analysisResult.complianceScore || 0,
    overallAssessment: analysisResult.overallAssessment || '',
    gaps: enrichedGaps,
    recommendations: enrichedRecommendations,
    strengths: analysisResult.strengths || [],
    risks: enrichedRisks,
    frameworkInfo: {
      id: framework.id,
      code: framework.code,
      name: framework.name,
      authority: framework.authority || '',
      version: framework.version,
    },
    analyzedAt: new Date().toISOString(),
    totalControls: structuredRules.length,
    totalArticles: structuredRules.reduce((sum: number, r: any) => sum + r.relatedArticles.length, 0),
  };
}

/**
 * إحصائيات النتائج المُثراة
 */
export function getEnrichedResultStatistics(result: EnrichedAnalysisResult) {
  const totalGaps = result.gaps.length;
  const highPriorityGaps = result.gaps.filter(g => g.priority === 'high').length;
  const mediumPriorityGaps = result.gaps.filter(g => g.priority === 'medium').length;
  const lowPriorityGaps = result.gaps.filter(g => g.priority === 'low').length;
  
  const gapsWithEvidence = result.gaps.filter(g => g.evidenceText && g.evidenceText.length > 0).length;
  const gapsWithControls = result.gaps.filter(g => g.controls.length > 0).length;
  const gapsWithArticles = result.gaps.filter(g => g.articles.length > 0).length;
  
  const totalRecommendations = result.recommendations.length;
  const highPriorityRecs = result.recommendations.filter(r => r.priority === 'high').length;
  
  const totalRisks = result.risks.length;
  const highSeverityRisks = result.risks.filter(r => r.severity === 'high').length;
  
  return {
    complianceScore: result.complianceScore,
    totalGaps,
    highPriorityGaps,
    mediumPriorityGaps,
    lowPriorityGaps,
    gapsWithEvidence,
    gapsWithControls,
    gapsWithArticles,
    evidenceCoverage: totalGaps > 0 ? ((gapsWithEvidence / totalGaps) * 100).toFixed(1) + '%' : '0%',
    controlsCoverage: totalGaps > 0 ? ((gapsWithControls / totalGaps) * 100).toFixed(1) + '%' : '0%',
    articlesCoverage: totalGaps > 0 ? ((gapsWithArticles / totalGaps) * 100).toFixed(1) + '%' : '0%',
    totalRecommendations,
    highPriorityRecs,
    totalRisks,
    highSeverityRisks,
    totalControls: result.totalControls,
    totalArticles: result.totalArticles,
  };
}
