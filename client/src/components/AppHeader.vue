<template>
  <header :class="{ 'scrolled': isScrolled, 'light-header': route.name === 'discover' }">
    <router-link to="/" class="logo-container">
      <img :src="logoImg" alt="Logo FFBN" class="logo" />
      <span class="logo-text">FFBN</span>
    </router-link>
    <nav>
      <ul :class="{ open: menuOpen }">
        <li><router-link to="/" active-class="active" @click="menuOpen = false">{{ t('nav.home') }}</router-link></li>
        <li><router-link to="/about" active-class="active" @click="menuOpen = false">{{ t('nav.about') }}</router-link></li>
        <li><router-link to="/actions" active-class="active" @click="menuOpen = false">{{ t('nav.actions') }}</router-link></li>
        <li><router-link to="/events" active-class="active" @click="menuOpen = false">{{ t('footer.events') }}</router-link></li>
        <li><router-link to="/volunteer" active-class="active" @click="menuOpen = false">{{ t('nav.volunteer') }}</router-link></li>
        <li><router-link to="/contact" active-class="active" @click="menuOpen = false">{{ t('nav.contact') }}</router-link></li>
        <li><router-link to="/contact" class="btn-join" @click="menuOpen = false">{{ t('nav.join') }}</router-link></li>
        <li>
          <LanguageSwitcher />
        </li>
      </ul>
      <button class="mobile-menu-btn" @click="toggleMenu">
        <i class="fas" :class="menuOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import LanguageSwitcher from './LanguageSwitcher.vue'
import logoImg from '../assets/images/logo.png'

const { t } = useI18n()
const route = useRoute()
const menuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  color: white;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

header.scrolled {
  background: rgba(255, 255, 255, 0.4); 
  backdrop-filter: blur(25px); 
  -webkit-backdrop-filter: blur(25px); 
  padding: 10px 50px;
  color: #333;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05); 
}

header.scrolled .logo {
  border-color: var(--burundi-red);
}

header.scrolled nav a {
  color: #333;
}

header.light-header:not(.scrolled) {
  color: #333;
}
header.light-header:not(.scrolled) nav a {
  color: rgba(51, 51, 51, 0.85);
}
header.light-header:not(.scrolled) nav a:hover,
header.light-header:not(.scrolled) nav a.active {
  color: var(--burundi-red);
}
header.light-header:not(.scrolled) .btn-join {
  background-color: rgba(0, 0, 0, 0.05);
  color: #333;
}
header.light-header:not(.scrolled) .btn-join:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
header.light-header:not(.scrolled) .mobile-menu-btn {
  color: #333;
}
header.light-header:not(.scrolled) .logo {
  border-color: #ccc;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 15px;
  animation: logoEntrance 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes logoEntrance {
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(-10deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.logo {
  width: 55px;
  height: 55px;
  background-color: white;
  border-radius: 50%;
  border: 2px solid white;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.25) rotate(8deg);
}

.logo-text {
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 1px;
}

nav ul {
  display: flex;
  list-style: none;
  gap: 25px;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  font-size: 0.95rem;
  transition: color 0.3s;
}

nav a:hover,
nav a.active {
  color: white;
  text-decoration: underline;
  text-underline-offset: 5px;
}

.btn-join {
  background: linear-gradient(135deg, var(--burundi-red), #ff5252);
  padding: 10px 25px;
  border-radius: 12px;
  color: white !important;
  box-shadow: 0 4px 10px rgba(206, 17, 38, 0.3);
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  text-decoration: none !important;
}

.btn-join:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 15px rgba(206, 17, 38, 0.4);
  background: linear-gradient(135deg, #ff5252, var(--burundi-red));
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  header {
    padding: 15px 20px;
  }

  .mobile-menu-btn {
    display: block;
  }

  nav ul {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.9);
    padding: 20px;
    gap: 15px;
  }

  nav ul.open {
    display: flex;
  }
}
</style>
