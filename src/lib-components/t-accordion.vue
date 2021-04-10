<template>
  <div class="rounded border">
    <div
      @click="open = !open"
      class="cursor-pointer rounded-t bg-gray-100 p-1 px-2"
    >
      {{ label }}
    </div>
    <div class="overflow-hidden">
      <transition name="fade">
        <div
          v-if="open"
          class="transition-all rounded-b ease-in-out overflow-hidden origin-top"
        >
          <div class="p-2">
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TAccordion",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  setup() {
    let open = ref(false);

    return {
      open,
    };
  },
});
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
</style>
