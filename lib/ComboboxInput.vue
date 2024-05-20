<script setup>
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-autocomplete
// https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
// https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-both/
import SearchIcon from './icons/SearchIcon.vue'
import ChevronLeftIcon from './icons/ChevronLeftIcon.vue'
import CloseIcon from './icons/CloseIcon.vue'

import { ref, computed } from 'vue'
const props = defineProps({
  options: {
    type: Array,
    default: () => {
      throw new Error('attribute `options` is required')
    },
    required: true
  },
  label: {
    type: String,
    required: true,
    default: () => {
      throw new Error('attribute `label` is required.')
    }
  },
  placeholder: {
    type: String,
    default: '🔎 Search...'
  },
  isLabelHidden: {
    type: Boolean
  }
})

const inputEl = ref(null)
const searchTerm = ref('')
const isFocused = ref(false)
const isListBoxOpen = ref(false)
const listItems = ref([...props.options])
const activeItem = ref(listItems.value[0]?.value)

function onFocus() {
  isFocused.value = true
}

function onBlur() {
  isFocused.value = false
}

function onKeyup(event) {
  const capturedCodes = ['ArrowUp', 'ArrowDown', 'Enter', 'Escape']
  if (capturedCodes.includes(event.code)) {
    return
  }

  if (!isListBoxOpen.value) {
    isListBoxOpen.value = true
  }

  if (hasSearchTerm.value) {
    const filtered = props.options.filter((o) => o.label.toLowerCase().includes(searchTerm.value))
    listItems.value = [...filtered]
  }

  if (typeof searchTerm.value === 'string' && searchTerm.value.length === 0) {
    reset()
  }
}

function onArrowDown() {
  if (!isListBoxOpen.value) {
    isListBoxOpen.value = true
    return
  }

  if (listItems.value.length === 0) {
    return
  }

  let activeIndex = listItems.value.findIndex((item) => item.value === activeItem.value)
  activeIndex++

  if (activeIndex === listItems.value.length) {
    activeIndex = 0
  }

  activeItem.value = listItems.value[activeIndex].value
}

function onArrowUp() {
  if (!isListBoxOpen.value) {
    isListBoxOpen.value = true
    return
  }

  if (listItems.value.length === 0) {
    return
  }

  let activeIndex = listItems.value.findIndex((item) => item.value === activeItem.value)
  activeIndex--

  if (activeIndex === -1) {
    activeIndex = listItems.value.length - 1
  }

  activeItem.value = listItems.value[activeIndex].value
}

function onEnter() {
  if (isListBoxOpen.value) {
    setSelected(activeItem.value)
    return
  }
}

function onEscape() {
  if (isListBoxOpen.value) {
    isListBoxOpen.value = false
    return
  }
  reset()
}

function onClearClicked() {
  reset()
}

function onChevronClicked() {
  isListBoxOpen.value = !isListBoxOpen.value
}

function onClickOption(event) {
  setSelected(event.target.dataset.key)
}

const hasSearchTerm = computed(() => {
  return typeof searchTerm.value === 'string' && searchTerm.value.length > 0
})

const isLabelHidden = computed(() => {
  return props.labelType === 'hidden' ? 'hidden' : ''
})

const vFocus = {
  mounted(el) {
    el.focus()
  }
}

const vClickOutside = {
  beforeMount(el) {
    el.clickOutside = (event) => {
      if (!el.contains(event.target)) {
        isListBoxOpen.value = false
      }
    }
    document.addEventListener('click', el.clickOutside)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutside)
  }
}

function setSelected(id) {
  const selected = listItems.value.find((item) => item.value === id)
  searchTerm.value = selected.label
  activeItem.value = selected.value
  isListBoxOpen.value = false
  inputEl.value.focus()
}

function reset() {
  searchTerm.value = ''
  listItems.value = [...props.options]
  activeItem.value = listItems.value[0]?.value
}
</script>

<template>
  <div class="combobox" v-click-outside>
    <div class="input-container">
      <div class="stretch">
        <label
          for="comboboxInput"
          :aria-hidden="isLabelHidden"
          :class="{ hidden: props.isLabelHidden }"
        >
          <SearchIcon class="medium" />
        </label>
        <input
          id="comboboxInput"
          ref="inputEl"
          type="text"
          v-model="searchTerm"
          v-focus
          :placeholder="placeholder"
          :aria-label="label"
          aria-controls="optionsList"
          aria-autocomplete="list"
          :aria-expanded="isListBoxOpen"
          :data-active-option="activeItem"
          :aria-activedescendant="activeItem"
          @keyup="onKeyup"
          @keyup.up="onArrowUp"
          @keyup.down="onArrowDown"
          @keyup.enter="onEnter"
          @keyup.esc="onEscape"
          :onfocus="onFocus"
          :onblur="onBlur"
          data-test="input"
        />
      </div>
      <button
        tabindex="-1"
        aria-controls="optionsList"
        aria-label="Clear Input"
        :aria-expanded="isListBoxOpen"
        :class="{ hidden: !hasSearchTerm }"
        @click="onClearClicked"
        data-test="clearButton"
      >
        <CloseIcon />
      </button>
      <button
        tabindex="-1"
        class="btn-chevron"
        aria-controls="optionsList"
        aria-label="Show/Hide List"
        :aria-expanded="isListBoxOpen"
        @click="onChevronClicked"
        data-test="chevronButton"
      >
        <ChevronLeftIcon />
      </button>
    </div>
    <ul
      id="optionsList"
      class="listbox"
      :class="{ hidden: !isListBoxOpen }"
      role="listbox"
      aria-label="listbox options"
      data-test="listbox"
    >
      <li
        v-for="item in listItems"
        v-bind:key="item.value"
        :data-key="item.value"
        @click="onClickOption"
        role="option"
        :class="{ selected: item.value === activeItem }"
        data-test="listitem"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<style></style>

<style scoped>
.combobox {
  position: relative;
}

.combobox .input-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.input-container .stretch {
  flex: 1;
}

.hidden {
  display: none;
}

.input-container {
  border: 1px solid grey;
  border-radius: var(--border-radius);
}

input {
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.btn-chevron {
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
}

.combobox button.btn-chevron[aria-expanded='true'] svg {
  transform: rotate(270deg) translate(0, 0);
}

input,
ul {
  width: 100%;
  background-color: var(--background-color);
}

input,
button,
ul {
  border: 0;
  padding: 0.5rem 1rem;
}

ul {
  opacity: 1;
  position: absolute;
  margin-top: 0.25rem;
  border: 1px solid grey;
  border-radius: var(--border-radius);
}

li {
  list-style-type: none;
  user-select: none;
  cursor: pointer;
}

li:hover {
  background-color: var(--selected);
  color: var(--font-selected-color);
}

li.selected {
  background-color: var(--selected);
  color: var(--font-selected-color);
}
</style>
