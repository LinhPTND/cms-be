<template>
  <div class="table-letters">
    <ModalCheckLetter
      ref="modalRef"
      :visible="modalCheckLetter.visible"
      :data="modalCheckLetter.data"
      :show-button="modalCheckLetter.status === StatusLetter.PENDING"
      :read-only="modalCheckLetter.readOnly"
      @change="handleChange"
      @cancel="closeModalCheckLetter"
    />
    <ModalOtp
      :visible="modalOtp.visible"
      :data="{
        isSentRequestOtp: modalOtp.isSentRequestOtp,
        isFinalVerify: modalOtp.isFinalVerify,
        email: teacherInfo?.email || '',
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
        current: currentPage,
        'onUpdate:current': setCurrentPage,
      }"
    >
      <a-table-column title="STT" data-index="stt">
        <template #default="{ index }">
          <span>{{ index + 1 }}</span>
        </template>
      </a-table-column>
      <a-table-column title="Loại đơn" data-index="nameLetter">
      </a-table-column>

      <a-table-column title="Người gửi đơn">
        <template #default="{ record }">
          <Avatar
            :name="record.user.name"
            :name-face="getNameFace(record.user.name)"
            :color="randomColor(record.user.phone)"
            size="small"
          />
        </template>
      </a-table-column>
      <a-table-column title="Số điện thoại" align="center">
        <template #default="{ record }">
          {{ record.user.phone }}
        </template>
      </a-table-column>
      <a-table-column title="Ngày gửi" data-index="createdAt">
        <template #default="{ text }">
          {{ dayjs(text).format("DD/MM/YYYY") }}
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
            only-icon
            @detail="handleDetail(record)"
            @edit="handleEdit(record)"
            @delete="handleDelete(record)"
          />
        </template>
      </a-table-column>
    </a-table>
  </div>
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
import { GetInfoResponse, InfoResponse } from "@/models/Teacher";
import ModalCheckLetter from "@/modules/teacher/components/modal/ModalCheckLetter.vue";
import TeacherRepository from "@/repositories/TeacherRepository";
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
  (e: "refresh"): void;
}>();

const { user } = useAuth();
const teacherInfo = ref<InfoResponse>();
const currentPage = ref<number>(1);

const setCurrentPage = (current: number) => {
  currentPage.value = current;
};

const modalOtp = reactive({
  visible: false,
  isSentRequestOtp: false,
  isFinalVerify: false,
});

const recordLetter = ref<{
  data: any;
  readOnly: boolean;
}>({
  data: null,
  readOnly: false,
});

interface ModalLetterParameters {
  visible: boolean;
  data: any;
  readOnly: boolean;
  status?: StatusLetter;
}

const modalCheckLetter = ref<ModalLetterParameters>({
  visible: false,
  data: {},
  readOnly: false,
});

const modalRef = ref();

const message = useMessage();

const letterFormComponent = ref<{
  repository: any;
  component: any;
}>();

const openModalCheckLetter = (info: ModalLetterParameters) => {
  modalCheckLetter.value = {
    ...info,
    visible: true,
  };
};

const closeModalCheckLetter = () => {
  modalCheckLetter.value.visible = false;
};

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

const { run: getCodeApi } = useJob(
  (id: string, data: GetCodeRequest) => {
    message.loading("Đang lấy mã OTP");
    return letterFormComponent.value?.repository.getCodeLetter(id, data).pipe(
      map(({ data }) => {
        modalOtp.isSentRequestOtp = true;
        emit("refresh");
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
          emit("refresh");
          if (data.success) {
            modalOtp.isSentRequestOtp = false;
            modalOtp.isFinalVerify = true;
            modalOtp.visible = false;
            message.success("Xác thực thành công");
            openModalCheckLetter({
              data: recordLetter.value.data,
              visible: true,
              readOnly: recordLetter.value.readOnly,
              status: recordLetter.value?.data?.status,
            });
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
    readOnly: true,
  };
};
const handleDetail = (record: any) => {
  modalOtp.visible = true;
  recordLetter.value = {
    data: record,
    readOnly: true,
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
  };
};

const sentRequestOtp = (values: any) => {
  const idLetter = recordLetter.value?.data?._id;
  const payload: GetCodeRequest = {
    email: values.email,
    msv: recordLetter.value?.data?.user?.msv || "",
    teacherId: recordLetter.value?.data?.approved || "",
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
    msv: recordLetter.value?.data?.user?.msv || "",
    otp: values.otp,
    teacherId: recordLetter.value?.data?.approved || "",
  };
  verifyCodeApi(idLetter, payload);
};

const { run: deleteApi } = useJob((id: string) => {
  return letterFormComponent.value?.repository.deleteLetter(id).pipe(
    map(({ data }) => {
      emit("refresh");
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
});

const handleDelete = (record: any) => {
  letterFormComponent.value = unref(useLetterFormComponent(record.typeLetter));
  deleteApi(record._id);
};

const handleChange = () => {
  currentPage.value = 1;
  emit("refresh");
  closeModalCheckLetter();
};
</script>

<style lang="scss" scoped></style>

<style lang="scss" scoped>
.table-letters {
  background: #ffffff;
  border-radius: 5px;
  padding: 32px;
  box-shadow: 0px 4px 15px rgba(181, 181, 195, 0.25);
  min-height: 100%;
  width: 100%;
}
</style>
