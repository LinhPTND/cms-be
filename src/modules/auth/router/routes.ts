import AuthRoutePaths from "@/modules/auth/router/paths";
import { defineAsyncComponent } from "vue";
import { RouteRecordRaw } from "vue-router";
import { AppRouteGruads } from "./paths";

const route: RouteRecordRaw = {
  path: AuthRoutePaths.Index,
  component: () => import("@/layouts/LoginLayout/Index.vue"),
  meta: {
    title: "Auth",
    showChildrenInMenu: false,
    showInMenu: false,
  },
  children: [
    {
      path: AuthRoutePaths.Index,
      component: () =>
        defineAsyncComponent(() => import("@/modules/auth/views/Login.vue")),
      name: AppRouteGruads.Login.name,
    },
    {
      path: AuthRoutePaths.ForgotPassword,
      component: () =>
        defineAsyncComponent(
          () => import("@/modules/auth/views/ForgotPassword.vue")
        ),
      name: AppRouteGruads.ForgotPassword.name,
    },
  ],
};

export default route;
