import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import compression from "vite-plugin-compression";


const plugins = [
  react(),
  tailwindcss(),
  compression({
    algorithm: 'gzip',
    ext: '.gz',
    threshold: 10240, // Only compress files > 10KB
  }),
  compression({
    algorithm: 'brotliCompress',
    ext: '.br',
    threshold: 10240,
  }),
];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into smaller chunks
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            // tRPC & Query
            if (id.includes('@trpc') || id.includes('@tanstack')) {
              return 'vendor-trpc';
            }
            // UI libraries
            if (id.includes('lucide-react') || id.includes('recharts')) {
              return 'vendor-ui';
            }
            // PDF & Excel
            if (id.includes('jspdf') || id.includes('xlsx')) {
              return 'vendor-export';
            }
            // Other utilities
            if (id.includes('date-fns') || id.includes('wouter') || id.includes('clsx')) {
              return 'vendor-utils';
            }
            // All other node_modules
            return 'vendor-other';
          }
        },
      },
      // Increase memory limit for rollup
      maxParallelFileOps: 2,
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    target: 'es2020',
    // Reduce memory usage
    sourcemap: false,
    reportCompressedSize: false,
  },
  server: {
    host: true,
    allowedHosts: true, // Allow all hosts for custom domain deployment
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
