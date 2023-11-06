<template>
  <LetterWrap class="letter">
    <div class="title">
      <h3 class="uppercase mb-2 font-semibold">
        ĐƠN XIN ĐĂNG KÝ VÀ THAY ĐỔI HỌC PHẦN
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
            <div>- Hệ Quản lý sinh viên</div>
            <div class="flex items-baseline">
              - Giáo viên chủ nhiệm khóa
              <FormItem
                class="ml-2"
                name="teacherHomeRoom"
                :rules="[
                  { required: true, message: 'Vui lòng nhập chủ nhiệm khóa' },
                ]"
                :input="'a-input'"
                :input-props="{
                  placeholder: 'Họ tên',
                  disabled: readOnly,
                }"
              />
            </div>
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
          <span>Em đã thực hiện đăng ký học, học kỳ</span>
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
          />
          <span
            >theo kế hoạch của Học viện. Hiện em có nguyện vọng đăng ký bổ
            sung/thay đổi các học phần sau:
          </span>
        </div>
        <div class="table mt-4">
          <div class="title-table">
            <span class="mr-1 text-sm font-semibold">1. Đăng ký bổ sung</span>
            <span>
              (sinh viên phải lọc trùng lớp học phần trước khi nộp đơn)</span
            >
            <FormItem
              name="courseAdds"
              :rules="[
                {
                  validator: validateTableAdd,
                },
              ]"
              v-slot="{ value, handleChange }"
            >
              <TableSignAdd
                :value="value"
                @update:value="handleChange"
                :disabled="readOnly"
              />
            </FormItem>
          </div>
        </div>
        <div class="table mt-4 mb-4">
          <div class="title-table">
            <span class="mr-1 text-sm font-semibold">2. Thay đổi</span>
            <FormItem
              name="courseChanges"
              :rules="[
                {
                  validator: validateTableChange,
                },
              ]"
              v-slot="{ value, handleChange }"
            >
              <TableChangeCourse
                :value="value"
                @update:value="handleChange"
                :disabled="readOnly"
              />
            </FormItem>
          </div>
        </div>
        <div class="mb-1">
          <div class="mb-[8px]">Lí do thay đổi học phần:</div>
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
        <div>
          <div class="mb-[8px]">Em xin cam kết:</div>
          <ul class="list">
            <li class="font-semibold">
              - Chịu trách nhiệm với nội dung đăng ký trên;
            </li>
            <li class="font-semibold">
              - Tự cập nhật kết quả đăng ký và phản hồi với GVCN trong vòng 05
              ngày sau khi nộp đơn;
            </li>
            <li class="font-semibold">
              - Chấp hành nghiêm quy chế, quy định trong học tập.
            </li>
          </ul>
          <div>Em xin chân thành cảm ơn.</div>
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
import { validatePhone } from "@/hooks/validate";
import { ChangeCourseRequest } from "@/models/ChangeCourse";
import { FormExposed } from "@/models/Form";
import TableChangeCourse from "@/modules/user/components/TableLetters/TableChangeCourse.vue";
import TableSignAdd from "@/modules/user/components/TableLetters/TableSignAdd.vue";
import { Rule } from "ant-design-vue/lib/form/interface";
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    initialValues?: ChangeCourseRequest;
    readOnly: boolean;
  }>(),
  {
    readOnly: false,
  }
);

const formRef = ref<FormExposed>();

const formValues = computed(() => formRef.value?.values);

const validateTableAdd = async (_rule: Rule, value: string) => {
  if (!formRef.value?.values?.courseChanges?.length && !value?.length) {
    return Promise.reject("Bạn phải nhập thông tin 1 trong 2 bảng");
  }
  return Promise.resolve();
};
const validateTableChange = async (_rule: Rule, value: string) => {
  if (!formRef.value?.values?.courseAdds?.length && !value?.length) {
    return Promise.reject("Bạn phải nhập thông tin 1 trong 2 bảng");
  }
  return Promise.resolve();
};

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
