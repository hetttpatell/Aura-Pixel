import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // Optimize React for production
      jsxRuntime: 'automatic',
      // Add Fast Refresh for development
      fastRefresh: mode === 'development',
    }),
  ],

  // Build optimizations
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',

    // Output directory
    outDir: 'dist',

    // Enable source maps for debugging (disable in production for smaller builds)
    sourcemap: mode === 'production' ? false : true,

    // Minification options (using default esbuild/oxc minifier)
    minify: true,

    // Code splitting and chunking strategy
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: (id) => {
          // React core vendor chunk
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          // Animation libraries
          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-animation';
          }
          // Router
          if (id.includes('node_modules/react-router-dom/') || id.includes('node_modules/@remix-run/')) {
            return 'vendor-router';
          }
          // Intersection Observer and utilities
          if (id.includes('node_modules/react-intersection-observer/')) {
            return 'vendor-utils';
          }
          // Other node_modules
          if (id.includes('node_modules/')) {
            return 'vendor';
          }
        },
        // Chunk file naming for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
      },
    },

    // Asset inline limit (10KB)
    assetsInlineLimit: 10240,

    // CSS optimization
    cssMinify: true,
    cssCodeSplit: true,

    // Module preload polyfill
    modulePreload: {
      polyfill: true,
    },

    // Report bundle size
    reportCompressedSize: true,

    // Chunk size warning limit (in KB)
    chunkSizeWarningLimit: 500,
  },

  // Development server configuration
  server: {
    port: 3000,
    strictPort: false,
    open: true,
    host: true,
    // Enable compression in dev
    cors: true,
  },

  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: false,
    open: true,
    host: true,
  },

  // Resolve aliases for cleaner imports
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@constants': '/src/constants',
      '@assets': '/src/assets',
    },
  },

  // CSS configuration
  css: {
    devSourcemap: true,
    // PostCSS is configured separately in postcss.config.js
  },

  // Environment variables
  envPrefix: 'VITE_',

  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'react-intersection-observer',
    ],
    exclude: [],
  },

  // ESBuild options (using oxc in Vite 8+)
  esbuild: {
    // Drop console in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}))
