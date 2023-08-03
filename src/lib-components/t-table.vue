<template>
  <table class="border-collapse w-full">
    <thead :class="headerClass">
      <tr class="sm:rounded-lg">
        <th
          v-if="isCheckboxTable"
          class="font-bold leading-none uppercase bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 hidden lg:table-cell w-5"
          :class="[
            { 'p-1 text-xs': size == 'sm' },
            { 'p-3 text-sm': size == 'base' },
          ]"
        >
          <input
            @change="selectAll"
            type="checkbox"
            class="text-gray-600"
            :class="[
              { 'h-4 w-4': size == 'sm' },
              { 'h-5 w-5': size == 'base' },
            ]"
            :disabled="totalCanSelect == 0"
            :checked="selectedItems.length > 0 && selectedItems.length == totalCanSelect"
          />
        </th>
        <th
          v-for="coluna in colunas.filter((col) => !col.abaixo)"
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
    <tbody v-for="(item, index) in value" :key="item.ukey">
      <tr
        @click="emit('itemClick', { item, index })"
        class="bg-white dark:bg-black lg:dark:hover:bg-gray-800 cursor-pointer lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
        :class="itemScopedClass(item)"
      >
        <td
          v-if="isCheckboxTable"
          class="leading-none lg:w-auto text-gray-800 dark:text-gray-200 border border-b flex items-center lg:table-cell relative lg:static w-full"
          :class="[{ 'p-1': size == 'sm' }, { 'p-3': size == 'base' }]"
          @click.stop=""
        >
        <div class="inline-block">
          <input
            @change="updateSelected(item)"
            type="checkbox"
            :disabled="!canSelect(item)"
            class="text-gray-600"
            :class="[
              { 'h-4 w-4': size == 'sm' },
              { 'h-5 w-5': size == 'base' },
            ]"
            :checked="checkSelected(item)"
          />
          </div>
        </td>
        <td
          v-for="coluna in colunas.filter((col) => !col.abaixo)"
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
      <tr v-if="colunas.filter((col) => !!col.abaixo).length > 0">
        <td
          v-for="coluna in colunas.filter(
            (col) =>
              !!col.abaixo &&
              (typeof col.showCallback === 'function'
                ? col.showCallback(item)
                : true)
          )"
          :key="`coluna-${coluna.key}`"
          class="w-full text-gray-800 dark:text-gray-200 border border-b items-center relative"
          :class="`${size == 'sm' && 'p-1'} ${size == 'base' && 'p-3'} `"
          :colspan="coluna.colspan || 1"
        >
          <div class="flex">
            <span
              class="inline-block mr-2 text-center top-0 left-0 w-1/4 bg-gray-100 px-2 py-1 text-xs font-bold uppercase"
            >
              {{ coluna.label }}
            </span>
            <div class="inline-block grow">
              <slot :name="coluna.key" :$item="item">
                {{ checkItem(item[coluna.key]) }}
              </slot>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  onMounted,
  watch,
} from "vue";
import { DefaultObjectInterface, FormItemInterface } from "@/types";

interface coluna {
  label: string;
  key: string;
  sortable?: boolean;
  sortable_default?: boolean;
  searchable?: boolean;
  abaixo?: boolean;
  showCallback?: (item: any) => boolean;
  colspan?: string;
}

export default defineComponent({
  props: {
    value: {
      type: Array,
      required: true,
    },
    modelValue: {
      default: false,
      type: [Boolean, Array],
      required: false,
    },
    canSelect: {
      type: Function,
      default: () => {
        return true
      },
    },
    itemClass: {
      type: Object as PropType<{ [index: string]: string }>,
    },
    headerClass: {
      type: String,
      required: false,
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

    const selectedItems: any = ref([]);
    const itemScopedClass = (item: DefaultObjectInterface) => {
      let newClass: { [index: string]: string } = {};
      if (typeof props.itemClass == "object") {
        Object.entries(props.itemClass).forEach((element) => {
          //const isSelected = selectedItems.value.findIndex(item) >= 0;
          if (item) {
            if (typeof element[1] === "function") {
              const cfn = element[1] as (item: any) => string;
              newClass[element[0]] = cfn(item);
            } else {
              newClass[element[0]] = eval(element[1]);
            }
          }
        });
        return newClass;
      }
    };

    const colunas = computed((): Array<coluna> => {
      return Object.entries(props.header).map(([key, value]) => {
        if (typeof value == "string") {
          return {
            key: key,
            label: value,
          };
        }
        return { ...value, key };
      });
    });

    const isCheckboxTable: any = ref(false);
    const updateSelected = (item: any) => {
      if (!checkSelected(item)) {
        selectedItems.value.push(item);
      } else {
        selectedItems.value.splice(selectedItems.value.indexOf(item), 1);
      }
      emit("update:modelValue", selectedItems.value);
    };

    const selectAll = () => {
      if (selectedItems.value.length == totalCanSelect.value) {
        selectedItems.value = [];
      } else {
        selectedItems.value = [...props.value.filter(i => props.canSelect(i))];
      }
      emit("update:modelValue", selectedItems.value);
    };

    const checkSelected = (item: any) =>
      selectedItems.value.some(
        (e: any) => JSON.stringify(item) == JSON.stringify(e)
      );

    watch(
      () => props.modelValue,
      (newVal: any) => {
        selectedItems.value = processSelected(newVal);
      }
    );

    const processSelected = (val: any) => {
      if (typeof val == 'boolean') {
        return val;
      }
      return val.filter((i:any) => props.canSelect(i));
    }

    onMounted(() => {
      selectedItems.value = processSelected(props.modelValue);
      if (props.modelValue) {
        isCheckboxTable.value = true;
      }
    });

    const totalCanSelect = computed((): number => {
      if (!props.modelValue) return 0;
      return props.value.filter(i => props.canSelect(i)).length;
    });

    return {
      colunas,
      itemScopedClass,
      checkItem,
      emit,
      slots,
      updateSelected,
      isCheckboxTable,
      checkSelected,
      selectAll,
      selectedItems,
      totalCanSelect,
    };
  },
});
</script>
