<template>
  <label class="checkbox-container">
    <input type="checkbox" v-model="internalValue" />
    <span class="checkmark"></span>
    <span class="checkbox-text"><slot /></span>
  </label>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])
const internalValue = ref(props.modelValue)

watch(() => props.modelValue, val => internalValue.value = val)
watch(internalValue, val => emit('update:modelValue', val))
</script>

<style scoped>
.checkbox-container {
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;
}

/* Скрываем стандартный чекбокс */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

/* Квадрат */
.checkmark {
  position: relative;
  height: 25px;
  width: 25px;
  background-color: #E6E6FA;
  border: 2px solid rgba(143, 143, 204, 1);
  border-radius: 2px;
}

/* Галочка */
.checkmark::after {
  content: "";
  position: absolute;
  top: 40%;
  left: 50%;
  width: 8px;
  height: 14px;
  border: solid rgba(143, 143, 204, 1);
  border-width: 0 3px 3px 0;
  transform: translate(-50%, -50%) rotate(45deg);
  display: none;
}

.checkbox-container input:checked ~ .checkmark::after {
  display: block;
}

/* Текст рядом с галочкой */
.checkbox-text {
  margin-left: 8px;
  color: rgba(68, 65, 61, 1);
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
}
</style>
