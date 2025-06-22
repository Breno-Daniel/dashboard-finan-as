// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/dashboard-finan-as/', // coloque exatamente o nome do seu repositório
})
