import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // Se actualiza sola al abrir
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      
      // EL MANIFIESTO (La identidad de la App)
      manifest: {
        name: 'Task This',
        short_name: 'Task This',
        description: 'Minimalist Productivity System',
        theme_color: '#F5F5F0', // Color de la barra de estado
        background_color: '#F5F5F0', // Color al abrir la app (splash screen)
        display: 'standalone', // <--- ESTO ELIMINA LA BARRA DE NAVEGACIÓN
        orientation: 'portrait',
        start_url: '/app',             // <--- ESTO ES CRÍTICO. Debe ser la raíz.
        scope: '/',             
        
        icons: [
          {
            src: 'pwa-192x192.png', // Asegúrate de tener este archivo en public
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Asegúrate de tener este archivo en public
            sizes: '512x512',
            type: 'image/png'
          },
        ]
      }
    })
  ],
})
