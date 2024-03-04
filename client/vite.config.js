import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'https://real-estate-1.onrender.com',
        secure: false,
      }
    }
  },
  plugins: [react()],
})
