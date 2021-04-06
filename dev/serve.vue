<template>
  <div id="app">
    <t-form-section label="Seção Teste">
      <t-input label="Nome" :maxlength="100" v-model="name" />
      <t-button>Teste</t-button>
    </t-form-section>
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
