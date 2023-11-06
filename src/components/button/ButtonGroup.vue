<template>
  <div v-if="segment" class="btn-group-segment">
    <slot />
  </div>
  <a-space v-else>
    <slot />
  </a-space>
</template>

<script lang="ts" setup>
defineProps<{ segment?: boolean }>();
</script>

<style lang="scss" scoped>
.btn-group-segment {
  @apply inline-block;
  :deep(.ant-btn) {
    border-radius: 0;
    margin: 0 !important;
    border-right-width: 0;

    &:not(.btn-default):hover {
      border-color: transparent;
    }

    &:first-child {
      border-radius: 0.25rem 0 0 0.25rem;
    }

    &:last-child {
      border-radius: 0 0.25rem 0.25rem 0;
      border-right-width: 1px;
    }

    &:focus + .ant-btn {
      border-left-color: unset;
    }
  }
}
</style>
