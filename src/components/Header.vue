<template>
  <header class="MyHeader">
    <!-- Лого -->
    <div class="logo">
      <img src="/logo.svg" alt="MyGenerator" />
    </div>

    <!-- Бургер -->
    <button class="burger" @click="toggleMenu">
      <img src="/src/assets/burger-menu.svg" alt="меню" />
    </button>

    <!-- Overlay меню -->
    <transition name="fade">
      <div v-if="menuOpen" class="menu-overlay" @click.self="menuOpen = false">
        <nav class="menu-window">
          <button class="close-btn" @click="menuOpen = false">✕</button>
          <ul>
            <li><a href="#decision-matrix" @click.prevent="scrollTo('#decision-matrix')">Матрица решений</a></li>
            <li><a href="#gran" @click.prevent="scrollTo('#gran')">Граничные значения</a></li>
            <li><a href="#gen-fio" @click.prevent="scrollTo('#gen-fio')">Генератор ФИО</a></li>
            <li><a href="#gen-email" @click.prevent="scrollTo('#gen-email')">Генератор Email</a></li>
            <li><a href="#gen-numb" @click.prevent="scrollTo('#gen-numb')">Генератор телефонов</a></li>
            <li><a href="#gen-text" @click.prevent="scrollTo('#gen-text')">Генератор текста</a></li>
          </ul>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const menuOpen = ref(false);
const toggleMenu = () => menuOpen.value = !menuOpen.value;

// Плавный скролл с учётом фиксированного хедера
const scrollTo = (selector) => {
  const el = document.querySelector(selector);
  if (el) {
    const headerOffset = 110; // высота хедера
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    menuOpen.value = false; // закрываем меню после клика
  }
}
</script>

<style scoped>
/* ===== Хэдер ===== */
.MyHeader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px; /* меньше высота */
  padding: 0 1.5rem;
  background-color: #FADADD;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 1000;
}

.logo {
  width: 70px;   /* ширина блока */
  height: 70px;  /* высота блока */
}

.logo img {
  width: 100%;   /* изображение подстраивается под блок */
  height: auto;  /* сохраняем пропорции */
  object-fit: contain; /* на всякий случай */
}

.burger {
  background: none;
  border: none;
  cursor: pointer;
  display: block;
}

.burger img {
  width: 60px; /* уменьшено */
  height: 60px;
}

/* ===== Overlay меню ===== */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: flex-end;
  z-index: 999;
}

.menu-window {
  background-color: #fffdf9;
  width: 280px;
  height: 100%;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.menu-window ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-window li {
  margin-bottom: 20px;
}

.menu-window a {
  font-size: 1.2rem;
  color: #333;
  text-decoration: none;
}

.menu-window a:hover {
  color: #ff6b6b;
}

/* ===== Крестик ===== */
.close-btn {
  display: none; 
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

/* ===== Анимация ===== */
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-to, .fade-leave-from { opacity: 1; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }

/* ===== Мобильная версия ===== */
@media (max-width: 768px) {
  .menu-window { width: 100%; }
  .close-btn { display: block; }
}
</style>
