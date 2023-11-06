<template>
  <LetterWrap class="letter">
    <div class="title">
      <h3 class="uppercase mb-2 font-semibold">ĐƠN XIN HỦY HỌC PHẦN</h3>
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
            <div>- Phòng Đào tạo</div>
            <div>- Phòng Kế hoạch – Tài chính</div>
            <div>- Hệ Quản lý sinh viên</div>
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
                  message: 'Vui lòng nhập chuyên nghành',
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
            >theo kế hoạch của Học viện. Hiện em có nguyện vọng hủy các học phần
            sau:
          </span>
        </div>
        <div class="table mt-4 mb-4">
          <FormItem
            name="courseCancel"
            :rules="[
              {
                required: true,
                message: 'Bạn phải nhập thông tin bảng',
              },
            ]"
            v-slot="{ value, handleChange }"
          >
            <TableCancelCourse
              :value="value"
              @update:value="handleChange"
              :disabled="readOnly"
            />
          </FormItem>
        </div>

        <div class="mb-1">
          <div class="mb-[8px]">Lý do xin hủy học phần:</div>
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
import { Majors } from "@/constants/Options";
import { CancelCourseRequest } from "@/models/CancelCourse";
import { FormExposed } from "@/models/Form";
import TableCancelCourse from "@/modules/user/components/TableLetters/TableCancelCourse.vue";
import { Rule } from "ant-design-vue/lib/form/interface";
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    initialValues?: CancelCourseRequest;
    readOnly: boolean;
  }>(),
  {
    readOnly: false,
  }
);

const formRef = ref<FormExposed>();

const formValues = computed(() => formRef.value?.values);

const validatePhone = async (_rule: Rule, value: string) => {
  const regexNumber = /^\d+$/;
  if (value === "") {
    return Promise.reject("Vui lòng nhập số điện thoại");
  } else if (!regexNumber.test(value)) {
    return Promise.reject("Sai định dạng");
  } else if (value.toString().length !== 10) {
    return Promise.reject("Bạn chưa nhập đúng 10 số");
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
