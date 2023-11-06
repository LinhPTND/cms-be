import AdminRoutePaths from "@/modules/admin/router/paths";
import AuthRoutePaths from "@/modules/auth/router/paths";
import TeacherRoutePaths from "@/modules/teacher/router/paths";
import UserRoutePaths from "@/modules/user/router/paths";
import { useAuth } from "@/stores/auth";
import { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw = {
  path: AdminRoutePaths.Index,
  component: () => import("@/layouts/AdminLayout/Index.vue"),
  meta: {
    title: "Admin",
    showChildrenInMenu: false,
    showInMenu: false,
  },
  beforeEnter: async (to, from, next) => {
    const { isLoggedIn, user } = useAuth();
    if (!isLoggedIn) {
      next({ name: "LOGIN" });
    } else if (user?.type !== "admin") {
      if (user?.type === "user") {
        next(UserRoutePaths.Index);
      } else if (user?.type === "teacher") {
        next(TeacherRoutePaths.Index);
      } else next(AuthRoutePaths.Index);
    } else next();
  },
  children: [
    {
      path: AdminRoutePaths.Index,
      component: () => import("@/modules/admin/views/AdminIndex.vue"),
      name: "AdminLetter",
    },
    {
      path: AdminRoutePaths.User,
      component: () => import("@/modules/admin/views/ManageUser.vue"),
      name: "ManageUser",
    },
    {
      path: AdminRoutePaths.Teacher,
      component: () => import("@/modules/admin/views/ManageTeacher.vue"),
      name: "ManageTeacher",
    },
  ],
};

export default route;
