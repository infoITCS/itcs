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
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('@azure/msal')) return 'msal';
          if (id.includes('react-quill') || id.includes('quill') || id.includes('dompurify')) return 'editor';
          if (id.includes('@fortawesome')) return 'icons';
          if (id.includes('swiper')) return 'swiper';
          if (id.includes('axios')) return 'axios';
          if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/')) return 'react-vendor';
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
