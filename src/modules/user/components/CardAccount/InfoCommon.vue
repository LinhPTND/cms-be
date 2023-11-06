<template>
  <div class="info-common">
    <a-row :gutter="[16, 16]">
      <a-col class="flex" :span="24" :xxl="8">
        <span class="label">Giới tính:</span>
        <span class="value">{{ userInfo?.gender }}</span>
      </a-col>
      <a-col class="flex" :span="24" :xxl="16">
        <span class="label">CCCD/CMND:</span>
        <span class="value">{{ userInfo?.citizenId }}</span>
      </a-col>
      <a-col class="flex" :span="24" :xxl="8">
        <span class="label">Số điện thoại:</span>
        <span class="value">{{ userInfo?.phone }}</span>
      </a-col>
      <a-col class="flex" :span="24" :xxl="16">
        <span class="label">Ngày cấp:</span>
        <span class="value">
          {{
            userInfo?.dateCitizenId
              ? dayjs(userInfo?.dateCitizenId).format("DD/MM/YYYY")
              : ""
          }}
        </span>
      </a-col>
      <a-col class="flex" :span="24" :xxl="8">
        <span class="label">Email:</span>
        <span class="value">{{ userInfo?.email }}</span>
      </a-col>
      <a-col class="flex" :span="24" :xxl="16">
        <span class="label">Nơi cấp:</span>
        <span class="value">{{ userInfo?.placeCitizenId }}</span>
      </a-col>
      <a-col class="flex" :span="24" :xxl="16">
        <span class="label">Ngày sinh:</span>
        <span class="value">{{
          userInfo?.birthDay
            ? dayjs(userInfo?.birthDay).format("DD/MM/YYYY")
            : ""
        }}</span>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { InfoResponse } from "@/models/User";
import dayjs from "dayjs";

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

  .value {
    display: inline-block;
    word-break: break-all;
  }
}
</style>
