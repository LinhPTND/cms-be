<template>
  <div class="teacher-info">
    <!-- <a-row :gutter="[20, 20]">
      <a-col :span="24">
        <Filter />
      </a-col>
      <a-col :span="24">
        <div class="table">
          <TableUser />
        </div>
      </a-col>
    </a-row> -->
    <CardContent class="card-account h-full">
      <div class="info-header mb-5 flex items-start justify-between">
        <div class="info-account">
          <div class="w-[66px] h-[66px] mr-[16px]">
            <img :src="Assets.Images.Avatar.boy" alt="" />
          </div>
          <div class="info-basic">
            <h3 class="name mb-2 capitalize">{{ teacherInfo?.name }}</h3>
            <div class="text mb-1">GV00001</div>
          </div>
        </div>
        <div class="info-button flex gap-4">
          <a-button
            class="font-semibold"
            type="primary"
            @click="showModalChange"
          >
            Đổi mật khẩu
          </a-button>
          <ButtonEdit type="primary" success @click="showModalEdit" />
        </div>
      </div>
      <a-row class="mb-2" :gutter="[16, 16]">
        <!-- <a-col class="flex" :span="24" :xxl="8">
          <span class="label">Nghành:</span>
          <span class="value">An toàn thông tin</span>
        </a-col>
        <a-col class="flex" :span="24" :xxl="12">
          <span class="label">Phụ trách khóa:</span>
          <span class="value">AT13</span>
        </a-col> -->
        <a-col class="flex" :span="24" :xxl="12">
          <span class="label">Giới tính:</span>
          <span class="value capitalize">{{ teacherInfo?.gender }}</span>
        </a-col>
        <a-col class="flex" :span="24" :xxl="12">
          <span class="label">Ngày sinh:</span>
          <span class="value">
            {{ dayjs(teacherInfo?.birthDay).format("DD/MM/YYYY") }}
          </span>
        </a-col>
        <a-col class="flex" :span="24" :xxl="12">
          <span class="label">Số điện thoại:</span>
          <span class="value">{{ teacherInfo?.phone }}</span>
        </a-col>
        <a-col class="flex" :span="24" :xxl="12">
          <span class="label">Email:</span>
          <span class="value">{{ teacherInfo?.email }}</span>
        </a-col>
        <a-col class="flex" :span="24" :xxl="12">
          <span class="label">Địa chỉ:</span>
          <span class="value">
            {{ teacherInfo?.address }}
          </span>
        </a-col>
      </a-row>
    </CardContent>
    <ModalUpdateInfo
      :handle-cancel="handleCancelEdit"
      :handle-ok="handleOkEdit"
      :visible="visibleEdit"
      :teacher-info="teacherInfo"
      @refresh="refresh"
    />
    <ModalChangePassword
      :handle-cancel="handleCancelChange"
      :handle-ok="handleOkChange"
      :visible="visibleChangePass"
    />
  </div>
</template>

<script lang="ts" setup>
import Assets from "@/assets";
import ButtonEdit from "@/components/ButtonEdit.vue";
import CardContent from "@/components/CardContent.vue";
import { fnJob } from "@/core/composables/useJob";
import { GetInfoResponse, InfoResponse } from "@/models/Teacher";
import TeacherRepository from "@/repositories/TeacherRepository";
import { useAuth } from "@/stores/auth";
import dayjs from "dayjs";
import { ref } from "vue";
import ModalUpdateInfo from "../../teacher/components/modal/ModalUpdateInfo.vue";
import ModalChangePassword from "../components/modal/ModalChangePassword.vue";

const { user } = useAuth();

const teacherInfo = ref<InfoResponse>();

const { run: getInfoApi } = fnJob({
  api: (id: string) => TeacherRepository.getInfo(id),
  fnSuccess: ({ data }: { data: GetInfoResponse }) => {
    teacherInfo.value = {
      ...data.data,
      birthDay: dayjs(data.data.birthDay, "YYYY-MM-DD"),
    };
  },
  fnError: () => {},
});

if (user && user.userId) {
  getInfoApi(user.userId);
}

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

const refresh = () => {
  if (user && user.userId) {
    getInfoApi(user.userId);
  }
};
</script>

<style lang="scss" scoped>
.teacher-info {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 24px;

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
