import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'financeControl',
      filename: 'remoteEntry.js',
      exposes: {
        './FinancePanel': './src/components/FinancePanel.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  preview: {
    port: 5002,
    strictPort: true,
  },
  build: {
    target: 'esnext',
    minify: false,
  },
})
