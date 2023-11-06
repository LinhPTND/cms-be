<template>
  <div class="layout-header">
    <div class="layout-header__left flex items-center gap-3">
      <div class="logo hidden md:block">
        <div class="flex items-center gap-4">
          <img :src="Assets.Images.Logo" class="h-11" />
          <div class="title hidden xl:block">Học viện kĩ thuật mật mã</div>
        </div>
      </div>
      <a-button
        type="text"
        class="mx-2 md:hidden"
        @click="$emit('hamburgerClick', $event as any)"
      >
        <template #icon>
          <Icon name="mobileHamburgerMajor" />
        </template>
      </a-button>
      <!-- <h1 class="title">{{ env.APP_NAME }}</h1> -->
    </div>

    <div class="layout-header__right flex items-center">
      <span class="notification-badge mr-6 cursor-pointer">
        <a-badge color="#D7F9EF" :count="countNotification">
          <Icon
            name="notificationMajor"
            :style="{ fontSize: '24px', color: '#5C5F62' }"
          />
        </a-badge>
      </span>
      <a-dropdown placement="bottomRight" trigger="click">
        <div class="header-item">
          <a-avatar class="md:mr-2">V</a-avatar>
          <span class="hidden md:inline">{{ user?.username }}</span>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item
              v-for="menuItem in menuDropdownAccount"
              :key="menuItem.path"
            >
              <router-link :to="menuItem.path">
                {{ menuItem.label }}
              </router-link>
            </a-menu-item>
            <a-menu-item @click="handleLogout">
              <span>Đăng xuất</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Assets from "@/assets";
import Icon from "@/components/Icon.vue";
import { fnJob } from "@/core/composables/useJob.js";
import AuthRoutePaths from "@/modules/auth/router/paths.js";
import AuthRepository from "@/repositories/AuthRepository.js";
import { useAuth } from "@/stores/auth.js";
import { notification } from "ant-design-vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRouter } from "vue-router";

defineProps({
  countNotification: { type: Number, default: () => 5 },
});

defineEmits<{
  (event: "hamburgerClick", val: PointerEvent): void;
}>();

const router = useRouter();
const { logout } = useAuth();
const { user } = storeToRefs(useAuth());

const { run: logoutAPI } = fnJob({
  api: () => AuthRepository.logout(),
  fnSuccess: async ({ data }) => {
    if (data.success) {
      await logout();
      router.push(AuthRoutePaths.Index);
      notification.success({
        message: "Đăng xuất thành công",
      });
    }
  },
  fnError: () => {
    notification.error({
      placement: "topRight",
      message: "Đã có lỗi xảy ra",
    });
  },
  options: {
    showLoading: true,
  },
});

const menuUser: () => { label: string; path: string }[] = () => [];

const menuDropdownAccount = computed(() => {
  return menuUser();
});

function handleLogout() {
  logoutAPI();
}

// const  = toRefs(props);
</script>

<style lang="scss" scoped>
.layout-header {
  @apply py-2 px-0 md:px-4;

  background: #ffffff;
  box-shadow: 0 3px 5px rgb(57 63 72 / 30%);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    letter-spacing: 0.01em;
  }

  &__center {
    @apply w-full md:w-1/2 xl:w-1/3;
  }

  &__right {
    @apply mx-2 md:mr-0;
    .notification-badge {
      :deep(.ant-badge-count) {
        .ant-scroll-number-only {
          font-size: 9px;
          color: #b7150b;
        }
      }
    }
  }

  .header-item {
    @apply inline-flex items-center px-2 cursor-pointer h-11 rounded hover:bg-hover;
  }
}
</style>
