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
      :initial-values="userInfo"
      enable-reinitialize
    >
      <a-row :gutter="[30, 4]">
        <a-col :span="12">
          <form-item name="msv" label="Mã sinh viên" input="a-input" />
        </a-col>
        <a-col :span="12"> </a-col>
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
                  in: (value) => dayjs(value),
                  out: (value) => dayjs(value).format('YYYY-MM-DD'),
                }"
              >
                <a-date-picker
                  :value="value"
                  @update:value="handleChange"
                  format="DD/MM/YYYY"
                  value-format="YYYY-MM-DD"
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
                :rules="[{ validator: validatePhone }]"
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
                  in: (value) => dayjs(value),
                  out: (value) => dayjs(value).format('YYYY-MM-DD'),
                }"
              >
                <a-date-picker
                  :value="value"
                  @update:value="handleChange"
                  format="DD/MM/YYYY"
                />
              </form-item>
            </a-col>
            <a-col :span="12">
              <form-item name="email" label="Email" input="a-input" />
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
                input="a-input"
              />
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
import { Rule } from "ant-design-vue/es/form/interface";
import dayjs from "dayjs";

const props = defineProps<{
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  userInfo?: InfoResponse;
}>();

const emit = defineEmits<{
  (e: "change"): void;
}>();

// Update user info
const { run: updateUserInfoApi } = fnJob({
  api: (msv: string, payload: UpdateInfoRequest) =>
    UserRepository.updateInfo(msv, payload),
  fnSuccess: (data) => {
    notification.success({
      message: "Cập nhật thông tin thành công!",
    });
    emit("change");
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

const validatePhone = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("Bạn phải nhập số điện thoại");
  }

  const status = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value.toString());
  if (!status) {
    return Promise.reject("Bạn phải nhập đúng số điện thoại");
  } else return Promise.resolve();
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
