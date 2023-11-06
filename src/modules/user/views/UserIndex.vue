<template>
  <div class="">
    <div class="title mb-5">Thông tin chung</div>
    <a-row :gutter="[24, 24]">
      <a-col :span="24" :xl="16">
        <CardAccount :user-info="userInfo" @update-info="handleUpdateInfo" />
      </a-col>
      <a-col :span="0" :xl="8">
        <Notification />
      </a-col>
    </a-row>
    <div class="mt-6 w-full">
      <TableLetters :dataSource="dataLetters" @change="handleChangeTable" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { fnJob } from "@/core/composables/useJob";
import { GetInfoRequest, InfoResponse } from "@/models/User";
import CardAccount from "@/modules/user/components/CardAccount/CardAccount.vue";
import Notification from "@/modules/user/components/CardAccount/Notification.vue";
import TableLetters from "@/modules/user/components/TableLetters/TableLetters.vue";
import UserRepository from "@/repositories/UserRepository";
import { useAuth } from "@/stores/auth";
import { getTableLetter } from "@/utilities/resolveLetter";
import dayjs from "dayjs";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { user } = useAuth();

const { t } = useI18n();
const userInfo = ref<InfoResponse>();
const dataLetters = ref<any[]>([]);

const { run: getInfoApi } = fnJob({
  api: (msv: string) => UserRepository.getInfo(msv),
  fnSuccess: ({ data }: { data: GetInfoRequest }) => {
    const userData = data.data;
    userInfo.value = {
      ...userData,
      birthDay: userData.birthDay
        ? dayjs(userData.birthDay).format("YYYY-MM-DD")
        : undefined,
      dateCitizenId: userData.dateCitizenId
        ? dayjs(userData.dateCitizenId).format("YYYY-MM-DD")
        : undefined,
    };
  },
  options: {
    showLoading: true,
  },
});

const { run: getAllLetter } = fnJob({
  api: (msv: string) => UserRepository.getAllLetter(msv),
  fnSuccess: ({ data }) => {
    const list = getTableLetter(data.data);
    dataLetters.value = list;
  },
  options: {
    showLoading: true,
  },
});

if (user && user.username) {
  getInfoApi(user.username);
  getAllLetter(user.username);
}

const handleUpdateInfo = () => {
  user && getInfoApi(user.username);
};

const handleChangeTable = () => {
  if (user && user.username) {
    getAllLetter(user.username);
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: 500;
}
</style>
