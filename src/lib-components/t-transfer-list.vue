<template>
  <div class="flex h-96 space-x-4">
    <div class="w-1/2 h-full overflow-auto border rounded bg-gray-100">
      <div class="bg-gray-200 p-2">
        <div class="-p-3">
          <t-input
            :label="`Itens Disponíveis (${computedOptions.length})`"
            @keydown.esc="searchTerm = ''"
            v-model="searchTerm"
          />
        </div>
      </div>
      <div
        v-show="computedOptions.length > 0"
        class="border-b border-t border-gray-300 p-2 w-full relative bg-gray-200"
        @mouseover="show['all'] = 1"
        @mouseout="show['all'] = 0"
      >
        TODOS
        <t-button
          class="absolute right-1 bottom-2"
          v-show="show['all']"
          @click="select('_all')"
          size="sm"
          >&gt;</t-button
        >
      </div>
      <div
        class="border-b p-2 w-full relative"
        @mouseover="show[item[key_name]] = 1"
        @mouseout="show[item[key_name]] = 0"
        v-for="item in computedOptions"
        :key="item[key_name]"
      >
        {{ title(item) }}
        <t-button
          class="absolute right-1 bottom-2"
          v-show="show[item[key_name]]"
          @click="select(item)"
          size="sm"
          >&gt;</t-button
        >
      </div>
    </div>
    <div class="w-1/2 border h-full overflow-auto rounded bg-gray-100">
      <div class="bg-gray-200 p-2">
        <div class="-p-3">
          <t-input
            :label="`Itens Selecionados (${modelValue.length})`"
            @keydown.esc="searchTerm2 = ''"
            v-model="searchTerm2"
          />
        </div>
      </div>
      <div
        v-show="selecteds.length > 0"
        class="border-b border-t border-gray-300 p-2 w-full relative bg-gray-200"
        @mouseover="show['none'] = 1"
        @mouseout="show['none'] = 0"
      >
        <t-button
          class="absolute left-1 bottom-2"
          v-show="show['none']"
          @click="unselect('_all')"
          size="sm"
          >&lt;</t-button
        >
        <span :class="{ 'ml-7': show['none'] }">TODOS</span>
      </div>
      <div
        class="border-b relative p-2"
        @mouseover="show[item[key_name]] = 1"
        @mouseout="show[item[key_name]] = 0"
        v-for="item in selecteds"
        :key="item[key_name]"
      >
        <t-button
          class="absolute left-1 bottom-2"
          v-show="show[item[key_name]]"
          @click="unselect(item)"
          size="sm"
          >&lt;</t-button
        >
        <span :class="{ 'ml-7': show[item[key_name]] }">{{ title(item) }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, PropType, computed } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<{ [key: string]: any }[]>,
      required: true,
    },
    options: {
      required: true,
      type: Array as PropType<{ [key: string]: any }[]>,
    },
    title: {
      type: Function,
      default: (item: any) => item.title,
    },
    key_name: {
      type: String,
      default: "id",
    },
  },
  setup(props, { emit }) {
    onMounted(() => {
      //
    });

    const show = ref({} as { [key: string | number]: number });
    const searchTerm = ref("");
    const searchTerm2 = ref("");

    const computedOptions = computed(() =>
      props.options
        .filter(
          (item) =>
            !props.modelValue
              .map((item) => item[props.key_name])
              .includes(item[props.key_name])
        )
        .filter((item) =>
          props.title(item).toLowerCase().includes(searchTerm.value.toLowerCase())
        )
    );

    const selecteds = computed(() =>
      props.modelValue.filter((item) =>
        props.title(item).toLowerCase().includes(searchTerm2.value.toLowerCase())
      )
    );

    const select = (item: { [key: string]: any } | string) => {
      if (typeof item === "string") {
        if (item === "_all") emit("update:modelValue", props.options);
        return;
      }

      let selected = props.modelValue;
      selected.push(item);
      emit("update:modelValue", selected);
    };
    const unselect = (item: { [key: string]: any } | string) => {
      if (typeof item === "string") {
        if (item === "_all") emit("update:modelValue", []);
        return;
      }

      let selected = props.modelValue;
      selected = selected.filter(
        (element) => element[props.key_name] != item[props.key_name]
      );
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
