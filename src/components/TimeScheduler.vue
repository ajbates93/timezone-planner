<script setup lang="ts">
  import { zones } from '../composables/state';
import TimezoneItem from './TimezoneItem.vue';

</script>

<template>
  <div>
    <div v-for="zone of zones" :key="zone.name" px4 py2 border="b base">
      <TimezoneItem :timezone="zone" />
    </div>
  </div>
</template>