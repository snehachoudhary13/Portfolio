import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Using relative path for better GH Pages compatibility
  plugins: [react()],
})

