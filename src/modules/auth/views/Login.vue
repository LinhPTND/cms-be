<template>
  <div class="card-login">
    <h3 class="title uppercase">Đăng nhập</h3>
    <div class="wrap-form">
      <a-form :model="formState" layout="vertical" @finish="onFinish">
        <a-form-item
          name="username"
          label="Tài khoản"
          :rules="[
            { required: true, message: 'Xin hãy nhập tài khoản của bạn!' },
          ]"
        >
          <a-input v-model:value="formState.username" autoComplete="off" />
        </a-form-item>
        <a-form-item
          name="password"
          label="Mật khẩu"
          :rules="[
            { required: true, message: 'Xin hãy nhập mật khẩu của bạn!' },
            {
              type: 'string',
              min: 6,
              message: 'Mật khẩu phải có ít nhất 6 ký tự',
            },
          ]"
        >
          <a-input-password
            v-model:value="formState.password"
            autoComplete="off"
          />
        </a-form-item>

        <div class="flex items-center justify-center mt-[16px]">
          <Button btn-type="primary" html-type="submit">Đăng nhập</Button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "@/components/button/Button.vue";
import { fnJob } from "@/core/composables/useJob";
import { LoginRequest } from "@/models/Auth";
import AdminRoutePaths from "@/modules/admin/router/paths.js";
import AuthRoutePaths from "@/modules/auth/router/paths";
import TeacherRoutePaths from "@/modules/teacher/router/paths.js";
import UserRoutePaths from "@/modules/user/router/paths.js";
import AuthRepository from "@/repositories/AuthRepository";
import { useAuth } from "@/stores/auth.js";
import { notification } from "ant-design-vue";
import { reactive, UnwrapRef } from "vue";
import { useRouter } from "vue-router";

interface FormState {
  username: string;
  password: string;
}

const formState: UnwrapRef<FormState> = reactive({
  username: "",
  password: "",
});

const router = useRouter();
const { login } = useAuth();

const { run: loginAPI } = fnJob({
  api: (payload: LoginRequest) => AuthRepository.login(payload),
  fnSuccess: ({ data }) => {
    console.log(data, "dataLogin");
    if (data.success) {
      login({
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      });
      notification.success({
        message: "Đăng nhập thành công",
      });
      const typeAccount = data.data.type;
      if (typeAccount === "admin") {
        router.push(AdminRoutePaths.Index);
      } else if (typeAccount === "teacher") {
        router.push(TeacherRoutePaths.Index);
      } else {
        router.push(UserRoutePaths.Index);
      }
    } else {
      if (data.message === "Lock account") {
        notification.error({
          message: "Tài khoản của bạn đã bị khóa vì đăng nhập sai quá 5 lần",
        });
      } else {
        notification.error({
          message: "Tài khoản hoặc mật khẩu không đúng",
        });
      }
    }
  },
  options: {
    showLoading: true,
  },
});

const redirectForgotPassword = () => {
  router.push(AuthRoutePaths.ForgotPassword);
};

const onFinish = async ({ username, password }: FormState) => {
  let typeAccount: "admin" | "teacher" | "user" = "user";
  if (username === "admin") {
    typeAccount = "admin";
  } else if (/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(username)) {
    typeAccount = "teacher";
  } else {
    typeAccount = "user";
  }

  await loginAPI({
    username: username.trim(),
    password: password,
    type: typeAccount,
  });
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
