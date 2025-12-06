/**
 * XSS Protection Utilities
 * 
 * Provides server-side XSS protection for user inputs
 * Uses 'xss' library for sanitization
 */

import xss from 'xss';

/**
 * Sanitize user input to prevent XSS attacks
 * 
 * @param input - User input string
 * @param options - XSS filter options
 * @returns Sanitized string
 */
export function sanitizeInput(input: string, options?: any): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return xss(input, {
    whiteList: {
      // Allow basic formatting
      b: [],
      i: [],
      u: [],
      strong: [],
      em: [],
      p: [],
      br: [],
      // Allow links with href only
      a: ['href', 'title'],
      // Allow lists
      ul: [],
      ol: [],
      li: [],
      // Allow code blocks
      code: [],
      pre: [],
    },
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script', 'style'],
    ...options,
  });
}

/**
 * Sanitize plain text (no HTML allowed)
 * 
 * @param input - User input string
 * @returns Sanitized plain text
 */
export function sanitizePlainText(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return xss(input, {
    whiteList: {}, // No HTML tags allowed
    stripIgnoreTag: true,
    stripIgnoreTagBody: true,
  });
}

/**
 * Sanitize object recursively
 * 
 * @param obj - Object to sanitize
 * @returns Sanitized object
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === 'string' ? sanitizeInput(item) : item
      );
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}

/**
 * Validate and sanitize email
 * 
 * @param email - Email address
 * @returns Sanitized email or null if invalid
 */
export function sanitizeEmail(email: string): string | null {
  if (!email || typeof email !== 'string') {
    return null;
  }

  const sanitized = sanitizePlainText(email.trim().toLowerCase());
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitized)) {
    return null;
  }

  return sanitized;
}

/**
 * Validate and sanitize URL
 * 
 * @param url - URL string
 * @returns Sanitized URL or null if invalid
 */
export function sanitizeUrl(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }

  const sanitized = sanitizePlainText(url.trim());

  try {
    const parsed = new URL(sanitized);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

/**
 * Escape HTML special characters
 * 
 * @param text - Text to escape
 * @returns Escaped text
 */
export function escapeHtml(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sanitize SQL input (basic protection)
 * Note: Use parameterized queries instead of this for SQL
 * 
 * @param input - SQL input
 * @returns Sanitized input
 */
export function sanitizeSqlInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove SQL keywords and special characters
  return input
    .replace(/['";\\]/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .replace(/xp_/gi, '')
    .replace(/sp_/gi, '')
    .trim();
}
