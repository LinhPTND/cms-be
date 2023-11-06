<template>
  <div
    class="action-bar-item flex flex-col items-center justify-center gap-1"
    :class="props.active ? 'active' : 'inactive'"
    :style="props.style"
    @click="$emit('click', $event)"
  >
    <slot></slot>
    <span class="action-bar-item-text">{{ props.name }}</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name?: string;
    style?: any;
    active?: boolean;
  }>(),
  { active: true }
);

defineEmits<{
  (event: "click", values: any): void;
}>();
</script>

<style lang="scss" scoped>
.active {
  cursor: pointer;

  &:hover {
    @apply text-primary-stronger;
    background: white;
  }
}

.inactive {
  cursor: not-allowed;
  color: #bbb;
}
</style>

<style lang="scss">
.action-bar-item {
  padding: 5px 12px 2px;
  border-radius: 3px;
  color: white;

  .anticon {
    font-size: 16px;
  }

  &-text {
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
