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
    required: true
  },
  label: {
    type: String,
    required: true
  },
  isLabelHidden: {
    type: Boolean
  }
})

const inputEl = ref(null)
const searchTerm = ref('')
const isFocused = ref(false)
const isListBoxOpen = ref(false)
const listItems = ref(
  props.options.map(({ name, id }) => ({
    label: name,
    value: id,
    isActive: false,
    selected: false
  }))
)
listItems.value[0].isActive = true
const activeItem = ref(listItems.value[0].value)

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
}

function onArrowDown() {
  if (!isListBoxOpen.value) {
    isListBoxOpen.value = true
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

  let activeIndex = listItems.value.findIndex((item) => item.value === activeItem.value)
  activeIndex--

  if (activeIndex === -1) {
    activeIndex = listItems.value.length - 1
  }

  activeItem.value = listItems.value[activeIndex].value
}

function onEnter() {
  console.log('enter')
  if (isListBoxOpen.value) {
    const selected = listItems.value.find((item) => item.value === activeItem.value)
    searchTerm.value = selected.label
    isListBoxOpen.value = false
    return
  }
}

function onEscape() {
  searchTerm.value = ''

  if (isListBoxOpen.value) {
    isListBoxOpen.value = false
    return
  }
}

function onClearClicked() {
  searchTerm.value = ''
  activeItem.value = listItems.value[0]?.value
}

function onChevronClicked() {
  isListBoxOpen.value = !isListBoxOpen.value
}

const isClearShown = computed(() => {
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
  beforeMount(el, binding) {
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
          placeholder="🔎 Search..."
          aria-controls="optionsList"
          aria-autocomplete="both"
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
        />
      </div>
      <button tabindex="-1" :class="{ hidden: !isClearShown }" @click="onClearClicked">
        <CloseIcon />
      </button>
      <button
        tabindex="-1"
        class="btn-chevron"
        :aria-expanded="isListBoxOpen"
        @click="onChevronClicked"
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
    >
      <li
        v-for="item in listItems"
        v-bind:key="item.value"
        role="option"
        :class="{ selected: item.value === activeItem }"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

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
