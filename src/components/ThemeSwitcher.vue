<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div flex gap3 justify-end items-center>
    <a target="_blank" href="https://github.com/ajbates93/timezone-planner" text-3xl i-carbon-logo-github></a>
    <button @click="toggleDark()" text-3xl dark:text-yellow i-carbon-sun dark:i-carbon-moon></button>
  </div>
</template>