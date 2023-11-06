<template>
  <Modal title="Xác thực OTP" :footer="null" destroy-on-close>
    <template v-if="formOtp === 'email'">
      <div>
        <Form
          layout="vertical"
          :initial-values="initialValues"
          enable-reinitialize
          @finish="$emit('sentRequestOtp', $event)"
        >
          <FormItem
            label="Email"
            name="email"
            :rules="[{ required: true }]"
            v-slot="{ value, handleChange }"
          >
            <a-input :value="value" disabled @update:value="handleChange" />
          </FormItem>
          <div class="flex justify-center">
            <FormItem v-slot="{ form }">
              <Button
                type="primary"
                :disabled="!form.values.email"
                :html-type="'submit'"
                >Gửi đi</Button
              >
            </FormItem>
          </div>
        </Form>
      </div>
    </template>
    <template v-else>
      <div>
        <Form
          layout="vertical"
          :initial-values="initialValues"
          enable-reinitialize
          @finish="$emit('verifyOtp', $event)"
        >
          <FormItem
            class="mb-5"
            name="otp"
            :rules="[{ required: true }]"
            hide-text-error
            v-slot="{ value, handleChange }"
          >
            <CodeSMS :value="value" @update:value="handleChange" />
          </FormItem>
          <div class="flex justify-center">
            <FormItem v-slot="{ form }">
              <Button
                type="primary"
                :disabled="!form.values.email"
                :html-type="'submit'"
                >Xác thực</Button
              >
            </FormItem>
          </div>
        </Form>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import Button from "@/components/Button.vue";
import Form from "@/components/Form.vue";
import CodeSMS from "@/components/Form/CodeSMS.vue";
import FormItem from "@/components/FormItem.vue";
import Modal from "@/components/Modal.vue";
import { ModalFuncProps } from "ant-design-vue";
import { computed, ref, watch } from "vue";

export interface ModalOtpProps extends ModalFuncProps {
  data: {
    isSentRequestOtp: boolean;
    isFinalVerify: boolean;
    email: string;
  };
}

const props = defineProps<ModalOtpProps>();
const emit = defineEmits<{
  (e: "sentRequestOtp", value: any): void;
  (e: "verifyOtp", value: any): void;
}>();

const formOtp = ref<"email" | "otp">("email");

const initialValues = computed(() => {
  return {
    email: props.data.email,
  };
});

watch(
  () => props.data,
  () => {
    if (props.data.isSentRequestOtp) {
      formOtp.value = "otp";
    } else {
      formOtp.value = "email";
    }
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss" scoped></style>
