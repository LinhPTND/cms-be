<template>
  <div>
    <div v-if="status" class="bg-true tags-container">
      {{ textTrue || t("common.activity") }}
    </div>
    <div v-else class="bg-false tags-container">
      {{ textFalse || t("common.lock") }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
defineProps<{ status: boolean; textTrue?: string; textFalse?: string }>();
</script>

<style scoped>
.tags-container {
  padding: 3px 8px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 110px;
}
.bg-true {
  background: #d6f4f5;
}
.bg-false {
  background: #ec6565;
  color: #fff;
}
</style>
