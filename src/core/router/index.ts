import { App, reactive } from "vue";
import {
  createRouter,
  Router as VueRouter,
  RouteRecordRaw,
  RouterOptions,
} from "vue-router";

export default class Router {
  private _vueRouter: VueRouter;
  private routes: RouteRecordRaw[];

  constructor(options: RouterOptions) {
    this._vueRouter = createRouter(options);
    this.routes = reactive([...options.routes]);
  }

  install(app: App) {
    this._vueRouter.install(app);
  }

  addRoute(route: RouteRecordRaw) {
    this.routes.push(route);
    this._vueRouter.addRoute(route);
  }

  removeRoute(name: string) {
    const routeIndex = this.routes.findIndex(
      (route) => route.name === name || route.path === name
    );
    if (routeIndex > -1) {
      this.routes.splice(routeIndex, 1);
      this._vueRouter.removeRoute(name);
    }
  }

  hasRoute(name: string) {
    return this._vueRouter.hasRoute(name);
  }

  getRoutes() {
    return this.routes;
  }
}
