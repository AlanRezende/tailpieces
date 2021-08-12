<template>
  <div class="flex h-64 space-x-4">
    <div class="w-1/2 h-full overflow-scroll border rounded bg-gray-100">
      <div class="bg-gray-200 p-2">
        Itens Disponíveis ({{ computedOptions.length }})
        <br />
        <t-input @keydown.esc="searchTerm = ''" v-model="searchTerm" />
      </div>
      <div
        class="border-b p-2"
        @mouseover="show[item.id] = 1"
        @mouseout="show[item.id] = 0"
        v-for="item in computedOptions"
        :key="item.id"
      >
        {{ title(item) }}
        <t-button v-show="show[item.id]" @click="select(item)" size="sm"
          >&gt;</t-button
        >
      </div>
    </div>
    <div class="w-1/2 border h-full overflow-scroll rounded bg-gray-100">
      <div class="bg-gray-200 p-2">
        Itens Selecionados ({{ modelValue.length }})
        <br />
        <t-input @keydown.esc="searchTerm2 = ''" v-model="searchTerm2" />
      </div>
      <div
        class="border-b p-2"
        @mouseover="show[item.id] = 1"
        @mouseout="show[item.id] = 0"
        v-for="item in selecteds"
        :key="item.id"
      >
        <t-button v-show="show[item.id]" @click="unselect(item)" size="sm"
          >&lt;</t-button
        >
        {{ title(item) }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, PropType, computed } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<{ name: string; id: number }[]>,
      required: true,
    },
    options: {
      required: true,
      type: Array as PropType<{ name: string; id: number }[]>,
    },
    title: {
      type: Function,
      default: (item: any) => item.title,
    },
  },
  setup(props, { emit }) {
    onMounted(() => {
      console.log(props.modelValue, props.options);
    });

    const show = ref([] as number[]);
    const searchTerm = ref("");
    const searchTerm2 = ref("");

    const computedOptions = computed(() =>
      props.options
        .filter(
          item => !props.modelValue.map(item => item.id).includes(item.id),
        )
        .filter(item =>
          props
            .title(item)
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase()),
        ),
    );

    const selecteds = computed(() =>
      props.modelValue.filter(item =>
        props
          .title(item)
          .toLowerCase()
          .includes(searchTerm2.value.toLowerCase()),
      ),
    );

    const select = (item: { id: number; name: string }) => {
      let selected = props.modelValue;
      selected.push(item);
      console.log(select);
      emit("update:modelValue", selected);
    };
    const unselect = (item: { id: number; name: string }) => {
      let selected = props.modelValue;
      selected = selected.filter(element => element.id != item.id);
      emit("update:modelValue", selected);
    };

    return {
      computedOptions,
      selecteds,
      show,
      select,
      unselect,
      searchTerm,
      searchTerm2,
    };
  },
});
</script>
