import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The main chunk (React, Motion, GSAP, the command palette) is ~585 kB
    // before gzip; the pages are pre-rendered, so it never blocks first paint.
    chunkSizeWarningLimit: 600,
  },
})
