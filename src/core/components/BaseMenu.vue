<template>
  <a-menu
    :openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :inlineCollapsed="false"
    :subMenuOpenDelay="0.5"
    :subMenuCloseDelay="0.5"
    :inlineIndent="15"
  >
    <base-menu-sub-menu
      :routes="routes"
      @subMenuTitleClick="handleSubMenuClick"
    />
  </a-menu>
</template>

<script lang="ts" setup>
import { pathMatched } from "@/core/utilities";
import { onBeforeMount, ref, watch } from "vue";
import { RouteRecordRaw, useRoute, useRouter } from "vue-router";
import BaseMenuSubMenu from "./BaseMenuSubMenu.vue";

const props = defineProps<{
  routes: RouteRecordRaw[];
  addRouteLinkToSubMenu?: boolean;
}>();

const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);
const route = useRoute();
const router = useRouter();

const showSubMenu = (route: RouteRecordRaw) => {
  return (
    route.children &&
    route.children.length > 0 &&
    (typeof route.meta?.showChildrenInMenu !== "undefined"
      ? route.meta.showChildrenInMenu
      : true)
  );
};

const handleSelectMenuItems = (routes: RouteRecordRaw[]) => {
  let openKey: string | undefined = undefined;
  let selectedKey: string | undefined = undefined;

  for (const menu of routes) {
    if (pathMatched(route.path, menu.path)) {
      if (showSubMenu(menu)) {
        openKey = menu.path;
        selectedKey = undefined;
        handleSelectMenuItems(menu.children || []);
        break;
      } else {
        if (menu.children && menu.children.length) {
          selectedKey = menu.path;
          break;
        } else if (pathMatched(route.path, menu.path, true)) {
          selectedKey = menu.path;
        }
      }
    }
  }

  openKey && openKeys.value.push(openKey);
  selectedKey && selectedKeys.value.push(selectedKey);
};

onBeforeMount(() => {
  openKeys.value = [];
  selectedKeys.value = [];
  handleSelectMenuItems(props.routes);
});

watch(route, () => {
  openKeys.value = [];
  selectedKeys.value = [];
  handleSelectMenuItems(props.routes);
});

const handleSubMenuClick = ({ key }: { key: string }) => {
  if (props.addRouteLinkToSubMenu) {
    router.push(key);
  }
};
</script>
