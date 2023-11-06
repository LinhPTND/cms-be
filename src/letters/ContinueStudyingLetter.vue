<template>
  <LetterWrap class="letter">
    <div class="title">
      <h3 class="uppercase mb-2 font-semibold">Đơn xin tiếp tục học</h3>
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
          <a-space :align="'baseline'" class="mr-[40px]">
            <span class="label">Số quyết định:</span>
            <FormItem
              name="decisionNumber"
              :rules="[
                { required: true, message: 'Vui lòng nhập số quyết định' },
              ]"
              v-slot="{ value, handleChange }"
            >
              <InputTextNumber
                :value="value"
                @update:value="handleChange"
                :disabled="readOnly"
              />
            </FormItem>
          </a-space>
          <a-space :align="'baseline'" class="mr-6">
            <span class="label">Ký ngày:</span>
            <FormItem
              name="dateDecisionAssign"
              :rules="[{ required: true, message: 'Vui lòng nhập ngày ký' }]"
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
          <a-space :align="'baseline'">
            <span class="label">
              của giám đốc Học Viện Kỹ Thuật Mật Mã, em được phép bảo lưu kết
              quả học tập từ ngày
            </span>
            <FormItem
              name="startDateReservationAcademic"
              :rules="[
                {
                  required: true,
                  message: 'Vui lòng nhập ngày bắt đầu bảo lưu',
                },
              ]"
              :value-transformer="{
                in: (value: any) => value ? dayjs(value) : value,
                out: (value: any) => dayjs(value).format('YYYY-MM-DD') ,
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
        </div>
        <div class="content-line">
          <span class="label mr-2">Thời gian bảo lưu: </span>
          <FormItem
            name="timeReservationAcademic"
            :rules="[
              { required: true, message: 'Vui lòng nhập thời gian bảo lưu' },
            ]"
            v-slot="{ value, handleChange }"
          >
            <a-radio-group
              :value="value"
              @update:value="handleChange"
              :disabled="readOnly"
            >
              <a-radio :value="6">06 tháng</a-radio>
              <a-radio :value="12">12 tháng</a-radio>
            </a-radio-group>
          </FormItem>
        </div>
        <div class="content-line">
          <span class="label mr-2"
            >Nay đã hết thời gian bảo lưu. Em làm đơn này xin được tiếp tục tham
            gia học tập từ ngày
          </span>
          <FormItem
            class="mr-2"
            name="dateComeback"
            :rules="[{ required: true }]"
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
        </div>
        <div class="content-line mb-5">
          <div>
            Em xin cam kết sẽ chấp hành nghiêm quy chế và quy định trong học
            tập.
          </div>
        </div>
        <div class="content-line">
          <div>Em xin chân thành cảm ơn.</div>
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
import { ContinueStudyingRequest } from "@/models/ContinueStudying";
import { FormExposed } from "@/models/Form";
import dayjs from "dayjs";
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    initialValues?: ContinueStudyingRequest;
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
.letter {
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
}
</style>
