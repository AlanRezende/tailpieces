<template>
  <div id="app">
    <t-alert :info="success" color="red" />
    <t-alert :info="success" color="green" />
    <t-alert :info="success" />
    <t-transfer-list
      :title="(item) => item.name"
      key_name="ukey"
      :options="options"
      v-model="selecteds"
    />
    <t-button @click="modalTTransferListShow = true">TTransferList</t-button>
    <t-dialog-modal max-width="4xl" :show="modalTTransferListShow">
      <t-transfer-list
        :title="(item) => item.name"
        key_name="ukey"
        :options="options"
        v-model="selecteds"
      />
      <t-button class="mt-4" @click="modalTTransferListShow = false">Fechar</t-button>
    </t-dialog-modal>
    <t-form-section label="Seção Tabela">
      <div class="bg-gray-200 w-full p-4">
        <t-table
          @itemClick="debug($event.item)"
          headerClass="sticky top-0"
          :itemClass="{
            'bg-red-100 lg:hover:bg-red-300': 'item.postID == \'277\'',
            'bg-yellow-100': isSelected,
          }"
          :value="dataTable"
          :canSelect="canSelect"
          :header="{
            postID: 'ID do Post',
            nome: 'Nome',
            link: 'Link',
          }"
          v-model="tableSelecteds"
        ></t-table>
        <div class="my-4">
          <t-button @click="debugTable('')">Debug</t-button>
          <t-button @click="debugTable('clear')">Limpar</t-button>
        </div>

        <t-table
          size="sm"
          :itemClass="{
            'bg-red-100 lg:hover:bg-red-300': 'item.postID == \'277\'',
          }"
          @itemClick="debug($event.item)"
          :value="dataTable"
          :header="{
            postID: 'ID do Post',
            nome: 'Nome',
            imagem_grande: 'Imagem',
            link: 'Link',
            actions: 'Ações',
            justificativa: {
              label: 'Justificativa',
              abaixo: true,
              showCallback: clsCallbackJustificativa,
              colspan: '10',
            },
          }"
        >
          <template #link="{ $item }">Link é {{ $item.link }} </template>
          <template #imagem_grande>Texto Qualquer</template>
          <template #justificativa>Justificativa</template>
          <template #actions="{ $item }"
            ><t-button
              size="sm"
              class="m-2"
              @click.stop="debug({ nome: 'asdasd' })"
              >{{ $item.postID }}</t-button
            >
          </template>
        </t-table>
        <br />
        <t-button @click="debug">Debug</t-button>
        <t-button color="yellow" @click="debug">Debug</t-button>
        <t-button color="red" @click="debug">Debug</t-button>
        <t-button color="gray" @click="debug">Debug</t-button>
        <t-button color="green" @click="debug">Debug</t-button>
        <t-button @click="debug" disabled>Debug</t-button>
        <t-button color="yellow" @click="debug" disabled>Debug</t-button>
        <t-button color="red" @click="debug" disabled>Debug</t-button>
        <t-button color="gray" @click="debug" disabled>Debug</t-button>
        <t-button color="green" @click="debug" disabled>Debug</t-button>
      </div>
    </t-form-section>
    <t-form-section class="-m-3" label="Seção Teste">
      <t-input
        tclass="md:w-2/4"
        label="Nome"
        :maxlength="100"
        v-model="user.data.name"
      />
      <t-input
        tclass="md:w-2/4"
        label="Nome"
        :maxlength="100"
        v-model="user.data.name"
      />
      <t-input
        tclass="md:w-2/4"
        label="Nome"
        :maxlength="100"
        v-model="user.data.name"
      />
      <t-select
        tclass="md:w-1/4"
        label="Ativo"
        disabled
        :items="[
          { name: 'Sim', value: true },
          { name: 'Não', value: false },
        ]"
        v-model="user.data.active.value"
      ></t-select>
      <t-input
        tclass="md:w-2/4"
        label="Nome"
        :maxlength="100"
        v-model="user.data.name"
      />
      <t-input
        label="Número"
        min="30"
        tclass="md:w-1/4"
        type="number"
        v-model="user.data.age"
      />

      <t-image-input label="Imagem" v-model="user.data.image.value" />
      <t-button @click="debug">Debug</t-button>
      <t-button @click="show = true">Modal</t-button>
      <t-select
        tclass="md:w-1/2"
        label="Ativo Teste"
        :items="[
          { name: 'Sim', value: true },
          { name: 'Não', value: false },
        ]"
        v-model="user.data.active.value"
      ></t-select>
      <t-toggle
        v-model="user.data.new.value"
        label="Status"
        @change="logChange"
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
        <t-dropdown listClass="bg-red-100 md:bottom-8 right-0 md:right-auto ">
          <template v-slot:trigger>
            <t-button size="sm" color="gray">Mais Opções 1</t-button>
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

        <t-dropdown align="r" label="Mais ações">
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
      <template #title>
        <t-button @click="show = false"> Fechar </t-button>
      </template>
      Integer imperdiet sagittis ante, vitae maximus nibh mattis quis. Proin congue finibus turpis at tincidunt. Curabitur lacinia, leo quis pharetra maximus, ipsum lorem dignissim magna, eget maximus turpis sem eget odio. Curabitur quis mauris suscipit, egestas nisi non, vehicula lacus. Fusce dignissim eget nulla eget cursus. In vel rhoncus nibh. Integer efficitur risus quis enim blandit, lobortis venenatis purus tristique. Maecenas at orci a risus fermentum placerat a lacinia nisi. Sed luctus blandit velit. Integer purus risus, fringilla ac congue eu, bibendum at magna. Suspendisse commodo at risus at hendrerit. Integer ut nibh ac quam tincidunt cursus. Nulla convallis tincidunt venenatis. Donec eu feugiat justo. Mauris vel imperdiet turpis.
      Integer imperdiet sagittis ante, vitae maximus nibh mattis quis. Proin congue finibus turpis at tincidunt. Curabitur lacinia, leo quis pharetra maximus, ipsum lorem dignissim magna, eget maximus turpis sem eget odio. Curabitur quis mauris suscipit, egestas nisi non, vehicula lacus. Fusce dignissim eget nulla eget cursus. In vel rhoncus nibh. Integer efficitur risus quis enim blandit, lobortis venenatis purus tristique. Maecenas at orci a risus fermentum placerat a lacinia nisi. Sed luctus blandit velit. Integer purus risus, fringilla ac congue eu, bibendum at magna. Suspendisse commodo at risus at hendrerit. Integer ut nibh ac quam tincidunt cursus. Nulla convallis tincidunt venenatis. Donec eu feugiat justo. Mauris vel imperdiet turpis.
      Integer imperdiet sagittis ante, vitae maximus nibh mattis quis. Proin congue finibus turpis at tincidunt. Curabitur lacinia, leo quis pharetra maximus, ipsum lorem dignissim magna, eget maximus turpis sem eget odio. Curabitur quis mauris suscipit, egestas nisi non, vehicula lacus. Fusce dignissim eget nulla eget cursus. In vel rhoncus nibh. Integer efficitur risus quis enim blandit, lobortis venenatis purus tristique. Maecenas at orci a risus fermentum placerat a lacinia nisi. Sed luctus blandit velit. Integer purus risus, fringilla ac congue eu, bibendum at magna. Suspendisse commodo at risus at hendrerit. Integer ut nibh ac quam tincidunt cursus. Nulla convallis tincidunt venenatis. Donec eu feugiat justo. Mauris vel imperdiet turpis.
      Integer imperdiet sagittis ante, vitae maximus nibh mattis quis. Proin congue finibus turpis at tincidunt. Curabitur lacinia, leo quis pharetra maximus, ipsum lorem dignissim magna, eget maximus turpis sem eget odio. Curabitur quis mauris suscipit, egestas nisi non, vehicula lacus. Fusce dignissim eget nulla eget cursus. In vel rhoncus nibh. Integer efficitur risus quis enim blandit, lobortis venenatis purus tristique. Maecenas at orci a risus fermentum placerat a lacinia nisi. Sed luctus blandit velit. Integer purus risus, fringilla ac congue eu, bibendum at magna. Suspendisse commodo at risus at hendrerit. Integer ut nibh ac quam tincidunt cursus. Nulla convallis tincidunt venenatis. Donec eu feugiat justo. Mauris vel imperdiet turpis.
      Integer imperdiet sagittis ante, vitae maximus nibh mattis quis. Proin congue finibus turpis at tincidunt. Curabitur lacinia, leo quis pharetra maximus, ipsum lorem dignissim magna, eget maximus turpis sem eget odio. Curabitur quis mauris suscipit, egestas nisi non, vehicula lacus. Fusce dignissim eget nulla eget cursus. In vel rhoncus nibh. Integer efficitur risus quis enim blandit, lobortis venenatis purus tristique. Maecenas at orci a risus fermentum placerat a lacinia nisi. Sed luctus blandit velit. Integer purus risus, fringilla ac congue eu, bibendum at magna. Suspendisse commodo at risus at hendrerit. Integer ut nibh ac quam tincidunt cursus. Nulla convallis tincidunt venenatis. Donec eu feugiat justo. Mauris vel imperdiet turpis.
      <template #footer>
        <t-button @click="show = false"> Fechar </t-button>
      </template>
    </t-dialog-modal>
  </div>
  <div id="modals-target"></div>
</template>
<script lang="ts">
import { FormItemInterface } from "tailpieces";
import { defineComponent, ref, watch } from "vue";
import { Form } from "@/entry.esm";
import { DefaultObjectInterface } from "@/types";
export default defineComponent({
  name: "ServeDev",
  setup() {
    let user = ref(
      new Form(
        {
          name: "Alan Rezende",
          age: 32,
          image: null,
          active: true,
          new: false,
        },
        {
          name: "required",
        }
      )
    );

    watch(
      user,
      () => {
        console.log(user.value);

        // (user.value as any).data.name = "Alan";
        user.value.syncRules();
      },
      { deep: true }
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
      })
    );
    const logChange = () => {
      console.log(user.value.data.new.value);
    };
    const paragraph2 = ref(
      "Nunc lobortis in nisi eget volutpat. In nec diam id purus ultrices sagittis a in ante. Pellentesque accumsan, lacus vel molestie interdum, justo nibh malesuada ante, at varius lectus erat vehicula quam. Suspendisse molestie mauris erat, id porttitor ex cursus quis. Aliquam quis diam vel nisl maximus egestas in a sapien. Etiam vel lobortis nibh, a gravida ante. Fusce vehicula neque a blandit lacinia. Sed tincidunt tellus quis elit vulputate pharetra. Phasellus porttitor felis eget dignissim iaculis. Sed ac iaculis diam, ac mollis leo. Pellentesque finibus augue elit. Maecenas facilisis, tellus sed porttitor convallis, orci lorem venenatis justo, in volutpat ipsum nisi consectetur ante. Nam quis hendrerit orci, non fringilla metus. Cras at enim fringilla, semper ligula ut, pretium turpis."
    );
    const debug = (data: DefaultObjectInterface) => {
      console.log(data);
    };

    const options = [
      {
        name: "Alan",
        ukey: "asd12",
      },
      {
        name: "Mari",
        ukey: "asd13",
      },
      {
        name: "John",
        ukey: "asd14",
      },
    ];

    const selecteds = ref([]);

    const debugTable = (action: string) => {
      if (action == "clear") {
        tableSelecteds.value = [];
      }
    };

    const showSelected = (i: any) => {
      console.log(i);
    };
    const dataTable = ref([
      {
        postID: "277",
        nome: "asdasdasddddd",
        conteudo:
          '<p><em>asdasdsad</em></p><p><br></p><p><br></p><p><br></p><p><a href="asdad" rel="noopener noreferrer" target="_blank"><u>asdasdad</u></a></p>',
        chamada: null,
        link: "",
        tipo: "noticia",
        dataCriado: "2021-04-14 19:43:15",
        pai: null,
        destaque: "0",
        codigo: "",
        status: null,
        slug: null,
        imagem_pequena_path: "/public//imagens-posts/277_p.jpg?1618612470",
        imagem_grande_path: "/public//imagens-posts/277_g.jpg?1618612470",
      },
      {
        postID: "276",
        nome: "teste",
        conteudo: "<p>asdadasdasdasdasd</p>",
        chamada: null,
        link: "adasdasd",
        tipo: "noticia",
        dataCriado: "2021-04-14 19:41:01",
        pai: null,
        destaque: "0",
        codigo: "",
        status: null,
        slug: null,
        imagem_pequena_path: "/public//imagens-posts/276_p.jpg?1618612470",
        imagem_grande_path: "/public//imagens-posts/276_g.jpg?1618612470",
      },
      {
        postID: "274",
        nome: "asdasd222222",
        conteudo: "<p><strong>sadasdas</strong></p>",
        chamada: null,
        link: "asdasdasd",
        tipo: "noticia",
        dataCriado: "2021-04-13 17:10:08",
        pai: null,
        destaque: "0",
        codigo: "",
        status: null,
        slug: null,
        imagem_pequena_path: "/public//imagens-posts/274_p.jpg?1618612470",
        imagem_grande_path: "/public//imagens-posts/274_g.jpg?1618612470",
      },
      {
        postID: "273",
        nome: "asdasd",
        conteudo: '<p><span style="color: rgb(230, 0, 0);">sadasd</span></p>',
        chamada: null,
        link: "asdasd",
        tipo: "noticia",
        dataCriado: "2021-04-12 19:36:51",
        pai: null,
        destaque: "0",
        codigo: "",
        status: null,
        slug: null,
        imagem_pequena_path: "/public//imagens-posts/273_p.jpg?1618612470",
        imagem_grande_path: "/public//imagens-posts/273_g.jpg?1618612470",
      },
    ]);
    const tableSelecteds = ref([] as any);
    tableSelecteds.value = [dataTable.value[1], dataTable.value[2]];

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

    const modalTTransferListShow = ref(false);

    const canSelect = (item: any) => item.postID > 274;

    return {
      user,
      success,
      logChange,
      items,
      paragraph,
      paragraph2,
      debug,
      show,
      dataTable,
      options,
      selecteds,
      tableSelecteds,
      showSelected,
      debugTable,
      canSelect,
      isSelected: (_item: any, _isSelected: boolean) => true,
      clsCallbackJustificativa: (item: any) => {
        console.log("called callback", item.postID == "277");
        return item.postID == "277";
      },
      modalTTransferListShow,
    };
  },
});
</script>
