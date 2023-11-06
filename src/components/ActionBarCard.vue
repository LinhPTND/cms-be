<template>
  <div class="action-bar">
    <div class="action-bar-header">
      <slot name="header-icon">
        <folder-filled />
      </slot>
      <span>{{ title }}</span>
    </div>
    <div
      class="action-bar-items flex items-center justify-start gap-2"
      :class="{
        'sticky top-0 z-10': stickyActionBar,
      }"
    >
      <slot></slot>
    </div>
    <div class="action-bar-body bg-white">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FolderFilled } from "@ant-design/icons-vue";

const props = defineProps<{
  title?: string;
  stickyActionBar?: boolean;
}>();
</script>

<style lang="scss" scoped>
:deep {
  .cursor-pointer:hover {
    color: blue;
  }
}
</style>

<style lang="scss">
.action-bar {
  &-header {
    @apply bg-primary-stronger rounded-t-lg;
    border-bottom: 1px solid rgb(146, 146, 146);

    padding: 16px 20px 15px;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 14px;
    color: white;
    font-size: 18px;
    font-weight: 500;

    .anticon {
      font-size: 34px;
    }
  }

  &-items {
    @apply bg-primary-stronger;
    padding: 8px 12px;
  }

  &-body {
    @apply rounded-b-lg;
    padding: 0 0 12px;
  }
}
</style>
