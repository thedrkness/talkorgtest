import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin({ exclude: ["electron-store", "electron-util"] })],
  },
  preload: {
    plugins: [externalizeDepsPlugin({ exclude: ["electron-store", "electron-util"] })],
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          index: resolve("src/renderer/index.html"),
          userDialog: resolve("src/renderer/user.html"),
          authDialog: resolve("src/renderer/auth.html"),
          chattersDialog: resolve("src/renderer/chatters.html"),
          // searchDialog: resolve("src/renderer/search.html"),
          // settingsDialog: resolve("src/renderer/settings.html"),
          // contextMenu: resolve("src/renderer/contextMenu.html"),
          replyThreadDialog: resolve("src/renderer/replyThread.html"),
        },
      },
    },
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
        "@components": resolve("src/renderer/src/components"),
        "@assets": resolve("src/renderer/src/assets"),
      },
    },
    plugins: [react()],
  },
});
