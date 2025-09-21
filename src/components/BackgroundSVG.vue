<template>
  <div class="background-svg">
    <img v-for="(item, index) in items" 
         :key="index"
         :src="item.src"
         :style="{ top: item.top + 'px', left: item.left + 'px', width: item.size + 'px', height: item.size + 'px', position: 'absolute' }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const svgIcons = [
  '/src/assets/background/heart.svg',
  '/src/assets/background/star.svg',
  '/src/assets/background/cloud.svg',
  '/src/assets/background/moon.svg',
  '/src/assets/background/cup.svg',
  '/src/assets/background/flower.svg',
]

const items = ref([])

// Функция для проверки пересечения двух прямоугольников
const isOverlap = (a, b) => {
  return !(a.left + a.size < b.left || 
           a.left > b.left + b.size ||
           a.top + a.size < b.top || 
           a.top > b.top + b.size)
}

// Функция генерации случайных элементов без пересечений
const generateItems = () => {
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  const newItems = []

  const maxAttempts = 200 // максимальное количество попыток для поиска места

  for (let i = 0; i < 100; i++) {
    let attempts = 0
    let size = 40 + Math.random() * 60
    let top, left
    let overlap = true

    while (overlap && attempts < maxAttempts) {
      top = Math.random() * (windowHeight - size)
      left = Math.random() * (windowWidth - size)
      overlap = newItems.some(item => isOverlap({ top, left, size }, item))
      attempts++
    }

    if (attempts < maxAttempts) {
      newItems.push({
        src: svgIcons[Math.floor(Math.random() * svgIcons.length)],
        top,
        left,
        size
      })
    }
  }

  items.value = newItems
}

onMounted(() => {
  generateItems()
  window.addEventListener('resize', generateItems)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', generateItems)
})
</script>

<style scoped>
.background-svg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #FFFDF9;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}
</style>
