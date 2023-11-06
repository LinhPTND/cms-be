import adminLocales from "@/modules/admin/locales";
import AdminRoutePaths from "@/modules/admin/router/paths";

declare global {
  interface RoutePaths {
    Admin: typeof AdminRoutePaths;
  }
  
  interface Localization {
    admin: typeof adminLocales.vi;
  }
}
