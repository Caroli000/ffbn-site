<template>
  <div class="about-page">
    <PageHero 
      :title="t('nav.about')" 
      :subtitle="t('hero.subtitle')" 
    />

    <section class="mission-vision reveal reveal-up" v-reveal>
      <div class="container">
        <div class="grid">
          <div class="card mission">
            <div class="icon">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="50" cy="50" r="40" />
                <path d="M50 20 L50 80 M20 50 L80 50" />
                <path d="M35 35 L65 65 M35 65 L65 35" />
              </svg>
            </div>
            <h3>Notre Mission</h3>
            <p>{{ t('about.p1') }}</p>
          </div>
          <div class="card vision">
            <div class="icon">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 50 Q50 10 90 50 Q50 90 10 50 Z" />
                <circle cx="50" cy="50" r="15" />
                <circle cx="50" cy="50" r="5" fill="currentColor" />
              </svg>
            </div>
            <h3>Notre Vision</h3>
            <p>{{ t('about.p2') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="history reveal reveal-up" v-reveal>
      <div class="container">
        <div class="history-content">
          <div class="text">
            <h2>L'histoire de la FFBN</h2>
            <p>Fondée en 2007 par des étudiants originaires du Burundi, l’association a pour mission de promouvoir la culture burundaise dans la région, tout en favorisant l’intégration et le renforcement des liens de solidarité à travers des activités culturelles, sociales et éducatives.</p>
          </div>
          <div class="illustration">
            
            <div class="decoration bg-motif"></div>
            <img src="/images/about/about-history.jpg" alt="FFBN History" class="history-img" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import PageHero from '../components/PageHero.vue'

const { t } = useI18n()
</script>

<style scoped>
.about-page {
  padding-bottom: 0;
}

.mission-vision {
  padding: 80px 0;
  background-color: #f9f9f9;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.card {
  background: white;
  padding: 50px;
  border-radius: 20px;
  box-shadow: var(--shadow-soft);
  text-align: center;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
}

.icon {
  color: var(--burundi-red);
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
}

.card h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #222;
}

.card p {
  color: #666;
  line-height: 1.7;
}

.history {
  padding: 100px 0;
}

.history-content {
  display: flex;
  align-items: center;
  gap: 80px;
}

.history-content .text {
  flex: 1;
}

.history-content h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  position: relative;
}

.history-content h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 4px;
  background-color: var(--burundi-green);
}

.history-content p {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.8;
}

.illustration {
  flex: 1;
  position: relative;
}

.history-img {
  width: 100%;
  border-radius: 20px;
  box-shadow: var(--shadow-medium);
  z-index: 2;
  position: relative;
}

.bg-motif {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 150px;
  height: 150px;
  background-image: radial-gradient(var(--burundi-red) 2px, transparent 2px);
  background-size: 20px 20px;
  z-index: 1;
  opacity: 0.2;
}

@media (max-width: 992px) {
  .grid { grid-template-columns: 1fr; }
  .history-content { flex-direction: column; text-align: center; }
  .history-content h2::after { left: 50%; transform: translateX(-50%); }
}
</style>
