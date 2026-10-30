import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/auth': 'http://api:5000'
    },

    allowedHosts: [
      'ec2-52-14-50-10.us-east-2.compute.amazonaws.com'
    ]
  }
})