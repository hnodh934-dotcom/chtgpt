/**
 * محرك القواعد القانوني (Rule Engine)
 * 
 * يربط كل نتيجة تحليل بمصدرها في قاعدة البيانات (PDPL، ECC، SAMA)
 * مع عرض نص المادة أو الضابط في التقرير
 */

import { 
  getFrameworkWithDetails, 
  getControlsWithArticles,
  getArticleByCode,
  getControlByCode
} from './db';

/**
 * القاعدة المهيكلة (Structured Rule)
 * تحتوي على جميع المعلومات اللازمة للتحليل والاستشهاد
 */
export interface StructuredRule {
  // معلومات الضابط
  controlId: number;
  controlCode: string;
  controlName: string;
  controlNameEn?: string;
  controlDescription: string;
  controlDescriptionEn?: string;
  controlCategory: string;
  controlPriority: string;
  isRequired: boolean;
  implementationGuidance?: string;
  evidenceRequirements?: string;
  
  // المواد القانونية المرتبطة
  relatedArticles: Array<{
    articleId: number;
    articleCode: string;
    articleName: string;
    articleNameEn?: string;
    articleText: string;
    articleTextEn?: string;
    articleInterpretation?: string;
    articleCategory: string;
  }>;
  
  // معلومات الإطار
  frameworkId: number;
  frameworkCode: string;
  frameworkName: string;
  frameworkAuthority: string;
}

/**
 * معلومات الإطار التنظيمي
 */
export interface FrameworkInfo {
  id: number;
  code: string;
  name: string;
  nameEn?: string;
  description?: string;
  authority?: string;
  authorityEn?: string;
  sector?: string;
  category: string;
  effectiveDate?: Date;
  version: string;
  status: string;
  officialUrl?: string;
  documentUrl?: string;
}

/**
 * بناء القواعد المهيكلة من قاعدة البيانات
 * 
 * @param frameworkId - معرف الإطار التنظيمي
 * @returns قائمة القواعد المهيكلة
 */
export async function buildStructuredRules(frameworkId: number): Promise<{
  framework: FrameworkInfo | null;
  rules: StructuredRule[];
}> {
  // جلب الإطار مع كل التفاصيل
  const frameworkWithDetails = await getFrameworkWithDetails(frameworkId);
  
  if (!frameworkWithDetails) {
    return { framework: null, rules: [] };
  }
  
  // جلب الضوابط مع المواد المرتبطة
  const controlsWithArticles = await getControlsWithArticles(frameworkId);
  
  // بناء القواعد المهيكلة
  const rules: StructuredRule[] = controlsWithArticles.map(control => ({
    // معلومات الضابط
    controlId: control.id,
    controlCode: control.code,
    controlName: control.name,
    controlNameEn: control.nameEn || undefined,
    controlDescription: control.description || '',
    controlDescriptionEn: control.descriptionEn || undefined,
    controlCategory: control.category || 'general',
    controlPriority: control.priority,
    isRequired: control.isRequired,
    implementationGuidance: control.implementationGuidance || undefined,
    evidenceRequirements: control.evidenceRequirements || undefined,
    
    // المواد القانونية المرتبطة
    relatedArticles: (control.relatedArticles || []).filter(article => article).map(article => ({
      articleId: article!.id,
      articleCode: article!.code,
      articleName: article!.name,
      articleNameEn: article!.nameEn || undefined,
      articleText: article!.text,
      articleTextEn: article!.textEn || undefined,
      articleInterpretation: article!.interpretation || undefined,
      articleCategory: article!.category || '',
    })),
    
    // معلومات الإطار
    frameworkId: frameworkWithDetails.id,
    frameworkCode: frameworkWithDetails.code,
    frameworkName: frameworkWithDetails.name,
    frameworkAuthority: frameworkWithDetails.authority || '',
  }));
  
  return {
    framework: {
      id: frameworkWithDetails.id,
      code: frameworkWithDetails.code,
      name: frameworkWithDetails.name,
      nameEn: frameworkWithDetails.nameEn || undefined,
      description: frameworkWithDetails.description || undefined,
      authority: frameworkWithDetails.authority || undefined,
      authorityEn: frameworkWithDetails.authorityEn || undefined,
      sector: frameworkWithDetails.sector || undefined,
      category: frameworkWithDetails.category,
      effectiveDate: frameworkWithDetails.effectiveDate || undefined,
      version: frameworkWithDetails.version,
      status: frameworkWithDetails.status,
      officialUrl: frameworkWithDetails.officialUrl || undefined,
      documentUrl: frameworkWithDetails.documentUrl || undefined,
    },
    rules
  };
}

/**
 * التحقق من صحة القاعدة
 * 
 * @param rule - القاعدة المراد التحقق منها
 * @returns true إذا كانت القاعدة صحيحة
 */
export function validateRule(rule: StructuredRule): boolean {
  return !!(
    rule.controlId &&
    rule.controlCode &&
    rule.controlName &&
    rule.controlDescription &&
    rule.frameworkId &&
    rule.frameworkCode &&
    rule.frameworkName
  );
}

/**
 * ربط الفجوة بالقاعدة المناسبة بناءً على الكلمات المفتاحية
 * 
 * @param gapDescription - وصف الفجوة
 * @param rules - قائمة القواعد المتاحة
 * @returns القاعدة الأكثر صلة أو null
 */
export function matchRuleToGap(
  gapDescription: string,
  rules: StructuredRule[]
): StructuredRule | null {
  if (!gapDescription || rules.length === 0) return null;
  
  // تحويل النص إلى أحرف صغيرة وتقسيمه إلى كلمات
  const keywords = gapDescription.toLowerCase().split(/\s+/);
  
  let bestMatch: StructuredRule | null = null;
  let bestScore = 0;
  
  for (const rule of rules) {
    // بناء نص القاعدة للبحث
    const ruleText = `
      ${rule.controlName} 
      ${rule.controlDescription} 
      ${rule.controlCategory}
      ${rule.relatedArticles.map(a => `${a.articleName} ${a.articleText}`).join(' ')}
    `.toLowerCase();
    
    // حساب النقاط بناءً على تطابق الكلمات
    let score = 0;
    for (const keyword of keywords) {
      if (keyword.length < 3) continue; // تجاهل الكلمات القصيرة جداً
      if (ruleText.includes(keyword)) {
        score++;
      }
    }
    
    // إعطاء وزن أكبر للضوابط عالية الأولوية
    if (rule.controlPriority === 'critical') score *= 1.5;
    else if (rule.controlPriority === 'high') score *= 1.3;
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = rule;
    }
  }
  
  // إرجاع النتيجة فقط إذا كان هناك تطابق معقول
  return bestScore > 2 ? bestMatch : null;
}

/**
 * البحث عن قاعدة بواسطة رمز الضابط
 * 
 * @param controlCode - رمز الضابط (مثل PDPL-1)
 * @param rules - قائمة القواعد
 * @returns القاعدة المطابقة أو null
 */
export function findRuleByControlCode(
  controlCode: string,
  rules: StructuredRule[]
): StructuredRule | null {
  return rules.find(r => r.controlCode === controlCode) || null;
}

/**
 * البحث عن قاعدة بواسطة معرف الضابط
 * 
 * @param controlId - معرف الضابط
 * @param rules - قائمة القواعد
 * @returns القاعدة المطابقة أو null
 */
export function findRuleByControlId(
  controlId: number,
  rules: StructuredRule[]
): StructuredRule | null {
  return rules.find(r => r.controlId === controlId) || null;
}

/**
 * البحث عن مادة قانونية في القواعد بواسطة الرمز
 * 
 * @param articleCode - رمز المادة (مثل PDPL-ART-6)
 * @param rules - قائمة القواعد
 * @returns المادة المطابقة أو null
 */
export function findArticleByCode(
  articleCode: string,
  rules: StructuredRule[]
): StructuredRule['relatedArticles'][0] | null {
  for (const rule of rules) {
    const article = rule.relatedArticles.find(a => a.articleCode === articleCode);
    if (article) return article;
  }
  return null;
}

/**
 * تحويل القواعد إلى نص منسق للـ AI
 * 
 * @param rules - قائمة القواعد
 * @param maxRules - الحد الأقصى لعدد القواعد (اختياري)
 * @returns نص منسق يحتوي على القواعد
 */
export function rulesToPromptText(rules: StructuredRule[], maxRules?: number): string {
  const rulesToUse = maxRules ? rules.slice(0, maxRules) : rules;
  
  return rulesToUse.map(rule => {
    const articlesText = rule.relatedArticles.length > 0
      ? rule.relatedArticles
          .map(a => `  - ${a.articleCode}: ${a.articleName}\n    ${a.articleText}`)
          .join('\n')
      : '  - لا توجد مواد قانونية مرتبطة';
    
    return `
### ${rule.controlCode}: ${rule.controlName}
**الوصف:** ${rule.controlDescription}
**الفئة:** ${rule.controlCategory}
**الأولوية:** ${rule.controlPriority}
**إلزامي:** ${rule.isRequired ? 'نعم' : 'لا'}
${rule.implementationGuidance ? `**إرشادات التنفيذ:** ${rule.implementationGuidance}` : ''}
${rule.evidenceRequirements ? `**متطلبات الأدلة:** ${rule.evidenceRequirements}` : ''}

**المواد القانونية المرتبطة:**
${articlesText}
`;
  }).join('\n---\n');
}

/**
 * تحويل القواعد إلى JSON مهيكل للـ AI
 * 
 * @param rules - قائمة القواعد
 * @returns JSON مهيكل
 */
export function rulesToStructuredJson(rules: StructuredRule[]) {
  return rules.map(rule => ({
    control: {
      id: rule.controlId,
      code: rule.controlCode,
      name: rule.controlName,
      description: rule.controlDescription,
      category: rule.controlCategory,
      priority: rule.controlPriority,
      isRequired: rule.isRequired,
    },
    articles: rule.relatedArticles.map(article => ({
      id: article.articleId,
      code: article.articleCode,
      name: article.articleName,
      text: article.articleText,
    })),
    framework: {
      id: rule.frameworkId,
      code: rule.frameworkCode,
      name: rule.frameworkName,
      authority: rule.frameworkAuthority,
    }
  }));
}

/**
 * إحصائيات القواعد
 * 
 * @param rules - قائمة القواعد
 * @returns إحصائيات مفصلة
 */
export function getRulesStatistics(rules: StructuredRule[]) {
  const totalRules = rules.length;
  const requiredRules = rules.filter(r => r.isRequired).length;
  const optionalRules = totalRules - requiredRules;
  
  const priorityCount = {
    critical: rules.filter(r => r.controlPriority === 'critical').length,
    high: rules.filter(r => r.controlPriority === 'high').length,
    medium: rules.filter(r => r.controlPriority === 'medium').length,
    low: rules.filter(r => r.controlPriority === 'low').length,
  };
  
  const categories = Array.from(new Set(rules.map(r => r.controlCategory)));
  const categoryCount: Record<string, number> = {};
  categories.forEach(cat => {
    categoryCount[cat] = rules.filter(r => r.controlCategory === cat).length;
  });
  
  const totalArticles = rules.reduce((sum, r) => sum + r.relatedArticles.length, 0);
  const rulesWithArticles = rules.filter(r => r.relatedArticles.length > 0).length;
  const rulesWithoutArticles = totalRules - rulesWithArticles;
  
  return {
    totalRules,
    requiredRules,
    optionalRules,
    priorityCount,
    categories,
    categoryCount,
    totalArticles,
    rulesWithArticles,
    rulesWithoutArticles,
    averageArticlesPerRule: totalRules > 0 ? (totalArticles / totalRules).toFixed(2) : '0',
  };
}
