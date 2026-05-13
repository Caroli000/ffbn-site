<template>
  <div class="admin-dashboard">
    <nav class="admin-nav">
      <div class="nav-left">
        <img :src="logoImg" alt="Logo" class="mini-logo" />
        <span class="admin-title">Panel Admin FFBN</span>
      </div>
      <div class="nav-right">
        <button @click="handleLogout" class="btn-logout">Déconnexion</button>
      </div>
    </nav>

    <div class="admin-container">
      <aside class="sidebar">
        <ul>
          <li :class="{ active: currentTab === 'stats' }" @click="currentTab = 'stats'">
            <i class="fas fa-chart-line"></i> Statistiques
          </li>
          <li :class="{ active: currentTab === 'actions' }" @click="currentTab = 'actions'">
            <i class="fas fa-hands-helping"></i> Actions
          </li>
          <li :class="{ active: currentTab === 'events' }" @click="currentTab = 'events'">
            <i class="fas fa-calendar-alt"></i> Événements
          </li>
          <li :class="{ active: currentTab === 'discover' }" @click="currentTab = 'discover'">
            <i class="fas fa-magic"></i> Page Découverte
          </li>
          <li :class="{ active: currentTab === 'media' }" @click="currentTab = 'media'">
            <i class="fas fa-images"></i> Médias (Général)
          </li>
          <li @click="router.push('/admin/chat')">
            <i class="fas fa-comments"></i> Support Chat
          </li>
        </ul>
      </aside>

      <main class="content">
        <!-- Bannière d'erreur -->
        <div v-if="fetchError" class="error-banner">
          <div class="error-message">
            <strong>Erreur :</strong> {{ fetchError }}
          </div>
          <div class="error-actions">
            <button class="btn-retry" @click="fetchData">Réessayer</button>
          </div>
        </div>
        
        <!-- SECTION STATISTIQUES -->
        <section v-if="currentTab === 'stats'" class="admin-section">
          <h2>Gérer les Statistiques</h2>
          <div v-if="loading" class="admin-loader">Chargement...</div>
          <div v-else class="stats-cards">
            <div v-for="stat in stats" :key="stat.id" class="card-edit">
              <div class="form-row">
                <label>Valeur (ex: 500+)</label>
                <input v-model="stat.value" />
              </div>
              <div class="form-row">
                <label>Label FR</label>
                <input v-model="stat.label.fr" />
              </div>
              <div class="form-row">
                <label>Label EN</label>
                <input v-model="stat.label.en" />
              </div>
              <button @click="updateStat(stat)" class="btn-save">Enregistrer</button>
            </div>
          </div>
        </section>

        <!-- SECTION ACTIONS -->
        <section v-if="currentTab === 'actions'" class="admin-section">
          <div class="flex-header">
            <h2>Gérer les Actions</h2>
            <button @click="openActionModal()" class="btn-add">Ajouter une action</button>
          </div>
          
          <table class="admin-table">
            <thead>
              <tr>
                <th>Titre (FR)</th>
                <th>Description (FR)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="action in actions" :key="action.id">
                <td>{{ action.title?.fr }}</td>
                <td class="td-desc">{{ action.description?.fr }}</td>
                <td class="td-btns">
                  <button @click="openActionModal(action)" class="btn-icon"><i class="fas fa-edit"></i></button>
                  <button @click="handleDeleteAction(action.id)" class="btn-icon btn-delete"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- SECTION ÉVÉNEMENTS -->
        <section v-if="currentTab === 'events'" class="admin-section">
          <div class="flex-header">
            <h2>Gérer les Événements</h2>
            <button @click="openEventModal()" class="btn-add">Ajouter un événement</button>
          </div>
          
          <table class="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Titre (FR)</th>
                <th>Lieu</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in events" :key="event.id">
                <td>{{ event.date }}</td>
                <td>{{ event.title?.fr }}</td>
                <td>{{ event.location }}</td>
                <td class="td-btns">
                  <button @click="openEventModal(event)" class="btn-icon"><i class="fas fa-edit"></i></button>
                  <button @click="handleDeleteEvent(event.id)" class="btn-icon btn-delete"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- SECTION DÉCOUVERTE -->
        <section v-if="currentTab === 'discover'" class="admin-section">
          <div class="media-header">
            <h2>Images "Page Découverte"</h2>
            <p class="section-subtitle">Interface spécifique pour les photos de la page Découverte.</p>
          </div>
          
          <div class="discover-photos-grid">
             <div v-for="img in ['mission.webp', 'card1.jpg', 'card2.webp', 'card3.jpg']" :key="img" class="discover-photo-card">
               <h3 v-if="img === 'mission.webp'">PHOTO MISSION</h3>
               <h3 v-else>CARTE {{ img.replace('card', '').replace('.jpg', '').replace('.webp', '') }}</h3>
               <div class="photo-preview">
                 <img :src="`/images/discover/${img}?t=${refreshTrigger}`" @error="(e) => e.target.src = '/placeholder-image.jpg'" />
               </div>
               <label class="btn-action replace" title="Remplacer cette image">
                  <i class="fas fa-sync-alt"></i> Remplacer
                  <input type="file" @change="handleDiscoverImageUpload($event, img)" hidden accept="image/*" />
               </label>
             </div>
          </div>
        </section>

        <!-- SECTION MÉDIAS (GÉNÉRAL) -->
        <section v-if="currentTab === 'media'" class="admin-section">
          <div class="media-header">
            <h2>Gestionnaire de Médias</h2>
            <p class="section-subtitle">Gérez toutes les images par catégorie.</p>
          </div>

          <div v-if="loadingMedia" class="admin-loader">Chargement des médias...</div>
          <div v-else class="media-manager">
            <div v-for="(files, cat) in allMedia" :key="cat" class="media-category">
              <div class="cat-header">
                <h3>Catégorie: {{ cat.toUpperCase() }}</h3>
                <label class="btn-add-mini">
                  <i class="fas fa-plus"></i> Ajouter
                  <input type="file" @change="handleGeneralUpload($event, cat)" hidden accept="image/*" />
                </label>
              </div>
              <div class="media-grid">
                <div v-for="file in files" :key="file" class="media-item">
                  <div class="media-preview">
                    <img :src="`/images/${cat}/${file}?t=${refreshTrigger}`" />
                  </div>
                  <div class="media-info">
                    <span class="filename">{{ file }}</span>
                    <button @click="handleDeleteMedia(cat, file)" class="btn-action delete">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <!-- MODAL ACTION -->
    <div v-if="showActionModal" class="admin-modal-overlay">
      <div class="admin-modal">
        <h3>{{ editingAction ? 'Modifier l\'action' : 'Ajouter une action' }}</h3>
        <div class="form-group">
          <label>Titre (FR)</label>
          <input v-model="actionForm.title.fr" />
        </div>
        <div class="form-group">
          <label>Titre (EN)</label>
          <input v-model="actionForm.title.en" />
        </div>
        <div class="form-group">
          <label>Description (FR)</label>
          <textarea v-model="actionForm.description.fr"></textarea>
        </div>
        <div class="form-group">
          <label>Description (EN)</label>
          <textarea v-model="actionForm.description.en"></textarea>
        </div>
        <div class="modal-footer">
          <button @click="showActionModal = false" class="btn-cancel">Annuler</button>
          <button @click="saveAction" class="btn-save">{{ editingAction ? 'Mettre à jour' : 'Créer' }}</button>
        </div>
      </div>
    </div>

    <!-- MODAL EVENT -->
    <div v-if="showEventModal" class="admin-modal-overlay">
      <div class="admin-modal">
        <h3>{{ editingEvent ? 'Modifier l\'événement' : 'Ajouter un événement' }}</h3>
        <div class="form-group">
          <label>Date (ex: 15 Mai 2024)</label>
          <input v-model="eventForm.date" />
        </div>
        <div class="form-group">
          <label>Titre (FR)</label>
          <input v-model="eventForm.title.fr" />
        </div>
        <div class="form-group">
          <label>Titre (EN)</label>
          <input v-model="eventForm.title.en" />
        </div>
        <div class="form-group">
          <label>Lieu</label>
          <input v-model="eventForm.location" />
        </div>
        <div class="modal-footer">
          <button @click="showEventModal = false" class="btn-cancel">Annuler</button>
          <button @click="saveEvent" class="btn-save">{{ editingEvent ? 'Mettre à jour' : 'Créer' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useApi } from '../composables/useApi'
import logoImg from '../assets/images/logo.png'

const router = useRouter()
const api = useApi()

const currentTab = ref('stats')
const stats = ref([])
const actions = ref([])
const events = ref([])
const allMedia = ref({})
const loadingMedia = ref(false)
const fetchError = ref(null)
const refreshTrigger = ref(Date.now())

// Modals State
const showActionModal = ref(false)
const editingAction = ref(null)
const actionForm = reactive({
  title: { fr: '', en: '' },
  description: { fr: '', en: '' }
})

const showEventModal = ref(false)
const editingEvent = ref(null)
const eventForm = reactive({
  date: '',
  title: { fr: '', en: '' },
  location: ''
})

const baseURL = () => {
  if (import.meta.env.DEV) return '/api/'
  const path = window.location.pathname
  const base = path.split('/admin')[0].replace(/\/$/, '') || ''
  return base + '/api/'
}

// Data Fetching
const fetchData = async () => {
  fetchError.value = null
  try {
    const s = await api.get('admin/stats/list')
    const a = await api.get('admin/actions')
    const e = await api.get('admin/events')
    stats.value = s.data || []
    actions.value = a.data || []
    events.value = e.data || []
  } catch (err) {
    fetchError.value = 'Erreur lors du chargement des données.'
  }
}

const fetchMedia = async () => {
  loadingMedia.value = true
  try {
    const res = await api.get('admin/media/list')
    allMedia.value = res.data || {}
  } catch (err) {
    console.error('Erreur médias:', err)
  } finally {
    loadingMedia.value = false
  }
}

watch(currentTab, (newTab) => {
  if (newTab === 'media') fetchMedia()
})

// Stats logic
const updateStat = async (st) => {
  try {
    await api.put(`admin/stats/${st.id}`, st)
    fetchData()
  } catch (err) {
    fetchError.value = "Erreur lors de la mise à jour."
  }
}

// Actions logic
const openActionModal = (action = null) => {
  if (action) {
    editingAction.value = action.id
    actionForm.title = { ...action.title }
    actionForm.description = { ...action.description }
  } else {
    editingAction.value = null
    actionForm.title = { fr: '', en: '' }
    actionForm.description = { fr: '', en: '' }
  }
  showActionModal.value = true
}

const saveAction = async () => {
  try {
    if (editingAction.value) {
      await api.put(`admin/actions/${editingAction.value}`, actionForm)
    } else {
      await api.post('admin/actions', actionForm)
    }
    showActionModal.value = false
    fetchData()
  } catch (err) {
    alert('Erreur lors de la sauvegarde.')
  }
}

const handleDeleteAction = async (id) => {
  if (!confirm('Supprimer cette action ?')) return
  try {
    await api.del(`admin/actions/${id}`)
    fetchData()
  } catch (err) {
    alert('Erreur lors de la suppression.')
  }
}

// Events logic
const openEventModal = (event = null) => {
  if (event) {
    editingEvent.value = event.id
    eventForm.date = event.date
    eventForm.title = { ...event.title }
    eventForm.location = event.location
  } else {
    editingEvent.value = null
    eventForm.date = ''
    eventForm.title = { fr: '', en: '' }
    eventForm.location = ''
  }
  showEventModal.value = true
}

const saveEvent = async () => {
  try {
    if (editingEvent.value) {
      await api.put(`admin/events/${editingEvent.value}`, eventForm)
    } else {
      await api.post('admin/events', eventForm)
    }
    showEventModal.value = false
    fetchData()
  } catch (err) {
    alert('Erreur lors de la sauvegarde.')
  }
}

const handleDeleteEvent = async (id) => {
  if (!confirm('Supprimer cet événement ?')) return
  try {
    await api.del(`admin/events/${id}`)
    fetchData()
  } catch (err) {
    alert('Erreur lors de la suppression.')
  }
}

// Media Logic
const handleDiscoverImageUpload = async (e, filename) => {
  const file = e.target.files?.[0]
  if (!file) return
  const form = new FormData()
  form.append('category', 'discover')
  form.append('targetFilename', filename)
  form.append('image', file)
  
  try {
    const token = localStorage.getItem('admin_token')
    await axios.post(baseURL() + 'admin/media/upload', form, { 
      headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
      withCredentials: true
    })
    refreshTrigger.value = Date.now()
  } catch (err) {
    alert('Erreur upload')
  }
}

const handleGeneralUpload = async (e, category) => {
  const file = e.target.files?.[0]
  if (!file) return
  const form = new FormData()
  form.append('category', category)
  form.append('image', file)
  
  try {
    const token = localStorage.getItem('admin_token')
    await axios.post(baseURL() + 'admin/media/upload', form, { 
      headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
      withCredentials: true
    })
    fetchMedia()
  } catch (err) {
    alert('Erreur upload')
  }
}

const handleDeleteMedia = async (category, filename) => {
  if (!confirm('Supprimer cette image ?')) return
  try {
    const token = localStorage.getItem('admin_token')
    await axios.post(baseURL() + 'admin/media/delete', { category, filename }, {
      headers: { 'Authorization': `Bearer ${token}` },
      withCredentials: true
    })
    fetchMedia()
  } catch (err) {
    alert('Erreur suppression')
  }
}

const handleLogout = () => {
  localStorage.removeItem('admin_token')
  router.push('/admin/login')
}

onMounted(() => {
  if (!localStorage.getItem('admin_token')) {
    router.push('/admin/login')
  } else {
    fetchData()
  }
})
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8f9fa;
  color: #333;
}

.admin-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 70px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  z-index: 100;
}

.mini-logo { height: 40px; margin-right: 15px; }
.admin-title { font-weight: 800; font-size: 1.2rem; color: #1a1a1a; }

.btn-logout {
  background: #f1f1f1;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-logout:hover { background: #ce1126; color: white; }

.admin-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 260px;
  background: #1a1a1a;
  color: white;
  padding: 20px 0;
}

.sidebar ul { list-style: none; padding: 0; }
.sidebar li {
  padding: 15px 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s;
  color: #aaa;
  font-weight: 500;
}
.sidebar li i { width: 20px; font-size: 1.1rem; }
.sidebar li:hover { background: rgba(255,255,255,0.05); color: white; }
.sidebar li.active {
  background: #ce1126;
  color: white;
}

.content {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
}

.admin-section {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  margin-bottom: 30px;
}

.flex-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.btn-add {
  background: #ce1126;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}
.admin-table th { text-align: left; padding: 12px; border-bottom: 2px solid #f0f0f0; color: #777; font-size: 0.9rem; }
.admin-table td { padding: 15px 12px; border-bottom: 1px solid #f0f0f0; vertical-align: middle; }
.td-desc { max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #666; font-size: 0.85rem; }

.btn-icon {
  background: none;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
}
.btn-icon:hover { background: #f0f0f0; color: #ce1126; }
.btn-delete:hover { background: #fff1f1; color: #ce1126; }

/* Stats Cards */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.card-edit {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #eee;
}
.form-row { margin-bottom: 15px; }
.form-row label { display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 5px; color: #555; }
.form-row input { width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; }
.btn-save {
  width: 100%;
  padding: 10px;
  background: #333;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
.btn-save:hover { background: #000; }

/* Discover Grid */
.discover-photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
.discover-photo-card {
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
}
.photo-preview {
  height: 150px;
  background: #eee;
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: hidden;
}
.photo-preview img { width: 100%; height: 100%; object-fit: contain; background: #f5f5f5; }

.btn-action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f0f0f0;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}
.btn-action.replace { color: #ce1126; }
.btn-action.delete { color: #999; border: none; }
.btn-action.delete:hover { background: #ce1126; color: white; }

/* Media Manager */
.media-manager { display: flex; flex-direction: column; gap: 40px; }
.cat-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 15px; }
.btn-add-mini { font-size: 0.8rem; background: #eee; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-weight: 600; }
.media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px; }
.media-item { border: 1px solid #eee; border-radius: 8px; overflow: hidden; }
.media-preview { height: 140px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.media-preview img { width: 100%; height: 100%; object-fit: contain; }
.media-info { padding: 10px; background: white; border-top: 1px solid #eee; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.filename { font-size: 0.75rem; color: #444; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
.media-item { transition: transform 0.2s, box-shadow 0.2s; }
.media-item:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }

/* Modal Styles */
.admin-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.admin-modal {
  background: white;
  padding: 30px;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-weight: 700; margin-bottom: 8px; font-size: 0.9rem; }
.form-group input, .form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-family: inherit;
}
.form-group textarea { height: 100px; resize: none; }
.modal-footer { display: flex; justify-content: flex-end; gap: 15px; margin-top: 30px; }
.btn-cancel { background: #f0f0f0; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }
.btn-save { background: #ce1126; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; }

.error-banner {
  background: #fff3f3;
  color: #ce1126;
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid #ffcccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}
.admin-loader { text-align: center; padding: 40px; color: #888; font-style: italic; }
</style>
