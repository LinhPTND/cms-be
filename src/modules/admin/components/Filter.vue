<template>
  <div class="filter">
    <Form layout="vertical" @finish="handleFinish">
      <FormItem name="name" label="Họ tên sinh viên" input="a-input" />
      <a-row :gutter="[16, 0]">
        <a-col :span="12">
          <FormItem name="msv" label="Mã SV" input="a-input" />
        </a-col>
        <a-col :span="12">
          <FormItem
            name="letterStatus"
            label="Trạng thái đơn"
            input="a-select"
            :input-props="{ options: StatusLetterOptions }"
          />
        </a-col>
      </a-row>
      <a-row :gutter="[16, 0]">
        <a-col :span="12">
          <FormItem
            name="major"
            label="Chuyên nghành"
            input="a-select"
            :input-props="{ options: Majors }"
          />
        </a-col>
        <a-col :span="12">
          <FormItem
            name="class"
            label="Lớp"
            input="a-input"
            :input-props="{
              disabled: !formState.majors,
            }"
          />
        </a-col>
      </a-row>
      <div class="flex mt-4 justify-center">
        <FormItem>
          <Button class="mr-2" :btn-type="'destructive'">Reset</Button>
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
import { Majors, StatusLetterOptions } from "@/constants/Options";
import { StatusLetter } from "@/models/Letter";
import { reactive, UnwrapRef } from "vue";

interface FormState {
  name: string;
  majors: string;
  maSV: string;
  class: string;
  statusLetter: StatusLetter | undefined;
}

const defaultValueForm = (): FormState => ({
  name: "",
  maSV: "",
  majors: "",
  class: "",
  statusLetter: undefined,
});

const formState: UnwrapRef<FormState> = reactive(defaultValueForm());

const handleFinish = (values: any) => {};
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
