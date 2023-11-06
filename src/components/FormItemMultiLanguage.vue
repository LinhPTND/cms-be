<template>
  <FormItem :label="label" :name="name" v-slot="{ value, handleChange }">
    <a-tabs
      type="editable-card"
      hide-add
      @edit="remove($event, value, handleChange)"
    >
      <a-tab-pane
        v-for="(item, index) in value"
        :key="item.languageCode"
        :tab="item.languageCode"
      >
        <slot :name-path="getItemNamePrefix(index)" />

        <template #closeIcon>
          <CloseOutlined v-if="index !== 0" />
        </template>
      </a-tab-pane>

      <template #rightExtra>
        <a-dropdown trigger="click" placement="bottomRight">
          <Button>
            <template #icon>
              <PlusOutlined />
            </template>
          </Button>

          <template #overlay>
            <a-menu>
              <a-menu-item @click="add('vi-VN', value, handleChange)"
                >Vietnamese</a-menu-item
              >
              <a-menu-item @click="add('en-EN', value, handleChange)"
                >English</a-menu-item
              >
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tabs>
  </FormItem>
</template>

<script lang="ts" setup>
import Button from "@/components/Button.vue";
import FormItem from "@/components/FormItem.vue";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { NamePath, Rule } from "ant-design-vue/es/form/interface";
import { Key } from "ant-design-vue/es/_util/type";

const props = defineProps<{
  label?: string;
  name: NamePath;
  rules?: Rule[];
}>();

function getItemNamePrefix(index: number) {
  const path = Array.isArray(props.name) ? props.name : [props.name];
  path.push(index);

  return path;
}

function add(
  languageCode: string,
  value: any,
  handleChange: (event: any) => void
) {
  const array = Array.isArray(value) ? [...value] : [];

  array.push({ languageCode });

  handleChange(array);
}

function remove(
  key: Key | KeyboardEvent | MouseEvent,
  value: any,
  handleChange: (event: any) => void
) {
  handleChange(value.filter(({ languageCode }: any) => languageCode !== key));
}
</script>
