<template>
  <LoadingGlobal :spinning="spinning">
    <slot />
  </LoadingGlobal>
</template>

<script lang="ts" setup>
import { loadingInjectKey } from "@/core/loading/useLoading";
import LoadingGlobal from "@/shared/loading/LoadingGlobal.vue";
import { provide, ref } from "vue";

const spinning = ref(false);
const loadingCount = ref(0);

const startLoading = () => {
  spinning.value = true;

  loadingCount.value++;
};

const stopLoading = () => {
  loadingCount.value--;
  if (loadingCount.value >= 1) {
    return;
  }

  spinning.value = false;
  loadingCount.value = 0;
};

provide(loadingInjectKey, {
  startLoading,
  stopLoading,
});
</script>
