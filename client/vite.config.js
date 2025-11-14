import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/auth': 'http://localhost:8081',
      '/members': 'http://localhost:8081',
      '/game': 'http://localhost:8081',
      '/collection': 'http://localhost:8081'
    }
  }
})
