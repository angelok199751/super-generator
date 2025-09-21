import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Имя репозитория на GitHub, обязательно с / в начале и конце
const repoName = '/super-generator/'  // замени на точное имя твоего репозитория

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? repoName : '/'
})