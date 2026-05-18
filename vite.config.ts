import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('react-router')) return 'vendor-router';
          if (id.includes('react-dom')) return 'vendor-react-dom';
          if (id.includes('react') || id.includes('scheduler')) return 'vendor-react';
          if (id.includes('@tanstack')) return 'vendor-query';
          if (id.includes('@supabase')) return 'vendor-supabase';
          if (id.includes('axios')) return 'vendor-axios';
          if (id.includes('@radix-ui')) return 'vendor-radix';
          if (id.includes('@base-ui')) return 'vendor-base-ui';
          if (id.includes('lucide-react')) return 'vendor-icons';
          if (
            id.includes('zod') ||
            id.includes('react-hook-form') ||
            id.includes('@hookform')
          )
            return 'vendor-form';
          if (id.includes('zustand') || id.includes('sonner')) return 'vendor-state';
          if (
            id.includes('class-variance-authority') ||
            id.includes('tailwind-merge') ||
            id.includes('clsx')
          )
            return 'vendor-utils';
          if (id.includes('idb-keyval')) return 'vendor-storage';
          if (id.includes('browser-image-compression')) return 'vendor-image';
          if (id.includes('faker') || id.includes('msw')) return 'vendor-dev';
        },
      },
    },
  },
  esbuild: {
    target: 'es2022',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2022',
    },
  },
});
