import { build } from "vite";

export const getLastSubstringUntilSlash = (str: string) => {
  const lastSlashIndex = str.lastIndexOf("/");
  // If slash is found, return the substring from just after this position to the end of the string.
  // If not, return the original string as there's no slash to define a substring.
  return lastSlashIndex >= 0 ? str.substring(lastSlashIndex + 1) : str;
};

export async function bundleJs(path: string, outDir: string) {
  try {
    const fileName = getLastSubstringUntilSlash(path);

    // Call Vite's build function with desired options.
    // You can specify entry points, output directories, and more here.
    const vitebuild = await build({
      root: "dist",
      build: {
        // Entry file for your project
        // rollupOptions: {
        //   input: path,
        // },
        lib: {
          entry: path,
          name: `index-bundle-code${fileName}`,
          fileName: () => `${getLastSubstringUntilSlash(fileName)}`,
          formats: ["iife"],
        },
        // Specify output directory (optional)
        outDir: outDir,
      },
    });

    if (Array.isArray(vitebuild)) {
      console.log(
        "-----------------CODE LENGTH",
        vitebuild[0].output[0].code.length
      );
      return vitebuild[0].output;
    }
    Object.values(vitebuild).map((b) => { });
    //todo: better return
    return vitebuild;
  } catch (err) {
    console.error("Error during build:", err);
  }
}
