<template>
  <div class="flex items-center justify-end" :class="classes">
    <a-pagination
      :show-total="
             (total:number, range:any) => `${t('common.numberPage')} ${range[0]}/${range[1]}`
          "
      :showSizeChanger="false"
      v-bind="$attrs"
    />
    <a-typography-text class="ml-3 mt-1">
      {{
        `${t("common.thereAre")} ${$attrs.total ?? 0} ${t("common.shopOwner")}`
      }}
    </a-typography-text>
  </div>
</template>

<script lang="ts" setup>
import { PaginationProps as AntPaginationProps } from "ant-design-vue";
import { useAttrs } from "vue";
import { useI18n } from "vue-i18n";

export interface PaginationProps extends AntPaginationProps {}
defineProps<PaginationProps>();

const { t } = useI18n();

const { class: classes, ...attrs } = useAttrs();
</script>
