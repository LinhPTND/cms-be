<template>
  <ModalCheckLetter
    ref="modalRef"
    :visible="modalCheckLetter.visible"
    :data="modalCheckLetter.data"
    :show-button="!modalCheckLetter.readOnly"
    :read-only="modalCheckLetter.readOnly"
    @change="handleChange"
    @cancel="closeModalCheckLetter"
  />
  <ModalOtp
    :visible="modalOtp.visible"
    :data="{
      isSentRequestOtp: modalOtp.isSentRequestOtp,
      isFinalVerify: modalOtp.isFinalVerify,
      email: userInfo?.email || '',
    }"
    @sent-request-otp="sentRequestOtp"
    @verifyOtp="verifyOtp"
    @cancel="closeModalOtp"
  />
  <a-table
    :data-source="dataSource"
    :scroll="{ x: 'max-content' }"
    :pagination="{
      size: 'small',
      pageSize: 10,
      current: currentPagination,
      'onUpdate:current': setCurrentPagination,
    }"
  >
    <a-table-column title="STT">
      <template #default="{ index }">
        <span>{{ index + 1 }}</span>
      </template>
    </a-table-column>
    <a-table-column title="Loại đơn" data-index="nameLetter"> </a-table-column>
    <a-table-column title="Ngày gửi" data-index="createdAt" align="center">
      <template #default="{ text }">
        {{ dayjs(text).format("DD/MM/YYYY") }}
      </template>
    </a-table-column>
    <a-table-column title="Ngày cập nhật" data-index="updatedAt" align="center">
      <template #default="{ text }">
        {{ dayjs(text).format("DD/MM/YYYY") }}
      </template>
    </a-table-column>
    <a-table-column title="Người duyệt đơn">
      <template #default="{ record }">
        <Avatar
          :name="record.approved.name"
          :name-face="getNameFace(record.approved.name)"
          :color="randomColor(record.approved.phone)"
          size="small"
        />
      </template>
    </a-table-column>
    <a-table-column title="Số điện thoại" align="center">
      <template #default="{ record }">
        {{ record.approved.phone }}
      </template>
    </a-table-column>
    <a-table-column title="Trạng thái" data-index="status">
      <template #default="{ record }">
        <a-tag
          class="w-[70px]"
          :key="record.status"
          :color="
            record.status === StatusLetter.PENDING
              ? 'geekblue'
              : record.status === StatusLetter.SUCCESS
              ? 'green'
              : 'volcano'
          "
        >
          {{ record.status.toString().toUpperCase() }}
        </a-tag>
      </template>
    </a-table-column>
    <a-table-column title="Hành động" align="center">
      <template #default="{ record }">
        <TableAction
          :record="record"
          :detail="
            record.status === StatusLetter.SUCCESS ||
            record.status === StatusLetter.REJECT
          "
          :edit="record.status === StatusLetter.PENDING"
          :showDelete="record.status !== StatusLetter.SUCCESS"
          only-icon
          @detail="handleDetail(record)"
          @edit="handleEdit(record)"
          @delete="handleDelete(record)"
        />
      </template>
    </a-table-column>
  </a-table>
</template>

<script lang="ts" setup>
import Avatar from "@/components/Avatar.vue";
import ModalOtp from "@/components/ModalOtp.vue";
import TableAction from "@/components/TableAction.vue";
import useMessage from "@/core/composables/message";
import useJob, { fnJob } from "@/core/composables/useJob";
import { useLetterFormComponent } from "@/hooks/userLetterFormComponent";
import { StatusLetter } from "@/models/Letter";
import { GetCodeRequest, VerifyCodeRequest } from "@/models/Otp";
import { GetInfoRequest, InfoResponse } from "@/models/User";
import ModalCheckLetter from "@/modules/user/components/modal/ModalCheckLetter.vue";
import UserRepository from "@/repositories/UserRepository";
import { useAuth } from "@/stores/auth";
import { getNameFace, randomColor } from "@/utilities/resolveLetter";
import { notification } from "ant-design-vue";
import dayjs from "dayjs";
import { catchError, map, of } from "rxjs";
import { reactive, ref, unref } from "vue";

const props = withDefaults(
  defineProps<{
    dataSource: any[];
  }>(),
  {}
);

const emit = defineEmits<{
  (e: "change"): void;
}>();

const modalOtp = reactive({
  visible: false,
  isSentRequestOtp: false,
  isFinalVerify: false,
});

const recordLetter = ref<{
  data: any;
  readOnly: boolean;
  type: "edit" | "view" | "delete";
}>({
  data: null,
  readOnly: false,
  type: "view",
});

const message = useMessage();

const currentPagination = ref<number>(1);
const setCurrentPagination = (current: number) => {
  currentPagination.value = current;
};

interface ModalLetterParameters {
  visible: boolean;
  data: any;
  readOnly: boolean;
}

const modalCheckLetter = ref<ModalLetterParameters>({
  visible: false,
  data: {},
  readOnly: false,
});

const modalRef = ref();
const letterFormComponent = ref<{
  repository: any;
  component: any;
}>();
const { user } = useAuth();
const userInfo = ref<InfoResponse>();

const openModalCheckLetter = (info: ModalLetterParameters) => {
  modalCheckLetter.value = {
    ...info,
    visible: true,
  };
};

const closeModalCheckLetter = () => {
  modalCheckLetter.value.visible = false;
  recordLetter.value = {
    data: null,
    readOnly: false,
    type: "view",
  };
  resetModalOtp();
};

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

if (user && user.username) {
  getInfoApi(user.username);
}

const { run: getCodeApi } = useJob(
  (id: string, data: GetCodeRequest) => {
    message.loading("Đang lấy mã OTP");
    return letterFormComponent.value?.repository.getCodeLetter(id, data).pipe(
      map(({ data }) => {
        modalOtp.isSentRequestOtp = true;
        emit("change");
        if (data.success) {
          message.success("Mã OTP đã gửi đến gmail của bạn");
        } else {
          message.error(
            "Xác thực không thành công đơn của bạn. Vui lòng liên hệ giảng viên để được hỗ trợ"
          );
        }
      }),
      catchError((err) => {
        message.error(
          "Xác thực không thành công đơn của bạn. Vui lòng liên hệ giảng viên để được hỗ trợ"
        );
        return of(err);
      })
    );
  },
  {
    showLoading: true,
  }
);

const { run: verifyCodeApi } = useJob(
  (id: string, data: VerifyCodeRequest) => {
    message.loading("Đang tiến hành xác thực mã OTP");
    return letterFormComponent.value?.repository
      .verifyCodeRequest(id, data)
      .pipe(
        map(({ data }) => {
          emit("change");
          if (data.success) {
            modalOtp.isSentRequestOtp = false;
            modalOtp.isFinalVerify = true;
            modalOtp.visible = false;
            message.success("Xác thực thành công");
            if (recordLetter.value.type === "delete") {
              deleteApi(recordLetter.value.data._id);
            } else {
              openModalCheckLetter({
                data: recordLetter.value.data,
                visible: true,
                readOnly: recordLetter.value.readOnly,
              });
            }
          } else {
            message.error(
              "Xác thực không thành công đơn của bạn. Vui lòng liên hệ giảng viên để được hỗ trợ"
            );
          }
        }),
        catchError((err) => {
          message.error(
            "Xác thực không thành công đơn của bạn. Vui lòng liên hệ giảng viên để được hỗ trợ"
          );
          return of(err);
        })
      );
  },
  {
    showLoading: true,
  }
);

const handleEdit = (record: any) => {
  modalOtp.visible = true;
  recordLetter.value = {
    data: record,
    readOnly: false,
    type: "edit",
  };
};
const handleDetail = (record: any) => {
  modalOtp.visible = true;
  recordLetter.value = {
    data: record,
    readOnly: true,
    type: "view",
  };
};

const closeModalOtp = () => {
  resetModalOtp();
};

const resetModalOtp = () => {
  modalOtp.visible = false;
  modalOtp.isSentRequestOtp = false;
  modalOtp.isFinalVerify = false;
  recordLetter.value = {
    data: null,
    readOnly: false,
    type: "view",
  };
};

const sentRequestOtp = (values: any) => {
  const idLetter = recordLetter.value?.data?._id;
  const payload: GetCodeRequest = {
    email: values.email,
    msv: user?.username || userInfo.value?.msv || "",
    teacherId: recordLetter.value?.data?.approved?._id,
  };
  letterFormComponent.value = unref(
    useLetterFormComponent(recordLetter.value?.data.typeLetter)
  );
  getCodeApi(idLetter, payload);
};

const verifyOtp = (values: any) => {
  const idLetter = recordLetter.value?.data?._id;
  letterFormComponent.value = unref(
    useLetterFormComponent(recordLetter.value?.data.typeLetter)
  );

  const payload: VerifyCodeRequest = {
    msv: user?.username || userInfo.value?.msv || "",
    otp: values.otp,
    teacherId: recordLetter.value?.data?.approved?._id,
  };
  verifyCodeApi(idLetter, payload);
};

const { run: deleteApi } = useJob(
  (id: string) => {
    return letterFormComponent.value?.repository.deleteLetter(id).pipe(
      map(({ data }) => {
        emit("change");
        if (data.success) {
          notification.success({
            message: "Xóa đơn thành công",
          });
        } else {
          notification.error({
            message: "Xóa đơn không thành công",
          });
        }
      }),
      catchError((err) => {
        notification.error({ message: "Xóa đơn không thành công" });
        return of(err);
      })
    );
  },
  {
    showLoading: true,
    wait: 500,
  }
);

const handleDelete = (record: any) => {
  letterFormComponent.value = unref(useLetterFormComponent(record.typeLetter));
  modalOtp.visible = true;
  recordLetter.value = {
    data: record,
    readOnly: true,
    type: "delete",
  };
};

const handleChange = () => {
  emit("change");
  currentPagination.value = 1;
  closeModalCheckLetter();
};
</script>

<style lang="scss" scoped></style>
