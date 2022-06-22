<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps<{
  name: string
}>()

const uppercase = computed(() => props.name.toLocaleUpperCase())
</script>

<template>
  <div text="red 4xl" font-mono>Hello, {{uppercase}}!</div>
  <div i-carbon-bee text-5xl text-yellow></div>
</template>
