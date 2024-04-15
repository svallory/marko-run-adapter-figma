import posthtml from 'posthtml';
import { createFilter } from 'vite';

export function vitePluginPosthtml(options: ViteOp) {
  options = Object.assign({
    emitFile: true,
    include: '**/*.html'
  }, options)

  const filter = createFilter(options.include, options.exclude)
  const handle = options.emitFile
    ? (res) => `export default ${JSON.stringify(res.html.trim())}`
    : (res) => res.html

  return {
    name: 'posthtml',
    transform: (code, id) => (
      filter(id)
        ? posthtml(options.plugins).process(code, options).then(handle)
        : null
    )
  }
}