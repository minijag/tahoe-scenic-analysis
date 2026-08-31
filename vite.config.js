import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // The custom domain serves this project from its root, not from the
  // repository-name subdirectory used by the default github.io URL.
  base: '/',
})

