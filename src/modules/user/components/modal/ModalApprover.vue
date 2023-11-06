<template>
  <Modal title="Chọn người duyệt đơn" @ok="finish">
    <div>
      <Select
        v-model:value="state"
        :options="options"
        placeholder="Người duyệt đơn"
        @load-more="loadMore"
        :end-load="endLoad"
      />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import Modal, { ModalProps } from "@/components/Modal.vue";
import Select, { LoadMoreValue } from "@/components/Select.vue";
import { fnJob } from "@/core/composables/useJob";
import { Options } from "@/models/Form";
import { ListTeacherRequest } from "@/models/Teacher";
import TeacherRepository from "@/repositories/TeacherRepository";
import { computed, ref } from "vue";

export interface Props extends ModalProps {}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "finish", id: string | undefined): void;
}>();

const pagination = ref();
const options = ref<Options[]>([]);
const state = ref<string>();

const { run: getListTeachersAPI } = fnJob({
  api: (payload: ListTeacherRequest) =>
    TeacherRepository.getListTeacher(payload),
  fnSuccess: ({ data }) => {
    const option = data.data.map((item) => {
      return { label: item.name, value: item._id };
    });
    options.value = [...options.value, ...option];
    pagination.value = data.meta;
  },
  options: {
    showLoading: true,
  },
});

const endLoad = computed<boolean>(() => {
  if (pagination.value) {
    return (
      pagination.value.page * pagination.value.limit > pagination.value.total
    );
  } else return false;
});

const loadMore = ({ page, searchText }: LoadMoreValue) => {
  getListTeachersAPI({
    page,
    limit: 10,
    name: searchText,
  });
};

const finish = () => {
  emit("finish", state.value);
};
</script>

<style lang="scss" scoped></style>
