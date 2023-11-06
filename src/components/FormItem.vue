<template>
  <a-form-item
    :class="['form-item-cs', { 'hide-text-error': hideTextError }]"
    :name="name"
  >
    <template v-if="input">
      <component
        :is="input"
        :[valuePropName]="inputValue"
        @[updateEventName]="handleUpdateValue"
        v-bind="inputProps"
      />
    </template>
    <slot
      v-else
      v-bind="{
        value: inputValue,
        handleChange: handleUpdateValue,
        form: injectedForm,
      }"
    />
  </a-form-item>
</template>

<script lang="ts" setup>
import {
  ComponentPublicInstanceConstructor,
  KebabCase,
  PascalCase,
} from "@/@types/utilities";
import { $formInjectKey, FormInjectedValues } from "@/models/Form";
import { FormItemProps as AntFormItemProps } from "ant-design-vue";
import {
  computed,
  GlobalComponents,
  inject,
  ref,
  useAttrs,
  VNode,
  watch,
} from "vue";

export interface FormItemValueTransformer {
  in: (value: any) => any;
  out: (value: any) => any;
}

export interface FormItemProps<
  Input =
    | KebabCase<keyof GlobalComponents>
    | VNode
    | ComponentPublicInstanceConstructor
> extends Omit<AntFormItemProps, "name"> {
  name?: string | number | (string | number)[];
  input?: Input;
  valuePropName?: string;
  onChangePropName?: string;
  getValueFromChangeEvent?: (event: any) => any;
  inputProps?: Input extends string
    ? InstanceType<
        GlobalComponents[PascalCase<Input> extends keyof GlobalComponents
          ? PascalCase<Input>
          : never]
      >["$props"]
    : unknown;
  hideTextError?: boolean;
  valueTransformer?: FormItemValueTransformer;
}

const props = withDefaults(defineProps<FormItemProps>(), {
  valuePropName: "value",
  getValueFromChangeEvent: (event: any) => {
    if (event && event.target) {
      return event.target.checked ?? event.target.value;
    }

    return event;
  },
  valueTransformer: () => ({
    in: (value) => value,
    out: (value) => value,
  }),
});
const attrs = useAttrs();

const injectedForm = inject<FormInjectedValues>($formInjectKey, {
  getFieldValue() {},
  setFieldValue() {},
  values: {},
  submit() {},
  validate() {},
});

const inputValue = ref(
  props.name &&
    props.valueTransformer.in(injectedForm.getFieldValue(props.name))
);
const updateEventName = computed(
  () => props.onChangePropName ?? `update:${props.valuePropName}`
);

function needTriggerValidate(validateTrigger?: string | string[]) {
  return (
    validateTrigger === undefined ||
    (typeof validateTrigger === "string" &&
      validateTrigger?.toLowerCase() === "change") ||
    (Array.isArray(validateTrigger) && validateTrigger.includes("change"))
  );
}

function handleUpdateValue(event: any) {
  const newValue = props.valueTransformer.out(
    props.getValueFromChangeEvent(event)
  );
  inputValue.value = newValue;

  injectedForm.setFieldValue &&
    props.name &&
    injectedForm.setFieldValue(props.name, newValue);

  setTimeout(() => {
    const validateTrigger = injectedForm?.validateTrigger;
    if (
      attrs["validate-trigger"] &&
      !needTriggerValidate(attrs["validate-trigger"] as any)
    ) {
      return;
    }
    if (
      attrs["validateTrigger"] &&
      !needTriggerValidate(attrs["validateTrigger"] as any)
    ) {
      return;
    }
    if (!needTriggerValidate(validateTrigger)) {
      return;
    }

    injectedForm?.validate(
      Array.isArray(props.name) ? props.name : String(props.name)
    );
  }, 100);
}

watch(
  () => props.name,
  () => {
    if (!props.name) {
      return;
    }

    inputValue.value = props.valueTransformer.in(
      injectedForm?.getFieldValue(props.name)
    );
  }
);

watch(injectedForm.values, () => {
  if (!props.name) {
    return;
  }

  inputValue.value = props.valueTransformer.in(
    injectedForm?.getFieldValue(props.name)
  );
});
</script>

<style lang="scss" scoped>
.form-item-cs {
  &.hide-text-error {
    :deep(.ant-form-item-explain) {
      display: none;
    }
    margin-bottom: 0;
  }
}
</style>
