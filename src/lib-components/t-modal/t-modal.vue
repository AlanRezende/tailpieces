<template>
  <teleport to="#modals-target">
    <transition leave-active-class="duration-200">
      <div
        v-show="show"
        class="fixed top-0 inset-x-0 mx-2 sm:flex sm:items-top sm:justify-center"
      >
        <transition
          enter-active-class="ease-out duration-300"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in duration-200"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-show="show"
            class="fixed inset-0 transform transition-all"
            @click="close"
          >
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
        </transition>

        <div
          class="absolute h-screen w-full flex justify-center overflow-scroll"
        >
          <transition
            enter-active-class="ease-out duration-300"
            enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="ease-in duration-200"
            leave-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            v-on:enter="shown"
          >
            <div
              v-show="show"
              @click.stop
              class="absolute my-6 bg-white rounded-lg overflow-visible shadow-xl transform transition-all sm:w-full"
              :class="maxWidthClass"
            >
              <slot></slot>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, watch, computed, onMounted } from "vue";

export default defineComponent({
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
  setup(props, { emit }) {
    const close = () => {
      if (props.closeable) {
        emit("close");
      }
    };
    const shown = () => {
      emit("shown");
    };

    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && props.show) {
        close();
      }
    };

    const maxWidthClass = computed((): string => {
      const options: { [key: string]: string } = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "4xl": "sm:max-w-4xl",
      };
      return options[props.maxWidth];
    });

    onMounted(() => {
      document.addEventListener("keydown", closeOnEscape);
    });

    onUnmounted(() => {
      document.removeEventListener("keydown", closeOnEscape);
    });

    watch(
      () => props.show,
      (newVal) => {
        if (newVal) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      },
      {
        immediate: true,
      }
    );
    return {
      maxWidthClass,
      shown,
    };
  },
});
</script>
