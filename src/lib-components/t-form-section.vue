<template>
  <div class="text-lg text-blue-900 mb-2">
    {{ label }}
  </div>
  <div class="bg-white shadow-sm p-3 rounded mb-4 flex flex-wrap">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormSection",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
});
</script>
