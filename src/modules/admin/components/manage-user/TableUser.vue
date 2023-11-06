<template>
  <div class="table-user">
    <a-table
      :data-source="data"
      :scroll="{ x: 3000 }"
      :pagination="{
        size: 'small',
        pageSize: pagination.limit,
        current: pagination.page,
        total: pagination.total,
      }"
      @change="$emit('change', $event)"
    >
      <a-table-column data-index="msv" title="MSV" fixed="left" :width="120" />
      <a-table-column
        data-index="name"
        title="Họ tên"
        fixed="left"
        :width="200"
      />
      <a-table-column
        data-index="gender"
        title="Giới tính"
        fixed="left"
        :width="100"
        align="center"
        v-slot="{ text }"
      >
        <span class="capitalize">{{ text }}</span>
      </a-table-column>
      <a-table-column
        data-index="class"
        title="Lớp"
        fixed="left"
        align="center"
        :width="100"
      />
      <a-table-column
        data-index="birthDay"
        title="Ngày sinh"
        align="center"
        v-slot="{ text }"
      >
        <span>{{ dayjs(text).format("DD/MM/YYYY") }}</span>
      </a-table-column>
      <a-table-column data-index="majors" title="Chuyên nghành" :width="150" />
      <a-table-column data-index="timeCourse" title="Khóa" align="center" />
      <a-table-column data-index="phone" title="Số điện thoại" align="center" />
      <a-table-column data-index="email" title="Địa chỉ Email" :width="200" />
      <a-table-column data-index="citizenId" title="Căn cước công dân" />
      <a-table-column
        data-index="dateCitizenId"
        title="Ngày cấp"
        v-slot="{ text }"
      >
        <span>{{ text ? dayjs(text).format("DD/MM/YYYY") : undefined }}</span>
      </a-table-column>
      <a-table-column data-index="placeCitizenId" title="Nơi cấp" />
      <a-table-column data-index="address" title="Địa chỉ" :width="400" />
      <a-table-column data-index="hometown" title="Quê quán" align="center" />

      <a-table-column
        data-index="permanentResidence"
        title="Hộ khẩu thường trú"
        :width="300"
      />
      <a-table-column
        data-index="parentName"
        title="Họ tên bố (hoặc mẹ)"
        :width="170"
      />
      <a-table-column
        data-index="parentPhone"
        title="Số điện thoại bố (hoặc mẹ)"
      />
      <a-table-column
        title="Hành động"
        dataIndex="status"
        align="center"
        fixed="right"
        :width="150"
        v-slot="{ record }"
      >
        <TableAction
          :record="record"
          edit
          show-delete
          only-icon
          @edit="() => showModalEdit(record)"
          @delete="() => handleDeleteUser(record.msv)"
        />
        <!-- detail -->
        <!-- @detail="$emit('view', $event)" -->
      </a-table-column>
    </a-table>
    <ModalUpdateInfo
      :handle-cancel="handleCancelEdit"
      :handle-ok="handleOkEdit"
      :visible="visibleEdit"
      :user-info="userInfo"
      @change="$emit('refreshTable')"
    />
  </div>
</template>

<script lang="ts" setup>
import TableAction from "@/components/TableAction.vue";
import { fnJob } from "@/core/composables/useJob";
import { Meta } from "@/models/Response";
import { InfoResponse } from "@/models/User";
import UserRepository from "@/repositories/UserRepository";
import { notification } from "ant-design-vue";
import dayjs from "dayjs";
import { ref, watch } from "vue";
import ModalUpdateInfo from "./ModalUpdateInfo.vue";

const props = withDefaults(
  defineProps<{
    listData: InfoResponse[];
    pagination: Meta;
  }>(),
  {
    listData: () => [],
  }
);

const emit = defineEmits<{
  (e: "change", value: any): void;
  (e: "refreshTable"): void;
}>();

const data = ref(props.listData);

watch(
  () => props.listData,
  (value) => {
    data.value = value;
  }
);

// Modal edit info
const userInfo = ref<InfoResponse>();
const visibleEdit = ref<boolean>(false);

const showModalEdit = (data: any) => {
  visibleEdit.value = true;
  userInfo.value = {
    _id: data._id,
    address: data.address,
    age: data.age,
    birthDay: data.birthDay
      ? dayjs(data.birthDay).format("YYYY-MM-DD")
      : undefined,
    citizenId: data.citizenId,
    class: data.class,
    dateCitizenId: data.dateCitizenId
      ? dayjs(data.dateCitizenId).format("YYYY-MM-DD")
      : undefined,
    email: data.email,
    gender: data.gender,
    hometown: data.hometown,
    majors: data.majors,
    msv: data.msv,
    name: data.name,
    parentName: data.parentName,
    parentPhone: data.parentPhone,
    permanentResidence: data.permanentResidence,
    phone: data.phone,
    placeCitizenId: data.placeCitizenId,
    timeCourse: data.timeCourse,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    __v: data.__v,
  };
};

const handleOkEdit = () => {
  visibleEdit.value = false;
};

const handleCancelEdit = () => {
  visibleEdit.value = false;
};

// Handle delete user
const { run: deleteUserApi } = fnJob({
  api: (msv: string) => UserRepository.deleteUser(msv),
  fnSuccess: (data) => {
    notification.success({
      message: "Xóa sinh viên thành công",
    });
    emit("refreshTable");
  },
  fnError: (err) => {
    notification.error({
      message: "Không thể xóa sinh viên",
    });
  },
  options: {
    showLoading: true,
  },
});

const handleDeleteUser = (msv: string) => {
  deleteUserApi(msv);
};
</script>

<style lang="scss" scoped></style>

<style lang="scss" scoped>
.table-user {
  background: #ffffff;
  border-radius: 5px;
  padding: 32px;
  box-shadow: 0px 4px 15px rgba(181, 181, 195, 0.25);
  min-height: 100%;
  width: 100%;
}
</style>
