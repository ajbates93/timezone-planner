import type { Timezone } from "@/types";
import { timezones } from "../composables/data";
import { computed, ref } from "vue";
import { useStorage } from '@vueuse/core'

export const zoneNames = useStorage<string[]>('world-time-zones', [])
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

const userTimezone = new window.Intl.DateTimeFormat().resolvedOptions().timeZone

if (!zones.value.length) {
  zoneNames.value.push(userTimezone)
}
