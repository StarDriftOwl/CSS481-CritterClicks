import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        pet: resolve(__dirname, 'pet.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        rules: resolve(__dirname, 'rules.html'),
        credits: resolve(__dirname, 'credits.html'),
        settings: resolve(__dirname, 'settings.html'),
      },
      outDir: "dist",
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    }
  }
});
