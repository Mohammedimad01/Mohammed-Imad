import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The largest chunk is Three.js for the hero backdrop. It's lazy-loaded
    // after the page is idle, so it never blocks first paint.
    chunkSizeWarningLimit: 600,
  },
})
