// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Tambahkan ini (install @types/node jika error)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Setup absolute import
    },
  },
  build: {
    target: 'esnext', // Gunakan fitur JavaScript modern
    minify: 'esbuild', // Minifier bawaan yang super cepat
    rollupOptions: {
      output: {
        // Optimasi: Memecah bundle besar menjadi file-file kecil
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('framer-motion')) return 'vendor-motion';
            return 'vendor'; // Sisa library lain
          }
        },
      },
    },
  },
  server: {
    port: 3000, // Kunci port di 3000 agar konsisten
    open: true, // Otomatis buka browser saat npm run dev
  }
})