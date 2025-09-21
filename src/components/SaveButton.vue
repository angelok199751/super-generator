<template>
  <img 
    class="save-image-button" 
    src="/src/assets/saveBtn.svg" 
    alt="Save" 
    @click="saveText"
  />
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  text: { type: String, required: true }, // текст для сохранения
  filename: { type: String, default: 'data.txt' } // имя файла
})

const saveText = () => {
  const blob = new Blob([props.text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = props.filename
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.save-image-button {
  width: 40px;      /* подстрой под дизайн */
  height: 40px;
  cursor: pointer;
  transition: transform 0.2s;
}

.save-image-button:hover {
  transform: scale(1.1);
}
</style>
