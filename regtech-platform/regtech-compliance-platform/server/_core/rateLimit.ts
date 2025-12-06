import { TRPCError } from '@trpc/server';

/**
 * Rate limiting middleware لحماية API من الإساءة
 * 
 * يستخدم in-memory store بسيط - في الإنتاج يفضل استخدام Redis
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// تنظيف الـ store كل 10 دقائق
setInterval(() => {
  const now = Date.now();
  const entries = Array.from(rateLimitStore.entries());
  for (const [key, entry] of entries) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

export interface RateLimitOptions {
  /**
   * عدد الطلبات المسموح بها في الفترة الزمنية
   * @default 100
   */
  max?: number;
  
  /**
   * الفترة الزمنية بالميلي ثانية
   * @default 60000 (دقيقة واحدة)
   */
  windowMs?: number;
  
  /**
   * رسالة الخطأ عند تجاوز الحد
   */
  message?: string;
}

/**
 * إنشاء rate limiter middleware
 */
export function createRateLimiter(options: RateLimitOptions = {}) {
  const {
    max = 100,
    windowMs = 60 * 1000, // دقيقة واحدة
    message = 'تم تجاوز عدد الطلبات المسموح به. يرجى المحاولة لاحقاً.',
  } = options;

  return async ({ ctx, next }: any) => {
    // استخدام IP address أو user ID كمفتاح
    const identifier = ctx.user?.id?.toString() || ctx.req.ip || 'anonymous';
    const key = `rate-limit:${identifier}`;
    
    const now = Date.now();
    const entry = rateLimitStore.get(key);
    
    if (!entry || entry.resetTime < now) {
      // إنشاء entry جديد
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }
    
    if (entry.count >= max) {
      // تجاوز الحد المسموح
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message,
      });
    }
    
    // زيادة العداد
    entry.count++;
    rateLimitStore.set(key, entry);
    
    return next();
  };
}

/**
 * Rate limiters محددة مسبقاً
 */
export const rateLimiters = {
  /**
   * للـ queries العادية - 100 طلب/دقيقة
   */
  standard: createRateLimiter({
    max: 100,
    windowMs: 60 * 1000,
  }),
  
  /**
   * للـ mutations - 30 طلب/دقيقة
   */
  strict: createRateLimiter({
    max: 30,
    windowMs: 60 * 1000,
    message: 'تم تجاوز عدد العمليات المسموح بها. يرجى الانتظار قليلاً.',
  }),
  
  /**
   * للعمليات الحساسة (تسجيل دخول، إلخ) - 5 طلبات/دقيقة
   */
  sensitive: createRateLimiter({
    max: 5,
    windowMs: 60 * 1000,
    message: 'تم تجاوز عدد المحاولات المسموح بها. يرجى الانتظار دقيقة.',
  }),
};
