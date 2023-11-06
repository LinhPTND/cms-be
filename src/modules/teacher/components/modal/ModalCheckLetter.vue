<template>
  <a-modal
    class="modal-check-letter min-w-[500px]"
    width="auto"
    centered
    destroy-on-close
  >
    <template #title>
      <div class="flex items-center gap-2">
        <div>{{ titleLetter }}</div>
        <div>
          <a-tag
            class="w-[70px]"
            :key="data.status"
            :color="
              data.status === StatusLetter.PENDING
                ? 'geekblue'
                : data.status === StatusLetter.SUCCESS
                ? 'green'
                : 'volcano'
            "
          >
            {{ data.status.toString().toUpperCase() }}
          </a-tag>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex items-center justify-end" v-if="props.showButton">
        <Button
          class="mr-2"
          :btn-type="'primary'"
          @click="submit(StatusLetter.SUCCESS)"
          >Duyệt</Button
        >
        <Button :btn-type="'destructive'" @click="submit(StatusLetter.REJECT)"
          >Từ chối</Button
        >
      </div>
    </template>

    <div class="wrap-letter">
      <Suspense>
        <component
          ref="formRef"
          :is="letterFormComponent?.component"
          :initialValues="data"
          :readOnly="readOnly"
        />
        <template #fallback>
          <div class="flex items-center justify-center">
            <a-spin></a-spin>
          </div>
        </template>
      </Suspense>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import Button from "@/components/button/Button.vue";
import { fnJob } from "@/core/composables/useJob";
import { useLoading } from "@/core/loading";
import { useLetterFormComponent } from "@/hooks/userLetterFormComponent";
import { ConfirmStudying } from "@/models/ConfirmStudying";
import { FormExposed } from "@/models/Form";
import { StatusLetter, TypeLetter } from "@/models/Letter";
import { notification } from "ant-design-vue";
import { ModalProps } from "ant-design-vue/lib/modal/Modal";
import dayjs from "dayjs";
import { computed, onBeforeMount, ref, unref, watch } from "vue";

export interface ModalCheckLetterProps extends ModalProps {
  data: ConfirmStudying & { nameLetter: string; typeLetter: TypeLetter };
  showButton?: boolean;
  readOnly?: boolean;
}

const props = withDefaults(defineProps<ModalCheckLetterProps>(), {
  showButton: true,
  readOnly: false,
});

const emit = defineEmits<{
  (e: "change"): void;
}>();

const { startLoading, stopLoading } = useLoading();
const formRef = ref<FormExposed>();
const letterFormComponent = ref<{
  repository: any;
  component: any;
}>();

const titleLetter = computed(() => {
  return `Duyệt đơn ${props.data.nameLetter}`;
});

onBeforeMount(() => {
  letterFormComponent.value = unref(
    useLetterFormComponent(props.data.typeLetter)
  );
});

watch(
  () => props.data.typeLetter,
  () => {
    if (props.data.typeLetter) {
      letterFormComponent.value = unref(
        useLetterFormComponent(props.data.typeLetter)
      );
    }
  }
);

const { run: updateLetter } = fnJob({
  api: (id: string, payload: ConfirmStudying) =>
    letterFormComponent.value?.repository?.updateLetter(id, payload),
  fnSuccess: ({ data }) => {
    emit("change");
    if (data.success) {
      notification.success({
        message: "Cập nhật đơn thành công",
      });
    } else {
      notification.error({
        message: "Cập nhật đơn không thành công",
      });
    }
  },
  fnError: () => {
    notification.error({
      message: "Cập nhật đơn không thành công",
    });
  },
  options: {
    showLoading: true,
  },
});

const submit = (status: StatusLetter) => {
  const values = formRef.value?.values;
  updateLetter(props.data._id, {
    ...values,
    dateCitizenId: dayjs(values.dateCitizenId).format("YYYY-MM-DD"),
    birthDay: dayjs(values.dateCitizenId).format("YYYY-MM-DD"),
    ...(values.course?.length && {
      course: [
        dayjs(values.course[0]).format("YYYY-MM"),
        dayjs(values.course[1]).format("YYYY-MM"),
      ],
    }),
    status: status,
  });
};
</script>

<style lang="scss">
.modal-check-letter {
  .ant-modal-body {
    max-height: 70vh;
    overflow: auto;
  }
}
</style>
