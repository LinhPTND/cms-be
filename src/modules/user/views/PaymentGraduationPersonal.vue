<template>
  <div class="payment-graduation-collective">
    <div class="flex justify-center mb-[-24px]">
      <a-affix :offset-top="10">
        <a-space class="z-[100]">
          <ButtonSave @click="pickApprover">Apply</ButtonSave>
          <ButtonReset btn-type="destructive" @click="resetForm"
            >Reset</ButtonReset
          >
        </a-space>
      </a-affix>
    </div>
    <PaymentPersonalLetter
      :initial-values="initialValues"
      ref="formLetter"
      @finish="handleFinish"
    />
    <ModalApprover
      :visible="modalApprover"
      @cancel="closeModalApprover"
      @finish="submit"
    />
  </div>
</template>

<script lang="ts" setup>
import ButtonReset from "@/components/ButtonReset.vue";
import ButtonSave from "@/components/ButtonSave.vue";
import useJob from "@/core/composables/useJob";
import { useLoading } from "@/core/loading";
import PaymentPersonalLetter from "@/letters/PaymentPersonalLetter.vue";
import { FormService, StatusLetter } from "@/models/Letter";
import { PaymentGraduationPersonRequest } from "@/models/PaymentGraduationPerson";
import ModalApprover from "@/modules/user/components/modal/ModalApprover.vue";
import UserRoutePaths from "@/modules/user/router/paths";
import PaymentGraduationPersonRepsitory from "@/repositories/PaymentGraduationPersonRepository";
import { useAuth } from "@/stores/auth";
import { useUser } from "@/stores/user";
import { notification } from "ant-design-vue";
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
import { catchError, map, of } from "rxjs";
import { onBeforeMount, ref, watch } from "vue";
import { useRouter } from "vue-router";

const formLetter = ref<FormService>();
const router = useRouter();
const { getInfoAccount } = useUser();
const { user: infoUser } = storeToRefs(useUser());
const { user } = storeToRefs(useAuth());
const initialValues = ref<any>({
  ...infoUser.value,
  birthDay: infoUser.value.birthDay
    ? dayjs(infoUser.value.birthDay).format("YYYY-MM-DD")
    : infoUser.value.birthDay,
  dateCitizenId: infoUser.value.dateCitizenId
    ? dayjs(infoUser.value.dateCitizenId).format("YYYY-MM-DD")
    : infoUser.value.dateCitizenId,
});
const { startLoading, stopLoading } = useLoading();
const modalApprover = ref<boolean>(false);
const approverId = ref<string>("");

const { run: submitConfirmStudying } = useJob(
  (payload: PaymentGraduationPersonRequest) => {
    return PaymentGraduationPersonRepsitory.create(payload).pipe(
      map(({ data }) => {
        router.push(UserRoutePaths.Index);
        if (data.success) {
          notification.success({ message: "Đơn đã nộp thành công !" });
        } else {
          notification.error({ message: "Đơn submit không thành công" });
        }
      }),
      catchError((err) => {
        notification.error({ message: "Đơn submit không thành công" });
        return of(err);
      })
    );
  },
  {
    showLoading: true,
  }
);

onBeforeMount(async () => {
  if (user?.value?.username) {
    startLoading();
    await getInfoAccount(user?.value?.username);
    stopLoading();
  }
});

watch(
  () => infoUser,
  () => {
    initialValues.value = {
      ...infoUser.value,
      birthDay: infoUser.value.birthDay
        ? dayjs(infoUser.value.birthDay).format("YYYY-MM-DD")
        : infoUser.value.birthDay,
      dateCitizenId: infoUser.value.dateCitizenId
        ? dayjs(infoUser.value.dateCitizenId).format("YYYY-MM-DD")
        : infoUser.value.dateCitizenId,
    };
  },
  {
    deep: true,
    immediate: true,
  }
);

const pickApprover = () => {
  formLetter.value?.validate().then(() => {
    modalApprover.value = true;
  });
};

const closeModalApprover = () => {
  modalApprover.value = false;
};
const resetForm = () => {
  formLetter.value?.resetForm();
};

const submit = (approver: string | undefined) => {
  closeModalApprover();
  if (approver) {
    approverId.value = approver;
  }
  formLetter.value?.submit();
};

const handleFinish = (values: any) => {
  if (user?.value?.userId) {
    const payload = {
      ...values,
      libraryCenter: {
        content: values.libraryCenterContent,
        signature: values.libraryCenterSignature,
      },
      financial: {
        content: values.financialContent,
        signature: values.financialSignature,
      },
      studentManagementSystem: {
        content: values.studentManagementSystemContent,
        signature: values.studentManagementSystemSignature,
      },
      trainingDepartment: {
        content: values.trainingDepartmentContent,
        signature: values.trainingDepartmentSignature,
      },
      approved: approverId.value,
      user: user?.value?.userId,
      status: StatusLetter.PENDING,
    };
    submitConfirmStudying(payload);
  }
};
</script>

<style lang="scss" scoped>
.payment-graduation-collective {
  .title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 40px;
  }

  .letter {
    .title {
      h3 {
        text-align: center;
      }
    }
  }
}
</style>
