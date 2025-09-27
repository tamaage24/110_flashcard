import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/110_flashcard/',  // ← リポジトリ名に合わせる
})