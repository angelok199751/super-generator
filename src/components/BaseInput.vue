<template>
  <input
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="BaseInput"
    maxlength="100"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: ''
  }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200,300,400;600;700&display=swap');


.BaseInput {
  width: 280px;
  height: 40px;
  box-sizing: border-box;
  border: 4px solid rgba(250, 218, 221, 1);
  border-radius: 30px;
  background: rgba(255, 255, 255, 1);
  padding: 0 12px;

  font-family: 'Poppins', sans-serif; /* текст */
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  color: rgba(68, 65, 61, 1);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Плейсхолдер */
.BaseInput::placeholder {
  color: rgba(68, 65, 61, 0.5);
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 200;  /* тонкий текст */
  line-height: 27px;
  letter-spacing: 0px;
  text-align: left;

  /* Чтобы убедиться, что стиль применяется */
  opacity: 5; /* иногда браузеры уменьшают opacity по умолчанию */
}

/* Для кроссбраузерности */
.BaseInput::-webkit-input-placeholder { /* Chrome, Safari, Opera */
  font-weight: 200;
}
.BaseInput::-moz-placeholder { /* Firefox 19+ */
  font-weight: 200;
}
.BaseInput:-ms-input-placeholder { /* IE 10+ */
  font-weight: 200;
}
.BaseInput:-moz-placeholder { /* Firefox 18- */
  font-weight: 200;
}

.BaseInput:focus {
  outline: none; /* убирает рамку при фокусе */
  border-color: rgba(250, 218, 221, 1); /* оставляем цвет бордера неизменным */
}
</style>
