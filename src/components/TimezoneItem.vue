<script setup lang="ts">
import { computed } from 'vue';
import { Timezone } from '../types';

const { timezone } = defineProps<{
  timezone: Timezone
}>()

const region = computed(() => timezone.name.split('/')[0]) 
const location = computed(() => timezone.name.split('/')[1])
const offset = computed(() => timezone.offset > 0 ? `+${timezone.offset}` : timezone.offset)

</script>

<template>
  <div
    flex gap2 py1>
    <div text-lg w-8 ma>
      {{ offset }}
    </div>
    <div flex="~ col" text-left flex-auto>
      <div text-xl>{{ location }}</div>
      <div text-sm op50 leading-1em>{{ region }}</div>
    </div>
  </div>
</template>