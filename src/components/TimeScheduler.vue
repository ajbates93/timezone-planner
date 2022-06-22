<script setup lang="ts">
  import { zones, removeTimezone, moveTimezone } from '../composables/state';
import TimezoneItem from './TimezoneItem.vue';

</script>

<template>
  <div>
    <div v-for="zone, idx of zones" :key="zone.name" 
      px4 py2 border="b base" relative>
      <TimezoneItem :timezone="zone" />
      <div absolute left="-6" top-0 bottom-0 text-xl flex="~ col" justify-center>
        <button @click="removeTimezone(zone)" icon-btn m--1px i-carbon-close title="Remove"></button>
        <button @click="moveTimezone(zone, -1)" icon-btn m--1px i-carbon-caret-up v-if="idx !== 0" title="Move Up"></button>
        <button @click="moveTimezone(zone, 1)" icon-btn m--1px i-carbon-caret-down v-if="idx !== zones.length - 1" title="Move Down"></button>
      </div>
    </div>
  </div>
</template>