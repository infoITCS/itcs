import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Keep long-lived vendor code in its own chunks. The icon set alone is
        // ~140 kB of the bundle; isolating it means an app-code deploy does not
        // invalidate it in returning visitors' caches.
        //
        // MSAL is deliberately NOT bucketed: it is reached only through lazy
        // route chunks, and naming it here drags the 284 kB msal-browser into
        // a statically imported chunk, so it would ship to every visitor.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('@fortawesome')) return 'vendor-icons';
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/react-router') ||
            id.includes('/scheduler/') ||
            id.includes('react-helmet')
          ) {
            return 'vendor-react';
          }
          return undefined;
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
