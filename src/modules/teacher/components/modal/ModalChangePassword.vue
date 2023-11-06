<template>
  <a-modal
    class="modal-change-password"
    :visible="props.visible"
    title="Đổi mật khẩu"
    @cancel="props.handleCancel"
    width="600px"
    destroy-on-close
    :footer="null"
  >
    <Form
      ref="formRef"
      layout="vertical"
      @finish="handleFinish"
      enable-reinitialize
    >
      <form-item
        name="oldPassword"
        label="Mật khẩu hiện tại"
        input="a-input-password"
        :rules="[
          { required: true, message: 'Vui lòng nhập mật khẩu!' },
          {
            type: 'string',
            min: 6,
          },
        ]"
      />
      <form-item
        name="newPassword"
        label="Mật khẩu mới"
        input="a-input-password"
        :rules="[
          { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
          {
            type: 'string',
            min: 6,
          },
        ]"
      />
      <form-item
        name="rePassword"
        label="Nhập lại mật khẩu mới"
        :rules="[
          { validator: validatePass },
          {
            type: 'string',
            min: 6,
          },
        ]"
        input="a-input-password"
      />

      <form-item class="mb-0 text-center">
        <a-button
          class="w-full font-semibold"
          type="primary"
          html-type="submit"
        >
          Lưu
        </a-button>
      </form-item>
    </Form>
  </a-modal>
</template>

<script lang="ts" setup>
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import { fnJob } from "@/core/composables/useJob";
import { FormExposed } from "@/models/Form";
import { ChangePasswordRequest } from "@/models/Teacher";
import TeacherRepository from "@/repositories/TeacherRepository";
import { useAuth } from "@/stores/auth";
import { notification } from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import { ref } from "vue";

interface FormState {
  oldPassword: string;
  newPassword: string;
  rePassword: string;
}

const { user } = useAuth();
const formRef = ref<FormExposed>();

const props = defineProps<{
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}>();

const validatePass = async (_rule: Rule, value: string) => {
  const newPassword = formRef.value?.getFieldValue("newPassword");
  if (value === "") {
    return Promise.reject("Vui lòng nhập lại mật khẩu");
  } else if (value !== newPassword) {
    return Promise.reject("Hai mật khẩu không khớp!");
  } else {
    return Promise.resolve();
  }
};

// Handle change password
const { run: changePasswordApi } = fnJob({
  api: (payload: ChangePasswordRequest) =>
    TeacherRepository.changePassword(payload),
  fnSuccess: (data) => {
    notification.success({
      message: "Đổi mật khẩu thành công!",
    });
    props.handleOk();
  },
  fnError: () => {
    notification.error({
      message: "Đổi mật khẩu thất bại!",
    });
  },
});

const handleFinish = (values: any) => {
  if (user?.username)
    changePasswordApi({
      phone: user.username,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
};
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.modal-change-password {
  .ant-modal-body {
    padding: 20px 80px;
  }

  label {
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
