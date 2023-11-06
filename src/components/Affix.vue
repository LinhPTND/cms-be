<template>
  <a-affix @change="affixed = $event">
    <slot :affixed="affixed" />
  </a-affix>
</template>

<script lang="ts" setup>
import { AffixProps as AntAffixProps } from "ant-design-vue";
import { ref } from "vue";

export interface AffixProps extends AntAffixProps {}

defineProps<AffixProps>();

const affixed = ref(false);
</script>
