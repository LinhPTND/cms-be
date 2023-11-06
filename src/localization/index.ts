import datetimeFormats from "@/localization/dateFormats";
import globalLocales from "@/localization/locales";
import numberFormats from "@/localization/numberFormats";
import { createI18n, I18nOptions } from "vue-i18n";

const i18n = createI18n<I18nOptions>({
  fallbackLocale: "vi",
  locale: "vi",
  legacy: false,
  numberFormats,
  datetimeFormats,
  messages: globalLocales,
});

export default i18n;
