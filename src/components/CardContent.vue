<template>
  <div class="card">
    <div v-if="$slots.header" class="card__header">
      <slot name="header"></slot>
    </div>
    <div class="p-5">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.card {
  background: #ffffff;
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  position: relative;

  &__header {
    padding: 24px 24px 0 24px;
  }
}
</style>
