<script setup lang="ts">

</script>

<template>
  <div bg-canvas font-sans h-screen>
    <NavBar />
    <div border="~ gray/20" rounded bg-base shadow m8>
      <ActionBar />
      <TimeScheduler />
    </div>
  </div>
</template>
  
<style>
.dark {
  background: #222;
  color: white;
  color-scheme: dark;
}
</style>
