<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="contact-card">
        <div class="contact-grid">
          <div class="contact-info">
            <span class="section-tag">{{ t('contact.tag') }}</span>
            <h2>{{ t('contact.title') }}</h2>
            <p>{{ t('contact.subtitle') }}</p>
            
            <img src="/images/drum-motif.png" class="drum-decoration" alt="Tambour Decoration" />

            <div class="info-list">
              <div class="info-item">
                <div class="icon-circle"><i class="fas fa-map-marker-alt"></i></div>
                <div>
                  <h4>{{ t('contact.location') }}</h4>
                  <p>Lille, France</p>
                </div>
              </div>
              <div class="info-item">
                <div class="icon-circle"><i class="fas fa-envelope"></i></div>
                <div>
                  <h4>Email</h4>
                  <p>ffbn.asso@gmail.com</p>
                </div>
              </div>
              <div class="info-item">
                <div class="icon-circle"><i class="fas fa-phone"></i></div>
                <div>
                  <h4>{{ t('contact.phone') }}</h4>
                  <p>07 66 66 46 07</p>
                </div>
              </div>
            </div>
          </div>

          <div class="contact-form-container">
            <img src="/images/drum-motif.png" class="form-drum-watermark" alt="Tambour" />
            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-group">
                <label>{{ t('contact.name') }}</label>
                <input v-model="form.name" type="text" :placeholder="t('contact.namePlaceholder')" required />
              </div>
              <div class="form-group">
                <label>{{ t('contact.email') }}</label>
                <input v-model="form.email" type="email" :placeholder="t('contact.emailPlaceholder')" required />
              </div>
              <div class="form-group">
                <label>{{ t('contact.message') }}</label>
                <textarea v-model="form.message" rows="5" :placeholder="t('contact.messagePlaceholder')" required></textarea>
              </div>
              <button type="submit" :disabled="loading" class="btn-submit">
                <span v-if="!loading" class="btn-text">{{ t('contact.send') }}</span>
                <span v-else class="loader"></span>
              </button>
              <transition name="fade">
                <p v-if="statusMsg" :class="['status-msg', statusType]">
                  {{ statusMsg }}
                </p>
              </transition>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useApi } from '../composables/useApi'

const { t, locale } = useI18n()
const { post, loading } = useApi()

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const statusMsg = ref('')
const statusType = ref('')

const submitForm = async () => {
  try {
    const res = await post('contact', { ...form }, locale.value)
    statusMsg.value = res.message || t('contact.success')
    statusType.value = 'success'
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (err) {
    statusMsg.value = err.response?.data?.message || t('contact.error')
    statusType.value = 'error'
  } finally {
    setTimeout(() => { statusMsg.value = '' }, 5000)
  }
}
</script>

<style scoped>
.contact-section {
  padding: 100px 0;
  background-color: #f8f9fa;
  position: relative;
}

.contact-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
}

.contact-info {
  background: linear-gradient(135deg, #121212, #1a1a1a); 
  color: white;
  padding: 60px;
  position: relative;
  overflow: hidden;
}

.drum-decoration {
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 15rem;
  opacity: 0.15;
  pointer-events: none;
  filter: grayscale(1) brightness(2);
  transform: rotate(-15deg);
  z-index: 1;
  animation: float-drum 8s ease-in-out infinite;
}

@keyframes float-drum {
  0%, 100% { transform: rotate(-15deg) translateY(0); }
  50% { transform: rotate(-12deg) translateY(-15px); }
}

.contact-info > *:not(.drum-decoration) {
  position: relative;
  z-index: 2;
}

.section-tag {
  color: var(--burundi-green);
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.contact-info h2 {
  font-size: 2.5rem;
  margin: 15px 0 25px;
}

.contact-info p {
  color: #ccc;
  margin-bottom: 40px;
  line-height: 1.6;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.info-item {
  display: flex;
  gap: 20px;
  align-items: center;
}

.icon-circle {
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--burundi-green);
  font-size: 1.2rem;
}

.info-item h4 {
  margin: 0;
  font-size: 1.1rem;
}

.info-item p {
  margin: 5px 0 0;
  color: #aaa;
}

.contact-form-container {
  padding: 60px;
  position: relative;
  overflow: hidden;
}

.form-drum-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 450px;
  opacity: 0.03;
  pointer-events: none;
  z-index: 1;
  animation: drumBeatPulse 4s infinite ease-in-out;
}

@keyframes drumBeatPulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.03; }
  10% { transform: translate(-50%, -50%) scale(1.02); opacity: 0.05; }
  20% { transform: translate(-50%, -50%) scale(1.0); opacity: 0.03; }
  30% { transform: translate(-50%, -50%) scale(1.02); opacity: 0.05; }
  40% { transform: translate(-50%, -50%) scale(1.0); opacity: 0.03; }
  100% { transform: translate(-50%, -50%) scale(1.0); opacity: 0.03; }
}

.contact-form {
  position: relative;
  z-index: 2;
}

.form-group {
  margin-bottom: 25px;
  opacity: 1;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #444;
  transition: color 0.3s ease;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0);
}

.form-group input:focus, .form-group textarea:focus {
  outline: none;
  border-color: var(--burundi-red);
  box-shadow: 0 4px 12px rgba(206, 17, 38, 0.15);
  transform: translateY(-2px);
}

.form-group input:hover, .form-group textarea:hover {
  border-color: #ccc;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.btn-submit {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, var(--burundi-red), #ff5252);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(206, 17, 38, 0.2);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(206, 17, 38, 0.4);
}

.btn-submit::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -60%;
  width: 20%;
  height: 200%;
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(30deg);
  pointer-events: none;
  transition: none;
}

.btn-submit:hover:not(:disabled)::after {
  left: 120%;
  transition: all 0.6s ease;
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-text {
  position: relative;
  z-index: 1;
}

.loader {
  position: relative;
  z-index: 1;
}

.status-msg {
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  text-align: center;
}

.status-msg.success {
  background-color: rgba(24, 182, 57, 0.1);
  color: var(--burundi-green);
}

.status-msg.error {
  background-color: rgba(206, 17, 38, 0.1);
  color: var(--burundi-red);
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 992px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .contact-info, .contact-form-container {
    padding: 30px;
  }
}
</style>
