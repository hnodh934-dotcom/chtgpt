/**
 * نموذج البيانات الموحد للنظام الهرمي الرباعي الطبقات
 * 
 * الطبقات الأربع:
 * 1. Framework (الإطار التنظيمي)
 * 2. Control (الضابط)
 * 3. Article (المادة)
 * 4. Provision (الحكم)
 * 
 * جميع الحقول null-safe لتجنب أخطاء TypeScript
 */

/**
 * أنواع العلاقات بين العقد في النظام الهرمي
 */
export type RelationType = 
  | 'يستند إلى'   // يستند إلى: العقدة تستند إلى عقدة أخرى
  | 'يفسّر'       // يفسّر: العقدة تفسّر عقدة أخرى
  | 'يقيّد'       // يقيّد: العقدة تقيّد عقدة أخرى
  | 'يحيل إلى';   // يحيل إلى: العقدة تحيل إلى عقدة أخرى

/**
 * نوع العقدة في النظام الهرمي
 */
export type NodeKind = 'framework' | 'control' | 'article' | 'provision';

/**
 * العقدة الأساسية - جميع الحقول اختيارية لتجنب مشاكل null
 */
export interface BaseNode {
  id: string;
  version: string;
  kind: NodeKind;
  name: string;
  description?: string | null;
  regulator?: string | null;
  sector?: string | null;
  metadata?: Record<string, unknown>;
}

/**
 * الإطار التنظيمي (Framework)
 * الطبقة الأولى في الهرم
 */
export interface Framework extends BaseNode {
  kind: 'framework';
  effectiveDate?: string | null;
  jurisdiction?: string | null;
  externalUrl?: string | null;
  tags?: string[];
}

/**
 * الضابط (Control)
 * الطبقة الثانية في الهرم
 */
export interface Control extends BaseNode {
  kind: 'control';
  frameworkId?: string | null;
  category?: string | null;
  priority?: 'high' | 'medium' | 'low' | null;
  implementationGuidance?: string | null;
}

/**
 * المادة (Article)
 * الطبقة الثالثة في الهرم
 */
export interface Article extends BaseNode {
  kind: 'article';
  controlId?: string | null;
  articleNo?: string | null;
  legalText?: string | null;
  references?: string[];
}

/**
 * الحكم (Provision)
 * الطبقة الرابعة في الهرم
 */
export interface Provision extends BaseNode {
  kind: 'provision';
  articleId?: string | null;
  citation?: string | null;
  court?: string | null;
  date?: string | null;
  summary?: string | null;
}

/**
 * الحافة (Edge) - تمثل العلاقة بين عقدتين
 */
export interface Edge {
  id: string;
  fromId: string;
  toId: string;
  relation: RelationType;
  createdAt: string;
  createdBy: string;
  metadata?: Record<string, unknown>;
}

/**
 * حدث التدقيق (Audit Event)
 */
export interface AuditEvent {
  id: string;
  userId: string;
  action: string;
  targetId: string;
  targetKind: NodeKind;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

/**
 * نوع الاتحاد لجميع أنواع العقد
 */
export type AnyNode = Framework | Control | Article | Provision;

/**
 * خريطة العقد - لتسهيل الوصول السريع
 */
export type NodeMap = Map<string, AnyNode>;

/**
 * خريطة الحواف - لتسهيل الوصول السريع
 */
export type EdgeMap = Map<string, Edge[]>;
