<template>
  <img 
    class="copy-image-button" 
    src="/src/assets/copyBtn.svg" 
    alt="Copy" 
    @click="copyText"
  />
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  text: { type: String, required: true } // текст для копирования
})

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(props.text)
    alert('Текст скопирован!')
  } catch (err) {
    console.error('Ошибка при копировании:', err)
  }
}
</script>

<style scoped>
.copy-image-button {
  width: 40px;      /* подстрой под дизайн */
  height: 40px;
  cursor: pointer;
  transition: transform 0.2s;
}

.copy-image-button:hover {
  transform: scale(1.1);
}
</style>
