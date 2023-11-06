import authLocales from "@/modules/auth/locales";
import AuthRoutePaths from "@/modules/auth/router/paths";
import route from "@/modules/auth/router/routes";

const module: AppModule = {
  name: "Auth",
  router: {
    path: AuthRoutePaths,
    route,
  },
  locales: authLocales,
  order: 2,
};

export default module;
