<template>
  <Button type="primary" danger>
    <template #icon>
      <sync-outlined />
    </template>
    <slot> Reset </slot>
  </Button>
</template>

<script lang="ts" setup>
import Button, { ButtonProps } from "@/components/Button.vue";
import { SyncOutlined } from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";

export interface ButtonSaveProps
  extends Omit<ButtonProps, "type" | "danger" | "success" | "warning"> {}

defineProps<ButtonSaveProps>();

const { t } = useI18n();
</script>
