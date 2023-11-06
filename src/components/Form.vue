<template>
  <a-form
    ref="formRef"
    :model="formValues"
    :validate-messages="validateMessages"
    @finish="$emit('finish', $event)"
  >
    <slot />
  </a-form>
</template>

<script lang="ts" setup>
import antViLocale from "@/localization/locales/vi/antLocale";
import {
  $formInjectKey,
  FormExposed,
  FormInjectedValues,
  FormNamePath,
} from "@/models/Form";
import { FormInstance, FormProps as AntFormProps } from "ant-design-vue";
import antEnLocale from "ant-design-vue/es/locale/en_US";
import { cloneDeep, get, isEqual, set } from "lodash";
import { computed, provide, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export interface FormProps extends Omit<AntFormProps, "model"> {
  initialValues?: Record<string, any>;
  enableReinitialize?: boolean;
}

const props = withDefaults(defineProps<FormProps>(), {
  initialValues: () => ({}),
  enableReinitialize: false,
});

const emit = defineEmits<{
  (event: "finish", values: any): void;
  (event: "change", values: any): void;
}>();

// Handle validation messages
const { locale } = useI18n();

const validateMessages = computed(() => {
  if (locale.value === "en") {
    return antEnLocale.Form?.defaultValidateMessages;
  }

  return antViLocale.Form?.defaultValidateMessages;
});

// Handle form logics
const formRef = ref<FormInstance>();
const formValues = reactive(
  props.initialValues ? cloneDeep(props.initialValues) : {}
);
const stopWatchInitialValue = ref(createWatchInitialValue());

watch(
  () => props.enableReinitialize,
  () => {
    if (props.enableReinitialize) {
      stopWatchInitialValue.value = createWatchInitialValue();
      return;
    }

    stopWatchInitialValue.value && stopWatchInitialValue.value();
  }
);

function createWatchInitialValue() {
  if (!props.enableReinitialize) {
    return undefined;
  }

  return watch(
    () => props.initialValues,
    () => {
      if (!isEqual(props.initialValues, formValues)) {
        Object.assign(formValues, props.initialValues);
      }
    }
  );
}

watch(formValues, (value: any) => {
  emit("change", value);
});

function submit() {
  formRef.value?.validate().then((values) => {
    emit("finish", values);
  });
}

function reset() {
  formRef.value?.resetFields();
}

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

function setFieldValue(name: FormNamePath, value: any) {
  const path = Array.isArray(name) ? name.join(".") : String(name);

  set(formValues, path, value);
}

function getFieldValue(name: FormNamePath) {
  const path = Array.isArray(name) ? name.join(".") : String(name);

  return get(formValues, path);
}

provide<FormInjectedValues>($formInjectKey, {
  setFieldValue,
  getFieldValue,
  values: formValues,
  submit,
  validate(name) {
    return formRef.value?.validate(name);
  },
  get validateTrigger() {
    return formRef.value?.validateTrigger;
  },
});

defineExpose<FormExposed>({
  values: formValues,
  submit,
  getFieldValue,
  setFieldValue,
  reset,
  validate,
});
</script>
