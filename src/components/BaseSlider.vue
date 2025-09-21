<template>
  <div class="slider-container">
    <input
      type="range"
      v-model="internalValue"
      :min="min"
      :max="max"
      :step="step"
      class="custom-slider"
      @input="updateTrack"
      ref="slider"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'

const props = defineProps({
  modelValue: Number,
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 }
})

const emit = defineEmits(['update:modelValue'])
const internalValue = ref(props.modelValue ?? props.min)
const slider = ref(null)

const updateTrack = () => {
  const percent = ((internalValue.value - props.min) / (props.max - props.min)) * 100
  slider.value.style.background = `linear-gradient(to right, #A7E6C4 0%, #A7E6C4 ${percent}%, #FADADD ${percent}%, #FADADD 100%)`
  emit('update:modelValue', internalValue.value)
}

onMounted(() => updateTrack())
</script>

<style scoped>
.slider-container {
  width: 300px;
  margin: 8px 0;
}

.custom-slider {
  appearance: none; /* Убираем стандартный стиль */
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #FADADD;
  outline: none;
  padding: 0;
  margin: 0;
}

/* Ползунок */
.custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 3px solid #FFD6B3;
  cursor: pointer;
  margin-top: 0px;
}

.custom-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 2px solid #FFD6B3;
  cursor: pointer;
}
</style>
