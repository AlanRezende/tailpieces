<template>
  <div v-if="show" class="relative border mb-4 p-3 rounded" :class="colorClass">
    <span class="absolute cursor-pointer right-2 top-1" @click="show = false"
      >X</span
    >
    <p v-if="info.title" class="text-lg font-bold">{{ info.title }}</p>
    <ul class="list-inside">
      <li
        :class="{ 'list-disc': info.title }"
        v-for="(item, index) in info.messages"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue";

export default defineComponent({
  props: {
    info: {
      type: Object as PropType<{ title?: string; messages: string[] }>,
      required: true
    },
    color: {
      type: String,
      default: "blue"
    }
  },
  setup(props) {
    let show = ref(true);

    const colorClass = computed(() => {
      let options: { [key: string]: string } = {
        red: "bg-red-100 text-red-900 border-red-300",
        blue: "bg-blue-100 text-blue-900 border-blue-300",
        yellow: "bg-yellow-100 text-yellow-900 border-yellow-300",
        green: "bg-green-100 text-green-900 border-green-300",
        gray: "bg-gray-50 text-gray-900 border-gray-300"
      };
      if (props.color.split("-").length > 1) {
        return props.color;
      }
      return options[props.color];
    });

    return {
      show,
      colorClass
    };
  }
});
</script>
