<template>
  <seciton class="block">
    <h2 class="text-xl">
      {{ title }}
    </h2>
    <p v-if="description" class="text-gray-400 -mt-2">
      {{ description }}
    </p>
    <slot />
  </seciton>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  description?: string;
}>();
</script>
