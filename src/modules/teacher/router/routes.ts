import AdminRoutePaths from "@/modules/admin/router/paths";
import AuthRoutePaths from "@/modules/auth/router/paths";
import TeacherRoutePaths from "@/modules/teacher/router/paths";
import UserRoutePaths from "@/modules/user/router/paths";
import { useAuth } from "@/stores/auth";
import { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw = {
  path: TeacherRoutePaths.Index,
  component: () => import("@/layouts/TeacherLayout/Index.vue"),
  meta: {
    title: "Teacher",
    showChildrenInMenu: false,
    showInMenu: false,
  },
  beforeEnter: async (to, from, next) => {
    const { isLoggedIn, user } = useAuth();
    if (!isLoggedIn) {
      next({ name: "LOGIN" });
    } else if (user?.type !== "teacher") {
      if (user?.type === "user") {
        next(UserRoutePaths.Index);
      } else if (user?.type === "admin") {
        next(AdminRoutePaths.Index);
      } else next(AuthRoutePaths.Index);
    } else next();
  },
  children: [
    {
      path: TeacherRoutePaths.Index,
      component: () => import("@/modules/teacher/views/TeacherIndex.vue"),
      name: "TeacherIndex",
    },
    {
      path: TeacherRoutePaths.Info,
      component: () => import("@/modules/teacher/views/TeacherInfo.vue"),
      name: "TeacherInfo",
    },
  ],
};

export default route;
