<template>
  <a-card :class="{ disabled: disabled }">
    <template v-if="$slots.header" #title="headerProps">
      <slot name="header" key="header" v-bind="headerProps"></slot>
    </template>

    <div class="flex justify-between mb-2">
      <div>
        <slot name="title" key="title">
          <h4 class="uppercase font-semibold text-md mb-0">
            {{ title }}
          </h4>
        </slot>
      </div>
      <component
        v-if="!disabled"
        :is="shown ? UpOutlined : DownOutlined"
        class="cursor-pointer"
        @click="toggleShown"
      ></component>
    </div>

    <TransitionToggle>
      <div v-if="shown" class="show-content">
        <slot name="showContent"></slot>
      </div>
      <div
        v-else
        :class="[
          'hide-content',
          {
            'cursor-pointer': showOnHideContentClick && !disabled,
          },
        ]"
        @click="toggleShownOnHideContent"
      >
        <slot name="hideContent"></slot>
      </div>
    </TransitionToggle>
  </a-card>
</template>

<script lang="ts" setup>
import TransitionToggle from "@/components/animation/TransitionToggle.vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import { ref, watch } from "vue";
const props = defineProps<{
  title?: string;
  showOnHideContentClick?: boolean;
  disabled?: boolean;
}>();
const emit = defineEmits<{ (event: "show"): void; (event: "hide"): void }>();

const shown = ref(false);

function toggleShown() {
  if (props.disabled) {
    return;
  }

  shown.value = !shown.value;
}

function toggleShownOnHideContent() {
  if (props.showOnHideContentClick) {
    toggleShown();
  }
}

watch(shown, () => {
  shown.value ? emit("show") : emit("hide");
});
</script>

<style lang="scss" scoped>
.disabled {
  @apply bg-gray-200;
}

:deep(.ant-card-head) {
  border-bottom-width: 1px;
}
</style>
