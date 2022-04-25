<template>
  <div class="flex flex-col px-3 py-2 w-full" :class="tclass">
    <label>{{ label }}</label>
    <div class="relative">
      <select
        v-model="formItem.value"
        class="p-2 w-full border rounded appearance-none"
        name=""
        id=""
        v-bind="$attrs"
      >
        <option :value="item.value" v-for="item in items" :key="item.value">
          {{ item.name }}
        </option>
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class="fill-current h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, watch } from "vue";
interface formItem {
  value: string | number | boolean | undefined;
  validationRules: string;
  validationError: string;
  status: string;
}
export default defineComponent({
  name: "BaseSelect",
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      required: true,
    },
    items: {
      type: Array as PropType<{ name: string; value: string | number }[]>,
      required: true,
    },
    tclass: {
      type: String,
    },
  },
  setup(props, { emit }) {
    /**
     * Construção de um formItem vazio
     */
    let formItem = ref({
      value: "",
      validationRules: "",
      validationError: "",
      status: "pristine",
    } as formItem);

    /**
     * Verifica de forma profunda o formItem
     * e emite o event para atualização no pai
     */
    watch(
      formItem,
      (newVal) => {
        if (
          typeof props.modelValue == "string" ||
          typeof props.modelValue == "number"
        ) {
          emit("update:modelValue", newVal.value);
        } else {
          emit("update:modelValue", newVal);
        }
      },
      { deep: true }
    );

    /**
     * Ajusta a prop modelValue ao receber mudanças
     */
    watch(
      () => props.modelValue,
      (newVal) => {
        adjustProps(newVal as string | formItem);
      },
      {
        deep: true,
      }
    );

    /**
     * Ajusta as props nos casos de string / number / object
     */
    const adjustProps = (
      value: string | formItem | number | boolean | undefined
    ) => {
      if (
        typeof value == "string" ||
        typeof value == "number" ||
        typeof value == "boolean" ||
        typeof value == "undefined"
      ) {
        formItem.value.value = value;
        // formItem.value.validationRules = props.validationRules;
      } else {
        formItem.value = value as formItem;
        // if (props.validationRules != "") {
        //   formItem.value.validationRules = props.validationRules;
        // }
      }
    };
    /**
     * Ajusta as props ao inicializar o componente
     */
    onMounted(() => {
      adjustProps(props.modelValue as string | formItem);
    });

    return {
      formItem,
    };
  },
});
</script>
