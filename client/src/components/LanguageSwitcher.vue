<template>
  <div class="lang-switcher">
    <button
      :class="{ active: locale === 'fr' }"
      @click="switchLang('fr')"
      title="Français"
    >FR</button>
    <span class="sep">|</span>
    <button
      :class="{ active: locale === 'en' }"
      @click="switchLang('en')"
      title="English"
    >EN</button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const switchLang = (lang) => {
  locale.value = lang
  document.documentElement.lang = lang
}
</script>

<style scoped>
.lang-switcher {
  display: flex;
  align-items: center;
  gap: 5px;
}

.lang-switcher button {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 3px;
  transition: all 0.3s;
  font-family: 'Montserrat', sans-serif;
}

.lang-switcher button.active {
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
}

.lang-switcher button:hover {
  color: white;
}

.sep {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
}
</style>
