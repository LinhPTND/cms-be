<template>
  <a-modal
    class="modal-update-info"
    :visible="props.visible"
    title="Sửa thông tin sinh viên"
    @cancel="props.handleCancel"
    width="1200px"
    :footer="null"
  >
    <Form
      layout="vertical"
      @finish="handleFinish"
      :initial-values="userInfo"
      enable-reinitialize
    >
      <a-row :gutter="[30, 4]">
        <a-col :span="6">
          <form-item name="name" label="Họ tên" input="a-input" />
        </a-col>
        <a-col :span="6">
          <form-item
            name="majors"
            label="Ngành"
            input="a-select"
            :input-props="{ options: Majors, placeholder: 'Chọn ngành' }"
          />
        </a-col>
        <a-col :span="6">
          <form-item name="class" label="Lớp" input="a-input" />
        </a-col>
        <a-col :span="6">
          <form-item name="timeCourse" label="Khóa" input="a-input" />
        </a-col>
        <a-col :span="12">
          <a-row :gutter="[30, 4]">
            <a-col class="mb-2 font-semibold uppercase" :span="24">
              Thông tin cơ bản
            </a-col>
            <a-col :span="12">
              <form-item
                name="birthDay"
                label="Ngày sinh"
                v-slot="{ value, handleChange }"
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
              <form-item name="age" label="Tuổi" input="a-input-number" />
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
              <form-item name="citizenId" label="CCCD/CMND" input="a-input" />
            </a-col>
            <a-col :span="12">
              <form-item
                name="phone"
                label="Số điện thoại"
                v-slot="{ value, handleChange }"
              >
                <InputTextNumber :value="value" @update:value="handleChange" />
              </form-item>
            </a-col>
            <a-col :span="12">
              <form-item
                name="dateCitizenId"
                label="Ngày cấp"
                v-slot="{ value, handleChange }"
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
                input="a-input"
                :rules="{ type: 'email' }"
              />
            </a-col>
            <a-col :span="12">
              <form-item
                name="placeCitizenId"
                label="Nơi cấp"
                input="a-input"
              />
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="12">
          <a-row :gutter="[30, 4]">
            <a-col class="mb-2 font-semibold uppercase" :span="24">
              Thông tin địa chỉ
            </a-col>
            <a-col :span="12">
              <form-item
                name="parentName"
                label="Họ tên bố (mẹ)"
                input="a-input"
              />
            </a-col>
            <a-col :span="12">
              <form-item name="hometown" label="Quê Quán" input="a-input" />
            </a-col>
            <a-col :span="24">
              <form-item
                name="parentPhone"
                label="Số điện thoại bố/mẹ"
                v-slot="{ value, handleChange }"
              >
                <InputTextNumber :value="value" @update:value="handleChange" />
              </form-item>
            </a-col>
            <a-col :span="24">
              <form-item
                name="permanentResidence"
                label="Hộ Khẩu thường trú"
                input="a-input"
              />
            </a-col>
            <a-col :span="24">
              <form-item
                name="address"
                label="Địa chỉ thường trú"
                input="a-input"
              />
            </a-col>
          </a-row>
        </a-col>
        <a-col class="text-right" :span="24">
          <a-button
            class="w-[100px] font-semibold"
            type="primary"
            html-type="submit"
            >Lưu</a-button
          >
        </a-col>
      </a-row>
    </Form>
  </a-modal>
</template>

<script lang="ts" setup>
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import InputTextNumber from "@/components/InputTextNumber.vue";
import { Genders, Majors } from "@/constants/Options";
import { fnJob } from "@/core/composables/useJob";
import { InfoResponse, UpdateInfoRequest } from "@/models/User";
import UserRepository from "@/repositories/UserRepository";
import { notification } from "ant-design-vue";
import dayjs from "dayjs";

const props = defineProps<{
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  userInfo?: InfoResponse;
}>();

const emit = defineEmits<{
  (e: "finish"): void;
}>();

// Update user info
const { run: updateUserInfoApi } = fnJob({
  api: (msv: string, payload: UpdateInfoRequest) =>
    UserRepository.updateInfo(msv, payload),
  fnSuccess: (data) => {
    notification.success({
      message: "Cập nhật thông tin thành công!",
    });
    emit("finish");
    props.handleOk();
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
  if (props.userInfo) {
    updateUserInfoApi(props.userInfo.msv, values);
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
