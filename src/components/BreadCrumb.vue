<template>
  <a-breadcrumb class="mb-6">
    <a-breadcrumb-item
      v-for="breadCrumb in breadCrumbs"
      :key="`bread-${breadCrumb.name}`"
    >
      <router-link
        v-if="route.path !== breadCrumb.path"
        :to="{ path: breadCrumb.path }"
      >
        {{ breadCrumb.name }}
      </router-link>
      <template v-else>{{ breadCrumb.name }}</template>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

defineProps<{
  breadCrumbs: Array<{
    name: string;
    path: string;
  }>;
}>();

const route = useRoute();
</script>

<style lang="scss" scoped></style>
