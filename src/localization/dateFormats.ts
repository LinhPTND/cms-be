import { IntlDateTimeFormats } from "vue-i18n";

const datetimeFormats: IntlDateTimeFormats = {
  en: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    },
  },
  vi: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    },
    time: {
      hour: "numeric",
      minute: "numeric",
    },
    date: {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  },
};

export default datetimeFormats;
