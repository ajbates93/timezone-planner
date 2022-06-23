<script setup lang="ts">
import { computed } from 'vue';
import { Timezone } from '../types';
import { now, homeOffset, homeZone } from '../composables/state'

const { timezone } = defineProps<{
  timezone: Timezone
}>()

const formatter = new Intl.DateTimeFormat('en-UK', {
  timeZone: timezone.name,
  hour12: false,
  hour: 'numeric',
  minute: 'numeric',
})
const region = computed(() => timezone.name.split('/')[0].replace(/_/g, ' ')) 
const location = computed(() => timezone.name.split('/')[1]?.replace(/_/g, ' ') || '')
const offset = computed(() => {
  let offset = timezone.offset - homeOffset.value
  return offset > 0 ? `+${offset}` : offset
})
const rawOffset = computed(() => {
  return timezone.offset > 0 ? `+${timezone.offset}` : timezone.offset
})
const time = computed(() => formatter.format(now.value))

</script>

<template>
  <div
    flex flex-wrap gap2 py1>
    <div text-lg w-8 ma op80 font-bold text-center
      :title="`${rawOffset} GMT`">
      <div text-xl text-center v-if="timezone.name === homeZone" i-carbon-home op50></div>
      <div v-else>
        {{ offset }}
      </div>
    </div>
    <div flex="~ col" text-left flex-auto>
      <div text-lg>
        {{ location }}
        <sup border="~ base rounded" px1>{{timezone.abbr}}</sup>
      </div>
      <div text-sm op50 leading-1em>{{ region }}</div>
    </div>
    <div tabular-nums>{{time}}</div>
    <slot></slot>
  </div>
</template>