<template>
  <section id="events" class="events-section">
    <div class="container">
      <div class="section-header text-center">
        <span class="section-tag">{{ t('events.tag') }}</span>
        <h2>{{ t('events.title') }}</h2>
        <p>{{ t('events.subtitle') }}</p>
      </div>

<div v-if="loading && events.length === 0" class="loading-state">
        <div class="spinner"></div>
        <p>Chargement événements...</p>
      </div>

<div v-else-if="isError && events.length === 0" class="error-state">
        <p>❌ Erreur: {{ error || 'Impossible de charger les événements' }}</p>
        <button @click="fetchEvents" class="btn-retry">🔄 Réessayer</button>
      </div>

<div v-else-if="events.length" class="events-grid">
        <div v-for="event in events" :key="event._id || event.id" class="event-card">
          <div class="event-date-badge">
            <span class="day">{{ formatDate(event.date, 'D') }}</span>
            <span class="month">{{ formatDate(event.date, 'MMM') }}</span>
          </div>
          <div class="event-content">
            <div class="event-meta">
              <span><i class="fas fa-map-marker-alt"></i> {{ event.location }}</span>
            </div>
            <h3>{{ event.title }}</h3>
            <p>{{ event.description || 'Pas de description' }}</p>
            <router-link to="/events" class="btn-outline-red">Détails</router-link>
          </div>
        </div>
      </div>

<div v-else class="empty-state">
        <p>Aucun événement disponible</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useApi } from '../composables/useApi'

const { t, locale } = useI18n()
const { get, loading, error } = useApi()

const events = ref([])
const isError = ref(false)

const fetchEvents = async () => {
  try {
    isError.value = false
    console.log('🔄 Fetching events...')
    
    const res = await get('events/upcoming', locale.value)
    console.log('📊 Response:', res)

    if (res?.data && Array.isArray(res.data)) {
      events.value = res.data
      console.log(`✅ Loaded ${res.data.length} events`)
    } else if (Array.isArray(res)) {
      events.value = res
      console.log(`✅ Loaded ${res.length} events (direct array)`)
    } else {
      console.warn('⚠️ Unexpected response:', res)
      events.value = []
    }
  } catch (err) {
    isError.value = true
    console.error('❌ Error:', err.message)
    events.value = []
  }
}

const formatDate = (dateStr, type) => {
  try {
    if (!dateStr) return '---'
    const date = new Date(dateStr)

    if (isNaN(date.getTime())) {
      console.warn('⚠️ Invalid date:', dateStr)
      return '---'
    }

    if (type === 'D') return date.getDate()
    if (type === 'MMM') {
      const month = date.toLocaleString('fr-FR', { month: 'short' })
      return month.replace('.', '').toUpperCase()
    }
    return date.toLocaleDateString('fr-FR')
  } catch (e) {
    console.error('❌ Error formatting date:', e)
    return '---'
  }
}

onMounted(() => {
  console.log('📍 EventsSection mounted')
  fetchEvents()
})

watch(locale, () => {
  console.log('📍 Locale changed:', locale.value)
  fetchEvents()
})
</script>

<style scoped>
.events-section {
  padding: 100px 0;
  background-color: white;
}

.section-header {
  max-width: 700px;
  margin: 0 auto 60px;
}

.section-tag {
  display: inline-block;
  color: var(--burundi-green);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.85rem;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.event-card {
  display: flex;
  background: #fdfdfd;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
  position: relative;
  border: 1px solid #eee;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.event-date-badge {
  background-color: #f8f8f8;
  color: var(--burundi-red);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 90px;
  border-right: 1px solid #eee;
}

.event-date-badge .day {
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1;
}

.event-date-badge .month {
  font-size: 0.8rem;
  font-weight: 700;
  margin-top: 5px;
  text-transform: uppercase;
  color: #333;
}

.event-content {
  padding: 25px 30px;
  flex: 1;
}

.event-meta {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 12px;
  display: flex;
  gap: 15px;
}

.event-meta i {
  color: #888;
  margin-right: 5px;
}

.event-content h3 {
  font-size: 1.4rem;
  margin-bottom: 12px;
  color: #222;
  font-weight: 700;
}

.event-content p {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 20px;
  line-height: 1.6;
}

.btn-outline-red {
  display: inline-block;
  color: var(--burundi-red);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s;
}

.btn-outline-red:hover {
  text-decoration: underline;
  transform: translateX(5px);
}

.loading-state, .empty-state, .error-state {
  text-align: center;
  padding: 50px 0;
  color: #888;
}

.error-state {
  background: #fee;
  padding: 30px;
  border-radius: 10px;
  color: #c33;
  margin-top: 20px;
}

.btn-retry {
  background: #c33;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-retry:hover {
  background: #a22;
}

.cache-status {
  font-size: 0.85rem;
  margin-top: 10px;
  padding: 8px 15px;
  display: inline-block;
  border-radius: 5px;
  font-weight: 600;
}

.cache-status.hit {
  background: #e8f5e9;
  color: #2e7d32;
}

.cache-status.miss {
  background: #fff3e0;
  color: #e65100;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--burundi-red);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 576px) {
  .event-card {
    flex-direction: column;
  }
  .event-date-badge {
    flex-direction: row;
    gap: 10px;
    padding: 10px;
  }
}
</style>
