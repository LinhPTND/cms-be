<template>
  <a-tabs class="selectable-tab" @change="handleTabChange">
    <a-tab-pane
      v-for="option in options"
      :tab="option.label"
      :key="option.value"
      :tab-key="option.value"
    />
  </a-tabs>
</template>

<script lang="ts" setup>
import { isEqual } from "lodash";
import { ref, watch } from "vue";

export interface SelectableTabOption {
  value: any;
  label: string;
}

const props = defineProps<{
  options: SelectableTabOption[];
  value?: any;
}>();

const emit = defineEmits<{
  (event: "update:value", value: any): void;
  (event: "change", value: any): void;
}>();

const internalValue = ref<any>();

watch(
  () => props.value,
  () => {
    if (!isEqual(props.value, internalValue)) {
      internalValue.value = props.value;
    }
  },
  { immediate: true }
);

function handleTabChange(tab: any) {
  internalValue.value = tab;
  emit("update:value", tab);
  emit("change", tab);
}
</script>

<style lang="scss" scoped>
.selectable-tab {
  :deep(.ant-tabs-nav) {
    @apply px-7;
    margin-bottom: 0 !important;
  }
}
</style>
