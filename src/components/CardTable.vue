<template>
  <a-card>
    <template v-if="$slots.filter">
      <div class="-mx-2 pb-10 -mt-2">
        <slot name="filter" />
      </div>
    </template>
    <Table
      class="card-table-table"
      :data-source="dataSource"
      :columns="columns"
    >
      <slot />
    </Table>
  </a-card>
</template>

<script lang="ts" setup>
import Table from "@/components/table/Table.vue";
import { ColumnsType } from "ant-design-vue/lib/table";

defineProps<{ dataSource: any[]; columns: ColumnsType }>();
</script>
<style lang="scss" scoped>
.card-table-table {
  @apply -my-6 -mx-6 max-w-none;
}
</style>
