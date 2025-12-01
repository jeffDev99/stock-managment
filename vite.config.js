import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/cache', '@emotion/react', 'stylis-plugin-rtl'],
  },
  // server:{
  //   proxy:{
  //     "/api":{
  //       target:"https://api.arbabrojo.ir",
  //       changeOrigin:true,
  //       secure:false
  //     }
  //   }
  // }
})
