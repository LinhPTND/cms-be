<template>
  <LetterWrap class="letter">
    <div class="title mb-[32]">
      <h3 class="uppercase mb-2 font-semibold">
        Đơn xin cấp lại thẻ sinh viên
      </h3>
    </div>
    <div>
      <Form
        ref="formRef"
        :initial-values="initialValues"
        enable-reinitialize
        @finish="$emit('finish', $event)"
      >
        <div class="flex mb-6 items-baseline">
          <div class="mr-4">Kính gửi</div>
          <div>
            <div>- Trung tâm thư viện</div>
            <div class="flex items-baseline">- Hệ quản lý sinh viên</div>
          </div>
        </div>
        <div class="content-line">
          <a-space :align="'baseline'" class="mr-[60px]">
            <span class="label">Em tên là:</span>
            <FormItem
              name="name"
              :rules="[{ required: true, message: 'Vui lòng nhập họ tên' }]"
              :input="'a-input'"
              :input-props="{
                placeholder: 'Họ tên',
                disabled: readOnly,
              }"
            />
          </a-space>
          <a-space align="baseline">
            <span class="label">Số điện thoại: </span>
            <FormItem
              name="phone"
              :rules="[
                {
                  validator: validatePhone,
                },
              ]"
              v-slot="{ value, handleChange }"
            >
              <InputTextNumber
                :disabled="readOnly"
                :value="value"
                placeholder="Số điện thoại"
                @update:value="handleChange"
              />
            </FormItem>
          </a-space>
        </div>
        <div class="content-line">
          <a-space :align="'baseline'" class="mr-6">
            <span class="label">Chuyên nghành:</span>
            <FormItem
              class="inline-flex px-2"
              name="majors"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập nghành học',
                },
              ]"
              v-slot="{ value, handleChange }"
            >
              <a-select
                :value="value"
                @update:value="handleChange"
                :disabled="readOnly"
                :options="Majors"
                :style="{ width: '200px' }"
              />
            </FormItem>
          </a-space>
          <a-space align="baseline" class="mr-6">
            <span class="label">Lớp: </span>
            <FormItem
              name="class"
              :rules="[{ required: true, message: 'Vui lòng nhập lớp' }]"
              input="a-input"
              :input-props="{
                disabled: readOnly,
                placeholder: 'Lớp',
              }"
            />
          </a-space>
          <a-space align="baseline">
            <span class="label">Mã SV: </span>
            <FormItem
              name="msv"
              :rules="[
                { required: true, message: 'Vui lòng nhập Mã sinh viên' },
                { max: 10 },
              ]"
              input="a-input"
              :input-props="{
                placeholder: 'Mã sinh viên',
                disabled: readOnly,
              }"
            />
          </a-space>
        </div>
        <div class="content-line">
          <a-space align="baseline" class="mr-6">
            <span class="label">Ngày tháng năm sinh: </span>
            <FormItem
              name="birthDay"
              :rules="[{ required: true, message: 'Vui lòng nhập Ngày sinh' }]"
              v-slot="{ value, handleChange }"
              :value-transformer="{
                in: (value: any) => value ? dayjs(value) : value,
                out: (value: any) => dayjs(value).format('YYYY-MM-DD'),
              }"
            >
              <a-date-picker
                :value="value"
                :disabled="readOnly"
                @update:value="handleChange"
                format="DD/MM/YYYY"
                placeholder="DD/MM/YYYY"
              />
            </FormItem>
          </a-space>
          <a-space align="baseline" class="mr-6">
            <span class="label">Giới tính: </span>
            <FormItem name="gender" v-slot="{ value, handleChange }">
              <a-radio-group
                :value="value"
                @update:value="handleChange"
                :options="Genders"
                :disabled="readOnly"
              />
            </FormItem>
          </a-space>
        </div>
        <div class="content-line mb-2">
          <a-space align="baseline" class="mr-6">
            <span class="label">Số CMND: </span>
            <FormItem
              name="citizenId"
              :rules="[{ validator: validateCitizenId }]"
              v-slot="{ value, handleChange }"
            >
              <InputTextNumber
                :value="value"
                :disabled="readOnly"
                @update:value="handleChange"
                placeholder="Số CMND"
              />
            </FormItem>
          </a-space>
          <a-space align="baseline" class="mr-6">
            <span class="label">Ngày cấp: </span>
            <FormItem
              name="dateCitizenId"
              :rules="[
                { required: true, message: 'Vui lòng nhập ngày cấp CMND' },
              ]"
              :value-transformer="{
                in: (value: any) => value ? dayjs(value) : value,
                out: (value: any) => dayjs(value).format('YYYY-MM-DD'),
              }"
              v-slot="{ value, handleChange }"
            >
              <a-date-picker
                :value="value"
                @update:value="handleChange"
                :disabled="readOnly"
                format="DD/MM/YYYY"
                placeholder="DD/MM/YYYY"
              />
            </FormItem>
          </a-space>
          <div class="mr-6 flex items-baseline flex-1">
            <span class="label mr-2">Nơi cấp: </span>
            <FormItem
              class="flex-1"
              name="placeCitizenId"
              :rules="[
                { required: true, message: 'Vui lòng nhập nơi cấp CMND' },
              ]"
              input="a-input"
              :input-props="{
                placeholder: 'Nơi cấp chứng mình nhân dân',
                disabled: readOnly,
              }"
            />
          </div>
        </div>
        <div class="content-line mb-6">
          <div class="mr-6 w-full flex items-baseline">
            <span class="label mr-2">Hộ khẩu thường trú: </span>
            <FormItem
              class="flex-1"
              name="permanentResidence"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập hộ khẩu thường trú',
                },
              ]"
              input="a-input"
              :input-props="{
                disabled: readOnly,
              }"
            />
          </div>
        </div>
        <div class="content-line mb-4">
          <div class="mb-1">Vừa qua, em không may làm mất thẻ sinh viên.</div>
          <div>
            Vậy em làm đơn này kính mong Hệ Quản lý sinh viên và Trung tâm thư
            viện xác nhận thông tin trên và cấp lại thẻ sinh viên cho em.
          </div>
        </div>
      </Form>
      <div class="content-line">Em xin chân thành cảm ơn.</div>
    </div>
  </LetterWrap>
</template>

<script lang="ts" setup>
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import InputTextNumber from "@/components/InputTextNumber.vue";
import LetterWrap from "@/components/LetterWrap.vue";
import { Genders, Majors } from "@/constants/Options";
import { validateCitizenId, validatePhone } from "@/hooks/validate";
import { FormExposed } from "@/models/Form";
import { RenewStudentCardRequest } from "@/models/RenewStudentCard";
import dayjs from "dayjs";
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    initialValues?: RenewStudentCardRequest;
    readOnly: boolean;
  }>(),
  {
    readOnly: false,
  }
);

const formRef = ref<FormExposed>();

const formValues = computed(() => formRef.value?.values);

const emit = defineEmits<{
  (e: "finish", value: any): void;
}>();

const resetForm = () => {
  formRef.value?.reset();
};

const submit = () => {
  formRef.value?.submit();
};

function validate() {
  return new Promise<void>((resolve, reject) => {
    formRef.value
      ?.validate()
      .then((values: any) => {
        resolve(values);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

defineExpose({
  resetForm,
  submit,
  validate,
  values: formValues,
});
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 40px;
  h3 {
    text-align: center;
  }
}
.content-line {
  @apply flex items-baseline w-full flex-wrap;
  font-size: 13px;
  line-height: 20px;
}
</style>
