<template>
  <a-select
    v-model:value="state"
    :dropdownClassName="'select-inf'"
    show-search
    allowClear
    @popup-scroll="handleScroll"
    :loading="loading ? loading : isLoading"
    :filter-option="false"
    @search="handleSearch"
  >
    <a-select-option
      v-for="item in props.options"
      :key="item.value"
      :value="item.value"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts" setup>
import useDebouncedRef from "@/core/composables/debouncedRef";
import useDebounceFn from "@/core/composables/useDebounceFn";
import { Options } from "@/models/Form";
import { SelectProps } from "ant-design-vue";
import { ref, watch } from "vue";

export interface Props extends Omit<SelectProps, "options" | "loading"> {
  options: Options[] | [];
  value: string;
  loading?: boolean;
  endLoad?: boolean;
}

export interface LoadMoreValue {
  page: number;
  searchText: string;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  value: "",
  loading: false,
  endLoad: false,
});

const emit = defineEmits<{
  (e: "update:value", value: string): void;
  (e: "loadMore", value: LoadMoreValue): void;
}>();

const state = ref<string | undefined>(undefined);
const isLoading = ref<boolean>(false);
const page = ref<number>(1);
const searchText = useDebouncedRef<string>("");

watch(state, (value) => {
  if (value) {
    emit("update:value", value);
  }
});

watch(
  () => props.value,
  (value) => {
    state.value = value;
  }
);

const handleScroll = (e: any) => {
  if (props.loading || isLoading.value) {
    return;
  }

  const target = e.target as HTMLDListElement;

  if (target.scrollHeight - target.scrollTop <= target.clientHeight) {
    page.value += 1;
  }
};

const handleSearch = (text: string) => {
  searchText.value = text;
};

const { run: loadMore } = useDebounceFn(
  () => {
    emit("loadMore", {
      page: page.value,
      searchText: searchText.value,
    });
  },
  {
    wait: 500,
  }
);

watch(
  [page, searchText],
  () => {
    if (!props.endLoad) {
      isLoading.value = true;
      loadMore();
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => props.options,
  () => {
    isLoading.value = false;
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
.select-inf {
}
</style>
