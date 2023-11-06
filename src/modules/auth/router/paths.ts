import { createRoutePath } from "@/core/utilities";

type GuardKey = "Index" | "Login" | "ForgotPassword";

export const AppRouteGruads: Record<GuardKey, AppRouteGuard> = {
  Index: {
    path: "auth",
    name: "AUTH",
  },
  Login: {
    path: "login",
    name: "LOGIN",
  },
  ForgotPassword: {
    path: "forgot-password",
    name: "FORGOT_PASSWORD",
  },
};

const AuthRoutePaths = createRoutePath({
  Index: AppRouteGruads.Index.path,
  Login: AppRouteGruads.Login.path,
  ForgotPassword: AppRouteGruads.ForgotPassword.path,
} as const);

export default AuthRoutePaths;
