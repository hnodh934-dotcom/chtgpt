import Redis from "ioredis";

/**
 * Redis Cache Helper
 * 
 * Provides caching functionality for expensive operations:
 * - Compliance Score calculations
 * - Framework queries
 * - Control lookups
 * - Gap Analysis results
 */

let redis: Redis | null = null;

// Initialize Redis client (optional - graceful degradation if not available)
function getRedisClient(): Redis | null {
  if (redis) return redis;

  try {
    // Try to connect to Redis (localhost by default)
    redis = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT || "6379"),
      password: process.env.REDIS_PASSWORD,
      retryStrategy: (times) => {
        // Stop retrying after 3 attempts
        if (times > 3) {
          console.warn("[Cache] Redis unavailable, falling back to no-cache mode");
          return null;
        }
        return Math.min(times * 100, 2000);
      },
      lazyConnect: true,
    });

    redis.on("error", (err) => {
      console.warn("[Cache] Redis error:", err.message);
    });

    redis.on("connect", () => {
      console.log("[Cache] Redis connected successfully");
    });

    return redis;
  } catch (error) {
    console.warn("[Cache] Failed to initialize Redis:", error);
    return null;
  }
}

/**
 * Get value from cache
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  const client = getRedisClient();
  if (!client) return null;

  try {
    const value = await client.get(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  } catch (error) {
    console.warn(`[Cache] Failed to get ${key}:`, error);
    return null;
  }
}

/**
 * Set value in cache with TTL (in seconds)
 */
export async function cacheSet(key: string, value: any, ttl: number = 300): Promise<boolean> {
  const client = getRedisClient();
  if (!client) return false;

  try {
    await client.setex(key, ttl, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`[Cache] Failed to set ${key}:`, error);
    return false;
  }
}

/**
 * Delete key from cache
 */
export async function cacheDelete(key: string): Promise<boolean> {
  const client = getRedisClient();
  if (!client) return false;

  try {
    await client.del(key);
    return true;
  } catch (error) {
    console.warn(`[Cache] Failed to delete ${key}:`, error);
    return false;
  }
}

/**
 * Delete keys matching pattern
 */
export async function cacheDeletePattern(pattern: string): Promise<number> {
  const client = getRedisClient();
  if (!client) return 0;

  try {
    const keys = await client.keys(pattern);
    if (keys.length === 0) return 0;
    await client.del(...keys);
    return keys.length;
  } catch (error) {
    console.warn(`[Cache] Failed to delete pattern ${pattern}:`, error);
    return 0;
  }
}

/**
 * Cache wrapper for expensive operations
 * 
 * Usage:
 * ```ts
 * const result = await withCache(
 *   'compliance:score:PDPL',
 *   () => calculateComplianceScore('PDPL'),
 *   300 // TTL in seconds
 * );
 * ```
 */
export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttl: number = 300
): Promise<T> {
  // Try to get from cache first
  const cached = await cacheGet<T>(key);
  if (cached !== null) {
    console.log(`[Cache] HIT: ${key}`);
    return cached;
  }

  console.log(`[Cache] MISS: ${key}`);

  // Execute function and cache result
  const result = await fn();
  await cacheSet(key, result, ttl);

  return result;
}

/**
 * Cache key generators for consistency
 */
export const CacheKeys = {
  complianceScore: (frameworkCode: string) => `compliance:score:${frameworkCode}`,
  complianceOverall: () => `compliance:overall`,
  complianceFrameworks: () => `compliance:frameworks`,
  complianceGaps: (frameworkCode?: string) => 
    frameworkCode ? `compliance:gaps:${frameworkCode}` : `compliance:gaps:all`,
  frameworkList: () => `frameworks:list`,
  frameworkById: (id: number) => `frameworks:${id}`,
  controlsList: (frameworkId?: number) => 
    frameworkId ? `controls:framework:${frameworkId}` : `controls:list`,
  controlById: (id: number) => `controls:${id}`,
  articlesList: () => `articles:list`,
  articleById: (id: number) => `articles:${id}`,
};

/**
 * Cache TTLs (in seconds)
 */
export const CacheTTL = {
  short: 60,        // 1 minute - for frequently changing data
  medium: 300,      // 5 minutes - for semi-static data
  long: 1800,       // 30 minutes - for static data
  veryLong: 3600,   // 1 hour - for rarely changing data
};

/**
 * Invalidate compliance cache when data changes
 */
export async function invalidateComplianceCache(): Promise<void> {
  await cacheDeletePattern("compliance:*");
  console.log("[Cache] Invalidated compliance cache");
}

/**
 * Invalidate framework cache when data changes
 */
export async function invalidateFrameworkCache(): Promise<void> {
  await cacheDeletePattern("frameworks:*");
  await cacheDeletePattern("controls:*");
  await cacheDeletePattern("articles:*");
  console.log("[Cache] Invalidated framework cache");
}
