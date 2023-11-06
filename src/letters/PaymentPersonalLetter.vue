<template>
  <LetterWrap class="letter">
    <div class="title">
      <h3 class="uppercase mb-2 font-semibold">Phiếu thanh toán ra trường</h3>
      <div class="text-center font-semibold">
        ( Dành cho cá nhân sinh viên )
      </div>
    </div>
    <div>
      <Form
        ref="formRef"
        :initial-values="initialValuesCustom"
        enable-reinitialize
        @finish="$emit('finish', $event)"
      >
        <div class="content-line">
          <a-space :align="'baseline'" class="mr-[24px]">
            <span class="label">Họ tên sinh viên:</span>
            <FormItem
              name="name"
              :rules="[{ required: true, message: 'Vui lòng nhập họ tên' }]"
              input="a-input"
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
                :value="value"
                @update:value="handleChange"
                placeholder="Số điện thoại"
                :disabled="readOnly"
              />
            </FormItem>
          </a-space>
        </div>
        <div class="content-line">
          <a-space :align="'baseline'" class="mr-[24px]">
            <span class="label">Chuyên ngành:</span>
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
          <a-space align="baseline" class="mr-[24px]">
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
            <span class="label">Mã sinh viên: </span>
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
          <a-space :align="'baseline'" class="mr-[40px]">
            <span class="label">Lý do thanh toán:</span>
            <FormItem
              name="paymentReason"
              :rules="[{ required: true }]"
              v-slot="{ value, handleChange }"
            >
              <a-radio-group
                :value="value"
                @update:value="handleChange"
                :disabled="readOnly"
              >
                <a-radio value="Tốt nghiệp">Tốt nghiệp</a-radio>
                <a-radio value="Thôi học">Thôi học</a-radio>
              </a-radio-group>
            </FormItem>
          </a-space>
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
          <a-space :align="'baseline'">
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
        </div>
        <div class="content-line mb-[24px] font-semibold">
          Sinh viên xin đầy đủ xác nhận theo đúng thứ tự từ trên xuống; nhận hồ
          sơ ra trường tại Phòng Đào tạo.
        </div>
        <div>
          <a-table
            :dataSource="dataSource"
            :columns="columns"
            :pagination="false"
          >
            <template #bodyCell="{ column, index }">
              <template v-if="column.key === 'stt'">
                <span>{{ index + 1 }}</span>
              </template>

              <template v-if="column.key === 'content'">
                <template v-if="index === 0">
                  <FormItem
                    class="form-item-table"
                    name="libraryCenterContent"
                    :rules="[{ required: true }]"
                    input="a-input"
                    :input-props="{
                      disabled: readOnly,
                    }"
                  >
                  </FormItem>
                </template>
                <template v-if="index === 1">
                  <FormItem
                    class="form-item-table"
                    name="financialContent"
                    :rules="[{ required: true }]"
                    input="a-input"
                    :input-props="{
                      disabled: readOnly,
                    }"
                  >
                  </FormItem>
                </template>
                <template v-if="index === 2">
                  <FormItem
                    class="form-item-table"
                    name="studentManagementSystemContent"
                    :rules="[{ required: true }]"
                    input="a-input"
                    :input-props="{
                      disabled: readOnly,
                    }"
                  >
                  </FormItem>
                </template>
                <template v-if="index === 3">
                  <FormItem
                    class="form-item-table"
                    name="trainingDepartmentContent"
                    :rules="[{ required: true }]"
                    input="a-input"
                    :input-props="{
                      disabled: readOnly,
                    }"
                  >
                  </FormItem>
                </template>
              </template>

              <template v-if="column.key === 'signConfirmation'">
                <template v-if="index === 0">
                  <FormItem
                    class="form-item-table"
                    name="libraryCenterSignature"
                    :rules="[{ required: true }]"
                    input="a-input"
                    :input-props="{
                      disabled: readOnly,
                    }"
                  >
                  </FormItem>
                </template>
                <template v-if="index === 1">
                  <FormItem
                    class="form-item-table"
                    name="financialSignature"
                    :rules="[{ required: true }]"
                    input="a-input"
                    :input-props="{
                      disabled: readOnly,
                    }"
                  >
                  </FormItem>
                </template>
                <template v-if="index === 2">
                  <FormItem
                    class="form-item-table"
                    name="studentManagementSystemSignature"
                    :rules="[{ required: true }]"
                    input="a-input"
                    :input-props="{
                      disabled: readOnly,
                    }"
                  >
                  </FormItem>
                </template>
                <template v-if="index === 3">
                  <FormItem
                    class="form-item-table"
                    name="trainingDepartmentSignature"
                    :rules="[{ required: true }]"
                    input="a-input"
                    :input-props="{
                      disabled: readOnly,
                    }"
                  >
                  </FormItem>
                </template>
              </template>
            </template>
          </a-table>
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
import { validatePhone } from "@/hooks/validate";
import { FormExposed } from "@/models/Form";
import { ColumnProps } from "ant-design-vue/lib/table/Column";
import dayjs from "dayjs";
import { computed, reactive, ref } from "vue";

const props = withDefaults(
  defineProps<{
    initialValues?: any;
    readOnly: boolean;
  }>(),
  {
    readOnly: false,
  }
);

const formRef = ref<FormExposed>();

const formValues = computed(() => formRef.value?.values);

const initialValuesCustom = computed(() => {
  if (!props.initialValues) {
    return undefined;
  }
  return {
    ...props.initialValues,
    libraryCenterContent:
      props.initialValues?.libraryCenter?.content || undefined,
    libraryCenterSignature:
      props.initialValues?.libraryCenter?.signature || undefined,
    financialContent: props.initialValues?.financial?.content || undefined,
    financialSignature: props.initialValues?.financial?.signature || undefined,
    studentManagementSystemContent:
      props.initialValues?.studentManagementSystem?.content || undefined,
    studentManagementSystemSignature:
      props.initialValues?.studentManagementSystem?.signature || undefined,
    trainingDepartmentContent:
      props.initialValues?.trainingDepartment?.content || undefined,
    trainingDepartmentSignature:
      props.initialValues?.trainingDepartment?.signature || undefined,
  };
});

const emit = defineEmits<{
  (e: "finish", value: any): void;
}>();

const dataSource = reactive([
  {
    unit: "Trung tâm Thư viện (Tầng 1 nhà 14 tầng)",
  },
  {
    unit: "Phòng kế hoạch-Tài chính (Tầng 7 nhà 14 tầng)",
  },
  {
    unit: "Hệ Quản lý sinh viên (Tầng 8 nhà 17 tầng)",
  },
  {
    unit: "Phòng đào tạo (Tầng 3 nhà 14 tầng )",
  },
]);

const columns = computed<ColumnProps[]>(() => {
  return [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
      width: "45%",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Ký xác nhận",
      dataIndex: "signConfirmation",
      key: "signConfirmation",
    },
  ];
});

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
  flex-wrap: wrap;
}
</style>
