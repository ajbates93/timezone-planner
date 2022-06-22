import type { Timezone } from "@/types";
import { ref } from "vue";

export const zones = ref<Timezone[]>([])

export const addToTimezone = (timezone: Timezone) => {
  zones.value.push(timezone)
}