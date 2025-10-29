import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or your framework plugin

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['sudoanirudh.onrender.com'],
    host: true,
    port: process.env.PORT || 5173,
  },
})
