<template>
  <div id="gen-numb" class="module-wrapper">
    <h2 class="module-title">Генератор телефонов</h2>

    <div class="module-content">
      <!-- Левая колонка -->
      <div class="module-left">

        <!-- Слайдер -->
        <div class="slider-wrapper">
          <label>Длина номера: {{ phoneLength }}</label>
          <BaseSlider v-model="phoneLength" :min="5" :max="20" />
        </div>

        <!-- Аккордеоны -->
        <div
          v-for="(group, gIndex) in groups"
          :key="gIndex"
          class="group-wrapper"
        >
          <div class="group-header" @click="group.open = !group.open">
            <span>{{ group.name }}</span>
            <img
              src="/src/assets/arrow.svg"
              alt="arrow"
              class="arrow"
              :class="{ open: group.open }"
            />
          </div>

          <div v-show="group.open" class="group-content">
            <label
              v-for="(item, iIndex) in group.items"
              :key="iIndex"
              class="checkbox-label"
            >
              <BaseCheckbox v-model="item.checked" />
              <span>{{ item.label }}</span>
            </label>
          </div>
        </div>

        <!-- Кнопки -->
        <div class="buttons-wrapper">
          <BaseButton @click="selectAll">Выбрать всё</BaseButton>
          <BaseButton @click="clearAll">Очистить выбор</BaseButton>
          <BaseButton @click="generatePhones">Сгенерировать данные</BaseButton>
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
const phoneLength = ref(11);

// --- Вывод ---
const outputText = ref("");

// --- Аккордеоны и чекбоксы ---
const groups = reactive([
  {
    name: "Национальные форматы (РФ)",
    open: true,
    items: [
      { label: "+7 999 999-99-99", checked: false, type: "ruFormat1" },
      { label: "8 (999) 999-99-99", checked: false, type: "ruFormat2" },
      { label: "89999999999", checked: false, type: "ruFormat3" },
      { label: "999-999-99-99", checked: false, type: "ruFormat4" },
    ],
  },
  {
    name: "Интернациональные форматы",
    open: false,
    items: [
      { label: "+1 555-555-5555 (США)", checked: false, type: "us" },
      { label: "+44 20 7946 0958 (Великобритания)", checked: false, type: "uk" },
      { label: "+81 90 1234 5678 (Япония)", checked: false, type: "jp" },
      { label: "+49 30 1234567 (Германия)", checked: false, type: "de" },
    ],
  },
  {
    name: "Негативные сценарии",
    open: false,
    items: [
      { label: "Пустое поле", checked: false, type: "empty" },
      { label: "Буквы вместо цифр", checked: false, type: "letters" },
      { label: "Спецсимволы вместо цифр", checked: false, type: "specialChars" },
      { label: "Пробелы в начале", checked: false, type: "spaceStart" },
      { label: "Пробелы в конце", checked: false, type: "spaceEnd" },
      { label: "Двойные пробелы", checked: false, type: "doubleSpaces" },
      { label: "Цифры + буквы", checked: false, type: "digitsLetters" },
      { label: "Цифры + спецсимволы", checked: false, type: "digitsSpecial" },
      { label: "Цифры + буквы + спецсимволы", checked: false, type: "mixed" },
      { label: "Смайлы", checked: false, type: "emoji" },
    ],
  },
  {
    name: "Особые сценарии",
    open: false,
    items: [
      { label: "Без кода страны", checked: false, type: "noCountryCode" },
      { label: "С 0 в начале", checked: false, type: "leadingZero" },
      { label: "С разделителями через точки", checked: false, type: "dots" },
    ],
  },
]);

// --- Управление выбором ---
function selectAll() {
  groups.forEach((group) =>
    group.items.forEach((item) => (item.checked = true))
  );
}

function clearAll() {
  groups.forEach((group) =>
    group.items.forEach((item) => (item.checked = false))
  );
}

// --- Генерация телефона по типу ---
function buildPhone(type) {
  switch (type) {
    // РФ
    case "ruFormat1":
      return faker.helpers.replaceSymbols("+7 ### ###-##-##");
    case "ruFormat2":
      return faker.helpers.replaceSymbols("8 (###) ###-##-##");
    case "ruFormat3":
      return faker.helpers.replaceSymbols("8##########");
    case "ruFormat4":
      return faker.helpers.replaceSymbols("###-###-##-##");

    // Интернациональные
    case "us":
      return faker.helpers.replaceSymbols("+1 ###-###-####");
    case "uk":
      return faker.helpers.replaceSymbols("+44 20 #### ####");
    case "jp":
      return faker.helpers.replaceSymbols("+81 90 #### ####");
    case "de":
      return faker.helpers.replaceSymbols("+49 30 #######");

    // Негативные сценарии
    case "empty":
      return "";
    case "letters":
      return "A".repeat(phoneLength.value);
    case "specialChars":
      return "@#$%^&*()_+".repeat(phoneLength.value).slice(0, phoneLength.value);
    case "spaceStart":
      return " " + faker.helpers.replaceSymbols("#".repeat(phoneLength.value));
    case "spaceEnd":
      return faker.helpers.replaceSymbols("#".repeat(phoneLength.value)) + " ";
    case "doubleSpaces":
      return faker.helpers.replaceSymbols("###  ###  ####");
    case "digitsLetters":
      return "123abc456".repeat(phoneLength.value).slice(0, phoneLength.value);
    case "digitsSpecial":
      return "123@#456".repeat(phoneLength.value).slice(0, phoneLength.value);
    case "mixed":
      return "12a@😊34".repeat(phoneLength.value).slice(0, phoneLength.value);
    case "emoji":
      return faker.helpers.replaceSymbols("#".repeat(phoneLength.value)) + "😊";

    // Особые сценарии
    case "noCountryCode":
      return faker.helpers.replaceSymbols("#".repeat(phoneLength.value));
    case "leadingZero":
      return "0" + faker.helpers.replaceSymbols("#".repeat(phoneLength.value - 1));
    case "dots":
      return faker.helpers.replaceSymbols("###.###.####");

    default:
      return faker.helpers.replaceSymbols("#".repeat(phoneLength.value));
  }
}

// --- Генерация выбранных номеров (1 на чекбокс) ---
function generatePhones() {
  const phones = [];
  groups.forEach((group) => {
    group.items.forEach((item) => {
      if (item.checked) {
        phones.push(`${item.label}: ${buildPhone(item.type)}`);
      }
    });
  });
  outputText.value = phones.join("\n");
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
  font-family: var(--font-subheader);
  font-size: var(--subheader-size);
  font-weight: 600;
  line-height: var(--subheader-line-height);
  text-align: left;
  color: var(--text-color);
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

.arrow {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

.arrow.open {
  transform: rotate(180deg);
}

.group-content {
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