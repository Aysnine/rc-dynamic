const fs = require('fs')
const path = require('path')
const gzipme = require('gzipme')
const { build } = require('esbuild')
const cssModulesPlugin = require('esbuild-css-modules-plugin')

process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection:', error)
  process.exit(1)
})
;(async () => {
  // Copy public assets
  fs.rmSync('dist', { recursive: true, force: true })
  fs.mkdirSync('dist')
  fs.copyFileSync('public/index.html', 'dist/index.html') // TODO support multiple files

  // `esbuild` bundler for JavaScript / TypeScript.
  await build({
    // Bundles JavaScript.
    bundle: true,
    // Defines env variables for bundled JavaScript; here `process.env.NODE_ENV`
    // is propagated with a fallback.
    define: { 'process.env.NODE_ENV': JSON.stringify('production') }, // TODO use dot env ?
    // Bundles JavaScript from (see `outfile`).
    entryPoints: ['src/index.tsx'],
    // Removes whitespace.
    minify: true,
    // Bundles JavaScript to (see `entryPoints`).
    outdir: 'dist',
    // React jsx runtime
    inject: [path.join(__dirname, './_shim.js')],
    // Plugins
    plugins: [
      cssModulesPlugin({
        inject: false,
        v2: true,
      }),
    ],
  })

  // create gz file
  gzipme('dist/index.js', { mode: 'best' })
})()
