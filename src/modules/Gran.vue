<template>
  <div id="gran" class="module-wrapper">
    <h2 class="module-title">Граничные значения и классы эквивалентности</h2>

    <div class="module-content">
      <!-- Левая колонка -->
      <div class="module-left">
        <p class="description">
          Введите минимальное и максимальное значение. Выберите, что нужно сгенерировать.
        </p>

        <BaseInput v-model.number="minValue" placeholder="Минимальное значение" />
        <BaseInput v-model.number="maxValue" placeholder="Максимальное значение" />

        <div class="module-checkboxes">
          <label class="checkbox-label">
            <BaseCheckbox v-model="includeBoundaries" />
            <span>Граничные значения</span>
          </label>

          <label class="checkbox-label">
            <BaseCheckbox v-model="includeEquivalence" />
            <span>Классы эквивалентности</span>
          </label>
        </div>

        <BaseButton @click="generateValues" class="buttons-wrapper">Сгенерировать данные</BaseButton>
      </div>

      <!-- Правая колонка -->
      <div class="module-right">
        <InfoWindow :text="output">
        </InfoWindow>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "../components/BaseButton.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseCheckbox from "../components/BaseCheckbox.vue";
import InfoWindow from "../components/InfoWindow.vue";
import CopyButton from "../components/CopyButton.vue";

const minValue = ref("");
const maxValue = ref("");
const includeBoundaries = ref(true);
const includeEquivalence = ref(true);
const output = ref("");

const generateValues = () => {
  const min = Number(minValue.value);
  const max = Number(maxValue.value);

  if (isNaN(min) || isNaN(max) || min >= max) {
    output.value = "Введите корректные минимальное и максимальное значения";
    return;
  }

  const results = [];

  if (includeBoundaries.value) {
    results.push(`Граница: ${min - 1}`);
    results.push(`Граница: ${min}`);
    results.push(`Граница: ${max}`);
    results.push(`Граница: ${max + 1}`);
  }

  if (includeEquivalence.value) {
    const mid = Math.floor((min + max) / 2);
    results.push(`Класс эквивалентности: меньше ${min}`);
    results.push(`Класс эквивалентности: от ${min} до ${max} (например: ${mid})`);
    results.push(`Класс эквивалентности: больше ${max}`);
  }

  output.value = results.join("\n");
};

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

.module-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.module-title {
  font-family: var(--font-header);
  font-size: var(--header-size);
  font-weight: 600;
  line-height: var(--header-line-height);
  text-align: left;
}

.module-left {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.module-right {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.description {
  font-family: var(--font-subheader);
  font-size: var(--subheader-size);
  font-weight: 600;
  line-height: var(--subheader-line-height);
  text-align: left;
  color: var(--text-color);
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

.module-checkboxes {
  display: flex;
  flex-direction: column;
  gap: 4px; /* расстояние между label-ами */
  margin: 8px 0;
}

.buttons-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: fit-content;
}

</style>
