import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        taskTracker: 'http://localhost:5001/assets/remoteEntry.js',
        financeControl: 'http://localhost:5002/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 5000,
    strictPort: true,
  },
  build: {
    target: 'esnext',
    minify: false,
  },
})
