// vite.config.ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'

const fixture = (name: string) => {
  return name;
}

export default defineConfig({
  test: {
    includeSource: ['src/**/*.ts'],
  },
  define: { 
    'import.meta.vitest': 'undefined',
    'import.meta.root': __dirname, 
    'import.meta.fixture': fixture, 
  },
  root: "src",
  build: {
    // Entry file for your project
    // rollupOptions: {
    //   input: path,
    // },
    lib: {
      entry: "index.ts",
      // name: `index-bundle-code${fileName}`,
      // fileName: () => `${getLastSubstringUntilSlash(fileName)}`,
      formats: ["es"],
    },
    // Specify output directory (optional)
    outDir: "dist",
  },
})