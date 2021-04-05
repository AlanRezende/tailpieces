<script lang="ts">
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { TailpiecesSample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  // components: {
  //  TailpiecesSample,
  // }
});
</script>

<template>
  <div id="app">
    <tailpieces-sample />
  </div>
</template>
