import * as esbuild from 'esbuild'

export async function bundleScripts(entryPoints: string[]) {
  return await esbuild.build({
    entryPoints: entryPoints,
    format: 'iife',
    bundle: true,
    outdir: 'dist',
  })
}

