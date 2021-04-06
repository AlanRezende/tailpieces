<template>
  <div id="app">
    <t-alert :info="success" color="red" />
    <t-alert :info="success" color="green" />
    <t-alert :info="success" />
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
      <t-toggle
        v-model="user.new"
        label="Status"
        :title="['Ativo', 'Inativo']"
      />
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

    <t-form-section label="DropDown">
      <div class="flex items-center">
        <t-dropdown>
          <template v-slot:trigger>
            <t-button size="sm" color="gray">Mais Opções</t-button>
          </template>
          <template v-slot:default>
            <t-dropdown-item href="#verImagens">Ver Imagens</t-dropdown-item>
            <t-dropdown-item href="#editar">Editar</t-dropdown-item>
            <t-dropdown-item type="separator" />
            <t-dropdown-item href="#download">Download PDF</t-dropdown-item>
          </template>
        </t-dropdown>

        <t-dropdown>
          <template v-slot:trigger>
            <img
              class="border mx-2 rounded-full w-8 h-8 cursor-pointer"
              src="https://cdn1.iconfinder.com/data/icons/female-avatars-vol-1/256/female-portrait-avatar-profile-woman-sexy-afro-2-512.png"
            />
          </template>
          <template v-slot:default>
            <t-dropdown-item href="#verImagens">Ver Imagens</t-dropdown-item>
            <t-dropdown-item href="#editar">Editar</t-dropdown-item>
            <t-dropdown-item type="separator" />
            <t-dropdown-item href="#download">Download PDF</t-dropdown-item>
          </template>
        </t-dropdown>

        <t-dropdown label="Mais ações">
          <template v-slot:default>
            <t-dropdown-item href="#verImagens">Ver Imagens</t-dropdown-item>
            <t-dropdown-item href="#editar">Editar</t-dropdown-item>
            <t-dropdown-item type="separator" />
            <t-dropdown-item href="#download">Download PDF</t-dropdown-item>
          </template>
        </t-dropdown>
      </div>
    </t-form-section>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ServeDev",
  setup() {
    let user = ref({ name: "Alan Rezende", active: true, new: false });
    const success = {
      title: "Sucesso!",
      messages: ["Salvo com sucesso no banco de dados"]
    };
    return {
      user,
      success
    };
  }
});
</script>
