import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()], // <--- Added missing comma here
  base: './',         // This ensures paths are relative
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
