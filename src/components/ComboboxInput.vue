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

function onFocus() {
  isFocused.value = true
}

function onBlur() {
  isFocused.value = false
}

const isLabelHidden = computed(() => {
  return props.labelType === 'hidden' ? 'hidden' : ''
})
</script>

<template>
  <div class="combobox">
    <div class="form">
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
        :onfocus="onFocus"
        :onblur="onBlur"
      />
      <button>
        <ChevronLeftIcon class="medium" />
        <CloseIcon class="medium" :class="{ hidden: isFocused.value }" />
      </button>
    </div>
    <ul id="optionsList" class="listbox" role="listbox" aria-label="listbox options">
      <li v-for="item in props.options" v-bind:key="item.value" role="option">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.medium {
  width: 0.8rem;
  height: 0.8rem;
}

.hidden {
  display: none;
}
</style>
