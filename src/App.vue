<script setup>
import { ref } from 'vue'
import BackgroundSVG from './components/BackgroundSVG.vue'
import MyHeader from './components/Header.vue'
import DecisionMatrix from './modules/DecisionMatrix.vue'
import Gran from './modules/Gran.vue'
import GenFIO from './modules/GenFIO.vue'
import GenEmail from './modules/GenEmail.vue'
import GenNumb from './modules/GenNumb.vue'
import GenText from './modules/GenText.vue'
import cat from './modules/cat.vue'
</script>

<template>
  <div id="app">
    <!-- Фон -->
    <BackgroundSVG />

    <!-- Хэдер -->
    <MyHeader />

    <!-- Контент -->
        <main class="content">
      <!-- Приветственный блок -->
      <div class="welcome-block">
        <h1 class="welcome-title">Привет!</h1>
        <p class="welcome-subtitle">
          Здесь ты можешь сгенерировать любые данные для тестов 😉 </p>
          <p class="welcome-subtitle">А ещё, котик мурлычет, так что выключи звук на сайте, или убавь громкость, 
            если ты в наушниках, чтобы не испугаться внезапного мурлыканья 🐱
        </p>
      </div>

      <!-- Модуль с элементами -->
      <div class="module">
        <DecisionMatrix  />
        <Gran />
        <GenFIO />
        <GenEmail />
        <GenNumb />
        <GenText />
        <cat />
        
      </div>
    </main>
  </div>
</template>

<style scoped>
.content {
  padding-top: 100px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Приветственный блок */
.welcome-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

/* Заголовок */
.welcome-title {
  font-family: var(--font-header);
  font-size: var(--header-size);
  line-height: var(--header-line-height);
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

/* Подзаголовок */
.welcome-subtitle {
  font-family: var(--font-subheader);
  font-size: var(--subheader-size);
  line-height: var(--subheader-line-height);
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

/* Модуль с элементами */
.module {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

#app {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
}
</style>