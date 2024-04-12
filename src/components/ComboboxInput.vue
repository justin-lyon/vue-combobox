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

const searchTerm = ref(null)
const isFocused = ref(false)
const isListBoxOpen = ref(false)

function onFocus() {
  isFocused.value = true
}

function onBlur() {
  isFocused.value = false
}

function onArrowDown() {
  if (!isListBoxOpen.value) {
    isListBoxOpen.value = true
    return
  }
}

function onArrowUp() {
  if (!isListBoxOpen.value) {
    isListBoxOpen.value = true
    return
  }
}

function onEnter() {
  console.log('enter')
  searchTerm.value = 'selectedOption.value'
  isListBoxOpen.value = false
}

function onEscape() {
  console.log('escape')
  isListBoxOpen.value = false
}

function onChevronClicked() {
  isListBoxOpen.value = !isListBoxOpen.value
}

const isLabelHidden = computed(() => {
  return props.labelType === 'hidden' ? 'hidden' : ''
})
</script>

<template>
  <div class="combobox">
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
          type="text"
          v-model="searchTerm"
          placeholder="🔎 Search..."
          aria-controls="optionsList"
          aria-autocomplete="both"
          aria-expanded=""
          data-active-option=""
          aria-activedescendant=""
          @keyup.prevent.up="onArrowUp"
          @keyup.prevent.down="onArrowDown"
          @keyup.prevent.enter="onEnter"
          @keyup.prevent.esc="onEscape"
          :onfocus="onFocus"
          :onblur="onBlur"
        />
      </div>
      <button class="" :class="{ hidden: !isListBoxOpen }">
        <CloseIcon />
      </button>
      <button class="btn-chevron" :aria-expanded="isListBoxOpen" @click="onChevronClicked">
        <ChevronLeftIcon :class="{ open: isListBoxOpen }" />
      </button>
    </div>
    <ul
      id="optionsList"
      class="listbox"
      :class="{ hidden: !isListBoxOpen }"
      role="listbox"
      aria-label="listbox options"
    >
      <li v-for="item in props.options" v-bind:key="item.value" role="option">
        {{ item.name }}
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
  border-radius: 0.25rem;
}

input {
  border-radius: 0.25rem 0 0 0.25rem;
}

.btn-chevron {
  border-radius: 0 0.25rem 0.25rem 0;
}

.combobox button.btn-chevron[aria-expanded='true'] svg {
  transform: rotate(270deg) translate(0, 0);
}

input,
ul {
  width: 100%;
  background-color: var(--background);
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
  border-radius: 0.25rem;
}

li {
  list-style-type: none;
}

li:hover {
  background-color: var(--selected);
  color: var(--font-selected-color);
}
</style>
