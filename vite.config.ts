import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@animations/*":"/src/animations/*",
      "@lib/*":"/src/lib",
      "@components": "/src/components",
      "@constants": "/src/constants",
      "@pages": "/src/pages",
    },
  },
})
