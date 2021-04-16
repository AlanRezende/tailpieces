<template>
  <div id="app">
    <t-alert :info="success" color="red" />
    <t-alert :info="success" color="green" />
    <t-alert :info="success" />
    <t-form-section label="Seção Teste">
      <t-input label="Nome" :maxlength="100" v-model="user.data.name" />
      <t-image-input label="Imagem" v-model="user.data.image.value" />
      <t-button @click="debug">Debug</t-button>
      <t-button @click="show = true">Modal</t-button>
      <t-select
        class="md:w-1/2"
        label="Ativo"
        :items="[
          { name: 'Sim', value: true },
          { name: 'Não', value: false },
        ]"
        v-model="user.data.active.value"
      ></t-select>
      <t-toggle
        v-model="user.data.new.value"
        label="Status"
        :title="['Ativo', 'Inativo']"
      />
      <t-editor v-model="paragraph.data.content" label="Conteúdo Form" />
      <t-editor v-model="paragraph2" label="Conteúdo Normal" />
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
    <t-form-section label="Loop">
      <t-loop :data="items" v-slot="{ item: name }"
        >{{ name.name.value }}
      </t-loop>
    </t-form-section>
    <t-dialog-modal :show="show" @close="show = false">
      sdasd
      <template #footer>
        <t-button @click="show = false"> Fechar </t-button>
      </template>
    </t-dialog-modal>
  </div>
  <div id="modals-target"></div>
</template>
<script lang="ts">
import { FormItemInterface } from "tailpieces";
import { defineComponent, ref } from "vue";
import { Form } from "@/entry.esm";
export default defineComponent({
  name: "ServeDev",
  setup() {
    let user = ref(
      new Form({ name: "Alan Rezende", image: null, active: true, new: false }),
    );

    const success = {
      title: "Sucesso!",
      messages: ["Salvo com sucesso no banco de dados"],
    };
    const show = ref(false);
    const paragraph = ref(
      new Form({
        content:
          "Nunc lobortis in nisi eget volutpat. In nec diam id purus ultrices sagittis a in ante. Pellentesque accumsan, lacus vel molestie interdum, justo nibh malesuada ante, at varius lectus erat vehicula quam. Suspendisse molestie mauris erat, id porttitor ex cursus quis. Aliquam quis diam vel nisl maximus egestas in a sapien. Etiam vel lobortis nibh, a gravida ante. Fusce vehicula neque a blandit lacinia. Sed tincidunt tellus quis elit vulputate pharetra. Phasellus porttitor felis eget dignissim iaculis. Sed ac iaculis diam, ac mollis leo. Pellentesque finibus augue elit. Maecenas facilisis, tellus sed porttitor convallis, orci lorem venenatis justo, in volutpat ipsum nisi consectetur ante. Nam quis hendrerit orci, non fringilla metus. Cras at enim fringilla, semper ligula ut, pretium turpis.",
      }),
    );
    const paragraph2 = ref(
      "Nunc lobortis in nisi eget volutpat. In nec diam id purus ultrices sagittis a in ante. Pellentesque accumsan, lacus vel molestie interdum, justo nibh malesuada ante, at varius lectus erat vehicula quam. Suspendisse molestie mauris erat, id porttitor ex cursus quis. Aliquam quis diam vel nisl maximus egestas in a sapien. Etiam vel lobortis nibh, a gravida ante. Fusce vehicula neque a blandit lacinia. Sed tincidunt tellus quis elit vulputate pharetra. Phasellus porttitor felis eget dignissim iaculis. Sed ac iaculis diam, ac mollis leo. Pellentesque finibus augue elit. Maecenas facilisis, tellus sed porttitor convallis, orci lorem venenatis justo, in volutpat ipsum nisi consectetur ante. Nam quis hendrerit orci, non fringilla metus. Cras at enim fringilla, semper ligula ut, pretium turpis.",
    );
    const debug = () => {
      console.log(user.value.data);
    };
    const items: FormItemInterface = {
      value: [
        {
          name: {
            value: "Alan",
            status: "",
            validationRules: "",
            validationError: "",
          },
        },
        {
          name: {
            value: "Mari",
            status: "",
            validationRules: "",
            validationError: "",
          },
        },
      ],
      status: "",
      validationError: "",
      validationRules: "",
    };
    return {
      user,
      success,
      items,
      paragraph,
      paragraph2,
      debug,
      show,
    };
  },
});
</script>
