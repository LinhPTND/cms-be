<template>
  <div class="filter">
    <div class="mb-4 text-sm font-semibold uppercase">
      Tìm kiếm thông tin theo nội dung đơn
    </div>
    <Form ref="formRef" layout="vertical" @finish="handleFinish">
      <FormItem name="name" label="Họ tên sinh viên" input="a-input" />
      <a-row :gutter="[16, 0]">
        <a-col :span="12">
          <FormItem name="msv" label="Mã SV" input="a-input" />
        </a-col>
        <a-col :span="12">
          <FormItem
            name="status"
            label="Trạng thái đơn"
            input="a-select"
            :input-props="{ options: StatusLetterOptions }"
          />
        </a-col>
      </a-row>

      <div class="flex mt-4 justify-center">
        <FormItem>
          <Button class="mr-2" :btn-type="'destructive'" @click="reset"
            >Reset</Button
          >
        </FormItem>
        <FormItem>
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
import { StatusLetterOptions } from "@/constants/Options";
import { FormExposed } from "@/models/Form";
import { ref } from "vue";

const formRef = ref<FormExposed>();
const emit = defineEmits<{
  (e: "change", value: any): void;
}>();

const reset = () => {
  formRef.value?.reset();
};

const handleFinish = (values: any) => {
  emit("change", {
    ...(values.name && { name: values.name }),
    ...(values.msv && { msv: values.msv }),
    ...(values.status && { status: values.status }),
  });
};
</script>

<style lang="scss" scoped>
.filter {
  background: #ffffff;
  border-radius: 5px;
  padding: 32px;
  box-shadow: 0px 4px 15px rgba(181, 181, 195, 0.25);

  :deep(.ant-form-item) {
    margin-bottom: 16px;

    .ant-form-item-label label {
      font-weight: 500;
      font-size: 13px;
      line-height: 15px;
      color: #202223;
    }
  }
}
</style>
