<template>
  <button
    class="BaseButton"
    type="button"
    v-bind="$attrs"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup>
const emit = defineEmits(['click'])
function onClick(e) {
  console.log('BaseButton clicked')
  emit('click', e)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');

.BaseButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;               /* фиксированная высота */
  padding: 0 20px;            /* 10px от текста до края */
  border-radius: 99px;        /* полностью закругленные края */
  background-color: #D8F3DC;  /* основной цвет кнопки */
  color: #44413D;             /* цвет текста */
  font-family: 'Nunito', sans-serif;
  font-weight: 600;           /* SemiBold */
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.BaseButton:hover {
  background-color: #A7E6C4;
}

.BaseButton:focus {
  outline: none; /* убирает рамку при фокусе */
}
</style>