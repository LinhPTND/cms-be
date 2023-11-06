<template>
  <a-popconfirm
    :title="t('common.areYouSure')"
    :ok-text="okText"
    :cancel-text="cancelText"
    :cancel-button-props="{
      danger: true,
    }"
    @confirm="$emit('click', $event)"
    @visible-change="toogleConfirm"
  >
    <a-tooltip placement="top" :title="t('common.delete')" v-if="onlyIcon">
      <Button type="primary" danger>
        <template #icon>
          <DeleteOutlined />
        </template>
      </Button>
    </a-tooltip>
    <Button type="primary" danger v-else>
      <template #icon>
        <DeleteOutlined />
      </template>
      <slot v-if="!onlyIcon">
        {{ t("common.delete") }}
      </slot>
    </Button>
  </a-popconfirm>
</template>

<script lang="ts" setup>
import Button, { ButtonProps } from "@/components/Button.vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export interface ButtonDeleteProps
  extends Omit<ButtonProps, "type" | "danger" | "success" | "warning"> {
  okText?: string;
  onlyIcon?: boolean;
  cancelText?: string;
}

const props = defineProps<ButtonDeleteProps>();

const visibleConfirm = ref<boolean>(false);

defineEmits<{
  (event: "click", $event: MouseEvent): void;
}>();

const { t } = useI18n();

const okText = computed(() => {
  return props.okText ?? t("common.delete");
});

const cancelText = computed(() => {
  return props.cancelText ?? t("common.cancel");
});

const toogleConfirm = (visible: boolean) => {
  visibleConfirm.value = visible;
};
</script>
