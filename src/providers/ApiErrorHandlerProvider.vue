<template>
  <slot />
</template>

<script lang="ts" setup>
import { Api } from "@/core/api";
import { AxiosError } from "axios";
import { message } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import { onUnmounted } from "vue";

const { t } = useI18n();

const unsubscriber = Api.addInterceptor({
  response: {
    error(error: AxiosError<{ message: string }>) {
      const { response } = error;

      if (response?.data?.message) {
        message.error(response?.data?.message ?? "Đã có lỗi xảy ra");
      }

      return error;
    },
  },
});

onUnmounted(() => {
  unsubscriber();
});
</script>
