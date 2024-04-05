<script setup>
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-autocomplete
// https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
// https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-both/
import { ref } from 'vue'
const props = defineProps(['options', 'label'])

const searchTerm = ref(null)
const isFocused = ref(false)

function onFocus() {
  isFocused.value = true
}

function onBlur() {
  isFocused.value = false
}
</script>

<template>
  <div class="combobox">
    <label for="comboboxInput">Search</label>
    <div class="form">
      <input
        id="comboboxInput"
        type="text"
        v-model="searchTerm"
        placeholder="Search..."
        aria-controls="optionsList"
        aria-autocomplete="both"
        aria-expanded=""
        data-active-option=""
        aria-activedescendant=""
        :onfocus="onFocus"
        :onblur="onBlur"
      />
      <button>
        <!-- Arrow Left Icon `<` -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="0.75rem"
          height="0.75rem"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" fill-rule="evenodd" d="m15 4l2 2l-6 6l6 6l-2 2l-8-8z" />
        </svg>
        <!-- Close Icon `X` -->
        <!-- <svg
          v-if="isFocused"
          xmlns="http://www.w3.org/2000/svg"
          width="0.75rem"
          height="0.75rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M10.657 12.071L5 6.414L6.414 5l5.657 5.657L17.728 5l1.414 1.414l-5.657 5.657l5.657 5.657l-1.414 1.414l-5.657-5.657l-5.657 5.657L5 17.728z"
          />
        </svg> -->
      </button>
    </div>
    <ul id="optionsList" class="listbox" role="listbox" aria-label="listbox options">
      <li v-for="item in props.options" v-bind:key="item.value" role="option">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
