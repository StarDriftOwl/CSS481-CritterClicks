import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    // rollupOptions: {
    //   input: 'src/main.tsx',  // Point to your actual entry file
    // },
    outDir: "dist",
    output: {
      assetFileNames: 'assets/[name]-[hash][extname]',
    },
  }
});