import { inject } from "vue";
import { Account, LoginRequest } from "./../../models/Auth";

export const authInjectKey = Symbol("auth");

export default function useAuth() {
  return inject<{
    account: Account | undefined;
    token: string | undefined;
    isLoggedIn: boolean;
    login: (value: LoginRequest) => void;
    logout: () => void;
  }>(authInjectKey, {
    account: undefined,
    isLoggedIn: false,
    token: undefined,
    login: () => {},
    logout: () => {},
  });
}
