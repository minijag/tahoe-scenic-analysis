import { readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'

const outputPath = new URL('../dist/index.html', import.meta.url)
const html = await readFile(outputPath, 'utf8')
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')
  const rendered = render()
  const prerendered = html.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`)
  if (prerendered === html) throw new Error('Could not find the React root in the production HTML.')
  await writeFile(outputPath, prerendered, 'utf8')
  console.log('Prerendered complete page content into dist/index.html')
} finally {
  await vite.close()
}

