<template>
  <section id="actions" class="actions-section">
    
    <div class="bg-blobs">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <div class="container">
      <div class="section-header text-center">
        <span class="section-tag">{{ t('actions.tag') }}</span>
        <h2 class="reveal reveal-up" v-reveal>{{ t('actions.title') }}</h2>
        <p class="reveal reveal-up" v-reveal>{{ t('actions.subtitle') }}</p>
      </div>

      <div class="bubbles-container">
        <div 
          v-for="(action, index) in actions" 
          :key="action.id" 
          class="action-bubble reveal" 
          v-reveal 
          :class="`bubble-pos-${index + 1}`"
          :style="{ transitionDelay: `${index * 0.2}s` }"
        >
          <div class="bubble-content">
            <div class="action-icon">
              <i :class="action.icon"></i>
            </div>
            <div class="action-details">
              <h3>{{ action.title }}</h3>
              <p>{{ action.description }}</p>
              <router-link to="/actions" class="btn-bubble">
                <span>{{ t('actions.discover') }}</span>
                <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useApi } from '../composables/useApi'

const { t, locale } = useI18n()
const { get } = useApi()

const actions = ref([
  {
    id: 1,
    icon: 'fas fa-graduation-cap',
    title: 'Accompagnement Académique',
    description: 'Tutorats, conseils d\'orientation et partage de ressources pour assurer la réussite universitaire.',
  },
  {
    id: 2,
    icon: 'fas fa-hands-helping',
    title: 'Solidarité & Entraide',
    description: 'Un fonds de solidarité et un réseau de parrainage pour qu\'aucun étudiant ne se sente seul.',
  },
  {
    id: 3,
    icon: 'fas fa-drum',
    title: 'Rayonnement Culturel',
    description: 'Promotion de la culture burundaise à travers des événements, des danses et des rencontres.',
  },
])

const fetchActions = async () => {
  try {
    const res = await get('actions', locale.value)
    if (res.data) actions.value = res.data
  } catch {

  }
}

onMounted(() => fetchActions())
watch(locale, () => fetchActions())
</script>

<style scoped>
.actions-section {
  padding: 120px 0;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
}

.bg-blobs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  will-change: auto;
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: rgb(206, 17, 38);
  top: -100px;
  right: -100px;
}

.blob-2 {
  width: 350px;
  height: 350px;
  background: rgb(24, 182, 57);
  bottom: -50px;
  left: -50px;
}

.blob-3 {
  width: 300px;
  height: 300px;
  background: #f1c40f;
  top: 40%;
  left: 30%;
  opacity: 0.1;
}

.container {
  position: relative;
  z-index: 2;
}

.section-header {
  max-width: 800px;
  margin: 0 auto 80px;
}

.section-header h2 {
  font-size: 3rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 20px;
}

.bubbles-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  padding: 20px;
}

.action-bubble {
  width: 340px;
  height: 340px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bubble-content {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  padding: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 15px 35px rgba(0,0,0,0.05), inset 0 0 20px rgba(255,255,255,0.5);
  transition: all 0.3s ease-out;
  clip-path: circle(50% at 50% 50%);
  cursor: default;
}

.action-bubble:hover .bubble-content {
  transform: translateY(-10px) scale(1.05);
  background: rgba(255, 255, 255, 0.9);
  border-color: rgb(206, 17, 38, 0.3);
  box-shadow: 0 25px 50px rgba(206,17,38,0.15);
}

.action-icon {
  width: 70px;
  height: 70px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.action-bubble:hover .action-icon {
  transform: rotateY(180deg);
  background: rgb(206, 17, 38);
}

.action-icon i {
  font-size: 1.8rem;
  color: rgb(24, 182, 57);
  transition: color 0.3s;
}

.action-bubble:hover .action-icon i {
  color: white;
}

.action-details h3 {
  font-size: 1.35rem;
  margin-bottom: 12px;
  color: #222;
  font-weight: 700;
}

.action-details p {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
}

.btn-bubble {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgb(206, 17, 38);
  font-weight: 700;
  font-size: 0.85rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: gap 0.3s;
}

.btn-bubble:hover {
  gap: 12px;
}

.section-tag {
  color: rgb(206, 17, 38);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.85rem;
  margin-bottom: 10px;
  display: block;
}

@media (max-width: 768px) {
  .section-header h2 { font-size: 2.2rem; }
  .action-bubble {
    width: 300px;
    height: 300px;
  }
  .bubble-content { padding: 30px; }
}
</style>
