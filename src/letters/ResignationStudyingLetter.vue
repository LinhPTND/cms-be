<template>
  <LetterWrap class="letter">
    <div class="title mb-[32]">
      <h3 class="uppercase mb-2 font-semibold">Đơn xin thôi học</h3>
    </div>
    <div>
      <Form
        :initial-values="initialValues"
        enable-reinitialize
        @finish="$emit('finish', $event)"
        ref="formRef"
      >
        <div class="flex mb-6 items-baseline">
          <div class="mr-4">Kính gửi</div>
          <div>
            <div>- Phòng đào tạo</div>
            <div>- Hệ quản lý sinh viên</div>
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
                out: (value: any) => value ? dayjs(value).format('YYYY-MM-DD') : value,
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
              <a-select
                :value="value"
                @update:value="handleChange"
                :options="Genders"
                :disabled="readOnly"
                placeholder="Giới tính"
                style="width: 100px"
              />
            </FormItem>
          </a-space>
        </div>
        <div class="content-line">
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
                :disabled="readOnly"
                @update:value="handleChange"
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
                placeholder: 'Hộ khẩu thường trú',
                disabled: readOnly,
              }"
            />
          </div>
        </div>
        <div class="content-line">
          <a-space align="baseline" class="mr-6">
            <span class="label">Họ tên bố mẹ: </span>
            <FormItem
              name="parentName"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập họ tên bố (hoặc mẹ)',
                },
              ]"
              input="a-input"
              :input-props="{
                placeholder: 'Họ tên bố mẹ',
                disabled: readOnly,
              }"
            />
          </a-space>
          <a-space align="baseline" class="mr-6">
            <span class="label">Số điện thoại: </span>
            <FormItem
              name="parentPhone"
              :rules="[
                {
                  validator: validatePhone,
                },
              ]"
              v-slot="{ value, handleChange }"
            >
              <InputTextNumber
                :value="value"
                @update:value="handleChange"
                placeholder="Số điện thoại"
                :disabled="readOnly"
              />
            </FormItem>
          </a-space>
        </div>
        <div class="content-line">
          <div class="mr-6 w-full flex items-baseline">
            <span class="label mr-2">Nơi ở hiện tại: </span>
            <FormItem
              class="flex-1"
              name="address"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập nơi ở hiện tại',
                },
              ]"
              input="a-input"
              :input-props="{
                disabled: readOnly,
              }"
            />
          </div>
        </div>
        <div class="content-line">
          <p class="flex items-baseline flex-wrap text-[13px]">
            Em viết đơn này xin được thôi học tại Học viện, từ ngày
            <FormItem
              class="inline-flex px-2"
              name="dateLeave"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập ngày bắt đầu nghỉ học',
                },
              ]"
              :value-transformer="{
                in: (value: any) => value ? dayjs(value) : value,
                out: (value: any) => dayjs(value).format('YYYY-MM-DD'),
              }"
              v-slot="{ value, handleChange }"
            >
              <a-date-picker
                :value="value"
                :disabled="readOnly"
                @update:value="handleChange"
                format="DD/MM/YYYY"
                placeholder="DD/MM/YYYY"
              />
            </FormItem>
            (Học kỳ
            <FormItem
              class="inline-flex px-2"
              name="semester"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập học kì',
                },
              ]"
              input="a-input-number"
              :input-props="{
                min: 1,
                disabled: readOnly,
                max: 10,
              }"
            />
            năm học
            <FormItem
              class="inline-flex px-2"
              name="startYear"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập năm học kì bắt đầu',
                },
                {
                  type: 'number',
                  min: 2000,
                },
              ]"
              input="a-input-number"
              :input-props="{
                disabled: readOnly,
              }"
            />
            –
            <FormItem
              class="inline-flex px-2"
              name="endYear"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập năm học kì kết thúc',
                },
                {
                  type: 'number',
                  min: 2000,
                },
              ]"
              input="a-input-number"
              :input-props="{
                disabled: readOnly,
              }"
            />)
          </p>
        </div>
        <div class="content-line mb-6">
          <div class="mr-6 w-full flex items-start">
            <span class="label mr-2">Lý do thôi học: </span>
            <FormItem
              class="w-full"
              name="reason"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập lí do',
                },
              ]"
              v-slot="{ value, handleChange }"
            >
              <a-textarea
                :value="value"
                @update:value="handleChange"
                show-count
                :maxlength="250"
                placeholder="Lí do"
                :disabled="readOnly"
              />
            </FormItem>
          </div>
        </div>
        <div class="content-line">
          <p>
            Em xin cam kết nội dung trên là chính xác. Nếu sai em xin hoàn toàn
            chịu trách nhiệm. Em xin chân thành cảm ơn.
          </p>
        </div>
      </Form>
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
import { ReservationAcademicRequest } from "@/models/ReservationAcademic";
import dayjs from "dayjs";
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    initialValues?: ReservationAcademicRequest;
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
  @apply flex items-center w-full;
}
</style>
