<template>
  <div class="cat-widget" @mouseenter="onHover" @mouseleave="onLeave">
    <img :src="currentFrame" alt="котик" class="cat-img" />
    <transition name="fade">
      <div v-if="showTooltip" class="cat-tooltip">
        {{ tooltipText }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const frames = {
  idle: [
    '../assets/cat/cat-front.svg',
    '../assets/cat/cat-eyes-half.svg',
    '../assets/cat/cat-eyes-3q.svg',
    '../assets/cat/cat-eyes-closed.svg',
    '../assets/cat/cat-bread.svg'
  ],
  whiskers: [
    '/src/assets/cat/cat-whiskers-left.svg',
    '/src/assets/cat/cat-whiskers-right.svg',
    '/src/assets/cat/cat-front.svg',
    '/src/assets/cat/cat-eyes-closed.svg'
  ],
  random: [
    '/src/assets/cat/cat-look-left.svg',
    '/src/assets/cat/cat-look-down.svg',
    '/src/assets/cat/cat-look-up.svg'
  ],
  talk: '/src/assets/cat/cat-talk.svg'
}

const currentFrame = ref(frames.idle[0])
const tooltipText = ref('')
const showTooltip = ref(false)
const purrAudio = new Audio('/src/assets/cat/purr.mp3')
purrAudio.volume = 0.2

// состояния булки
let isLoaf = false
let loafStartTime = null
let loafTimer = null

const phrases = [
  'Ты справишься! 😺',
  'Отличная работа!',
  'Не сдавайся 💪',
  'Я с тобой 🐾',
  'Вперёд к успеху!',
  'Ты молодец! 🎉',
  'Отдохни и сделай перерыв ☕'
]

onMounted(() => {
  setInterval(() => {
    if (isLoaf) return // не мешаем, если он уже булка

    if (Math.random() < 0.5) {
      playIdleAnimation()
    } else if (Math.random() < 0.3) {
      currentFrame.value = pickRandom(frames.whiskers)
      stopPurring()
    } else if (Math.random() < 0.2) {
      currentFrame.value = pickRandom(frames.random)
      stopPurring()
    } else if (Math.random() < 0.1) {
      currentFrame.value = frames.talk
      tooltipText.value = pickRandom(phrases)
      showTooltip.value = true
      setTimeout(() => (showTooltip.value = false), 3000)
      stopPurring()
    }
  }, 3000)
})

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function playIdleAnimation() {
  let i = 0
  const seq = frames.idle
  const interval = setInterval(() => {
    if (isLoaf) {
      clearInterval(interval)
      return
    }

    currentFrame.value = seq[i]

    if (seq[i].includes('bread')) {
      clearInterval(interval)
      enterLoaf()
    }

    i++
    if (i >= seq.length) clearInterval(interval)
  }, 700)
}

function enterLoaf() {
  if (isLoaf) return
  isLoaf = true
  loafStartTime = Date.now()
  currentFrame.value = '/src/assets/cat/cat-bread.svg'
  startPurring()

  const stayTime = 10000 + Math.random() * 5000
  loafTimer = setTimeout(exitLoaf, stayTime)
}

function exitLoaf() {
  if (!isLoaf) return
  const elapsed = Date.now() - loafStartTime
  if (elapsed < 10000) {
    // ещё не прошло 10 секунд → ждём остаток
    loafTimer = setTimeout(exitLoaf, 10000 - elapsed)
    return
  }
  isLoaf = false
  loafStartTime = null
  clearTimeout(loafTimer)
  loafTimer = null
  stopPurring()
  currentFrame.value = frames.idle[0]
}

function startPurring() {
  purrAudio.currentTime = 0
  purrAudio.play()
}

function stopPurring() {
  if (!purrAudio.paused) {
    purrAudio.pause()
    purrAudio.currentTime = 0
  }
}

function onHover() {
  enterLoaf()
}

function onLeave() {
  // на leave не сбрасываем сразу
  // кот обязан просидеть минимум 10 секунд
  exitLoaf()
}
</script>


<style scoped>
.cat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 2000;
  display: flex;
  flex-direction: column-reverse; /* тултип теперь сверху */
  align-items: center;
}

.cat-img {
  width: 120px;
  height: auto;
  pointer-events: auto;
}
.cat-tooltip {
  margin-bottom: 8px; /* расстояние от кота до тултипа */
  padding: 8px 12px;
  background: #fffdf9;
  border: 2px solid #fadadd;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  max-width: 200px;
  text-align: center;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
