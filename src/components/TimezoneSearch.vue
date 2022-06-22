<script setup lang="ts">
import {ref, computed} from 'vue'
import Fuse from 'fuse.js'
import { timezones } from '../composables/data'
import { addToTimezone } from '../composables/state';
import { Timezone } from '../types';
import TimezoneItem from './TimezoneItem.vue';

const fuse = new Fuse(timezones, {
  keys: ['name']
})

const input = ref('')
const index = ref(0)
const searchResult = computed(() => {
  return fuse.search(input.value).slice(0, 10)
})

const add = (t: Timezone) => {
  addToTimezone(t)
  input.value = ''
  index.value = 0
}

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown')
    index.value = (index.value + 1) % searchResult.value.length
  if (e.key === 'ArrowUp')
    index.value = (index.value - 1 + searchResult.value.length) % searchResult.value.length
  if (e.key === 'Enter') 
    add(searchResult.value[index.value].item)
}

</script>

<template>
  <div py1 px2 relative>
    <input v-model="input" type="text" placeholder="Search Timezone..."
      @keydown="onKeyDown" 
      text-xl p="x3 y2" border="~ base rounded" bg-transparent w-full />
    <div v-show="input"
      left-0 right-0 absolute top-full z-10
      bg-base p1 border="~ base rounded" shadow max-h-100 overflow-auto>
      <button v-for="i, idx of searchResult" :key="i.refIndex" @click="add(i.item)"
        :class="idx === index ? 'bg-gray:5' : ''"
        px2
        block w-full>
        <TimezoneItem :timezone="i.item" />
      </button>
    </div>
  </div>
</template>
