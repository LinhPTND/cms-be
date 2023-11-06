<template>
  <CardContent class="card-notification h-full">
    <h3>Thông báo</h3>
    <div class="container">
      <NotificaionItem
        v-for="(item, index) in listNotification"
        :key="`${item.time}-${index}`"
        v-bind="item"
      />
    </div>
  </CardContent>
</template>

<script lang="ts" setup>
import CardContent from "@/components/CardContent.vue";
import { NotificationItem } from "@/models/Notification";
import NotificaionItem from "@/modules/user/components/CardAccount/NotificaionItem.vue";
import { ref } from "vue";

const listNotification = ref<NotificationItem[]>(
  [...Array(10)].map(() => {
    return {
      time: "22/06/2022",
      description: "Đơn đăng kí đã được duyệt",
    };
  })
);
</script>

<style lang="scss" scoped>
.card-notification {
  h3 {
    font-size: 14px;
    line-height: 22px;
    font-weight: 500;
    margin-bottom: 16px;
  }
  .container {
    height: 340px;
    overflow-y: auto;
  }
}
</style>
