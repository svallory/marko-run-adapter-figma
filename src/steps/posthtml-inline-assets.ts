const posthtmlInlineAssets = require('posthtml-inline-assets');
const uglify = require('uglify-js');

export function inlineAssetsStep(html: string, path: string, options?)
inlineAssets
posthtmlInlineAssets({
  cwd: '/path/to/files',
  root: '/path/to/files',
  // throw an error whenever a resolved asset fails to inline
  errors: 'throw',

  transforms: {
    pics: {
      resolve(node) {
        return node.tag === 'picture' && node.attrs && node.attrs.src;
      },
      transform(node, data) {
        node.tag = 'img';

        node.attrs.src = 'data:' + data.mime + ';base64,' + data.buffer.toString('base64');
      }
    },
    script: {
      transform(node, data) {
        delete node.attrs.src;

        node.content = [
          uglify.minify(data.buffer.toString('utf8')).code
        ];
      }
    }
  }
});
