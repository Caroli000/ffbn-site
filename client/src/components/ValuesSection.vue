<template>
  <section class="values-simple">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">{{ t('values.title') }}</span>
        <h2>{{ t('values.title') }}</h2>
      </div>

      <div class="values-grid">
        <router-link v-for="(card, index) in valuesCards" :key="index" 
             :to="`/${card.key}`"
             class="value-item" 
             :style="{ transitionDelay: `${index * 0.1}s` }">
          <div class="value-icon">
            <i :class="card.icon"></i>
            <div class="icon-blob" :style="{ background: card.color }"></div>
          </div>
          <h3>{{ t(`values.${card.key}.title`) }}</h3>
          <p>{{ t(`values.${card.key}.desc`) }}</p>
          <div class="card-footer">
            <i class="fas fa-arrow-right"></i>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const valuesCards = [
  { key: 'identity', icon: 'fas fa-drum', color: 'rgba(239, 68, 68, 0.2)' },
  { key: 'solidarity', icon: 'fas fa-hands-helping', color: 'rgba(34, 197, 94, 0.2)' },
  { key: 'excellence', icon: 'fas fa-graduation-cap', color: 'rgba(59, 130, 246, 0.2)' }
]
</script>

<style scoped>
.values-simple {
  padding: 120px 0;
  background-color: #ffffff; 
  position: relative;
  overflow: hidden;
  color: #333;
}

.values-simple::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.08; 
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z M30 10 L50 30 L30 50 L10 30 Z' fill='%23888888' fill-rule='evenodd'/%3E%3C/svg%3E");
  background-size: 80px 80px;
}

.values-simple::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, transparent 0%, #fafafa 100%);
  z-index: 0;
  pointer-events: none;
}

.values-simple .container {
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-top: 10px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.value-item {
  padding: 50px 40px;
  background: white;
  border: 1px solid #eee;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  color: #333;
  text-decoration: none;
  display: flex;
  flex-direction: column;
}

.value-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 40px;
  background: linear-gradient(to top, var(--item-color, transparent), transparent);
  transform: translateX(-50%);
  opacity: 0.1;
  transition: width 0.4s ease;
  border-radius: 0 0 24px 24px;
}

.value-item:hover::after {
  width: 100%;
}

.value-item:nth-child(1) { --item-color: var(--burundi-red); }
.value-item:nth-child(2) { --item-color: var(--burundi-green); }
.value-item:nth-child(3) { --item-color: #3b82f6; }

.value-item:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-medium);
}

.value-item:nth-child(1):hover { border-color: var(--burundi-red); }
.value-item:nth-child(2):hover { border-color: var(--burundi-green); }
.value-item:nth-child(3):hover { border-color: #3b82f6; }

.card-footer {
  margin-top: auto;
  padding-top: 20px;
  color: var(--burundi-red);
  font-weight: 600;
  font-size: 1.2rem;
  opacity: 0;
  transition: all 0.3s ease;
}

.value-item:hover .card-footer {
  opacity: 1;
  transform: translateX(0);
}

.value-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.value-icon i {
  font-size: 2rem;
  z-index: 2;
  color: #333;
}

.icon-blob {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  z-index: 1;
  pointer-events: none;
  will-change: auto;
}

.value-item h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.value-item p {
  color: #666;
  line-height: 1.6;
}

.value-icon i {
  font-size: 2rem;
  z-index: 2;
  color: #333;
}

@media (max-width: 992px) {
  .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>
