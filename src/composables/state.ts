import type { Timezone } from "@/types";
import { timezones } from "../composables/data";
import { computed, ref, toRef } from "vue";
import { useStorage, useNow } from '@vueuse/core'

const userTimezone = new window.Intl.DateTimeFormat().resolvedOptions().timeZone

export interface State {
  name? :string
  description? :string
  zones: string[]
  home: string
  date: Date
  selection: Selection[]
}

export interface Selection {
  from: Date
  to: Date
}

export const storage = useStorage<State>('world-time-state', {
  zones: [],
  home: userTimezone,
  date: new Date(),
  selection: []
})

export const now = useNow({ interval: 30_000 })
export const zoneNames = toRef(storage.value, 'zones')
export const homeZone = toRef(storage.value, 'home')
export const homeOffset = ref(timezones.find(x => x.name === homeZone.value).offset)
export const zones = computed(() => zoneNames.value.map(name => timezones.find(y => y.name === name)))

export const addToTimezone = (timezone: Timezone) => {
  if (!zoneNames.value.includes(timezone.name))
    zoneNames.value.push(timezone.name)
}

export const removeTimezone = (timezone: Timezone) => {
  // storage.value.zones = storage.value.zones.filter(name => name !== timezone.name)
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

if (!zoneNames.value?.length)
  zoneNames.value = [userTimezone]