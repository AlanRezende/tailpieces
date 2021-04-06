<template>
  <li>
    <a
      v-if="type == 'link'"
      class="hover:bg-gray-100 px-4 py-1 block whitespace-nowrap"
      :href="href"
    >
      <slot></slot>
    </a>
    <hr v-else class="border-t mt-1 pt-1" />
  </li>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    type: {
      type: String,
      default: "link"
    },
    href: {
      type: String,
      default: "#"
    }
  }
});
</script>
