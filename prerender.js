// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(
	import.meta.url))

const toAbsolute = (p) => path.resolve(__dirname, p)

const manifest = JSON.parse(
	fs.readFileSync(toAbsolute('dist/static/ssr-manifest.json'), 'utf-8'),
)
const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const {
	render
} = (await import('./dist/server/entry-server.js'))
// const { render } = (await import(path.resolve(__dirname, './dist/server/entry-server.js')));

// determine routes to pre-render from src/pages
const routesToPrerender = fs
	.readdirSync(toAbsolute('src/pages'))
	.map((file) => {
		const name = file.replace(/\.vue$/, '').toLowerCase()
		return name === 'home' ? `/` : `/${name}`
	})

;
(async () => {
	// pre-render each route...
	for (const url of routesToPrerender) {
		const [htmlHead, htmlBody] = await render(url, manifest);

		const html = template.replace(`<!--head-->`, htmlHead).replace(`<!--body-->`, htmlBody);

		const filePath = `dist/static${url === '/' ? '/index' : url}.html`
		fs.writeFileSync(toAbsolute(filePath), html)
		console.log('pre-rendered:', filePath)
	}

	// done, delete ssr manifest
	fs.unlinkSync(toAbsolute('dist/static/ssr-manifest.json'))
})()
