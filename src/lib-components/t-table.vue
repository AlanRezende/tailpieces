<template>
  <table class="border-collapse w-full">
    <thead>
      <tr class="sm:rounded-lg">
        <th
          v-for="coluna in colunas"
          :key="`coluna-${coluna.key}`"
          class="font-bold uppercase bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 hidden lg:table-cell"
          :class="[
            { 'p-1 text-xs': size == 'sm' },
            { 'p-3 text-sm': size == 'base' },
          ]"
        >
          {{ coluna.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        @click="emit('itemClick', { item, index })"
        v-for="(item, index) in value"
        :key="item.ukey"
        class="bg-white dark:bg-black lg:dark:hover:bg-gray-800 cursor-pointer lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
        :class="itemScopedClass(item)"
      >
        <td
          v-for="coluna in colunas"
          :key="`coluna-${coluna.key}`"
          class="w-full lg:w-auto text-gray-800 dark:text-gray-200 border border-b flex items-center lg:table-cell relative lg:static"
          :class="[{ 'p-1': size == 'sm' }, { 'p-3': size == 'base' }]"
        >
          <span
            class="lg:hidden inline-block mr-2 text-center top-0 left-0 w-1/4 bg-gray-100 px-2 py-1 text-xs font-bold uppercase"
          >
            {{ coluna.label }}
          </span>
          <div class="inline-block">
            <slot :name="coluna.key" :$item="item">
              {{ checkItem(item[coluna.key]) }}
            </slot>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { DefaultObjectInterface, FormItemInterface } from "@/types";

interface coluna {
  label: string;
  key: string;
  sortable?: boolean;
  sortable_default?: boolean;
  searchable?: boolean;
}

export default defineComponent({
  props: {
    value: {
      type: Object,
      required: true,
    },
    itemClass: {
      type: Object as PropType<{ [index: string]: string }>,
    },
    size: {
      type: String,
      default: "base",
    },
    header: {
      type: Object as PropType<{ [index: string]: string | coluna }>,
      required: true,
    },
  },
  setup(props, { emit, slots }) {
    const checkItem = (item: FormItemInterface | string) => {
      if (!item) {
        return "";
      }
      if (typeof item == "string") {
        return item;
      }
      return item.value;
    };

    const itemScopedClass = (item: DefaultObjectInterface) => {
      let newClass: { [index: string]: string } = {};
      if (typeof props.itemClass == "object") {
        Object.entries(props.itemClass).forEach(element => {
          if (item) {
            newClass[element[0]] = eval(element[1]);
          }
        });
        return newClass;
      }
    };

    const colunas = computed(
      (): Array<coluna> => {
        return Object.entries(props.header).map(([key, value]) => {
          if (typeof value == "string") {
            return {
              key: key,
              label: value,
            };
          }
          return { ...value, key };
        });
      },
    );

    return {
      colunas,
      itemScopedClass,
      checkItem,
      emit,
      slots,
    };
  },
});
</script>
