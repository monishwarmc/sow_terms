import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '107a487f-69fa-4adf-9d20-89d8db2a3839-00-27o3ki2tsaaz5.kirk.replit.dev'  
    ]
  }
})
