// vite.config.js
import { defineConfig } from "file:///C:/Users/user/Documents/Asso/client/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/user/Documents/Asso/client/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
        cookieDomainRewrite: {
          "127.0.0.1": "localhost",
          "": "localhost"
        },
        onProxyReq: (proxyReq, req, res) => {
          if (req.headers["authorization"]) {
            proxyReq.setHeader("Authorization", req.headers["authorization"]);
          }
        }
      }
    },
    // ⚡ Optimisations serveur dev
    middlewareMode: false,
    cors: true,
    hmr: { protocol: "ws", host: "localhost", port: 5173 }
  },
  // ⚡ BUILD OPTIMIZATIONS - CRITIQUES POUR FLUIDITÉ
  build: {
    // Réduire la taille du chunk principal
    rollupOptions: {
      output: {
        // Séparer les vendors pour meilleur caching
        manualChunks: {
          "vue": ["vue"],
          "vue-router": ["vue-router"],
          "i18n": ["vue-i18n"],
          "vendors": ["axios", "date-fns"]
        },
        // ⚡ Compresser les assets exportés
        entryFileNames: "js/[name].[hash].js",
        chunkFileNames: "js/[name].[hash].js",
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "images/[name]-[hash][extname]";
          } else if (/\.woff2?$/.test(name ?? "")) {
            return "fonts/[name][extname]";
          } else if (/\.css$/.test(name ?? "")) {
            return "css/[name].[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        }
      }
    },
    // Minification agressive
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        reduction_vars: true,
        unused: true,
        dead_code: true,
        passes: 3
      },
      mangle: {
        properties: {
          regex: /^_/
        }
      }
    },
    // Réduction CSS
    cssCodeSplit: true,
    cssnano: { preset: ["default", { discardComments: { removeAll: true } }] },
    // Taille chunk optimale
    chunkSizeWarningLimit: 500,
    // Source maps seulement en dev
    sourcemap: false,
    // Temps de build réduit
    reportCompressedSize: false,
    // Assets inline si petit
    assetsInlineLimit: 8192
  },
  // ⚡ OPTIMISATIONS GLOBALES
  resolve: {
    alias: {
      // Imports plus rapides
      vue: "vue/dist/vue.esm-bundler.js"
    }
  },
  // ⚡ OPTIMISATIONS CSS
  css: {
    postcss: null,
    preprocessorOptions: {
      scss: { outputStyle: "compressed" }
    }
  },
  test: {
    environment: "happy-dom",
    globals: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXERvY3VtZW50c1xcXFxBc3NvXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxEb2N1bWVudHNcXFxcQXNzb1xcXFxjbGllbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3VzZXIvRG9jdW1lbnRzL0Fzc28vY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW3Z1ZSgpXSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAgIGhvc3Q6IHRydWUsXHJcbiAgICAgICAgcG9ydDogNTE3MyxcclxuICAgICAgICBwcm94eToge1xyXG4gICAgICAgICAgICAnL2FwaSc6IHtcclxuICAgICAgICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly8xMjcuMC4wLjE6MzAwMScsXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjb29raWVEb21haW5SZXdyaXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCIxMjcuMC4wLjFcIjogXCJsb2NhbGhvc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBcIlwiOiBcImxvY2FsaG9zdFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25Qcm94eVJlcTogKHByb3h5UmVxLCByZXEsIHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXEuaGVhZGVyc1snYXV0aG9yaXphdGlvbiddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3h5UmVxLnNldEhlYWRlcignQXV0aG9yaXphdGlvbicsIHJlcS5oZWFkZXJzWydhdXRob3JpemF0aW9uJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBcdTI2QTEgT3B0aW1pc2F0aW9ucyBzZXJ2ZXVyIGRldlxyXG4gICAgICAgIG1pZGRsZXdhcmVNb2RlOiBmYWxzZSxcclxuICAgICAgICBjb3JzOiB0cnVlLFxyXG4gICAgICAgIGhtcjogeyBwcm90b2NvbDogJ3dzJywgaG9zdDogJ2xvY2FsaG9zdCcsIHBvcnQ6IDUxNzMgfVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgLy8gXHUyNkExIEJVSUxEIE9QVElNSVpBVElPTlMgLSBDUklUSVFVRVMgUE9VUiBGTFVJRElUXHUwMEM5XHJcbiAgICBidWlsZDoge1xyXG4gICAgICAgIC8vIFJcdTAwRTlkdWlyZSBsYSB0YWlsbGUgZHUgY2h1bmsgcHJpbmNpcGFsXHJcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgICAgICAgIC8vIFNcdTAwRTlwYXJlciBsZXMgdmVuZG9ycyBwb3VyIG1laWxsZXVyIGNhY2hpbmdcclxuICAgICAgICAgICAgICAgIG1hbnVhbENodW5rczoge1xyXG4gICAgICAgICAgICAgICAgICAgICd2dWUnOiBbJ3Z1ZSddLFxyXG4gICAgICAgICAgICAgICAgICAgICd2dWUtcm91dGVyJzogWyd2dWUtcm91dGVyJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgJ2kxOG4nOiBbJ3Z1ZS1pMThuJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZlbmRvcnMnOiBbJ2F4aW9zJywgJ2RhdGUtZm5zJ11cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBcdTI2QTEgQ29tcHJlc3NlciBsZXMgYXNzZXRzIGV4cG9ydFx1MDBFOXNcclxuICAgICAgICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnanMvW25hbWVdLltoYXNoXS5qcycsXHJcbiAgICAgICAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2pzL1tuYW1lXS5baGFzaF0uanMnLFxyXG4gICAgICAgICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICh7IG5hbWUgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgvXFwuKGdpZnxqcGU/Z3xwbmd8c3ZnKSQvLnRlc3QobmFtZSA/PyAnJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdpbWFnZXMvW25hbWVdLVtoYXNoXVtleHRuYW1lXSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgvXFwud29mZjI/JC8udGVzdChuYW1lID8/ICcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2ZvbnRzL1tuYW1lXVtleHRuYW1lXSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgvXFwuY3NzJC8udGVzdChuYW1lID8/ICcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2Nzcy9bbmFtZV0uW2hhc2hdW2V4dG5hbWVdJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhc3NldHMvW25hbWVdLVtoYXNoXVtleHRuYW1lXSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIE1pbmlmaWNhdGlvbiBhZ3Jlc3NpdmVcclxuICAgICAgICBtaW5pZnk6ICd0ZXJzZXInLFxyXG4gICAgICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgICAgICAgY29tcHJlc3M6IHtcclxuICAgICAgICAgICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICByZWR1Y3Rpb25fdmFyczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHVudXNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRlYWRfY29kZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHBhc3NlczogM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtYW5nbGU6IHtcclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICByZWdleDogL15fL1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBSXHUwMEU5ZHVjdGlvbiBDU1NcclxuICAgICAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXHJcbiAgICAgICAgY3NzbmFubzogeyBwcmVzZXQ6IFsnZGVmYXVsdCcsIHsgZGlzY2FyZENvbW1lbnRzOiB7IHJlbW92ZUFsbDogdHJ1ZSB9IH1dIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gVGFpbGxlIGNodW5rIG9wdGltYWxlXHJcbiAgICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA1MDAsXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU291cmNlIG1hcHMgc2V1bGVtZW50IGVuIGRldlxyXG4gICAgICAgIHNvdXJjZW1hcDogZmFsc2UsXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gVGVtcHMgZGUgYnVpbGQgclx1MDBFOWR1aXRcclxuICAgICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQXNzZXRzIGlubGluZSBzaSBwZXRpdFxyXG4gICAgICAgIGFzc2V0c0lubGluZUxpbWl0OiA4MTkyLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBcdTI2QTEgT1BUSU1JU0FUSU9OUyBHTE9CQUxFU1xyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgIC8vIEltcG9ydHMgcGx1cyByYXBpZGVzXHJcbiAgICAgICAgICAgIHZ1ZTogJ3Z1ZS9kaXN0L3Z1ZS5lc20tYnVuZGxlci5qcydcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFx1MjZBMSBPUFRJTUlTQVRJT05TIENTU1xyXG4gICAgY3NzOiB7XHJcbiAgICAgICAgcG9zdGNzczogbnVsbCxcclxuICAgICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIHNjc3M6IHsgb3V0cHV0U3R5bGU6ICdjb21wcmVzc2VkJyB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB0ZXN0OiB7XHJcbiAgICAgICAgZW52aXJvbm1lbnQ6ICdoYXBweS1kb20nLFxyXG4gICAgICAgIGdsb2JhbHM6IHRydWUsXHJcbiAgICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVTLFNBQVMsb0JBQW9CO0FBQ3BVLE9BQU8sU0FBUztBQUVoQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTLENBQUMsSUFBSSxDQUFDO0FBQUEsRUFDZixRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDSCxRQUFRO0FBQUEsUUFDSixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxxQkFBcUI7QUFBQSxVQUNqQixhQUFhO0FBQUEsVUFDYixJQUFJO0FBQUEsUUFDUjtBQUFBLFFBQ0EsWUFBWSxDQUFDLFVBQVUsS0FBSyxRQUFRO0FBQ2hDLGNBQUksSUFBSSxRQUFRLGVBQWUsR0FBRztBQUM5QixxQkFBUyxVQUFVLGlCQUFpQixJQUFJLFFBQVEsZUFBZSxDQUFDO0FBQUEsVUFDcEU7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQTtBQUFBLElBRUEsZ0JBQWdCO0FBQUEsSUFDaEIsTUFBTTtBQUFBLElBQ04sS0FBSyxFQUFFLFVBQVUsTUFBTSxNQUFNLGFBQWEsTUFBTSxLQUFLO0FBQUEsRUFDekQ7QUFBQTtBQUFBLEVBR0EsT0FBTztBQUFBO0FBQUEsSUFFSCxlQUFlO0FBQUEsTUFDWCxRQUFRO0FBQUE7QUFBQSxRQUVKLGNBQWM7QUFBQSxVQUNWLE9BQU8sQ0FBQyxLQUFLO0FBQUEsVUFDYixjQUFjLENBQUMsWUFBWTtBQUFBLFVBQzNCLFFBQVEsQ0FBQyxVQUFVO0FBQUEsVUFDbkIsV0FBVyxDQUFDLFNBQVMsVUFBVTtBQUFBLFFBQ25DO0FBQUE7QUFBQSxRQUVBLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQzFCLGNBQUkseUJBQXlCLEtBQUssUUFBUSxFQUFFLEdBQUc7QUFDM0MsbUJBQU87QUFBQSxVQUNYLFdBQVcsWUFBWSxLQUFLLFFBQVEsRUFBRSxHQUFHO0FBQ3JDLG1CQUFPO0FBQUEsVUFDWCxXQUFXLFNBQVMsS0FBSyxRQUFRLEVBQUUsR0FBRztBQUNsQyxtQkFBTztBQUFBLFVBQ1g7QUFDQSxpQkFBTztBQUFBLFFBQ1g7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBO0FBQUEsSUFFQSxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDWCxVQUFVO0FBQUEsUUFDTixjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUEsUUFDZixnQkFBZ0I7QUFBQSxRQUNoQixRQUFRO0FBQUEsUUFDUixXQUFXO0FBQUEsUUFDWCxRQUFRO0FBQUEsTUFDWjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ0osWUFBWTtBQUFBLFVBQ1IsT0FBTztBQUFBLFFBQ1g7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBO0FBQUEsSUFFQSxjQUFjO0FBQUEsSUFDZCxTQUFTLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEtBQUssRUFBRSxDQUFDLEVBQUU7QUFBQTtBQUFBLElBR3pFLHVCQUF1QjtBQUFBO0FBQUEsSUFHdkIsV0FBVztBQUFBO0FBQUEsSUFHWCxzQkFBc0I7QUFBQTtBQUFBLElBR3RCLG1CQUFtQjtBQUFBLEVBQ3ZCO0FBQUE7QUFBQSxFQUdBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQTtBQUFBLE1BRUgsS0FBSztBQUFBLElBQ1Q7QUFBQSxFQUNKO0FBQUE7QUFBQSxFQUdBLEtBQUs7QUFBQSxJQUNELFNBQVM7QUFBQSxJQUNULHFCQUFxQjtBQUFBLE1BQ2pCLE1BQU0sRUFBRSxhQUFhLGFBQWE7QUFBQSxJQUN0QztBQUFBLEVBQ0o7QUFBQSxFQUVBLE1BQU07QUFBQSxJQUNGLGFBQWE7QUFBQSxJQUNiLFNBQVM7QUFBQSxFQUNiO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
