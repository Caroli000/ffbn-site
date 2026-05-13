<template>
  <div class="excellence-page">
    
    <main>
      <PageHero 
        :title="t('excellence.title')" 
        :subtitle="t('excellence.subtitle')"
        image="/images/hero/hero1.jpg"
      />

      <section class="excellence-intro reveal reveal-up" v-reveal>
        <div class="container">
          <div class="intro-grid">
            <div class="text-content">
              <span class="section-tag">{{ t('excellence.tag') }}</span>
              <h2>{{ t('excellence.wallTitle') }}</h2>
              <p>{{ t('excellence.wallSubtitle') }}</p>
            </div>
            <div class="illustration-box">
              <div class="grad-badge">
                <i class="fas fa-graduation-cap"></i>
              </div>
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
.excellence-page {
  background: #fdfdfd;
}

.excellence-intro {
  padding: 100px 0;
}

.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
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

.illustration-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.grad-badge {
  width: 200px;
  height: 200px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-medium);
  border: 10px solid var(--burundi-red);
}

.grad-badge i {
  font-size: 5rem;
  color: #333;
}

@media (max-width: 992px) {
  .intro-grid { grid-template-columns: 1fr; gap: 40px; text-align: center; }
}
</style>
