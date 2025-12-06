import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "**/__tests__/**/*.test.{ts,tsx}",
      "**/*.test.{ts,tsx}",
      "server/**/*.test.ts",
      "server/**/*.spec.ts",
    ],
    exclude: ["node_modules", "dist", "build", ".next", "e2e"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/",
        "dist/",
        "build/",
        ".next/",
        "e2e/",
        "**/*.config.{js,ts}",
        "**/*.d.ts",
        "**/types.ts",
        "**/__tests__/**",
        "**/test-utils/**",
        "server/_core/**", // Framework code
        "client/src/components/ui/**", // shadcn/ui components
        "drizzle/**", // Database migrations
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
      all: true,
      clean: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
