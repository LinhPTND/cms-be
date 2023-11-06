<template>
  <a-modal
    class="modal-update-info"
    :visible="props.visible"
    title="Sửa thông tin sinh viên"
    @cancel="props.handleCancel"
    destroy-on-close
    width="1200px"
    :footer="null"
  >
    <Form
      layout="vertical"
      @finish="handleFinish"
      :initial-values="teacherInfo"
      enable-reinitialize
    >
      <a-row :gutter="[30, 4]">
        <a-col :span="12">
          <form-item name="name" label="Họ tên" input="a-input" />
        </a-col>

        <a-col :span="12">
          <form-item
            name="gender"
            label="Giới tính"
            v-slot="{ value, handleChange }"
          >
            <a-select
              :value="value"
              @update:value="handleChange"
              :options="Genders"
            />
          </form-item>
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
            name="birthDay"
            label="Ngày sinh"
            v-slot="{ value, handleChange }"
            :value-transformer="{
              in: (value) => dayjs(value),
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
          <form-item name="age" label="Tuổi" input="a-input-number" />
        </a-col>
        <a-col :span="12">
          <form-item
            name="address"
            label="Địa chỉ thường trú"
            input="a-input"
          />
        </a-col>
      </a-row>
      <a-col class="text-right" :span="24">
        <a-button
          class="w-[100px] font-semibold"
          type="primary"
          html-type="submit"
          >Lưu</a-button
        >
      </a-col>
    </Form>
  </a-modal>
</template>

<script lang="ts" setup>
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import InputTextNumber from "@/components/InputTextNumber.vue";
import { Genders } from "@/constants/Options";
import { fnJob } from "@/core/composables/useJob";
import { InfoResponse, UpdateInfoRequest } from "@/models/Teacher";
import TeacherRepository from "@/repositories/TeacherRepository";
import { notification } from "ant-design-vue";
import { Rule } from "ant-design-vue/es/form/interface";
import dayjs from "dayjs";

const props = defineProps<{
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  teacherInfo?: InfoResponse;
}>();

const emit = defineEmits<{
  (e: "refresh"): void;
}>();

const validatePhone = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("Bạn phải nhập số điện thoại");
  }

  const status = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value.toString());
  if (!status) {
    return Promise.reject("Bạn phải nhập đúng số điện thoại");
  } else return Promise.resolve();
};

// Update user info
const { run: updateUserInfoApi } = fnJob({
  api: (id: string, payload: UpdateInfoRequest) =>
    TeacherRepository.updateInfo(id, payload),
  fnSuccess: (data) => {
    notification.success({
      message: "Cập nhật thông tin thành công!",
    });
    props.handleOk();
    emit("refresh");
  },
  fnError: (err) => {
    notification.error({
      placement: "topRight",
      message: "Cập nhật thông tin thất bại!",
    });
  },
  options: {
    showLoading: true,
  },
});

const handleFinish = (values: any) => {
  if (props.teacherInfo) {
    updateUserInfoApi(props.teacherInfo._id, values);
  }
};
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.modal-update-info {
  label {
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
