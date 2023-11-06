<template>
  <a-spin v-bind="$attrs">
    <slot></slot>
  </a-spin>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.ant-spin-nested-loading > div > .ant-spin {
  max-height: 100vh;
}
</style>
