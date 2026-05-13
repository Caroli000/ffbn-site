<template>
  <section id="about" class="about-section">
    <div class="container about-container">
      <div class="about-image reveal reveal-left" v-reveal>
        <div class="members-carousel">
          <div 
            v-for="(member, index) in memberSlides" 
            :key="index"
            class="member-slide"
            :class="{ active: currentMemberSlide === index }"
            :style="{ backgroundImage: `url(${member})` }"
          >
            <div v-if="!member" class="image-placeholder">
              <i class="fas fa-user"></i>
              <span>Photo du membre {{ index + 1 }}</span>
            </div>
          </div>
          
          <div class="carousel-dots">
            <span 
              v-for="(_, index) in memberSlides" 
              :key="index" 
              class="dot"
              :class="{ active: currentMemberSlide === index }"
            ></span>
          </div>
        </div>
      </div>
      <div class="about-content">
        <span class="section-tag">{{ t('about.tag') }}</span>
        <h2>{{ t('about.title') }}</h2>
        <p>{{ t('about.p1') }}</p>
        <p>{{ t('about.p2') }}</p>

        <div class="about-stats">
          <div v-for="stat in stats" :key="stat.id" class="stat-item reveal reveal-up" v-reveal>
            <span class="stat-number">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>

        <router-link to="/about" class="btn-primary">{{ t('about.learnMore') }}</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useApi } from '../composables/useApi'

const memberSlides = ref([])
const currentMemberSlide = ref(0)
let slideInterval = null

const { t, locale } = useI18n()
const { get } = useApi()

const fetchMembers = async () => {
  try {
    const res = await get('media/list/members')
    console.log('[AboutSection] API Debug:', res)
    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      const timestamp = Date.now()
      memberSlides.value = res.data.map(file => `/images/members/${file}?t=${timestamp}`)
      console.log('[AboutSection] Loaded images:', memberSlides.value)
    }
  } catch (err) {
    console.error('[AboutSection] Error loading images:', err)
  }
}

const startCarousel = () => {
  slideInterval = setInterval(() => {
    if (memberSlides.value.length > 0) {
      currentMemberSlide.value = (currentMemberSlide.value + 1) % memberSlides.value.length
    }
  }, 4000)
}

const stopCarousel = () => {
  if (slideInterval) clearInterval(slideInterval)
}

const stats = ref([
  { id: 1, value: '100+', label: 'Membres' },
  { id: 2, value: '3', label: 'Villes' },
  { id: 3, value: '20+', label: 'Événements' },
])

onMounted(() => {
  fetchMembers()
  startCarousel()
})

onUnmounted(() => {
  stopCarousel()
})
</script>

<style scoped>
.about-section {
  padding: 100px 0;
  background-color: white;
}

.about-container {
  display: flex;
  align-items: center;
  gap: 60px;
}

.about-image {
  flex: 1;
  position: relative;
}

.members-carousel {
  width: 100%;
  height: 450px;
  background-color: #f8f9fa;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  border: 4px solid white;
}

.member-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  transform: scale(1.05);
}

.member-slide.active {
  opacity: 1;
  transform: scale(1);
}

.image-placeholder {
  text-align: center;
  color: #ccc;
}

.image-placeholder i {
  font-size: 4rem;
  margin-bottom: 10px;
}

.image-placeholder span {
  display: block;
  font-weight: 600;
  font-size: 0.9rem;
}

.carousel-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.dot.active {
  width: 24px;
  border-radius: 4px;
  background-color: rgb(206, 17, 38);
}

.about-image::before {
  content: '';
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 200px;
  height: 200px;
  background-image: radial-gradient(rgb(24, 182, 57) 20%, transparent 20%);
  background-size: 20px 20px;
  z-index: -1;
  opacity: 0.2;
}

.about-content {
  flex: 1;
}

.about-content h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  line-height: 1.2;
  color: #222;
}

.about-content p {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.about-stats {
  display: flex;
  gap: 40px;
  margin: 30px 0;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: rgb(24, 182, 57);
}

.stat-label {
  font-size: 0.9rem;
  color: #555;
  font-weight: 600;
}

.section-tag {
  display: inline-block;
  color: rgb(206, 17, 38);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.85rem;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.btn-primary {
  display: inline-block;
  padding: 13px 35px;
  background-color: rgb(206, 17, 38);
  color: white;
  text-decoration: none;
  font-weight: 700;
  border-radius: 40px 15px 40px 15px; 
  transition: all 0.5s cubic-bezier(0.25, 1, 0.3, 1);
  box-shadow: 0 10px 20px rgba(206, 17, 38, 0.2);
}

.btn-primary:hover {
  background-color: #b00000;
  transform: translateY(-5px) scale(1.03) rotate(-1deg);
  box-shadow: 0 15px 30px rgba(206, 17, 38, 0.3);
  border-radius: 15px 40px 15px 40px;
}

@media (max-width: 992px) {
  .about-container {
    flex-direction: column;
  }

  .about-image {
    width: 100%;
  }
}
</style>
