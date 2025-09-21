<template>
  <div class="tooltip-wrapper" @mouseenter="show = true" @mouseleave="show = false">
    <slot /> <!-- элемент, к которому привязываем тултип -->
    <div v-if="show" class="tooltip-box">
      <span class="tooltip-text">{{ text }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: { type: String, required: true }
})

const show = ref(false)
</script>

<style scoped>
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

/* Тултип под элементом */
.tooltip-box {
  position: absolute;
  top: 100%; /* под элементом */
  left: 50%;
  transform: translateX(-50%);
  min-width: 50px;
  max-width: 250px;
  padding: 8px 12px;
  background-color: #E6E6FA;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s, transform 0.2s;
  white-space: pre-wrap;
}

/* Текст внутри тултипа */
.tooltip-text {
  color: #44413D;
  font-family: Nunito, sans-serif;
  font-size: 16px;
  font-weight: 600; /* SemiBold */
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
}

/* Появление тултипа */
.tooltip-wrapper:hover .tooltip-box {
  opacity: 1;
  transform: translateX(-50%) translateY(5px);
}
</style>
