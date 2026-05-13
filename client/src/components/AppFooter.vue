<template>
  <footer id="site-footer" class="main-footer">
    <div class="container footer-grid">
      <div class="footer-col">
        <h3 class="footer-logo">FFBN</h3>
        <p>{{ t('footer.description') }}</p>
        <div class="social-links-footer">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="https://www.instagram.com/p/CiJ4oRwsqIK/?utm_source=ig_web_copy_link" target="_blank" title="Suivez-nous ! sur instagram">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <p class="follow-us">Suivez-nous ! sur instagram</p>
      </div>

      <div class="footer-col">
        <h4>{{ t('footer.quickLinks') }}</h4>
        <ul>
          <li><router-link to="/">{{ t('footer.home') }}</router-link></li>
          <li><router-link to="/about">{{ t('footer.whoWeAre') }}</router-link></li>
          <li><router-link to="/actions">{{ t('footer.ourActions') }}</router-link></li>
          <li><router-link to="/events">{{ t('footer.events') }}</router-link></li>
          <li><router-link to="/contact">{{ t('footer.contactLink') }}</router-link></li>
          <li><router-link to="/admin/login" class="admin-link">Espace Admin</router-link></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>{{ t('footer.contact') }}</h4>
        <ul class="contact-list">
          <li><i class="fas fa-map-marker-alt"></i> Lille, France</li>
          <li><i class="fas fa-envelope"></i> ffbn.asso@gmail.com</li>
          <li><i class="fas fa-phone"></i> 07 66 66 46 07</li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>{{ t('footer.newsletter') }}</h4>
        <p>{{ t('footer.newsletterText') }}</p>
        <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
          <input
            v-model="email"
            type="email"
            :placeholder="t('footer.emailPlaceholder')"
            required
          />
          <button type="submit">
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
        <p v-if="newsletterMsg" class="newsletter-msg" :class="{ success: newsletterSuccess }">
          {{ newsletterMsg }}
        </p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>{{ t('footer.copyright') }}</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useApi } from '../composables/useApi'

const { t } = useI18n()
const { post } = useApi()

const email = ref('')
const newsletterMsg = ref('')
const newsletterSuccess = ref(false)

const subscribeNewsletter = async () => {
  try {
    const res = await post('newsletter', { email: email.value })
    newsletterMsg.value = res.message
    newsletterSuccess.value = true
    email.value = ''
    setTimeout(() => { newsletterMsg.value = '' }, 4000)
  } catch {
    newsletterMsg.value = 'Erreur lors de l\'inscription.'
    newsletterSuccess.value = false
  }
}
</script>

<style scoped>
.main-footer {
  background-color: #121212; 
  color: #888;
  padding: 80px 0 0;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 50px;
  padding-bottom: 60px;
  
}

.footer-logo {
  color: white;
  font-size: 2rem;
  margin-bottom: 20px;
  display: inline-block;
}

.footer-col h4 {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 25px;
}

.social-links-footer {
  margin-top: 25px;
  display: flex;
  gap: 15px;
  align-items: center;
}

.follow-us {
  margin-top: 10px;
  font-size: 0.8rem;
  color: #666;
}

.social-links-footer a {
  width: 40px;
  height: 40px;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: background 0.3s;
}

.social-links-footer a:hover {
  background-color: rgb(206, 17, 38);
}

.footer-col ul {
  list-style: none;
  padding: 0;
}

.footer-col ul li {
  margin-bottom: 15px;
}

.footer-col ul li a {
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s, padding-left 0.3s;
}

.footer-col ul li a:hover {
  color: white;
  padding-left: 5px;
}

.admin-link {
  font-size: 0.75rem !important;
  opacity: 0.4;
  margin-top: 15px;
  display: block;
}

.admin-link:hover {
  opacity: 1 !important;
}

.contact-list li {
  display: flex;
  gap: 15px;
  align-items: center;
}

.contact-list i {
  color: rgb(24, 182, 57);
}

.newsletter-form {
  display: flex;
  margin-top: 20px;
}

.newsletter-form input {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 5px 0 0 5px;
  background-color: #333;
  color: white;
  font-family: 'Montserrat', sans-serif;
}

.newsletter-form button {
  padding: 12px 20px;
  background-color: rgb(206, 17, 38);
  border: none;
  border-radius: 0 5px 5px 0;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

.newsletter-form button:hover {
  background-color: #b00000;
}

.newsletter-msg {
  margin-top: 10px;
  font-size: 0.85rem;
  color: #ef5350;
}

.newsletter-msg.success {
  color: rgb(24, 182, 57);
}

.footer-bottom {
  text-align: center;
  padding: 25px 0;
  font-size: 0.9rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
