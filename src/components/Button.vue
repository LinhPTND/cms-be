<template>
  <a-button :class="['inline-flex items-center justify-center', classes]">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :key="name" :name="name" v-bind="data" />
    </template>
  </a-button>
</template>
<script lang="ts" setup>
import { ButtonProps as AntButtonProps } from "ant-design-vue";
import { computed } from "vue";

export interface ButtonProps extends AntButtonProps {
  success?: boolean;
  danger?: boolean;
}

const props = defineProps<ButtonProps>();

const classes = computed(() => {
  return {
    "btn-success": props.success,
    "btn-danger": props.danger,
  };
});
</script>

<style lang="scss" scoped>
.ant-btn {
  &.btn-success {
    @apply hover:text-green-600 hover:border-green-600;

    &.ant-btn-primary {
      @apply text-white bg-green-600 border-green-600 hover:bg-green-500 hover:border-green-500 hover:text-white;
    }

    &.ant-btn-text,
    &.ant-btn-link {
      @apply text-green-600 hover:border-transparent;
    }

    &.ant-btn-link {
      @apply hover:text-green-700;
    }

    &.ant-btn-ghost {
      @apply bg-transparent;
    }
  }

  &.btn-danger {
    &.ant-btn-primary {
      @apply text-white bg-red-600 border-red-600 hover:bg-red-500 hover:border-red-500 hover:text-white;
    }

    &.ant-btn-text,
    &.ant-btn-link {
      @apply text-red-600 hover:border-transparent;
    }

    &.ant-btn-link {
      @apply hover:text-red-700;
    }

    &.ant-btn-ghost {
      @apply bg-transparent;
    }
  }
}
</style>
