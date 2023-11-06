import dayjs from "dayjs";
import { computed } from "vue";

export const dayNow = computed(() => {
  return dayjs().get("date");
});

export const monthNow = computed(() => {
  return dayjs().get("month");
});

export const yearNow = computed(() => {
  return dayjs().get("year");
});
