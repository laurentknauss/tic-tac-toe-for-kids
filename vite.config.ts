import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    // Enable fast refresh for React components
    fastRefresh: true,
  })],
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