/**
 * Client-Side XSS Protection
 * 
 * Provides client-side XSS protection for user inputs
 * Uses DOMPurify for sanitization
 */

import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content
 * 
 * @param dirty - Potentially unsafe HTML
 * @param options - DOMPurify configuration
 * @returns Sanitized HTML
 */
export function sanitizeHtml(dirty: string, options?: any): string {
  if (!dirty || typeof dirty !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'u', 'strong', 'em', 'p', 'br', 'a', 'ul', 'ol', 'li', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'title'],
    ALLOW_DATA_ATTR: false,
    RETURN_TRUSTED_TYPE: false,
    ...options,
  }) as unknown as string;
}

/**
 * Sanitize plain text (strip all HTML)
 * 
 * @param dirty - Potentially unsafe text
 * @returns Sanitized plain text
 */
export function sanitizePlainText(dirty: string): string {
  if (!dirty || typeof dirty !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    KEEP_CONTENT: true,
  });
}

/**
 * Sanitize user input for display
 * 
 * @param input - User input
 * @returns Sanitized input
 */
export function sanitizeUserInput(input: string): string {
  return sanitizePlainText(input).trim();
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

  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
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

  try {
    const parsed = new URL(url.trim());
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}
