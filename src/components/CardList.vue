<template>
  <a-card :body-style="{ padding: 0 }">
    <SelectableTabs
      v-if="tabOptions"
      :options="tabOptions"
      :value="tabValue"
      @update:value="$emit('update:tabValue', $event)"
    />

    <div class="mt-4">
      <slot name="beforeTable" />
    </div>

    <slot name="table">
      <Table v-bind="tableProps">
        <slot name="tableColumns" />
      </Table>
    </slot>

    <slot name="afterTable" />
  </a-card>
</template>

<script lang="ts" setup>
import SelectableTabs, {
  SelectableTabOption,
} from "@/components/SelectableTabs.vue";
import Table, { TableProps } from "@/components/Table.vue";

defineProps<{
  tabOptions?: SelectableTabOption[];
  tabValue?: any;
  tableProps?: TableProps;
}>();

defineEmits<{
  (event: "update:tabValue", value: any): void;
}>();
</script>
