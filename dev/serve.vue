<template>
  <div id="app">
    <t-form-section label="Seção Teste">
      <t-input label="Nome" :maxlength="100" v-model="user.name" />
      <t-button>Teste</t-button>
      <t-select
        class="md:w-1/2"
        label="Ativo"
        :items="[
          { name: 'Sim', value: true },
          { name: 'Não', value: false }
        ]"
        v-model="user.active"
      ></t-select>
    </t-form-section>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ServeDev",
  setup() {
    let user = ref({ name: "Alan Rezende", active: true });
    return {
      user
    };
  }
});
</script>
