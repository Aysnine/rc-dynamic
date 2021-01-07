const path = require('path')
const fs = require('fs')
const { build } = require('esbuild')
const chokidar = require('chokidar')
const liveServer = require('live-server')

process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection:', error)
  process.exit(1)
})
;(async () => {
  // Copy public assets
  fs.rmdirSync('dist', { recursive: true })
  fs.mkdirSync('dist')
  fs.copyFileSync('public/index.html', 'dist/index.html') // TODO support multiple files

  // `esbuild` bundler for JavaScript / TypeScript.
  const builder = await build({
    // Bundles JavaScript.
    bundle: true,
    // Defines env variables for bundled JavaScript; here `process.env.NODE_ENV`
    // is propagated with a fallback.
    define: { 'process.env.NODE_ENV': JSON.stringify('development') },
    // Bundles JavaScript from (see `outfile`).
    entryPoints: ['src/index.tsx'],
    // Uses incremental compilation (see `chokidar.on`).
    incremental: true,
    // Removes whitespace, etc. depending on `NODE_ENV=...`.
    minify: false,
    // Bundles JavaScript to (see `entryPoints`).
    outdir: 'dist',
    // React jsx runtime
    inject: [path.join(__dirname, './_shim.js')],
  })
  // `chokidar` watcher source changes.
  chokidar
    // Watches TypeScript and React TypeScript.
    .watch('src/**/*.{ts,tsx,css}', {
      interval: 0, // No delay
    })
    // Rebuilds esbuild (incrementally -- see `build.incremental`).
    .on('all', () => {
      builder.rebuild()
    })
  // `liveServer` local server for hot reload.
  liveServer.start({
    // Opens the local server on start.
    open: true,
    // Uses `PORT=...` or 8080 as a fallback.
    port: +process.env.PORT || 8080,
    // Uses `public` as the local server folder.
    root: 'dist',
  })
})()
