<template>
  <div class="mb-5">
    <div class="flex items-center mb-0 pb-0">
      <Button class="w-9 h-9 mr-4" @click="$router.go(-1)" v-if="back">
        <left-outlined />
      </Button>
      <h2 class="text-2xl flex-1 font-bold mb-0">{{ title }}</h2>
      <slot />
    </div>
    <a-typography-text v-if="content" class="text-[#9e9e9e]">{{
      content
    }}</a-typography-text>
  </div>
</template>
<script setup lang="ts">
import Button from "@/components/Button.vue";
import { LeftOutlined } from "@ant-design/icons-vue";
defineProps<{ title: string; back?: boolean; content?: string }>();
</script>
