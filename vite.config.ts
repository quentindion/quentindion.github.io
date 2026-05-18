import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr' 

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: true
    },
    plugins: [
        react(),
        tailwindcss(),
        svgr()
    ],
    build: {
        cssMinify: "lightningcss"
    }
})
