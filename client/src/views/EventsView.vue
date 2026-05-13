<template>
  <div class="events-page">
    <PageHero 
      :title="t('footer.events')" 
      :subtitle="t('events.subtitle')" 
    />

    <section class="events-list reveal reveal-up" v-reveal>
      <div class="container">
        <div class="filter-bar">
          <button @click="filter = 'upcoming'" :class="{ active: filter === 'upcoming' }">À venir</button>
          <button @click="filter = 'past'" :class="{ active: filter === 'past' }">Passés</button>
        </div>

        <div v-if="loading" class="loading">Chargement...</div>
        
        <div v-else-if="filteredEvents.length === 0" class="no-events">
          <i class="fas fa-calendar-times"></i>
          <p>{{ t('events.noEvents') }}</p>
        </div>

        <div v-else class="events-grid">
          <div v-for="event in filteredEvents" :key="event.id" class="event-card">
            <div class="event-date">
              <span class="day">{{ new Date(event.date).getDate() }}</span>
              <span class="month">{{ formatMonth(event.date) }}</span>
            </div>
            <div class="event-details">
              <h3>{{ event.title }}</h3>
              <p class="location"><i class="fas fa-map-marker-alt"></i> {{ event.location }}</p>
              <p class="description">{{ event.description }}</p>
              <router-link :to="`/events/${event.id}`" class="btn-more">{{ t('events.details') }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHero from '../components/PageHero.vue'
import { useApi } from '../composables/useApi'

const { t, locale } = useI18n()
const { get } = useApi()

const filter = ref('upcoming')
const events = ref([])
const loading = ref(true)

const fetchEvents = async () => {
    loading.value = true
    try {
        const res = await get('events', locale.value)
        if (res.data) events.value = res.data
    } catch {

    } finally {
        loading.value = false
    }
}

const filteredEvents = computed(() => {
    const today = new Date()
    return events.value.filter(e => {
        const date = new Date(e.date)
        return filter.value === 'upcoming' ? date >= today : date < today
    })
})

const formatMonth = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString(locale.value, { month: 'short' }).toUpperCase()
}

onMounted(fetchEvents)
</script>

<style scoped>
.events-list {
  padding: 80px 0;
}

.filter-bar {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
}

.filter-bar button {
  padding: 10px 30px;
  border: 2px solid #eee;
  background: white;
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-bar button.active {
  background: var(--burundi-red);
  border-color: var(--burundi-red);
  color: white;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.event-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  display: flex;
  transition: transform 0.3s;
}

.event-date {
  background: #f8f8f8;
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-right: 1px solid #eee;
}

.event-date .day {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--burundi-red);
}

.event-date .month {
  font-size: 0.8rem;
  font-weight: 700;
  color: #333;
}

.event-details {
  padding: 25px 30px;
  flex: 1;
}

.event-details h3 {
  margin-bottom: 10px;
  font-size: 1.4rem;
  font-weight: 700;
}

.location {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.location i {
  margin-right: 5px;
}

.description {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
}

.btn-more {
  color: var(--burundi-red);
  font-weight: 700;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s;
}

.btn-more:hover {
  text-decoration: underline;
  transform: translateX(5px);
  display: inline-block;
}

.loading, .no-events {
  text-align: center;
  padding: 50px;
  color: #888;
}

.no-events i {
  font-size: 3rem;
  margin-bottom: 20px;
  opacity: 0.3;
}
</style>
