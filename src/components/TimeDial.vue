<script setup lang="ts">
  import type { Timezone } from '../types'
  import { computed } from 'vue';
  import { now } from '../composables/state'
  import { format } from 'date-fns'

  const { timezone } = defineProps<{
    timezone: Timezone
  }>()
  const hours = computed(() => Array.from({ length: 24}, (_, i) => i + timezone.offset + 1))

  const days = computed(() => [
    hours.value.filter(i => i < 0).map(x => (x + 24) % 24),   // last day
    hours.value.filter(i => i >= 0 && i < 24),                // today
    hours.value.filter(i => i >= 24).map(x => x % 24)  // tomorrow  
  ])

  const isNightTime = (h: number) => {
    return h <= 5 || h >= 22
  }
  const isDark = (h: number) => {
    return h <= 7 || h >= 18
  }

</script>

<template>
  <div flex="~ gap1" of-auto items-end>
    <template v-for="day, idx of days" :key="idx">
      <div v-if="day.length" flex="~" border="~ sky7/30 rounded" of-hidden>
        <div v-for="i in day" :key="i"
          flex="~ col none" w7 h8
          items-center justify-center
          :class="[
            isNightTime(i) ? 'bg-sky7:70 text-white'
            : isDark(i) ? 'bg-sky:20 '
            : ''
            
          ]">
          <div v-if="i">{{ i }}</div>
          <div v-else text-xs leading-1em text-center>{{ format(now, 'dd MMM') }}</div>
        </div>
      </div>
    </template>
  </div>
</template>