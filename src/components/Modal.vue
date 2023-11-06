<template>
  <a-modal
    :class="{
      'sticky-header': stickyHeader,
      'sticky-footer': stickyFooter,
    }"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :key="name" :name="name" v-bind="data" />
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import { ModalProps as AntModalProps } from "ant-design-vue";

export interface ModalProps extends AntModalProps {
  stickyHeader?: boolean;
  stickyFooter?: boolean;
}

defineProps<ModalProps>();
</script>

<style lang="scss">
.ant-modal.sticky-footer {
  .ant-modal-footer {
    position: sticky;
    bottom: 0;
    background-color: white;
  }
}
.ant-modal.sticky-header {
  .ant-modal-header {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 10;
  }
  .ant-modal-close {
    background-color: white;
    z-index: 11;
  }
}
</style>
