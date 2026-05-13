<template>
  <div class="solidarity-page">
    
    <main>
      <PageHero 
        :title="t('solidarity.title')" 
        :subtitle="t('solidarity.subtitle')"
        image="/images/solidarity/solidarity-hero.jpg"
      />

      <section class="campaigns-intro reveal reveal-up" v-reveal>
        <div class="container">
          <div class="intro-grid">
            <div class="motif-box">
              <div class="pattern-bg"></div>
              <img src="/images/solidarity/solidarity-main.jpg" alt="Solidarité" class="main-img" />
            </div>
            <div class="text-content">
              <span class="section-tag">{{ t('solidarity.tag') }}</span>
              <h2>{{ t('solidarity.introTitle') }}</h2>
              <p>{{ t('solidarity.introDesc') }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import PageHero from '../components/PageHero.vue'

const { t } = useI18n()
</script>

<style scoped>
.solidarity-page {
  background: white;
}

.campaigns-intro {
  padding: 100px 0;
}

.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.motif-box {
  position: relative;
}

.pattern-bg {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100%;
  height: 100%;
  background: var(--burundi-green);
  opacity: 0.1;
  border-radius: 30px;
  z-index: 1;
}

.main-img {
  width: 100%;
  border-radius: 30px;
  z-index: 2;
  position: relative;
  box-shadow: var(--shadow-medium);
}

.text-content h2 {
  font-size: 2.5rem;
  margin-bottom: 25px;
}

.text-content p {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #555;
}

@media (max-width: 992px) {
  .intro-grid { grid-template-columns: 1fr; gap: 40px; }
  .intro-grid .text-content { order: 1; text-align: center; }
  .intro-grid .motif-box { order: 2; }
}
</style>
