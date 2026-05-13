<template>
  <section id="volunteer" class="volunteer-section">
    <div class="volunteer-overlay"></div>
    <div class="container volunteer-content reveal reveal-up" v-reveal>
      <h2>{{ t('volunteer.title') }}</h2>
      <p>{{ t('volunteer.subtitle') }}</p>
      <div class="volunteer-actions">
        <router-link to="/volunteer" class="btn-modern btn-primary">
          <i class="fas fa-hand-holding-heart"></i>
          {{ t('volunteer.btnVolunteer') }}
        </router-link>
        <a href="https://www.helloasso.com/associations/ffbn" target="_blank" rel="noopener noreferrer" class="btn-modern btn-glass">
          {{ t('volunteer.btnDonate') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.volunteer-section {
  position: relative;
  padding: 100px 0;
  background: linear-gradient(135deg, #0f5132, #198754); 
  color: white;
  text-align: center;
  overflow: hidden;
}

.volunteer-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L20 20 M20 0 L0 20' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E");
  z-index: 1;
}

.volunteer-content {
  position: relative;
  z-index: 2;
}

.volunteer-content h2 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.volunteer-content p {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 40px;
  opacity: 0.9;
}

.volunteer-actions {
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
}

.btn-modern {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  padding: 16px 35px;
  border-radius: 12px; 
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.btn-modern i {
  font-size: 1.2rem;
}

.btn-primary {
  background: linear-gradient(135deg, var(--burundi-red), #ff5252);
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-primary:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 15px 30px rgba(206, 17, 38, 0.4);
}

.btn-glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-glass:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .volunteer-content h2 {
    font-size: 2rem;
  }
}
</style>
