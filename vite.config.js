import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@routes", replacement: "/src/routes" },
      { find: "@store", replacement: "/src/store" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@recoil", replacement: "/src/recoil" },
      { find: "@assets", replacement: "/src/assets" },
    ],
  },
  // server: {
  //   proxy: {
  //     "/": {
  //       //target: "http://43.203.63.39:8080",
  //       target: "http://localhost:8080",
  //       //changeOrigin: true,
  //     },
  //   },
  // },
});
