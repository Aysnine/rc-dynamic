const { build } = require("esbuild")
const fs = require('fs');

;(async () => {
	// Copy public assets
	fs.rmdirSync('dist', { recursive: true });
	fs.mkdirSync('dist');
  fs.copyFileSync('public/index.html', 'dist/index.html'); // TODO support multiple files

	// `esbuild` bundler for JavaScript / TypeScript.
	await build({
		// Bundles JavaScript.
		bundle: true,
		// Defines env variables for bundled JavaScript; here `process.env.NODE_ENV`
		// is propagated with a fallback.
		define: { "process.env.NODE_ENV": JSON.stringify("production") }, // TODO use dot env ?
		// Bundles JavaScript from (see `outfile`).
		entryPoints: ["src/index.tsx"],
		// Removes whitespace.
		minify: true,
		// Bundles JavaScript to (see `entryPoints`).
		outdir: "dist",
		// React jsx runtime
		inject: [
			'src/shim.js'
		]
	})
})();
