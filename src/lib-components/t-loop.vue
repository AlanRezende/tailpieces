<template>
  <div v-if="typeof data.value == 'object'">
    <slot
      :item="item"
      :index="index"
      :key="index"
      v-for="(item, index) in data.value"
    ></slot>
  </div>
</template>
<script lang="ts">
import { FormItemInterface } from "tailpieces";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<FormItemInterface>,
      required: true,
    },
  },
});
</script>
