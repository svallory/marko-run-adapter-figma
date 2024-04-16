import { defineConfig } from "vite";
import marko from "@marko/run/vite";
import figmaAdapter from "@marko-polo/run-adapter-figma";

export default defineConfig({
  publicDir: 'static',

  define: {
    'import.meta.root': `"${__dirname}/.."`
  },

  plugins: [
    marko({
      // adapter: staticAdapter(),
      adapter: figmaAdapter({
        code: {
          entryPoint: 'src/code/main.ts'
        }
      }),
    }),
  ],
});
