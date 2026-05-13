<template>
  <div class="chat-widget" :class="{ 'is-open': isOpen, 'is-scrolled': isScrolled }">
    
    <div v-if="!isOpen && showWelcome" class="welcome-bubble">
      <button class="close-welcome" @click.stop="showWelcome = false">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="avatar-badge">
        <img :src="chatLogo" alt="Chat">
      </div>
      <div class="welcome-text">
        <p>Besoin d'aide ? Nous pouvons vous aider, posez votre question.</p>
      </div>
    </div>

<button class="chat-toggle" @click="toggleChat" :aria-label="isOpen ? 'Fermer le chat' : 'Ouvrir le chat'">
      <div v-if="!isOpen" class="chat-icon-container">
        <img :src="chatLogo" alt="Chat" class="logo-toggle">
      </div>
      <div v-else class="close-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </button>

<div v-if="isOpen" class="chat-window">
      <div class="chat-header">
        <div class="header-info">
              <div class="bot-avatar">
                <img :src="chatLogo" alt="Chat FFBN">
              </div>
              <div class="header-text">
                <h3>Chat FFBN</h3>
                <span class="online-status">En ligne</span>
              </div>
        </div>
        <button class="header-close" @click="toggleChat" aria-label="Fermer">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="chat-messages" ref="messageContainer">
        <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.sender]">
          <div class="message-content">
            {{ msg.text }}
          </div>
          <div class="message-time">{{ formatTime(msg.timestamp) }}</div>
        </div>
        <div v-if="isTyping" class="message bot typing">
          <div class="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>

      <form class="chat-input" @submit.prevent="sendMessage">
        <input 
          v-model="newMessage" 
          type="text" 
          placeholder="Posez votre question..." 
          :disabled="isTyping"
        >
        <button type="submit" :disabled="!newMessage.trim() || isTyping">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import axios from 'axios'
import logo from '../assets/images/logo.png'
import chatLogo from '../assets/images/chatbot_head_only.png'

const isOpen = ref(false)
const showWelcome = ref(true)
const messages = ref([])
const newMessage = ref('')
const isTyping = ref(false)
const messageContainer = ref(null)
const sessionId = ref(localStorage.getItem('chat_sessionId') || `sess_${Math.random().toString(36).substr(2, 9)}`)

// Détermine l'URL de base de l'API — fonctionne en local ET sur PlanetHoster
const getBaseURL = () => {
  if (import.meta.env.DEV) return 'http://localhost:3000'
  return window.location.origin
}

const API_URL = `${getBaseURL()}/api`

const isScrolled = ref(false)
let typingTimeout = null

onMounted(() => {
  localStorage.setItem('chat_sessionId', sessionId.value)
  fetchHistory()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (typingTimeout) clearTimeout(typingTimeout)
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const fetchHistory = async () => {
  try {
    const res = await axios.get(`${API_URL}/chat/history/${sessionId.value}`)
    if (res.data.success) {
      messages.value = res.data.chat.messages || []
      scrollToBottom()
    }
  } catch (err) {
    // Silencieux — le chat fonctionne même sans historique
    console.warn('[Chat] Historique non disponible:', err.message)
  }
}

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    scrollToBottom()
  }
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || isTyping.value) return

  const text = newMessage.value.trim()
  messages.value.push({ sender: 'user', text, timestamp: new Date() })
  newMessage.value = ''
  scrollToBottom()
  isTyping.value = true

  // Sécurité : reset automatique après 15 secondes si jamais l'API ne répond pas
  typingTimeout = setTimeout(() => {
    if (isTyping.value) {
      isTyping.value = false
      messages.value.push({ sender: 'bot', text: "La connexion prend trop de temps. Veuillez réessayer.", timestamp: new Date() })
    }
  }, 15000)

  try {
    const res = await axios.post(`${API_URL}/chat/message`, {
      sessionId: sessionId.value,
      text
    }, { timeout: 12000 })

    clearTimeout(typingTimeout)

    if (res.data?.response) {
      const alreadyAdded = messages.value.some(m => m.sender === 'bot' && m.text === res.data.response)
      if (!alreadyAdded) {
        messages.value.push({ sender: 'bot', text: res.data.response, timestamp: new Date() })
        scrollToBottom()
      }
    }
  } catch (err) {
    clearTimeout(typingTimeout)
    console.error('[Chat] Erreur:', err.response?.data || err.message)
    const errMsg = err.response?.status === 429
      ? "Vous avez envoyé trop de messages. Attendez un moment."
      : "Désolé, je ne peux pas répondre pour le moment. Réessayez dans quelques instants."
    messages.value.push({ sender: 'bot', text: errMsg, timestamp: new Date() })
  } finally {
    isTyping.value = false
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  })
}

const formatTime = (ts) => {
  const date = new Date(ts)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

watch(messages, () => {
  scrollToBottom()
}, { deep: true })
</script>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-family: 'Outfit', sans-serif;
  transition: all 0.4s ease;
}

.chat-widget.is-scrolled {
  opacity: 0.9;
}

.chat-toggle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #555;
  border: 1px solid rgba(255, 255, 255, 0.3); 
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.chat-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.welcome-bubble {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 320px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 24px 20px 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
  border: 1px solid rgba(255, 255, 255, 0.5);
  animation: popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 10;
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.9) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.avatar-badge {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  border: 1px solid #eee; 
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-badge img {
  width: 90%;
  height: 90%;
  object-fit: contain;
  border-radius: 50%;
  mix-blend-mode: multiply;
}

.welcome-text {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  color: #1a1a1b;
  font-size: 1.05rem;
  line-height: 1.5;
  font-weight: 500;
}

.welcome-text p {
  margin: 0;
}



.close-welcome {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

.close-welcome svg {
  width: 18px;
  height: 18px;
}

.chat-icon-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-toggle {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
  mix-blend-mode: multiply;
}

.close-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}

.close-icon svg {
  width: 24px;
  height: 24px;
}

.chat-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(0,0,0,0.05);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.chat-header {
  padding: 15px 20px;
  background: rgba(248, 249, 250, 0.8); 
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #1a1a1b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header-close {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 5px;
  display: flex;
  transition: color 0.2s;
}

.header-close:hover {
  color: #000;
}

.header-close svg {
  width: 20px;
  height: 20px;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bot-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  padding: 2px;
  overflow: hidden;
}

.bot-avatar img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
  mix-blend-mode: multiply;
}

.header-text h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
}

.online-status {
  font-size: 0.75rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 4px;
}

.online-status::before {
  content: '';
  width: 8px;
  height: 8px;
  background: #00ff00;
  border-radius: 50%;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #f8f9fa;
}

.message {
  max-width: 80%;
  display: flex;
  flex-direction: column;
}

.message.user {
  align-self: flex-end;
}

.message.bot, .message.admin {
  align-self: flex-start;
}

.message-content {
  padding: 12px 16px;
  border-radius: 15px;
  font-size: 0.9rem;
  line-height: 1.4;
}

.user .message-content {
  background: var(--burundi-red);
  color: white;
  border-bottom-right-radius: 2px;
}

.bot .message-content, .admin .message-content {
  background: white;
  color: #333;
  border-bottom-left-radius: 2px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.message-time {
  font-size: 0.7rem;
  color: #999;
  margin-top: 4px;
  padding: 0 4px;
}

.user .message-time {
  text-align: right;
}

.chat-input {
  padding: 15px;
  display: flex;
  gap: 10px;
  background: white;
  border-top: 1px solid #eee;
}

.chat-input input {
  flex: 1;
  border: none;
  background: #f1f3f5;
  padding: 10px 15px;
  border-radius: 10px;
  outline: none;
  font-size: 0.9rem;
}

.chat-input button {
  background: var(--burundi-red);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.chat-input button:hover:not(:disabled) {
  transform: scale(1.05);
}

.chat-input button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 5px 0;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  background: #999;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
}

@media (max-width: 480px) {
  .chat-window {
    width: calc(100vw - 40px);
    height: 400px;
    right: -10px;
  }
}
</style>
