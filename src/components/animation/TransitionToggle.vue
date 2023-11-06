<template>
  <transition
    name="toggle"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @leave="onLeave"
  >
    <slot></slot>
  </transition>
</template>

<script lang="ts" setup>
function onEnter(element: HTMLElement) {
  const width = getComputedStyle(element).width;

  element.style.width = width;
  element.style.position = "absolute";
  element.style.visibility = "hidden";
  element.style.height = "auto";

  const height = getComputedStyle(element).height;

  element.style.width = "";
  element.style.position = "";
  element.style.visibility = "";
  element.style.height = "0px";

  // Force repaint to make sure the
  // animation is triggered correctly.
  getComputedStyle(element).height;

  // Trigger the animation.
  // We use `requestAnimationFrame` because we need
  // to make sure the browser has finished
  // painting after setting the `height`
  // to `0` in the line above.
  requestAnimationFrame(() => {
    element.style.height = height;
  });
}

function onAfterEnter(element: HTMLElement) {
  element.style.height = "auto";
}

function onLeave(element: HTMLElement) {
  const height = getComputedStyle(element).height;

  element.style.height = height;

  // Force repaint to make sure the
  // animation is triggered correctly.
  getComputedStyle(element).height;

  requestAnimationFrame(() => {
    element.style.height = "0px";
  });
}
</script>

<style lang="scss" scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.toggle-enter-active,
.toggle-leave-active {
  transition: all 0.3s linear;
  overflow: hidden;
}

.toggle-enter,
.toggle-leave-to {
  height: 0;
  opacity: 0;
}
</style>
