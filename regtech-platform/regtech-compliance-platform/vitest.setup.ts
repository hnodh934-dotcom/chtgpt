import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { createTestDb, cleanupTestDb, closeTestDb, seedTestDb } from "./__tests__/setup/testDb";
import { setupMSW } from "./__tests__/mocks/server";

// Setup Test Database
beforeAll(() => {
  createTestDb();
  seedTestDb();
});

// Cleanup after each test
afterEach(() => {
  cleanup();
  cleanupTestDb();
  seedTestDb();
});

afterAll(() => {
  closeTestDb();
});

// Setup MSW
setupMSW();

// Mock environment variables
vi.stubEnv("NODE_ENV", "test");
vi.stubEnv("DATABASE_URL", ":memory:");
vi.stubEnv("JWT_SECRET", "test-secret");
vi.stubEnv("VITE_APP_ID", "test-app-id");
vi.stubEnv("VITE_APP_TITLE", "RegTech Test");
vi.stubEnv("VITE_APP_LOGO", "/logo.svg");
vi.stubEnv("OAUTH_SERVER_URL", "https://oauth.test.com");
vi.stubEnv("VITE_OAUTH_PORTAL_URL", "https://oauth-portal.test.com");
vi.stubEnv("OWNER_OPEN_ID", "test-owner-openid");
vi.stubEnv("OWNER_NAME", "Test Owner");
vi.stubEnv("BUILT_IN_FORGE_API_URL", "https://api.test.com");
vi.stubEnv("BUILT_IN_FORGE_API_KEY", "test-api-key");
vi.stubEnv("VITE_FRONTEND_FORGE_API_KEY", "test-frontend-api-key");
vi.stubEnv("VITE_FRONTEND_FORGE_API_URL", "https://api.test.com");

// Mock console methods to reduce noise
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: console.error,
};

// Mock fetch globally
global.fetch = vi.fn();

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;
