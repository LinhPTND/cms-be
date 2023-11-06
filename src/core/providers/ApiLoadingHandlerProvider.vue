<template>
  <slot />
</template>

<script lang="ts" setup>
import { Api } from "@/core/api";
import useLoading from "@/core/loading/useLoading";
import { ApiRequestConfig } from "@/core/models/api";
import { onBeforeUnmount } from "vue";

const { startLoading, stopLoading } = useLoading();

const removeInterceptor = Api.addInterceptor({
  request(config) {
    if (config.showLoading) {
      startLoading();
    }

    return config;
  },
  response: {
    success: (response) => {
      const config = response.config as ApiRequestConfig;

      if (config.showLoading) {
        stopLoading();
      }

      return response;
    },
    error: (error, handleError) => {
      const { config } = error;

      if (config?.showLoading) {
        stopLoading();
      }

      return handleError();
    },
  },
});

onBeforeUnmount(() => {
  removeInterceptor();
});
</script>
