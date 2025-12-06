/**
 * Feature Flags System
 * 
 * نظام محكم للتحكم في الميزات بشكل ديناميكي
 * يسمح بتفعيل/تعطيل الميزات بدون إعادة نشر الكود
 */

import { ENV } from './env';

/**
 * قائمة Feature Flags المتاحة
 */
export const FEATURE_FLAGS = {
  // الميزات التجارية
  PAYMENTS_ENABLED: 'payments_enabled',
  SUBSCRIPTIONS_ENABLED: 'subscriptions_enabled',
  INVOICES_ENABLED: 'invoices_enabled',
  
  // الميزات المتقدمة
  AI_ASSISTANT_ENABLED: 'ai_assistant_enabled',
  ADVANCED_ANALYTICS_ENABLED: 'advanced_analytics_enabled',
  CUSTOM_REPORTS_ENABLED: 'custom_reports_enabled',
  
  // الميزات التجريبية
  BETA_FEATURES_ENABLED: 'beta_features_enabled',
} as const;

export type FeatureFlagKey = typeof FEATURE_FLAGS[keyof typeof FEATURE_FLAGS];

/**
 * القيم الافتراضية للـ Feature Flags
 * 
 * يمكن تجاوزها عبر Environment Variables
 */
const DEFAULT_FLAGS: Record<FeatureFlagKey, boolean> = {
  // الميزات التجارية - معطلة افتراضياً (تحتاج مراجعة قانونية)
  [FEATURE_FLAGS.PAYMENTS_ENABLED]: false,
  [FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED]: false,
  [FEATURE_FLAGS.INVOICES_ENABLED]: false,
  
  // الميزات المتقدمة - معطلة افتراضياً
  [FEATURE_FLAGS.AI_ASSISTANT_ENABLED]: false,
  [FEATURE_FLAGS.ADVANCED_ANALYTICS_ENABLED]: false,
  [FEATURE_FLAGS.CUSTOM_REPORTS_ENABLED]: false,
  
  // الميزات التجريبية - معطلة افتراضياً
  [FEATURE_FLAGS.BETA_FEATURES_ENABLED]: false,
};

/**
 * قراءة قيمة Feature Flag من Environment Variables
 * 
 * @param flagKey - مفتاح الـ Flag
 * @returns قيمة الـ Flag (true/false)
 */
function getEnvFlag(flagKey: FeatureFlagKey): boolean {
  const envKey = `FEATURE_${flagKey.toUpperCase()}`;
  const envValue = process.env[envKey];
  
  if (envValue === undefined) {
    return DEFAULT_FLAGS[flagKey];
  }
  
  return envValue === 'true' || envValue === '1';
}

/**
 * التحقق من تفعيل Feature Flag
 * 
 * @param flagKey - مفتاح الـ Flag
 * @returns true إذا كان الـ Flag مفعل
 * 
 * @example
 * if (isFeatureEnabled(FEATURE_FLAGS.PAYMENTS_ENABLED)) {
 *   // تنفيذ كود المدفوعات
 * }
 */
export function isFeatureEnabled(flagKey: FeatureFlagKey): boolean {
  return getEnvFlag(flagKey);
}

/**
 * التحقق من تفعيل Feature Flag ورمي خطأ إذا كان معطل
 * 
 * @param flagKey - مفتاح الـ Flag
 * @throws Error إذا كان الـ Flag معطل
 * 
 * @example
 * requireFeature(FEATURE_FLAGS.PAYMENTS_ENABLED);
 * // إذا كان معطل، سيرمي خطأ
 */
export function requireFeature(flagKey: FeatureFlagKey): void {
  if (!isFeatureEnabled(flagKey)) {
    throw new Error(`Feature "${flagKey}" is not enabled`);
  }
}

/**
 * الحصول على جميع Feature Flags المفعلة
 * 
 * @returns كائن يحتوي على جميع الـ Flags وقيمها
 * 
 * @example
 * const flags = getAllFeatureFlags();
 * console.log(flags); // { payments_enabled: false, ... }
 */
export function getAllFeatureFlags(): Record<FeatureFlagKey, boolean> {
  const flags: Record<string, boolean> = {};
  
  for (const flagKey of Object.values(FEATURE_FLAGS)) {
    flags[flagKey] = isFeatureEnabled(flagKey);
  }
  
  return flags as Record<FeatureFlagKey, boolean>;
}

/**
 * معلومات Feature Flag
 */
export interface FeatureFlagInfo {
  key: FeatureFlagKey;
  enabled: boolean;
  name: string;
  description: string;
  category: 'commercial' | 'advanced' | 'experimental';
}

/**
 * الحصول على معلومات جميع Feature Flags
 * 
 * @returns قائمة بمعلومات جميع الـ Flags
 */
export function getAllFeatureFlagsInfo(): FeatureFlagInfo[] {
  return [
    // الميزات التجارية
    {
      key: FEATURE_FLAGS.PAYMENTS_ENABLED,
      enabled: isFeatureEnabled(FEATURE_FLAGS.PAYMENTS_ENABLED),
      name: 'المدفوعات',
      description: 'تفعيل نظام المدفوعات الإلكترونية',
      category: 'commercial',
    },
    {
      key: FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED,
      enabled: isFeatureEnabled(FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED),
      name: 'الاشتراكات',
      description: 'تفعيل نظام الاشتراكات والباقات',
      category: 'commercial',
    },
    {
      key: FEATURE_FLAGS.INVOICES_ENABLED,
      enabled: isFeatureEnabled(FEATURE_FLAGS.INVOICES_ENABLED),
      name: 'الفواتير',
      description: 'تفعيل نظام الفواتير',
      category: 'commercial',
    },
    
    // الميزات المتقدمة
    {
      key: FEATURE_FLAGS.AI_ASSISTANT_ENABLED,
      enabled: isFeatureEnabled(FEATURE_FLAGS.AI_ASSISTANT_ENABLED),
      name: 'المساعد الذكي',
      description: 'تفعيل المساعد الذكي المدعوم بالذكاء الاصطناعي',
      category: 'advanced',
    },
    {
      key: FEATURE_FLAGS.ADVANCED_ANALYTICS_ENABLED,
      enabled: isFeatureEnabled(FEATURE_FLAGS.ADVANCED_ANALYTICS_ENABLED),
      name: 'التحليلات المتقدمة',
      description: 'تفعيل لوحات التحكم والتحليلات المتقدمة',
      category: 'advanced',
    },
    {
      key: FEATURE_FLAGS.CUSTOM_REPORTS_ENABLED,
      enabled: isFeatureEnabled(FEATURE_FLAGS.CUSTOM_REPORTS_ENABLED),
      name: 'التقارير المخصصة',
      description: 'تفعيل إنشاء وتخصيص التقارير',
      category: 'advanced',
    },
    
    // الميزات التجريبية
    {
      key: FEATURE_FLAGS.BETA_FEATURES_ENABLED,
      enabled: isFeatureEnabled(FEATURE_FLAGS.BETA_FEATURES_ENABLED),
      name: 'الميزات التجريبية',
      description: 'تفعيل الميزات التجريبية (Beta)',
      category: 'experimental',
    },
  ];
}

/**
 * Middleware للتحقق من Feature Flag في tRPC
 * 
 * @param flagKey - مفتاح الـ Flag
 * @returns middleware function
 * 
 * @example
 * const paymentsRouter = router({
 *   create: protectedProcedure
 *     .use(requireFeatureMiddleware(FEATURE_FLAGS.PAYMENTS_ENABLED))
 *     .mutation(async () => { ... }),
 * });
 */
export function requireFeatureMiddleware(flagKey: FeatureFlagKey) {
  return async ({ next }: { next: () => Promise<any> }) => {
    if (!isFeatureEnabled(flagKey)) {
      throw new Error(`Feature "${flagKey}" is not enabled. Please contact support to enable this feature.`);
    }
    return next();
  };
}

// Log Feature Flags عند بداية التشغيل
if (process.env.NODE_ENV !== 'test') {
  console.log('[Feature Flags] Initialized:');
  const flags = getAllFeatureFlags();
  for (const [key, value] of Object.entries(flags)) {
    console.log(`  - ${key}: ${value ? '✅ enabled' : '❌ disabled'}`);
  }
}
