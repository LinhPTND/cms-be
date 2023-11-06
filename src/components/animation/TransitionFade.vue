<template>
  <transition name="fade" mode="out-in">
    <slot></slot>
  </transition>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transform: translateX(0);
  opacity: 1;
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-from {
  transform: translateX(-50px);
}

.fade-leave-to {
  transform: translateX(100px);
}
</style>
