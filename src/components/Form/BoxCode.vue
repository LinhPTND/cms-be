<template>
  <div class="box-code">
    <InputTextNumber class="input-item" v-bind="$attrs" />
  </div>
</template>

<script lang="ts" setup>
import InputTextNumber, {
  InputNumberTextProps,
} from "@/components/InputTextNumber.vue";

export interface BoxCodeProps extends InputNumberTextProps {}
</script>

<style lang="scss" scoped>
.box-code {
  width: 46px;
  height: 42px;
  border: 1px solid #f6b47b;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;

  @media screen and (max-width: 560px) {
    width: 32px;
    height: 30px;
  }

  .input-item {
    width: 100%;
    height: 100%;
    text-align: center;

    &:focus {
      box-shadow: none !important;
      border-right-width: 0px !important;
    }
  }
}
</style>
