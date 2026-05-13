<template>
  <div class="identity-page">
    
    <main>
      <PageHero 
        :title="t('identity.title')" 
        :subtitle="t('identity.subtitle')"
        image="/images/hero/hero1.jpg"
      />

      <section class="culture-intro reveal reveal-up" v-reveal>
        <div class="container">
          <div class="intro-grid">
            <div class="text-content">
              <span class="section-tag">{{ t('identity.tag') }}</span>
              <h2>{{ t('identity.introTitle') }}</h2>
              <p>{{ t('identity.introDesc') }}</p>
            </div>
            <div class="motif-box">
              <div class="image-collage">
                <img src="/images/identity/tambours_burundi.png" alt="Tambours" class="collage-hero" />
                <div class="sub-images">
                  <img src="/images/identity/racines_horizons.jpg" alt="Racines et Horizons" />
                  <img src="/images/identity/danse_traditionnelle.jpg" alt="Danse" />
                </div>
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
.identity-page {
  background: white;
}

.culture-intro {
  padding: 100px 0;
}

.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.intro-grid h2 {
  font-size: 2.5rem;
  margin-bottom: 25px;
}

.intro-grid p {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #555;
}

.image-collage {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.collage-hero {
  width: 100%;
  border-radius: 20px;
  box-shadow: var(--shadow-medium);
  transition: transform 0.3s ease;
}

.sub-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.sub-images img {
  width: 100%;
  border-radius: 15px;
  box-shadow: var(--shadow-soft);
  transition: transform 0.3s ease;
}

.collage-hero:hover, .sub-images img:hover {
  transform: scale(1.03);
}

@media (max-width: 992px) {
  .intro-grid { grid-template-columns: 1fr; gap: 40px; text-align: center; }
}
</style>
