import sortBy from 'lodash/sortBy'
import type { GetStaticPaths, GetStaticProps } from 'next'
import type { ParsedUrlQuery } from 'querystring'

import Article from '@/components/Article'
import Layout from '@/components/Layout'
import PageNav from '@/components/PageNav'
import { RankingContext, type RankingContextType } from '@/components/RankingContext'
import { getAllGameArticleMetas, getGameArticleData, getGameRanking, getGameSlugs, type ArticleData } from '@/lib/articles'

const PAGE_SIZE = 5

type LatestPageProps = {
  page: number,
  numPages: number,
  articles: ArticleData[]
  ranking: RankingContextType
}

function getHref(page: number) {
  return page == 1 ? '/' : `/page/${page}`
}

export default function LatestPage(props: LatestPageProps) {
  const articles = props.articles.map(it => <Article key={it.meta.slug} {...it} />)
  return (
    <Layout>
      <RankingContext.Provider value={props.ranking}>
        {articles}
        <PageNav page={props.page} count={props.numPages} getHref={getHref} />
      </RankingContext.Provider>
    </Layout>
  )
}

type LatestPageParams = ParsedUrlQuery & {
  page: string
}

function getNumPages(things: any[]) {
  return Math.ceil(things.length / PAGE_SIZE)
}

export const getStaticPaths: GetStaticPaths<LatestPageParams> = async () => {
  const slugs = await getGameSlugs()
  const paths = []
  // generate a path for every page EXCEPT 1. "/" is used instead of "/page/1"
  for (let page = getNumPages(slugs); page > 1; page--) {
    // next throws if it is not a string here
    paths.push({ params: { page: page.toString() } })
  }
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<LatestPageProps, LatestPageParams> = async ({ params }) => {
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

  const articles = await Promise.all(articleMetas.map(it => getGameArticleData(it.slug)))
  const ranking = await getGameRanking()
  const props = { page, numPages, articles, ranking }
  return { props }
}
