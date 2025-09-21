<template>
  <div id="gen-email" class="module-wrapper">
    <h2 class="module-title">Генератор Email</h2>

    <div class="module-content">
      <!-- Левая колонка -->
      <div class="module-left">

        <!-- Слайдеры -->
        <div class="slider-wrapper">
          <label>Длина имени пользователя: {{ usernameLength }}</label>
          <BaseSlider v-model="usernameLength" :min="1" :max="100" />
        </div>

        <div class="slider-wrapper">
          <label>Длина домена: {{ domainLength }}</label>
          <BaseSlider v-model="domainLength" :min="1" :max="100" />
        </div>

        <!-- Аккордеоны -->
        <div v-for="(group, gIndex) in groups" :key="gIndex" class="group-wrapper">
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
            <label v-for="(item, iIndex) in group.items" :key="iIndex" class="checkbox-label">
              <BaseCheckbox v-model="item.checked" />
              <span>{{ item.label }}</span>
            </label>
          </div>
        </div>

        <!-- Кнопки -->
        <div class="buttons-wrapper">
          <BaseButton @click="selectAll">Выбрать всё</BaseButton>
          <BaseButton @click="clearAll">Очистить выбор</BaseButton>
          <BaseButton @click="generateEmails">Сгенерировать данные</BaseButton>
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
import { ref, reactive } from 'vue'
import { faker } from '@faker-js/faker'
import BaseButton from '../components/BaseButton.vue'
import BaseCheckbox from '../components/BaseCheckbox.vue'
import BaseSlider from '../components/BaseSlider.vue'
import InfoWindow from '../components/InfoWindow.vue'

// --- Слайдеры ---
const usernameLength = ref(10)
const domainLength = ref(10)

// --- Вывод ---
const outputText = ref('')

// --- Аккордеоны и чекбоксы ---
const groups = reactive([
  {
    name: 'Валидные Email',
    open: true,
    items: [
      { label: 'Имя пользователя + домен второго уровня', checked: false, type: 'usernameDomain2' },
      { label: 'Имя пользователя + домен третьего уровня', checked: false, type: 'usernameDomain3' },
      { label: 'Имя пользователя с цифрами', checked: false, type: 'usernameNumbers' },
      { label: 'Имя пользователя с дефисами и точками', checked: false, type: 'usernameDots' },
      { label: 'Имя пользователя с плюсом / тегами', checked: false, type: 'usernamePlus' },
    ]
  },
  {
    name: 'Невалидные Email',
    open: false,
    items: [
      { label: 'Пустое поле', checked: false, type: 'empty' },
      { label: 'Без имени пользователя', checked: false, type: 'noUsername' },
      { label: 'Без @', checked: false, type: 'noAt' },
      { label: 'С двойной @', checked: false, type: 'doubleAt' },
      { label: 'Спецсимволы', checked: false, type: 'specialChars' },
      { label: 'Пробелы в начале', checked: false, type: 'spaceStart' },
      { label: 'Пробелы в конце', checked: false, type: 'spaceEnd' },
      { label: 'Пробелы в середине', checked: false, type: 'spaceMiddle' },
    ]
  },
  {
    name: 'Особые сценарии',
    open: false,
    items: [
      { label: 'Смайлики', checked: false, type: 'emoji' },
      { label: 'Unicode в имени', checked: false, type: 'unicodeUser' },
      { label: 'Unicode в домене', checked: false, type: 'unicodeDomain' },
      { label: 'Капсом', checked: false, type: 'caps' },
    ]
  }
])

function nativeTest() {
  console.log('nativeTest clicked')
  alert('nativeTest clicked')
}

// --- Управление выбором ---
function selectAll() {
  groups.forEach(group => group.items.forEach(item => item.checked = true))
}

function clearAll() {
  groups.forEach(group => group.items.forEach(item => item.checked = false))
}

// --- Генерация username ---
function generateUsername(len, options = {}) {
  let base = faker.internet.username().replace(/[^a-zA-Z0-9._+-]/g, '')
  if (options.withNumbers) base += faker.number.int({ min: 0, max: 999 })
  if (options.withDots) base = base.replace(/([a-z])/, `$1.${faker.word.words(1)}`)
  if (options.withPlus) base += '+tag'
  if (options.withUnicode) base = 'юзер' + base
  if (options.withEmoji) base += '🔥'
  if (options.caps) base = base.toUpperCase()
  return base.slice(0, len)
}

// --- Генерация домена ---
function generateDomain(len, level = 2, unicode = false) {
  let domain = faker.internet.domainName()
  if (level === 3) domain = faker.word.words(1) + '.' + domain
  if (unicode) domain = 'домен.рф'
  return domain.slice(0, len)
}

// --- Генерация email по типу ---
function buildEmail(type) {
  switch (type) {
    case 'usernameDomain2': return generateUsername(usernameLength.value) + '@' + generateDomain(domainLength.value, 2)
    case 'usernameDomain3': return generateUsername(usernameLength.value) + '@' + generateDomain(domainLength.value, 3)
    case 'usernameNumbers': return generateUsername(usernameLength.value, { withNumbers: true }) + '@' + generateDomain(domainLength.value)
    case 'usernameDots': return generateUsername(usernameLength.value, { withDots: true }) + '@' + generateDomain(domainLength.value)
    case 'usernamePlus': return generateUsername(usernameLength.value, { withPlus: true }) + '@' + generateDomain(domainLength.value)

    case 'empty': return ''
    case 'noUsername': return '@' + generateDomain(domainLength.value)
    case 'noAt': return generateUsername(usernameLength.value) + generateDomain(domainLength.value)
    case 'doubleAt': return generateUsername(usernameLength.value) + '@@' + generateDomain(domainLength.value)
    case 'specialChars': return '#$%^&*()@domain.com'
    case 'spaceStart': return ' ' + generateUsername(usernameLength.value) + '@' + generateDomain(domainLength.value)
    case 'spaceEnd': return generateUsername(usernameLength.value) + '@' + generateDomain(domainLength.value) + ' '
    case 'spaceMiddle': return generateUsername(5) + ' ' + generateUsername(5) + '@' + generateDomain(domainLength.value)

    case 'emoji': return generateUsername(usernameLength.value, { withEmoji: true }) + '@' + generateDomain(domainLength.value)
    case 'unicodeUser': return generateUsername(usernameLength.value, { withUnicode: true }) + '@' + generateDomain(domainLength.value)
    case 'unicodeDomain': return generateUsername(usernameLength.value) + '@' + generateDomain(domainLength.value, 2, true)
    case 'caps': return generateUsername(usernameLength.value, { caps: true }) + '@' + generateDomain(domainLength.value).toUpperCase()

    default: return generateUsername(usernameLength.value) + '@' + generateDomain(domainLength.value)
  }
}

// --- Генерация выбранных email (1 на чекбокс) ---
function generateEmails() {
  console.log("Функция вызвана!");
  const emails = []
  groups.forEach(group => {
    group.items.forEach(item => {
      if (item.checked) {
        emails.push(`${item.label}: ${buildEmail(item.type)}`)
      }
    })
  })
  outputText.value = emails.join('\n')
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