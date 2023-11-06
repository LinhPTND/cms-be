<template>
  <label class="inline-flex items-center">
    <a-input
      :class="{ 'invisible absolute bottom-[-4px]': rounded }"
      :value="value"
      type="color"
      class="color-input"
      v-bind="$attrs"
      @change="handleUpdateValue"
    />
    <span v-if="!rounded" class="ml-2">
      {{ displayValue }}
    </span>
    <span v-if="rounded" class="rounded-icon"></span>
  </label>
</template>

<script lang="ts" setup>
import { ChangeEvent } from "ant-design-vue/lib/_util/EventInterface";
import { ref, watch } from "vue";

const props = defineProps<{
  value?: string;
  rounded?: boolean;
}>();

const emit = defineEmits<{
  (event: "update:value", value: string): void;
  (event: "change", value: string): void;
}>();

const displayValue = ref(props.value);

const handleUpdateValue = ($event: ChangeEvent) => {
  if ($event.target.value) {
    emit("update:value", $event.target.value);
    emit("change", $event.target.value);
    displayValue.value = $event.target.value;
  }
};

watch(
  () => props.value,
  (val) => {
    if (displayValue.value !== val) {
      displayValue.value = val;
    }
  }
);
</script>

<style lang="scss" scoped>
.color-input {
  appearance: none;
  padding: 0.25rem;
  width: 36px;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 50%;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 0.25rem;
  }
}

.rounded-icon {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: v-bind(displayValue);
}
</style>
