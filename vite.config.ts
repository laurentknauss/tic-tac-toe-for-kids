import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/ui': path.resolve(__dirname, './src/components/ui')
    }
  },
  plugins: [
    react()
  ],
  server: {
    port: 3000,
    // Improve HMR behavior
    hmr: {
      overlay: true,
    },
    // Force rebuilding when files change
    watch: {
      usePolling: true,
      interval: 1000,
    }
  },
  // Optimize build speed with caching
  optimizeDeps: {
    // Force inclusion of these dependencies in the pre-bundling step
    include: ['react', 'react-dom'],
  },
  // Cache build assets
  build: {
    // Minimize output size
    minify: 'terser',
    sourcemap: true
  }
})