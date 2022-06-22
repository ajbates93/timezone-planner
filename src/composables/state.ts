import type { Timezone } from "@/types";
import { timezones } from "../composables/data";
import { computed, ref } from "vue";
import { useStorage } from '@vueuse/core'

export const zoneNames = useStorage<string[]>('world-time-zones', [])
export const zones = computed(() => zoneNames.value.map(name => timezones.find(y => y.name === name)))

export const addToTimezone = (timezone: Timezone) => {
  zoneNames.value.push(timezone.name)
}

const userTimezone = new window.Intl.DateTimeFormat().resolvedOptions().timeZone

if (!zones.value.length) {
  zoneNames.value.push(userTimezone)
}
