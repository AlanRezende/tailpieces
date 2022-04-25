<template>
  <div class="flex flex-col py-2 px-3 relative w-full" :class="tclass">
    <label>{{ label }}</label>
    <div class="relative w-full flex flex-col">
      <textarea
        v-if="type == 'textarea'"
        class="p-2 border rounded"
        :class="{ 'border-red-800': formItem.validationError }"
        :type="type"
        :rows="rows"
        :maxlength="maxlength"
        :placeholder="label"
        @blur="validate"
        @keydown="formItem.validationError = ''"
        v-model="formItem.value"
        v-bind="$attrs"
      ></textarea>
      <input
        v-else
        class="p-2 border rounded"
        :class="{ 'border-red-800': formItem.validationError }"
        :type="type"
        :maxlength="maxlength"
        :placeholder="label"
        @blur="validate"
        @keydown="formItem.validationError = ''"
        v-model="formItem.value"
        v-bind="$attrs"
      />
      <span
        class="absolute right-0 text-xs -top-4 text-gray-500"
        v-if="maxlengthLeft != null && maxlengthLeft >= 0"
      >
        Restam {{ maxlengthLeft }} caracteres
      </span>
    </div>
    <span class="text-red-800 text-sm ml-0.5">{{
      formItem.validationError
    }}</span>
  </div>
</template>

<script lang="ts">
import { Validator } from "@/lib-classes";
import { defineComponent, ref, watch, onMounted, computed } from "vue";
interface formItem {
  value: string | number | boolean | undefined;
  validationRules: string;
  validationError: string;
  status: string;
}
export default defineComponent({
  name: "BaseInput",
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      // type: [Object, String, Number, Boolean, undefined],
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    rows: {
      type: Number,
      default: 3,
    },
    validationRules: {
      type: String,
      default: "",
    },
    tclass: {
      type: String,
    },
    maxlength: {
      type: Number,
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

    let maxlengthLeft = computed(() => {
      if (
        typeof formItem.value.value == "string" &&
        props.maxlength &&
        props.maxlength > 0
      ) {
        return props.maxlength - formItem.value.value.length;
      }
      return null;
    });

    /**
     * Valida os dados baseados nas regras de validationRules
     */
    const validate = () => {
      let validator = new Validator();
      formItem.value.validationError = validator.validate(
        formItem.value.value,
        formItem.value.validationRules
      );
    };

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
        formItem.value.validationRules = props.validationRules;
      } else {
        formItem.value = value as formItem;
        if (props.validationRules != "") {
          formItem.value.validationRules = props.validationRules;
        }
      }
    };
    /**
     * Ajusta as props ao inicializar o componente
     */
    onMounted(() => {
      adjustProps(props.modelValue as string | formItem);
    });

    /**
     * Retorna os dados para o template
     */
    return {
      formItem,
      validate,
      maxlengthLeft,
    };
  },
});
</script>
