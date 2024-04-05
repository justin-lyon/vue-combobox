<script setup>
import Combobox from './components/Combobox.vue'

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
    <Combobox :options="options" />
  </main>
</template>

<style scoped></style>
