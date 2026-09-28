import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'product/index.html'),
        privacy: resolve(__dirname, 'privacy-policy/index.html'),
        terms: resolve(__dirname, 'terms-and-conditions/index.html'),
      },
    },
  },
})
