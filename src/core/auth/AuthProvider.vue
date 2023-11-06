<template>
  <slot />
</template>

<script lang="ts" setup>
import { authInjectKey } from "@/core/auth/useAuth";
import TokenManager from "@/core/utilities/TokenManager";
import { Account, LoginRequest } from "@/models/Auth";
import { computed, provide, ref, unref } from "vue";

const account = ref<Account | undefined>(undefined);
const isLoggedIn = computed(() => {
  return !!TokenManager.getToken("base_token") && !!account.value;
});

const token = computed(() => {
  return TokenManager.getToken("base_token") || undefined;
});

const login = ({ username, password }: LoginRequest) => {
  // console.log(username, "username");
  // console.log(password, "password");
};

const logout = () => {
  // console.log("logout");
};

provide(authInjectKey, {
  account: unref(account),
  isLoggedIn: unref(isLoggedIn),
  token,
  login,
  logout,
});
</script>
