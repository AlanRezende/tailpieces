<template>
  <t-modal
    :show="show"
    @shown="shown"
    :max-width="maxWidth"
    :closeable="closeable"
    @close="close"
  >
    <div class="px-6 py-4">
      <div v-if="slots.title" class="text-lg mb-4">
        <slot name="title"> </slot>
      </div>

      <div style="max-height: calc(100vh - 200px);overflow-y: scroll;">
        <slot> </slot>
      </div>
    </div>

    <div v-if="slots.footer" class="px-6 py-4 bg-gray-100 text-right rounded-b-lg">
      <slot name="footer"> </slot>
    </div>
  </t-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TModal from "./t-modal.vue";

export default defineComponent({
  components: {
    TModal,
  },
  props: {
    show: {
      default: false,
    },
    maxWidth: {
      default: "2xl",
    },
    closeable: {
      default: true,
    },
  },
  emits: ["shown", "close"],
  setup(_props, { emit, slots }) {
    const close = () => {
      emit("close");
    };

    const shown = () => {
      emit("shown");
    };

    return {
      shown,
      close,
      slots,
    };
  },
});
</script>
