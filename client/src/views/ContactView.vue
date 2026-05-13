<template>
  <div class="contact-page">
    <PageHero 
      :title="t('contact.tag')" 
      :subtitle="t('contact.subtitle')" 
    />

    <section class="contact-content">
      
      <div class="bg-decorations">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>

      <div class="container ring-pattern">
        <div class="contact-simple-grid">
          
          <div class="info-box">
            <div class="icon-wrap"><i class="fas fa-map-marker-alt"></i></div>
            <h3>{{ t('contact.location') }}</h3>
            <p>Lille, France</p>
          </div>

<div class="info-box">
            <div class="icon-wrap"><i class="fas fa-envelope"></i></div>
            <h3>Email</h3>
            <p><a href="mailto:ffbn.asso@gmail.com">ffbn.asso@gmail.com</a></p>
          </div>

<div class="info-box">
            <div class="icon-wrap"><i class="fas fa-phone"></i></div>
            <h3>{{ t('contact.phone') }}</h3>
            <p><a href="tel:0766664607">07 66 66 46 07</a></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import PageHero from '../components/PageHero.vue'
import ContactSection from '../components/ContactSection.vue'

const { t } = useI18n()
</script>

<style scoped>
.contact-content {
  padding: 120px 0;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
}

.ring-pattern::before {
  content: "";
  position: absolute;
  top: -50px;
  right: -50px;
  width: 300px;
  height: 300px;
  background-image: radial-gradient(#eee 2px, transparent 2px);
  background-size: 20px 20px;
  opacity: 0.5;
  z-index: 0;
}

.bg-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.05;
  animation: float 15s infinite ease-in-out;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: #cccccc; 
  top: -100px;
  left: -100px;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background: var(--burundi-green);
  bottom: -150px;
  right: -100px;
  animation-delay: -5s;
}

.circle-3 {
  width: 200px;
  height: 200px;
  background: #3b82f6;
  top: 50%;
  left: 60%;
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

.contact-simple-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  position: relative;
  z-index: 1;
}

.info-box {
  background: rgba(255, 255, 255, 0.9);
  padding: 60px 40px;
  border-radius: 30px;
  text-align: center;
  box-shadow: 0 15px 45px rgba(0,0,0,0.03);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid rgba(238, 238, 238, 0.5);
  backdrop-filter: blur(10px);
}

.info-box:hover {
  transform: translateY(-15px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.08);
  border-color: var(--burundi-red);
}

.icon-wrap {
  width: 80px;
  height: 80px;
  background: #fff5f5;
  color: var(--burundi-red);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  font-size: 2rem;
  transition: all 0.3s ease;
}

.info-box:hover .icon-wrap {
  transform: rotate(10deg) scale(1.1);
  background: #666666; 
  color: white;
}

.info-box h3 {
  margin-bottom: 10px;
  font-size: 1.3rem;
  color: #333;
}

.info-box p, .info-box a {
  color: #666;
  text-decoration: none;
  font-size: 1.1rem;
}

.info-box a:hover {
  color: var(--burundi-red);
}

@media (max-width: 768px) {
  .contact-simple-grid {
    grid-template-columns: 1fr;
  }
}
</style>
