<template>
  <div id="gen-fio" class="module-wrapper">
    <!-- Заголовок модуля -->
    <h2 class="module-title">Генератор данных</h2>

    <div class="module-content">
      <!-- Левая колонка -->
      <div class="module-left">
        <!-- Подзаголовок / Описание -->
        <p class="description">
          С помощью этого генератора вы можете сделать тестовые данные для логинов/паролей/ФИО
        </p>

        <!-- Слайдер -->
        <div class="slider-wrapper">
          <label>Максимальная длина: {{ maxLength }}</label>
          <BaseSlider v-model="maxLength" :min="1" :max="100" />
        </div>

        <!-- Аккордеоны -->
        <div v-for="(group, index) in groups" :key="index" class="group-wrapper">
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
            <label v-for="(item, idx) in group.items" :key="idx" class="checkbox-label">
              <BaseCheckbox v-model="item.checked" />
              <span>{{ item.label }}</span>
            </label>
          </div>
        </div>

        <!-- Кнопки -->
        <div class="buttons-wrapper">
          <BaseButton @click="selectAll">Выбрать всё</BaseButton>
          <BaseButton @click="clearAll">Очистить выбор</BaseButton>
          <BaseButton @click="generateNames">Сгенерировать данные</BaseButton>
        </div>
      </div>

      <!-- Правая колонка -->
      <div class="module-right">
        <InfoWindow :text="outputText">
        </InfoWindow>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import BaseCheckbox from '../components/BaseCheckbox.vue'
import BaseSlider from '../components/BaseSlider.vue'
import InfoWindow from '../components/InfoWindow.vue'


// Слайдер
const maxLength = ref(20)

// Вывод
const outputText = ref('')

// слоги для разных языков
const syllables = {
  cyrillic: ["Ан", "др", "ей", "на", "ша", "ми", "ла", "ва", "ко", "лен"],
  latin: ["Jo", "hn", "son", "Mar", "ia", "Lu", "cas", "An", "na", "ri"],
  arabic: ["اب", "حم", "د", "بن", "عل", "ي", "را", "شد"],
  ideograms: ["山", "川", "林", "天", "龍", "火"],
  mixed: ["An", "дрей", "Lu", "ка", "天", "ko"]
}

// Генерация базового имени с точной длиной
function generateBaseName(type, targetLength) {
  const pool = syllables[type] || syllables.latin
  let name = ''

  while (name.length < targetLength) {
    const syllable = pool[Math.floor(Math.random() * pool.length)]
    if (name.length + syllable.length <= targetLength) {
      name += syllable
    } else {
      name += syllable.slice(0, targetLength - name.length)
    }
  }

  return name.charAt(0).toUpperCase() + name.slice(1)
}

// Применение сценариев
function applyScenario(name, type) {
  switch(type) {
    case 'doubleSurname': {
      const half = Math.floor((maxLength.value - 1) / 2)
      const part1 = generateBaseName('latin', half)
      const part2 = generateBaseName('latin', maxLength.value - half - 1)
      return part1 + '-' + part2
    }
    case 'tripleSurname': {
      const third = Math.floor((maxLength.value - 2) / 3)
      const part1 = generateBaseName('latin', third)
      const part2 = generateBaseName('latin', third)
      const part3 = generateBaseName('latin', maxLength.value - 2*third - 2)
      return part1 + '-' + part2 + '-' + part3
    }
    case 'prefixes': {
      const prefix = 'Mr. '
      const trimmedName = name.slice(0, maxLength.value - prefix.length)
      return prefix + trimmedName
    }
    case 'titles': {
      const title = ' the Great'
      const trimmedName = name.slice(0, maxLength.value - title.length)
      return trimmedName + title
    }
    case 'spaceStart': return ' ' + name
    case 'spaceEnd': return name + ' '
    case 'doubleSpaces': {
      const half = Math.floor((maxLength.value - 2) / 2)
      const first = generateBaseName('latin', half)
      const second = generateBaseName('latin', maxLength.value - half - 2)
      return first + '  ' + second
    }
    case 'dashApostrophe': return name.replace(/[aeiouаеёиоуыэюя]/gi, "'$&")
    case 'onlySpaces': return ' '.repeat(Math.min(maxLength.value, 5))
    case 'empty': return ''
    case 'lettersNumbers': {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      const numbers = '0123456789'
      let result = ''
      for (let i = 0; i < maxLength.value; i++) {
        result += Math.random() < 0.7 
          ? letters[Math.floor(Math.random() * letters.length)] 
          : numbers[Math.floor(Math.random() * numbers.length)]
      }
      return result
    }
    case 'lettersSpecials': {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      const specials = '!@#$%^&*()'
      let result = ''
      for (let i = 0; i < maxLength.value; i++) {
        result += Math.random() < 0.7 
          ? letters[Math.floor(Math.random() * letters.length)] 
          : specials[Math.floor(Math.random() * specials.length)]
      }
      return result
    }
    case 'lettersEmojis': {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      const emojis = ['😀','😎','🎉','💡','🔥','🌟']
      let result = ''
      for (let i = 0; i < maxLength.value; i++) {
        result += Math.random() < 0.7 
          ? letters[Math.floor(Math.random() * letters.length)] 
          : emojis[Math.floor(Math.random() * emojis.length)]
      }
      return result
    }
    case 'onlySpecials': {
      const specials = '!@#$%^&*()_+-={}[]<>?,./'
      return Array.from({length: maxLength.value}, () => specials[Math.floor(Math.random() * specials.length)]).join('')
    }
    case 'weirdChars': {
      const chars = '§¶•¤†‡¢£€'
      return Array.from({length: maxLength.value}, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    }
    case 'diacritics': return name.replace(/[aou]/gi, m => m + '́')
    case 'accentMarks': return name.replace(/[aeiou]/gi, m => m + '́')
    default: return name
  }
}

// Генерация имени
function generateName(item) {
  let base = ''

  if (['cyrillic','latin','mixed','ideograms','arabic'].includes(item.type)) {
    base = generateBaseName(item.type, maxLength.value)
  } else {
    base = generateBaseName('latin', maxLength.value)
  }

  return applyScenario(base, item.type).slice(0, maxLength.value)
}

// Сворачиваемые группы и чекбоксы
const groups = reactive([
  {
    name: 'Язык/Алфавит',
    open: true,
    items: [
      { label: 'Кириллица', checked: false, type: 'cyrillic' },
      { label: 'Латиница', checked: false, type: 'latin' },
      { label: 'Смешанные', checked: false, type: 'mixed' },
      { label: 'Иероглифы', checked: false, type: 'ideograms' },
      { label: 'Арабский', checked: false, type: 'arabic' }
    ]
  },
  {
    name: 'Символы',
    open: true,
    items: [
      { label: 'Только буквы', checked: false, type: 'latin' },
      { label: 'Буквы + пробелы', checked: false, type: 'spaceEnd' },
      { label: 'Буквы + апостроф/дефис', checked: false, type: 'dashApostrophe' },
      { label: 'Буквы + цифры', checked: false, type: 'lettersNumbers' },
      { label: 'Буквы + спецсимволы', checked: false, type: 'lettersSpecials' },
      { label: 'Буквы + смайлики', checked: false, type: 'lettersEmojis' },
      { label: 'Только спецсимволы', checked: false, type: 'onlySpecials' }
    ]
  },
  {
    name: 'Особые сценарии',
    open: true,
    items: [
      { label: 'Необычные символы', checked: false, type: 'weirdChars' },
      { label: 'Только пробелы', checked: false, type: 'onlySpaces' },
      { label: 'Диакритика', checked: false, type: 'diacritics' },
      { label: 'Пробел в конце', checked: false, type: 'spaceEnd' },
      { label: 'Знаки ударения', checked: false, type: 'accentMarks' },
      { label: 'Пробел в начале', checked: false, type: 'spaceStart' },
      { label: 'Тройные фамилии', checked: false, type: 'tripleSurname' },
      { label: 'Двойные пробелы внутри', checked: false, type: 'doubleSpaces' },
      { label: 'Двойные фамилии', checked: false, type: 'doubleSurname' },
      { label: 'Приставки', checked: false, type: 'prefixes' },
      { label: 'Имена с титулами', checked: false, type: 'titles' },
      { label: 'Только дефисы/апострофы', checked: false, type: 'dashApostrophe' },
      { label: 'Пустое значение', checked: false, type: 'empty' }
    ]
  }
])

function selectAll() {
  groups.forEach(group => group.items.forEach(item => item.checked = true))
}

function clearAll() {
  groups.forEach(group => group.items.forEach(item => item.checked = false))
}

function generateNames() {
  const names = []
  groups.forEach(group => {
    group.items.forEach(item => {
      if(item.checked) names.push(`${item.label}: ${generateName(item)}`)
    })
  })
  outputText.value = names.join('\n')
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