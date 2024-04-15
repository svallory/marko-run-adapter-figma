// https://github.com/fb55/htmlparser2

import * as htmlparser2 from "htmlparser2";

htmlparser2.DomUtils.replaceElement

// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const { fixture } = await import("./test-helpers/fixture");

  it('should inline <script>', () => {
    const indexHtml = fixture('static-adapter-output/index.html');

    const doc = htmlparser2.parseDocument(indexHtml);

    const assets = htmlparser2.DomUtils.findAll(tag => ['script', 'img', 'link'].includes(tag.name), doc.childNodes)

    console.log(`Found ${assets.length} assets`)

    expect(import.meta.root).toBe("/Users/svallory/projects/cva-workspace/code/oss/marko/run-adpter-figma");
  })
}