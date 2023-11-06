<template>
  <template v-if="hasError">
    <slot name="fallback" v-bind="{ error, instance }">
      <component v-if="fallback" :is="fallback" />
    </slot>
  </template>
  <slot v-else />
</template>

<script lang="ts" setup>
import type { Component, ComponentPublicInstance } from "vue";
import { onErrorCaptured, ref } from "vue";

defineProps<{
  fallback?: Component;
}>();

const emit = defineEmits<{
  (event: "error", error: Error): void;
}>();

const hasError = ref(false);
const error = ref<Error>();
const instance = ref<ComponentPublicInstance | null>();

onErrorCaptured((err, ins) => {
  hasError.value = true;
  error.value = err;
  instance.value = ins;
  emit("error", err);

  return false;
});
</script>
