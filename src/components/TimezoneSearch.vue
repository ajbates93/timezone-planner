<script setup lang="ts">
import {ref, computed} from 'vue'
import Fuse from 'fuse.js'
import { timezones } from '../composables/data'
import { addToTimezone } from '../composables/state';
import { Timezone } from '../types';

const fuse = new Fuse(timezones, {
  keys: ['name']
})

const input = ref('')
const index = ref(0)
const searchResult = computed(() => {
  return fuse.search(input.value)
})

const add = (t: Timezone) => {
  addToTimezone(t)
  input.value = ''
  index.value = 0
}

</script>

<template>
  <div relative>
    <input v-model="input" type="text" placeholder="Search Timezone..." px2 py1 border="~ gray/15 rounded" bg-transparent w-full />
    <div absolute top-full bg-gray-900 left-0 right-0 v-show="input">
      <button v-for="i of searchResult" 
      :key="i.refIndex" 
      @click="add(i.item)"
      flex gap2>
        <div font-mono w-10 text-right>
          {{i.item.offset}}
        </div>
        <div>
          {{i.item.name}} 
        </div>
      </button>
    </div>
  </div>
</template>

<style>
html {
  background: #222;
  color: white;
  color-scheme: dark;
}
</style>
