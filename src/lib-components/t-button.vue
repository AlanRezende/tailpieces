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
        blue: "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700",
        yellow:
          "bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-700",
        green:
          "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800",
        red: "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800",
        gray: "bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700",
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
