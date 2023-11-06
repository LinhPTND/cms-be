<template>
  <a-tree
    :tree-data="permissionsTree"
    :checked-keys="checkedKeys"
    @update:checked-keys="handleUpdateCheckedKeys"
    :selectable="false"
    checkable
    defaultExpandAll
  />
</template>

<script lang="ts" setup>
import { TreeProps } from "ant-design-vue";
import { Key } from "ant-design-vue/lib/vc-tree/interface";
import { isEqual } from "lodash";
import { computed, ref, watch } from "vue";

const props = defineProps<{
  value?: Key[];
}>();

const emit = defineEmits<{
  (event: "update:value", value: Key[]): void;
}>();

const checkedKeys = ref<Key[]>([]);

function handleUpdateCheckedKeys(keys: Key[]) {
  checkedKeys.value = keys;
  emit("update:value", keys);
}

watch(
  () => props.value,
  () => {
    if (!isEqual(props.value, checkedKeys.value)) {
      if (!props.value) {
        checkedKeys.value = [];
        return;
      }
      checkedKeys.value = props.value;
    }
  }
);

const permissionsTree = computed<TreeProps["treeData"]>(() => {
  return [
    {
      title: "User management",
      key: "user-management",
      children: [{ title: "View list user", key: "view-list-user" }],
    },
  ] as TreeProps["treeData"];
});
</script>
