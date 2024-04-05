<script setup>
import ComboboxInput from './components/ComboboxInput.vue'

const options = [
  {
    name: 'Bulbasaur',
    value: 1
  },
  {
    name: 'Charmander',
    value: 4
  },
  {
    name: 'Squirtle',
    value: 7
  }
]
</script>

<template>
  <main>
    <ComboboxInput :options="options" label="Pokemon Search" is-label-hidden />
  </main>
</template>

<style scoped></style>
