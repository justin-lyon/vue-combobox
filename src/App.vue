<script setup>
import ComboboxInput from './components/ComboboxInput.vue'

const options = [
  {
    name: 'Bulbasaur',
    value: 1
  },
  {
    name: 'Ivysaur',
    value: 2
  },
  {
    name: 'Venasaur',
    value: 3
  },
  {
    name: 'Charmander',
    value: 4
  },
  {
    name: 'Charmeleon',
    value: 5
  },
  {
    name: 'Charizard',
    value: 6
  },
  {
    name: 'Squirtle',
    value: 7
  },
  {
    name: 'Wartortle',
    value: 8
  },
  {
    name: 'Blastoise',
    value: 9
  },
  {
    name: 'Caterpie',
    value: 10
  }
]
</script>

<template>
  <main class="container">
    <ComboboxInput :options="options" label="Pokemon Search" is-label-hidden />
    <div>Other Content</div>
  </main>
</template>

<style scoped>
.container {
  margin: 0 auto;
  margin-top: 2rem;
  width: 50%;
  height: 100vh;
  /* border: 1px solid yellow; */
}

main {
  font-size: 2rem;
  line-height: 2.2rem;
}
</style>
