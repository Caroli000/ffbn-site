<template>
  <div class="admin-chat-container">
    <div class="chat-sidebar">
      <div class="sidebar-header">
        <h2>Conversations</h2>
        <button @click="fetchChats" class="refresh-btn">🔄</button>
      </div>
      <div class="chat-list">
        <div 
          v-for="chat in chats" 
          :key="chat._id" 
          :class="['chat-item', { active: selectedChat?._id === chat._id }]"
          @click="selectChat(chat)"
        >
          <div class="chat-item-info">
            <span class="session-id">{{ chat.sessionId }}</span>
            <span :class="['status-badge', chat.status]">{{ chat.status }}</span>
          </div>
          <div class="last-msg">{{ chat.messages[chat.messages.length - 1]?.text || 'Pas de message' }}</div>
        </div>
      </div>
    </div>

    <div class="chat-main">
      <div v-if="selectedChat" class="chat-view">
        <div class="view-header">
          <h3>Chat: {{ selectedChat.sessionId }}</h3>
        </div>
        <div class="messages-container" ref="msgContainer">
          <div v-for="(msg, idx) in selectedChat.messages" :key="idx" :class="['msg', msg.sender]">
            <div class="msg-bubble">
              {{ msg.text }}
            </div>
            <div class="msg-meta">{{ msg.sender }} - {{ formatTime(msg.timestamp) }}</div>
          </div>
        </div>
        <form class="reply-form" @submit.prevent="sendReply">
          <input v-model="replyText" type="text" placeholder="Répondre au client...">
          <button type="submit" :disabled="!replyText.trim()">Envoyer</button>
        </form>
      </div>
      <div v-else class="no-selection">
        Sélectionnez une conversation pour commencer
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'

const chats = ref([])
const selectedChat = ref(null)
const replyText = ref('')
const msgContainer = ref(null)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

onMounted(() => {
  fetchChats()
})

const fetchChats = async () => {
  try {
    const res = await axios.get(`${API_URL}/chat/admin/list`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
    })
    if (res.data.success) {
      chats.value = res.data.chats
    }
  } catch (err) {
    console.error('Error fetching chats', err)
  }
}

const selectChat = (chat) => {
  selectedChat.value = chat
  scrollToBottom()
}

const sendReply = async () => {
  if (!replyText.value.trim() || !selectedChat.value) return

  try {
    const res = await axios.post(`${API_URL}/chat/admin/reply`, {
      sessionId: selectedChat.value.sessionId,
      text: replyText.value
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
    })

    if (res.data.success) {
      selectedChat.value.messages.push({
        sender: 'admin',
        text: replyText.value,
        timestamp: new Date()
      })
      replyText.value = ''
      scrollToBottom()
    }
  } catch (err) {
    console.error('Error sending reply', err)
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (msgContainer.value) {
      msgContainer.value.scrollTop = msgContainer.value.scrollHeight
    }
  })
}

const formatTime = (ts) => {
  return new Date(ts).toLocaleTimeString()
}
</script>

<style scoped>
.admin-chat-container {
  display: flex;
  height: calc(100vh - 80px);
  background: #f4f7f6;
  font-family: 'Outfit', sans-serif;
}

.chat-sidebar {
  width: 300px;
  background: white;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-list {
  flex: 1;
  overflow-y: auto;
}

.chat-item {
  padding: 15px;
  border-bottom: 1px solid #f9f9f9;
  cursor: pointer;
  transition: background 0.2s;
}

.chat-item:hover {
  background: #f0f4f8;
}

.chat-item.active {
  background: #e1e8ed;
  border-left: 4px solid var(--burundi-red, #ce1126);
}

.chat-item-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.session-id {
  font-weight: 700;
  font-size: 0.85rem;
}

.status-badge {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  text-transform: uppercase;
}

.status-badge.active { background: #e3fcef; color: #006644; }
.status-badge.waiting_for_admin { background: #fff0b3; color: #856404; }

.last-msg {
  font-size: 0.8rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-view {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.view-header {
  padding: 20px;
  background: white;
  border-bottom: 1px solid #ddd;
}

.messages-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #f0f2f5;
}

.msg {
  max-width: 70%;
  display: flex;
  flex-direction: column;
}

.msg.user { align-self: flex-start; }
.msg.admin { align-self: flex-end; }
.msg.bot { align-self: flex-start; opacity: 0.8; }

.msg-bubble {
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 0.95rem;
}

.user .msg-bubble { background: white; color: #333; }
.admin .msg-bubble { background: #ce1126; color: white; }
.bot .msg-bubble { background: #ddd; color: #555; }

.msg-meta {
  font-size: 0.7rem;
  color: #888;
  margin-top: 5px;
}

.admin .msg-meta { text-align: right; }

.reply-form {
  padding: 20px;
  background: white;
  display: flex;
  gap: 10px;
}

.reply-form input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

.reply-form button {
  padding: 0 25px;
  background: #ce1126;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.no-selection {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1.2rem;
}
</style>
