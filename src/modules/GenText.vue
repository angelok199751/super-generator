<template>
  <div id="gen-text" class="module-wrapper">
    <h2 class="module-title">Генератор текста</h2>

    <div class="module-content">
      <!-- Левая колонка -->
      <div class="module-left">
        <div class="slider-wrapper">
          <label>Максимальная длина текста: {{ maxLength }}</label>
          <BaseSlider v-model="maxLength" :min="1" :max="1000" />
        </div>

        <p class="description">Состав текста:</p>

        <div class="checkboxes">
          <label class="checkbox-label">
            <BaseCheckbox v-model="options.latin" /> Латиница
          </label>
          <label class="checkbox-label">
            <BaseCheckbox v-model="options.cyrillic" /> Кириллица
          </label>
          <label class="checkbox-label">
            <BaseCheckbox v-model="options.special" /> Спецсимволы
          </label>
          <label class="checkbox-label">
            <BaseCheckbox v-model="options.digits" /> Цифры
          </label>
          <label class="checkbox-label">
            <BaseCheckbox v-model="options.emoji" /> Смайлики
          </label>
        </div>

        <div class="buttons-wrapper">
          <BaseButton @click="selectAll">Выбрать всё</BaseButton>
          <BaseButton @click="clearAll">Очистить выбор</BaseButton>
          <BaseButton @click="generateText">Сгенерировать текст</BaseButton>
        </div>
      </div>

      <!-- Правая колонка -->
      <div class="module-right">
        <InfoWindow :text="outputText" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { faker } from "@faker-js/faker";
import BaseButton from "../components/BaseButton.vue";
import BaseCheckbox from "../components/BaseCheckbox.vue";
import BaseSlider from "../components/BaseSlider.vue";
import InfoWindow from "../components/InfoWindow.vue";

// --- Слайдер ---
const maxLength = ref(200);

// --- Чекбоксы ---
const options = reactive({
  latin: false,
  cyrillic: false,
  special: false,
  digits: false,
  emoji: false
});

// --- Вывод ---
const outputText = ref("");

// --- Кнопки выбора ---
function selectAll() {
  options.latin = true;
  options.cyrillic = true;
  options.special = true;
  options.digits = true;
  options.emoji = true;
}

function clearAll() {
  options.latin = false;
  options.cyrillic = false;
  options.special = false;
  options.digits = false;
  options.emoji = false;
}

// --- Генерация текста ---
function generateText() {
  let pool = [];

  // Для осмысленного текста используем faker
  let textParts = [];

  // Если выбрана латиница
  if (options.latin) textParts.push(faker.lorem.words(Math.ceil(maxLength.value / 5)));
  
  // Если выбрана кириллица
  if (options.cyrillic) {
    const cyrWords = "пример тестовый текст данные слова символы генератор".split(" ");
    let words = [];
    for (let i = 0; i < Math.ceil(maxLength.value / 5); i++) {
      words.push(cyrWords[Math.floor(Math.random() * cyrWords.length)]);
    }
    textParts.push(words.join(" "));
  }

  // Объединяем текст
  let result = textParts.join(" ");

  // Теперь вставляем случайно спецсимволы, цифры, эмодзи
  let additional = [];
  if (options.special) additional.push(..."!@#$%^&*()_+-={}[]<>?,./".split(""));
  if (options.digits) additional.push(..."0123456789".split(""));
  if (options.emoji) additional.push(...["😀","😎","🎉","💡","🔥","🌟"]);

  // Случайно заменяем некоторые символы на выбранные дополнительные
  let finalText = "";
  for (let char of result) {
    finalText += char;
    if (additional.length && Math.random() < 0.05) { // ~5% вставок
      finalText += additional[Math.floor(Math.random() * additional.length)];
    }
    if (finalText.length >= maxLength.value) break;
  }

  outputText.value = finalText.slice(0, maxLength.value);
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

:root {
  --text-color: rgba(68, 65, 61, 1);
  --border-color: rgba(250, 218, 221, 1);

  --font-header: 'Poppins', sans-serif;
  --font-subheader: 'Nunito', sans-serif;
  --font-body: 'Nunito', sans-serif;
  --font-accordion: 'Poppins', sans-serif;

  --header-size: 24px;
  --header-line-height: 36px;

  --subheader-size: 18px;
  --subheader-line-height: 25px;

  --body-size: 16px;
  --body-line-height: 22px;

  --accordion-size: 18px;
  --accordion-line-height: 27px;
}
/* Модуль */
.module-wrapper {
  width: 100%;
  box-sizing: border-box;
  border: 4px solid var(--border-color);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: var(--font-body);
  color: var(--text-color);
}

.module-title {
  font-family: var(--font-header);
  font-size: var(--header-size);
  font-weight: 600;
  line-height: var(--header-line-height);
  text-align: left;
}

.module-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.module-left, .module-right {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.description{
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-accordion);
  font-size: var(--accordion-size);
  font-weight: 600;
  line-height: var(--accordion-line-height);
  color: var(--text-color);
  padding: 6px 0;
}

.slider-wrapper {
  font-family: var(--font-accordion);
  font-size: var(--accordion-size);
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 0px;
}

/* Аккордеоны */
.group-wrapper {
  display: flex;
  flex-direction: column;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-family: var(--font-accordion);
  font-size: var(--accordion-size);
  font-weight: 600;
  line-height: var(--accordion-line-height);
  color: var(--text-color);
  padding: 6px 0;
}

.checkboxes {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 16px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0px;
  font-size: var(--body-size);
  font-weight: 400;
  line-height: var(--body-line-height);
  color: var(--text-color);
}

/* Слайдер */
.slider-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Кнопки */
.buttons-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: fit-content;
}
</style>