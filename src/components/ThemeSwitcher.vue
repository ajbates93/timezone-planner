<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button @click="toggleDark()" text-3xl dark:text-yellow i-carbon-sun dark:i-carbon-moon></button>
</template>