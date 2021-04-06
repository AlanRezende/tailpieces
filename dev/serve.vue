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
      <t-accordion label="Test accordion">
        Pellentesque scelerisque augue eget dui lobortis auctor. Aenean sit amet
        nisi urna. Pellentesque eu massa leo. Ut sit amet urna non nisi volutpat
        interdum. Nam euismod nec lacus quis accumsan. Proin malesuada, urna a
        commodo gravida, dolor tortor aliquet ante, a maximus tortor diam quis
        sapien. Praesent porta faucibus congue. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; Cras tempor ex
        vitae fermentum bibendum. Mauris suscipit eros ante, ac luctus odio
        gravida in. Nunc in urna varius, elementum massa eu, rutrum urna. Nulla
        non imperdiet arcu.
      </t-accordion>
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
