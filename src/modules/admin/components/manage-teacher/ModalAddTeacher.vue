<template>
  <a-modal
    class="modal-add-teacher"
    :visible="props.visible"
    title="Thêm giảng viên"
    @cancel="props.handleCancel"
    destroy-on-close
    width="1000px"
    :footer="null"
  >
    <Form layout="vertical" @finish="handleFinish">
      <a-row :gutter="[40, 6]">
        <a-col :span="12">
          <form-item
            name="name"
            label="Họ tên"
            :rules="[{ required: true, message: 'Bạn phải nhập họ tên' }]"
            input="a-input"
          />
        </a-col>
        <a-col :span="12">
          <form-item
            name="phone"
            label="Số điện thoại"
            :rules="[{ validator: validatePhone }]"
            v-slot="{ value, handleChange }"
          >
            <InputTextNumber :value="value" @update:value="handleChange" />
          </form-item>
        </a-col>
        <a-col :span="12">
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
        <a-col :span="12">
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
        <a-col :span="12">
          <form-item
            name="email"
            label="Email"
            v-slot="{ value, handleChange }"
            :rules="[{ required: true, type: 'email' }]"
          >
            <a-input :value="value" @update:value="handleChange" />
          </form-item>
        </a-col>
      </a-row>
      <form-item class="mb-0">
        <a-button
          class="w-full font-semibold"
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
import InputTextNumber from "@/components/InputTextNumber.vue";
import { Genders } from "@/constants/Options";
import { fnJob } from "@/core/composables/useJob";
import { UpdateInfoRequest } from "@/models/Teacher";
import TeacherRepository from "@/repositories/TeacherRepository";
import { notification } from "ant-design-vue";
import { Rule } from "ant-design-vue/es/form/interface";
import dayjs from "dayjs";

const props = defineProps<{
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}>();

const emit = defineEmits<{
  (e: "finish"): void;
}>();

const { run: createTeacherAPI } = fnJob({
  api: (payload: UpdateInfoRequest) => TeacherRepository.addTeacher(payload),
  fnSuccess: ({ data }) => {
    notification.success({
      message: "Tạo mới giảng viên thành công",
    });
    emit("finish");
    props.handleOk();
  },
  fnError: () => {
    notification.error({
      message: "Tạo mới giảng viên thất bại",
    });
  },
  options: {
    showLoading: true,
  },
});

const validatePhone = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("Bạn phải nhập số điện thoại");
  }

  const status = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value.toString());
  if (!status) {
    return Promise.reject("Bạn phải nhập đúng số điện thoại");
  } else return Promise.resolve();
};

const handleFinish = (values: UpdateInfoRequest) => {
  createTeacherAPI(values);
};
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.modal-add-teacher {
  .ant-modal-body {
    padding: 30px 40px 40px;
  }

  label {
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
