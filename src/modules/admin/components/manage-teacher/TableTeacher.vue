<template>
  <div class="table-teacher">
    <a-table
      :data-source="data"
      :pagination="{
        size: 'small',
        pageSize: pagination.limit,
        current: pagination.page,
        total: pagination.total,
      }"
      @change="$emit('change', $event)"
    >
      <a-table-column
        data-index="name"
        title="Họ tên"
        fixed="left"
        :width="250"
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
        data-index="birthDay"
        title="Ngày sinh"
        align="center"
        v-slot="{ text }"
      >
        <span>{{ dayjs(text).format("DD/MM/YYYY") }}</span>
      </a-table-column>
      <a-table-column data-index="phone" title="Số điện thoại" align="center" />
      <a-table-column data-index="address" title="Địa chỉ" />
      <a-table-column data-index="email" title="Email" />
      <a-table-column data-index="createdAt" title="Ngày tạo" v-slot="{ text }">
        {{ dayjs(text).format("DD/MM/YYYY") }}
      </a-table-column>
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
          @delete="() => handleDeleteTeacher(record._id)"
        />
        <!-- detail -->
        <!-- @detail="$emit('view', $event)" -->
      </a-table-column>
    </a-table>
    <ModalUpdateInfo
      :handle-cancel="handleCancelEdit"
      :handle-ok="handleOkEdit"
      :visible="visibleEdit"
      :teacher-info="userInfo"
      @refresh="$emit('refreshTable')"
    />
  </div>
</template>

<script lang="ts" setup>
import TableAction from "@/components/TableAction.vue";
import { fnJob } from "@/core/composables/useJob";
import { StatusLetter, TypeLetter } from "@/models/Letter";
import { Meta } from "@/models/Response";
import { InfoResponse } from "@/models/Teacher";
import TeacherRepository from "@/repositories/TeacherRepository";
import { notification } from "ant-design-vue";
import dayjs, { Dayjs } from "dayjs";
import { ref, watch } from "vue";
import ModalUpdateInfo from "./ModalUpdateInfo.vue";

interface Letter {
  code: string;
  name: string;
  sendDay: Dayjs | string;
  status: StatusLetter;
  typeLetter?: TypeLetter;
}

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
    ...data,
    birthDay: data.birthDay
      ? dayjs(data.birthDay).format("YYYY-MM-DD")
      : undefined,
  };
};

const handleOkEdit = () => {
  visibleEdit.value = false;
};

const handleCancelEdit = () => {
  visibleEdit.value = false;
};

// Handle delete user
const { run: deleteTeacher } = fnJob({
  api: (id: string) => TeacherRepository.deleteTeacher(id),
  fnSuccess: (data) => {
    notification.success({
      message: "Xóa giảng viên thành công",
    });
    emit("refreshTable");
  },
  fnError: (err) => {
    notification.error({
      message: "Không xóa giảng viên",
    });
  },
});

const handleDeleteTeacher = (id: string) => {
  deleteTeacher(id);
};
</script>

<style lang="scss" scoped></style>

<style lang="scss" scoped>
.table-teacher {
  background: #ffffff;
  border-radius: 5px;
  padding: 32px;
  box-shadow: 0px 4px 15px rgba(181, 181, 195, 0.25);
  min-height: 100%;
  width: 100%;
}
</style>
