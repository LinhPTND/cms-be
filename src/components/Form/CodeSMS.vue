<template>
  <div class="list-code" ref="refListCode" @keydown="keyDownListCode">
    <div class="code-item">
      <BoxCode v-model:value="formState.sms1" :maxLength="1" />
    </div>
    <div class="code-item">
      <BoxCode v-model:value="formState.sms2" :maxLength="1" />
    </div>
    <div class="code-item">
      <BoxCode v-model:value="formState.sms3" :maxLength="1" />
    </div>
    <div class="code-item">
      <BoxCode v-model:value="formState.sms4" :maxLength="1" />
    </div>
    <div class="code-item">
      <BoxCode v-model:value="formState.sms5" :maxLength="1" />
    </div>
    <div class="code-item">
      <BoxCode v-model:value="formState.sms6" :maxLength="1" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, reactive, ref, watch } from "vue";
import BoxCode from "./BoxCode.vue";

export interface CodeSMSProps {
  value: string;
}
interface FormState {
  sms1: string;
  sms2: string;
  sms3: string;
  sms4: string;
  sms5: string;
  sms6: string;
}

const props = withDefaults(defineProps<CodeSMSProps>(), {
  value: "",
});

const refListCode = ref<HTMLDivElement>();

const formState = reactive<FormState>({
  sms1: "",
  sms2: "",
  sms3: "",
  sms4: "",
  sms5: "",
  sms6: "",
});

const emit = defineEmits<{
  (e: "update:value", value: string): void;
}>();

const keyDownListCode = (e: any) => {
  const target = e.srcElement;
  const maxLength = parseInt(target.attributes["maxlength"].value, 10);
  const myLength = target.value.length;
  const current = target.closest(".code-item");

  if (e.keyCode === 8 || e.keyCode === 46) {
    if (myLength === 0) {
      const previous = current.previousElementSibling;
      if (previous) {
        previous.querySelector(".box-code input").focus();
      }
    }
  } else {
    if (myLength >= maxLength) {
      const next = current.nextElementSibling;
      if (next) {
        next.querySelector(".box-code input").focus();
      }
    }
  }
};

watch(formState, (value: FormState) => {
  const obj = { ...value };
  let checkEmpty = false;
  (Object.keys(obj) as (keyof typeof obj)[]).forEach((key) => {
    if (!obj[key]) {
      checkEmpty = true;
    }
  });

  if (!checkEmpty) {
    let state = "";
    (Object.keys(obj) as (keyof typeof obj)[]).forEach((key) => {
      state += `${obj[key]}`;
    });
    emit("update:value", state);
  } else {
    emit("update:value", "");
  }
});

watch(
  () => props.value,
  (value) => {
    if (value) {
      for (let index = 0; index < value.length; index++) {
        const indexState = index + 1;
        switch (indexState) {
          case 1:
            formState.sms1 = value[index];
            break;
          case 2:
            formState.sms2 = value[index];
            break;
          case 3:
            formState.sms3 = value[index];
            break;
          case 4:
            formState.sms4 = value[index];
            break;
          case 5:
            formState.sms5 = value[index];
            break;
          case 6:
            formState.sms6 = value[index];
            break;
          default:
            break;
        }
      }
    }
  }
);
</script>

<style lang="scss" scoped>
.list-code {
  display: flex;
  align-items: center;
  justify-content: center;
  .code-item {
    padding: 0 8px;

    @media screen and (max-width: 560px) {
      padding: 0 4px;
    }
    :deep(.ant-form-item-has-error) {
      .box-code {
        border-color: #ff4d4f;
      }
    }
  }
}
</style>
