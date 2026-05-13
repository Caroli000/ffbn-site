<template>
  <section class="hero-section">
    <div class="hero-overlay"></div>
    <div class="pattern-zone pattern-top-left"></div>
    <div class="pattern-zone pattern-bottom-right"></div>
    <div class="hero-content">
      <h2 class="hero-subtitle">{{ t('hero.subtitle') }}</h2>
      <h1 class="hero-title">{{ t('hero.title') }}</h1>
    </div>

    <router-link to="/discover" class="cta-button">
      <span>{{ t('hero.cta') }}</span>
      <span class="cta-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </router-link>

    <div class="carousel-container">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="carousel-slide"
        :class="{ active: currentSlide === index }"
        :style="{ backgroundImage: `url(${slide.url})` }"
      ></div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCarousel } from '../composables/useCarousel'

const { t } = useI18n()

const slides = [
  { url: '/images/hero/slide1.webp', alt: 'FFBN Slide 1' },
  { url: '/images/hero/slide2.jpg', alt: 'FFBN Slide 2' },
  { url: '/images/hero/slide3.jpg', alt: 'FFBN Slide 3' },
]

const { currentSlide, startAutoPlay, stopAutoPlay } = useCarousel(slides.length, 5000)

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  color: white;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    rgba(206, 17, 38, 0.25) 0%,
    rgba(206, 17, 38, 0.15) 40%,
    rgba(24, 182, 57, 0.15) 60%,
    rgba(24, 182, 57, 0.25) 100%);
  z-index: 1;
  pointer-events: none;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 50%, rgba(0,0,0,0.3) 100%);
}

.pattern-zone {
  position: absolute;
  width: 400px;
  height: 400px;
  z-index: 3;
  opacity: 0.1;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L15 15 L30 30 L45 15 L60 30 L45 45 L30 30 L15 45 Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E");
  background-size: 60px 60px;
}

.pattern-top-left {
  top: 10%;
  left: -50px;
  transform: rotate(15deg);
}

.pattern-bottom-right {
  bottom: 10%;
  right: -50px;
  transform: rotate(-15deg);
}

.hero-content {
  z-index: 5;
  max-width: 850px;
  margin-bottom: 50px;
  animation: fadeInLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.hero-subtitle {
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 25px;
  padding: 8px 25px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 2.5px;
  animation: fadeInLeft 1s ease-out both 0.2s;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 40px;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: fadeInLeft 1s ease-out both 0.4s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cta-button {
  position: absolute;
  bottom: 20px;
  right: 110px;
  display: inline-flex;
  align-items: center;
  gap: 15px;
  padding: 14px 32px;
  background: var(--burundi-red);
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: 100px;
  box-shadow: 0 15px 35px rgba(206, 17, 38, 0.3);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
  animation: fadeInLeft 1s ease-out both 0.6s;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: -1;
}

.cta-button:hover {
  color: var(--burundi-red);
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(206, 17, 38, 0.4);
  border-color: white;
}

.cta-button:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

.cta-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.cta-icon svg {
  width: 16px;
  height: 16px;
}

.cta-button:hover .cta-icon {
  transform: translateX(5px);
  background: var(--burundi-red);
  color: white;
}

.carousel-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  background-color: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slide.active {
  opacity: 1;
  z-index: 1;
}

.carousel-slide.loading {
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
}

.slide-placeholder {
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.carousel-slide::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 1.5rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 20;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}

.prev-btn {
  left: 30px;
}

.next-btn {
  right: 30px;
}

.carousel-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 20;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.3s;
}

.indicator.active {
  background: white;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 0 5%;
    align-items: center;
    text-align: center;
  }

  .cta-button {
    position: relative;
    bottom: 0;
    right: 0;
    margin-top: 20px;
    padding: 12px 30px;
    font-size: 0.9rem;
    animation: fadeInUp 1s ease-out both 0.6s;
  }

  .carousel-slide {
    background-attachment: scroll;
    background-position: center center;
    background-size: cover;
  }
}
</style>
