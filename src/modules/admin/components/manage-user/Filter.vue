<template>
  <div class="filter">
    <Form
      ref="formRef"
      :initial-values="initialForm"
      layout="vertical"
      @finish="handleFinish"
    >
      <a-row :gutter="[16, 0]">
        <a-col :span="6">
          <FormItem
            name="name"
            label="Họ tên sinh viên"
            hide-text-error
            input="a-input"
          />
        </a-col>
        <a-col :span="6">
          <FormItem name="msv" label="Mã SV" hide-text-error input="a-input" />
        </a-col>
        <a-col :span="6">
          <FormItem
            name="majors"
            label="Chuyên nghành"
            input="a-select"
            hide-text-error
            :input-props="{ options: Majors }"
          />
        </a-col>
        <a-col :span="6">
          <FormItem name="class" label="Lớp" input="a-input" hide-text-error />
        </a-col>
      </a-row>
      <div class="flex mt-4 justify-end">
        <FormItem hide-text-error>
          <Button class="mr-2" :btn-type="'destructive'" @click="reset"
            >Reset</Button
          >
        </FormItem>
        <FormItem hide-text-error>
          <Button :btn-type="'primary'" html-type="submit">Tìm kiếm</Button>
        </FormItem>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import Button from "@/components/button/Button.vue";
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import { Majors } from "@/constants/Options";
import { FormExposed } from "@/models/Form";
import { ListUserRequest } from "@/models/User";
import { onBeforeMount, reactive, ref } from "vue";

const props = defineProps<{
  filterData: ListUserRequest;
}>();

const emit = defineEmits<{
  (e: "change", value: any): void;
}>();

const defaultValueForm = () => ({
  name: "",
  msv: "",
  majors: "",
  class: "",
});

const initialForm = reactive(defaultValueForm());

onBeforeMount(() => {
  if (props.filterData) {
    initialForm.name = props.filterData.name || "";
    initialForm.msv = props.filterData.msv || "";
    initialForm.majors = props.filterData.majors || "";
    initialForm.class = props.filterData.class || "";
  }
});

const formRef = ref<FormExposed>();

const handleFinish = (values: any) => {
  emit("change", values);
};

const reset = () => {
  formRef.value?.reset();
  emit("change", defaultValueForm());
};
</script>

<style lang="scss" scoped>
.filter {
  background: #ffffff;
  border-radius: 5px;
  padding: 32px;
  box-shadow: 0px 4px 15px rgba(181, 181, 195, 0.25);
}
</style>
