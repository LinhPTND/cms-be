<template>
  <a-modal
    :visible="modalVisible"
    :title="title"
    :width="width"
    @cancel="closeModal"
    @ok="$emit('update:value', selectedRowKeys)"
  >
    <a-input
      :placeholder="t('common.search')"
      @update:value="$emit('search', $event)"
    />

    <div class="mt-5 -mx-6">
      <a-table
        :data-source="dataSource"
        :pagination="pagination"
        :row-key="rowKey"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: handleSelectRows,
          preserveSelectedRowKeys: true,
        }"
      >
        <slot />
      </a-table>
    </div>
  </a-modal>
  <a-modal
    :visible="selectedRowsModalVisible"
    :title="title"
    :width="width"
    :footer="false"
    @cancel="closeSelectedRowsModal"
  >
    <div class="-mx-6">
      <a-table :data-source="dataSource">
        <slot />
      </a-table>
    </div>
  </a-modal>

  <slot
    name="button"
    :openSelectModal="openModal"
    :openViewModal="openSelectedRowsModal"
    :selectedRowKeys="selectedRowKeys"
  >
    <div class="inline-block">
      <Button @click="openModal">
        <template #icon>
          <PlusOutlined />
        </template>
        {{ t("common.select") }}
      </Button>
    </div>
  </slot>
</template>

<script lang="ts" setup>
import Button from "@/components/Button.vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { TablePaginationConfig } from "ant-design-vue";
import { Key } from "ant-design-vue/lib/vc-table/interface";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = withDefaults(
  defineProps<{
    title: string;
    width?: number;
    value?: Key[];
    searchable?: boolean;
    dataSource: any[];
    rowKey?: string;
    pagination?: TablePaginationConfig;
  }>(),
  {
    rowKey: "id",
  }
);

defineEmits<{
  (event: "update:value", value: Key[]): void;
  (event: "search", value: string): void;
}>();

const { t } = useI18n();
// Handle selectable modal visible
const modalVisible = ref(false);
function openModal() {
  modalVisible.value = true;
}

function closeModal() {
  modalVisible.value = false;
}
// Handle selected rows modal visible
const selectedRowsModalVisible = ref(false);
function openSelectedRowsModal() {
  selectedRowsModalVisible.value = true;
}

function closeSelectedRowsModal() {
  selectedRowsModalVisible.value = false;
}

// Handle select
const selectedRowKeys = ref<Key[]>([]);

const selectedDataSource = computed(() => {
  return props.dataSource.filter((row) =>
    selectedRowKeys.value.includes(row[props.rowKey])
  );
});

function handleSelectRows(keys: Key[]) {
  selectedRowKeys.value = keys;
}
</script>
