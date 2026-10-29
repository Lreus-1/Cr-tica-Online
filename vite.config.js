import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  // imagetools gera as miniaturas leves do acervo de artes durante o build.
  plugins: [react(), imagetools()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
