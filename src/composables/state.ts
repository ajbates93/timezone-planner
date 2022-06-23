import type { Timezone } from "@/types";
import { timezones } from "../composables/data";
import { computed, ref } from "vue";
import { useStorage, useNow } from '@vueuse/core'

const userTimezone = new window.Intl.DateTimeFormat().resolvedOptions().timeZone

export const now = useNow({ interval: 30_000 })
export const zoneNames = useStorage<string[]>('world-time-zones', [])
export const currentZone = ref(userTimezone)
export const currentOffset = ref(timezones.find(x => x.name === currentZone.value).offset)
export const zones = computed(() => zoneNames.value.map(name => timezones.find(y => y.name === name)))

export const addToTimezone = (timezone: Timezone) => {
  if (!zoneNames.value.includes(timezone.name))
    zoneNames.value.push(timezone.name)
}

export const removeTimezone = (timezone: Timezone) => {
  zoneNames.value = zoneNames.value.filter(name => name !== timezone.name)
}

export const moveTimezone = (timezone: Timezone, delta: 1 | -1) => {
  const index = zoneNames.value.indexOf(timezone.name)
  if (index === -1)
    return
  const target = index + delta
  const other = zoneNames.value[target]
  zoneNames.value[target] = timezone.name
  zoneNames.value[index] = other
}


if (!zones.value.length) {
  zoneNames.value.push(userTimezone)
}
