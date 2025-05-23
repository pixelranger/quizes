import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: {
        widget: fileURLToPath(new URL('./src/main.js', import.meta.url)),
        style: './src/assets/styles/main.scss'
      },
      output: {
        // dir: '/Users/ndolgushin/work/chimera/mf-backend-relaunch/public/assets/quiz',
        // dir: '/Users/ndolgushin/work/chimera/mf-backend-relaunch/resources/js/quiz-editor/src/assets/quiz',
        inlineDynamicImports: false,
        entryFileNames: '[name].js',       // for JS files
        chunkFileNames: '[name].js',      // for code-splitted chunks
        assetFileNames: '[name].[ext]'    // for other assets
      },
    },
  },
  // Configuration for development server and preview (will you use another entry pointe dev.js to handle this as normal SPA application )
  server: {
    port: 5137,
    entry: fileURLToPath(new URL('./src/dev.js', import.meta.url))
  },
  // Ensure preview mode is correctly handled
  preview: {
    // open: true,
    port: 5137,
    entry: fileURLToPath(new URL('./src/dev.js', import.meta.url))
  }
})
