import authLocales from "@/modules/auth/locales";
import AuthRoutePaths from "@/modules/auth/router/paths";

declare global {
  interface RoutePaths {
    Auth: typeof AuthRoutePaths;
  }
  
  interface Localization {
    auth: typeof authLocales.vi;
  }
}
