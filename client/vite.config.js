import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    base: '/',
    plugins: [vue()],
    server: {
        host: true,
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                cookieDomainRewrite: {
                    "127.0.0.1": "localhost",
                    "": "localhost"
                }
            },
            '/images': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true
            },
        },
        // ⚡ Optimisations serveur dev
        middlewareMode: false,
        cors: true,
        hmr: { protocol: 'ws', host: 'localhost', port: 5173 }
    },

    // ⚡ BUILD OPTIMIZATIONS - CRITIQUES POUR FLUIDITÉ
    build: {
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks: {
                    'vue-vendor': ['vue', 'vue-router', 'vue-i18n'],
                    'utility-vendor': ['axios', 'date-fns']
                },
                entryFileNames: 'assets/[name].[hash].js',
                chunkFileNames: 'assets/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash].[ext]'
            }
        },
        chunkSizeWarningLimit: 1000,
        sourcemap: false,
        reportCompressedSize: false,
        assetsInlineLimit: 4096,
    },

    // ⚡ OPTIMISATIONS GLOBALES
    resolve: {
        alias: {
            // Imports plus rapides
            vue: 'vue/dist/vue.esm-bundler.js'
        }
    },

    // ⚡ OPTIMISATIONS CSS
    css: {
        preprocessorOptions: {
            scss: { outputStyle: 'compressed' }
        }
    },

    esbuild: {
        drop: ['console', 'debugger'],
    },

    test: {
        environment: 'happy-dom',
        globals: true,
    },
})
