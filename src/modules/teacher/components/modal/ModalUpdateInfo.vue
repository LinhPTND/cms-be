<template>
  <a-modal
    class="modal-update-info"
    :visible="props.visible"
    title="Sửa thông tin cá nhân"
    @cancel="props.handleCancel"
    width="800px"
    destroy-on-close
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
            name="birthDay"
            label="Ngày sinh"
            v-slot="{ value, handleChange }"
            :value-transformer="{
              in: (value) => (value ? dayjs(value) : value),
              out: (value) =>
                value ? dayjs(value).format('YYYY-MM-DD') : value,
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
            name="email"
            label="Email"
            input="a-input"
            :rules="{ type: 'email' }"
          />
        </a-col>
        <a-col :span="24">
          <form-item name="address" label="Địa chỉ" input="a-input" />
        </a-col>
        <a-col class="text-right" :span="24">
          <form-item class="mb-0">
            <a-button
              class="w-[100px] font-semibold"
              type="primary"
              html-type="submit"
            >
              Lưu
            </a-button>
          </form-item>
        </a-col>
      </a-row>
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

// Update teacher info
const { run: updateTeacherInfoApi } = fnJob({
  api: (id: string, payload: UpdateInfoRequest) =>
    TeacherRepository.updateInfo(id, payload),
  fnSuccess: (data) => {
    emit("refresh");
    notification.success({
      message: "Cập nhật thông tin thành công!",
    });
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

const validatePhone = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("Bạn phải nhập số điện thoại");
  }

  const status = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value.toString());
  if (!status) {
    return Promise.reject("Bạn phải nhập đúng số điện thoại");
  } else return Promise.resolve();
};

const handleFinish = (values: any) => {
  if (props.teacherInfo) {
    updateTeacherInfoApi(props.teacherInfo._id, {
      ...values,
      birthDay: dayjs(values.birthDay).format("YYYY-MM-DD"),
    });
  }
  props.handleOk();
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
