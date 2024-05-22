<script setup>
import ComboboxInput from '../lib/ComboboxInput.vue'

const options = [
  {
    label: 'Bulbasaur',
    value: '1'
  },
  {
    label: 'Ivysaur',
    value: '2'
  },
  {
    label: 'Venasaur',
    value: '3'
  },
  {
    label: 'Charmander',
    value: '4'
  },
  {
    label: 'Charmeleon',
    value: '5'
  },
  {
    label: 'Charizard',
    value: '6'
  },
  {
    label: 'Squirtle',
    value: '7'
  },
  {
    label: 'Wartortle',
    value: '8'
  },
  {
    label: 'Blastoise',
    value: '9'
  },
  {
    label: 'Caterpie',
    value: '10'
  }
]
</script>

<template>
  <main class="container">
    <ComboboxInput :options="options" label="Pokemon Search" is-label-hidden />
    <div>Other Content</div>
  </main>
</template>

<style>
:root {
  --vue-combobox-background-color: #1c1b22;
  --vue-combobox-selected-background-color: #fff;
  --vue-combobox-font-color: var(--vue-combobox-selected-background-color);
  --vue-combobox-font-selected-color: var(--vue-combobox-background-color);
  --vue-combobox-border-radius: 0.5rem;
}
</style>

<style scoped>
.container {
  margin: 0 auto;
  margin-top: 2rem;
  width: 70%;
}

main {
  font-size: 2rem;
  line-height: 2.2rem;
}
</style>
