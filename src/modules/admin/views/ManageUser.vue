<template>
  <div class="user-index">
    <a-row :gutter="[20, 20]">
      <a-col :span="24">
        <a-button
          class="mb-3 font-medium text-base"
          type="primary"
          @click="showModal"
        >
          <user-add-outlined />
          Thêm sinh viên
        </a-button>
        <Filter @change="handleChangeFilter" :filter-data="filterData" />
      </a-col>
      <a-col :span="24">
        <div class="table">
          <TableUser
            :listData="listUsers"
            :pagination="pagination"
            @change="handleChangeTable"
            @refresh-table="refresh"
          />
        </div>
      </a-col>
    </a-row>
    <ModalAddUser
      :handle-cancel="handleCancel"
      :handle-ok="handleOk"
      :visible="visible"
      @finish="refresh"
    />
  </div>
</template>

<script lang="ts" setup>
import { fnJob } from "@/core/composables/useJob";
import { useLoading } from "@/core/loading";
import { Meta } from "@/models/Response";
import { InfoResponse, ListUserRequest } from "@/models/User";
import Filter from "@/modules/admin/components/manage-user/Filter.vue";
import TableUser from "@/modules/admin/components/manage-user/TableUser.vue";
import UserRepository from "@/repositories/UserRepository";
import { UserAddOutlined } from "@ant-design/icons-vue";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ModalAddUser from "../components/manage-user/ModalAddUser.vue";

const visible = ref<boolean>(false);
const { startLoading, stopLoading } = useLoading();
const route = useRoute();
const router = useRouter();
const listUsers = ref<InfoResponse[]>([]);
const filterData = ref<ListUserRequest>(
  route.query.page
    ? route.query
    : {
        page: 1,
        limit: 10,
      }
);
const pagination = ref<Meta>({
  page: filterData.value.page,
  limit: filterData.value.limit,
  total: 0,
});

startLoading();

const { run: getListUsersAPI } = fnJob({
  api: (payload: ListUserRequest) => UserRepository.getListUser(payload),
  fnSuccess: ({ data }) => {
    listUsers.value = data.data;
    pagination.value = data.meta;
    const { limit, page, total } = data.meta;
    if (total == limit * page && page > 1) {
      filterData.value = {
        ...filterData.value,
        page: page - 1,
      };
    }
    stopLoading();
  },
  options: {
    showLoading: true,
  },
});

getListUsersAPI(filterData.value);

const handleChangeFilter = (value: any) => {
  filterData.value = {
    page: filterData.value.page,
    limit: filterData.value.limit,
    ...(value.name && { name: value.name }),
    ...(value.msv && { msv: value.msv }),
    ...(value.majors && { majors: value.majors }),
    ...(value.class && { class: value.class }),
  };
};

const handleChangeTable = (value: any) => {
  const { current, pageSize, size, total } = value;
  filterData.value = {
    ...filterData.value,
    page: current,
    limit: pageSize,
  };
};

const refresh = () => {
  getListUsersAPI(filterData.value);
};

// Modal edit info
const showModal = () => {
  visible.value = true;
};

const handleOk = () => {
  visible.value = false;
};

const handleCancel = () => {
  visible.value = false;
};

watch(
  filterData,
  () => {
    router.push({
      path: route.path,
      query: filterData.value,
    });

    getListUsersAPI(filterData.value);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.user-index {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 24px;
  .table {
    display: block !important;
    width: 100%;
    height: 100%;
  }
}
</style>
