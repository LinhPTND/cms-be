<template>
  <div class="side-bar" v-bind="$attrs">
    <BaseMenu :routes="routes" :add-route-link-to-sub-menu="true" />
  </div>
  <a-drawer
    :closable="false"
    :visible="drawerVisible"
    placement="left"
    @close="$emit('update:drawerVisible', false)"
    class="sidebar-drawer"
  >
    <div class="flex justify-between">
      <div class="flex items-center">
        <img :src="Assets.Images.Logo" class="h-11 mx-3 my-2" />
        <div class="title text-ellipsis font-bold text-base">
          Học viện kĩ thuật mật mã
        </div>
      </div>
      <Button
        @click="$emit('update:drawerVisible', false)"
        class="m-2"
        btn-type="text"
      >
        <template #icon>
          <Icon name="mobileCancelMajor" />
        </template>
      </Button>
    </div>
    <BaseMenu
      class="drawer-menu"
      :routes="routes"
      :add-route-link-to-sub-menu="true"
    />
  </a-drawer>
</template>

<script setup lang="ts">
import Assets from "@/assets";
import Icon from "@/components/Icon.vue";
import BaseMenu from "@/core/components/BaseMenu.vue";
import router from "@/router";
import { computed } from "@vue/reactivity";
import _ from "lodash";
import { RouteRecordRaw } from "vue-router";
import Button from "../../components/button/Button.vue";

defineProps<{ drawerVisible: boolean }>();

defineEmits<{
  (event: "update:drawerVisible", val: boolean): void;
}>();

const routes = computed(() => {
  const allRoutes = router.getRoutes();
  let routesUser: RouteRecordRaw[] = [];
  allRoutes.map((routeItem) => {
    if (routeItem.path === "/user" && routeItem.children) {
      routesUser = [...routeItem.children];
    }
  });

  return _.uniqBy(routesUser, "path");
});
</script>

<style lang="scss" scoped>
.side-bar {
  @apply hidden md:block;

  padding-top: 24px;

  border-right: 2px solid #e2e9f1;
  background: #f3f6f9;
  min-width: 240px;
  max-width: 240px;
}

:deep(.ant-menu) {
  font-family: "Roboto";
  background: transparent;

  &.ant-menu-inline {
    border-right-width: 0px;

    .ant-menu-item-selected {
      @apply font-medium;
    }
  }

  .ant-menu-submenu-title,
  .ant-menu-item {
    height: 1.875rem;
    margin: 0.125rem 0;
    width: 100%;
    padding: 0 0.5rem;

    &:active {
      @apply bg-transparent;
    }

    &::before {
      @apply absolute z-0 h-full top-0 left-2 right-2 rounded-sm;
      content: "";
    }

    .ant-menu-title-content,
    .anticon {
      @apply relative z-10;
    }
  }

  .ant-menu-submenu {
    margin-bottom: 0.5rem;

    .ant-menu-submenu-arrow {
      display: none;
    }
  }

  // Menu item hover
  .ant-menu-item:not(.ant-menu-item-selected):hover,
  .ant-menu-submenu > .ant-menu-submenu-title:hover {
    &::before {
      @apply bg-hover;
    }
  }

  // Menu item active
  .ant-menu-submenu.ant-menu-submenu-selected > .ant-menu-submenu-title {
    .ant-menu-title-content {
      @apply font-medium;

      a {
        @apply font-medium;
      }
    }
  }

  .ant-menu-item {
    &::after {
      left: 0;
      right: auto;
      @apply right-full rounded-l-none rounded-r-sm;
    }

    &.ant-menu-item-selected {
      @apply relative bg-transparent;

      &::before {
        @apply bg-selected;
      }
    }
  }
}
</style>

<style lang="scss">
.sidebar-drawer {
  .ant-drawer-content-wrapper {
    width: calc(100vw - 1.2rem) !important;
    max-width: 359px !important;

    .ant-drawer-body {
      padding: 0;
    }
  }

  .ant-menu {
    font-family: "Roboto";
    background: transparent;

    &.ant-menu-inline {
      border-right-width: 0px;

      .ant-menu-item-selected {
        @apply font-medium;
      }
    }

    .ant-menu-sub {
      background: transparent !important;
    }

    .ant-menu-submenu-title,
    .ant-menu-item {
      height: 1.875rem;
      margin: 0.125rem 0;
      width: 100%;
      padding: 0 0.5rem;

      &:active {
        @apply bg-transparent;
      }

      &::before {
        @apply absolute z-0 h-full top-0 left-2 right-2 rounded-sm;
        content: "";
      }

      .ant-menu-title-content,
      .anticon {
        @apply relative z-10;
      }
    }

    .ant-menu-submenu {
      margin-bottom: 0.5rem;

      .ant-menu-submenu-arrow {
        display: none;
      }
    }

    // Menu item hover
    .ant-menu-item:not(.ant-menu-item-selected):hover,
    .ant-menu-submenu > .ant-menu-submenu-title:hover {
      &::before {
        @apply bg-hover;
      }
    }

    // Menu item active
    .ant-menu-submenu.ant-menu-submenu-selected > .ant-menu-submenu-title {
      .ant-menu-title-content {
        @apply font-bold;

        a {
          @apply font-bold;
        }
      }
    }

    .ant-menu-item {
      &::after {
        left: 0;
        right: auto;
        @apply right-full rounded-l-none rounded-r-sm;
      }

      &.ant-menu-item-selected {
        @apply relative bg-transparent;

        &::before {
          @apply bg-selected;
        }
      }
    }
  }
}
</style>
