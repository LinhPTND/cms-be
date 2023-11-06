import Router from "@/core/router";
import routes from "@/router/routes";
import { createWebHistory } from "vue-router";

const router = new Router({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
