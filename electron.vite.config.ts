import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@resources': resolve('resources'),
        '@main': resolve('src/main'),
      }
    },
    plugins: [externalizeDepsPlugin()]

  },
  preload: {

    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        
        '@static': resolve('src/renderer/src/assets'),
      }
    },
    plugins: [vue()]
  }
})
