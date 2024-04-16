/// <reference types="vitest" />
import { defineConfig } from "vite";
import marko from "@marko/run/vite";
import figmaAdapter from "../../dist/index.js";

export default defineConfig({
  test: {
    includeSource: ['./src/**/*.ts'],
  },
  define: {
    'import.meta.root': `"${__dirname}/.."`
  },

  plugins: [
    marko({
      adapter: figmaAdapter(),
    }),
  ],
});
