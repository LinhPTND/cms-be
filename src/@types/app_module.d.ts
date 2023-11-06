import { RouteRecordRaw } from "vue-router";
declare global {
  interface AppModule {
    name: string;
    router: {
      path: Record<string, any>;
      route: RouteRecordRaw;
    };
    locales?: Record<string, any>;
    order: number;
  }
}
