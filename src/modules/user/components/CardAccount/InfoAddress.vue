<template>
  <div class="info-common">
    <a-row :gutter="[16, 16]">
      <a-col class="flex" :span="12">
        <span class="label">Họ tên bố (mẹ):</span>
        <span class="value">{{ userInfo?.parentName }}</span>
      </a-col>
      <a-col class="flex items-center" :span="12">
        <div class="label">Quê Quán:</div>
        <div class="value">{{ userInfo?.hometown }}</div>
      </a-col>
      <a-col class="flex items-center" :span="12">
        <span class="label">Số điện thoại:</span>
        <span class="value">{{ userInfo?.parentPhone }}</span>
      </a-col>
      <a-col class="flex" :span="12">
        <span class="label">Hộ Khẩu thường trú:</span>
        <span class="value">{{ userInfo?.permanentResidence }}</span>
      </a-col>
      <a-col :span="24">
        <span class="label">Địa chỉ thường trú:</span>
        <span class="value">
          {{ userInfo?.address }}
        </span>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { InfoResponse } from "@/models/User";

defineProps<{
  userInfo?: InfoResponse;
}>();
</script>

<style lang="scss" scoped>
.info-common {
  margin-top: 24px;
  padding-bottom: 24px;
  .label {
    font-size: 13px;
  }
}
</style>
