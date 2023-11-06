import { loadModules } from "@/core/utilities";
import i18n from "@/localization";
import AppRoutePaths from "@/router/paths";
import Antd from "ant-design-vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import { createApp, nextTick } from "vue";
import("@/styles/index.scss").then(() => import("@/styles/antd/index.less"));

import("@vueup/vue-quill/dist/vue-quill.snow.css");

loadModules().then(async (modules) => {
  // Add module route paths
  for (const module of modules) {
    Object.assign(AppRoutePaths, {
      [module.name]: module.router.path,
    });
  }

  // Add module route
  const router = (await import("@/router")).default;
  modules.forEach((module) => {
    router.addRoute(module.router.route);
  });

  // Add module locales
  const locales = modules.reduce<Record<string, any>>((locales, module) => {
    const name = module.name[0].toLowerCase() + module.name.slice(1);

    for (const locale in module.locales) {
      if (Object.prototype.hasOwnProperty.call(module.locales, locale)) {
        const localeMessage = module.locales[locale];
        locales[locale] = {
          ...locales[locale],
          [name]: localeMessage,
        };
      }
    }
    return locales;
  }, {});

  for (const locale in locales) {
    if (Object.prototype.hasOwnProperty.call(locales, locale)) {
      const messages = locales[locale];
      i18n.global.setLocaleMessage(locale, {
        ...i18n.global.getLocaleMessage(locale),
        ...messages,
      });
    }
  }
  await nextTick();

  const App = (await import("./App.vue")).default;
  const app = createApp(App);

  const pinia = createPinia();
  pinia.use(piniaPersist);

  app.use(pinia);

  app.use(Antd);
  app.use(i18n);

  app.use(router);
  app.mount("#app");
});
