<template>
  <div id="app">
    <t-input label="Nome" :maxlength="100" v-model="name"></t-input>
    <t-button>Teste</t-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ServeDev",
  setup() {
    let name = ref("Alan Rezende");
    return {
      name
    };
  }
});
</script>
