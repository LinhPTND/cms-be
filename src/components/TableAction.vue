<template>
  <a-space>
    <ButtonView
      v-if="detail"
      :only-icon="onlyIcon"
      @click="$emit('detail', record)"
    >
      {{ t("common.detail") }}
    </ButtonView>
    <ButtonEdit
      type="primary"
      v-if="edit"
      success
      :only-icon="onlyIcon"
      @click="$emit('edit', record)"
    />
    <ButtonDelete
      class="flex items-center justify-center"
      v-if="showDelete"
      :only-icon="onlyIcon"
      @click="$emit('delete', record)"
    />
  </a-space>
</template>

<script setup lang="ts">
import ButtonDelete from "@/components/ButtonDelete.vue";
import ButtonView from "@/components/ButtonView.vue";
import { useI18n } from "vue-i18n";
import ButtonEdit from "./ButtonEdit.vue";
const { t } = useI18n();
defineProps<{
  record: any;
  edit?: boolean;
  showDelete?: boolean;
  detail?: boolean;
  onlyIcon?: boolean;
}>();

defineEmits<{
  (event: "detail", record: any): void;
  (event: "edit", record: any): void;
  (event: "delete", record: any): void;
}>();
</script>

<style scoped></style>
