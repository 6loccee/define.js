import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/main.ts'],
  outfile: 'dist/define.js',
  sourcemap: true,
  bundle: true,
  minify: true,
})