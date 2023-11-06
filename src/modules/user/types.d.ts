import userLocales from "@/modules/user/locales";
import UserRoutePaths from "@/modules/user/router/paths";

declare global {
  interface RoutePaths {
    User: typeof UserRoutePaths;
  }
  
  interface Localization {
    user: typeof userLocales.vi;
  }
}
