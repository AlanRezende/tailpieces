<template>
  <div class="cursor-pointer flex flex-col">
    <label v-if="label">{{ label }}</label>
    <div class="flex items-center">
      <button
        class="rounded-full border-2 focus:outline-none mr-2"
        @click="$emit('update:modelValue', !modelValue)"
        :class="[
          {
            'border-green-500': modelValue,
            'border-gray-400': !modelValue
          },
          sizeClass.button
        ]"
      >
        <span
          class="top-1 transition-all duration-500 ease-in-out block rounded-full"
          :class="[
            {
              'bg-green-500': modelValue,
              'bg-gray-400': !modelValue
            },
            sizeClass.span
          ]"
        ></span>
      </button>
      <span
        v-if="title"
        :class="[
          {
            'text-green-500': modelValue,
            'text-gray-400': !modelValue
          },
          sizeClass.text
        ]"
      >
        {{ modelValue ? title[0] : title[1] }}
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    label: {
      type: String
    },
    size: {
      type: String,
      default: "base"
    },
    title: {
      type: Array as PropType<string[]>
    }
  },
  setup(props) {
    const sizeClass = computed(() => {
      let options: {
        [key: string]: { button: string; span: string; text: string };
      } = {
        sm: {
          button: "w-8 h-4",
          span: `h-2 w-2 ${props.modelValue ? "ml-4" : "ml-1"}`,
          text: "text-sm"
        },
        base: {
          button: "w-12 h-6",
          span: `h-4 w-4 ${props.modelValue ? "ml-6" : "ml-1"}`,
          text: "text-base"
        },
        lg: {
          button: "w-16 h-9",
          span: `h-6 w-6 ${props.modelValue ? "ml-8" : "ml-1"}`,
          text: "text-lg"
        }
      };
      return options[props.size];
    });

    return {
      sizeClass
    };
  }
});
</script>
