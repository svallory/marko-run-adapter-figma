/// <reference types="vitest" />
import { defineConfig } from "vite";
import marko from "@marko/run/vite";
import staticAdapter from "@marko/run-adapter-static";

export default defineConfig({
  test: {
    includeSource: ['./src/**/*.ts'],
  },
  plugins: [
    marko({
      adapter: staticAdapter(),
      // adapter: figmaAdapter(),
    }),
  ],
});
