<template>
  <div class="admin-index">
    <a-row :gutter="[20, 20]">
      <a-col :span="8">
        <Filter />
      </a-col>
      <a-col :span="16">
        <div class="table">
          <TableLetter />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import Filter from "@/modules/admin/components/Filter.vue";
import TableLetter from "@/modules/admin/components/TableLetter.vue";
import AdminRoutePaths from "@/modules/admin/router/paths";
import { useRouter } from "vue-router";

const router = useRouter();

router.replace(AdminRoutePaths.Teacher);
</script>
<style lang="scss" scoped>
.admin-index {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 24px;
  .table {
    width: 100%;
    height: 100%;
  }
}
</style>
