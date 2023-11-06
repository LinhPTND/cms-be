<template>
  <AntButton :class="`btn-${props.btnType}`" :type="typeProps">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :key="name" :name="name" v-bind="data" />
    </template>
  </AntButton>
</template>

<script lang="ts" setup>
import {
  Button as AntButton,
  ButtonProps as AntButtonProps,
} from "ant-design-vue";
import type { ButtonType as AntButtonType } from "ant-design-vue/lib/button";
import { computed } from "vue";
export interface ButtonProps extends Omit<AntButtonProps, "type"> {
  btnType:
    | "text"
    | "link"
    | "dashed"
    | "default"
    | "primary"
    | "destructive"
    | "outlineMonochrome"
    | "plain"
    | "plainDestructive"
    | "plainMonochrome"
    | "green";
}

const props = withDefaults(defineProps<ButtonProps>(), {
  btnType: "default",
});

const typeProps = computed<AntButtonType>(() => {
  if (
    ["default", "primary", "dashed", "link", "text"].includes(props.btnType)
  ) {
    return props.btnType as AntButtonType;
  } else if (
    ["plain", "plainDestructive", "plainMonochrome"].includes(props.btnType)
  ) {
    return "text";
  }

  return "default";
});
</script>

<style lang="scss" scoped></style>
