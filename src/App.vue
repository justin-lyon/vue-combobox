<script setup>
import MiniSearch from 'minisearch'
import ComboboxInput from './components/ComboboxInput.vue'

const options = [
  {
    name: 'Bulbasaur',
    id: '1'
  },
  {
    name: 'Ivysaur',
    id: '2'
  },
  {
    name: 'Venasaur',
    id: '3'
  },
  {
    name: 'Charmander',
    id: '4'
  },
  {
    name: 'Charmeleon',
    id: '5'
  },
  {
    name: 'Charizard',
    id: '6'
  },
  {
    name: 'Squirtle',
    id: '7'
  },
  {
    name: 'Wartortle',
    id: '8'
  },
  {
    name: 'Blastoise',
    id: '9'
  },
  {
    name: 'Caterpie',
    id: '10'
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
  width: 70%;
  /* border: 1px solid yellow; */
}

main {
  font-size: 2rem;
  line-height: 2.2rem;
}
</style>
