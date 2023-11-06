<template>
  <label class="inline-block">
    <a-switch v-bind="attrsWithoutClass"></a-switch>
    <span class="inline-block ml-2">
      <slot />
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { useAttrs } from "vue";

const attrs = useAttrs();
const attrsWithoutClass = computed(() => {
  return {
    ...attrs,
    class: undefined,
  };
});
</script>
