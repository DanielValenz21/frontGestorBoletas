// vite.config.js
import { defineConfig } from "vite";          // ← IMPORTACIÓN QUE FALTA
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@screens": path.resolve(__dirname, "src/screens"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
});
