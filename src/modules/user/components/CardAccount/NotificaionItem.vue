<template>
  <div class="notification-item">
    <div class="time">{{ props.time }}</div>
    <div class="description">{{ props.description }}</div>
  </div>
</template>

<script lang="ts" setup>
import { Dayjs } from "dayjs";

const props = defineProps<{
  time: Dayjs | string;
  description: string;
}>();
</script>

<style lang="scss" scoped>
.notification-item {
  font-size: 13px;
  line-height: 20px;
  margin-bottom: 8px;
  .time {
    color: rgb(252, 119, 116);
    font-weight: 500;
  }

  .description {
    color: #6d7175;
    padding-right: 12px;
  }
}
</style>
