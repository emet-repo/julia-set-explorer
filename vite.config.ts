import { defineConfig } from 'vite';

export default defineConfig({
  base: '/julia-set-explorer/',
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    open: true
  }
});
