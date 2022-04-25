<template>
  <div class="flex flex-col mb-4 relative w-full">
    <label>{{ label }}</label>
    <div v-if="imagePreview || placeholder" class="relative h-32 w-32">
      <img
        :src="imagePreview ? imagePreview : placeholder"
        @click="open"
        class="bg-gray-100 cursor-pointer flex h-32 hover:bg-gray-200 hover:opacity-100 items-center justify-center rounded w-32 opacity-90 object-contain"
      />
      <span
        v-if="imagePreview ? true : false"
        @click="clear"
        class="absolute bg-gray-900 bg-opacity-50 border cursor-pointer flex h-6 hover:opacity-100 items-center justify-center opacity-40 right-1 rounded-full text-sm text-white top-1 w-6"
        >X</span
      >
    </div>
    <div
      v-else
      @click="open"
      class="bg-gray-100 cursor-pointer flex h-32 hover:bg-gray-200 items-center justify-center rounded w-32"
    >
      Selecionar
    </div>
    <input type="file" @change="adjustImage" class="hidden" ref="imageField" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      required: true,
    },
    placeholder: {
      type: String,
    },
    validationRules: {
      type: String,
      default: "",
    },
  },
  setup(_props, { emit }) {
    const imageField = ref();
    const imagePreview = ref();
    const image = ref();

    const formItem = ref("");

    watch(
      image,
      (newVal) => {
        emit("update:modelValue", newVal);
      },
      { deep: true }
    );

    const open = () => {
      imageField.value.click();
    };

    const clear = () => {
      imagePreview.value = "";
      image.value = "";
    };

    const adjustImage = (event: Event) => {
      let fileList = (event.target as HTMLInputElement).files;
      if (!fileList) {
        return;
      }
      let file = fileList[0];

      let maxWidth = 900;
      let maxHeight = 900;

      //Instancia o file reader para ler o arquivo
      let reader = new FileReader();
      reader.onloadend = () => {
        imagePreview.value = reader.result;
        // Cria uma div com um canvas dentro para redimensionar a imagem
        let wrap = document.createElement("div");
        let resizeArea = document.createElement("canvas");
        wrap.appendChild(resizeArea);
        wrap.id = "wrap-imageupload-resize-area";
        wrap.style.position = "relative";
        wrap.style.overflow = "hidden";
        wrap.style.width = "0";
        wrap.style.height = "0";
        resizeArea.id = "imageupload-resize-area";
        resizeArea.style.position = "absolute";
        document.body.appendChild(wrap);

        // Cria a imagem que servirá de referencia para o redimensionamento
        let oImg = document.createElement("img");
        oImg.id = "img-resize";
        oImg.src = imagePreview.value;

        // Ao carregar a imagem pega os tamanhos h e w e executa o redimensionamento
        oImg.onload = () => {
          let resizeMaxWidth = maxWidth * 1.6;
          let resizeMaxHeight = maxHeight * 1.6;

          let height = oImg.height;
          let width = oImg.width;

          if (width > resizeMaxWidth) {
            height = Math.round((height * resizeMaxWidth) / width);
            width = resizeMaxWidth;
          }

          if (height > resizeMaxHeight) {
            width = Math.round((width * resizeMaxHeight) / height);
            height = resizeMaxHeight;
          }

          resizeArea.width = width;
          resizeArea.height = height;

          //draw image on canvas
          const ctx = resizeArea.getContext("2d") as CanvasRenderingContext2D;
          ctx.drawImage(oImg, 0, 0, width, height);

          // Salva a imagem de preview
          imagePreview.value = resizeArea.toDataURL("image/jpeg", 0.95);

          //Salva a imagem como arquivo
          resizeArea.toBlob(
            (blob) => {
              image.value = blob;
            },
            "image/jpeg",
            0.95
          );
        };
      };
      reader.readAsDataURL(file);
    };

    onMounted(() => {
      // formItem.value = props.modelValue;
    });

    return {
      adjustImage,
      imagePreview,
      open,
      imageField,
      clear,
      formItem,
    };
  },
});
</script>
