<template>
  <LetterWrap class="letter">
    <div class="title">
      <h3 class="uppercase mb-2 font-semibold">Giấy xác nhận</h3>
    </div>
    <div>
      <Form
        ref="formRef"
        :initial-values="initialValues"
        enable-reinitialize
        @finish="$emit('finish', $event)"
      >
        <div class="content-line">
          <a-space :align="'baseline'" class="mr-[60px]">
            <span class="label">Họ và tên sinh viên:</span>
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
          <a-space align="baseline" class="mr-[75px]">
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
          Mã trường theo học (Mã theo quy định tuyển sinh): KMA
        </div>
        <div class="content-line mb-6">
          Tên trường: Học viện Kỹ thuật Mật mã.
        </div>
        <div class="content-line">
          <span class="label">Nghành học:</span>
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
        </div>
        <div class="content-line mb-[24px]">
          Hệ đào tạo (Đại học, Cao đẳng, TCTN, dạy nghề): Đại học
        </div>
        <div class="content-line">
          <a-space align="baseline" class="mr-[32px]">
            <span class="label mr-2">Khóa: </span>
            <FormItem
              class="inline-flex px-2"
              name="course"
              v-slot="{ value, handleChange }"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập khóa học',
                },
              ]"
              :value-transformer="{
                in: (value: any) => value ? [dayjs(value[0]), dayjs(value[1])] : value,
                out: (value: any) => [dayjs(value[0]).format('YYYY-MM'), dayjs(value[1]).format('YYYY-MM')],
              }"
            >
              <a-range-picker
                :value="value"
                @update:value="handleChange"
                :disabled="readOnly"
                :format="'MM/YYYY'"
                picker="month"
              />
            </FormItem>
          </a-space>
          <a-space align="baseline">
            <span class="label mr-2">Loại hình đạo tạo: Chính quy </span>
          </a-space>
        </div>

        <div class="content-line">
          <a-space class="mr-[32px]" align="baseline">
            <span class="label mr-2">Lớp: </span>
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
          <a-space class="mr-[32px]" align="baseline">
            <span class="label mr-2">Mã sinh viên: </span>
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
          <a-space class="mr-[32px]" align="baseline">
            <span class="label mr-2">Khoa: </span>
            <FormItem
              class="inline-flex px-2"
              name="department"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập khoa',
                },
              ]"
              input="a-input"
              :input-props="{
                disabled: readOnly,
                placeholder: 'Khoa',
              }"
            />
          </a-space>
        </div>

        <div class="content-line">
          <a-space class="mr-[32px]" align="baseline">
            <span class="label mr-2">Ngày nhập học: </span>
            <FormItem
              class="inline-flex px-2"
              name="schoolStart"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập ngày nhập học',
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
                @update:value="handleChange"
                format="DD/MM/YYYY"
                :disabled="readOnly"
                placeholder="DD/MM/YYYY"
              />
            </FormItem>
          </a-space>
          <a-space class="mr-[32px]" align="baseline">
            <span class="label mr-2">Thời gian ra trường (tháng/năm): </span>
            <FormItem
              class="inline-flex px-2"
              name="schoolEnd"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập thời gian ra trường',
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
                @update:value="handleChange"
                :disabled="readOnly"
                format="DD/MM/YYYY"
                placeholder="DD/MM/YYYY"
              />
            </FormItem>
          </a-space>
        </div>

        <div class="content-line mb-[24px]">
          Thời gian học tại trường: 50 tháng.
        </div>

        <ul class="list-disc pl-5">
          <li>
            <a-space class="mr-[32px]" align="baseline">
              <span class="label mr-2">Số tiền học phí hàng tháng: </span>
              <FormItem
                class="inline-flex px-2"
                name="tuitionFee"
                :rules="[
                  {
                    required: true,
                    message: 'Vui lòng nhập học phí',
                  },
                  { type: 'number', min: 0 },
                ]"
                v-slot="{ value, handleChange }"
              >
                <a-input-number
                  :value="value"
                  @update:value="handleChange"
                  :disabled="readOnly"
                  style="width: 200px !important"
                  placeholder="Học phí"
                />
              </FormItem>
            </a-space>
          </li>
          <li>
            <a-space class="mr-[32px]" align="baseline">
              <span class="label mr-2">Thuộc diện: </span>
              <FormItem
                class="inline-flex px-2"
                name="tuitionType"
                :rules="[
                  {
                    required: true,
                    message: 'Vui lòng nhập diện hỗ trợ',
                  },
                ]"
                input="a-select"
                :input-props="{
                  options: TuitionType,
                  style: 'width: 200px',
                  placeholder: 'Diện hỗ trợ',
                  disabled: readOnly,
                }"
              />
            </a-space>
          </li>
          <li>
            <a-space class="mr-[32px]" align="baseline">
              <span class="label mr-2">Thuộc đối tượng: </span>
              <FormItem
                class="inline-flex px-2"
                name="tuitionObj"
                :rules="[
                  {
                    required: true,
                    message: 'Vui lòng nhập đối tượng hỗ trợ',
                  },
                ]"
                input="a-select"
                :input-props="{
                  options: TuitionObj,
                  style: 'width: 200px',
                  placeholder: 'Đối tượng',
                  disabled: readOnly,
                }"
              >
              </FormItem>
            </a-space>
          </li>
        </ul>
        <div class="content-line">
          <p>
            Trong thời gian học tại trường, sinh viên: không bị xử phạt hành
            chính trở lên về các hành vi: cờ bạc, nghiện hút, trộm cắp, buôn
            lậu…
          </p>
        </div>
        <div class="content-line">
          <a-space class="mr-[32px]" align="baseline">
            <span class="label mr-2">Tài khoản ngân hàng số: </span>
            <FormItem
              class="inline-flex px-2"
              name="bankNumber"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập số tài khoản ngân hàng',
                },
                { type: 'string', min: 5 },
              ]"
              v-slot="{ value, handleChange }"
            >
              <InputTextNumber
                :value="value"
                @update:value="handleChange"
                style="width: 200px !important"
                placeholder="Số tài khoản ngân hàng"
              />
            </FormItem>
          </a-space>
          <a-space class="mr-[32px]" align="baseline">
            <span class="label">Ngân hàng: </span>
            <FormItem
              class="inline-flex px-2"
              name="bank"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập ngân hàng',
                },
              ]"
              v-slot="{ value, handleChange }"
            >
              <a-select
                :options="Bank"
                :value="value"
                @update:value="handleChange"
                style="width: 200px !important"
                placeholder="Ngân hàng"
              />
            </FormItem>
          </a-space>
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
import {
  Bank,
  Genders,
  Majors,
  TuitionObj,
  TuitionType,
} from "@/constants/Options";
import { validateCitizenId, validatePhone } from "@/hooks/validate";
import { BankLoanRequest } from "@/models/BankLoan";
import { FormExposed } from "@/models/Form";
import dayjs from "dayjs";
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    initialValues?: BankLoanRequest;
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
