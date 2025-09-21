<template>
  <div id="decision-matrix" class="module-wrapper">
    <!-- Заголовок модуля -->
    <h2 class="module-title">Матрица решений</h2>

    <div class="module-content">
      <!-- Левая колонка: инпуты и кнопки -->
      <div class="module-left">
        <p class="description">
          Добавьте параметры для матрицы. В каждом поле можно указать несколько вариантов через запятую.
        </p>

        <div class="buttons-row">
          <BaseTooltip text="Добавить параметр">
            <BaseButton @click="addParam" size="icon" variant="outline" class="icon-btn">+</BaseButton>
          </BaseTooltip>

          <BaseTooltip text="Удалить параметр">
            <BaseButton @click="removeParam" size="icon" variant="outline" class="icon-btn">–</BaseButton>
          </BaseTooltip>
        </div>

        <div class="inputs-column">
          <BaseInput
            v-for="(param, idx) in params"
            :key="idx"
            v-model="params[idx]"
            placeholder="Прим. Виндовс, Linux и т.д."
          />
        </div>

        <div class="matrix-btn-wrapper">
          <BaseButton @click="generateMatrix" class="generate-btn">
          Сгенерировать матрицу
        </BaseButton>
      </div>
        
      </div>

      <!-- Правая колонка: окно вывода -->
      <div class="module-right">
        <InfoWindow :text="matrixOutput">
        </InfoWindow>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseTooltip from '../components/BaseTooltip.vue';
import InfoWindow from '../components/InfoWindow.vue';

const params = ref([""]); 
const matrixOutput = ref("");

const addParam = () => params.value.push("");
const removeParam = () => { if (params.value.length > 1) params.value.pop(); };

function cartesianProduct(arr) {
  if (arr.length === 0) return [];
  return arr.reduce(
    (a, b) => a.flatMap(x => b.map(y => [...x, y])),
    [[]]
  );
}

const generateMatrix = () => {
  const values = params.value
    .map(p => p.split(",").map(v => v.trim()).filter(Boolean))
    .filter(arr => arr.length > 0);

  if (values.length === 0) {
    matrixOutput.value = "Заполните хотя бы один параметр";
    return;
  }

  const combos = cartesianProduct(values);
  matrixOutput.value = combos.map(c => c.join(" | ")).join("\n");
};

const downloadMatrix = () => {
  const blob = new Blob([matrixOutput.value || ""], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "matrix.txt";
  a.click();
  URL.revokeObjectURL(url);
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

.description {
  font-family: var(--font-subheader);
  font-size: var(--subheader-size);
  font-weight: 600;
  line-height: var(--subheader-line-height);
  text-align: left;
  color: var(--text-color);
}

/* Новый контейнер для двух колонок */
.module-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

/* Левая колонка */
.module-left{
 flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Правая колонка */
.module-right {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

/* Внутренние стили */
.icon-btn {
  font-size: 30px;       /* размер символа */
  padding: 12px 16px;    /* размер кнопки */
  min-width: 48px;       /* минимальная ширина */
  min-height: 48px; 
}

.buttons-row {
  display: flex;
  gap: 10px;

}

.inputs-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.matrix-btn-wrapper {
  width: fit-content;
}
</style>
