import { Component } from "vue";
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    // is optional
    icon?: Component | string;
    title?: string;
    showInMenu?: boolean;
    showChildrenInMenu?: boolean;
    collapse?: boolean;
  }
}
