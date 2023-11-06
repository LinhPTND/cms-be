<template>
  <a-input type="text" v-model:value="state" />
</template>

<script lang="ts" setup>
import { InputNumberProps } from "ant-design-vue";
import { defineEmits, ref, watch } from "vue";

export interface InputNumberTextProps extends InputNumberProps {
  value: string;
}

const props = withDefaults(defineProps<InputNumberTextProps>(), {
  value: "",
});

const emit = defineEmits<{
  (e: "update:value", value: string): void;
}>();

const state = ref(props.value);

watch(state, (value) => {
  state.value = value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  emit("update:value", state.value);
});

watch(
  () => props.value,
  (value) => {
    state.value = value;
  }
);
</script>

<style lang="scss" scoped></style>
