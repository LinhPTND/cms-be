<template>
  <div class="avatar">
    <a-avatar
      v-bind="$attrs"
      class="md:mr-2"
      :style="{ background: color ? color : '#f56a00' }"
      >{{ nameFace }}</a-avatar
    >
    <span v-if="name" class="hidden md:inline">{{ name }}</span>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    name: string;
    nameFace: string;
    color: string;
  }>(),
  {
    name: "",
    nameFace: "",
    color: "",
  }
);
</script>

<style lang="scss" scoped></style>
