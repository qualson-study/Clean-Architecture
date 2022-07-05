import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const path = require("path");
const root = `${process.cwd()}`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/": `${path.resolve(root, "src")}/`,
    },
  },
});
