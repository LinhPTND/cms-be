<template>
  <a-table class="Table" :scroll="{ x: 'max-content' }" />
</template>

<script lang="ts" setup>
import { TableProps as AntTableProps } from "ant-design-vue";

export interface TableProps extends AntTableProps {}

defineProps<TableProps>();
</script>

<style lang="scss" scoped>
.Table {
  :deep(.ant-table) {
    .ant-table-container {
      thead {
        tr {
          th {
            font-family: "Roboto";
            font-style: normal;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            padding: 12px 16px;
            color: #ed9e03;
            background: #ffefbe;
          }
        }
      }

      tbody {
        tr {
          td {
          }
        }
      }
    }

    .ant-table-expanded-row-fixed {
      border: 1px solid #dcdcdc;
      border-top: none;
    }
  }
}
</style>
