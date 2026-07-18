import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const projectDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = path.join(projectDirectory, 'dist', 'index.html')
const serverEntryPath = path.join(projectDirectory, 'tmp', 'ssr', 'entry-server.js')
const placeholder = '<div id="root"></div>'

const [{ render }, template] = await Promise.all([
  import(pathToFileURL(serverEntryPath).href),
  readFile(indexPath, 'utf8'),
])

if (!template.includes(placeholder)) {
  throw new Error('Unable to find the root placeholder in the production HTML.')
}

const markup = render()
await writeFile(indexPath, template.replace(placeholder, `<div id="root">${markup}</div>`))

console.log('Prerendered the AUTONOMYX landing into dist/index.html.')
