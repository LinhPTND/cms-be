<template>
  <a-table>
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :key="name" :name="name" v-bind="data" />
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { TableProps as AntTableProps } from "ant-design-vue";

export interface TableProps extends AntTableProps {}

defineProps<TableProps>();
</script>
