<template>
  <a-modal
    class="modal-add-user"
    :visible="props.visible"
    title="Thêm sinh viên"
    @cancel="props.handleCancel"
    destroy-on-close
    width="900px"
    :footer="null"
  >
    <Form layout="vertical" @finish="handleFinish">
      <a-row :gutter="24">
        <a-col :span="6">
          <form-item
            name="msv"
            label="Mã sinh viên"
            input="a-input"
            :rules="[{ required: true, message: 'Bạn phải nhập mã sinh viên' }]"
          />
        </a-col>
        <a-col :span="6">
          <form-item
            name="name"
            label="Họ tên"
            input="a-input"
            :rules="[
              { required: true, message: 'Bạn phải nhập họ tên sinh viên' },
            ]"
          />
        </a-col>
        <a-col :span="6">
          <form-item
            name="gender"
            label="Giới tính"
            v-slot="{ value, handleChange }"
            :rules="[{ required: true, message: 'Bạn phải chọn giới tính' }]"
          >
            <a-select
              :value="value"
              @update:value="handleChange"
              :options="Genders"
              placeholder="Giới tính"
            />
          </form-item>
        </a-col>
        <a-col :span="6">
          <form-item
            name="birthDay"
            label="Ngày sinh"
            v-slot="{ value, handleChange }"
            :rules="[{ required: true, message: 'Bạn phải chọn ngày sinh' }]"
            :value-transformer="{
              in: (value) => (value ? dayjs(value) : value),
              out: (value) => dayjs(value).format('YYYY-MM-DD'),
            }"
          >
            <a-date-picker
              :value="value"
              @update:value="handleChange"
              format="DD/MM/YYYY"
              placeholder="DD/MM/YYYY"
            />
          </form-item>
        </a-col>

        <a-col :span="6">
          <form-item
            name="class"
            label="Lớp"
            input="a-input"
            :rules="[{ required: true, message: 'Bạn phải nhập lớp' }]"
          />
        </a-col>
        <a-col :span="6">
          <form-item
            name="majors"
            label="Ngành"
            input="a-select"
            :input-props="{ options: Majors, placeholder: 'Chọn ngành' }"
            :rules="[{ required: true, message: 'Bạn phải chọn ngành' }]"
          />
        </a-col>

        <a-col :span="6">
          <form-item
            name="timeCourse"
            label="Khóa"
            input="a-input"
            :rules="[{ required: true, message: 'Bạn phải nhập khóa' }]"
          />
        </a-col>

        <a-col :span="6">
          <form-item
            name="email"
            label="Email"
            input="a-input"
            :input-props="{ type: 'email' }"
          />
        </a-col>
      </a-row>
      <form-item hide-text-error>
        <a-button
          class="w-full font-semibold mt-2"
          type="primary"
          html-type="submit"
        >
          Thêm
        </a-button>
      </form-item>
    </Form>
  </a-modal>
</template>

<script lang="ts" setup>
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import { Genders, Majors } from "@/constants/Options";
import { fnJob } from "@/core/composables/useJob";
import { CreateUserRequest } from "@/models/User";
import UserRepository from "@/repositories/UserRepository";
import { notification } from "ant-design-vue";
import dayjs from "dayjs";

const props = defineProps<{
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}>();

const emit = defineEmits<{
  (e: "finish"): void;
}>();

const { run: createUserAPI } = fnJob({
  api: (payload: CreateUserRequest) => UserRepository.addUser(payload),
  fnSuccess: ({ data }) => {
    props.handleOk();
    notification.success({
      message: "Tạo mới user thành công",
    });
    emit("finish");
  },
  fnError: () => {
    notification.error({
      message: "Tạo mới user thất bại",
    });
  },
  options: {
    showLoading: true,
  },
});

const handleFinish = (values: CreateUserRequest) => {
  createUserAPI(values);
};
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.modal-add-user {
  .ant-modal-body {
    padding: 30px 24px 40px;
  }

  label {
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
