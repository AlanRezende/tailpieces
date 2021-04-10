<template>
  <div class="flex flex-col mb-4 w-full">
    <label>{{ label }}</label>
    <select v-model="formItem.value" class="p-2 border rounded" name="" id="">
      <option :value="item.value" v-for="item in items" :key="item.value">
        {{ item.name }}
      </option>
    </select>
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
      newVal => {
        if (
          typeof props.modelValue == "string" ||
          typeof props.modelValue == "number"
        ) {
          emit("update:modelValue", newVal.value);
        } else {
          emit("update:modelValue", newVal);
        }
      },
      { deep: true },
    );

    /**
     * Ajusta a prop modelValue ao receber mudanças
     */
    watch(
      () => props.modelValue,
      newVal => {
        adjustProps(newVal as string | formItem);
      },
      {
        deep: true,
      },
    );

    /**
     * Ajusta as props nos casos de string / number / object
     */
    const adjustProps = (
      value: string | formItem | number | boolean | undefined,
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
