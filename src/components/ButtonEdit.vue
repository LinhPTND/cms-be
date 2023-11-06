<template>
  <a-tooltip placement="top" :title="t('common.edit')" v-if="onlyIcon">
    <Button v-bind="$attrs">
      <template #icon>
        <edit-outlined />
      </template>
    </Button>
  </a-tooltip>
  <Button v-bind="$attrs" v-else>
    <template #icon>
      <edit-outlined />
    </template>
    <slot v-if="!onlyIcon">
      {{ t("common.edit") }}
    </slot>
  </Button>
</template>

<script lang="ts" setup>
import Button, { ButtonProps } from "@/components/Button.vue";
import { EditOutlined } from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";

export interface ButtonSaveProps
  extends Omit<ButtonProps, "type" | "danger" | "success" | "warning"> {
  onlyIcon?: boolean;
}

defineProps<ButtonSaveProps>();

const { t } = useI18n();
</script>
