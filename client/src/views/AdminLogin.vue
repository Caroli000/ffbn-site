<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <img :src="logoImg" alt="FFBN" class="logo" />
        <h2>Espace Administration</h2>
        <p>Connectez-vous pour gérer le contenu</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>Nom d'utilisateur</label>
          <input v-model="username" type="text" required placeholder="admin" :disabled="loading" />
        </div>
        <div class="form-group">
          <label>Mot de passe</label>
          <input v-model="password" type="password" required placeholder="••••••••" :disabled="loading" />
        </div>
        
        <button type="submit" class="btn-login" :disabled="loading">
          <span v-if="!loading">Se connecter</span>
          <span v-else class="loader"></span>
        </button>
        
        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
      </form>
      
      <router-link to="/" class="back-link">
        <i class="fas fa-arrow-left"></i> Retour au site
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '../composables/useApi'
import logoImg from '../assets/images/logo.png'

const router = useRouter()
const { post, loading } = useApi()

const username = ref('')
const password = ref('')
const errorMsg = ref('')

const handleLogin = async () => {
  try {
    console.log('[AdminLogin] Tentative login avec:', { username: username.value })
    const res = await post('admin/login', {
      username: username.value,
      password: password.value
    })
    
      console.log('[AdminLogin] Réponse login:', res)
      if (res.success) {
        if (res.token) {
          console.log('[AdminLogin] Token reçu, sauvegardé dans localStorage')
          localStorage.setItem('admin_token', res.token)
        } else {
          console.warn('[AdminLogin] Aucun token dans la réponse (mode cookie)')
        }

        router.push('/admin/dashboard')
      }
  } catch (err) {
    console.error('[AdminLogin] Erreur Login:', err.response?.data || err.message)
    errorMsg.value = err.response?.data?.message || 'Identifiants incorrects ou erreur serveur.'
  }
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  color: white;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  color: #333;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.login-header .logo {
  height: 60px;
  margin-bottom: 20px;
}

.login-header h2 {
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: #1a1a1a;
}

.login-header p {
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 30px;
}

.form-group {
  text-align: left;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  font-family: inherit;
}

.btn-login {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, var(--burundi-red, #ce1126), #ff5252);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(206, 17, 38, 0.2);
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(206, 17, 38, 0.4);
}

.btn-login::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -60%;
  width: 20%;
  height: 200%;
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(30deg);
  pointer-events: none;
}

.btn-login:hover:not(:disabled)::after {
  left: 120%;
  transition: all 0.6s ease;
}

.error-msg {
  color: #d32f2f;
  background: #ffebee;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  font-size: 0.85rem;
}

.back-link {
  display: inline-block;
  margin-top: 25px;
  color: #888;
  font-size: 0.9rem;
  text-decoration: none;
}

.back-link:hover {
  color: #333;
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
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
