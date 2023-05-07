import fs from 'node:fs/promises'
import path from 'node:path'

import matter from 'gray-matter'
import { type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import yaml from 'js-yaml'

export type ArticleMeta = {
  slug: string
  date?: string
  title: string
  data?: any
}

export type ArticleRaw = {
  meta: ArticleMeta
  text: string
}

export type ArticleData = {
  meta: ArticleMeta
  mdxProps: MDXRemoteSerializeResult
}

// during next build, process.cwd() is the repository directory
const DATA_DIR = path.resolve(process.cwd(), 'src/data')

export async function getSlugs(dir: string) {
  const files = await fs.readdir(path.resolve(DATA_DIR, dir), { withFileTypes: true })
  return files.filter(it => it.isFile())
    .map(it => path.parse(it.name))
    .filter(it => it.ext == '.mdx')
    .map(it => it.name)
}

async function getArticleRaw(dir: string, slug: string) {
  const file = path.resolve(DATA_DIR, dir, `${slug}.mdx`)
  const { data, content } = await fs.readFile(file).then(matter)
  const meta = { slug, ...data } as ArticleMeta
  return { meta, text: content } as ArticleRaw
}

export async function getArticleMeta(dir: string, slug: string) {
  // TODO: this parses the article text and throws it away
  const article = await getArticleRaw(dir, slug)
  return article.meta
}

export async function getArticleData(dir: string, slug: string) {
  const { meta, text } = await getArticleRaw(dir, slug)
  const mdxProps = await serialize(text, { scope: meta })
  return { meta, mdxProps } as ArticleData
}

export async function getGameSlugs() {
  return await getSlugs('games')
}

export async function getGameArticleMeta(slug: string) {
  return await getArticleMeta('games', slug)
}

export async function getAllGameArticleMetas() {
  const slugs = await getGameSlugs()
  return await Promise.all(slugs.map(it => getGameArticleMeta(it)))
}

export async function getGameArticleData(slug: string) {
  return await getArticleData('games', slug)
}

async function loadYaml<T = any>(filename: string) {
  const file = path.resolve(DATA_DIR, filename)
  const text = await fs.readFile(file, 'utf8')
  return yaml.load(text) as T
}

export async function getGameRanking() {
  const ranking = await loadYaml<string[]>('ranking.yaml')
  const gameArticles = await getAllGameArticleMetas()
  return ranking.map(slug => {
    const result = gameArticles.find(it => it.slug == slug)
    if (!result) {
      console.warn(`Missing meta for game: ${slug}`)
    }
    return result
  }).filter(it => it)
}
