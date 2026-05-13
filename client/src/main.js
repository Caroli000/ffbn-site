import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import reveal from './directives/reveal'
import lazyload from './directives/lazyload'
import { initPerformanceOptimizations, optimizePerformance } from './utils/performanceBooster'

initPerformanceOptimizations()
optimizePerformance()

const app = createApp(App)

app.directive('reveal', reveal)
app.directive('lazyload', lazyload)

if (!import.meta.env.DEV) {
    app.config.performance = false
    app.config.warnHandler = () => null
}

app.use(router)
app.use(i18n)

app.mount('#app')
