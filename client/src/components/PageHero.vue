<template>
  <section class="page-hero">
    <div class="hero-overlay"></div>
    <div class="pattern-bg"></div>
    <div class="hero-content">
      <h2 class="subtitle reveal reveal-up" v-reveal>{{ subtitle }}</h2>
      <h1 class="title reveal reveal-up" v-reveal>{{ title }}</h1>
      <div class="breadcrumb reveal reveal-up" v-reveal>
        <router-link to="/">{{ t('nav.home') }}</router-link>
        <span class="sep">></span>
        <span class="current">{{ title }}</span>
      </div>
    </div>

<div class="drum-motif reveal reveal-scale" v-reveal>
      <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2" opacity="0.3" />
        <path d="M30 30 L70 30 L60 80 L40 80 Z" fill="none" stroke="currentColor" stroke-width="2" />
        <path d="M30 30 Q50 20 70 30" fill="none" stroke="currentColor" stroke-width="2" />
        <path d="M40 80 Q50 85 60 80" fill="none" stroke="currentColor" stroke-width="2" />
        <line x1="30" y1="30" x2="40" y2="80" stroke="currentColor" stroke-width="1.5" />
        <line x1="70" y1="30" x2="60" y2="80" stroke="currentColor" stroke-width="1.5" />
      </svg>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const props = defineProps({
  title: String,
  subtitle: String
})

const { t } = useI18n()
</script>

<style scoped>
.page-hero {
  height: 50vh;
  min-height: 400px;
  background: linear-gradient(135deg, var(--burundi-red), #b00000);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  overflow: hidden;
  padding-top: 80px;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%);
  z-index: 1;
}

.pattern-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.12;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 L20 0 L40 20 L20 40 Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E");
  background-size: 40px 40px;
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
}

.subtitle {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 15px;
  font-weight: 600;
  opacity: 0.9;
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 25px;
}

.breadcrumb {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 0.9rem;
}

.breadcrumb .sep {
  opacity: 0.5;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb .current {
  color: rgba(255, 255, 255, 0.7);
}

.drum-motif {
  position: absolute;
  bottom: -50px;
  right: -50px;
  opacity: 0.2;
  color: white;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@media (max-width: 768px) {
  .title { font-size: 2.5rem; }
  .page-hero { height: 40vh; }
}
</style>
