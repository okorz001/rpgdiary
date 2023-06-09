// @ts-check

// This script generates the index for the articles

const fs = require('node:fs/promises')
const path = require('node:path')

const ARTICLE_DIR = 'data/articles'
const OUTPUT_FILE = 'data/articles/index.ts'

async function main() {
  const warning = '//\n// THIS FILE IS AUTOMATICALLY GENERATED, DO NOT MODIFY!\n//'
  const imports = (await fs.readdir(ARTICLE_DIR, { withFileTypes: true }))
    .filter(it => it.isFile())
    .map(it => path.parse(it.name))
    .filter(it => it.ext == '.mdx')
    .map(it => `export { default as ${it.name} } from './${it.base}'`)
  const contents = [warning, ...imports, warning, ''].join('\n')
  await fs.writeFile(OUTPUT_FILE, contents, { flag: 'w+' })
}

main()
