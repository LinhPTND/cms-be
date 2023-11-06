<template>
  <LetterWrap class="letter">
    <div class="title mb-[32]">
      <h3 class="uppercase mb-2 font-semibold">Giấy xác nhận</h3>
      <div class="text-center">
        (Ban hành kèm theo Thông tư số 36/2015/TT-BLĐTBXH ngày 28 tháng 9 năm
        2015 của Bộ Lao động-Thương binh và Xã hội)
      </div>
    </div>
    <div>
      <Form
        ref="formRef"
        :initial-values="initialValues"
        enable-reinitialize
        @finish="$emit('finish', $event)"
      >
        <div class="font-semibold text-sm mb-4">
          Phần I: Dùng cho cơ sở giáo dục mầm non, phổ thông xác nhận
        </div>
        <div class="content-line">
          <span class="label mr-2">Trường:</span>
          <FormItem
            name="schoolC2"
            input="a-input"
            :input-props="{ disabled: readOnly }"
          />
        </div>
        <div class="content-line">
          <span class="label mr-2">Xác nhận học sinh:</span>
          <FormItem
            name="confirmC2"
            input="a-input"
            :input-props="{ disabled: readOnly }"
          />
        </div>
        <div class="content-line">
          <a-space :align="'baseline'" class="mr-6">
            <span class="label">Hiện đang học tại lớp:</span>
            <FormItem
              name="classC2"
              input="a-input"
              :input-props="{ disabled: readOnly }"
            />
          </a-space>
          Học kỳ
          <FormItem
            class="inline-flex px-2"
            name="semesterC2"
            input="a-input-number"
            :input-props="{ disabled: readOnly }"
          >
          </FormItem>
          năm học
          <FormItem
            class="inline-flex px-2"
            name="startC2Y"
            input="a-input-number"
            :input-props="{ disabled: readOnly }"
          />
          –
          <FormItem
            class="inline-flex px-2"
            name="endC2Y"
            input="a-input-number"
            :input-props="{ disabled: readOnly }"
          />
        </div>
        <div class="font-semibold text-sm mb-4">
          Phần II: Dùng cho các cơ sở giáo dục nghề nghiệp, giáo dục đại học xác
          nhận
        </div>
        <div class="content-line mb-4">
          <a-space :align="'baseline'" class="mr-6">
            <span class="label">Trường:</span>
            <span class="font-semibold">Học viện Kỹ thuật mật mã</span>
          </a-space>
        </div>
        <div class="content-line">
          <span class="label mr-2">Xác nhận của anh / chị:</span>
          <FormItem
            name="confirmStudent"
            :rules="[{ required: true, message: 'Vui lòng nhập xác nhận' }]"
            input="a-input"
            :input-props="{ disabled: readOnly }"
          >
          </FormItem>
        </div>
        <div class="mb-4">Hiện là học sinh, sinh viên:</div>
        <div class="content-line">
          <a-space align="baseline" class="mr-6">
            <span class="label">Năm thứ: </span>
            <FormItem
              name="yearSchoolSt"
              :rules="[{ required: true, message: 'Vui lòng nhập thông tin' }]"
              input="a-input-number"
              :input-props="{ disabled: readOnly }"
            />
          </a-space>
          <a-space align="baseline">
            Học kỳ:
            <FormItem
              name="semester"
              :rules="[{ required: true, message: 'Vui lòng nhập học kỳ' }]"
              input="a-input-number"
              :input-props="{ disabled: readOnly }"
            />
            Từ
            <FormItem
              class="inline-flex px-2"
              name="timeInSchool"
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
                :format="'MM/YYYY'"
                :disabled="readOnly"
                picker="month"
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
              :input-props="{ disabled: readOnly }"
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
            <span class="label">Nghành: </span>
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
                :options="Majors"
                :style="{ width: '200px' }"
                placeholder="Nghành học"
                :disabled="readOnly"
              />
            </FormItem>
          </a-space>
          <a-space align="baseline" class="mr-6">
            <span class="label mr-2">Khóa học: </span>
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
                :format="'MM/YYYY'"
                picker="month"
                :disabled="readOnly"
              />
            </FormItem>
          </a-space>
          <a-space align="baseline" class="mr-6">
            <div class="content-line">
              <span class="label mr-2">Thời gian khóa học: </span>
              <FormItem
                class="inline-flex px-2"
                name="courseTime"
                :rules="[
                  { required: true },
                  { type: 'number', min: 1, max: 8 },
                ]"
                input="a-input-number"
                :input-props="{ disabled: readOnly }"
              />

              <span>năm</span>
            </div>
          </a-space>
        </div>
        <div class="content-line mb-4">Hình thức đào tạo: Chính quy</div>
        <div class="content-line">
          <span class="mr-2">Kỷ luật: </span>
          <FormItem
            class="inline-flex px-2"
            name="discipline"
            input="a-input"
            :input-props="{ disabled: readOnly }"
          />
          <span> (ghi rõ mức độ kỷ luật nếu có). </span>
        </div>
        <div class="content-line">
          <span>
            Đề nghị Phòng Lao động - Thương binh và xã hội xem xét, giải quyết
            chế độ ưu đãi trong giáo dục đào tạo cho anh/chị
          </span>
          <FormItem
            class="inline-flex px-2"
            name="namePolicy"
            :rules="[{ required: true }]"
            :input-props="{ disabled: readOnly }"
            input="a-input"
          />
          <span>theo quy định và chế độ hiện hành./.</span>
        </div>
      </Form>
    </div>
  </LetterWrap>
</template>

<script lang="ts" setup>
import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import LetterWrap from "@/components/LetterWrap.vue";
import { Majors } from "@/constants/Options";
import { EnjoyPolicyRequest } from "@/models/EnjoyPolicy";
import { FormExposed } from "@/models/Form";
import dayjs from "dayjs";
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    initialValues?: EnjoyPolicyRequest;
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
}

.letter {
  .title {
    h3 {
      text-align: center;
    }
  }
}
.content-line {
  @apply flex items-baseline w-full flex-wrap;
  font-size: 13px;
  line-height: 20px;
}
</style>
