<template>
  <div class="home">
    <main>
      <HeroCarousel />
      <AboutSection />
      <ValuesSection />
      <ActionsSection />
      <EventsSection />
      <VolunteerSection />
      <PartnersSection />
      <ContactSection />
    </main>
  </div>
</template>

<script setup>
import HeroCarousel from '../components/HeroCarousel.vue'
import AboutSection from '../components/AboutSection.vue'
import ValuesSection from '../components/ValuesSection.vue'
import ActionsSection from '../components/ActionsSection.vue'
import EventsSection from '../components/EventsSection.vue'
import VolunteerSection from '../components/VolunteerSection.vue'
import PartnersSection from '../components/PartnersSection.vue'
import ContactSection from '../components/ContactSection.vue'
</script>

<style scoped>
.home {
  width: 100%;
  overflow-x: hidden;
}
</style>
