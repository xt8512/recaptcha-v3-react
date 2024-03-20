import { defineConfig } from "vite";
import { globalPolyfill } from "vite-plugin-global-polyfill";

import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), globalPolyfill()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
