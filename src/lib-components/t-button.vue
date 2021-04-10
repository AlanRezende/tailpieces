<template>
  <button
    class="mr-2 inline-block rounded text-white"
    :class="[sizeClass, colorClass]"
    type="button"
  >
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "TButton",
  props: {
    size: {
      type: String,
      default: "base",
    },
    color: {
      type: String,
      default: "blue",
    },
  },
  setup(props) {
    const sizeClass = computed(() => {
      let options: { [key: string]: string } = {
        sm: "text-sm px-2",
        base: "text-base px-4 py-1",
        lg: "text-lg px-8 py-2",
      };
      return options[props.size];
    });
    const colorClass = computed(() => {
      // 5 cores blue, green, yellow, red, gray
      // ou bg-indigo-400
      let options: { [key: string]: string } = {
        blue: "bg-blue-900",
        yellow: "bg-yellow-500",
        green: "bg-green-700",
        red: "bg-yellow-700",
        gray: "bg-gray-500",
      };
      if (props.color.split("-").length > 1) {
        return props.color;
      }
      return options[props.color];
    });

    return {
      sizeClass,
      colorClass,
    };
  },
});
</script>
