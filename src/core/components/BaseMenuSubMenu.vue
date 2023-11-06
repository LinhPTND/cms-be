<template>
  <template v-for="menuItem in routes">
    <a-sub-menu
      v-if="showSubMenu(menuItem)"
      :key="menuItem.path"
      :title="menuItem.meta?.title"
      popupClassName="hehe"
      @titleClick="
        !menuItem.meta?.collapse &&
          $emit('subMenuTitleClick', { key: menuItem.path, domEvent: $event })
      "
    >
      <template #icon>
        <component v-if="menuItem.meta?.icon" :is="menuItem.meta.icon" />
      </template>
      <BaseMenuSubMenu
        :routes="menuItem.children || []"
        :addRouteLinkToSubMenu="addRouteLinkToSubMenu"
        v-on:subMenuTitleClick="$emit('subMenuTitleClick', $event)"
      />
    </a-sub-menu>
    <template v-else>
      <a-menu-item v-if="showItem(menuItem)" :key="menuItem.path">
        <a-tooltip :title="menuItem.meta?.title" :mouseEnterDelay="0.5">
          <router-link :to="menuItem.path">
            {{ menuItem.meta?.title }}
          </router-link>
        </a-tooltip>
        <template #icon>
          <component v-if="menuItem.meta?.icon" :is="menuItem.meta.icon" />
        </template>
      </a-menu-item>
    </template>
  </template>
</template>
<script lang="ts" setup>
import { RouteRecordRaw } from "vue-router";

defineProps<{ routes: RouteRecordRaw[]; addRouteLinkToSubMenu?: boolean }>();

defineEmits<{
  (
    event: "subMenuTitleClick",
    val: { key: string; domEvent: MouseEvent }
  ): void;
}>();

const showItem = (route: RouteRecordRaw) => {
  return typeof route.meta?.showInMenu !== "undefined"
    ? route.meta.showInMenu
    : true;
};

const showSubMenu = (route: RouteRecordRaw) => {
  return (
    route.children &&
    route.children.length > 0 &&
    (typeof route.meta?.showChildrenInMenu !== "undefined"
      ? route.meta.showChildrenInMenu
      : true)
  );
};
</script>
