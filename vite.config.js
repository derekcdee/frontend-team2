import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 3000,
  },
  define: {
    // Remove all console logs in production
    ...(mode === 'production' && {
      'console.log': '() => {}',
      'console.warn': '() => {}',
      'console.error': '() => {}'
    })
  },
  build: {
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    } : {}
  }
}))
