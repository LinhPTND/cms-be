<template>
  <slot />
</template>

<script lang="ts" setup>
import { Api } from "@/core/api";
import TokenManager from "@/core/utilities/TokenManager";
import AuthRepository from "@/repositories/AuthRepository";
import { useAuth } from "@/stores/auth";
import { AxiosError } from "axios";
import { storeToRefs } from "pinia";
import { lastValueFrom } from "rxjs";
import { onUnmounted, reactive, ref, watchEffect } from "vue";
const { isLoggedIn, accessToken, refreshToken } = storeToRefs(useAuth());
const { login, logout } = useAuth();

// Handle add tokens
watchEffect(() => {
  if (isLoggedIn.value) {
    TokenManager.setToken("base_token", accessToken.value);
    TokenManager.setToken("refresh_token", refreshToken.value);
  } else {
    TokenManager.setToken("base_token", "");
    TokenManager.setToken("refresh_token", "");
  }
});

// Handle refresh token

const isRefreshing = ref(false);
const failedQueue = reactive<
  {
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }[]
>([]);

const processQueue = (error: any, token?: string) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue.splice(0);
};

const unSubscribe = Api.addInterceptor({
  response: {
    error: (error, handleError, axios) => {
      console.log("401 error handler", error);

      if (!(error instanceof AxiosError)) {
        return handleError(error);
      }
      const { response, config } = error;

      if (response?.status === 401) {
        if (isRefreshing.value) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              return lastValueFrom(axios.request(config));
            })
            .catch((err) => {
              return handleError(err);
            });
        }

        isRefreshing.value = true;
        return new Promise((resolve, reject) => {
          lastValueFrom(AuthRepository.refreshToken(refreshToken.value))
            .then(({ data }) => {
              isRefreshing.value = false;
              login(data.data);
              processQueue(null, data.data.accessToken);
              resolve(lastValueFrom(axios.request(config)));
            })
            .catch((error) => {
              isRefreshing.value = false;
              logout();
              processQueue(error);
              reject(error);
            });
        });
      }

      return handleError(error);
    },
  },
});

onUnmounted(() => {
  unSubscribe();
});
</script>
