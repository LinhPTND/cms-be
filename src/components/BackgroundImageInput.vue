<template>
  <div>
    <a-carousel ref="carousel" :dots="false" :loop="false">
      <div
        v-for="(backgrounds, index) in backgroundGroups"
        :key="index"
        class="grid gap-2 grid-cols-4 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 overflow-visible"
      >
        <img
          v-for="background in backgrounds"
          :key="background"
          :src="background"
          :class="[
            'border',
            'border-solid',
            'object-cover',
            'aspect-square',
            'w-full',
            'rounded',
            'cursor-pointer',
            'transition',
            {
              'hover:border-gray-400': selectedBackground !== background,
              'border-[3px]': selectedBackground === background,
              'border-primary': selectedBackground === background,
            },
          ]"
          @click="updateBg(background)"
        />
      </div>
    </a-carousel>
    <div class="flex justify-between items-center">
      <a-upload>
        <Button btn-type="link" class="px-0">
          <template #icon>
            <Icon name="uploadMajor" />
          </template>
          {{ t("actions.upload") }}
        </Button>
      </a-upload>
      <ButtonGroup>
        <Button @click="carousel?.prev">
          <template #icon>
            <LeftOutlined />
          </template>
        </Button>
        <Button @click="carousel?.next">
          <template #icon>
            <RightOutlined />
          </template>
        </Button>
      </ButtonGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "@/components/button/Button.vue";
import ButtonGroup from "@/components/button/ButtonGroup.vue";
import Icon from "@/components/Icon.vue";
import backgroundImages from "@/constants/backgroundImages";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { computed, ref } from "@vue/reactivity";
import { chunk } from "lodash";
import { watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{ value?: string }>();
const emit = defineEmits<{ (event: "update:value", value: string): void }>();

const { t } = useI18n();

const noneBackground = "https://assets.apphero.co/images/templates/0.png";
const selectedBackground = ref<string>(props.value || "");
const carousel = ref();

const backgroundGroups = computed(() => {
  return chunk([noneBackground, ...backgroundImages], 24);
});

const updateBg = (bg: string) => {
  bg = bg === noneBackground ? "" : bg;
  selectedBackground.value = bg;
  emit("update:value", bg);
};

watch(
  () => props.value,
  () => {
    if (props.value && props.value !== selectedBackground.value) {
      selectedBackground.value = props.value;
    }
  }
);
</script>
