<template>
  <div class="card-login">
    <h4 class="title">Quên mật khẩu</h4>
    <div class="w-full">
      <a-form :model="formState" layout="vertical" @validate="validatedForm">
        <a-form-item
          name="maSV"
          :rules="[
            { required: true, message: 'Xin hãy nhập mã sinh viên của bạn!' },
          ]"
        >
          <a-input
            v-model:value="formState.maSV"
            placeholder="Mã sinh viên của bạn"
          />
        </a-form-item>
        <a-form-item
          name="email"
          :rules="[
            { required: true, message: 'Xin hãy nhập email của bạn!' },
            { type: 'email', message: 'Vui lòng nhập đúng định dạng email' },
          ]"
        >
          <a-input
            v-model:value="formState.email"
            placeholder="Email của bạn"
          />
        </a-form-item>
        <div
          class="flex justify-end text-blue-400 font-medium mb-4 cursor-pointer"
          @click="redirectLogin"
        >
          Quay lại đăng nhập?
        </div>
        <div class="text-center">
          <Button
            class="mt-3"
            btn-type="primary"
            :disabled="!isActiveBtnSubmit"
            @click="onSubmit"
            >Kích hoạt mật khẩu</Button
          >
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "@/components/button/Button.vue";
import { AppRouteGruads } from "@/modules/auth/router/paths";
import { Form } from "ant-design-vue";
import { computed, reactive, UnwrapRef } from "vue";
import { useRouter } from "vue-router";

interface FormState {
  maSV: string;
  email: string;
}
const useForm = Form.useForm;
const router = useRouter();

const formState: UnwrapRef<FormState> = reactive({
  maSV: "",
  email: "",
});

const validate = reactive<{ [key in keyof FormState]: boolean }>({
  email: false,
  maSV: false,
});

const isActiveBtnSubmit = computed(() => {
  const isValidateFalse = !validate.email || !validate.maSV;
  return formState.email && formState.maSV && !isValidateFalse;
});

const formControl = useForm(formState);

function validatedForm(name: keyof FormState, status: any) {
  validate[name] = status;
}

const onSubmit = async () => {
  formControl.resetFields();
};

const redirectLogin = () => {
  router.push({ name: AppRouteGruads.Login.name });
};
</script>

<style lang="scss" scoped>
.card-login {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  .title {
    font-size: 22px;
    text-align: center;
    font-weight: 600;
    margin-bottom: 24px;
  }

  .wrap-form {
    width: 80%;

    .text-forgot-password {
      display: flex;
      justify-content: flex-end;
      @apply text-blue-400;
      font-weight: 500;
      cursor: pointer;
    }
  }
}
</style>
