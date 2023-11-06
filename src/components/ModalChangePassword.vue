<template>
  <a-modal
    class="modal-change-password"
    :visible="props.visible"
    title="Đổi mật khẩu"
    @cancel="props.handleCancel"
    width="600px"
    :footer="null"
  >
    <Form layout="vertical" @finish="handleFinish" ref="formRef">
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
        input="a-input-password"
        :rules="[
          {
            type: 'string',
            min: 6,
          },
          { validator: validatePass2 },
        ]"
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
import { ChangePasswordRequest } from "@/models/User";
import UserRepository from "@/repositories/UserRepository";
import { useAuth } from "@/stores/auth";
import { notification } from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  msv?: string;
}>();

const formRef = ref<FormExposed>();
const router = useRouter();
const { logout } = useAuth();

const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Vui lòng nhập lại mật khẩu");
  } else if (value !== formRef.value?.getFieldValue("newPassword")) {
    return Promise.reject("Hai mật khẩu không khớp!");
  } else {
    return Promise.resolve();
  }
};

// Handle change password
const { run: changePasswordApi } = fnJob({
  api: (payload: ChangePasswordRequest) =>
    UserRepository.changePassword(payload),
  fnSuccess: (data) => {
    notification.success({
      message: "Đổi mật khẩu thành công!",
    });
    props.handleOk();
    logout();
    router.push({ name: "LOGIN" });
  },
  fnError: (err) => {
    notification.error({
      message: "Đổi mật khẩu thất bại! Xin hãy kiểm tra mật khẩu cũ của bạn",
    });
  },
  options: {
    showLoading: true,
  },
});

const handleFinish = (values: any) => {
  if (props.msv) {
    changePasswordApi({
      msv: props.msv,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
  }
};
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.modal-change-password {
  .ant-modal-body {
    padding: 20px 80px 40px 80px;
  }

  label {
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
