import range from 'lodash/range'
import sortBy from 'lodash/sortBy'
import { type Metadata } from 'next'

import Article from '@/components/Article'
import PageNav from '@/components/PageNav'
import { getAllGameArticleMetas, getGameArticleData, getGameSlugs } from '@/lib/articles'

const PAGE_SIZE = 5

function getNumPages(things: any[]) {
  return Math.ceil(things.length / PAGE_SIZE)
}

function getHref(page: number) {
  return page == 1 ? '/' : `/pages/${page}`
}

// TODO: how to typehint the params?

export async function generateStaticParams() {
  const slugs = await getGameSlugs()
  // generate a path for every page EXCEPT 1. "/" is used instead of "/pages/1"
  return range(1, getNumPages(slugs))
    // next throws if it is not a string here
    .map(page => ({ page: page.toString() }))
}

export async function generateMetadata({ params }) {
  return {
    // override the template from the layout
    title: { absolute: `RPG Diary (Page ${params.page})` },
  } as Metadata
}

export default async function LatestPage({ params }) {
  let articleMetas = await getAllGameArticleMetas()
  const numPages = getNumPages(articleMetas)

  // sort by date, newest first
  articleMetas = sortBy(articleMetas, ['date'])
  articleMetas.reverse()

  // slice page contents
  const page = +params.page
  const start = (page - 1) * PAGE_SIZE
  const end = Math.min(start + PAGE_SIZE, articleMetas.length)
  articleMetas = articleMetas.slice(start, end)

  const articleDatas = await Promise.all(articleMetas.map(it => getGameArticleData(it.slug)))
  const articles = articleDatas.map(it => <Article key={it.meta.slug} {...it} />)

  return (
    <>
      <PageNav page={page} count={numPages} getHref={getHref} />
      {articles}
      <PageNav page={page} count={numPages} getHref={getHref} />
    </>
  )
}
