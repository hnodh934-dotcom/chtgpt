/**
 * Compliance Score API
 * حساب نسب الامتثال لكل إطار تنظيمي
 */

import { z } from 'zod';
import { publicProcedure, router } from './_core/trpc';
import { getDb } from './db';
import { controls, frameworks } from '../drizzle/schema';
import { eq, and, sql } from 'drizzle-orm';
import { withCache, CacheKeys, CacheTTL } from './_core/cache';

/**
 * حساب نسبة الامتثال لإطار معين
 */
async function calculateComplianceScore(frameworkCode: string) {
  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  // الحصول على الإطار
  const framework = await db
    .select()
    .from(frameworks)
    .where(eq(frameworks.code, frameworkCode))
    .limit(1);

  if (framework.length === 0) {
    throw new Error(`Framework ${frameworkCode} not found`);
  }

  const frameworkId = framework[0].id;

  // الحصول على جميع الضوابط
  const allControls = await db
    .select()
    .from(controls)
    .where(eq(controls.frameworkId, frameworkId));

  const totalControls = allControls.length;
  
  if (totalControls === 0) {
    return {
      frameworkCode,
      frameworkName: framework[0].name,
      totalControls: 0,
      implementedControls: 0,
      complianceScore: 0,
      status: 'no_controls' as const,
      gaps: [],
      criticalGaps: [],
    };
  }

  // حساب الضوابط المنفذة (افتراضياً 70% للتوضيح)
  // في الواقع، يجب أن يأتي هذا من جدول assessments
  const implementedControls = Math.floor(totalControls * 0.7);
  const complianceScore = Math.round((implementedControls / totalControls) * 100);

  // تحديد الفجوات الحرجة
  const criticalControls = allControls.filter(c => c.priority === 'critical');
  const criticalGaps = criticalControls.slice(0, 5).map(c => ({
    controlCode: c.code,
    controlName: c.name,
    priority: c.priority,
    category: c.category || 'General',
  }));

  // تحديد الحالة
  let status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  if (complianceScore >= 90) status = 'excellent';
  else if (complianceScore >= 75) status = 'good';
  else if (complianceScore >= 60) status = 'fair';
  else if (complianceScore >= 40) status = 'poor';
  else status = 'critical';

  // حساب الفجوات حسب الفئة
  const gaps = await db
    .select({
      category: controls.category,
      total: sql<number>`COUNT(*)`,
      implemented: sql<number>`FLOOR(COUNT(*) * 0.7)`, // افتراضي
    })
    .from(controls)
    .where(eq(controls.frameworkId, frameworkId))
    .groupBy(controls.category);

  return {
    frameworkCode,
    frameworkName: framework[0].name,
    frameworkNameEn: framework[0].nameEn,
    authority: framework[0].authority,
    totalControls,
    implementedControls,
    complianceScore,
    status,
    gaps: gaps.map(g => ({
      category: g.category || 'General',
      total: Number(g.total),
      implemented: Number(g.implemented),
      percentage: Math.round((Number(g.implemented) / Number(g.total)) * 100),
    })),
    criticalGaps,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * حساب نسبة الامتثال الإجمالية لجميع الأطر
 */
async function calculateOverallCompliance() {
  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  const allFrameworks = await db
    .select()
    .from(frameworks)
    .where(eq(frameworks.status, 'active'));

  const scores = await Promise.all(
    allFrameworks.map(f => calculateComplianceScore(f.code))
  );

  const totalScore = scores.reduce((sum, s) => sum + s.complianceScore, 0);
  const averageScore = Math.round(totalScore / scores.length);

  return {
    overallScore: averageScore,
    frameworks: scores,
    totalFrameworks: scores.length,
    excellentFrameworks: scores.filter(s => s.status === 'excellent').length,
    goodFrameworks: scores.filter(s => s.status === 'good').length,
    needsImprovementFrameworks: scores.filter(s => ['fair', 'poor', 'critical'].includes(s.status)).length,
    lastUpdated: new Date().toISOString(),
  };
}

export const complianceRouter = router({
  /**
   * GET /api/compliance/score?frameworkCode=PDPL
   * حساب نسبة الامتثال لإطار معين
   */
  getScore: publicProcedure
    .input(z.object({
      frameworkCode: z.string(),
    }))
    .query(async ({ input }) => {
      return await calculateComplianceScore(input.frameworkCode);
    }),

  /**
   * GET /api/compliance/overall
   * حساب نسبة الامتثال الإجمالية
   */
  getOverall: publicProcedure
    .query(async () => {
      return await calculateOverallCompliance();
    }),

  /**
   * GET /api/compliance/frameworks
   * الحصول على جميع الأطر مع نسب الامتثال
   */
  getAllFrameworks: publicProcedure
    .query(async () => {
      const db = await getDb();
      if (!db) {
        throw new Error('Database not available');
      }

      const allFrameworks = await db
        .select()
        .from(frameworks)
        .where(eq(frameworks.status, 'active'));

      const scores = await Promise.all(
        allFrameworks.map(f => calculateComplianceScore(f.code))
      );

      return scores;
    }),

  /**
   * GET /api/compliance/gaps?frameworkCode=PDPL
   * تحليل الفجوات لإطار معين
   */
  getGaps: publicProcedure
    .input(z.object({
      frameworkCode: z.string(),
    }))
    .query(async ({ input }) => {
      const score = await calculateComplianceScore(input.frameworkCode);
      return {
        frameworkCode: score.frameworkCode,
        frameworkName: score.frameworkName,
        gaps: score.gaps,
        criticalGaps: score.criticalGaps,
        totalGaps: score.totalControls - score.implementedControls,
        complianceScore: score.complianceScore,
      };
    }),
});
