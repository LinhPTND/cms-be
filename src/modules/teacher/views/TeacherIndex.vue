<template>
  <div class="teacher-index">
    <a-row :gutter="[20, 20]">
      <a-col :span="8">
        <Filter @change="changeFilter" />
      </a-col>
      <a-col :span="16">
        <div class="table">
          <TableLetter :dataSource="dataLetters" @refresh="refreshTable" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { fnJob } from "@/core/composables/useJob";
import { StatusLetter } from "@/models/Letter";
import TableLetter from "@/modules/teacher/components/TableLetter.vue";
import TeacherRepository from "@/repositories/TeacherRepository";
import { useAuth } from "@/stores/auth";
import { getTableLetter } from "@/utilities/resolveLetter";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Filter from "../components/Filter.vue";

export interface ListRequest {
  status?: StatusLetter;
  name?: string;
  msv?: string;
}

const router = useRouter();
const route = useRoute();
const dataLetters = ref<any[]>([]);

const { user } = useAuth();
const filterData = ref<ListRequest>({});

const { run: getAllLetter } = fnJob({
  api: (id: string, payload: ListRequest) =>
    TeacherRepository.getAllLetterApply(id, payload),
  fnSuccess: ({ data }) => {
    const list = getTableLetter(data.data);
    dataLetters.value = list;
  },
  options: {
    showLoading: true,
  },
});

if (user && user.userId) {
  getAllLetter(user.userId, filterData.value);
}

const refreshTable = () => {
  if (user && user.userId) {
    getAllLetter(user.userId, filterData.value);
  }
};

const changeFilter = (values: ListRequest) => {
  filterData.value = values;
};

watch(
  filterData,
  () => {
    router.push({
      path: route.path,
      query: filterData.value,
    });

    user && user.userId && getAllLetter(user.userId, filterData.value);
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped>
.teacher-index {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 24px;
  .table {
    width: 100%;
    height: 100%;
  }
}
</style>
