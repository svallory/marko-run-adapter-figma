import fs from "node:fs";
import path from "node:path";
import { bundleJs } from "./bundleJs";

/**
 * Inline CSS, JS, and images into the HTML content.
 *
 * This function takes HTML content and a path to the public assets directory,
 * then finds all references to external CSS and JS files, as well as image sources,
 * and replaces them with inlined content within the HTML.
 *
 * @param {string} html - The HTML content.
 * @param {string} publicPath - The public path where static assets are served from.
 * @returns {Promise<string>} - The HTML content with resources inlined.
 */
export async function inlineAssets(
  html: string,
  publicPath: string
): Promise<string> {
  posthtml(options.plugins).process(code, options).then(handle)

  // Inline CSS files
  const cssLinks = html.match(/<link\s+[^>]*?href=["']([^"']+?\.css)["'][^>]*?>/gi) || [];
  for (const link of cssLinks) {
    const hrefMatch = link.match(/href="(.+?\.css)"/);
    console.log("cssLinks", hrefMatch);
    if (!hrefMatch) continue;
    const cssPath = path.join(publicPath, hrefMatch[1]);
    const cssContent = await fs.promises.readFile(cssPath, "utf-8");
    const styleTag = `<style>${cssContent}</style>`;
    html = html.replace(link, () => styleTag);
  }
  // Inline images
  const imgSrcs = html.match(/<img.*?src="(.+?)".*?>/g) || [];
  for (const imgTag of imgSrcs) {
    const imgSrcMatch = imgTag.match(/src="(.+?)"/);
    if (!imgSrcMatch || imgSrcMatch[1].startsWith("data:")) continue;
    const imgPath = path.join(publicPath, imgSrcMatch[1]);
    const imgContent = await fs.promises.readFile(imgPath);
    const mimeType = path.extname(imgPath).slice(1);
    const dataUri = `data:image/${mimeType};base64,${imgContent.toString(
      "base64"
    )}`;
    const inlineImgTag = imgTag.replace(
      imgSrcMatch[0],
      () => `src="${dataUri}"`
    );
    html = html.replace(imgTag, () => inlineImgTag);
  }

  // Inline JS files
  const jsScripts = html.match(
    /<script async type="module".*?src="(.+?\.js)".*?>\s*<\/script>/g
  ) || [];

  for (const script of jsScripts) {
    const srcMatch = script.match(/src="(.+?\.js)"/);
    if (!srcMatch) continue;

    const jsPath = path.join(publicPath, srcMatch[1]);

    const jsContent = await bundleJs(jsPath, "../out/bundled");

    const inlineScript = `<script>${jsContent[0].code}</script>`;

    console.log("-----------------CODE INLINE", inlineScript.length);

    // console.log("REPLACING", script);
    // console.log("HTML", html);
    html = html.replace(script, () => inlineScript);

    html = html.replace(
      /<script async type="module".*?src="(.+?\.js)".*?>\s*<\/script>/g,
      ""
    );

    html = html.replace(
      /<link rel="modulepreload"\s+[^>]*?href=["']([^"']+?\.js)["'][^>]*?>/gi,
      ""
    );
  }

  return html;
}
