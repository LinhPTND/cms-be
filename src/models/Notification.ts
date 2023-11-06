import { Dayjs } from "dayjs";

export interface NotificationItem {
  time: Dayjs | string;
  description: string;
}
