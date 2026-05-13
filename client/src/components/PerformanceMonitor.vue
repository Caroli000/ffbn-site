<template>
  <div v-if="showMetrics" class="perf-monitor">
    <div class="perf-header">
      <span class="perf-title">Performance</span>
      <button @click="toggleMonitor" class="perf-close">×</button>
    </div>
    <div class="perf-body">
      <div class="perf-item">
        <span>FPS</span>
        <span :class="fpsBadge">{{ currentFPS }}</span>
      </div>
      <div class="perf-item">
        <span>Frame Time</span>
        <span :class="frameTimeBadge">{{ frameTime.toFixed(2) }}ms</span>
      </div>
      <div class="perf-item">
        <span>Memory</span>
        <span>{{ memory }}MB</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showMetrics = ref(false)
const currentFPS = ref(60)
const frameTime = ref(0)
const memory = ref(0)

let lastTime = performance.now()
let frameCount = 0
let fpsInterval = null
let animationFrameId = null

const fpsBadge = ref('good')
const frameTimeBadge = ref('good')

const measureFrame = () => {
  const now = performance.now()
  frameTime.value = now - lastTime
  lastTime = now
  frameCount++

  if (frameCount >= 1) {
    currentFPS.value = frameCount

    if (frameCount >= 55) {
      fpsBadge.value = 'good'
    } else if (frameCount >= 45) {
      fpsBadge.value = 'ok'
    } else {
      fpsBadge.value = 'bad'
    }

    if (frameTime.value < 16.67) {
      frameTimeBadge.value = 'good'
    } else if (frameTime.value < 33) {
      frameTimeBadge.value = 'ok'
    } else {
      frameTimeBadge.value = 'bad'
    }

    frameCount = 0
  }

  if (performance.memory) {
    memory.value = Math.round(performance.memory.usedJSHeapSize / 1048576)
  }

  animationFrameId = requestAnimationFrame(measureFrame)
}

const toggleMonitor = () => {
  showMetrics.value = !showMetrics.value
}

onMounted(() => {

  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
      toggleMonitor()
    }
  }
  
  window.addEventListener('keydown', handleKeyPress)
  animationFrameId = requestAnimationFrame(measureFrame)

  return () => {
    window.removeEventListener('keydown', handleKeyPress)
  }
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<style scoped>
.perf-monitor {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  border-radius: 8px;
  padding: 12px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  z-index: 9999;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  min-width: 160px;
}

.perf-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.perf-title {
  font-weight: bold;
  color: #4ade80;
}

.perf-close {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  line-height: 1;
}

.perf-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.perf-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.good {
  color: #4ade80;
  font-weight: bold;
}

.ok {
  color: #fbbf24;
  font-weight: bold;
}

.bad {
  color: #ef4444;
  font-weight: bold;
}
</style>
