<template>
  <CardContentVue class="card-account h-full">
    <div class="info-header mb-5 flex items-start justify-between">
      <div class="info-account">
        <div class="w-[66px] h-[66px] mr-[16px]">
          <img :src="Assets.Images.Avatar.boy" alt="" />
        </div>
        <div class="info-basic">
          <h3 class="name mb-2 capitalize">{{ userInfo?.name }}</h3>
          <div class="text mb-1">{{ userInfo?.msv }}</div>
        </div>
      </div>
      <div class="info-button flex gap-4">
        <a-button class="font-semibold" type="primary" @click="showModalChange">
          Đổi mật khẩu
        </a-button>
        <ButtonEdit type="primary" success @click="showModalEdit" />
      </div>
    </div>
    <a-row class="mb-6">
      <a-col :span="8">
        <span class="label">Nghành:</span>
        <span class="value">{{ userInfo?.majors }}</span>
      </a-col>
      <a-col :span="8">
        <span class="label">Lớp:</span>
        <span class="value">{{ userInfo?.class }}</span>
      </a-col>
      <a-col :span="8">
        <span class="label">Khóa:</span>
        <span class="value">{{ userInfo?.timeCourse }}</span>
      </a-col>
    </a-row>
    <div class="list-tab mb-4">
      <div
        class="tab-item"
        :class="{ active: tabInfo === 'common' }"
        @click="changeTab('common')"
      >
        Thông tin cơ bản
      </div>
      <div
        class="tab-item"
        :class="{ active: tabInfo === 'address' }"
        @click="changeTab('address')"
      >
        Thông tin địa chỉ
      </div>
    </div>

    <div class="preview-info">
      <template v-if="tabInfo === 'common'">
        <InforCommon :user-info="userInfo" />
      </template>
      <template v-if="tabInfo === 'address'">
        <InfoAddress :user-info="userInfo" />
      </template>
    </div>
  </CardContentVue>
  <ModalUpdateInfo
    :handle-cancel="handleCancelEdit"
    :handle-ok="handleOkEdit"
    :visible="visibleEdit"
    :user-info="userInfo"
    @finish="$emit('updateInfo')"
  />
  <ModalChangePassword
    :handle-cancel="handleCancelChange"
    :handle-ok="handleOkChange"
    :visible="visibleChangePass"
    :msv="userInfo?.msv"
  />
</template>

<script lang="ts" setup>
import Assets from "@/assets";
import ButtonEdit from "@/components/ButtonEdit.vue";
import CardContentVue from "@/components/CardContent.vue";
import ModalChangePassword from "@/components/ModalChangePassword.vue";
import { InfoResponse } from "@/models/User";
import { ref } from "vue";
import ModalUpdateInfo from "../modal/ModalUpdateInfo.vue";
import InfoAddress from "./InfoAddress.vue";
import InforCommon from "./InfoCommon.vue";

type TabInfo = "common" | "address";

defineProps<{
  userInfo?: InfoResponse;
}>();

const emit = defineEmits<{
  (e: "updateInfo"): void;
}>();

const tabInfo = ref<TabInfo>("common");

const changeTab = (tab: TabInfo) => {
  tabInfo.value = tab;
};

const visibleEdit = ref<boolean>(false);
const visibleChangePass = ref<boolean>(false);

// Modal edit info
const showModalEdit = () => {
  visibleEdit.value = true;
};

const handleOkEdit = () => {
  visibleEdit.value = false;
};

const handleCancelEdit = () => {
  visibleEdit.value = false;
};

// Modal change password
const showModalChange = () => {
  visibleChangePass.value = true;
};

const handleOkChange = () => {
  visibleChangePass.value = false;
};

const handleCancelChange = () => {
  visibleChangePass.value = false;
};
</script>

<style lang="scss" scoped>
.card-account {
  .info-account {
    display: flex;
    align-items: center;
  }

  .info-basic {
    .name {
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.01em;
      color: #202223;
    }
    .text {
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      letter-spacing: 0.01em;

      color: #6d7175;
    }
  }

  .list-tab {
    display: flex;
    align-items: center;
    gap: 24px;

    .tab-item {
      background: #e4e5e7;
      border-radius: 6px;
      padding: 6px 8px;
      font-weight: 500;
      font-size: 11px;
      line-height: 16px;
      cursor: pointer;

      &:hover {
        color: #0090c6;
      }

      &.active {
        color: #0090c6;
      }
    }
  }
}
</style>

<style lang="scss">
.label {
  font-size: 14px;
  font-weight: 500;
  margin-right: 8px;
}
.value {
  font-size: 13px;
  color: #6d7175;
}
</style>
