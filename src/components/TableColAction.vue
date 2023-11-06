<template>
  <ButtonGroup>
    <a-tooltip>
      <span class="wrap-icon" @click="$emit('edit')">
        <Icon name="editMajor" :style="{ color: '#1F68A4' }"></Icon>
      </span>
    </a-tooltip>
    <a-tooltip>
      <span class="wrap-icon" @click="$emit('delete')">
        <Icon name="deleteMajor" :style="{ color: '#FC7774' }"></Icon>
      </span>
    </a-tooltip>
  </ButtonGroup>
</template>

<script lang="ts" setup>
import ButtonGroup from "@/components/button/ButtonGroup.vue";
import Icon from "@/components/Icon.vue";

const emit = defineEmits<{
  (event: "edit"): void;
  (event: "delete"): void;
}>();
</script>

<style lang="scss" scoped>
.wrap-icon {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #dcdcdc;
  cursor: pointer;
}
</style>
