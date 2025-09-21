<template>
  <div class="output-window">
    <!-- кнопки -->
    <div class="output-actions">
      <SaveButton :text="text" />
      <CopyButton :text="text" />
    </div>

    <!-- текст -->
    <div class="output-text">{{ text }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import CopyButton from './CopyButton.vue'
import SaveButton from './SaveButton.vue'

const props = defineProps({
  text: { type: String, default: 'Здесь будет текст...' }
})
</script>

<style scoped>
.output-window {
  width: 100%;
  min-width: 280px;
  max-width: 860px;
  height: 260px;
  min-height: 100px;
  box-sizing: border-box;
  border: 3px solid rgba(245, 185, 142, 1);
  border-radius: 20px;
  background: rgba(255, 214, 179, 1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-wrap: break-word;
  overflow-y: auto;
  position: relative; /* для позиционирования кнопок */
  white-space: pre-wrap;
    scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;
}

.output-actions {
  position: sticky; /* фиксируем кнопки при скролле */
  top: 0px; /* отступ сверху */
  right: 0px; /* отступ справа */
  display: flex;
  gap: 8px;
  align-self: flex-end; /* выравниваем вправо */
  z-index: 10;
}

.output-text {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  color: #44413D;
  letter-spacing: 0px;
  text-align: left;
  margin-top: 40px; /* отступ чтобы текст не перекрывался кнопками */
}
</style>
