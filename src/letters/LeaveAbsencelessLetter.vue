<template>
  <LetterWrap class="letter">
    <div class="title mb-[32]">
      <h3 class="uppercase mb-2 font-semibold">Đơn xin nghỉ học có thời hạn</h3>
      <div class="text-center font-semibold">( Dưới 7 ngày )</div>
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
            <div>- Hệ quản lý sinh viên</div>
            <div class="flex items-baseline">
              - Giảng viên lớp học phần
              <FormItem
                class="pl-3"
                name="classCourse"
                :rules="[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên lớp học phần',
                  },
                ]"
                input="a-input"
                :input-props="{ disabled: readOnly, placeholder: 'Giảng viên' }"
              >
              </FormItem>
            </div>
          </div>
        </div>
        <div class="content-line">
          <a-space :align="'baseline'" class="mr-[60px]">
            <span class="label">Em tên là:</span>
            <FormItem
              name="name"
              :rules="[{ required: true, message: 'Vui lòng nhập họ tên' }]"
              input="a-input"
              :input-props="{
                placeholder: 'Họ tên',
                disabled: readOnly,
              }"
            >
            </FormItem>
          </a-space>
          <a-space align="baseline">
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
                placeholder="Nghành học"
              />
            </FormItem>
          </a-space>
          <a-space align="baseline" class="mr-6">
            <span class="label">Lớp: </span>
            <FormItem
              class="inline-flex px-2"
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
              class="inline-flex px-2"
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
                placeholder: 'Hộ khẩu thường trú',
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
              name="phone"
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
          <span class="label mr-2"
            >Em viết đơn này xin phép được nghỉ học từ ngày
          </span>
          <FormItem
            class="inline-flex px-2"
            name="timeLeave"
            v-slot="{ value, handleChange }"
            :rules="[
              {
                required: true,
                message: 'Vui lòng nhập khóa học',
              },
            ]"
            :value-transformer="{
                in: (value: any) => value ? [dayjs(value[0]), dayjs(value[1])] : value,
                out: (value: any) => [dayjs(value[0]).format('YYYY-MM-DD'), dayjs(value[1]).format('YYYY-MM-DD')],
              }"
          >
            <a-range-picker
              :value="value"
              @update:value="handleChange"
              :disabled="readOnly"
              :format="'DD/MM/YYYY'"
              :value-format="'YYYY-MM-DD'"
            />
          </FormItem>
        </div>
        <div class="content-line mb-4">
          <div class="mr-6 w-full flex items-start">
            <span class="label mr-2">Lý do nghỉ học: </span>
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
          Trong thời gian nghỉ học, em xin cam kết sẽ không gây ra hành vi vi
          phạm pháp luật của Nhà nước và quy định của Học viện. Nếu sai, em xin
          hoàn toàn chịu trách nhiệm. Em xin chân thành cảm ơn.
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
import { LeaveAbsenceMoreRequest } from "@/models/LeaveAbsenceMore";
import dayjs from "dayjs";
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    initialValues?: LeaveAbsenceMoreRequest;
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
