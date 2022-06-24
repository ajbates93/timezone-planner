<script setup lang="ts">
  import { 
    zones, homeZone, 
    removeTimezone, moveTimezone, setHomeZone 
  } from '../composables/state';
  import TimezoneItem from './TimezoneItem.vue';

</script>

<template>
  <div of-x-auto>
    <div v-for="zone, idx of zones" :key="zone.name" 
      px4 py2 border="b base" relative>
      <TimezoneItem :timezone="zone" w-max>
        <TimeDial :timezone="zone" />
      </TimezoneItem>
      <div absolute left="-6" top-0 bottom-0 text-xl flex="~ col" justify-center>
        <button v-if="homeZone !== zone.name" @click="removeTimezone(zone)" icon-btn m--1px i-carbon-close title="Remove"></button>
        <button v-if="homeZone !== zone.name" @click="setHomeZone(zone)" icon-btn m--1px scale-90 i-carbon-home title="Set Home"></button>
        <button @click="moveTimezone(zone, -1)" icon-btn m--1px i-carbon-caret-up v-if="idx !== 0" title="Move Up"></button>
        <button @click="moveTimezone(zone, 1)" icon-btn m--1px i-carbon-caret-down v-if="idx !== zones.length - 1" title="Move Down"></button>
      </div>
    </div>
  </div>
</template>