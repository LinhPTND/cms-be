import vueI18n from "@intlify/vite-plugin-vue-i18n";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    vueJsx(),
    vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,
      include: [
        path.resolve(__dirname, "./src/localization/locales/**"),
        path.resolve(__dirname, "./src/modules/**/locales/**"),
      ],
    }),
    svgLoader(),
    createHtmlPlugin(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./__test__/test.setup.ts",
    exclude: [
      "node_modules",
      "dist",
      ".idea",
      ".git",
      ".vscode",
      ".cache",
      "./src/core",
    ],
    coverage: {
      exclude: ["src/api"],
    },
  },
});
