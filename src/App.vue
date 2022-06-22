<script setup lang="ts">
import {ref, computed} from 'vue'
import { zones } from './composables/state'
import ActionBar from './components/ActionBar.vue';



</script>

<template>
  <div border="~ gray/20" m2>
    <ActionBar />
    <TimeScheduler />
  </div>
</template>
  
<style>
html {
  background: #222;
  color: white;
  color-scheme: dark;
}
</style>
