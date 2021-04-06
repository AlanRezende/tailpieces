<template>
  <div ref="root" class="relative inline-block">
    <div @click="toggleDropdown" class="inline-block">
      <slot name="trigger">
        <button class="focus:outline-none hover:underline flex items-center">
          {{ label }}
          <svg
            fill="none"
            class="fill-current w-6 h-6 transition-all duration-500 ease-in-out"
            viewBox="0 0 24 24"
            :class="{ 'transform rotate-180': open }"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 9l6 6 6-6" />
          </svg></button
      ></slot>
    </div>
    <ul v-show="open" class="shadow rounded z-30 border bg-white absolute">
      <slot></slot>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    label: {
      type: String,
      default: "Opções"
    }
  },

  setup() {
    const open = ref(false);
    const root = ref();
    const toggleDropdown = () => {
      if (open.value) {
        document.removeEventListener("click", handleClicks);
      } else {
        document.addEventListener("click", handleClicks);
      }
      open.value = !open.value;
    };
    const handleClicks = (evt: Event) => {
      if (!root.value.contains(evt.target)) {
        toggleDropdown();
      }
    };

    return {
      open,
      toggleDropdown,
      root
    };
  }
});
</script>
