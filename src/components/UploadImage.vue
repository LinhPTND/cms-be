<template>
  <div>
    <div v-if="previewImages.length" class="preview-box">
      <a-badge
        v-for="(previewImage, index) in previewImages"
        :key="previewImage"
        class="m-2"
      >
        <template #count>
          <CloseCircleFilled
            style="color: #f5222d"
            @click.prevent="removeImage(index)"
          />
        </template>
        <a-image
          :src="previewImage"
          :preview="false"
          class="w-full aspect-square object-contain p-1 border-solid border border-gray-400"
        />
      </a-badge>
    </div>
    <a-upload-dragger
      :file-list="fileList"
      @update:file-list="handleChange"
      :show-upload-list="false"
      accept="image/png,image/jpg,image/jpeg"
      :max-count="1"
      :custom-request="() => {}"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">{{ t("common.clickOrDragFile") }}</p>
      <p class="ant-upload-hint">
        {{ note ? note : t("common.onlyImageVideo") }}
        <!-- Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files -->
      </p>
    </a-upload-dragger>
  </div>
</template>

<script lang="ts" setup>
import { imageFileToBase64 } from "@/utils/file";
import { CloseCircleFilled, InboxOutlined } from "@ant-design/icons-vue";
import { message, UploadFile } from "ant-design-vue";
import { cloneDeep, isEqual } from "lodash";
import { nextTick, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    value?: UploadFile[];
    /**
     * In KB
     */
    size?: number;
    maxCount?: number;
    previewColumns?: number;
    note?: string;
  }>(),
  {
    value: () => [],
    size: 5120,
    maxCount: 1,
    previewColumns: 4,
  }
);

const emit = defineEmits<{
  (event: "update:value", value: UploadFile[]): void;
}>();

const fileList = ref<UploadFile[]>([...props.value]);

function handleChange(files: UploadFile[]) {
  if (fileList.value.length >= props.maxCount) {
    return;
  }

  const filteredFiles = files.filter((file) => {
    if (file.size !== undefined && file.size / 1024 > props.size) {
      message.error(
        t("common.fileSizeLarger", {
          fileName: file.name,
          size: `${props.size}KB`,
        })
      );

      return false;
    }

    return true;
  });

  fileList.value.push(...filteredFiles);
  nextTick(() => {
    emit("update:value", cloneDeep(fileList.value));
  });
}

function removeImage(index: number) {
  fileList.value.splice(index, 1);
}

watch(
  () => props.value,
  () => {
    if (!isEqual(props.value, fileList)) {
      fileList.value.splice(0);
      fileList.value.push(...props.value);
    }
  },
  { deep: true }
);

// handle preview
const previewImages = ref<string[]>([]);

watch(
  fileList,
  () => {
    Promise.all(
      fileList.value.map((file) => {
        return new Promise<string>((resolve, reject) => {
          try {
            if (file.url) {
              resolve(file.url);
            } else {
              imageFileToBase64(file.originFileObj as any).then((result) =>
                resolve(result)
              );
            }
          } catch (error) {
            reject(error);
          }
        });
      })
    ).then((images) => {
      previewImages.value = images;
    });
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
.preview-box {
  @apply grid py-2;
  grid-template-columns: repeat(v-bind("$props.previewColumns"), 1fr);
}
</style>
