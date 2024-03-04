import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'https://trendyhomes.onrender.com',
        secure: false,
      }
    }
  },
  plugins: [react()],
})
