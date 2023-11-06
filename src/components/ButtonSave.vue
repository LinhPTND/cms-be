<template>
  <Button type="primary">
    <template #icon>
      <SaveOutlined />
    </template>
    <slot>
      {{ t("common.save") }}
    </slot>
  </Button>
</template>

<script lang="ts" setup>
import Button, { ButtonProps } from "@/components/Button.vue";
import { SaveOutlined } from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";

export interface ButtonSaveProps
  extends Omit<ButtonProps, "type" | "danger" | "success" | "warning"> {}

defineProps<ButtonSaveProps>();

const { t } = useI18n();
</script>
