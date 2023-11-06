<template>
  <a-upload
    v-model:file-list="fileList"
    list-type="picture-card"
    accept="image/png,image/jpg,image/jpeg"
    :show-upload-list="false"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <loading-outlined v-if="loading"></loading-outlined>
      <plus-outlined v-else></plus-outlined>
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>

<script lang="ts" setup>
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons-vue";
import type { UploadChangeParam } from "ant-design-vue";
import { FileType } from "ant-design-vue/es/upload/interface.js";
import { computed, ref } from "vue";

function getBase64(
  img: Blob | FileType,
  callback: (base64Url: string) => void
) {
  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.addEventListener("load", () => callback(reader.result as string));
}

const fileList = ref([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>("");

const styleBorder = computed(() => {
  return !imageUrl.value ? "1px dashed #d9d9d9" : "none";
});

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === "uploading") {
    loading.value = true;
    return;
  }
  if (info.file.originFileObj) {
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
  }
};
</script>

<style lang="scss" scoped>
:deep(.ant-upload.ant-upload-select-picture-card) {
  border: v-bind(styleBorder);

  &:hover {
    border: 1px dashed #0254a2;
  }
}
</style>
