import adminLocales from "@/modules/admin/locales";
import AdminRoutePaths from "@/modules/admin/router/paths";
import route from "@/modules/admin/router/routes";

const module: AppModule = {
  name: "Admin",
  router: {
    path: AdminRoutePaths,
    route,
  },
  locales: adminLocales,
  order: 4,
};

export default module;
