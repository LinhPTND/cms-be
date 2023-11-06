import userLocales from "@/modules/user/locales";
import UserRoutePaths from "@/modules/user/router/paths";
import route from "@/modules/user/router/routes";

const module: AppModule = {
  name: "User",
  router: {
    path: UserRoutePaths,
    route,
  },
  locales: userLocales,
  order: 3,
};

export default module;
